document.addEventListener('DOMContentLoaded', () => {
    // Reset localStorage data to use updated sample songs
    localStorage.removeItem('songs');
    
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    // DOM Elements
    const userNameElement = document.getElementById('user-name');
    const headerUserNameElement = document.getElementById('header-user-name');
    const userAvatarElement = document.getElementById('user-avatar');
    const headerUserAvatarElement = document.getElementById('header-user-avatar');
    const playlistListElement = document.getElementById('playlist-list');
    const searchInput = document.getElementById('search-input');
    const featuredTracksContainer = document.getElementById('featured-tracks');
    const recentlyPlayedContainer = document.getElementById('recently-played');
    const allSongsContainer = document.getElementById('all-songs');
    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const nowPlayingCover = document.getElementById('now-playing-cover');
    const nowPlayingTitle = document.getElementById('now-playing-title');
    const nowPlayingArtist = document.getElementById('now-playing-artist');
    const likeSongBtn = document.getElementById('like-song-btn');
    const progressElement = document.getElementById('progress');
    const progressBar = document.querySelector('.progress-bar');
    const currentTimeElement = document.getElementById('current-time');
    const totalTimeElement = document.getElementById('total-time');
    const volumeElement = document.getElementById('volume');
    const volumeBar = document.querySelector('.volume-bar');
    const muteBtn = document.getElementById('mute-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const addSongBtn = document.getElementById('add-song-btn');
    const addSongModal = document.getElementById('add-song-modal');
    const createPlaylistBtn = document.getElementById('create-playlist-btn');
    const createPlaylistModal = document.getElementById('create-playlist-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const fileTab = document.getElementById('file-tab');
    const urlTab = document.getElementById('url-tab');
    const fileInputContainer = document.getElementById('file-input-container');
    const urlInputContainer = document.getElementById('url-input-container');
    const coverFileTab = document.getElementById('cover-file-tab');
    const coverUrlTab = document.getElementById('cover-url-tab');
    const coverFileInputContainer = document.getElementById('cover-file-input-container');
    const coverUrlInputContainer = document.getElementById('cover-url-input-container');
    const addSongForm = document.getElementById('add-song-form');
    const createPlaylistForm = document.getElementById('create-playlist-form');
    const userDropdownBtn = document.getElementById('user-dropdown-btn');
    const userDropdownMenu = document.querySelector('.user-dropdown-menu');

    // Player state
    let currentSongIndex = 0;
    let isPlaying = false;
    let isShuffle = false;
    let isRepeat = false;
    let volume = 0.7; // Default volume
    let songsList = [];
    let playingQueue = [];

    // Update user info
    function updateUserInfo() {
        userNameElement.textContent = currentUser.name;
        headerUserNameElement.textContent = currentUser.name;
        userAvatarElement.src = currentUser.profilePic;
        headerUserAvatarElement.src = currentUser.profilePic;
    }

    // Initialize page
    function init() {
        updateUserInfo();
        loadSongs();
        loadPlaylists();
        setupEventListeners();
    }

    // Load all songs
    function loadSongs() {
        songsList = getSongs();
        displayFeaturedSongs();
        displayRecentlyPlayed();
        displayAllSongs();
    }

    // Display featured songs
    function displayFeaturedSongs() {
        const featuredSongs = getFeaturedSongs();
        featuredTracksContainer.innerHTML = '';

        featuredSongs.forEach(song => {
            const songCard = createSongCard(song);
            featuredTracksContainer.appendChild(songCard);
        });
    }

    // Display recently played songs
    function displayRecentlyPlayed() {
        const recentlyPlayed = getRecentlyPlayed();
        recentlyPlayedContainer.innerHTML = '';

        if (recentlyPlayed.length === 0) {
            recentlyPlayedContainer.innerHTML = '<p class="empty-message">No recently played songs</p>';
            return;
        }

        recentlyPlayed.forEach(song => {
            const songCard = createSongCard(song);
            recentlyPlayedContainer.appendChild(songCard);
        });
    }

    // Display all songs
    function displayAllSongs() {
        allSongsContainer.innerHTML = '';
        
        songsList.forEach((song, index) => {
            const songItem = createSongListItem(song, index + 1);
            allSongsContainer.appendChild(songItem);
        });
    }

    // Create song card element
    function createSongCard(song) {
        const songCard = document.createElement('div');
        songCard.className = 'song-card';
        songCard.dataset.id = song.id;
        
        songCard.innerHTML = `
            <div class="song-card-cover">
                <img src="${song.cover}" alt="${song.title}">
                <div class="song-card-play">
                    <i class="fas fa-play"></i>
                </div>
                <div class="song-card-actions">
                    <button class="song-card-action ${song.liked ? 'liked' : ''}" data-action="like">
                        <i class="fa${song.liked ? 's' : 'r'} fa-heart"></i>
                    </button>
                    <button class="song-card-action" data-action="add-to-playlist">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <h3 class="song-card-title">${song.title}</h3>
            <p class="song-card-artist">${song.artist}</p>
        `;
        
        songCard.querySelector('.song-card-play').addEventListener('click', (e) => {
            e.stopPropagation();
            playSong(song);
        });
        
        songCard.querySelector('[data-action="like"]').addEventListener('click', (e) => {
            e.stopPropagation();
            const likeBtn = e.currentTarget;
            const isLiked = toggleLikeSong(song.id);
            
            likeBtn.innerHTML = isLiked ? 
                '<i class="fas fa-heart"></i>' : 
                '<i class="far fa-heart"></i>';
            
            likeBtn.classList.toggle('liked', isLiked);
        });
        
        songCard.querySelector('[data-action="add-to-playlist"]').addEventListener('click', (e) => {
            e.stopPropagation();
            showAddToPlaylistDialog(song.id);
        });
        
        songCard.addEventListener('click', () => {
            playSong(song);
        });
        
        return songCard;
    }

    // Create song list item element
    function createSongListItem(song, number) {
        const songItem = document.createElement('div');
        songItem.className = 'song-item';
        songItem.dataset.id = song.id;
        
        songItem.innerHTML = `
            <div class="song-number">${number}</div>
            <div class="song-details">
                <div class="song-details-cover">
                    <img src="${song.cover}" alt="${song.title}">
                </div>
                <div class="song-details-text">
                    <h3>${song.title}</h3>
                    <p>${song.artist}</p>
                </div>
            </div>
            <div class="song-duration">${formatDuration(song.duration)}</div>
            <div class="song-actions-container">
                <button class="song-action ${song.liked ? 'liked' : ''}" data-action="like">
                    <i class="fa${song.liked ? 's' : 'r'} fa-heart"></i>
                </button>
                <button class="song-action" data-action="add-to-playlist">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        `;
        
        songItem.addEventListener('click', (e) => {
            // If the like button was clicked, toggle like instead of playing
            if (e.target.closest('[data-action="like"]')) {
                const likeBtn = e.target.closest('[data-action="like"]');
                const songId = parseInt(songItem.dataset.id);
                const isLiked = toggleLikeSong(songId);
                
                likeBtn.innerHTML = isLiked ? 
                    '<i class="fas fa-heart"></i>' : 
                    '<i class="far fa-heart"></i>';
                    
                likeBtn.classList.toggle('liked', isLiked);
                return;
            }
            
            // If add to playlist button was clicked
            if (e.target.closest('[data-action="add-to-playlist"]')) {
                const songId = parseInt(songItem.dataset.id);
                showAddToPlaylistDialog(songId);
                return;
            }
            
            // Otherwise play the song
            const songId = parseInt(songItem.dataset.id);
            const song = songsList.find(s => s.id === songId);
            playSong(song);
        });
        
        return songItem;
    }

    // Load user playlists
    function loadPlaylists() {
        const playlists = getPlaylists();
        // Keep the first item (Liked Songs) and add user playlists
        const likedSongsItem = playlistListElement.firstElementChild;
        playlistListElement.innerHTML = '';
        playlistListElement.appendChild(likedSongsItem);
        
        playlists.forEach(playlist => {
            const playlistItem = document.createElement('li');
            playlistItem.innerHTML = `
                <a href="#" data-playlist-id="${playlist.id}">
                    <i class="fas fa-music"></i>
                    <span>${playlist.name}</span>
                </a>
            `;
            
            playlistItem.querySelector('a').addEventListener('click', (e) => {
                e.preventDefault();
                displayPlaylistSongs(playlist.id);
            });
            
            playlistListElement.appendChild(playlistItem);
        });
        
        // Setup Liked Songs click event
        likedSongsItem.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            displayLikedSongs();
        });
    }
    
    // Display songs from a specific playlist
    function displayPlaylistSongs(playlistId) {
        const playlistSongs = getPlaylistSongs(playlistId);
        allSongsContainer.innerHTML = '';
        
        const playlists = getPlaylists();
        const playlist = playlists.find(p => p.id === playlistId);
        
        // Add playlist name as a title
        const playlistTitle = document.createElement('h2');
        playlistTitle.textContent = playlist.name;
        allSongsContainer.appendChild(playlistTitle);
        
        if (playlistSongs.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = 'This playlist is empty. Add some songs!';
            allSongsContainer.appendChild(emptyMessage);
            return;
        }
        
        playlistSongs.forEach((song, index) => {
            const songItem = createSongListItem(song, index + 1);
            allSongsContainer.appendChild(songItem);
        });
    }
    
    // Display liked songs
    function displayLikedSongs() {
        const likedSongs = getLikedSongs();
        allSongsContainer.innerHTML = '';
        
        // Add title
        const title = document.createElement('h2');
        title.textContent = 'Liked Songs';
        allSongsContainer.appendChild(title);
        
        if (likedSongs.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = 'You haven\'t liked any songs yet.';
            allSongsContainer.appendChild(emptyMessage);
            return;
        }
        
        likedSongs.forEach((song, index) => {
            const songItem = createSongListItem(song, index + 1);
            allSongsContainer.appendChild(songItem);
        });
    }

    // Play a song
    function playSong(song) {
        if (!song) return;
        
        currentSongIndex = songsList.findIndex(s => s.id === song.id);
        
        // Reset playingQueue if it's a new song selection
        if (playingQueue.length === 0 || playingQueue[0].id !== song.id) {
            playingQueue = [...songsList];
            if (isShuffle) {
                shuffleQueue();
            }
        }
        
        // Update player UI
        nowPlayingCover.src = song.cover;
        nowPlayingTitle.textContent = song.title;
        nowPlayingArtist.textContent = song.artist;
        
        // Update like button
        likeSongBtn.innerHTML = song.liked ? 
            '<i class="fas fa-heart"></i>' : 
            '<i class="far fa-heart"></i>';
        
        // Add to recently played regardless of playback status
        // to ensure UI stays consistent
        addToRecentlyPlayed(song.id);
        
        // Set audio source and play
        try {
            // Check if song.file is a URL and fall back if needed
            let audioSource = song.file;
            
            audioPlayer.src = audioSource;
            audioPlayer.onerror = function() {
                // Audio failed to load, show error
                console.error('Error loading audio file:', audioSource);
                Swal.fire({
                    title: 'Playback Error',
                    html: `<p>Cannot play "${song.title}".</p><p>Try adding your own songs using the "Add Song" button.</p>`,
                    icon: 'error',
                    confirmButtonColor: '#1DB954',
                    confirmButtonText: 'OK'
                });
            };
            
            // Try to play the audio
            const playPromise = audioPlayer.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        isPlaying = true;
                        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    })
                    .catch(error => {
                        console.error('Error playing audio:', error);
                        // The play() promise was rejected
                        // This usually happens because the user hasn't interacted with the document yet
                        isPlaying = false;
                        playBtn.innerHTML = '<i class="fas fa-play"></i>';
                    });
            }
        } catch (error) {
            console.error('Critical error playing audio:', error);
            Swal.fire({
                title: 'Error',
                text: 'Unable to play this song. Try adding your own songs.',
                icon: 'error',
                confirmButtonColor: '#1DB954'
            });
        }
    }

    // Play previous song
    function playPreviousSong() {
        let prevIndex = currentSongIndex - 1;
        if (prevIndex < 0) {
            prevIndex = songsList.length - 1;
        }
        
        playSong(songsList[prevIndex]);
    }
    
    // Play next song
    function playNextSong() {
        let nextIndex = currentSongIndex + 1;
        if (nextIndex >= songsList.length) {
            nextIndex = 0;
        }
        
        playSong(songsList[nextIndex]);
    }
    
    // Shuffle the playing queue
    function shuffleQueue() {
        for (let i = playingQueue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [playingQueue[i], playingQueue[j]] = [playingQueue[j], playingQueue[i]];
        }
    }
    
    // Toggle play/pause
    function togglePlay() {
        if (audioPlayer.src) {
            if (isPlaying) {
                audioPlayer.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                audioPlayer.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
            isPlaying = !isPlaying;
        } else if (songsList.length > 0) {
            // If no song is playing, play the first song
            playSong(songsList[0]);
        }
    }
    
    // Toggle shuffle
    function toggleShuffle() {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle('active', isShuffle);
        
        if (isShuffle) {
            shuffleQueue();
        } else {
            // Reset queue to original order
            playingQueue = [...songsList];
        }
    }
    
    // Toggle repeat
    function toggleRepeat() {
        isRepeat = !isRepeat;
        repeatBtn.classList.toggle('active', isRepeat);
        audioPlayer.loop = isRepeat;
    }
    
    // Update progress bar
    function updateProgress() {
        const { currentTime, duration } = audioPlayer;
        if (duration) {
            // Update progress bar
            const progressPercent = (currentTime / duration) * 100;
            progressElement.style.width = `${progressPercent}%`;
            
            // Update time displays
            currentTimeElement.textContent = formatDuration(Math.floor(currentTime));
            totalTimeElement.textContent = formatDuration(Math.floor(duration));
        } else {
            currentTimeElement.textContent = '0:00';
            totalTimeElement.textContent = '0:00';
        }
    }
    
    // Set progress based on click position
    function setProgress(e) {
        const width = progressBar.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        
        if (duration) {
            audioPlayer.currentTime = (clickX / width) * duration;
        }
    }
    
    // Update volume display
    function updateVolumeDisplay() {
        volumeElement.style.width = `${volume * 100}%`;
        
        // Update mute button icon
        if (volume === 0) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else if (volume < 0.5) {
            muteBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }
    
    // Set volume based on click position
    function setVolume(e) {
        const width = volumeBar.clientWidth;
        const clickX = e.offsetX;
        
        volume = clickX / width;
        if (volume < 0) volume = 0;
        if (volume > 1) volume = 1;
        
        audioPlayer.volume = volume;
        updateVolumeDisplay();
    }

    // Toggle mute
    function toggleMute() {
        if (audioPlayer.volume > 0) {
            // Store the current volume before muting
            volume = audioPlayer.volume;
            audioPlayer.volume = 0;
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            volumeElement.style.width = '0%';
        } else {
            // Restore previous volume
            audioPlayer.volume = volume;
            updateVolumeDisplay();
        }
    }
    
    // Filter songs based on search
    function filterSongs() {
        const query = searchInput.value.trim();
        if (query === '') {
            // Reset to default view
            loadSongs();
            return;
        }
        
        const filteredSongs = searchSongs(query);
        allSongsContainer.innerHTML = '';
        
        if (filteredSongs.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = `No songs found matching "${query}"`;
            allSongsContainer.appendChild(emptyMessage);
            return;
        }
        
        filteredSongs.forEach((song, index) => {
            const songItem = createSongListItem(song, index + 1);
            allSongsContainer.appendChild(songItem);
        });
    }
    
    // Show modal
    function showModal(modal) {
        modal.classList.add('active');
    }
    
    // Hide modal
    function hideModal(modal) {
        modal.classList.remove('active');
    }
    
    // Handle add song form submission
    function handleAddSongSubmit(e) {
        e.preventDefault();
        
        const title = document.getElementById('song-title').value.trim();
        const artist = document.getElementById('song-artist').value.trim();
        const songFile = document.getElementById('song-file');
        const songUrl = document.getElementById('song-url').value.trim();
        const coverFile = document.getElementById('cover-file');
        const coverUrl = document.getElementById('cover-url').value.trim();
        
        // Validation
        if (!title || !artist) {
            Swal.fire({
                title: 'Error',
                text: 'Please fill in all required fields',
                icon: 'error',
                confirmButtonColor: '#1DB954'
            });
            return;
        }
        
        // Get song source
        let songSource = '';
        if (fileTab.classList.contains('active')) {
            if (!songFile.files.length) {
                Swal.fire({
                    title: 'Error',
                    text: 'Please upload a song file',
                    icon: 'error',
                    confirmButtonColor: '#1DB954'
                });
                return;
            }
            songSource = URL.createObjectURL(songFile.files[0]);
        } else {
            if (!songUrl) {
                Swal.fire({
                    title: 'Error',
                    text: 'Please enter a song URL',
                    icon: 'error',
                    confirmButtonColor: '#1DB954'
                });
                return;
            }
            songSource = songUrl;
        }
        
        // Get cover source
        let coverSource = '';
        if (coverFileTab.classList.contains('active')) {
            if (!coverFile.files.length) {
                coverSource = 'assets/images/default-cover.jpg';
            } else {
                coverSource = URL.createObjectURL(coverFile.files[0]);
            }
        } else {
            if (!coverUrl) {
                coverSource = 'assets/images/default-cover.jpg';
            } else {
                coverSource = coverUrl;
            }
        }
        
        // Create new song
        const newSong = {
            title,
            artist,
            file: songSource,
            cover: coverSource,
            duration: 0, // Will be updated once audio loads
            liked: false,
            featured: false
        };
        
        // Create a temporary audio element to get duration
        const tempAudio = new Audio(songSource);
        tempAudio.addEventListener('loadedmetadata', () => {
            newSong.duration = Math.floor(tempAudio.duration);
            
            // Add song to library
            addSong(newSong);
            
            // Reload songs
            loadSongs();
            
            // Hide modal and reset form
            hideModal(addSongModal);
            addSongForm.reset();
            
            Swal.fire({
                title: 'Success',
                text: 'Song added successfully',
                icon: 'success',
                confirmButtonColor: '#1DB954'
            });
        });
        
        tempAudio.addEventListener('error', () => {
            Swal.fire({
                title: 'Error',
                text: 'Failed to load song. Please check the URL or file.',
                icon: 'error',
                confirmButtonColor: '#1DB954'
            });
        });
    }
    
    // Handle create playlist form submission
    function handleCreatePlaylistSubmit(e) {
        e.preventDefault();
        
        const playlistName = document.getElementById('playlist-name').value.trim();
        
        if (!playlistName) {
            Swal.fire({
                title: 'Error',
                text: 'Please enter a playlist name',
                icon: 'error',
                confirmButtonColor: '#1DB954'
            });
            return;
        }
        
        // Create new playlist
        createPlaylist(playlistName);
        
        // Reload playlists
        loadPlaylists();
        
        // Hide modal and reset form
        hideModal(createPlaylistModal);
        createPlaylistForm.reset();
        
        Swal.fire({
            title: 'Success',
            text: 'Playlist created successfully',
            icon: 'success',
            confirmButtonColor: '#1DB954'
        });
    }
    
    // Logout user
    function logout() {
        // Remove remember me
        localStorage.removeItem('rememberMe');
        
        // Clear current user
        localStorage.removeItem('currentUser');
        
        // Redirect to login page
        window.location.href = 'index.html';
    }
    
    // Toggle user dropdown menu
    function toggleUserDropdown() {
        userDropdownMenu.classList.toggle('active');
        
        // Toggle icon
        if (userDropdownMenu.classList.contains('active')) {
            userDropdownBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
        } else {
            userDropdownBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        }
    }
    
    // Setup all event listeners
    function setupEventListeners() {
        // Audio player events
        audioPlayer.addEventListener('timeupdate', updateProgress);
        audioPlayer.addEventListener('ended', () => {
            if (!isRepeat) {
                playNextSong();
            }
        });
        
        // Progress bar
        progressBar.addEventListener('click', setProgress);
        
        // Volume controls
        volumeBar.addEventListener('click', setVolume);
        muteBtn.addEventListener('click', toggleMute);
        
        // Player controls
        playBtn.addEventListener('click', togglePlay);
        prevBtn.addEventListener('click', playPreviousSong);
        nextBtn.addEventListener('click', playNextSong);
        shuffleBtn.addEventListener('click', toggleShuffle);
        repeatBtn.addEventListener('click', toggleRepeat);
        
        // Like song
        likeSongBtn.addEventListener('click', () => {
            if (currentSongIndex >= 0) {
                const currentSong = songsList[currentSongIndex];
                const isLiked = toggleLikeSong(currentSong.id);
                
                likeSongBtn.innerHTML = isLiked ? 
                    '<i class="fas fa-heart"></i>' : 
                    '<i class="far fa-heart"></i>';
                    
                // Update song in the list
                songsList = getSongs();
            }
        });
        
        // Search
        searchInput.addEventListener('input', filterSongs);
        
        // User dropdown
        userDropdownBtn.addEventListener('click', toggleUserDropdown);
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.user-dropdown') && userDropdownMenu.classList.contains('active')) {
                userDropdownMenu.classList.remove('active');
                userDropdownBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
            }
        });
        
        // Logout
        logoutBtn.addEventListener('click', logout);
        
        // Add song modal
        addSongBtn.addEventListener('click', () => showModal(addSongModal));
        
        // Create playlist modal
        createPlaylistBtn.addEventListener('click', () => showModal(createPlaylistModal));
        
        // Close modals
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal');
                hideModal(modal);
            });
        });
        
        // Tab switching in add song form
        fileTab.addEventListener('click', () => {
            fileTab.classList.add('active');
            urlTab.classList.remove('active');
            fileInputContainer.style.display = 'block';
            urlInputContainer.style.display = 'none';
        });
        
        urlTab.addEventListener('click', () => {
            urlTab.classList.add('active');
            fileTab.classList.remove('active');
            urlInputContainer.style.display = 'block';
            fileInputContainer.style.display = 'none';
        });
        
        coverFileTab.addEventListener('click', () => {
            coverFileTab.classList.add('active');
            coverUrlTab.classList.remove('active');
            coverFileInputContainer.style.display = 'block';
            coverUrlInputContainer.style.display = 'none';
        });
        
        coverUrlTab.addEventListener('click', () => {
            coverUrlTab.classList.add('active');
            coverFileTab.classList.remove('active');
            coverUrlInputContainer.style.display = 'block';
            coverFileInputContainer.style.display = 'none';
        });
        
        // Form submissions
        addSongForm.addEventListener('submit', handleAddSongSubmit);
        createPlaylistForm.addEventListener('submit', handleCreatePlaylistSubmit);
        
        // Initialize volume
        audioPlayer.volume = volume;
        updateVolumeDisplay();
    }
    
    // Show dialog to add song to playlist
    function showAddToPlaylistDialog(songId) {
        const playlists = getPlaylists();
        const song = songsList.find(s => s.id === songId);
        
        if (playlists.length === 0) {
            Swal.fire({
                title: 'No Playlists',
                text: 'You don\'t have any playlists yet. Create a playlist first.',
                icon: 'info',
                confirmButtonColor: '#1DB954',
                confirmButtonText: 'Create Playlist',
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    showModal(createPlaylistModal);
                }
            });
            return;
        }
        
        // Create HTML for playlist options
        const playlistOptions = playlists.map(playlist => {
            return `<div class="playlist-option" data-id="${playlist.id}">
                <i class="fas fa-music"></i>
                <span>${playlist.name}</span>
            </div>`;
        }).join('');
        
        Swal.fire({
            title: `Add "${song.title}" to Playlist`,
            html: `<div class="playlist-options-container">${playlistOptions}</div>`,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonColor: '#6c757d',
            customClass: {
                container: 'add-to-playlist-dialog'
            },
            didOpen: () => {
                const playlistOptionElements = document.querySelectorAll('.playlist-option');
                playlistOptionElements.forEach(option => {
                    option.addEventListener('click', () => {
                        const playlistId = parseInt(option.dataset.id);
                        addSongToPlaylist(songId, playlistId);
                        
                        Swal.fire({
                            title: 'Added!',
                            text: `Song added to ${playlists.find(p => p.id === playlistId).name}`,
                            icon: 'success',
                            confirmButtonColor: '#1DB954',
                            timer: 1500
                        });
                    });
                });
            }
        });
    }
    
    // Initialize page
    init();
}); 