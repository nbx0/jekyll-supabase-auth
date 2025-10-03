// Initialize Supabase client
// Replace these with your actual Supabase project URL and anon key
const SUPABASE_URL = 'https://cofieuukomqdjbjmrqxs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvZmlldXVrb21xZGpiam1ycXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MTQ2NTMsImV4cCI6MjA3NDk5MDY1M30.gYxcAUuWcjx3wphrV2NoC741i97PyaOWQeKmQMsknos';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Early hash redirect guard (in case layout script missed)
(function ensureBaseUrlForAuthHash(){
  const base=(window.BASE_URL||'');
  if(base && base !== '/' && window.location.pathname==='/' && window.location.hash.includes('access_token=')){
     const target=base.replace(/\/$/,'') + '/' + window.location.hash;
     window.location.replace(target);
  }
})();

// Helper to build site-relative URLs considering baseurl
function siteUrl(path) {
    const base = (window.BASE_URL || '').replace(/\/$/, '');
    const p = path.startsWith('/') ? path : '/' + path;
    return base + p;
}

// Check authentication status
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    const pathname = window.location.pathname;
    const loginPaths = [
        siteUrl('/login.html'), siteUrl('/login'), siteUrl('/login/'),
        siteUrl('/reset-password'), siteUrl('/reset-password/'), siteUrl('/reset-password.html')
    ];
    // Detect recovery hash (Supabase adds #access_token=...&type=recovery)
    const hashParams = new URLSearchParams(window.location.hash.replace('#','?'));
    const isRecovery = hashParams.get('type') === 'recovery';
    const resetPathVariants = [siteUrl('/reset-password'), siteUrl('/reset-password/'), siteUrl('/reset-password.html')];
    const onResetPage = resetPathVariants.includes(pathname);

    if (isRecovery && !onResetPage) {
        // Force user to the dedicated reset page, preserve hash so session is established there
        window.location.replace(siteUrl('/reset-password/') + window.location.hash);
        return; // Stop further redirects
    }

    if (session) {
        // During recovery we do NOT auto-redirect away after auth until password is updated
        if (!isRecovery) {
            showAuthenticatedState(session.user);
            if (loginPaths.includes(pathname)) {
                window.location.href = siteUrl('/');
                return;
            }
        } else {
            // Minimal state update to show user email if reset page header has nav
            showAuthenticatedState(session.user);
        }
    } else {
        showUnauthenticatedState();
        if (!loginPaths.includes(pathname)) {
            window.location.href = siteUrl('/login/');
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
        window.location.href = siteUrl('/login/');
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
                }
            }
        });
        if (error) {
            console.error('Error signing up:', error);
            return { success: false, error: error.message };
        }
        console.log('Signup success:', data);
        return { success: true, data };
    } catch (e) {
        console.error('Unexpected signup failure:', e);
        return { success: false, error: e.message || 'Unexpected error' };
    }
}

// Password reset (request email)
async function requestPasswordReset(email) {
    try {
        console.log('[auth] requestPasswordReset start', email);
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + siteUrl('/reset-password/')
        });
        console.log('[auth] requestPasswordReset response', { data, error });
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

// Complete password update after recovery link
async function updatePassword(newPassword) {
    try {
        const { data, error } = await supabase.auth.updateUser({ password: newPassword });
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    
    // Setup logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});
