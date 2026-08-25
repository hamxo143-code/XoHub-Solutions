# XoHub Solutions Website

Official website for XoHub Solutions - Your Digital Growth Partner.

## 🌐 Live Website

**Production:** [https://xohubsolutions.com](https://xohubsolutions.com)  
**GitHub Pages:** [https://hamxo143-code.github.io/XoHub-Solutions/](https://hamxo143-code.github.io/XoHub-Solutions/)

## 📋 Overview

This is a modern, responsive static website built with HTML5, CSS3, and JavaScript. It showcases XoHub Solutions' digital services, portfolio, and expertise.

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties, animations, and flexbox/grid layouts
- **JavaScript (Vanilla)** - Interactive features and animations
- **Font Awesome 6** - Icon library
- **Google Fonts** - Poppins typography

## 📁 Project Structure

```
XoHub-Solutions/
├── index.html              # Homepage
├── about.html              # About us page
├── services.html           # Services overview
├── web-development.html    # Web development services
├── portfolio.html          # Portfolio showcase
├── Case_Studies.html       # Case studies
├── blog.html               # Blog page
├── careers.html            # Careers page
├── contact.html            # Contact page
├── our-brand.html          # Brand guidelines
├── documentation.html      # Documentation
├── sitemap.html            # HTML sitemap
├── privacy-policy.html     # Privacy policy
├── terms-conditions.html   # Terms and conditions
├── cookie-policy.html      # Cookie policy
├── 404.html                # Custom error page
├── assets/
│   ├── css/
│   │   ├── style.css       # Main stylesheet
│   │   └── responsive.css  # Responsive styles
│   ├── js/
│   │   ├── main.js         # Main JavaScript
│   │   ├── counter-fix.js  # Counter animations
│   │   └── text-rotator.js # Text rotation effects
│   └── public/
│       └── images/         # Image assets
├── Requirements/           # Project requirements
├── robots.txt              # SEO crawler instructions
├── sitemap.xml             # XML sitemap
└── CNAME                   # Custom domain configuration
```

## 🚀 Deployment

This website is deployed using **GitHub Pages** with a custom domain.

### GitHub Pages Configuration

- **Repository:** [hamxo143-code/XoHub-Solutions](https://github.com/hamxo143-code/XoHub-Solutions)
- **Branch:** `main`
- **Folder:** `/ (root)`
- **Custom Domain:** `xohubsolutions.com`
- **HTTPS:** Enforced

### DNS Configuration

The custom domain is configured with the following DNS records at the domain registrar:

```
Type  | Name | Value
------|------|------
A     | @    | 185.199.108.153
A     | @    | 185.199.109.153
A     | @    | 185.199.110.153
A     | @    | 185.199.111.153
CNAME | www  | hamxo143-code.github.io
```

## 🧪 Local Development

Since this is a static website, you can simply open `index.html` in your browser, or use a local web server:

### Using Python
```bash
python -m http.server 8000
```

### Using Node.js http-server
```bash
npx http-server
```

### Using PHP
```bash
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 📝 Features

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Modern CSS animations and transitions
- ✅ Interactive JavaScript features
- ✅ SEO optimized with meta tags and structured data
- ✅ Fast loading performance
- ✅ Accessible markup (ARIA labels, semantic HTML)
- ✅ Cross-browser compatible
- ✅ Custom 404 error page
- ✅ XML and HTML sitemaps
- ✅ Privacy policy and cookie policy pages

## 🔒 Security

- No sensitive data or credentials stored in repository
- HTTPS enforced via GitHub Pages
- Protected files defined in `.gitignore`

## 📄 Pages

### Public Pages
- **Home** (`index.html`) - Landing page with hero, services overview, and CTA
- **About** (`about.html`) - Company information and team
- **Services** (`services.html`) - Services overview
- **Web Development** (`web-development.html`) - Detailed web development services
- **Portfolio** (`portfolio.html`) - Project showcase
- **Case Studies** (`Case_Studies.html`) - Client success stories
- **Blog** (`blog.html`) - Blog articles
- **Careers** (`careers.html`) - Job opportunities
- **Contact** (`contact.html`) - Contact form and information
- **Our Brand** (`our-brand.html`) - Brand assets and guidelines
- **Documentation** (`documentation.html`) - Technical documentation

### Legal & Utility Pages
- **Privacy Policy** (`privacy-policy.html`)
- **Terms & Conditions** (`terms-conditions.html`)
- **Cookie Policy** (`cookie-policy.html`)
- **Sitemap** (`sitemap.html`) - HTML sitemap
- **404 Error** (`404.html`) - Custom error page

### Development Pages (Not indexed)
- **Sign In** (`signin.html`) - Admin sign-in demo
- **Register** (`register-super-admin.html`) - Admin registration demo
- **Test Counter** (`test-counter.html`) - Counter animation test page

## 🔄 Updates & Maintenance

To update the website:

1. Make changes locally
2. Test in browser
3. Commit changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```
4. GitHub Pages will automatically rebuild (1-2 minutes)

## 📞 Contact

**XoHub Solutions**  
Email: [Contact via website](https://xohubsolutions.com/contact.html)  
Website: [https://xohubsolutions.com](https://xohubsolutions.com)

## 📄 License

© 2025 XoHub Solutions. All rights reserved.

---

**Built with ❤️ by XoHub Solutions**
