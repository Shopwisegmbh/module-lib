# Quote with Image - Modular Section

A portable, theme-agnostic Shopify section for displaying quotes with images. Designed to work seamlessly across different themes including Dawn.

## Metafields
- Subheading(Single Line Text)
- Heading(Single Line Text)
- Quote(Rich Text Metafield)
- Signature(Image)
- Author(Image)

## Features

- **Self-contained**: All styles and SVG icons included inline
- **Theme-agnostic**: Uses CSS custom properties with fallbacks
- **Responsive**: Mobile-first design with breakpoints
- **Customizable**: Easy to modify colors, spacing, and layout
- **Accessible**: Proper semantic HTML and ARIA attributes

## Installation

1. Copy `quote-with-image-modular.liquid` to your theme's `sections/` directory
2. The section will appear in the theme editor under "Custom" category

## Customization

### CSS Variables

The section uses CSS custom properties that can be overridden:

```css
--quote-section-color: Text color (default: #ffffff)
--quote-section-accent: Accent/eyebrow color (default: #B1006E)
--quote-section-bg: Background color (default: #1a1a1a)
```

### Theme Integration

For Dawn theme compatibility, the section uses:
- `--page-width`: Dawn's page width variable
- `--gutter-md` / `--gutter-sm`: Dawn's gutter spacing variables
- `--border-color`: Theme border color (with fallback)

### Custom Styling

To customize for your theme:

1. **Override CSS variables** in your theme's CSS:
```css
.quote-image-section {
  --quote-section-color: your-color;
  --quote-section-accent: your-accent;
  --quote-section-bg: your-bg;
}
```

2. **Modify the container class** in the schema:
   - Change `"class": "section"` to match your theme's section wrapper class
   - Dawn uses `"section"` by default

3. **Adjust breakpoints** in the media queries if needed

## Section Settings

- **Eyebrow Text**: Small text above the heading
- **Heading**: Main quote title
- **Quote Text**: Rich text content
- **Signature Image**: Optional signature image
- **Image**: Main image displayed alongside quote
- **Image Position**: Left or right alignment
- **Show Quote Icon**: Toggle decorative quote marks
- **Colors**: Background, text, and accent colors
- **Spacing**: Top and bottom padding controls

## Browser Support 

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid support required
- CSS Custom Properties support required

## Notes

- The quote icon SVG is embedded inline for portability
- All images use lazy loading for performance
- Responsive breakpoint at 990px (tablet) and 749px (mobile)
- Quote icon hidden on mobile for better readability

