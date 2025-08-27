# 🪐 Saturn Video Splitter

Saturn is a powerful and user-friendly video splitting tool built with Electron and FFmpeg. Split your long videos into clips of determined duration with high quality and performance.

## ✨ Features

### Core Functionality
- **Smart Video Splitting**: Split videos into clips of custom duration (1-600 seconds)
- **Multiple Formats**: Support for MP4, AVI, MKV, MOV, WebM, FLV, M4V
- **Quality Options**: 4 quality presets from fast/light to maximum quality
- **Resolution Control**: Original, 1080p, 720p, 480p output options
- **Output Formats**: MP4, WebM, AVI with optimized settings

### v1.1.0 New Features
- ⚙️ **Settings Page**: Complete settings interface with version info
- 🔄 **Auto-Update System**: Automatic update checking and installation
- 📋 **Version Management**: Patch notes and changelog display
- 🗑️ **Uninstall Feature**: Clean uninstallation with confirmation
- 📡 **GitHub Integration**: Seamless updates from GitHub releases

### Interface & Experience
- **Multilingual**: English, French, Spanish, Italian
- **Modern UI**: Dark theme with smooth animations
- **Real-time Progress**: Live progress tracking during processing
- **Batch Processing**: Parallel clip processing for speed
- **Discord Community**: Direct access to support community

## 🚀 Quick Start

### Installation
1. Download the latest Saturn-Setup.exe from GitHub Releases
2. Run the installer and follow the setup wizard
3. Launch Saturn from your desktop or start menu

### Usage
1. **Select Video**: Click to browse and select your video file
2. **Output Folder**: Choose where to save the split clips
3. **Duration**: Set the desired clip duration in seconds
4. **Quality Settings**: Choose quality, resolution, and format
5. **Split**: Click the split button and wait for processing
6. **Results**: View, play, or locate your generated clips

## 🔧 Development

### Prerequisites
- Node.js 16+
- npm or yarn
- Git (for cloning)

### Setup
```bash
git clone https://github.com/your-username/saturn-video-splitter.git
cd saturn-video-splitter
npm install
```

### Build Application
```bash
npm run package  # Creates portable version
npm run build    # Creates installer
```

## 📦 Technical Details

### Built With
- **Electron**: Cross-platform desktop application framework
- **FFmpeg**: Video processing engine with full codec support
- **Node.js**: Backend processing and file system operations
- **HTML/CSS/JS**: Modern web technologies for the interface

### Performance
- **Multi-threading**: Utilizes all CPU cores for faster processing
- **Memory Efficient**: Optimized for large video files
- **Stream Copy**: Smart codec detection for faster processing when possible
- **Batch Processing**: Multiple clips processed simultaneously

## 🌍 Internationalization

Saturn supports 4 languages out of the box:
- **English** (Default)
- **Français** (French)
- **Español** (Spanish)
- **Italiano** (Italian)

Language switching is persistent and affects all UI elements.

## 🔄 Auto-Update System

Saturn v1.1.0 introduces a complete auto-update system:

### For Users
- **Automatic Detection**: Saturn checks GitHub for new versions
- **One-Click Updates**: Download and install updates with one click
- **Progress Tracking**: Real-time download progress
- **Safe Installation**: Updates are verified before installation

### For Developers
- **GitHub Integration**: Releases are pulled from GitHub API
- **Semantic Versioning**: Proper version comparison
- **Asset Management**: Automatic installer download from releases
- **Cross-Platform**: Works on Windows with plans for macOS/Linux

## 📋 Changelog

### v1.1.0 (Latest)
- ✨ Added complete Settings page with version information
- 🔄 Integrated automatic update system with GitHub
- 🗑️ Added uninstall feature with safety confirmation
- 📡 GitHub API integration for version checking
- 🎯 Enhanced UI responsiveness and error handling
- 🌐 Extended multilingual support to settings page
- 🐛 Fixed minor bugs and improved performance

### v1.0.0
- 🎬 Core video splitting functionality
- 🎨 Modern dark UI with animations
- 🌍 4-language support (EN/FR/ES/IT)
- ⚡ Multi-threaded processing
- 📁 Batch clip management
- 🎮 Discord community integration

## 🤝 Community & Support

- **Discord**: Join our community at discord.gg/qQHNQqSjJR
- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Feature requests and community discussions on GitHub

## 📄 License

This project is licensed under the MIT License.

## ⚖️ Legal Notice

Saturn is provided as is, without warranty of any kind. Users are responsible for compliance with all applicable laws regarding video processing and distribution.

---

**Made with ❤️ by the Saturn Team**

*Split your videos, keep your quality, save your time.*