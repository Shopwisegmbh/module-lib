# Quote with Image Section

A flexible Shopify Liquid section that displays inspirational quotes, testimonials, or featured content alongside an image in a responsive two-column layout.

## Overview

This section creates an elegant split-screen design that combines text content with imagery. Perfect for:
- Customer testimonials with photos
- Brand story quotes with signature
- Featured statements with visual context
- Author quotes with headshots
- Mission statements with branded imagery

## Features

- ✅ Responsive 2-column layout (stacks on mobile)
- ✅ Configurable image position (left or right)
- ✅ Rich text editor support for formatted content
- ✅ Optional decorative quote icon
- ✅ Signature image support
- ✅ Customizable colors (background, text, accent)
- ✅ Adjustable spacing controls
- ✅ Optimized image loading with lazy loading
- ✅ Fully accessible markup

## Section Settings

### Content Settings

| Setting | Type | Description | Default |
|---------|------|-------------|---------|
| `subheading` | Text | Optional eyebrow text above the heading | "Subheading" |
| `heading` | Text | Main quote title or author name | "Quote Title" |
| `content` | Rich text | The quote or testimonial text (supports HTML formatting) | "<p>Add your quote text here</p>" |
| `signature` | Image | Author's signature image | - |
| `signature_alt` | Text | Alt text for signature image | "Signature" |
| `image` | Image | Main featured image | - |
| `image_alt` | Text | Alt text for main image | "Image" |
| `image_position` | Select | Position of image (right/left) | "right" |
| `show_quotes` | Checkbox | Show/hide decorative quote icon | true |

### Color Settings

| Setting | Type | Description | Default |
|---------|------|-------------|---------|
| `bg` | Color | Background color of the section | #ffffff |
| `color` | Color | Text color | #000000 |
| `accent` | Color | Accent color for decorative elements | #000000 |

### Spacing Settings

| Setting | Type | Description | Default |
|---------|------|-------------|---------|
| `padding_top` | Range | Top padding (0-10 rem) | 2 rem |
| `padding_bottom` | Range | Bottom padding (0-10 rem) | 2 rem |

## Installation

1. Copy `quote-with-image.liquid` to your theme's `sections/` directory
2. Copy `quote-with-image.css` to your theme's `assets/` directory
3. The section will automatically appear in the Shopify theme editor

## Usage

### Basic Implementation

1. Navigate to the page/template where you want to add the section
2. Click "Add section" in the theme editor
3. Select "Quote with Image" from the Custom category
4. Configure the content and styling options

### Example Configuration

**Customer Testimonial:**
- **Subheading:** "Customer Testimonial"
- **Heading:** "Sarah Johnson"
- **Content:** "This product completely changed my life. The quality is exceptional and the customer service is outstanding. I recommend it to everyone!"
- **Image:** Upload customer photo
- **Signature:** Upload signature (optional)
- **Image Position:** Right

**Brand Story Quote:**
- **Subheading:** "Our Mission"
- **Heading:** "Built with Purpose"
- **Content:** "We believe in creating products that make a difference. Every item is crafted with sustainability and quality in mind."
- **Image:** Upload brand imagery
- **Show Quote Icon:** Yes

## Metafield Integration (Optional Extension)

While this section currently uses section settings, you can extend it to pull data from metafields for dynamic content management.

### Recommended Metafields

If you want to integrate metafields, create these definitions in your Shopify admin:

#### For Products

Navigate to: **Settings → Custom Data → Products → Add Definition**

1. **Product Quote Text**
   - Namespace: `custom`
   - Key: `quote_text`
   - Type: Multi-line text
   - Description: Quote or testimonial about this product

2. **Product Quote Author**
   - Namespace: `custom`
   - Key: `quote_author`
   - Type: Single line text
   - Description: Name of the person quoted

3. **Product Quote Image**
   - Namespace: `custom`
   - Key: `quote_image`
   - Type: File (Image)
   - Description: Image associated with the quote

4. **Product Quote Signature**
   - Namespace: `custom`
   - Key: `quote_signature`
   - Type: File (Image)
   - Description: Signature image of the quoted person

#### For Collections

Navigate to: **Settings → Custom Data → Collections → Add Definition**

1. **Collection Quote**
   - Namespace: `custom`
   - Key: `featured_quote`
   - Type: Multi-line text
   - Description: Featured quote for collection page

2. **Collection Quote Author**
   - Namespace: `custom`
   - Key: `quote_author`
   - Type: Single line text
   - Description: Quote author name

#### For Pages

Navigate to: **Settings → Custom Data → Pages → Add Definition**

1. **Page Testimonial**
   - Namespace: `custom`
   - Key: `testimonial_text`
   - Type: Rich text
   - Description: Customer testimonial or quote

2. **Page Testimonial Author**
   - Namespace: `custom`
   - Key: `testimonial_author`
   - Type: Single line text
   - Description: Testimonial author

3. **Page Testimonial Image**
   - Namespace: `custom`
   - Key: `testimonial_image`
   - Type: File (Image)
   - Description: Author or product image

## Styling Customization

### CSS Variables

The section uses CSS custom properties for easy theming:

```css
--quote-section-color    /* Text color */
--quote-section-accent   /* Accent/decorative color */
--quote-section-bg       /* Background color */
```

### Modifying the Quote Icon

To change the decorative quote icon appearance:

```css
.quote-image-section__quotes svg {
  fill: #YourColor;  /* Change quote icon color */
  opacity: 0.15;     /* Adjust transparency */
}
```

### Grid Layout Adjustments

To adjust column proportions:

```css
.quote-image-section__grid {
  grid-template-columns: 45fr 55fr;  /* Adjust ratio */
}
```

## Performance Optimization

The section includes several performance optimizations:

1. **Lazy Loading:** Images load only when visible in viewport
2. **Responsive Images:** Appropriate image sizes served based on device
3. **Conditional Rendering:** Content only renders if settings are configured
4. **Optimized CSS:** Minimal, scoped styling for fast load times

## Troubleshooting

### Image Not Displaying
- Ensure image is uploaded in section settings
- Check that image file size is under Shopify's limits (20MB)
- Verify image format is supported (JPG, PNG, WebP, SVG)

### Layout Breaking on Mobile
- Check that custom CSS isn't overriding responsive styles
- Verify theme doesn't have conflicting grid styles
- Test with browser dev tools in responsive mode

### Quote Icon Not Showing
- Verify "Show Quote Icon" setting is enabled
- Check that accent color has sufficient opacity
- Ensure no custom CSS is hiding decorative elements

### Colors Not Applying
- Double-check color picker settings in theme editor
- Clear browser cache after color changes
- Verify CSS file is properly linked in section
