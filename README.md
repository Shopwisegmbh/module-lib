# Modular Component Library

This repository contains a growing library of reusable frontend components, structured for use in Shopify or similar Liquid-based environments. Each component is organized in its own folder and follows consistent naming conventions to ensure maintainability and scalability.

## 📁 Directory Structure

Each component lives in its own folder and typically includes:

- `component-name-component.liquid`: The Liquid markup for the component
- `component-name-component.css`: The styling for the component
- `component-name-component.js` *(optional)*: The JavaScript logic (if needed)

Example:

author-box-block/
├── author-box-component.liquid
├── author-box-component.css

## 🔤 Naming Conventions

To maintain consistency across the codebase, the following naming conventions are used:

### Folders

- **Format**: `component-purpose-block`
- **Example**: `author-box-block`, `social-encouragement-block`

### Files

Each file in a component block must use the following format:

- **Liquid**: `component-name-component.liquid`
- **CSS**: `component-name-component.css`
- **JavaScript**: `component-name-component.js`

> 🔁 The `component-name` must match the folder name prefix (e.g. `author-box` in `author-box-block`).

### Example

For a component called "expert box":

expert-block/
├── expert-box-component.liquid
├── expert-box-component.css


## 🧱 Available Components

- **Author Box**
- **Expert Box**
- **Tags Block**
- **Social Encouragement Block**

More components will be added over time.

## 🛠 Usage

To use a component:

1. Copy the component folder into your project.
2. Include the `.liquid` file where needed in your templates.
3. Import or include the associated `.css` and `.js` files.

> Ensure that all component CSS/JS are loaded in your main layout if not bundled automatically.

## 🧭 Goals

- Maintain a modular structure
- Keep all components independent and reusable
- Make onboarding for new developers easy through clear conventions

---

