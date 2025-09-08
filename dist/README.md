# Public Assets Directory

This directory contains static assets that are served directly by the web server.

## Asset Structure

### Icons and Images

- `favicon.svg` - Primary favicon (SVG format for scalability)
- `favicon.png` - Fallback favicon (PNG format for older browsers)
- `og-image.png` - Open Graph image for social media sharing (1200x630)
- `twitter-image.png` - Twitter Card image (1200x600)

### Configuration Files

- `asset-manifest.json` - Asset registry for dynamic loading
- `robots.txt` - Search engine crawler instructions
- `sw.js` - Service worker for asset caching (optional)

## Asset Guidelines

### Image Assets

- Use WebP format when possible for better compression
- Provide fallbacks for older browsers
- Optimize images for web (compress and resize appropriately)
- Use descriptive filenames

### Icon Assets

- Favicon should be 32x32 pixels minimum
- Provide both SVG and PNG versions
- Use consistent branding across all icons

### Performance Considerations

- Keep file sizes small (< 1MB for images)
- Use appropriate compression
- Consider lazy loading for non-critical assets
- Leverage browser caching with proper headers

## Development Notes

All assets in this directory are:

1. Automatically copied to the build output
2. Served from the root path (e.g., `/favicon.svg`)
3. Available for import in components using the asset utilities
4. Cached by the service worker for offline access

## Asset Loading Utilities

The project includes several utilities for robust asset handling:

- `ImageWithFallback` component for images with error handling
- Asset URL helpers in `lib/assets.ts`
- CSS fallbacks in `lib/css-fallbacks.ts`
- Font loading optimizations in `lib/fonts.ts`
