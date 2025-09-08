// Debug script to check actual spacing values
// Run this in the browser console to diagnose the spacing issue

function debugSpacing() {
    console.log('=== SPACING DEBUG ===');
    
    // Check navigation
    const nav = document.querySelector('nav');
    if (nav) {
        const navRect = nav.getBoundingClientRect();
        const navStyles = window.getComputedStyle(nav);
        console.log('Navigation:', {
            position: navStyles.position,
            top: navStyles.top,
            height: navRect.height,
            bottom: navRect.bottom,
            zIndex: navStyles.zIndex
        });
    }
    
    // Check main content
    const main = document.querySelector('main');
    if (main) {
        const mainRect = main.getBoundingClientRect();
        const mainStyles = window.getComputedStyle(main);
        console.log('Main content:', {
            position: mainStyles.position,
            paddingTop: mainStyles.paddingTop,
            marginTop: mainStyles.marginTop,
            top: mainRect.top,
            zIndex: mainStyles.zIndex
        });
    }
    
    // Check first content element
    const firstContent = document.querySelector('main > div');
    if (firstContent) {
        const contentRect = firstContent.getBoundingClientRect();
        const contentStyles = window.getComputedStyle(firstContent);
        console.log('First content div:', {
            top: contentRect.top,
            paddingTop: contentStyles.paddingTop,
            marginTop: contentStyles.marginTop,
            className: firstContent.className
        });
    }
    
    // Check if content is visible
    const viewportHeight = window.innerHeight;
    const contentTop = firstContent ? firstContent.getBoundingClientRect().top : 0;
    const isVisible = contentTop < viewportHeight;
    
    console.log('Visibility check:', {
        viewportHeight,
        contentTop,
        isVisible,
        scrollRequired: !isVisible
    });
    
    // Check for any elements with excessive top spacing
    const elementsWithTopSpacing = [];
    document.querySelectorAll('*').forEach(el => {
        const styles = window.getComputedStyle(el);
        const paddingTop = parseInt(styles.paddingTop);
        const marginTop = parseInt(styles.marginTop);
        
        if (paddingTop > 50 || marginTop > 50) {
            elementsWithTopSpacing.push({
                element: el.tagName + (el.className ? '.' + el.className.split(' ').join('.') : ''),
                paddingTop,
                marginTop
            });
        }
    });
    
    if (elementsWithTopSpacing.length > 0) {
        console.log('Elements with excessive top spacing:', elementsWithTopSpacing);
    }
    
    // Check Tailwind classes
    const tailwindClasses = [];
    document.querySelectorAll('*').forEach(el => {
        if (el.className && typeof el.className === 'string') {
            const classes = el.className.split(' ');
            classes.forEach(cls => {
                if (cls.match(/^(pt-|mt-|top-)/)) {
                    tailwindClasses.push({
                        element: el.tagName,
                        class: cls,
                        computedValue: window.getComputedStyle(el).paddingTop || window.getComputedStyle(el).marginTop || window.getComputedStyle(el).top
                    });
                }
            });
        }
    });
    
    console.log('Tailwind spacing classes found:', tailwindClasses);
}

// Auto-run when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', debugSpacing);
} else {
    debugSpacing();
}

// Also make it available globally
window.debugSpacing = debugSpacing;