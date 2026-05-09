/* ============================================================
   Cozy Threads — Cart System (cart.js)
   ============================================================ */

/* ---- Cart Storage ---- */
function getCart() {
  return JSON.parse(localStorage.getItem('ct_cart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('ct_cart', JSON.stringify(cart));
  updateCartBadge();
}

/* ---- Add to cart by product ID ---- */
function addToCartById(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  let cart = getCart();
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
    showToast('Cart updated!', `${product.name} quantity increased 🛍️`, 'success');
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      qty: 1
    });
    showToast('Added to cart!', `${product.name} added 🎉`, 'success');
  }

  saveCart(cart);
  animateCartIcon();

  // Animate button
  const btns = document.querySelectorAll(`[onclick="addToCartById(${id})"]`);
  btns.forEach(btn => {
    if (btn.classList.contains('btn-add-cart')) {
      btn.classList.add('added');
      btn.innerHTML = '<i class="fas fa-check"></i> Added!';
      setTimeout(() => {
        btn.classList.remove('added');
        btn.innerHTML = '<i class="fas fa-plus"></i> Cart';
      }, 1500);
    }
  });
}

/* ---- Animate cart icon ---- */
function animateCartIcon() {
  const icon = document.getElementById('cartNavIcon');
  if (!icon) return;
  icon.style.transform = 'scale(1.35) rotate(-10deg)';
  setTimeout(() => { icon.style.transform = ''; }, 350);
}

/* ---- Update cart badge count ---- */
function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}

/* ============================================================
   Cart Page Rendering
   ============================================================ */
function renderCartPage() {
  const cartWrap     = document.getElementById('cartItemsWrap');
  const emptyCart    = document.getElementById('emptyCart');
  const cartContent  = document.getElementById('cartContent');
  if (!cartWrap) return;

  const cart = getCart();

  if (cart.length === 0) {
    if (emptyCart)   emptyCart.style.display   = 'block';
    if (cartContent) cartContent.style.display = 'none';
    return;
  }

  if (emptyCart)   emptyCart.style.display   = 'none';
  if (cartContent) cartContent.style.display = 'block';

  // Build cart rows
  cartWrap.innerHTML = cart.map(item => `
    <div class="cart-item-row" data-id="${item.id}" id="cart-row-${item.id}">
      <div class="cart-item-info">
        <img src="${item.image}"
             alt="${item.name}"
             class="cart-item-img"
             loading="lazy">
        <div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-variant">${item.category}</div>
        </div>
      </div>
      <div class="cart-item-price">$${item.price.toFixed(2)}</div>
      <div>
        <div class="qty-control" role="group" aria-label="Quantity for ${item.name}">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)"
                  aria-label="Decrease quantity">
            <i class="fas fa-minus"></i>
          </button>
          <span class="qty-value" id="qty-${item.id}">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)"
                  aria-label="Increase quantity">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
      <div class="cart-item-total" id="total-${item.id}">
        $${(item.price * item.qty).toFixed(2)}
      </div>
      <button class="btn-remove-item"
              onclick="removeCartItem(${item.id})"
              aria-label="Remove ${item.name} from cart"
              title="Remove item">
        <i class="fas fa-times"></i>
      </button>
    </div>`).join('');

  updateCartSummary();
}

/* ---- Change quantity ---- */
function changeQty(id, delta) {
  let cart = getCart();
  const item = cart.find(x => x.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeCartItem(id);
    return;
  }

  saveCart(cart);

  // Update DOM
  const qtyEl   = document.getElementById(`qty-${id}`);
  const totalEl = document.getElementById(`total-${id}`);
  if (qtyEl)   qtyEl.textContent   = item.qty;
  if (totalEl) totalEl.textContent = `$${(item.price * item.qty).toFixed(2)}`;

  updateCartSummary();
}

/* ---- Remove item ---- */
function removeCartItem(id) {
  let cart = getCart();
  const item = cart.find(x => x.id === id);
  const row  = document.getElementById(`cart-row-${id}`);

  if (row) {
    row.style.transition = 'all 0.35s ease';
    row.style.opacity    = '0';
    row.style.transform  = 'translateX(40px)';
    setTimeout(() => {
      cart = cart.filter(x => x.id !== id);
      saveCart(cart);
      renderCartPage();
    }, 350);
  } else {
    cart = cart.filter(x => x.id !== id);
    saveCart(cart);
    renderCartPage();
  }

  if (item) showToast('Item removed', `${item.name} removed from cart`, 'info');
}

/* ---- Clear entire cart ---- */
function clearCart() {
  saveCart([]);
  renderCartPage();
  showToast('Cart cleared', 'All items have been removed', 'info');
}

/* ---- Update summary panel ---- */
function updateCartSummary() {
  const cart     = getCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal >= 75 ? 0 : 8.99;
  const discount = getAppliedDiscount();
  const discountAmt = subtotal * discount;
  const tax      = (subtotal - discountAmt) * 0.08;
  const total    = subtotal - discountAmt + shipping + tax;

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  set('summarySubtotal',  `$${subtotal.toFixed(2)}`);
  set('summaryShipping',  shipping === 0 ? 'FREE 🎉' : `$${shipping.toFixed(2)}`);
  set('summaryDiscount',  discountAmt > 0 ? `-$${discountAmt.toFixed(2)}` : '$0.00');
  set('summaryTax',       `$${tax.toFixed(2)}`);
  set('summaryTotal',     `$${total.toFixed(2)}`);
  set('itemCount',        cart.reduce((s, i) => s + i.qty, 0));

  // Free shipping progress
  const freeShipEl = document.getElementById('freeShippingMsg');
  if (freeShipEl) {
    if (shipping === 0) {
      freeShipEl.innerHTML = '<i class="fas fa-truck text-sage me-1"></i> You qualify for <strong>FREE shipping</strong>!';
      freeShipEl.className = 'text-center p-2 rounded mb-3';
      freeShipEl.style.background = 'rgba(168,184,154,0.15)';
      freeShipEl.style.color      = 'var(--sage-dark)';
    } else {
      const remaining = (75 - subtotal).toFixed(2);
      freeShipEl.innerHTML = `<i class="fas fa-truck me-1"></i> Add <strong>$${remaining}</strong> more for FREE shipping!`;
      freeShipEl.className = 'text-center p-2 rounded mb-3';
      freeShipEl.style.background = 'rgba(232,180,184,0.15)';
      freeShipEl.style.color      = 'var(--dusty-pink-dark)';
    }
    freeShipEl.style.fontSize   = '0.82rem';
    freeShipEl.style.fontWeight = '500';
    freeShipEl.style.display    = 'block';
  }
}

/* ---- Promo codes ---- */
const PROMO_CODES = {
  'COZY10':  0.10,
  'CROCHET20': 0.20,
  'WELCOME15': 0.15,
  'YARN5':   0.05
};
let appliedPromo = null;

function getAppliedDiscount() {
  if (appliedPromo && PROMO_CODES[appliedPromo]) return PROMO_CODES[appliedPromo];
  return 0;
}

function applyPromoCode() {
  const input = document.getElementById('promoInput');
  const msgEl = document.getElementById('promoMsg');
  if (!input || !msgEl) return;

  const code = input.value.trim().toUpperCase();
  if (!code) {
    showPromoMsg(msgEl, 'Please enter a promo code.', 'error');
    return;
  }

  if (PROMO_CODES[code]) {
    appliedPromo = code;
    const pct = (PROMO_CODES[code] * 100).toFixed(0);
    showPromoMsg(msgEl, `🎉 "${code}" applied — ${pct}% off!`, 'success');
    updateCartSummary();
    showToast('Promo applied!', `${pct}% discount has been applied 🎊`, 'success');
  } else {
    appliedPromo = null;
    showPromoMsg(msgEl, '❌ Invalid promo code. Try COZY10 or CROCHET20.', 'error');
    updateCartSummary();
  }
}

function showPromoMsg(el, msg, type) {
  el.textContent = msg;
  el.style.fontSize   = '0.78rem';
  el.style.marginTop  = '0.4rem';
  el.style.fontWeight = '500';
  el.style.color = type === 'success' ? 'var(--sage-dark)' : '#e74c3c';
}

/* ============================================================
   Checkout Form Validation
   ============================================================ */
function initCheckoutForm() {
  const form = document.getElementById('checkoutForm');
  if (!form) return;

  // Real-time validation
  form.querySelectorAll('.form-control-custom').forEach(input => {
    input.addEventListener('input',  () => validateField(input));
    input.addEventListener('blur',   () => validateField(input));
  });

  // Payment option toggle
  document.querySelectorAll('.payment-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const radio = opt.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      // Show/hide card fields
      const cardFields = document.getElementById('cardFields');
      if (cardFields) {
        cardFields.style.display = radio && radio.value === 'card' ? 'block' : 'none';
      }
    });
  });

  // Format card number
  const cardNum = document.getElementById('cardNumber');
  if (cardNum) {
    cardNum.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').substring(0, 16);
      v = v.replace(/(.{4})/g, '$1 ').trim();
      e.target.value = v;
    });
  }

  // Format expiry
  const expiry = document.getElementById('cardExpiry');
  if (expiry) {
    expiry.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (v.length > 2) v = v.substring(0, 2) + '/' + v.substring(2);
      e.target.value = v;
    });
  }

  // Format CVV
  const cvv = document.getElementById('cardCvv');
  if (cvv) {
    cvv.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
    });
  }

  // Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitOrder();
  });
}

function validateField(input) {
  const value = input.value.trim();
  const name  = input.name || input.id;
  let error   = '';

  if (input.required && !value) {
    error = 'This field is required.';
  } else if (name === 'email' && value) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Enter a valid email address.';
  } else if (name === 'phone' && value) {
    if (!/^[\d\s\-\+\(\)]{7,15}$/.test(value)) error = 'Enter a valid phone number.';
  } else if (name === 'zip' && value) {
    if (!/^\d{4,10}$/.test(value.replace(/\s/g,''))) error = 'Enter a valid postal/ZIP code.';
  } else if (name === 'cardNumber' && value) {
    if (value.replace(/\s/g,'').length < 16) error = 'Enter a valid 16-digit card number.';
  } else if (name === 'cardExpiry' && value) {
    if (!/^\d{2}\/\d{2}$/.test(value)) error = 'Use MM/YY format.';
  } else if (name === 'cardCvv' && value) {
    if (value.length < 3) error = 'CVV must be 3-4 digits.';
  }

  // Apply validation state
  const msgEl = input.nextElementSibling;
  if (error) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    if (msgEl && msgEl.classList.contains('form-error-msg')) {
      msgEl.textContent = error;
      msgEl.style.display = 'block';
    }
    return false;
  } else if (value) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    if (msgEl && msgEl.classList.contains('form-error-msg')) {
      msgEl.style.display = 'none';
    }
    return true;
  }
  return true;
}

function submitOrder() {
  const form    = document.getElementById('checkoutForm');
  const fields  = form.querySelectorAll('.form-control-custom[required]');
  let   isValid = true;

  // Validate all required fields
  fields.forEach(field => {
    if (!validateField(field)) isValid = false;
  });

  // Check payment option selected
  const selectedPayment = form.querySelector('input[name="payment"]:checked');
  if (!selectedPayment) {
    showToast('Select payment', 'Please choose a payment method.', 'error');
    isValid = false;
  }

  // If credit card selected, validate card fields
  if (selectedPayment && selectedPayment.value === 'card') {
    const cardFields = form.querySelectorAll('#cardFields .form-control-custom');
    cardFields.forEach(f => { if (!validateField(f)) isValid = false; });
  }

  if (!isValid) {
    showToast('Check your details', 'Please fix the errors and try again.', 'error');
    // Scroll to first error
    const firstErr = form.querySelector('.is-invalid');
    if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // Simulate order processing
  const submitBtn = document.getElementById('submitOrderBtn');
  if (submitBtn) {
    submitBtn.disabled   = true;
    submitBtn.innerHTML  = '<span class="spinner-border spinner-border-sm me-2"></span> Processing…';
  }

  setTimeout(() => {
    // Clear cart
    saveCart([]);
    appliedPromo = null;

    // Show success
    const formWrap   = document.getElementById('checkoutFormWrap');
    const successWrap = document.getElementById('orderSuccess');
    if (formWrap)   formWrap.style.display   = 'none';
    if (successWrap) {
      successWrap.style.display = 'block';
      successWrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Generate order ID
    const orderIdEl = document.getElementById('orderId');
    if (orderIdEl) {
      orderIdEl.textContent = 'CT-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    showToast('Order placed! 🎉', 'Thank you for shopping with Cozy Threads!', 'success');
  }, 2200);
}

/* ---- Init cart page on DOM load ---- */
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  if (document.getElementById('cartItemsWrap')) {
    renderCartPage();
    initCheckoutForm();
  }
});
