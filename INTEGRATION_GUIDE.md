# Integration Guide: Adding Supabase Auth to Your Jekyll Site

This guide shows you how to add the minimal Supabase authentication layer to an existing Jekyll project.

## Prerequisites

- An existing Jekyll site
- A Supabase account and project ([supabase.com](https://supabase.com))
- GitHub repository (if deploying to GitHub Pages)

## Step 1: Copy Core Files

Copy these files from this repo to your Jekyll project:

### Required Files
```
your-jekyll-site/
├── assets/
│   ├── css/
│   │   └── auth.css              # Copy this
│   └── js/
│       └── auth.js               # Copy this (or auth-standalone.js renamed)
├── login.html                     # Copy this (or login-minimal.html renamed)
└── reset-password.html            # Copy this (or reset-password-minimal.html renamed)
```

### Optional Files
```
├── _layouts/
│   └── auth.html                 # Optional: minimal auth layout
└── .github/
    └── workflows/
        └── deploy-pages.yml      # Optional: GitHub Pages deployment
```

## Step 2: Configure Your Supabase Project

### 2.1 Get Your Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key

### 2.2 Update auth.js

Open `assets/js/auth.js` and replace the placeholders:

```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

### 2.3 Configure Email Templates

In Supabase Dashboard → **Authentication** → **Email Templates**:

#### Confirm Signup Template
Update the confirmation link to:
```
{{ .SiteURL }}/?confirmation_url={{ .ConfirmationURL }}
```
Or for project pages:
```
{{ .SiteURL }}/your-baseurl/?confirmation_url={{ .ConfirmationURL }}
```

#### Reset Password Template
Update the recovery link to:
```
{{ .SiteURL }}/reset-password/#access_token={{ .TokenHash }}&type=recovery
```
Or for project pages:
```
{{ .SiteURL }}/your-baseurl/reset-password/#access_token={{ .TokenHash }}&type=recovery
```

## Step 3: Update Your Jekyll Layout

### Option A: Use Existing Layout (Recommended)

Add these lines to your `_layouts/default.html` (or main layout):

**In the `<head>` section:**
```html
<!-- Supabase Client Library -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- Auth CSS -->
<link rel="stylesheet" href="{{ '/assets/css/auth.css' | relative_url }}">
```

**Before closing `</head>` or at start of `<body>`:**
```html
<!-- Set baseurl for auth redirects -->
<script>window.BASE_URL='{{ site.baseurl }}';</script>
```

**Before closing `</body>`:**
```html
<!-- Auth functionality -->
<script src="{{ '/assets/js/auth.js' | relative_url }}"></script>
```

### Option B: Use Minimal Auth Layout

If you copied `_layouts/auth.html`, update your auth pages to use it:

```yaml
---
layout: auth  # Instead of 'default'
title: Login
---
```

## Step 4: Add Navigation Elements (Optional)

If you want to show the logged-in user's email and logout button in your site header:

Add to your header/navigation:

```html
<nav>
  <span id="user-info"></span>
  <button id="logout-btn" style="display: none;">Logout</button>
</nav>
```

The auth.js script will automatically populate these.

## Step 5: Configure Jekyll

Update your `_config.yml`:

```yaml
# Site settings
title: Your Site Title
baseurl: ""  # For user/org pages, or "/repo-name" for project pages
url: "https://username.github.io"

# Build settings
markdown: kramdown
theme: minima  # or your theme

# Suppress theme deprecation warnings (optional)
sass:
  quiet_deps: true
```

## Step 6: Customize (Optional)

### Make Pages Public

By default, all pages except `/login/` and `/reset-password/` require authentication.

To make specific pages public, edit `assets/js/auth.js` and add to the `loginPaths` array:

```javascript
const loginPaths = [
    siteUrl('/login.html'), siteUrl('/login'), siteUrl('/login/'),
    siteUrl('/reset-password'), siteUrl('/reset-password/'), siteUrl('/reset-password.html'),
    siteUrl('/about/'),      // Add public pages here
    siteUrl('/contact/'),
    siteUrl('/public/')
];
```

### Disable Auth on Specific Pages

Add this script tag at the top of any page that shouldn't check auth:

```html
<script>
window.disableAuthCheck = true;
</script>
```

### Customize Styling

Override these CSS classes in your site's stylesheet:

```css
/* Auth container */
.login-container { }

/* Form elements */
.form-group { }
.form-group label { }
.form-group input { }

/* Buttons */
.btn { }
.btn-secondary { }
.btn:hover { }

/* Messages */
.error-message { }
.success-message { }
```

### Customize User Metadata

Edit the signup form in `login.html` and the `handleSignup()` function in `auth.js`:

```javascript
// In auth.js
async function handleSignup(email, password, meta = {}) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                // Add your custom fields here
                full_name: meta.full_name || '',
                company: meta.company || '',
                role: meta.role || ''
            }
        }
    });
    // ...
}
```

## Step 7: Test Locally

```bash
# Install dependencies
bundle install

# Serve locally
bundle exec jekyll serve

# Or with baseurl (for project pages)
bundle exec jekyll serve --baseurl '/your-repo-name'
```

Visit `http://localhost:4000/your-baseurl/login/` to test authentication.

## Step 8: Deploy to GitHub Pages

### Option 1: Using GitHub Actions (Recommended)

1. Copy `.github/workflows/deploy-pages-template.yml` to `.github/workflows/deploy-pages.yml`
2. In your GitHub repo: **Settings** → **Pages** → **Source** → Select "GitHub Actions"
3. Push your changes
4. Go to **Actions** tab and manually trigger the workflow (or push to main branch)

### Option 2: Manual Deployment

```bash
# Build for production
JEKYLL_ENV=production bundle exec jekyll build --baseurl '/your-repo-name'

# The _site folder contains your deployable site
```

## Troubleshooting

### Issue: Users not redirected after email confirmation
**Solution:** Check Supabase email template URLs match your site's baseurl structure.

### Issue: Assets not loading after deployment
**Solution:** Verify `baseurl` in `_config.yml` matches your GitHub Pages URL.

### Issue: Password reset link goes to wrong page
**Solution:** Ensure reset-password.html has `window.disableAuthCheck = true` at the top.

### Issue: Auth redirects in circles
**Solution:** Make sure you set `window.BASE_URL='{{ site.baseurl }}'` in your layout.

### Issue: "Invalid or expired recovery link"
**Solution:** You must click the link from the password reset email, not navigate directly to /reset-password/.

## Security Notes

- The `SUPABASE_ANON_KEY` is safe to expose in client-side code
- Configure Row Level Security (RLS) policies in Supabase for your database tables
- Never commit sensitive keys to your repository
- Use environment variables for sensitive data in production

## Next Steps

- Set up Row Level Security policies in Supabase
- Create user profile pages
- Add role-based access control
- Customize email templates in Supabase
- Add social authentication providers (Google, GitHub, etc.)

## Support

For issues with:
- **Supabase:** [supabase.com/docs](https://supabase.com/docs)
- **Jekyll:** [jekyllrb.com/docs](https://jekyllrb.com/docs/)
- **This auth layer:** Check the [AUTH_SETUP.md](AUTH_SETUP.md) file
