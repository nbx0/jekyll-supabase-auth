/**
 * Supabase Authentication for Jekyll Sites
 * 
 * Features:
 * - Login/Signup with email confirmation
 * - Password reset flow
 * - Session management
 * - Automatic redirects for protected pages
 * 
 * Setup:
 * 1. Replace SUPABASE_URL and SUPABASE_ANON_KEY with your credentials
 * 2. Include this script in your layout after loading Supabase client
 * 3. Set window.BASE_URL to your site's baseurl
 */

// ==========================================
// CONFIGURATION - Update these values
// ==========================================
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL'; // e.g., 'https://xxxxx.supabase.co'
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Build site-relative URLs considering Jekyll baseurl
 * @param {string} path - Path to append to baseurl
 * @returns {string} Full path with baseurl
 */
function siteUrl(path) {
    const base = (window.BASE_URL || '').replace(/\/$/, '');
    const p = path.startsWith('/') ? path : '/' + path;
    return base + p;
}

/**
 * Early redirect guard for auth tokens landing at wrong path
 * Ensures email confirmation and password reset links work with baseurl
 */
(function ensureBaseUrlForAuthHash(){
  const base = (window.BASE_URL || '');
  if (base && base !== '/' && window.location.pathname === '/' && window.location.hash.includes('access_token=')) {
     const target = base.replace(/\/$/, '') + '/' + window.location.hash;
     window.location.replace(target);
  }
})();

// ==========================================
// AUTHENTICATION STATE MANAGEMENT
// ==========================================

/**
 * Check authentication status and handle redirects
 * Automatically called on page load
 * Pages can disable this by setting: window.disableAuthCheck = true
 */
async function checkAuth() {
    // Allow pages to disable checkAuth (e.g., password reset page)
    if (window.disableAuthCheck === true) {
        console.log('[auth.js] checkAuth disabled by page');
        return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    const pathname = window.location.pathname;
    
    // Define public pages that don't require authentication
    const loginPaths = [
        siteUrl('/login.html'), siteUrl('/login'), siteUrl('/login/'),
        siteUrl('/reset-password'), siteUrl('/reset-password/'), siteUrl('/reset-password.html')
    ];
    
    // Detect recovery hash (Supabase password reset adds #access_token=...&type=recovery)
    const hashParams = new URLSearchParams(window.location.hash.replace('#', '?'));
    const isRecovery = hashParams.get('type') === 'recovery';
    const resetPathVariants = [
        siteUrl('/reset-password'), 
        siteUrl('/reset-password/'), 
        siteUrl('/reset-password.html')
    ];
    const onResetPage = resetPathVariants.includes(pathname);

    // Redirect recovery tokens to dedicated reset page
    if (isRecovery && !onResetPage) {
        window.location.replace(siteUrl('/reset-password/') + window.location.hash);
        return;
    }

    if (session) {
        // User is authenticated
        if (!isRecovery) {
            showAuthenticatedState(session.user);
            // Redirect away from login page if already authenticated
            if (loginPaths.includes(pathname)) {
                window.location.href = siteUrl('/');
                return;
            }
        } else {
            // During password recovery, show user info but don't redirect
            showAuthenticatedState(session.user);
        }
    } else {
        // User is not authenticated
        showUnauthenticatedState();
        // Redirect to login if trying to access protected page
        if (!loginPaths.includes(pathname)) {
            window.location.href = siteUrl('/login/');
        }
    }
}

/**
 * Update UI for authenticated user
 * @param {Object} user - Supabase user object
 */
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

/**
 * Update UI for unauthenticated state
 */
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

// ==========================================
// AUTHENTICATION FUNCTIONS
// ==========================================

/**
 * Handle user logout
 * @returns {Promise<void>}
 */
async function handleLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.disabled = true;
        logoutBtn.textContent = 'Logging out...';
    }
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
        console.error('Error logging out:', error);
        alert('Error logging out: ' + error.message);
        if (logoutBtn) {
            logoutBtn.disabled = false;
            logoutBtn.textContent = 'Logout';
        }
    } else {
        console.log('Logout successful, redirecting...');
        window.location.href = siteUrl('/login/');
    }
}

/**
 * Handle user login
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{success: boolean, error?: string, data?: Object}>}
 */
async function handleLogin(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) {
            console.error('Error logging in:', error);
            return { success: false, error: error.message };
        }
        
        return { success: true, data };
    } catch (e) {
        console.error('Unexpected login failure:', e);
        return { success: false, error: e.message || 'Unexpected error' };
    }
}

/**
 * Handle user signup
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {Object} meta - User metadata (full_name, city, country, laboratory_name, etc.)
 * @returns {Promise<{success: boolean, error?: string, data?: Object}>}
 */
async function handleSignup(email, password, meta = {}) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: meta.full_name || '',
                    city: meta.city || '',
                    country: meta.country || '',
                    laboratory_name: meta.laboratory_name || ''
                    // Add more metadata fields as needed
                }
            }
        });
        
        if (error) {
            console.error('Error signing up:', error);
            return { success: false, error: error.message };
        }
        
        // Check if user already exists (identities will be empty for duplicate emails)
        const userExists = data && data.user && 
                          data.user.identities && 
                          data.user.identities.length === 0;
        
        if (userExists) {
            return { success: false, error: 'An account with this email already exists.' };
        }
        
        console.log('Signup success:', data);
        return { success: true, data };
    } catch (e) {
        console.error('Unexpected signup failure:', e);
        return { success: false, error: e.message || 'Unexpected error' };
    }
}

/**
 * Request password reset email
 * @param {string} email - User email
 * @returns {Promise<{success: boolean, error?: string, data?: Object}>}
 */
async function requestPasswordReset(email) {
    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + siteUrl('/reset-password/')
        });
        
        if (error) {
            console.error('Error requesting password reset:', error);
            return { success: false, error: error.message };
        }
        
        console.log('Password reset email sent:', data);
        return { success: true, data };
    } catch (e) {
        console.error('Unexpected reset request failure:', e);
        return { success: false, error: e.message || 'Unexpected error' };
    }
}

/**
 * Update user password (called after clicking recovery link)
 * @param {string} newPassword - New password
 * @returns {Promise<{success: boolean, error?: string, data?: Object}>}
 */
async function updatePassword(newPassword) {
    try {
        const { data, error } = await supabase.auth.updateUser({ 
            password: newPassword 
        });
        
        if (error) {
            console.error('Error updating password:', error);
            return { success: false, error: error.message };
        }
        
        console.log('Password updated:', data);
        return { success: true, data };
    } catch (e) {
        console.error('Unexpected password update failure:', e);
        return { success: false, error: e.message || 'Unexpected error' };
    }
}

// ==========================================
// INITIALIZATION
// ==========================================

/**
 * Initialize authentication on page load
 */
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    
    // Setup logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});
