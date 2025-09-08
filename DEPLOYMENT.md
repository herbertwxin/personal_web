# Deployment Guide

## Overview

This document provides comprehensive information about deploying the Figma-to-Runnable-Project application to production environments.

## Build Process

### Production Build

To create a production build:

```bash
npm run build
```

This command:
1. Runs TypeScript compilation (`tsc -b`)
2. Builds the application using Vite with production optimizations
3. Generates optimized static assets in the `dist/` directory

### Build Output Analysis

The build generates the following structure:

```
dist/
├── index.html                    # Main HTML entry point (2.25 kB)
├── assets/
│   ├── css/
│   │   └── index-[hash].css     # Compiled CSS (~377 kB)
│   └── js/
│       ├── index-[hash].js      # Main application bundle (~22 kB)
│       ├── vendor-react-[hash].js    # React vendor bundle (~178 kB)
│       ├── vendor-motion-[hash].js   # Framer Motion bundle (~117 kB)
│       ├── utils-styling-[hash].js   # Styling utilities (~21 kB)
│       └── [page]-[hash].js     # Individual page chunks (4-60 kB each)
├── favicon.svg                  # App icon
├── favicon.png                  # Fallback app icon
├── og-image.png                 # Open Graph image
├── twitter-image.png            # Twitter Card image
├── robots.txt                   # Search engine directives
└── sw.js                        # Service worker (if applicable)
```

### Bundle Analysis

- **Total bundle size**: ~2.5 MB (uncompressed), ~232 kB (gzipped)
- **Code splitting**: Automatic splitting by pages and vendors
- **Optimization features**:
  - Tree shaking for unused code elimination
  - Minification and compression
  - Asset hashing for cache busting
  - Module preloading for performance

## Deployment Requirements

### Server Requirements

- **Static file server** (no server-side processing required)
- **HTTPS support** (recommended for production)
- **Gzip/Brotli compression** (recommended for performance)
- **HTTP/2 support** (recommended for optimal loading)

### Browser Support

- **Modern browsers** supporting ES2020+
- **JavaScript modules** support required
- **CSS Grid and Flexbox** support required

### Environment Configuration

The application supports environment-specific configuration through:

- `.env.production` - Production environment variables
- `.env.development` - Development environment variables (not used in production)

**Note**: Only `NODE_ENV=development` is supported in .env files. For production, set environment variables directly in your deployment platform.

## Deployment Platforms

### Static Hosting Platforms

The application can be deployed to any static hosting platform:

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify
```bash
# Build command: npm run build
# Publish directory: dist
```

#### GitHub Pages
```bash
# Build and deploy using GitHub Actions
# See .github/workflows/deploy.yml (if configured)
```

#### AWS S3 + CloudFront
```bash
# Upload dist/ contents to S3 bucket
# Configure CloudFront distribution
```

### Traditional Web Servers

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_types text/css application/javascript application/json;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### Apache Configuration
```apache
# .htaccess in dist/ directory
RewriteEngine On
RewriteBase /

# Handle client-side routing
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/css application/javascript application/json
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

## Performance Optimization

### Build Optimizations

The build process includes several performance optimizations:

1. **Code Splitting**: Automatic splitting by routes and vendors
2. **Tree Shaking**: Removes unused code from bundles
3. **Minification**: JavaScript and CSS minification
4. **Asset Optimization**: Image and font optimization
5. **Module Preloading**: Critical resources are preloaded

### Runtime Optimizations

1. **Lazy Loading**: Components are loaded on demand
2. **Image Optimization**: Responsive images with fallbacks
3. **Font Loading**: Optimized font loading strategies
4. **Animation Performance**: Hardware-accelerated animations

## Testing Production Build

### Local Testing

Test the production build locally:

```bash
# Build and preview
npm run preview:build

# Or separately
npm run build
npm run preview
```

The preview server runs on `http://localhost:4173/`

### Build Verification Checklist

- [ ] Build completes without errors
- [ ] All pages load correctly
- [ ] Navigation works properly
- [ ] Animations perform smoothly
- [ ] Images and assets load correctly
- [ ] No console errors in browser
- [ ] Responsive design works across devices
- [ ] SEO meta tags are present

## Monitoring and Analytics

### Performance Monitoring

Consider integrating:
- **Web Vitals** monitoring
- **Error tracking** (e.g., Sentry)
- **Analytics** (e.g., Google Analytics)
- **Performance monitoring** (e.g., Lighthouse CI)

### Build Monitoring

Monitor build performance:
```bash
# Analyze bundle size
npm run build:analyze

# Profile build performance
npm run build:profile
```

## Troubleshooting

### Common Issues

1. **Assets not loading**: Check base URL configuration
2. **Routing issues**: Ensure server handles client-side routing
3. **Performance issues**: Check bundle size and optimize imports
4. **Build failures**: Check TypeScript errors and dependency versions

### Debug Commands

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build with verbose output
npm run build -- --mode production --debug

# Analyze bundle
npm run build:analyze
```

## Security Considerations

### Content Security Policy

Consider implementing CSP headers:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com;
```

### HTTPS Configuration

- Use HTTPS in production
- Configure HSTS headers
- Implement proper certificate management

## Maintenance

### Regular Updates

1. **Dependencies**: Keep dependencies updated
2. **Security patches**: Apply security updates promptly
3. **Performance monitoring**: Regular performance audits
4. **Build optimization**: Monitor and optimize bundle sizes

### Backup Strategy

- **Source code**: Version control with Git
- **Build artifacts**: Consider archiving production builds
- **Configuration**: Backup deployment configurations