# 📋 Integration Checklist

Use this checklist when adding this auth layer to a new Jekyll project.

## ☐ Files to Copy

Copy these files from this repo to your Jekyll site:

### Required (4 files)
- [ ] `assets/js/auth-standalone.js` → Rename to `assets/js/auth.js`
- [ ] `assets/css/auth.css` → Keep as is
- [ ] `login-minimal.html` → Rename to `login.html`
- [ ] `reset-password-minimal.html` → Rename to `reset-password.html`

### Optional
- [ ] `_layouts/auth.html` → If you want standalone auth layout
- [ ] `.github/workflows/deploy-pages-template.yml` → For GitHub Pages deployment

## ☐ Supabase Setup

### Project Creation
- [ ] Create Supabase account at [supabase.com](https://supabase.com)
- [ ] Create new project
- [ ] Wait for project provisioning (2-3 minutes)

### Get Credentials
- [ ] Go to Settings → API
- [ ] Copy Project URL
- [ ] Copy anon public key
- [ ] Update `assets/js/auth.js` with your credentials

### Email Templates
- [ ] Go to Authentication → Email Templates
- [ ] Update **Confirm Signup** template:
  ```
  {{ .SiteURL }}/your-baseurl/?confirmation_url={{ .ConfirmationURL }}
  ```
- [ ] Update **Reset Password** template:
  ```
  {{ .SiteURL }}/your-baseurl/reset-password/#access_token={{ .TokenHash }}&type=recovery
  ```
- [ ] Test email sending (Authentication → Settings → SMTP Settings)

## ☐ Jekyll Configuration

### _config.yml
- [ ] Set `baseurl:` correctly
  - User/org pages: `baseurl: ""`
  - Project pages: `baseurl: "/repo-name"`
- [ ] Set `url:` to your GitHub Pages URL
- [ ] Add `sass: quiet_deps: true` (optional, suppresses warnings)

### Layout Updates (_layouts/default.html)
- [ ] Add Supabase CDN in `<head>`:
  ```html
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  ```
- [ ] Add auth CSS in `<head>`:
  ```html
  <link rel="stylesheet" href="{{ '/assets/css/auth.css' | relative_url }}">
  ```
- [ ] Set BASE_URL before closing `</head>`:
  ```html
  <script>window.BASE_URL='{{ site.baseurl }}';</script>
  ```
- [ ] Add auth.js before closing `</body>`:
  ```html
  <script src="{{ '/assets/js/auth.js' | relative_url }}"></script>
  ```

### Navigation (Optional)
- [ ] Add to your header/nav:
  ```html
  <span id="user-info"></span>
  <button id="logout-btn" style="display: none;">Logout</button>
  ```

## ☐ Testing

### Local Testing
- [ ] Run `bundle install`
- [ ] Run `bundle exec jekyll serve` (or with `--baseurl` flag)
- [ ] Visit `/login/` page
- [ ] Test signup flow
  - [ ] Create account
  - [ ] Check email received
  - [ ] Click confirmation link
  - [ ] Verify redirect back to site
- [ ] Test login flow
  - [ ] Login with confirmed account
  - [ ] Verify redirect to home page
  - [ ] Check user email shown in nav
- [ ] Test logout
  - [ ] Click logout button
  - [ ] Verify redirect to login page
- [ ] Test password reset
  - [ ] Click "Forgot password?"
  - [ ] Enter email and send
  - [ ] Check email received
  - [ ] Click reset link
  - [ ] Verify lands on `/reset-password/` page
  - [ ] Enter new password
  - [ ] Verify redirect to login
  - [ ] Login with new password
- [ ] Test protected pages
  - [ ] Logout
  - [ ] Try to access non-public page
  - [ ] Verify redirect to login

## ☐ Customization (Optional)

### Styling
- [ ] Override `.login-container` styling to match your theme
- [ ] Override `.btn` and `.btn-secondary` for button styles
- [ ] Customize `.error-message` and `.success-message` colors
- [ ] Test responsive design on mobile

### User Metadata
- [ ] Decide what fields to collect during signup
- [ ] Add form fields to `login.html`
- [ ] Update `handleSignup()` in `auth.js` with new fields
- [ ] Test signup with new fields
- [ ] Verify metadata saved in Supabase (Users table → user details)

### Public Pages
- [ ] List pages that should be public (not require auth)
- [ ] Add those paths to `loginPaths` array in `auth.js`
- [ ] Test accessing public pages while logged out

## ☐ Deployment

### GitHub Pages Setup
- [ ] Commit all changes to Git
- [ ] Push to GitHub
- [ ] Go to repo Settings → Pages
- [ ] Set Source to "GitHub Actions"
- [ ] Copy `.github/workflows/deploy-pages-template.yml` to `.github/workflows/deploy-pages.yml`
- [ ] Push workflow file
- [ ] Go to Actions tab
- [ ] Trigger workflow manually (or push to trigger)
- [ ] Wait for deployment to complete
- [ ] Visit your GitHub Pages URL
- [ ] Test authentication flow on live site

### Post-Deployment Checks
- [ ] Verify all assets load correctly
- [ ] Test signup with real email
- [ ] Test email confirmation flow
- [ ] Test password reset flow
- [ ] Test login/logout
- [ ] Check on mobile device
- [ ] Test in different browsers

## ☐ Security & Production

### Supabase Security
- [ ] Review Authentication settings in Supabase
- [ ] Enable email rate limiting (if needed)
- [ ] Set up Row Level Security (RLS) policies for any database tables
- [ ] Review API keys and confirm only `anon` key is in code
- [ ] Consider enabling additional auth providers (Google, GitHub, etc.)

### Monitoring
- [ ] Check Supabase logs for authentication errors
- [ ] Monitor user signups
- [ ] Test email deliverability
- [ ] Set up error tracking (optional)

## ☐ Documentation

### For Your Team
- [ ] Document where Supabase credentials are stored
- [ ] Explain how to update email templates
- [ ] Document custom metadata fields
- [ ] Note which pages are public vs protected
- [ ] Add instructions for local development

## 🎉 Done!

Once all items are checked, your Jekyll site has full authentication!

## 📚 Reference

- [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) - Detailed setup instructions
- [AUTH_SETUP.md](AUTH_SETUP.md) - Quick reference
- [README_STANDALONE.md](README_STANDALONE.md) - Package overview
- [Supabase Docs](https://supabase.com/docs) - Supabase documentation
- [Jekyll Docs](https://jekyllrb.com/docs/) - Jekyll documentation
