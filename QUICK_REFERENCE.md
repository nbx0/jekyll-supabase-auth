# 🚀 Quick Reference Card

## Essential Files

| File | Purpose | Required? |
|------|---------|-----------|
| `assets/js/auth-standalone.js` | All auth logic | ✅ Yes |
| `assets/css/auth.css` | Auth styling | ✅ Yes |
| `login-minimal.html` | Login/signup page | ✅ Yes |
| `reset-password-minimal.html` | Password reset | ✅ Yes |
| `_layouts/auth.html` | Auth layout | ⚪ Optional |

## Configuration Values

### In `assets/js/auth.js`
```javascript
const SUPABASE_URL = 'YOUR_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
```

### In `_config.yml`
```yaml
baseurl: ""                    # or "/repo-name"
url: "https://username.github.io"
```

### In your layout
```html
<script>window.BASE_URL='{{ site.baseurl }}';</script>
```

## Supabase Email Templates

### Confirm Signup
```
{{ .SiteURL }}/baseurl/?confirmation_url={{ .ConfirmationURL }}
```

### Reset Password
```
{{ .SiteURL }}/baseurl/reset-password/#access_token={{ .TokenHash }}&type=recovery
```

## Available Functions

| Function | Purpose | Returns |
|----------|---------|---------|
| `handleLogin(email, password)` | Log user in | `{success, error?, data?}` |
| `handleSignup(email, password, meta)` | Create account | `{success, error?, data?}` |
| `handleLogout()` | Sign user out | `Promise<void>` |
| `requestPasswordReset(email)` | Send reset email | `{success, error?, data?}` |
| `updatePassword(newPassword)` | Change password | `{success, error?, data?}` |
| `checkAuth()` | Verify session | `Promise<void>` |
| `siteUrl(path)` | Build baseurl-aware URL | `string` |

## CSS Classes

| Class | Element |
|-------|---------|
| `.login-container` | Auth form wrapper |
| `.form-group` | Form field container |
| `.btn` | Primary button |
| `.btn-secondary` | Secondary button |
| `.error-message` | Error display |
| `.success-message` | Success display |
| `.form-actions` | Button group |

## HTML IDs (Optional)

Add these to your layout for automatic population:

| ID | Purpose |
|----|---------|
| `user-info` | Shows "Welcome, user@email.com" |
| `logout-btn` | Logout button (auto-wired) |

## Common Customizations

### Make a Page Public
```javascript
// In auth.js, add to loginPaths array:
const loginPaths = [
    // ...existing paths
    siteUrl('/about/'),
    siteUrl('/contact/')
];
```

### Disable Auth on a Page
```html
<!-- At top of page -->
<script>window.disableAuthCheck = true;</script>
```

### Add Signup Field
```html
<!-- In login.html -->
<div class="form-group">
    <label for="company">Company</label>
    <input type="text" id="company" name="company">
</div>
```

```javascript
// In auth.js, update handleSignup:
data: {
    // ...existing fields
    company: meta.company || ''
}
```

## Terminal Commands

```bash
# Local development
bundle install
bundle exec jekyll serve
bundle exec jekyll serve --baseurl '/repo-name'

# Build for production
JEKYLL_ENV=production bundle exec jekyll build

# Build with baseurl
bundle exec jekyll build --baseurl '/repo-name'
```

## Troubleshooting Quick Fixes

| Issue | Fix |
|-------|-----|
| Assets not loading | Check `baseurl` in `_config.yml` |
| Email confirmation fails | Update Supabase email template |
| Redirect loops | Set `window.BASE_URL` in layout |
| Reset password won't work | Add `disableAuthCheck` to reset page |
| Public pages require login | Add to `loginPaths` array |

## File Locations After Integration

```
your-jekyll-site/
├── _config.yml                    ← Update baseurl
├── _layouts/
│   └── default.html               ← Add scripts
├── assets/
│   ├── css/
│   │   └── auth.css               ← Copy
│   └── js/
│       └── auth.js                ← Copy & configure
├── login.html                     ← Copy
└── reset-password.html            ← Copy
```

## Testing Checklist

- [ ] Signup creates account
- [ ] Email confirmation works
- [ ] Login redirects to home
- [ ] Logout redirects to login
- [ ] Protected pages require auth
- [ ] Password reset email sent
- [ ] Reset link opens reset page
- [ ] Password update works
- [ ] New password allows login

## Support Resources

- **Setup:** [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)
- **Checklist:** [CHECKLIST.md](CHECKLIST.md)
- **Supabase:** [supabase.com/docs](https://supabase.com/docs)
- **Jekyll:** [jekyllrb.com/docs](https://jekyllrb.com/docs)

---

**Tip:** Bookmark this file for quick reference during integration! 📌
