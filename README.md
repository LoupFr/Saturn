# 🪐 Saturn Video Splitter

Saturn is a powerful video splitting tool built with Electron and FFmpeg. Split your long videos into clips with high quality and performance.

**Repository**: LoupFr/Saturn
**Version**: 1.1.0 (Corrected)
**Auto-Update**: ✅ Enabled

## ✨ Features

### Core Functionality
- **Smart Video Splitting**: Custom duration clips (1-600 seconds)
- **Multiple Formats**: MP4, AVI, MKV, MOV, WebM, FLV, M4V support
- **Quality Options**: 4 presets from fast/light to maximum quality
- **Resolution Control**: Original, 1080p, 720p, 480p options
- **Output Formats**: MP4, WebM, AVI with optimized settings

### v1.1.0 Corrections
- ✅ **GitHub Configuration**: Pre-configured for LoupFr/Saturn
- ✅ **Complete Translations**: All UI elements in 4 languages
- ✅ **Fixed English Emoji**: 🍔 restored for English language
- ✅ **Error Handling**: Better error messages for updates
- ✅ **Settings Interface**: Fully translated settings page

### Interface
- **Multilingual**: English (🍔), French (🥐), Spanish (🌮), Italian (🍕)
- **Modern UI**: Dark theme with smooth animations
- **Real-time Progress**: Live progress tracking
- **Auto-Update**: Seamless updates from GitHub
- **Settings Page**: Complete version info and controls

## 🚀 Quick Start

### Download & Install
1. Download Saturn-Setup.exe from GitHub Releases
2. Run installer and follow setup wizard
3. Launch Saturn from desktop or start menu

### Usage
1. **Select Video**: Browse and select your video file
2. **Output Folder**: Choose save location
3. **Duration**: Set clip duration in seconds
4. **Settings**: Choose quality, resolution, format
5. **Split**: Process and generate clips
6. **Results**: Play, locate, or manage your clips

## 🔧 Development

### Build Requirements
- Node.js 16+
- npm or yarn
- Git

### Setup
```bash
git clone https://github.com/LoupFr/Saturn.git
cd Saturn
npm install
```

### Build Commands
```bash
npm start          # Development mode
npm run package    # Portable version
npm run build      # Installer (.exe)
npm run release    # Build & publish
```

## 🔄 Auto-Update System

Saturn automatically checks for updates from the LoupFr/Saturn repository.

### For Users
- **Settings Page**: Click ⚙️ button → Check for Updates
- **Automatic Detection**: Compares with GitHub releases
- **One-Click Install**: Download and install updates easily
- **Progress Tracking**: Real-time download progress

### For Developers
- **GitHub Integration**: Uses GitHub Releases API
- **Version Comparison**: Semantic versioning support
- **Asset Detection**: Finds .exe installers automatically
- **Error Handling**: Clear error messages for diagnostics

## 🛠️ Configuration

### Pre-configured Settings
- **GitHub Repository**: LoupFr/Saturn (ready to use)
- **Update URL**: https://api.github.com/repos/LoupFr/Saturn/releases/latest
- **Languages**: EN (🍔), FR (🥐), ES (🌮), IT (🍕)
- **Default Quality**: Balanced (recommended)

### Custom Options
- **Clip Duration**: 1-600 seconds (default: 61)
- **Video Quality**: Fast, Balanced, High, Maximum
- **Resolution**: 480p, 720p, 1080p, Original
- **Format**: MP4, WebM, AVI

## 📋 Changelog

### v1.1.0 - Corrected Version
- ✅ Pre-configured GitHub repository (LoupFr/Saturn)
- ✅ Complete interface translations (all 4 languages)
- ✅ Restored English emoji (🍔)
- ✅ Enhanced error handling for updates
- ✅ Improved settings page translations
- ✅ Better diagnostic messages
- ✅ Fixed update status display

### v1.0.0 - Initial Release
- 🎬 Core video splitting functionality
- 🎨 Modern dark UI with animations
- 🌍 Multi-language support
- ⚡ Multi-threaded processing
- 📁 Batch clip management

## 🔍 Troubleshooting

### Update Issues
If you see 'Impossible de vérifier les mises à jour':

1. **Check Repository**: Ensure https://github.com/LoupFr/Saturn exists
2. **Check Release**: Verify v1.1.0 release exists with .exe file
3. **Test API**: Visit https://api.github.com/repos/LoupFr/Saturn/releases/latest
4. **Check Network**: Ensure internet connection is working

### Expected API Response
```json
{
  "tag_name": "v1.1.0",
  "name": "Saturn v1.1.0",
  "assets": [
    {
      "name": "Saturn-Setup.exe",
      "browser_download_url": "..."
    }
  ]
}
```

## 🤝 Support

- **Discord**: Join our community at discord.gg/qQHNQqSjJR
- **Issues**: Report bugs on GitHub Issues
- **Repository**: https://github.com/LoupFr/Saturn

## 📄 License

MIT License - Free and Open Source

## 🏗️ Technical Details

### Built With
- **Electron**: Desktop application framework
- **FFmpeg**: Video processing engine
- **Node.js**: Backend processing
- **HTML/CSS/JS**: Modern web interface

### Performance
- **Multi-threading**: Uses all CPU cores
- **Memory Efficient**: Optimized for large files
- **Smart Codec**: Stream copy when possible
- **Batch Processing**: Multiple clips simultaneously

---

**Configured for LoupFr/Saturn** | **Ready for Auto-Updates** | **v1.1.0 Corrected**

*Split your videos, keep your quality, save your time.*