// Sample songs with free-to-use tracks
const sampleSongs = [
    {
        id: 1,
        title: "Summer Breeze",
        artist: "Alex Johnson",
        file: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
        cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
        duration: 184, // in seconds
        liked: false,
        featured: true
    },
    {
        id: 2,
        title: "Electronic Dreams",
        artist: "Synthwave Collective",
        file: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
        cover: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
        duration: 212,
        liked: false,
        featured: true
    },
    {
        id: 3,
        title: "Peaceful Morning",
        artist: "Nature Sounds",
        file: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
        cover: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        duration: 146,
        liked: true,
        featured: false
    },
    {
        id: 4,
        title: "Jazzy Evening",
        artist: "Smooth Quartet",
        file: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
        cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        duration: 178,
        liked: false,
        featured: true
    },
    {
        id: 5,
        title: "Workout Motivation",
        artist: "Fitness Beats",
        file: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
        cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        duration: 203,
        liked: false,
        featured: false
    },
    {
        id: 6,
        title: "Acoustic Sunset",
        artist: "Guitar Harmony",
        file: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
        cover: "https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
        duration: 167,
        liked: true,
        featured: false
    },
    {
        id: 7,
        title: "Classical Moments",
        artist: "String Orchestra",
        file: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
        cover: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        duration: 190,
        liked: false,
        featured: true
    },
    {
        id: 8,
        title: "Rainy Day",
        artist: "Ambient Sounds",
        file: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
        cover: "https://images.unsplash.com/photo-1428592953211-077101b2021b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        duration: 154,
        liked: false,
        featured: false
    },
    {
        id: 9,
        title: "Deep Focus",
        artist: "Study Beats",
        file: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
        cover: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        duration: 220,
        liked: true,
        featured: false
    },
    {
        id: 10,
        title: "Chill Lofi",
        artist: "Bedroom Producers",
        file: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
        cover: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        duration: 198,
        liked: false,
        featured: true
    }
];

// Format duration from seconds to MM:SS
function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Get songs from localStorage or use sample songs
function getSongs() {
    const storedSongs = localStorage.getItem('songs');
    if (storedSongs) {
        return JSON.parse(storedSongs);
    } else {
        // Initialize with sample songs
        localStorage.setItem('songs', JSON.stringify(sampleSongs));
        return sampleSongs;
    }
}

// Save songs to localStorage
function saveSongs(songs) {
    localStorage.setItem('songs', JSON.stringify(songs));
}

// Get the user's playlists
function getPlaylists() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser?.playlists || [];
}

// Save playlists to user
function savePlaylists(playlists) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        currentUser.playlists = playlists;
        
        // Update the user in the users array
        const users = JSON.parse(localStorage.getItem('users'));
        const userIndex = users.findIndex(user => user.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem('users', JSON.stringify(users));
        }
        
        // Update current user
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}

// Add a song to the list
function addSong(song) {
    const songs = getSongs();
    // Generate ID for new song
    const newId = songs.length > 0 ? Math.max(...songs.map(s => s.id)) + 1 : 1;
    song.id = newId;
    songs.push(song);
    saveSongs(songs);
    return song;
}

// Create new playlist
function createPlaylist(name) {
    const playlists = getPlaylists();
    const newPlaylist = {
        id: Date.now(),
        name,
        songs: []
    };
    playlists.push(newPlaylist);
    savePlaylists(playlists);
    return newPlaylist;
}

// Add song to playlist
function addSongToPlaylist(songId, playlistId) {
    const playlists = getPlaylists();
    const playlistIndex = playlists.findIndex(p => p.id === playlistId);
    
    if (playlistIndex !== -1) {
        // Check if song is already in playlist
        if (!playlists[playlistIndex].songs.includes(songId)) {
            playlists[playlistIndex].songs.push(songId);
            savePlaylists(playlists);
            return true;
        }
    }
    return false;
}

// Remove song from playlist
function removeSongFromPlaylist(songId, playlistId) {
    const playlists = getPlaylists();
    const playlistIndex = playlists.findIndex(p => p.id === playlistId);
    
    if (playlistIndex !== -1) {
        playlists[playlistIndex].songs = playlists[playlistIndex].songs.filter(id => id !== songId);
        savePlaylists(playlists);
        return true;
    }
    return false;
}

// Toggle like status for a song
function toggleLikeSong(songId) {
    const songs = getSongs();
    const songIndex = songs.findIndex(s => s.id === songId);
    
    if (songIndex !== -1) {
        songs[songIndex].liked = !songs[songIndex].liked;
        saveSongs(songs);
        return songs[songIndex].liked;
    }
    return false;
}

// Get liked songs
function getLikedSongs() {
    const songs = getSongs();
    return songs.filter(song => song.liked);
}

// Get featured songs
function getFeaturedSongs() {
    const songs = getSongs();
    return songs.filter(song => song.featured);
}

// Search songs by title or artist
function searchSongs(query) {
    if (!query) return getSongs();
    
    const songs = getSongs();
    const lowerQuery = query.toLowerCase();
    
    return songs.filter(song => 
        song.title.toLowerCase().includes(lowerQuery) || 
        song.artist.toLowerCase().includes(lowerQuery)
    );
}

// Get songs for a specific playlist
function getPlaylistSongs(playlistId) {
    const playlists = getPlaylists();
    const playlist = playlists.find(p => p.id === playlistId);
    
    if (playlist) {
        const songs = getSongs();
        return playlist.songs.map(id => songs.find(song => song.id === id)).filter(Boolean);
    }
    return [];
}

// Remove a playlist
function removePlaylist(playlistId) {
    const playlists = getPlaylists();
    const filteredPlaylists = playlists.filter(p => p.id !== playlistId);
    savePlaylists(filteredPlaylists);
    return filteredPlaylists;
}

// Create Recently Played Data Structure
function initRecentlyPlayed() {
    if (!localStorage.getItem('recentlyPlayed')) {
        localStorage.setItem('recentlyPlayed', JSON.stringify([]));
    }
}

// Add song to recently played
function addToRecentlyPlayed(songId) {
    initRecentlyPlayed();
    let recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed'));
    
    // Remove if already in list
    recentlyPlayed = recentlyPlayed.filter(id => id !== songId);
    
    // Add to beginning of array
    recentlyPlayed.unshift(songId);
    
    // Keep only last 10 songs
    if (recentlyPlayed.length > 10) {
        recentlyPlayed = recentlyPlayed.slice(0, 10);
    }
    
    localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
}

// Get recently played songs
function getRecentlyPlayed() {
    initRecentlyPlayed();
    const recentIds = JSON.parse(localStorage.getItem('recentlyPlayed'));
    const songs = getSongs();
    
    return recentIds.map(id => songs.find(song => song.id === id)).filter(Boolean);
} 