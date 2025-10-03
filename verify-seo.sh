#!/bin/bash
# SEO Verification Script for Jekyll Supabase Auth

echo "🔍 SEO Verification Checklist"
echo "=============================="
echo ""

# Check if site is built
if [ ! -d "_site" ]; then
    echo "❌ Site not built. Run: bundle exec jekyll build"
    exit 1
fi

echo "✅ Site is built"
echo ""

# Check critical files
echo "📄 Checking Critical SEO Files:"
echo ""

files=(
    "_site/sitemap.xml:Sitemap"
    "_site/robots.txt:Robots.txt"
    "_site/404.html:404 Page"
)

for file_info in "${files[@]}"; do
    IFS=':' read -r file name <<< "$file_info"
    if [ -f "$file" ]; then
        echo "  ✅ $name exists"
    else
        echo "  ❌ $name missing"
    fi
done

echo ""
echo "🏷️  Checking Meta Tags in index.html:"
echo ""

if [ -f "_site/index.html" ]; then
    # Check for essential meta tags
    tags=(
        "og:title:Open Graph Title"
        "og:description:Open Graph Description"
        "twitter:card:Twitter Card"
        "description:Meta Description"
        "canonical:Canonical URL"
    )
    
    for tag_info in "${tags[@]}"; do
        IFS=':' read -r tag name <<< "$tag_info"
        if grep -q "$tag" "_site/index.html"; then
            echo "  ✅ $name"
        else
            echo "  ❌ $name missing"
        fi
    done
else
    echo "  ❌ index.html not found"
fi

echo ""
echo "🤖 Checking robots.txt:"
echo ""

if [ -f "_site/robots.txt" ]; then
    echo "Content:"
    cat "_site/robots.txt"
else
    echo "  ❌ robots.txt not found"
fi

echo ""
echo "🗺️  Checking sitemap.xml:"
echo ""

if [ -f "_site/sitemap.xml" ]; then
    url_count=$(grep -c "<loc>" "_site/sitemap.xml" || echo "0")
    echo "  ✅ Sitemap contains $url_count URLs"
    echo ""
    echo "URLs in sitemap:"
    grep "<loc>" "_site/sitemap.xml" | sed 's/.*<loc>\(.*\)<\/loc>/  - \1/'
else
    echo "  ❌ sitemap.xml not found"
fi

echo ""
echo "=============================="
echo "✨ Verification Complete!"
echo ""
echo "Next Steps:"
echo "1. Build site: bundle exec jekyll build"
echo "2. Test locally: bundle exec jekyll serve"
echo "3. Validate meta tags: https://cards-dev.twitter.com/validator"
echo "4. Test structured data: https://search.google.com/test/rich-results"
echo "5. Deploy to production"
