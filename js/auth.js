document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');

    // Initialize users array from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Save users to localStorage
    const saveUsers = () => {
        localStorage.setItem('users', JSON.stringify(users));
    };

    // Tab switching functionality
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginForm.classList.add('active-form');
        signupForm.classList.remove('active-form');
    });

    signupTab.addEventListener('click', () => {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupForm.classList.add('active-form');
        loginForm.classList.remove('active-form');
    });

    // Toggle password visibility
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                btn.classList.remove('fa-eye');
                btn.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                btn.classList.remove('fa-eye-slash');
                btn.classList.add('fa-eye');
            }
        });
    });

    // Handle signup form submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        
        // Validation
        if (!name || !email || !password || !confirmPassword) {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill in all fields',
                icon: 'error',
                confirmButtonColor: '#1DB954'
            });
            return;
        }
        
        if (password !== confirmPassword) {
            Swal.fire({
                title: 'Error!',
                text: 'Passwords do not match',
                icon: 'error',
                confirmButtonColor: '#1DB954'
            });
            return;
        }
        
        // Check if email already exists
        if (users.some(user => user.email === email)) {
            Swal.fire({
                title: 'Error!',
                text: 'Email already registered',
                icon: 'error',
                confirmButtonColor: '#1DB954'
            });
            return;
        }
        
        // Create user
        const newUser = {
            id: Date.now(),
            name,
            email,
            password: btoa(password), // Base64 encoding for simple "encryption"
            profilePic: 'assets/images/default-profile.jpg',
            likedSongs: [],
            playlists: []
        };
        
        users.push(newUser);
        saveUsers();
        
        // Set current user
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        Swal.fire({
            title: 'Success!',
            text: 'Account created successfully',
            icon: 'success',
            confirmButtonColor: '#1DB954'
        }).then(() => {
            window.location.href = 'dashboard.html';
        });
    });
    
    // Handle login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        const rememberMe = document.getElementById('remember-me').checked;
        
        // Validation
        if (!email || !password) {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill in all fields',
                icon: 'error',
                confirmButtonColor: '#1DB954'
            });
            return;
        }
        
        // Find user
        const user = users.find(user => user.email === email);
        
        if (!user || atob(user.password) !== password) {
            Swal.fire({
                title: 'Error!',
                text: 'Invalid email or password',
                icon: 'error',
                confirmButtonColor: '#1DB954'
            });
            return;
        }
        
        // Set current user
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Remember me
        if (rememberMe) {
            localStorage.setItem('rememberMe', true);
        } else {
            localStorage.removeItem('rememberMe');
        }
        
        Swal.fire({
            title: 'Success!',
            text: 'Login successful',
            icon: 'success',
            confirmButtonColor: '#1DB954'
        }).then(() => {
            window.location.href = 'dashboard.html';
        });
    });
    
    // Check if user is already logged in
    const checkLogin = () => {
        const currentUser = localStorage.getItem('currentUser');
        const rememberMe = localStorage.getItem('rememberMe');
        
        if (currentUser && rememberMe) {
            window.location.href = 'dashboard.html';
        }
    };
    
    // Initialize
    checkLogin();
}); 