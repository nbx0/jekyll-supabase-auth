# 🔐 Jekyll Supabase Authentication Layer

A minimal, drop-in authentication system for Jekyll static sites using Supabase. Perfect for adding user authentication to your Jekyll blog, documentation site, or web application.

## ✨ Features

- ✅ **Email/Password Authentication** - Login and signup with email confirmation
- ✅ **Password Reset Flow** - Complete forgot password functionality
- ✅ **User Metadata** - Store custom profile fields (name, location, etc.)
- ✅ **Session Management** - Automatic session handling and redirects
- ✅ **Protected Pages** - Automatically protect pages from unauthenticated access
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **GitHub Pages Compatible** - Deploy with GitHub Actions
- ✅ **Theme Agnostic** - Adopts your existing site's styling
- ✅ **Zero Backend Code** - Everything runs client-side

## 📦 What's Included

### Core Files (Required)
- **`assets/js/auth-standalone.js`** - Complete authentication logic (7.5KB)
- **`assets/css/auth.css`** - Minimal auth-specific styles (2.5KB)
- **`login-minimal.html`** - Login/signup page
- **`reset-password-minimal.html`** - Password reset page

### Optional Files
- **`_layouts/auth.html`** - Standalone auth layout (if you don't want to modify your existing layout)
- **`.github/workflows/deploy-pages-template.yml`** - GitHub Actions deployment workflow

### Documentation
- **`INTEGRATION_GUIDE.md`** - Complete step-by-step integration instructions
- **`AUTH_SETUP.md`** - Quick reference guide

## 🚀 Quick Start

### 1. Get the Files

Download or copy these 4 files to your Jekyll project:

```
your-jekyll-site/
├── assets/
│   ├── css/
│   │   └── auth.css                      # From this repo
│   └── js/
│       └── auth.js                       # Rename auth-standalone.js to this
├── login.html                            # Rename login-minimal.html to this
└── reset-password.html                   # Rename reset-password-minimal.html to this
```

### 2. Configure Supabase

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Get your **Project URL** and **anon key** from Settings → API
4. Update `assets/js/auth.js`:

```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

### 3. Update Your Layout

Add to your `_layouts/default.html`:

**In `<head>`:**
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<link rel="stylesheet" href="{{ '/assets/css/auth.css' | relative_url }}">
```

**At start of `<body>` or end of `<head>`:**
```html
<script>window.BASE_URL='{{ site.baseurl }}';</script>
```

**Before closing `</body>`:**
```html
<script src="{{ '/assets/js/auth.js' | relative_url }}"></script>
```

### 4. Test It

```bash
bundle exec jekyll serve
```

Visit `http://localhost:4000/login/` to test!

## 📖 Full Documentation

See **[INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)** for complete setup instructions including:
- Supabase email template configuration
- Customizing user metadata
- Making specific pages public
- Styling customization
- GitHub Pages deployment
- Troubleshooting

## 🎨 Customization

### Styling

The auth pages use semantic CSS classes that inherit from your theme:

```css
.login-container  /* Auth form container */
.form-group       /* Form field wrapper */
.btn              /* Primary button */
.btn-secondary    /* Secondary button */
.error-message    /* Error display */
.success-message  /* Success display */
```

Override these in your site's CSS to match your design.

### User Metadata

Edit `login.html` and `auth.js` to add custom signup fields:

```javascript
// In auth.js - handleSignup function
options: {
    data: {
        full_name: meta.full_name || '',
        company: meta.company || '',
        role: meta.role || '',
        // Add your fields here
    }
}
```

### Public Pages

By default, all pages require authentication except `/login/` and `/reset-password/`.

To make pages public, edit the `loginPaths` array in `auth.js`:

```javascript
const loginPaths = [
    siteUrl('/login/'),
    siteUrl('/reset-password/'),
    siteUrl('/about/'),    // Now public
    siteUrl('/contact/')   // Now public
];
```

## 🔒 Security

- ✅ Supabase `anon` key is safe for client-side use
- ✅ Configure Row Level Security (RLS) in Supabase for database tables
- ✅ Email verification required for signup
- ✅ Secure password reset flow
- ✅ No sensitive data in code

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled

## 🛠️ Tech Stack

- [Supabase](https://supabase.com) - Authentication backend
- [Jekyll](https://jekyllrb.com) - Static site generator
- Vanilla JavaScript - No frameworks required
- Minimal CSS - Theme agnostic

## 📄 License

MIT - Use freely in your projects

## 🤝 Contributing

This is a standalone authentication layer designed to be copied and customized for your specific needs. Feel free to:
- Modify the code for your use case
- Add features you need
- Change the styling to match your site
- Share improvements with the community

## 💡 Use Cases

Perfect for:
- 📝 Protected documentation sites
- 🎓 Course materials or educational content
- 📊 Dashboard or admin interfaces
- 🏢 Internal company wikis
- 👥 Community sites with member areas
- 📚 Digital libraries or resource collections

## 🔗 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Guide](https://docs.github.com/en/pages)

## ⚡ Performance

- **JavaScript:** ~7.5 KB minified
- **CSS:** ~2.5 KB minified
- **Supabase CDN:** ~45 KB (cached)
- **Total:** < 60 KB additional assets

## 🐛 Common Issues

**Email confirmation not working?**
→ Check Supabase email template redirect URLs

**Assets not loading after deploy?**
→ Verify `baseurl` in `_config.yml`

**Password reset doesn't work?**
→ Ensure `window.disableAuthCheck = true` is set in reset-password.html

**Redirect loops?**
→ Make sure `window.BASE_URL` is set in your layout

See [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) for more troubleshooting.

---

**Made with ❤️ for the Jekyll community**

Star ⭐ this repo if it helped you!
