/**
 * FullStackProgramming_Assignment_01
 * Main JS — Form Validation, Animations, Interactions
 * Uses jQuery (loaded via CDN in HTML files)
 */

/* ============ NAVBAR ============ */
$(document).ready(function () {

  // Mobile hamburger toggle
  $('.hamburger').on('click', function () {
    $('.nav-links').toggleClass('open');
    $(this).toggleClass('active');
  });

  // Close nav when link clicked on mobile
  $('.nav-links a').on('click', function () {
    if ($(window).width() < 768) {
      $('.nav-links').removeClass('open');
    }
  });

  // Navbar scroll effect
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 50) {
      $('.navbar').addClass('scrolled');
    } else {
      $('.navbar').removeClass('scrolled');
    }
  });

  /* ============ FADE-IN ON SCROLL (Intersection Observer) ============ */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $(entry.target).addClass('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.product-card, .category-card, .feature-item, .team-card, .stat-item').forEach(el => {
    observer.observe(el);
  });

  /* ============ FORM VALIDATION HELPERS ============ */

  function showError(field, msg) {
    $(field).addClass('error').removeClass('success');
    $(field).siblings('.error-msg').text(msg).addClass('show');
  }

  function showSuccess(field) {
    $(field).removeClass('error').addClass('success');
    $(field).siblings('.error-msg').removeClass('show');
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    return /^[\d\s\-\+\(\)]{7,15}$/.test(phone);
  }

  function isStrongPassword(pwd) {
    return pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd);
  }

  /* ============ LIVE VALIDATION (blur) ============ */
  $(document).on('blur', '.validate-name', function () {
    const val = $(this).val().trim();
    if (!val || val.length < 2) showError(this, 'Name must be at least 2 characters.');
    else showSuccess(this);
  });

  $(document).on('blur', '.validate-email', function () {
    const val = $(this).val().trim();
    if (!val) showError(this, 'Email is required.');
    else if (!isValidEmail(val)) showError(this, 'Please enter a valid email address.');
    else showSuccess(this);
  });

  $(document).on('blur', '.validate-password', function () {
    const val = $(this).val();
    if (!val) showError(this, 'Password is required.');
    else if (!isStrongPassword(val)) showError(this, 'Min 8 chars, 1 uppercase, 1 number.');
    else showSuccess(this);
  });

  $(document).on('blur', '.validate-confirm-password', function () {
    const val = $(this).val();
    const pwd = $(this).closest('form').find('.validate-password').val();
    if (!val) showError(this, 'Please confirm your password.');
    else if (val !== pwd) showError(this, 'Passwords do not match.');
    else showSuccess(this);
  });

  $(document).on('blur', '.validate-phone', function () {
    const val = $(this).val().trim();
    if (!val) showError(this, 'Phone number is required.');
    else if (!isValidPhone(val)) showError(this, 'Enter a valid phone number.');
    else showSuccess(this);
  });

  $(document).on('blur', '.validate-required', function () {
    const val = $(this).val().trim();
    if (!val) showError(this, 'This field is required.');
    else showSuccess(this);
  });

  /* ============ FORM SUBMIT HANDLERS ============ */

  // --- LOGIN FORM ---
  $('#loginForm').on('submit', function (e) {
    e.preventDefault();
    let valid = true;

    const email = $('#loginEmail');
    const pwd = $('#loginPassword');

    if (!isValidEmail(email.val().trim())) { showError(email, 'Please enter a valid email.'); valid = false; }
    else showSuccess(email);

    if (pwd.val().length < 6) { showError(pwd, 'Password must be at least 6 characters.'); valid = false; }
    else showSuccess(pwd);

    if (valid) {
      const btn = $(this).find('[type=submit]');
      btn.prop('disabled', true).html('<span class="spinner-border-sm"></span> Signing in...');
      setTimeout(() => {
        showToast('Login successful! Redirecting...', 'success');
        setTimeout(() => { window.location.href = 'my-account.html'; }, 1200);
      }, 1200);
    }
  });

  // --- REGISTER FORM ---
  $('#registerForm').on('submit', function (e) {
    e.preventDefault();
    let valid = true;
    const fields = [
      { id: '#regFirstName', validator: v => v.length >= 2, msg: 'First name must be at least 2 chars.' },
      { id: '#regLastName',  validator: v => v.length >= 2, msg: 'Last name must be at least 2 chars.' },
      { id: '#regEmail',     validator: isValidEmail,       msg: 'Enter a valid email.' },
      { id: '#regPhone',     validator: isValidPhone,        msg: 'Enter a valid phone number.' },
      { id: '#regPassword',  validator: isStrongPassword,   msg: 'Min 8 chars, 1 uppercase, 1 number.' },
    ];

    fields.forEach(f => {
      const el = $(f.id);
      if (!f.validator(el.val().trim())) { showError(el, f.msg); valid = false; }
      else showSuccess(el);
    });

    const confirm = $('#regConfirmPassword');
    if (confirm.val() !== $('#regPassword').val()) { showError(confirm, 'Passwords do not match.'); valid = false; }
    else showSuccess(confirm);

    if (!$('#agreeTerms').is(':checked')) {
      $('#termsError').addClass('show');
      valid = false;
    } else {
      $('#termsError').removeClass('show');
    }

    if (valid) {
      showToast('Account created! Welcome to AquaLux!', 'success');
      setTimeout(() => { window.location.href = 'login.html'; }, 1500);
    }
  });

  // --- FORGOT PASSWORD FORM ---
  $('#forgotForm').on('submit', function (e) {
    e.preventDefault();
    const email = $('#forgotEmail');
    if (!isValidEmail(email.val().trim())) { showError(email, 'Enter a valid email.'); return; }
    showSuccess(email);
    showToast('Reset link sent! Check your inbox.', 'success');
    $(this)[0].reset();
  });

  // --- CONTACT FORM ---
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    let valid = true;

    ['#contactName', '#contactEmail', '#contactSubject', '#contactMessage'].forEach(id => {
      const el = $(id);
      if (!el.val().trim()) { showError(el, 'This field is required.'); valid = false; }
      else if (id === '#contactEmail' && !isValidEmail(el.val())) { showError(el, 'Enter valid email.'); valid = false; }
      else showSuccess(el);
    });

    if (valid) {
      showToast('Message sent! We\'ll get back to you soon.', 'success');
      $(this)[0].reset();
      $(this).find('.form-control').removeClass('success');
    }
  });

  // --- CHECKOUT / PAYMENT FORM ---
  $('#checkoutForm').on('submit', function (e) {
    e.preventDefault();
    let valid = true;

    $(this).find('.validate-required, .validate-email, .validate-phone').each(function () {
      if (!$(this).val().trim()) { showError(this, 'Required.'); valid = false; }
    });

    if (valid) {
      const btn = $(this).find('[type=submit]');
      btn.prop('disabled', true).text('Processing...');
      setTimeout(() => {
        window.location.href = 'order-summary.html';
      }, 1500);
    }
  });

  // --- EDIT ACCOUNT FORM ---
  $('#editAccountForm').on('submit', function (e) {
    e.preventDefault();
    showToast('Account updated successfully!', 'success');
  });

  // --- EDIT ADDRESS FORMS ---
  $('#editBillingForm, #editShippingForm').on('submit', function (e) {
    e.preventDefault();
    showToast('Address saved successfully!', 'success');
  });

  /* ============ QUANTITY CONTROLS ============ */
  $(document).on('click', '.qty-btn', function () {
    const input = $(this).siblings('.qty-input');
    let val = parseInt(input.val()) || 1;
    if ($(this).hasClass('qty-minus')) val = Math.max(1, val - 1);
    else val += 1;
    input.val(val);
    updateCartTotal();
  });

  $(document).on('change', '.qty-input', function () {
    let val = parseInt($(this).val()) || 1;
    if (val < 1) val = 1;
    $(this).val(val);
    updateCartTotal();
  });

  function updateCartTotal() {
    let subtotal = 0;
    $('.cart-row').each(function () {
      const price = parseFloat($(this).data('price')) || 0;
      const qty = parseInt($(this).find('.qty-input').val()) || 1;
      const lineTotal = price * qty;
      $(this).find('.line-total').text('$' + lineTotal.toFixed(2));
      subtotal += lineTotal;
    });
    if (subtotal > 0) {
      $('.subtotal-val').text('$' + subtotal.toFixed(2));
      const shipping = subtotal > 500 ? 0 : 49;
      $('.shipping-val').text(shipping === 0 ? 'FREE' : '$' + shipping);
      const tax = subtotal * 0.08;
      $('.tax-val').text('$' + tax.toFixed(2));
      $('.total-val').text('$' + (subtotal + shipping + tax).toFixed(2));
    }
  }

  // Remove item from cart
  $(document).on('click', '.remove-item', function () {
    $(this).closest('tr').fadeOut(300, function () {
      $(this).remove();
      updateCartTotal();
      if ($('.cart-row').length === 0) {
        $('#cartTableBody').html('<tr><td colspan="5" class="text-center" style="padding:40px"><i class="bi bi-cart-x" style="font-size:3rem;color:var(--gray)"></i><p class="mt-2">Your cart is empty.</p><a href="category.html" class="btn btn-primary mt-2">Continue Shopping</a></td></tr>');
      }
    });
  });

  /* ============ PRODUCT GALLERY ============ */
  $(document).on('click', '.thumb', function () {
    const src = $(this).find('img').attr('src');
    $('.main-image img').attr('src', src);
    $('.thumb').removeClass('active');
    $(this).addClass('active');
  });

  /* ============ TABS ============ */
  $(document).on('click', '.tab-btn', function () {
    const target = $(this).data('tab');
    $('.tab-btn').removeClass('active');
    $('.tab-pane').removeClass('active');
    $(this).addClass('active');
    $('#' + target).addClass('active');
  });

  /* ============ PAYMENT METHOD TOGGLE ============ */
  $(document).on('change', 'input[name="paymentMethod"]', function () {
    $('.payment-option').removeClass('selected');
    $(this).closest('.payment-option').addClass('selected');
    const method = $(this).val();
    $('.payment-details').hide();
    $('#' + method + 'Details').show();
  });

  /* ============ PASSWORD TOGGLE ============ */
  $(document).on('click', '.password-toggle', function () {
    const input = $(this).siblings('input');
    const icon = $(this).find('i');
    if (input.attr('type') === 'password') {
      input.attr('type', 'text');
      icon.removeClass('bi-eye').addClass('bi-eye-slash');
    } else {
      input.attr('type', 'password');
      icon.removeClass('bi-eye-slash').addClass('bi-eye');
    }
  });

  /* ============ ADD TO CART / WISHLIST ============ */
  $(document).on('click', '.add-to-cart', function () {
    const btn = $(this);
    const name = btn.data('name') || 'Product';
    btn.prop('disabled', true).html('<span class="spinner" style="width:16px;height:16px;border-width:2px;display:inline-block"></span>');
    setTimeout(() => {
      btn.prop('disabled', false).html('<i class="bi bi-cart-plus"></i> Add to Cart');
      updateBadge();
      showToast(name + ' added to cart!', 'success');
    }, 600);
  });

  $(document).on('click', '.add-wishlist', function () {
    $(this).toggleClass('active');
    const added = $(this).hasClass('active');
    showToast(added ? 'Added to wishlist!' : 'Removed from wishlist.', added ? 'success' : 'info');
  });

  function updateBadge() {
    const badge = $('.cart-badge');
    let count = parseInt(badge.text()) || 0;
    count++;
    badge.text(count).addClass('bump');
    setTimeout(() => badge.removeClass('bump'), 300);
  }

  /* ============ TOAST NOTIFICATIONS ============ */
  window.showToast = function (msg, type = 'success') {
    const colors = { success: '#28a745', danger: '#dc3545', info: '#2e86ab', warning: '#ffc107' };
    const toast = $(`
      <div style="position:fixed;bottom:24px;right:24px;background:${colors[type]};color:white;padding:14px 22px;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,0.2);z-index:9999;font-size:0.92rem;font-weight:600;max-width:300px;animation:slideIn 0.3s ease">
        ${msg}
      </div>
    `);
    $('body').append(toast);
    setTimeout(() => toast.fadeOut(300, () => toast.remove()), 3000);
  };

  /* ============ COUPON CODE ============ */
  $('#applyCoupon').on('click', function () {
    const code = $('#couponCode').val().trim().toUpperCase();
    const discounts = { 'SAVE10': 10, 'SUMMER20': 20, 'AQUA15': 15 };
    if (discounts[code]) {
      showToast(`Coupon "${code}" applied! ${discounts[code]}% off.`, 'success');
    } else {
      showToast('Invalid coupon code.', 'danger');
    }
  });

  /* ============ NEWSLETTER ============ */
  $(document).on('submit', '.newsletter-form', function (e) {
    e.preventDefault();
    const email = $(this).find('input').val().trim();
    if (isValidEmail(email)) {
      showToast('Subscribed successfully!', 'success');
      $(this)[0].reset();
    } else {
      showToast('Please enter a valid email.', 'danger');
    }
  });

  /* ============ BACK TO TOP ============ */
  $('body').append('<button id="backTop" style="position:fixed;bottom:80px;right:24px;width:44px;height:44px;background:var(--primary);color:white;border:none;border-radius:50%;cursor:pointer;display:none;font-size:1.2rem;box-shadow:var(--shadow);z-index:999" title="Back to top">↑</button>');
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) $('#backTop').fadeIn();
    else $('#backTop').fadeOut();
  });
  $('#backTop').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 400);
  });

  /* ============ SEARCH ============ */
  $(document).on('keyup', '#searchInput', function () {
    const query = $(this).val().toLowerCase();
    $('.product-card').each(function () {
      const name = $(this).find('h4').text().toLowerCase();
      $(this).toggle(name.includes(query));
    });
  });

  /* ============ FILTER SIDEBAR ============ */
  $(document).on('change', '.price-filter', function () {
    const max = parseFloat($(this).val());
    $('.product-card').each(function () {
      const price = parseFloat($(this).find('.price-current').text().replace('$', ''));
      $(this).toggle(isNaN(max) || price <= max);
    });
  });

  /* Initial call */
  updateCartTotal();

});
