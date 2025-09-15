document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    // DOM Elements
    const profileNameElement = document.getElementById('profile-name');
    const profileEmailElement = document.getElementById('profile-email');
    const profileAvatarElement = document.getElementById('profile-avatar');
    const headerUserNameElement = document.getElementById('header-user-name');
    const headerUserAvatarElement = document.getElementById('header-user-avatar');
    const playlistsCountElement = document.getElementById('playlists-count');
    const likedSongsCountElement = document.getElementById('liked-songs-count');
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const profileViewSection = document.getElementById('profile-view');
    const profileEditSection = document.getElementById('profile-edit');
    const profileForm = document.getElementById('profile-form');
    const editNameInput = document.getElementById('edit-name');
    const editEmailInput = document.getElementById('edit-email');
    const profilePicInput = document.getElementById('profile-pic-input');
    const profileAvatarPreview = document.getElementById('profile-avatar-preview');
    const recentActivityContainer = document.getElementById('recent-activity');
    const logoutBtn = document.getElementById('logout-btn');

    // Initialize page
    function init() {
        updateProfileInfo();
        loadStats();
        loadRecentActivity();
        setupEventListeners();
    }

    // Update profile information
    function updateProfileInfo() {
        profileNameElement.textContent = currentUser.name;
        profileEmailElement.textContent = currentUser.email;
        profileAvatarElement.src = currentUser.profilePic;
        headerUserNameElement.textContent = currentUser.name;
        headerUserAvatarElement.src = currentUser.profilePic;
        
        // Set form values
        editNameInput.value = currentUser.name;
        editEmailInput.value = currentUser.email;
        profileAvatarPreview.src = currentUser.profilePic;
    }

    // Load user stats
    function loadStats() {
        // Playlists count
        const playlists = currentUser.playlists || [];
        playlistsCountElement.textContent = playlists.length;
        
        // Liked songs count
        const songs = JSON.parse(localStorage.getItem('songs')) || [];
        const likedSongs = songs.filter(song => song.liked);
        likedSongsCountElement.textContent = likedSongs.length;
    }

    // Load recent activity
    function loadRecentActivity() {
        recentActivityContainer.innerHTML = '';
        
        // Get recently played songs
        const recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed')) || [];
        const songs = JSON.parse(localStorage.getItem('songs')) || [];
        
        if (recentlyPlayed.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = 'No recent activity';
            recentActivityContainer.appendChild(emptyMessage);
            return;
        }
        
        // Show up to 5 recent activities
        const recentSongs = recentlyPlayed.slice(0, 5).map(id => {
            return songs.find(song => song.id === id);
        }).filter(Boolean);
        
        recentSongs.forEach(song => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            
            activityItem.innerHTML = `
                <div class="activity-icon">
                    <i class="fas fa-music"></i>
                </div>
                <div class="activity-content">
                    <p>You listened to <strong>${song.title}</strong></p>
                    <span class="activity-time">by ${song.artist}</span>
                </div>
            `;
            
            recentActivityContainer.appendChild(activityItem);
        });
    }

    // Switch to edit mode
    function enableEditMode() {
        profileViewSection.classList.remove('active');
        profileEditSection.classList.add('active');
    }

    // Switch to view mode
    function disableEditMode() {
        profileEditSection.classList.remove('active');
        profileViewSection.classList.add('active');
    }

    // Handle profile form submission
    function handleProfileSubmit(e) {
        e.preventDefault();
        
        const name = editNameInput.value.trim();
        
        if (!name) {
            Swal.fire({
                title: 'Error',
                text: 'Please enter your name',
                icon: 'error',
                confirmButtonColor: '#1DB954'
            });
            return;
        }
        
        // Update user information
        currentUser.name = name;
        
        // Update profile picture if changed
        if (profilePicInput.files.length > 0) {
            const file = profilePicInput.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                currentUser.profilePic = e.target.result;
                updateUserInStorage();
            };
            
            reader.readAsDataURL(file);
        } else {
            updateUserInStorage();
        }
    }

    // Update user in localStorage
    function updateUserInStorage() {
        // Update in users array
        const users = JSON.parse(localStorage.getItem('users'));
        const userIndex = users.findIndex(user => user.id === currentUser.id);
        
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem('users', JSON.stringify(users));
        }
        
        // Update current user
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Update UI
        updateProfileInfo();
        
        // Switch back to view mode
        disableEditMode();
        
        Swal.fire({
            title: 'Success',
            text: 'Profile updated successfully',
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

    // Setup event listeners
    function setupEventListeners() {
        // Edit profile button
        editProfileBtn.addEventListener('click', enableEditMode);
        
        // Cancel edit button
        cancelEditBtn.addEventListener('click', disableEditMode);
        
        // Profile form submission
        profileForm.addEventListener('submit', handleProfileSubmit);
        
        // Profile picture change
        profilePicInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                const file = e.target.files[0];
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    profileAvatarPreview.src = e.target.result;
                };
                
                reader.readAsDataURL(file);
            }
        });
        
        // Logout button
        logoutBtn.addEventListener('click', logout);
    }

    // Initialize page
    init();
}); 