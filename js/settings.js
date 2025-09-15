document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    // DOM Elements
    const headerUserNameElement = document.getElementById('header-user-name');
    const headerUserAvatarElement = document.getElementById('header-user-avatar');
    const changePasswordBtn = document.getElementById('change-password-btn');
    const deleteAccountBtn = document.getElementById('delete-account-btn');
    const changePasswordModal = document.getElementById('change-password-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const changePasswordForm = document.getElementById('change-password-form');
    const currentPasswordInput = document.getElementById('current-password');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const emailNotificationsToggle = document.getElementById('email-notifications');
    const musicAlertsToggle = document.getElementById('music-alerts');
    const publicProfileToggle = document.getElementById('public-profile');
    const shareActivityToggle = document.getElementById('share-activity');
    const languageSelect = document.getElementById('language-select');
    const themeSelect = document.getElementById('theme-select');
    const qualitySelect = document.getElementById('quality-select');
    const logoutBtn = document.getElementById('logout-btn');

    // Initialize page
    function init() {
        updateUserInfo();
        loadSettings();
        setupEventListeners();
    }

    // Update user info in header
    function updateUserInfo() {
        headerUserNameElement.textContent = currentUser.name;
        headerUserAvatarElement.src = currentUser.profilePic;
    }

    // Load user settings
    function loadSettings() {
        // Initialize settings if they don't exist
        if (!currentUser.settings) {
            currentUser.settings = {
                emailNotifications: true,
                musicAlerts: true,
                publicProfile: false,
                shareActivity: true,
                language: 'en',
                theme: 'dark',
                audioQuality: 'auto'
            };
            updateUserInStorage();
        }

        // Set toggle and select values
        emailNotificationsToggle.checked = currentUser.settings.emailNotifications;
        musicAlertsToggle.checked = currentUser.settings.musicAlerts;
        publicProfileToggle.checked = currentUser.settings.publicProfile;
        shareActivityToggle.checked = currentUser.settings.shareActivity;
        languageSelect.value = currentUser.settings.language;
        themeSelect.value = currentUser.settings.theme;
        qualitySelect.value = currentUser.settings.audioQuality;
    }

    // Show modal
    function showModal(modal) {
        modal.classList.add('active');
    }

    // Hide modal
    function hideModal(modal) {
        modal.classList.remove('active');
        // Reset form
        if (modal === changePasswordModal) {
            changePasswordForm.reset();
        }
    }

    // Handle change password form submission
    function handleChangePasswordSubmit(e) {
        e.preventDefault();

        const currentPassword = currentPasswordInput.value;
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Validate inputs
        if (!currentPassword || !newPassword || !confirmPassword) {
            Swal.fire({
                title: 'Error',
                text: 'All fields are required',
                icon: 'error',
                confirmButtonColor: '#1DB954'
            });
            return;
        }

        // Verify current password
        if (atob(currentUser.password) !== currentPassword) {
            Swal.fire({
                title: 'Error',
                text: 'Current password is incorrect',
                icon: 'error',
                confirmButtonColor: '#1DB954'
            });
            return;
        }

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            Swal.fire({
                title: 'Error',
                text: 'New passwords do not match',
                icon: 'error',
                confirmButtonColor: '#1DB954'
            });
            return;
        }

        // Update password
        currentUser.password = btoa(newPassword);
        updateUserInStorage();

        // Hide modal
        hideModal(changePasswordModal);

        Swal.fire({
            title: 'Success',
            text: 'Password changed successfully',
            icon: 'success',
            confirmButtonColor: '#1DB954'
        });
    }

    // Handle delete account
    function handleDeleteAccount() {
        Swal.fire({
            title: 'Are you sure?',
            text: "This will permanently delete your account and all data. This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e74c3c',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete my account!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Remove user from users array
                const users = JSON.parse(localStorage.getItem('users'));
                const updatedUsers = users.filter(user => user.id !== currentUser.id);
                localStorage.setItem('users', JSON.stringify(updatedUsers));

                // Clear current user
                localStorage.removeItem('currentUser');
                localStorage.removeItem('rememberMe');

                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your account has been deleted.',
                    icon: 'success',
                    confirmButtonColor: '#1DB954'
                }).then(() => {
                    // Redirect to login page
                    window.location.href = 'index.html';
                });
            }
        });
    }

    // Update settings when changed
    function updateSettings(setting, value) {
        currentUser.settings[setting] = value;
        updateUserInStorage();
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
        // Change Password
        changePasswordBtn.addEventListener('click', () => showModal(changePasswordModal));
        closeModalBtn.addEventListener('click', () => hideModal(changePasswordModal));
        changePasswordForm.addEventListener('submit', handleChangePasswordSubmit);

        // Delete Account
        deleteAccountBtn.addEventListener('click', handleDeleteAccount);

        // Toggle and Select Changes
        emailNotificationsToggle.addEventListener('change', () => {
            updateSettings('emailNotifications', emailNotificationsToggle.checked);
        });

        musicAlertsToggle.addEventListener('change', () => {
            updateSettings('musicAlerts', musicAlertsToggle.checked);
        });

        publicProfileToggle.addEventListener('change', () => {
            updateSettings('publicProfile', publicProfileToggle.checked);
        });

        shareActivityToggle.addEventListener('change', () => {
            updateSettings('shareActivity', shareActivityToggle.checked);
        });

        languageSelect.addEventListener('change', () => {
            updateSettings('language', languageSelect.value);
        });

        themeSelect.addEventListener('change', () => {
            updateSettings('theme', themeSelect.value);
            
            // Apply theme (in a real app, this would change the CSS variables)
            Swal.fire({
                title: 'Theme Changed',
                text: 'Theme preference saved',
                icon: 'success',
                confirmButtonColor: '#1DB954'
            });
        });

        qualitySelect.addEventListener('change', () => {
            updateSettings('audioQuality', qualitySelect.value);
            
            // Show confirmation message
            Swal.fire({
                title: 'Audio Quality Changed',
                text: 'Audio quality preference saved',
                icon: 'success',
                confirmButtonColor: '#1DB954'
            });
        });

        // Logout button
        logoutBtn.addEventListener('click', logout);

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === changePasswordModal) {
                hideModal(changePasswordModal);
            }
        });
    }

    // Initialize page
    init();
}); 