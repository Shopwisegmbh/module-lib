# Volume Discount Module for Shopify

A reusable, modular volume discount component that allows customers to select product variants with different pricing options. Compatible with any Shopify theme including Dawn, Debut, and custom themes.

## Features

- ✅ Clean radio button selection interface
- ✅ Displays all product variants with prices
- ✅ Automatic price updates when variants are selected
- ✅ Fully customizable colors and styling
- ✅ Optional border highlighting for selected options
- ✅ Responsive design for mobile and desktop
- ✅ Supports metafield-based unit pricing and savings display
- ✅ Theme-agnostic implementation
- ✅ Easy integration with existing Shopify themes

## File Structure

```
volume-discount-module/
├── volume-discount.css       # Modular CSS styles
├── volume-discount.js        # Modular JavaScript functionality
├── volume-discount.liquid    # Reusable Liquid snippet
└── README.md                 # This file
```

## Installation

### Step 1: Upload Files

1. **CSS File**
   - Upload `volume-discount.css` to your theme's `assets` folder
   - Path: `assets/volume-discount.css`

2. **JavaScript File**
   - Upload `volume-discount.js` to your theme's `assets` folder
   - Path: `assets/volume-discount.js`

3. **Liquid Snippet**
   - Upload `volume-discount.liquid` to your theme's `snippets` folder
   - Path: `snippets/volume-discount.liquid`

### Step 2: Include Assets in Your Theme

Add the following code to your theme's main product template or layout file:

**For Section-Based Themes (Dawn, etc.):**

Add to `sections/main-product.liquid` or equivalent, inside the `<head>` or before closing `</body>`:

```liquid
{{ 'volume-discount.css' | asset_url | stylesheet_tag }}
<script src="{{ 'volume-discount.js' | asset_url }}" defer></script>
```

**For Older Themes:**

Add to `layout/theme.liquid` before closing `</head>`:

```liquid
{{ 'volume-discount.css' | asset_url | stylesheet_tag }}
<script src="{{ 'volume-discount.js' | asset_url }}" defer></script>
```

## Usage

There are three ways to implement the Volume Discount module:

### Option 1: As a Section Block (Recommended)

This allows merchants to add/remove the volume discount through the theme editor.

**1. Add Block Schema to Your Product Section**

Add the following to your product section's schema (e.g., `sections/main-product.liquid`):

```json
{
  "type": "volume_discount",
  "name": "Volume Discount",
  "limit": 1,
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Section title",
      "default": "Select Quantity"
    },
    {
      "type": "header",
      "content": "Radio Button Colors"
    },
    {
      "type": "color",
      "id": "radio_button_color",
      "label": "Default radio button color",
      "default": "#004f9f"
    },
    {
      "type": "color",
      "id": "radio_button_selected_color",
      "label": "Selected radio button color",
      "default": "#004f9f"
    },
    {
      "type": "header",
      "content": "Option Background Colors"
    },
    {
      "type": "color",
      "id": "option_bg_color",
      "label": "Default background color",
      "default": "#f9f9f7"
    },
    {
      "type": "color",
      "id": "option_bg_selected_color",
      "label": "Selected background color",
      "default": "#e2e1e7"
    },
    {
      "type": "color",
      "id": "option_bg_hover_color",
      "label": "Hover background color",
      "default": "#f0f0ee"
    },
    {
      "type": "header",
      "content": "Selected Option Border"
    },
    {
      "type": "checkbox",
      "id": "enable_selected_border",
      "label": "Add border to selected option",
      "default": false
    },
    {
      "type": "range",
      "id": "selected_border_thickness",
      "min": 1,
      "max": 5,
      "step": 1,
      "default": 2,
      "label": "Border thickness (px)"
    },
    {
      "type": "color",
      "id": "selected_border_color",
      "label": "Border color",
      "default": "#004f9f"
    },
    {
      "type": "checkbox",
      "id": "enable_border_top",
      "label": "Enable top border",
      "default": false
    },
    {
      "type": "checkbox",
      "id": "enable_border_bottom",
      "label": "Enable bottom border",
      "default": false
    },
    {
      "type": "color",
      "id": "color_border",
      "label": "Wrapper border color",
      "default": "#e6e6e6"
    },
    {
      "type": "header",
      "content": "Spacing"
    },
    {
      "type": "range",
      "id": "spacing_top",
      "label": "Top spacing",
      "min": 0,
      "max": 100,
      "step": 1,
      "unit": "px",
      "default": 0
    },
    {
      "type": "range",
      "id": "spacing_bottom",
      "label": "Bottom spacing",
      "min": 0,
      "max": 100,
      "step": 1,
      "unit": "px",
      "default": 15
    }
  ]
}
```

**2. Render the Block**

In your product template (e.g., `snippets/product-form.liquid` or within `sections/main-product.liquid`), add:

```liquid
{% for block in section.blocks %}
  {% case block.type %}
    {%- when 'volume_discount' -%}
      <div class="product-volume-discount">
        {% render 'volume-discount',
          product: product,
          current_variant: current_variant,
          block: block,
          section: section
        %}
      </div>
  {% endcase %}
{% endfor %}
```

### Option 2: Direct Include in Product Template

For simple implementation without theme editor controls:

```liquid
{% render 'volume-discount',
  product: product,
  current_variant: product.selected_or_first_available_variant,
  title: 'Select Quantity'
%}
```

### Option 3: Custom Implementation with Settings

```liquid
{% render 'volume-discount',
  product: product,
  current_variant: product.selected_or_first_available_variant,
  title: 'Choose Your Pack Size',
  radio_button_color: '#FF6B6B',
  radio_button_selected_color: '#4ECDC4',
  option_bg_color: '#F7F7F7',
  option_bg_selected_color: '#E8F5E9',
  enable_selected_border: true,
  selected_border_thickness: 3,
  selected_border_color: '#4ECDC4'
%}
```

## Customization

### CSS Variables

You can override the default styling by modifying CSS variables:

```css
.volume-discount-container {
  --radio-default-color: #004f9f;
  --radio-selected-color: #004f9f;
  --option-bg-color: #f9f9f7;
  --option-bg-selected-color: #e2e1e7;
  --option-bg-hover-color: #f0f0ee;
  --selected-border-thickness: 2px;
  --selected-border-color: #004f9f;
}
```

### JavaScript Configuration

You can manually initialize the component with custom options:

```javascript
VolumeDiscount.init('volume-discount-unique-id', {
  radioDefaultColor: '#FF6B6B',
  radioSelectedColor: '#4ECDC4',
  optionBgColor: '#F7F7F7',
  optionBgSelectedColor: '#E8F5E9',
  enableSelectedBorder: true,
  selectedBorderThickness: 3,
  selectedBorderColor: '#4ECDC4',
  productId: 123456789,
  onVariantChange: function(data) {
    console.log('Variant changed:', data.variantId, data.variantPrice);
  }
});
```

## Advanced Features

### Metafields Support

The module supports displaying unit prices and savings through Shopify metafields:

**Unit Price:**
- Namespace: `volume_discount`
- Key: `unit_price`
- Type: `single_line_text_field`
- Example value: `€2.35 / kg`

**To add metafields:**
1. Go to Settings → Custom data → Products
2. Add a metafield definition
3. Set values for individual product variants

### Event Listeners

The module dispatches custom events that you can listen to:

```javascript
// Listen for variant changes
document.addEventListener('volumediscount:variantchange', function(event) {
  console.log('New variant selected:', event.detail.variant);
});
```

### Programmatic Variant Selection

You can programmatically select a variant:

```javascript
const container = document.getElementById('volume-discount-main');
VolumeDiscount.updateSelection(container, '40123456789'); // variant ID
```

## Theme Compatibility

### Dawn Theme

The module is fully compatible with Shopify's Dawn theme. Follow "Option 1" above for integration.

### Debut Theme

Compatible with Debut. Add the block to `sections/product-template.liquid`.

### Custom Themes

The module is designed to be theme-agnostic. It will work with any theme that:
- Has a product form with `name="id"` input for variant selection
- Uses standard Shopify product objects

### Price Update Compatibility

The JavaScript automatically updates common price selectors. If your theme uses custom selectors, modify the `updateThemeSpecificPrices()` function in `volume-discount.js`:

```javascript
function updateThemeSpecificPrices(variantPrice) {
  // Add your theme's specific price selector
  const customPriceElement = document.querySelector('.your-theme-price-class');
  if (customPriceElement) {
    customPriceElement.innerHTML = variantPrice;
  }
}
```

## Troubleshooting

### Prices Not Updating

**Issue:** Variant selection works but prices don't update.

**Solution:** 
1. Check if your theme uses custom price selectors
2. Modify `updateThemeSpecificPrices()` in `volume-discount.js`
3. Ensure the product ID is correctly passed to the component

### Styling Conflicts

**Issue:** Component styling conflicts with theme styles.

**Solution:**
1. All component styles are scoped to `.volume-discount-container`
2. Increase specificity in `volume-discount.css` if needed
3. Use `!important` sparingly for critical overrides

### Multiple Products on Same Page

**Issue:** Multiple volume discount components on one page conflict.

**Solution:** The component automatically generates unique IDs based on section ID. Ensure each instance has a unique section or manually specify different IDs.

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Mobile

## Best Practices

1. **Use Descriptive Variant Titles:** Instead of "Option 1", use "5 kg", "10 kg", etc.
2. **Set Compare At Prices:** To display savings percentages
3. **Test on Mobile:** Ensure the component works well on smaller screens
4. **Limit Variants:** Works best with 2-6 variants for optimal UX
5. **Use Metafields:** For consistent unit pricing across products

## License

This module is provided as-is for use in Shopify themes. Feel free to modify and customize for your needs.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the implementation steps
3. Verify all files are correctly uploaded
4. Check browser console for JavaScript errors

## Changelog

### Version 1.0.0
- Initial release
- Modular CSS and JavaScript
- Full theme compatibility
- Customizable colors and borders
- Metafield support for unit pricing
- Auto-initialization support


