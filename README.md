# Shopify Module Library

This repository contains modular, reusable UI components for Shopify themes.
Each module is written in Liquid, CSS, and optionally JavaScript, and follows a consistent BEM naming convention.

---

## Structure

Each module is structured as follows:

```
/module-name/
├── module-name-component.liquid
├── module-name-component.css
├── module-name-component.js (optional)
```

Modules are designed to be isolated, scalable, and easily maintainable across multiple Shopify themes.

---

## Available Modules

### `proof-widget`

Displays two trust badges (e.g. icons or seals) and a short text.

* Template: `proof-widget-component.liquid`
* Classes: `.proof-widget`, `.proof-widget__image`, `.proof-widget__text`
* Purpose: Reinforce trust on product pages

### `expert-widget`

Displays an expert photo and a call-to-action text.

* Template: `expert-widget-component.liquid`
* Classes: `.expert-widget__image`, `.expert-widget__text`
* Purpose: Add consultation or human element to PDP

### `usp-widget`

Displays up to three unique selling points with an icon and a short description.

* Template: `usp-widget-component.liquid`
* Classes: `.usp-widget__item`, `.usp-widget__icon`, `.usp-widget__text`
* Purpose: Highlight product advantages compactly

---

## Image Rendering

All images use `image_tag` with `image_url`, responsive `sizes`, and `widths` attributes for proper optimization.

Example:

```liquid
{{ image | image_url: width: image.width | image_tag:
  loading: 'lazy',
  sizes: '(max-width: 999px) 100vw, 80px',
  widths: '45,90,135,180,300',
  class: 'proof-widget__image'
}}
```

---

## Naming Conventions

* BEM-style class names: `block__element--modifier`
* No global IDs
* CSS is scoped per module
* JavaScript (if used) should be deferred or used as module

---

## Installation

1. Copy the desired module folder(s) into your Shopify theme.

2. Include the Liquid file using:

   ```liquid
   {% render 'module-name-component' %}
   ```

3. Import the module CSS into your main stylesheet or include it as an additional file.

4. If applicable, import and initialize the module JavaScript in your theme's main JS entry point.


