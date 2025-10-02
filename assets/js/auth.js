// Initialize Supabase client
// Replace these with your actual Supabase project URL and anon key
const SUPABASE_URL = 'https://cofieuukomqdjbjmrqxs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvZmlldXVrb21xZGpiam1ycXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MTQ2NTMsImV4cCI6MjA3NDk5MDY1M30.gYxcAUuWcjx3wphrV2NoC741i97PyaOWQeKmQMsknos';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Check authentication status
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
        // User is authenticated
        showAuthenticatedState(session.user);
        
        // If on login page, redirect to home
        if (window.location.pathname.endsWith('/login.html') || window.location.pathname.endsWith('/login')) {
            window.location.href = '/';
        }
    } else {
        // User is not authenticated
        showUnauthenticatedState();
        
        // If not on login page, redirect to login
        if (!window.location.pathname.endsWith('/login.html') && !window.location.pathname.endsWith('/login')) {
            window.location.href = '/login.html';
        }
    }
}

function showAuthenticatedState(user) {
    const userInfo = document.getElementById('user-info');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (userInfo) {
        userInfo.textContent = `Welcome, ${user.email}`;
    }
    
    if (logoutBtn) {
        logoutBtn.style.display = 'inline-block';
    }
}

function showUnauthenticatedState() {
    const userInfo = document.getElementById('user-info');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (userInfo) {
        userInfo.textContent = '';
    }
    
    if (logoutBtn) {
        logoutBtn.style.display = 'none';
    }
}

// Handle logout
async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
        console.error('Error logging out:', error);
        alert('Error logging out');
    } else {
        window.location.href = '/login.html';
    }
}

// Handle login
async function handleLogin(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });
    
    if (error) {
        console.error('Error logging in:', error);
        return { success: false, error: error.message };
    }
    
    return { success: true, data };
}

// Handle signup
async function handleSignup(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });
    
    if (error) {
        console.error('Error signing up:', error);
        return { success: false, error: error.message };
    }
    
    return { success: true, data };
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    
    // Setup logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});
