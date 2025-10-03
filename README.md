# Jekyll + Supabase Authentication

A production-ready Jekyll static site with complete Supabase authentication system. Perfect for blogs, documentation sites, or any Jekyll project that needs user authentication.

## 📋 Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Setup Guide](#setup-guide)
  - [1. Supabase Configuration](#1-supabase-configuration)
  - [2. Local Development](#2-local-development)
  - [3. File Structure](#3-file-structure)
- [Deployment](#deployment)
- [Integration Guide](#integration-guide)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)

---

## ✨ Features

### 🔐 Complete Authentication System
- Email/password login and signup
- Email confirmation flow
- Password reset functionality
- Session management
- Protected pages with automatic redirects
- User metadata (name, location, custom fields)

### 🎨 Modern UI
- Clean, responsive design
- Loading states during auth checks
- User-friendly error messages
- Form validation (HTML5 + JavaScript)
- Mobile-friendly

### 🚀 Production Ready
- Configured for GitHub Pages
- Separate development/production configs
- SEO-friendly URLs
- Optimized asset loading
- CSRF protection via Supabase

---

## 🚦 Quick Start

### Prerequisites

- **Ruby** 2.7+ with Bundler
- **[Supabase](https://supabase.com)** account (free)
- **GitHub** account (for deployment)

### 5-Minute Setup

```bash
# 1. Clone and install
git clone https://github.com/nbx0/jekyll-supabase-auth.git
cd jekyll-supabase-auth
bundle install

# 2. Configure Supabase (see Setup Guide below)
# Edit assets/js/auth.js with your credentials

# 3. Run locally
bundle exec jekyll serve --config _config.yml,_config_dev.yml

# 4. Open browser
open http://127.0.0.1:4000/
```

---

## 📖 Setup Guide

### 1. Supabase Configuration

#### A. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up
2. Click **"New Project"**
3. Fill in:
   - Project name: `jekyll-auth` (or your choice)
   - Database password: (save this securely!)
   - Region: (closest to your users)
4. Wait 2-3 minutes for provisioning

#### B. Get Your Credentials

1. Go to **Settings** → **API**
2. Copy these values:
   ```
   Project URL: https://xxxxx.supabase.co
   anon public key: eyJhbG...
   ```

#### C. Update auth.js

Edit `assets/js/auth.js`:

```javascript
// Replace these with your actual values
const SUPABASE_URL = 'https://xxxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

#### D. Configure URLs

In Supabase Dashboard → **Authentication** → **URL Configuration**:

**For Local Development:**
```
Site URL: http://127.0.0.1:4000
Redirect URLs: http://127.0.0.1:4000/**
```

**For Production (GitHub Pages):**
```
Site URL: https://yourusername.github.io/repo-name
Redirect URLs: https://yourusername.github.io/repo-name/**
```

#### E. Email Templates (Optional)

Go to **Authentication** → **Email Templates** to customize:

**Confirm Signup:**
```html
<h2>Confirm your signup</h2>
<p>Follow this link to confirm your email:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm Email</a></p>
```

**Reset Password:**
```html
<h2>Reset Password</h2>
<p>Follow this link to reset your password:</p>
<p><a href="{{ .SiteURL }}/reset-password/#access_token={{ .TokenHash }}&type=recovery">Reset Password</a></p>
```

---

### 2. Local Development

#### A. Install Dependencies

```bash
bundle install
```

#### B. Development Configuration

The project includes `_config_dev.yml` which overrides the production baseurl:

```yaml
# _config_dev.yml
baseurl: ""
url: "http://127.0.0.1:4000"
```

#### C. Start Server

```bash
# With development config (recommended)
bundle exec jekyll serve --config _config.yml,_config_dev.yml

# Or standard (uses production baseurl)
bundle exec jekyll serve
```

#### D. Test Authentication

1. Visit `http://127.0.0.1:4000/login/`
2. Click **"Need an account? Sign Up"**
3. Fill in all required fields:
   - Email
   - Password (minimum 6 characters)
   - Full Name
   - City
   - Country
   - Laboratory Name
4. Click **"Create Account"**
5. Check your email for confirmation link
6. Click the confirmation link
7. Login with your credentials
8. Test logout button
9. Test password reset flow

---

### 3. File Structure

```
jekyll-supabase-auth/
├── _config.yml              # Production config (with baseurl)
├── _config_dev.yml          # Development config (no baseurl)
├── _layouts/
│   ├── default.html         # Main layout with auth
│   ├── auth.html            # Minimal layout for login/reset pages
│   └── page.html            # Content page layout
├── assets/
│   ├── css/
│   │   ├── style.css        # Main site styles
│   │   └── auth.css         # Authentication page styles
│   └── js/
│       ├── auth.js          # Main auth script (configured)
│       └── auth-standalone.js  # Template version
├── index.html               # Protected home page
├── login-minimal.html       # Login/signup page
├── reset-password-minimal.html  # Password reset page
└── README.md                # This file
```

#### Key Files Explained

**`assets/js/auth.js`**
- Complete authentication logic
- Session management
- API calls to Supabase
- Automatic redirects

**`login-minimal.html`**
- Combined login/signup page
- Form validation
- "Forgot password?" flow
- Required user metadata fields

**`reset-password-minimal.html`**
- Password reset completion page
- Handles recovery tokens from email
- Updates password in Supabase

**`_layouts/default.html`**
- Main site layout
- Includes auth scripts
- Shows user info when logged in
- Hides content until auth check completes

**`_layouts/auth.html`**
- Minimal layout for auth pages
- No navigation/footer
- Focuses on auth forms

---

## 🚀 Deployment

### GitHub Pages Deployment

#### 1. Update Supabase URLs

⚠️ **Critical:** Update your Supabase configuration for production:

In Supabase Dashboard → **Authentication** → **URL Configuration**:
```
Site URL: https://yourusername.github.io/repo-name
Redirect URLs: https://yourusername.github.io/repo-name/**
```

#### 2. Configure _config.yml

Update for your GitHub Pages URL:

```yaml
# For user/org pages (username.github.io)
baseurl: ""
url: "https://username.github.io"

# For project pages (username.github.io/repo-name)
baseurl: "/repo-name"
url: "https://username.github.io"
```

#### 3. Push to GitHub

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

#### 4. Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **/ (root)**
4. Click **Save**

#### 5. Wait and Test

1. Wait 2-3 minutes for deployment
2. Visit your site: `https://username.github.io/repo-name/`
3. Test authentication flow
4. Request new confirmation email (old links won't work with new URL)

### Deployment Checklist

- [ ] Updated Supabase Site URL
- [ ] Updated Supabase Redirect URLs
- [ ] Configured `baseurl` in `_config.yml`
- [ ] Pushed to GitHub
- [ ] Enabled GitHub Pages
- [ ] Tested on production URL
- [ ] Verified email confirmation works
- [ ] Tested password reset flow

---

## 🔌 Integration Guide

### Adding Auth to Existing Jekyll Site

#### Step 1: Copy Required Files

Copy these 4 files to your Jekyll project:

```bash
# Create directories if needed
mkdir -p assets/js assets/css

# Copy files
cp assets/js/auth-standalone.js your-site/assets/js/auth.js
cp assets/css/auth.css your-site/assets/css/auth.css
cp login-minimal.html your-site/login.html
cp reset-password-minimal.html your-site/reset-password.html

# Optional: auth layout
cp _layouts/auth.html your-site/_layouts/auth.html
```

#### Step 2: Update Your Layout

Add to your `_layouts/default.html`:

**In `<head>`:**
```html
<!-- Supabase Client -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- Auth CSS -->
<link rel="stylesheet" href="{{ '/assets/css/auth.css' | relative_url }}">

<!-- Set baseurl for redirects -->
<script>window.BASE_URL='{{ site.baseurl }}';</script>
```

**Before `</body>`:**
```html
<!-- Auth script -->
<script src="{{ '/assets/js/auth.js' | relative_url }}"></script>
```

#### Step 3: Add Navigation (Optional)

Add to your site header:

```html
<nav>
  <span id="user-info"></span>
  <button id="logout-btn" style="display: none;">Logout</button>
</nav>
```

The auth script will automatically populate these elements with user info and logout button.

#### Step 4: Configure

1. Update `auth.js` with your Supabase credentials
2. Configure Supabase URLs (see Setup Guide above)
3. Test locally

#### Step 5: Make Pages Public (Optional)

By default, all pages except `/login/` and `/reset-password/` require authentication.

To make specific pages public, edit `assets/js/auth.js`:

```javascript
const loginPaths = [
    siteUrl('/login/'), 
    siteUrl('/reset-password/'),
    siteUrl('/about/'),      // Add public pages here
    siteUrl('/contact/'),
    siteUrl('/blog/'),
];
```

Or add to page front matter:

```yaml
---
layout: default
title: Public Page
disable_auth_check: true
---
```

---

## 🎨 Customization

### Custom User Metadata

Edit `login-minimal.html` to add/remove signup fields, then update `assets/js/auth.js`:

```javascript
async function handleSignup(email, password, meta = {}) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                full_name: meta.full_name || '',
                city: meta.city || '',
                country: meta.country || '',
                laboratory_name: meta.laboratory_name || '',
                // Add your custom fields here
                company: meta.company || '',
                role: meta.role || '',
                department: meta.department || ''
            }
        }
    });
    // ...
}
```

### Custom Styling

**Option A: Modify auth.css**
Edit `assets/css/auth.css` to match your site's design.

**Option B: Use Your CSS**
Remove `auth.css` and style the auth pages with your existing CSS. The forms use standard HTML elements and classes.

### Custom Redirects

Edit `assets/js/auth.js` to change redirect behavior:

```javascript
// After successful login
if(result.success){
    // Default: redirect to home
    window.location.href = siteUrl('/');
    
    // Custom: redirect to dashboard
    // window.location.href = siteUrl('/dashboard/');
}
```

### Loading Message

Edit `assets/css/style.css` to customize the loading message:

```css
body:not(.auth-checked)::before {
    content: 'Authenticating...';  /* Change this */
    /* ... other styles ... */
}
```

---

## 🐛 Troubleshooting

### Email Confirmation Links Not Working

**Symptom:** Clicking email confirmation link shows 404 error

**Solution:**
1. Check Supabase Site URL matches your deployment URL exactly
2. Go to Supabase Dashboard → Authentication → URL Configuration
3. Update Site URL to match your site (with `/repo-name` if project pages)
4. Request NEW confirmation email (old links use old URL)

**Local Development:**
```
Site URL: http://127.0.0.1:4000
```

**GitHub Pages (Project):**
```
Site URL: https://username.github.io/repo-name
```

### Assets Not Loading

**Symptom:** CSS/JS files return 404

**Solution:**
1. Check `baseurl` in `_config.yml` matches your GitHub Pages structure
2. For project pages: `baseurl: "/repo-name"`
3. For user/org pages: `baseurl: ""`

### Login Form Validation Errors

**Symptom:** Can't submit login form, hidden field errors

**Solution:** This is fixed in the current version. Signup fields now have `required` attribute managed dynamically.

**If you see this:** Update `login-minimal.html` to the latest version.

### Password Reset Link Goes to Wrong Page

**Symptom:** Password reset email link doesn't go to reset page

**Solution:**
1. Check Supabase email template has correct redirect URL
2. Should be: `{{ .SiteURL }}/reset-password/#access_token={{ .TokenHash }}&type=recovery`
3. Make sure `reset-password-minimal.html` has `disable_auth_check: true` in front matter

### Redirect Loops

**Symptom:** Page keeps redirecting in circles

**Solution:**
1. Verify `window.BASE_URL` is set in your layout before auth.js loads
2. Check that public pages (login, reset-password) have `disable_auth_check: true`
3. Clear browser cache and cookies

### Session Not Persisting

**Symptom:** User logged out after page refresh

**Solution:**
1. Check browser's local storage isn't being cleared
2. Verify Supabase project is active
3. Check browser console for errors
4. Try different browser to rule out extension issues

### Email Not Sending

**Symptom:** No confirmation or reset emails received

**Solution:**
1. Check spam/junk folder
2. Verify email in Supabase Dashboard → Authentication → Users
3. Check Supabase email sending limits (free tier has limits)
4. Try different email address
5. Check Supabase logs for delivery failures

### Production Works But Local Doesn't

**Symptom:** Auth works on GitHub Pages but not locally

**Solution:**
1. Make sure you're using development config:
   ```bash
   bundle exec jekyll serve --config _config.yml,_config_dev.yml
   ```
2. Check Supabase has `http://127.0.0.1:4000/**` in Redirect URLs
3. Verify `_config_dev.yml` has `baseurl: ""`

### Can't Access Protected Pages After Login

**Symptom:** Redirected to login even after successful login

**Solution:**
1. Check browser console for JavaScript errors
2. Verify Supabase session is being stored (check browser dev tools → Application → Local Storage)
3. Make sure `auth.js` is loaded in your layout
4. Clear browser cache and try again

---

## ❓ FAQ

### Is this secure?

Yes! Authentication is handled entirely by Supabase, which uses industry-standard security practices:
- JWT tokens for session management
- Encrypted password storage
- HTTPS required for production
- CSRF protection
- Rate limiting

The `SUPABASE_ANON_KEY` is safe to expose in client-side code. For database access, always use Row Level Security (RLS) policies in Supabase.

### Can I use this with a custom domain?

Yes! Update your Supabase URLs to match your custom domain:
```
Site URL: https://yourdomain.com
Redirect URLs: https://yourdomain.com/**
```

Also update `_config.yml`:
```yaml
url: "https://yourdomain.com"
baseurl: ""  # usually empty for custom domains
```

### How do I add social login (Google, GitHub, etc.)?

1. Enable providers in Supabase Dashboard → Authentication → Providers
2. Configure OAuth credentials
3. Supabase handles the rest automatically!

Social login works alongside email/password auth.

### Can I customize the user metadata fields?

Yes! Edit `login-minimal.html` to add/remove fields, then update the `handleSignup()` function in `assets/js/auth.js` to include your custom fields in the `options.data` object.

### How do I access user data after login?

```javascript
// Get current user
const { data: { user } } = await supabase.auth.getUser();

// Access metadata
console.log(user.user_metadata.full_name);
console.log(user.user_metadata.city);
console.log(user.email);
```

### Can I add a database with user profiles?

Yes! Create tables in Supabase and use Row Level Security:

```sql
-- Create profiles table
CREATE TABLE profiles (
    id UUID REFERENCES auth.users PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);
```

### What's the file size impact?

- JavaScript: ~7.5 KB (auth.js)
- CSS: ~2.5 KB (auth.css)
- Supabase CDN: ~45 KB (cached)
- **Total:** < 60 KB additional assets

### Can I use this for a membership site?

Absolutely! This provides the foundation. You can:
1. Add role-based access control
2. Create subscription tiers
3. Integrate payment systems
4. Build member-only content areas

### How do I handle user roles/permissions?

Store roles in user metadata during signup:

```javascript
options: {
    data: {
        role: 'member',  // or 'admin', 'subscriber', etc.
    }
}
```

Then check roles in your pages:

```javascript
const { data: { user } } = await supabase.auth.getUser();
if (user.user_metadata.role === 'admin') {
    // Show admin features
}
```

### Can I migrate existing users?

Yes! Use the Supabase API to bulk create users, or implement an import tool. See [Supabase migration docs](https://supabase.com/docs/guides/auth).

### What if I want to remove authentication later?

Simply:
1. Remove auth scripts from layout
2. Delete login/reset-password pages
3. Remove auth.js and auth.css

Your content pages remain unchanged.

### How do I update to new versions?

1. Check this repository for updates
2. Review changelog/commits
3. Update individual files as needed
4. Test thoroughly before deploying

Keep your custom changes separate for easier updates.

---

## 📚 Additional Resources

- **[Supabase Documentation](https://supabase.com/docs)** - Complete Supabase guides
- **[Jekyll Documentation](https://jekyllrb.com/docs/)** - Jekyll static site generator
- **[GitHub Pages](https://pages.github.com/)** - Free static site hosting

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**nbx0**
- GitHub: [@nbx0](https://github.com/nbx0)
- Repository: [jekyll-supabase-auth](https://github.com/nbx0/jekyll-supabase-auth)

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

## 📞 Support

- **Issues:** Open an issue on GitHub
- **Questions:** Check the FAQ section above
- **Updates:** Watch the repository for updates

---

**Built with ❤️ for the Jekyll community**

*Last updated: January 2025*
