# Supabase Authentication for Jekyll

A minimal, drop-in authentication layer for Jekyll sites using Supabase.

## Features

- 🔐 Login/Signup with email confirmation
- 🔑 Password reset flow
- 👤 User profile metadata (full_name, city, country, laboratory_name)
- 🎨 Adopts existing site styling (minimal CSS)
- 📱 Responsive design
- ⚡ GitHub Pages compatible

## Quick Start

### 1. Copy Required Files

Copy these files to your Jekyll project:

```
├── _layouts/
│   └── auth.html              # Auth pages layout (optional, can use your existing layout)
├── assets/
│   ├── css/
│   │   └── auth.css          # Minimal auth-specific styles
│   └── js/
│       └── auth.js           # Authentication logic
├── login.html                 # Login/Signup page
└── reset-password.html        # Password reset page
```

### 2. Configure Supabase

Edit `assets/js/auth.js` and replace with your Supabase credentials:

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

### 3. Add Supabase CDN to Your Layout

Add to your `<head>` in `_layouts/default.html` (or wherever you define your base layout):

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

And before closing `</body>`:

```html
<script>window.BASE_URL='{{ site.baseurl }}';</script>
<script src="{{ '/assets/js/auth.js' | relative_url }}"></script>
```

### 4. Add Auth Navigation to Your Header (Optional)

Add this to your site header/navigation:

```html
<span id="user-info"></span>
<button id="logout-btn" style="display: none;">Logout</button>
```

The auth.js script will automatically populate these elements.

### 5. Configure Supabase Email Templates

In your Supabase dashboard:

1. Go to **Authentication > Email Templates**
2. Update **Confirm signup** redirect URL: `https://yourdomain.com/your-baseurl/`
3. Update **Reset password** redirect URL: `https://yourdomain.com/your-baseurl/reset-password/`

### 6. Protect Pages (Optional)

The `auth.js` script automatically redirects unauthenticated users to `/login/`.

To exclude pages from authentication, create a separate layout without the auth.js script, or add this to specific pages:

```html
<script>
window.disableAuthCheck = true;
</script>
```

## File Descriptions

### Core Files (Required)

- **assets/js/auth.js** - Authentication logic, session management, API calls
- **login.html** - Combined login/signup/forgot password page
- **reset-password.html** - Password reset completion page

### Optional Files

- **assets/css/auth.css** - Minimal styling for auth forms (can be integrated into your existing CSS)
- **_layouts/auth.html** - Simple layout for auth pages (can use your existing layout instead)

## Customization

### Styling

The auth pages use minimal, semantic classes that will adopt your site's existing styles:

- `.container` - Main content wrapper
- `.btn` - Primary button
- `.btn-secondary` - Secondary button
- `.form-group` - Form field wrapper
- `.error-message` - Error text styling
- `.success-message` - Success text styling

Override these in your site's CSS to match your design.

### User Metadata

The signup form collects these fields (edit in `login.html`):

- email (required)
- password (required)
- full_name
- city
- country
- laboratory_name

Modify the form fields and the `handleSignup()` function in `auth.js` to customize.

### Protected Pages

By default, all pages except `/login/` and `/reset-password/` require authentication.

To make specific pages public, add to the `loginPaths` array in `auth.js`:

```javascript
const loginPaths = [
    siteUrl('/login.html'), siteUrl('/login'), siteUrl('/login/'),
    siteUrl('/reset-password'), siteUrl('/reset-password/'), siteUrl('/reset-password.html'),
    siteUrl('/about/'), siteUrl('/contact/') // Add public pages here
];
```

## GitHub Actions Deployment

If deploying to GitHub Pages, use the included workflow:

```yaml
# .github/workflows/deploy-pages.yml
name: Deploy Jekyll site to Pages

on:
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2'
          bundler-cache: true
      - run: bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"
      - uses: actions/upload-pages-artifact@v3

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

## Troubleshooting

### Users not redirected after email confirmation

Check that your Supabase email template redirect URLs match your site's baseurl.

### Password reset link doesn't work

Ensure the recovery link redirects to `/reset-password/` (with trailing slash).

### Assets not loading

Verify your `baseurl` in `_config.yml` matches your GitHub Pages URL structure.

## License

MIT - Use freely in your projects
