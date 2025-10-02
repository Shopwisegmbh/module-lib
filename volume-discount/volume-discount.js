/**
 * Volume Discount Component JavaScript
 * Modular JS for the Volume Discount feature
 * Compatible with any Shopify theme
 * 
 * Usage:
 * 1. Include this file in your theme
 * 2. Initialize with: VolumeDiscount.init(containerId, options)
 */

const VolumeDiscount = (function() {
  'use strict';

  // Default configuration
  const defaults = {
    radioDefaultColor: '#004f9f',
    radioSelectedColor: '#004f9f',
    optionBgColor: '#f9f9f7',
    optionBgSelectedColor: '#e2e1e7',
    optionBgHoverColor: '#f0f0ee',
    enableSelectedBorder: false,
    selectedBorderThickness: 2,
    selectedBorderColor: '#004f9f',
    productId: null,
    onVariantChange: null // Callback function when variant changes
  };

  /**
   * Initialize the volume discount component
   * @param {string} containerId - The ID of the container element
   * @param {object} options - Configuration options
   */
  function init(containerId, options) {
    const config = Object.assign({}, defaults, options);
    const container = document.getElementById(containerId);
    
    if (!container) {
      console.warn('Volume Discount: Container not found with ID:', containerId);
      return;
    }

    // Apply CSS variables
    applyCSSVariables(container, config);

    // Set up event listeners
    setupEventListeners(container, config);

    // Listen for external variant changes
    setupExternalListeners(container);
  }

  /**
   * Apply CSS variables to the container
   * @param {Element} container - The container element
   * @param {object} config - Configuration options
   */
  function applyCSSVariables(container, config) {
    container.style.setProperty('--radio-default-color', config.radioDefaultColor);
    container.style.setProperty('--radio-selected-color', config.radioSelectedColor);
    container.style.setProperty('--option-bg-color', config.optionBgColor);
    container.style.setProperty('--option-bg-selected-color', config.optionBgSelectedColor);
    container.style.setProperty('--option-bg-hover-color', config.optionBgHoverColor);
    container.style.setProperty('--selected-border-thickness', config.selectedBorderThickness + 'px');
    container.style.setProperty('--selected-border-color', config.selectedBorderColor);

    // Add border class if enabled
    if (config.enableSelectedBorder) {
      const options = container.querySelectorAll('.volume-discount-option');
      options.forEach(option => option.classList.add('has-selected-border'));
    }
  }

  /**
   * Set up event listeners for variant selection
   * @param {Element} container - The container element
   * @param {object} config - Configuration options
   */
  function setupEventListeners(container, config) {
    const volumeOptions = container.querySelectorAll('.volume-option-input');
    const optionWrappers = container.querySelectorAll('.volume-discount-option');

    volumeOptions.forEach(function(option) {
      option.addEventListener('change', function() {
        // Update selected state
        optionWrappers.forEach(wrapper => wrapper.classList.remove('selected'));
        this.closest('.volume-discount-option').classList.add('selected');

        // Get variant data
        const variantId = this.getAttribute('data-variant-id');
        const variantPrice = this.getAttribute('data-variant-price');

        // Update the product form
        updateProductForm(variantId);

        // Update price displays
        updateProductPrices(variantId, variantPrice, config.productId);

        // Trigger custom event
        triggerVariantChangeEvent(variantId, variantPrice);

        // Call callback if provided
        if (typeof config.onVariantChange === 'function') {
          config.onVariantChange({
            variantId: variantId,
            variantPrice: variantPrice
          });
        }
      });
    });
  }

  /**
   * Update the product form with selected variant
   * @param {string} variantId - The variant ID
   */
  function updateProductForm(variantId) {
    const productForm = document.querySelector('form[action*="/cart/add"]');
    
    if (!productForm) {
      console.warn('Volume Discount: Product form not found');
      return;
    }

    const variantInput = productForm.querySelector('input[name="id"], select[name="id"]');
    
    if (variantInput) {
      variantInput.value = variantId;
      variantInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  /**
   * Update product price displays
   * @param {string} variantId - The variant ID
   * @param {string} variantPrice - The formatted variant price
   * @param {number} productId - The product ID
   */
  function updateProductPrices(variantId, variantPrice, productId) {
    // Update main product price
    if (productId) {
      const productPriceElement = document.getElementById('product-price-' + productId);
      if (productPriceElement) {
        const priceElements = productPriceElement.querySelectorAll('.price');
        priceElements.forEach(function(priceEl) {
          priceEl.innerHTML = variantPrice;
        });
      }
    }

    // Update subtotal if it exists
    const subtotalElement = document.querySelector('.productView-subtotal .money-subtotal');
    if (subtotalElement) {
      subtotalElement.innerHTML = variantPrice;
    }

    // Update price wrappers
    const allPriceWrappers = document.querySelectorAll('[data-price-wrapper]');
    allPriceWrappers.forEach(function(wrapper) {
      const priceElement = wrapper.querySelector('.price__regular .price-item--regular');
      if (priceElement) {
        priceElement.innerHTML = variantPrice;
      }
    });

    // Update any additional price elements (theme-specific)
    updateThemeSpecificPrices(variantPrice);
  }

  /**
   * Update theme-specific price elements
   * Override this function for specific theme compatibility
   * @param {string} variantPrice - The formatted variant price
   */
  function updateThemeSpecificPrices(variantPrice) {
    // Dawn theme compatibility
    const priceElement = document.querySelector('.price__container .price-item--regular');
    if (priceElement) {
      priceElement.innerHTML = variantPrice;
    }

    // Update any element with data-zwischensumme attribute
    const zwischensummeElement = document.querySelector('[data-zwischensumme]');
    if (zwischensummeElement) {
      zwischensummeElement.innerHTML = variantPrice;
    }
  }

  /**
   * Trigger a custom variant change event
   * @param {string} variantId - The variant ID
   * @param {string} variantPrice - The formatted variant price
   */
  function triggerVariantChangeEvent(variantId, variantPrice) {
    const event = new CustomEvent('volumediscount:variantchange', {
      detail: {
        variant: {
          id: variantId,
          price: variantPrice
        }
      },
      bubbles: true
    });
    document.dispatchEvent(event);
  }

  /**
   * Set up listeners for external variant changes
   * @param {Element} container - The container element
   */
  function setupExternalListeners(container) {
    // Listen for variant changes from other components
    document.addEventListener('variant:changed', function(event) {
      if (event.detail && event.detail.variant) {
        updateSelection(container, event.detail.variant.id);
      }
    });
  }

  /**
   * Update the selected variant programmatically
   * @param {Element} container - The container element
   * @param {string} variantId - The variant ID to select
   */
  function updateSelection(container, variantId) {
    const volumeOptions = container.querySelectorAll('.volume-option-input');
    const optionWrappers = container.querySelectorAll('.volume-discount-option');

    volumeOptions.forEach(function(option) {
      const isSelected = option.getAttribute('data-variant-id') === String(variantId);
      option.checked = isSelected;

      const wrapper = option.closest('.volume-discount-option');
      if (isSelected) {
        wrapper.classList.add('selected');
        
        // Update prices when selection changes externally
        const variantPrice = option.getAttribute('data-variant-price');
        const productId = container.getAttribute('data-product-id');
        updateProductPrices(variantId, variantPrice, productId);
      } else {
        wrapper.classList.remove('selected');
      }
    });
  }

  // Public API
  return {
    init: init,
    updateSelection: updateSelection
  };
})();

// Auto-initialize if data-volume-discount-auto-init attribute is present
document.addEventListener('DOMContentLoaded', function() {
  const autoInitElements = document.querySelectorAll('[data-volume-discount-auto-init]');
  
  autoInitElements.forEach(function(element) {
    const containerId = element.id;
    const config = {
      radioDefaultColor: element.getAttribute('data-radio-default-color') || undefined,
      radioSelectedColor: element.getAttribute('data-radio-selected-color') || undefined,
      optionBgColor: element.getAttribute('data-option-bg-color') || undefined,
      optionBgSelectedColor: element.getAttribute('data-option-bg-selected-color') || undefined,
      optionBgHoverColor: element.getAttribute('data-option-bg-hover-color') || undefined,
      enableSelectedBorder: element.getAttribute('data-enable-selected-border') === 'true',
      selectedBorderThickness: parseInt(element.getAttribute('data-selected-border-thickness')) || undefined,
      selectedBorderColor: element.getAttribute('data-selected-border-color') || undefined,
      productId: element.getAttribute('data-product-id') || null
    };

    VolumeDiscount.init(containerId, config);
  });
});


