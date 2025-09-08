# Academic List Components

A comprehensive set of responsive components for creating academic-style list layouts with proper typography, spacing, and accessibility features.

## Components Overview

### Core Components

- `AcademicList` - Main container for academic lists
- `AcademicList.Item` - Individual list item
- `AcademicList.ItemTitle` - Item title with academic formatting
- `AcademicList.ItemContent` - Container for item content
- `AcademicList.ItemMetadata` - Container for metadata
- `AcademicList.ItemActions` - Container for action buttons
- `AcademicList.SectionHeader` - Section headers
- `AcademicList.NestedList` - Nested list container
- `AcademicList.InlineMetadata` - Inline metadata elements
- `AcademicList.Badge` - Academic-style badges

### Layout Components

- `AcademicContainer` - Responsive container with academic spacing
- `AcademicPageHeader` - Page header with academic typography
- `AcademicContentSection` - Content section with proper spacing
- `AcademicGrid` - Responsive grid for academic content

### Hooks

- `useAcademicLayout` - Responsive layout configuration
- `useAcademicTypography` - Typography scaling
- `useAcademicSpacing` - Spacing configuration

## Basic Usage

### Simple Publication List

```tsx
import { AcademicList, AcademicContainer, AcademicPageHeader } from './ui/academic-list'

function PublicationsPage() {
  return (
    <AcademicContainer>
      <AcademicPageHeader 
        title="Publications"
        subtitle="Academic publications and research papers"
      />
      
      <AcademicList>
        <AcademicList.SectionHeader>2024 Publications</AcademicList.SectionHeader>
        
        <AcademicList.Item>
          <AcademicList.ItemTitle>
            Dynamic Equilibrium Models in Modern Macroeconomics
          </AcademicList.ItemTitle>
          <AcademicList.ItemContent>
            <AcademicList.ItemMetadata>
              <AcademicList.InlineMetadata>Author Name</AcademicList.InlineMetadata>
              <AcademicList.InlineMetadata>Journal of Economics</AcademicList.InlineMetadata>
              <AcademicList.InlineMetadata>Vol. 45, pp. 123-156</AcademicList.InlineMetadata>
              <AcademicList.Badge>Published</AcademicList.Badge>
            </AcademicList.ItemMetadata>
            <p>Research abstract or description...</p>
          </AcademicList.ItemContent>
          <AcademicList.ItemActions>
            <Button variant="outline" size="sm">Download PDF</Button>
            <Button variant="outline" size="sm">Cite</Button>
          </AcademicList.ItemActions>
        </AcademicList.Item>
      </AcademicList>
    </AcademicContainer>
  )
}
```

### Course List with Nested Content

```tsx
function TeachingPage() {
  return (
    <AcademicContainer>
      <AcademicPageHeader title="Teaching" />
      
      <AcademicList>
        <AcademicList.SectionHeader>Current Courses</AcademicList.SectionHeader>
        
        <AcademicList.Item>
          <AcademicList.ItemTitle>
            ECON 301: Intermediate Macroeconomics
          </AcademicList.ItemTitle>
          <AcademicList.ItemContent>
            <AcademicList.ItemMetadata>
              <AcademicList.InlineMetadata>Fall 2024</AcademicList.InlineMetadata>
              <AcademicList.InlineMetadata>Undergraduate</AcademicList.InlineMetadata>
              <AcademicList.InlineMetadata>3 Credits</AcademicList.InlineMetadata>
            </AcademicList.ItemMetadata>
            
            <AcademicList.NestedList>
              <div>Course Materials: 24 lectures, 12 problem sets</div>
              <div>Topics: DSGE Models, Monetary Policy, Business Cycles</div>
              <div>Prerequisites: ECON 201, MATH 151</div>
            </AcademicList.NestedList>
          </AcademicList.ItemContent>
          <AcademicList.ItemActions>
            <Button variant="outline" size="sm">View Syllabus</Button>
            <Button variant="outline" size="sm">Course Materials</Button>
          </AcademicList.ItemActions>
        </AcademicList.Item>
      </AcademicList>
    </AcademicContainer>
  )
}
```

## List Variants

### Compact Variant
Use for dense information display:

```tsx
<AcademicList variant="compact">
  {/* Items will have reduced spacing */}
</AcademicList>
```

### Dense Variant
Use for maximum information density:

```tsx
<AcademicList variant="dense">
  {/* Items will have minimal spacing and smaller typography */}
</AcademicList>
```

### Spaced Variant
Use for better readability with more spacing:

```tsx
<AcademicList variant="spaced">
  {/* Items will have increased spacing */}
</AcademicList>
```

## Responsive Behavior

The components automatically adapt to different screen sizes:

### Mobile (< 640px)
- Reduced hanging indents
- Stacked metadata
- Compact spacing
- Smaller typography

### Tablet (640px - 1023px)
- Medium hanging indents
- Inline metadata
- Standard spacing
- Standard typography

### Desktop (1024px+)
- Full hanging indents
- Optimized spacing
- Full typography scale
- Maximum content width

### Large Desktop (1440px+)
- Extended hanging indents
- Increased content width
- Enhanced spacing

## CSS Custom Properties

The components use CSS custom properties for consistent theming:

### Typography Variables
```css
--academic-font-size-page-title: 2.5rem
--academic-font-size-section-header: 1.75rem
--academic-font-size-entry-title: 1.25rem
--academic-font-size-body: 1rem
--academic-font-size-metadata: 0.875rem
--academic-font-size-caption: 0.75rem
```

### Spacing Variables
```css
--academic-spacing-xs: 0.25rem
--academic-spacing-sm: 0.5rem
--academic-spacing-md: 0.75rem
--academic-spacing-lg: 1rem
--academic-spacing-xl: 1.5rem
--academic-spacing-2xl: 2rem
--academic-spacing-3xl: 3rem
```

### Layout Variables
```css
--academic-list-item-spacing: var(--academic-spacing-lg)
--academic-list-section-spacing: var(--academic-spacing-2xl)
--academic-hanging-indent: 2rem
--academic-nested-indent: 1.5rem
```

## Accessibility Features

### Semantic HTML
- Proper list structure with `role="list"` and `role="listitem"`
- Semantic headings for section headers
- Grouped metadata and actions with `role="group"`

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Proper tab order
- Focus management

### Screen Reader Support
- ARIA labels for metadata and action groups
- Proper heading hierarchy
- Descriptive text for complex content

### High Contrast Support
- Enhanced borders and outlines in high contrast mode
- Sufficient color contrast ratios
- Clear visual hierarchy

## Performance Optimizations

### CSS Containment
```css
.academic-list {
  contain: layout style;
}
```

### Hardware Acceleration
```css
.academic-list-item {
  will-change: transform;
  transform: translateZ(0);
}
```

### Virtualization Support
For large lists, add the `academic-list-virtualized` class:

```tsx
<AcademicList className="academic-list-virtualized">
  {/* Large number of items */}
</AcademicList>
```

## Customization

### Custom Spacing
Override CSS custom properties for custom spacing:

```css
.my-custom-list {
  --academic-list-item-spacing: 2rem;
  --academic-hanging-indent: 3rem;
}
```

### Custom Typography
Override typography variables:

```css
.my-custom-list {
  --academic-font-size-entry-title: 1.5rem;
  --academic-font-weight-entry-title: 600;
}
```

### Custom Colors
Override color variables:

```css
.my-custom-list {
  --academic-text-primary: #1a1a1a;
  --academic-text-secondary: #666666;
  --academic-text-accent: #0066cc;
}
```

## Best Practices

### Content Organization
1. Use section headers to group related items
2. Keep metadata concise and relevant
3. Use hanging indents for citation-style formatting
4. Group related actions together

### Responsive Design
1. Test on multiple screen sizes
2. Ensure content remains readable on mobile
3. Use appropriate list variants for content density
4. Consider touch targets on mobile devices

### Performance
1. Use virtualization for lists with >100 items
2. Avoid complex nested structures when possible
3. Optimize images and media in list items
4. Use CSS containment for better performance

### Accessibility
1. Provide meaningful alt text for images
2. Use proper heading hierarchy
3. Ensure sufficient color contrast
4. Test with screen readers
5. Provide keyboard navigation support

## Examples

See `components/examples/AcademicListExample.tsx` for comprehensive usage examples.

## Testing

Run the test suite to verify functionality:

```bash
npm test -- components/__tests__/academic-list-responsive.test.tsx
npm test -- components/__tests__/academic-responsive-simple.test.tsx
```