# 🎵 Musicify - A Professional Spotify Clone

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A fully-functional, professional-grade Spotify clone built with modern web technologies. This application provides a complete music streaming experience with user authentication, playlist management, and real-time audio playback.

## ✨ Features

### 🔐 **User Authentication & Management**
- **Secure Registration/Login**: Password encryption with Base64 encoding
- **Remember Me**: Persistent login sessions
- **Profile Management**: Edit profile information and upload custom avatars
- **Account Settings**: Change passwords, manage notifications, and privacy settings

### 🎵 **Music Playback & Management**
- **Full Audio Player**: Play, pause, skip, shuffle, and repeat functionality
- **Volume Control**: Adjustable volume with mute/unmute
- **Progress Tracking**: Real-time progress bar with click-to-seek
- **Queue Management**: Smart playlist queue with shuffle support
- **Recently Played**: Automatic tracking of recently played songs

### 📚 **Playlist & Library Management**
- **Create Playlists**: Unlimited custom playlist creation
- **Add Songs to Playlists**: Easy song-to-playlist management
- **Liked Songs**: Heart songs to save them to your favorites
- **Search Functionality**: Find songs by title or artist
- **Featured Tracks**: Curated featured music section

### 🎨 **User Interface & Experience**
- **Modern Design**: Clean, Spotify-inspired interface
- **Responsive Layout**: Works perfectly on desktop and mobile devices
- **Dark Theme**: Easy on the eyes with professional dark styling
- **Interactive Elements**: Smooth animations and hover effects
- **Modal Dialogs**: User-friendly forms for adding songs and playlists

### 🎤 **Song Management**
- **Multiple Upload Methods**: Upload files or add songs via URL
- **Custom Covers**: Upload custom album artwork or use URLs
- **Audio Format Support**: MP3, WAV, OGG, and other web-compatible formats
- **Duration Detection**: Automatic song duration calculation

## 🚀 **Quick Start**

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required!

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JithinGK51/sportify-lite-clone.git
   cd sportify-lite-clone
   ```

2. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local server for better performance:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Start using Musicify!**
   - Create a new account or use demo credentials
   - Explore the music library and create playlists
   - Upload your own songs and enjoy the music!

## 🎯 **Demo Credentials**

For testing purposes, you can use these demo credentials:
- **Email**: `demo@example.com`
- **Password**: `demo123`

## 🛠️ **Technologies Used**

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Storage**: LocalStorage for data persistence
- **UI Components**: SweetAlert2 for notifications
- **Icons**: Font Awesome 6.4.0
- **Audio**: HTML5 Audio API
- **Styling**: Custom CSS with modern design patterns

## 📁 **Project Structure**

```
sportify-lite-clone/
├── 📄 index.html              # Login/Signup page
├── 📄 dashboard.html          # Main music dashboard
├── 📄 profile.html            # User profile management
├── 📄 settings.html           # Account settings
├── 📄 create_samples.py       # Sample data generator
├── 📄 README.md              # Project documentation
├── 📄 .gitignore             # Git ignore rules
│
├── 📁 css/                   # Stylesheets
│   ├── auth.css              # Authentication page styles
│   ├── dashboard.css         # Dashboard page styles
│   ├── profile.css           # Profile page styles
│   └── settings.css          # Settings page styles
│
├── 📁 js/                    # JavaScript modules
│   ├── auth.js               # Authentication logic
│   ├── dashboard.js          # Main application logic
│   ├── profile.js            # Profile management
│   ├── settings.js           # Settings functionality
│   └── songs.js              # Song management utilities
│
└── 📁 assets/                # Static assets
    ├── 📁 audio/             # Sample audio files
    ├── 📁 images/            # Images and icons
    │   ├── default-cover.jpg
    │   ├── default-profile.jpg
    │   └── user-uploads/     # User uploaded images
    └── 📁 songs/             # User uploaded songs
```

## 🎵 **Sample Content**

The application comes pre-loaded with 10 sample songs featuring:
- **Summer Breeze** by Alex Johnson
- **Electronic Dreams** by Synthwave Collective
- **Peaceful Morning** by Nature Sounds
- **Jazzy Evening** by Smooth Quartet
- **Workout Motivation** by Fitness Beats
- **Acoustic Sunset** by Guitar Harmony
- **Classical Moments** by String Orchestra
- **Rainy Day** by Ambient Sounds
- **Deep Focus** by Study Beats
- **Chill Lofi** by Bedroom Producers

## 💾 **Data Storage**

The application uses browser LocalStorage to persist:
- **User Accounts**: Encrypted user data and preferences
- **Music Library**: Song metadata and file references
- **Playlists**: User-created playlists and song associations
- **Playback History**: Recently played songs and user activity
- **Settings**: User preferences and app configuration

## 🔧 **Configuration**

### Adding Your Own Songs
1. Click the "Add Song" button in the dashboard
2. Choose between file upload or URL input
3. Add song title, artist, and optional cover image
4. The song will be added to your library immediately

### Creating Playlists
1. Click the "+" button next to "Playlists" in the sidebar
2. Enter a playlist name
3. Add songs by clicking the "+" button on any song
4. Select your playlist from the sidebar to view songs

## 🌟 **Key Features in Detail**

### **Smart Audio Player**
- **Crossfade Support**: Smooth transitions between songs
- **Keyboard Shortcuts**: Space to play/pause, arrow keys for navigation
- **Visual Feedback**: Real-time progress updates and time display
- **Error Handling**: Graceful fallbacks for unsupported audio formats

### **Advanced Search**
- **Real-time Search**: Instant results as you type
- **Multi-field Search**: Search by song title or artist name
- **Case-insensitive**: Works regardless of capitalization
- **Clear Results**: Easy reset to view all songs

### **User Experience**
- **Responsive Design**: Optimized for all screen sizes
- **Loading States**: Visual feedback during operations
- **Error Messages**: Clear, helpful error notifications
- **Success Confirmations**: Positive feedback for user actions

## 🤝 **Contributing**

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Development Guidelines**
- Follow existing code style and patterns
- Add comments for complex functionality
- Test your changes thoroughly
- Update documentation as needed

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ **Disclaimer**

This project is created for educational purposes and is not affiliated with Spotify AB. All sample content is used under appropriate licenses. The application is designed to demonstrate web development skills and modern JavaScript practices.

## 🐛 **Known Issues & Limitations**

- Audio files must be in web-compatible formats (MP3, WAV, OGG)
- Large audio files may take time to load
- LocalStorage has size limitations (typically 5-10MB)
- Some browsers may require user interaction before playing audio

## 🔮 **Future Enhancements**

- [ ] **Cloud Storage Integration**: Connect to cloud storage services
- [ ] **Social Features**: Share playlists and follow other users
- [ ] **Advanced Audio**: Equalizer and audio effects
- [ ] **Mobile App**: React Native or PWA version
- [ ] **Real-time Sync**: Multi-device synchronization
- [ ] **Music Discovery**: AI-powered recommendations
- [ ] **Offline Mode**: Service worker for offline playback

## 📞 **Support**

If you encounter any issues or have questions:

1. **Check the Issues**: Look through existing GitHub issues
2. **Create an Issue**: Provide detailed information about the problem
3. **Contact**: Reach out through GitHub discussions

## 🙏 **Acknowledgments**

- **Spotify**: For the design inspiration
- **Font Awesome**: For the beautiful icons
- **SweetAlert2**: For elegant notifications
- **Unsplash**: For sample cover images
- **Open Source Community**: For the amazing tools and libraries

---

<div align="center">

**Made with ❤️ by [JithinGK51](https://github.com/JithinGK51)**

⭐ **Star this repository if you found it helpful!** ⭐

</div> 