# 📦 Package Manifest

## Files to Copy to Your Jekyll Project

This manifest lists exactly which files to copy from this repository to integrate Supabase authentication into your Jekyll site.

---

## ✅ REQUIRED FILES (4 files)

Copy these files to your Jekyll project and configure them:

### 1. JavaScript - Authentication Logic
```
SOURCE: assets/js/auth-standalone.js
TARGET: your-jekyll-site/assets/js/auth.js
```
**Action Required:** Edit and replace these values:
```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

### 2. CSS - Authentication Styles
```
SOURCE: assets/css/auth.css
TARGET: your-jekyll-site/assets/css/auth.css
```
**Action Required:** None (but can customize to match your theme)

### 3. Login/Signup Page
```
SOURCE: login-minimal.html
TARGET: your-jekyll-site/login.html
```
**Action Required:** Update layout if not using `auth.html` layout:
```yaml
---
layout: default  # Change to your layout name
title: Login
permalink: /login/index.html
---
```

### 4. Password Reset Page
```
SOURCE: reset-password-minimal.html
TARGET: your-jekyll-site/reset-password.html
```
**Action Required:** Update layout if not using `auth.html` layout:
```yaml
---
layout: default  # Change to your layout name
title: Reset Password
permalink: /reset-password/index.html
---
```

---

## ⚪ OPTIONAL FILES

### Layout (if you want standalone auth pages)
```
SOURCE: _layouts/auth.html
TARGET: your-jekyll-site/_layouts/auth.html
```
**When to use:** If you want auth pages to have a minimal layout separate from your main site layout.
**When to skip:** If you want auth pages to match your existing site layout (just use `layout: default`)

### GitHub Actions Workflow
```
SOURCE: .github/workflows/deploy-pages-template.yml
TARGET: your-jekyll-site/.github/workflows/deploy-pages.yml
```
**When to use:** If deploying to GitHub Pages with GitHub Actions
**When to skip:** If using traditional GitHub Pages deployment or another hosting service

---

## 📄 DOCUMENTATION FILES (Reference Only)

These files are for reference and don't need to be copied to your project:

| File | Purpose |
|------|---------|
| `README_STANDALONE.md` | Overview of the auth package |
| `INTEGRATION_GUIDE.md` | Step-by-step integration instructions |
| `CHECKLIST.md` | Complete integration checklist |
| `QUICK_REFERENCE.md` | Quick reference card |
| `AUTH_SETUP.md` | Quick setup guide |

**Tip:** Bookmark or keep these files accessible during integration!

---

## 🚫 DO NOT COPY

These files are specific to this demo repository and should NOT be copied:

```
❌ _config.yml          (configure your own)
❌ index.html           (use your own)
❌ README.md            (use your own)
❌ Gemfile              (use your own)
❌ Gemfile.lock         (use your own)
❌ login.html           (this is the demo version with debug panel)
❌ reset-password.html  (this is the demo version with debug logging)
❌ assets/js/auth.js    (this has demo credentials)
❌ _layouts/default.html (use your own)
❌ _layouts/page.html   (use your own)
❌ assets/css/style.css (use your own)
❌ favicon.*            (use your own)
❌ _site/               (generated folder)
```

---

## 📋 Quick Copy Commands

For Unix/Linux/macOS users, here are commands to copy the required files:

```bash
# Set your Jekyll project path
JEKYLL_PROJECT="/path/to/your/jekyll-site"
AUTH_REPO="/Users/nbx0/repos/test-supabase"

# Create directories if they don't exist
mkdir -p "$JEKYLL_PROJECT/assets/js"
mkdir -p "$JEKYLL_PROJECT/assets/css"

# Copy required files
cp "$AUTH_REPO/assets/js/auth-standalone.js" "$JEKYLL_PROJECT/assets/js/auth.js"
cp "$AUTH_REPO/assets/css/auth.css" "$JEKYLL_PROJECT/assets/css/auth.css"
cp "$AUTH_REPO/login-minimal.html" "$JEKYLL_PROJECT/login.html"
cp "$AUTH_REPO/reset-password-minimal.html" "$JEKYLL_PROJECT/reset-password.html"

# Optional: Copy layout
mkdir -p "$JEKYLL_PROJECT/_layouts"
cp "$AUTH_REPO/_layouts/auth.html" "$JEKYLL_PROJECT/_layouts/auth.html"

# Optional: Copy workflow
mkdir -p "$JEKYLL_PROJECT/.github/workflows"
cp "$AUTH_REPO/.github/workflows/deploy-pages-template.yml" "$JEKYLL_PROJECT/.github/workflows/deploy-pages.yml"

echo "✅ Files copied! Now edit auth.js with your Supabase credentials."
```

---

## 📝 After Copying Checklist

Once you've copied the files, complete these steps:

- [ ] Edit `assets/js/auth.js` with your Supabase credentials
- [ ] Update `_layouts/default.html` to include Supabase CDN and auth scripts
- [ ] Configure `_config.yml` with correct `baseurl`
- [ ] Update Supabase email templates with correct redirect URLs
- [ ] Test locally with `bundle exec jekyll serve`
- [ ] Deploy and test on live site

**Next Steps:** See [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) for detailed instructions.

---

## 🎯 Minimal Integration (4 files only)

If you want the absolute minimum:

1. **Copy:** `auth-standalone.js` → rename to `auth.js`
2. **Copy:** `auth.css`
3. **Copy:** `login-minimal.html` → rename to `login.html`
4. **Copy:** `reset-password-minimal.html` → rename to `reset-password.html`
5. **Configure:** Edit `auth.js` with Supabase credentials
6. **Update:** Add scripts to your existing layout
7. **Done!** 🎉

---

## 📦 Download as Package

**Option 1: Clone Entire Repo**
```bash
git clone https://github.com/username/test-supabase.git
cd test-supabase
# Copy files as needed
```

**Option 2: Download Specific Files**
Use GitHub's raw file URLs or download the repo as ZIP and extract only needed files.

**Option 3: Copy/Paste**
Open each file in GitHub, click "Raw", copy the content, and paste into your project.

---

## 🔄 Version Tracking

If you want to track updates to this auth layer:

1. Keep the original repo as a Git submodule, or
2. Note the commit hash when you copied files, or
3. Periodically check for updates manually

**Current Version:** Initial Release (October 2025)

---

## 💡 Pro Tips

1. **Test locally first** - Always test the integration on localhost before deploying
2. **Keep documentation** - Save the INTEGRATION_GUIDE.md for future reference
3. **Version control** - Commit your changes incrementally as you integrate
4. **Backup first** - Make a backup of your Jekyll site before integrating
5. **Start simple** - Copy files, configure credentials, test, then customize

---

## ❓ Need Help?

Refer to these files in order:
1. **QUICK_REFERENCE.md** - Quick answers
2. **CHECKLIST.md** - Step-by-step checklist
3. **INTEGRATION_GUIDE.md** - Detailed instructions
4. **Supabase Docs** - https://supabase.com/docs

---

**Last Updated:** October 2025  
**Minimum Jekyll Version:** 3.9+  
**Minimum Ruby Version:** 2.7+  
**Supabase Client Version:** 2.x
