export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      // Optimize browser support for better performance
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'not dead',
        'not ie 11',
      ],
      // Enable grid support
      grid: 'autoplace',
    },
    // Add CSS optimization plugins for production
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {
        preset: [
          'default',
          {
            // Optimize CSS for smaller bundle size
            discardComments: { removeAll: true },
            normalizeWhitespace: true,
            colormin: true,
            minifySelectors: true,
            minifyParams: true,
            minifyFontValues: true,
            // Preserve important CSS features
            autoprefixer: false, // Already handled above
            calc: false, // Preserve calc() for dynamic values
            convertValues: false, // Preserve CSS custom properties
          },
        ],
      },
    }),
  },
}
