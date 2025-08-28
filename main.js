const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const os = require('os');
const fs = require('fs');
const https = require('https');

const CURRENT_VERSION = '1.1.0';
const GITHUB_REPO = 'LoupFr/Saturn'; // Configuration corrigée
const UPDATE_CHECK_URL = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;

const MAX_CONCURRENT_CLIPS = Math.min(os.cpus().length, 6);

try {
  const ffmpegPath = require('ffmpeg-static');
  const ffprobePath = require('ffprobe-static');
  ffmpeg.setFfmpegPath(ffmpegPath);
  ffmpeg.setFfprobePath(ffprobePath.path);
  console.log('FFmpeg configuré');
} catch (error) {
  console.error('FFmpeg non configuré:', error.message);
}

let mainWindow;

function createWindow() {
  console.log('Saturn - Création fenêtre...');
  
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'assets', 'icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false
    },
    show: false
  });

  mainWindow.loadFile('index.html');
  
  mainWindow.once('ready-to-show', () => {
    console.log('Saturn lancé!');
    mainWindow.show();
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  console.log('Saturn ready!');
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Gestion des mises à jour
ipcMain.handle('check-for-updates', async () => {
  console.log('Vérification des mises à jour sur:', UPDATE_CHECK_URL);
  
  return new Promise((resolve) => {
    https.get(UPDATE_CHECK_URL, {
      headers: { 'User-Agent': 'Saturn-Video-Splitter' }
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const release = JSON.parse(data);
          
          if (release.message && release.message.includes('Not Found')) {
            resolve({
              error: 'Repository Saturn non trouvé. Vérifiez que LoupFr/Saturn existe sur GitHub.',
              currentVersion: CURRENT_VERSION
            });
            return;
          }
          
          const latestVersion = release.tag_name ? release.tag_name.replace('v', '') : null;
          
          if (!latestVersion) {
            resolve({
              error: 'Aucune version trouvée dans le repository',
              currentVersion: CURRENT_VERSION
            });
            return;
          }
          
          const updateAvailable = compareVersions(latestVersion, CURRENT_VERSION) > 0;
          
          // Chercher un asset .exe dans la release
          const exeAsset = release.assets ? release.assets.find(asset => 
            asset.name.toLowerCase().includes('.exe') || 
            asset.name.toLowerCase().includes('setup')
          ) : null;
          
          resolve({
            currentVersion: CURRENT_VERSION,
            latestVersion,
            updateAvailable,
            downloadUrl: exeAsset ? exeAsset.browser_download_url : null,
            releaseNotes: release.body || 'Aucune note de version disponible',
            publishedAt: release.published_at,
            hasInstaller: !!exeAsset
          });
        } catch (error) {
          console.error('Erreur parsing update:', error);
          resolve({
            error: 'Erreur lors de l\'analyse de la réponse GitHub: ' + error.message,
            currentVersion: CURRENT_VERSION
          });
        }
      });
    }).on('error', (error) => {
      console.error('Erreur vérification update:', error);
      if (error.code === 'ENOTFOUND') {
        resolve({
          error: 'Pas de connexion internet ou DNS inaccessible',
          currentVersion: CURRENT_VERSION
        });
      } else {
        resolve({
          error: 'Erreur réseau: ' + error.message,
          currentVersion: CURRENT_VERSION
        });
      }
    });
  });
});

// Fonction pour comparer les versions
function compareVersions(version1, version2) {
  const v1parts = version1.split('.').map(Number);
  const v2parts = version2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(v1parts.length, v2parts.length); i++) {
    const v1part = v1parts[i] || 0;
    const v2part = v2parts[i] || 0;
    
    if (v1part > v2part) return 1;
    if (v1part < v2part) return -1;
  }
  
  return 0;
}

// Téléchargement et installation mise à jour
ipcMain.handle('download-update', async (event, downloadUrl) => {
  console.log('Téléchargement mise à jour:', downloadUrl);
  
  const updateDir = path.join(os.tmpdir(), 'saturn-update');
  const updateFile = path.join(updateDir, 'Saturn-Setup.exe');
  
  // Créer le dossier temporaire
  if (!fs.existsSync(updateDir)) {
    fs.mkdirSync(updateDir, { recursive: true });
  }
  
  return new Promise((resolve, reject) => {
    https.get(downloadUrl, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error('Impossible de télécharger: HTTP ' + response.statusCode));
        return;
      }
      
      const file = fs.createWriteStream(updateFile);
      const totalSize = parseInt(response.headers['content-length'], 10);
      let downloaded = 0;
      
      response.on('data', (chunk) => {
        downloaded += chunk.length;
        const progress = (downloaded / totalSize * 100).toFixed(1);
        mainWindow.webContents.send('download-progress', { progress, downloaded, totalSize });
      });
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        
        // Lancer l'installateur
        shell.openPath(updateFile).then(() => {
          // Fermer Saturn pour permettre la mise à jour
          setTimeout(() => {
            app.quit();
          }, 1000);
        });
        
        resolve({ success: true, filePath: updateFile });
      });
      
      file.on('error', (error) => {
        fs.unlink(updateFile, () => {}); // Nettoyer
        reject(error);
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
});

// Désinstallation
ipcMain.handle('uninstall-saturn', async () => {
  console.log('Désinstallation Saturn');
  
  const result = await dialog.showMessageBox(mainWindow, {
    type: 'warning',
    buttons: ['Annuler', 'Désinstaller'],
    defaultId: 0,
    cancelId: 0,
    title: 'Désinstaller Saturn',
    message: 'Êtes-vous sûr de vouloir désinstaller Saturn?',
    detail: 'Cette action supprimera complètement Saturn de votre ordinateur. Vos vidéos ne seront pas supprimées.'
  });
  
  if (result.response === 1) {
    // Créer un script de désinstallation
    const uninstallScript = path.join(os.tmpdir(), 'uninstall-saturn.bat');
    const appPath = process.execPath;
    const appDir = path.dirname(appPath);
    
    const batchContent = `@echo off
timeout /t 3 /nobreak >nul
rmdir /s /q "${appDir}"
del "${uninstallScript}"
`;
    
    fs.writeFileSync(uninstallScript, batchContent);
    
    // Lancer le script et fermer
    shell.openPath(uninstallScript);
    app.quit();
    
    return { success: true };
  }
  
  return { cancelled: true };
});

// Obtenir informations système
ipcMain.handle('get-system-info', async () => {
  return {
    version: CURRENT_VERSION,
    platform: process.platform,
    arch: process.arch,
    nodeVersion: process.version,
    electronVersion: process.versions.electron,
    appPath: app.getAppPath(),
    userData: app.getPath('userData')
  };
});

// Reste du code identique à la V1.0...
ipcMain.handle('select-video-file', async () => {
  console.log('Sélection vidéo');
  try {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile'],
      filters: [
        { name: 'Fichiers Vidéo', extensions: ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'webm', 'flv', 'm4v'] }
      ]
    });
    
    return result.canceled ? null : result.filePaths[0];
  } catch (error) {
    console.error('Erreur sélection fichier:', error);
    return null;
  }
});

ipcMain.handle('select-output-folder', async () => {
  console.log('Sélection dossier');
  try {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory']
    });
    
    return result.canceled ? null : result.filePaths[0];
  } catch (error) {
    console.error('Erreur sélection dossier:', error);
    return null;
  }
});

ipcMain.handle('get-video-info', async (event, filePath) => {
  console.log('Analyse vidéo:', path.basename(filePath));
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        console.error('Erreur ffprobe:', err.message);
        reject(err);
        return;
      }
      
      const videoStream = metadata.streams.find(s => s.codec_type === 'video');
      const audioStream = metadata.streams.find(s => s.codec_type === 'audio');
      
      if (!videoStream) {
        reject(new Error('Aucun flux vidéo trouvé'));
        return;
      }
      
      const info = {
        duration: metadata.format.duration,
        width: videoStream.width,
        height: videoStream.height,
        codec: videoStream.codec_name,
        size: metadata.format.size,
        filename: path.basename(filePath, path.extname(filePath)),
        canStreamCopy: videoStream.codec_name === 'h264' && audioStream?.codec_name === 'aac',
        bitrate: metadata.format.bit_rate
      };
      
      console.log('Vidéo analysée:', info.filename, '-', Math.round(info.duration) + 's');
      resolve(info);
    });
  });
});

ipcMain.handle('split-video', async (event, options) => {
  const startTime = Date.now();
  console.log('Début découpage Saturn:', options);
  
  const { 
    filePath, 
    outputDir, 
    clipDuration = 61,
    videoQuality = 'medium',
    resolution = 'original', 
    outputFormat = 'mp4'
  } = options;
  
  const filename = path.basename(filePath, path.extname(filePath));
  const videoFolder = path.join(outputDir, filename);
  
  if (!require('fs').existsSync(videoFolder)) {
    require('fs').mkdirSync(videoFolder, { recursive: true });
    console.log('Dossier Saturn créé:', videoFolder);
  }
  
  const qualitySettings = {
    low: { 
      crf: 30, 
      preset: 'veryfast', 
      threads: 2,
      tune: 'fastdecode'
    },
    medium: { 
      crf: 25, 
      preset: 'fast', 
      threads: 4,
      tune: 'fastdecode'
    },
    high: { 
      crf: 20, 
      preset: 'medium', 
      threads: 6,
      tune: 'film'
    },
    max: { 
      crf: 18, 
      preset: 'slow', 
      threads: 8,
      tune: 'film'
    }
  };
  
  const resolutionSettings = {
    '480p': { width: 854, height: 480 },
    '720p': { width: 1280, height: 720 },
    '1080p': { width: 1920, height: 1080 },
    'original': null
  };
  
  const quality = qualitySettings[videoQuality];
  const resolutionConfig = resolutionSettings[resolution];
  
  const sourceInfo = await new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
  
  const totalDuration = sourceInfo.format.duration;
  const totalClips = Math.ceil(totalDuration / clipDuration);
  console.log('Saturn va créer', totalClips, 'clips');
  
  const clips = [];
  let processedCount = 0;
  
  for (let chunkStart = 0; chunkStart < totalClips; chunkStart += MAX_CONCURRENT_CLIPS) {
    const chunkEnd = Math.min(chunkStart + MAX_CONCURRENT_CLIPS, totalClips);
    const chunkPromises = [];
    
    console.log(`Traitement clips ${chunkStart + 1}-${chunkEnd}`);
    
    for (let i = chunkStart; i < chunkEnd; i++) {
      const startTimeClip = i * clipDuration;
      const endTime = Math.min(startTimeClip + clipDuration, totalDuration);
      const actualDuration = endTime - startTimeClip;
      
      const clipName = filename + '_clip_' + String(i + 1).padStart(2, '0') + '.' + outputFormat;
      const outputPath = path.join(videoFolder, clipName);
      
      const clipPromise = processClip({
        index: i,
        filePath,
        outputPath,
        startTime: startTimeClip,
        duration: actualDuration,
        quality,
        resolutionConfig,
        outputFormat,
        canStreamCopy: resolution === 'original' && outputFormat === 'mp4' && videoQuality === 'max'
      });
      
      chunkPromises.push(clipPromise);
    }
    
    try {
      const chunkResults = await Promise.all(chunkPromises);
      
      for (const result of chunkResults) {
        processedCount++;
        
        const stats = require('fs').statSync(result.outputPath);
        const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(1);
        
        clips.push({
          id: result.index + 1,
          path: result.outputPath,
          duration: result.duration,
          size: fileSizeMB + ' MB',
          quality: videoQuality,
          resolution: resolution,
          format: outputFormat
        });
        
        const overallProgress = (processedCount / totalClips) * 100;
        mainWindow.webContents.send('progress-update', {
          clipIndex: processedCount,
          totalClips: totalClips,
          overallProgress: overallProgress,
          currentClip: `Clip ${processedCount}/${totalClips} - ${Math.round(overallProgress)}%`
        });
      }
      
      console.log(`Chunk terminé - ${processedCount}/${totalClips} clips`);
      
    } catch (error) {
      console.error('Erreur dans chunk:', error);
      throw error;
    }
  }
  
  clips.sort((a, b) => a.id - b.id);
  
  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`Saturn terminé! ${clips.length} clips en ${totalTime}s`);
  
  return { clips, outputDirectory: videoFolder };
});

async function processClip(params) {
  const { index, filePath, outputPath, startTime, duration, quality, resolutionConfig, outputFormat, canStreamCopy } = params;
  
  return new Promise((resolve, reject) => {
    let command = ffmpeg(filePath)
      .seekInput(startTime)
      .duration(duration);
    
    if (canStreamCopy) {
      command = command
        .videoCodec('copy')
        .audioCodec('copy')
        .outputOptions([
          '-avoid_negative_ts', 'make_zero',
          '-copyts'
        ]);
    } else {
      if (outputFormat === 'mp4') {
        command = command
          .videoCodec('libx264')
          .audioCodec('aac')
          .outputOptions([
            '-crf', quality.crf.toString(),
            '-preset', quality.preset,
            '-threads', quality.threads.toString(),
            '-tune', quality.tune,
            '-movflags', '+faststart+frag_keyframe+empty_moov',
            '-avoid_negative_ts', 'make_zero',
            '-max_muxing_queue_size', '1024'
          ]);
      } else if (outputFormat === 'webm') {
        command = command
          .videoCodec('libvpx-vp9')
          .audioCodec('libopus')
          .outputOptions([
            '-crf', quality.crf.toString(),
            '-threads', quality.threads.toString(),
            '-speed', '4'
          ]);
      } else if (outputFormat === 'avi') {
        command = command
          .videoCodec('libx264')
          .audioCodec('mp3')
          .outputOptions([
            '-crf', quality.crf.toString(),
            '-preset', quality.preset,
            '-threads', quality.threads.toString()
          ]);
      }
      
      if (resolutionConfig) {
        command = command.size(`${resolutionConfig.width}x${resolutionConfig.height}`);
      }
    }
    
    command
      .output(outputPath)
      .on('end', () => {
        resolve({
          index,
          outputPath,
          duration
        });
      })
      .on('error', (err) => {
        console.error(`Erreur clip ${index + 1}:`, err.message);
        reject(err);
      })
      .run();
  });
}

ipcMain.handle('open-folder', async (event, folderPath) => {
  console.log('Ouverture:', folderPath);
  shell.showItemInFolder(folderPath);
});

ipcMain.handle('play-video', async (event, videoPath) => {
  console.log('Lecture:', path.basename(videoPath));
  shell.openPath(videoPath);
});

console.log('Saturn Main Process configuré avec LoupFr/Saturn');