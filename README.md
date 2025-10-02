# test-supabase

A basic Ruby Jekyll GitHub Pages site with Supabase authentication layer.

## Features

- Jekyll-based static site with GitHub Pages support
- Supabase authentication integration
- Login/Signup functionality
- Automatic redirect to login page for unauthenticated users
- Lorem ipsum content pages

## Setup

### Prerequisites

- Ruby (2.7 or higher)
- Bundler gem
- A Supabase account and project

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bundle install
   ```

3. Configure Supabase:
   - Edit `assets/js/auth.js`
   - Replace `SUPABASE_URL` with your Supabase project URL
   - Replace `SUPABASE_ANON_KEY` with your Supabase anon/public key

4. Run locally:
   ```bash
   bundle exec jekyll serve
   ```

5. Open your browser to `http://localhost:4000`

## Supabase Configuration

To set up authentication in your Supabase project:

1. Go to your Supabase project dashboard
2. Navigate to Authentication settings
3. Enable Email authentication provider
4. Copy your project URL and anon key
5. Update the credentials in `assets/js/auth.js`

### Site URL Configuration

Make sure to configure your Site URL in Supabase:
- Go to Authentication > URL Configuration
- Add your site URL (e.g., `https://nbx0.github.io/test-supabase`)
- Add redirect URLs as needed

## Deployment to GitHub Pages

1. Push this repository to GitHub
2. Go to repository Settings > Pages
3. Select the branch to deploy (usually `main`)
4. Your site will be available at `https://[username].github.io/[repository-name]`

## Usage

- Visit the site - you'll be redirected to the login page if not authenticated
- Sign up with an email and password
- Login with your credentials
- After successful login, you'll be redirected to the main page with lorem ipsum content
- Click "Logout" to sign out

## Structure

```
.
├── _config.yml           # Jekyll configuration
├── _layouts/             # Page layouts
│   ├── default.html     # Main layout with auth
│   └── page.html        # Content page layout
├── assets/
│   ├── css/
│   │   └── style.css    # Styles
│   └── js/
│       └── auth.js      # Supabase authentication logic
├── index.html           # Main content page with lorem ipsum
├── login.html           # Login/signup page
└── Gemfile              # Ruby dependencies
```