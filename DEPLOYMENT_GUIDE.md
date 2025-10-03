# Supabase Configuration for GitHub Pages Deployment

## Current Issue
Email confirmation links are going to `https://nbx0.github.io/` instead of `https://nbx0.github.io/jekyll-supabase-auth/`.

## Solution: Update Supabase URLs

### 1. Go to Supabase Dashboard
Navigate to: https://supabase.com/dashboard/project/cofieuukomqdjbjmrqxs/auth/url-configuration

### 2. Update Site URL
**Production Site URL:**
```
https://nbx0.github.io/jekyll-supabase-auth
```

### 3. Update Redirect URLs
Add these URLs to the **Redirect URLs** list:

**For Production (GitHub Pages):**
```
https://nbx0.github.io/jekyll-supabase-auth/**
```

**For Local Development:**
```
http://127.0.0.1:4000/**
http://localhost:4000/**
```

### 4. Save Configuration
Click **Save** to apply the changes.

## Testing After Configuration

### Local Development
1. Start server: `bundle exec jekyll serve --config _config.yml,_config_dev.yml`
2. Access at: `http://127.0.0.1:4000/`
3. Email links will go to: `http://127.0.0.1:4000/`

### Production (GitHub Pages)
1. Push changes to GitHub
2. Wait for Pages to deploy
3. Access at: `https://nbx0.github.io/jekyll-supabase-auth/`
4. Email links will go to: `https://nbx0.github.io/jekyll-supabase-auth/`

## Important Notes

1. **After updating Supabase URLs**, you need to request NEW confirmation emails
2. Old confirmation links will still use the old URL configuration
3. The baseurl is configured in `_config.yml` for production
4. The baseurl is overridden in `_config_dev.yml` for local development

## Current Configuration Files

### `_config.yml` (Production)
```yaml
baseurl: "/jekyll-supabase-auth"
url: "https://nbx0.github.io"
```

### `_config_dev.yml` (Local Development)
```yaml
baseurl: ""
url: "http://127.0.0.1:4000"
```

## Commands Reference

**Local development with no baseurl:**
```bash
bundle exec jekyll serve --config _config.yml,_config_dev.yml
```

**Production build:**
```bash
bundle exec jekyll build
```

**Deploy to GitHub Pages:**
```bash
git add .
git commit -m "Update deployment configuration"
git push origin main
```
