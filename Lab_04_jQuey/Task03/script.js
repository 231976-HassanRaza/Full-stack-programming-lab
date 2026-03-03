/* ============================================================
   Task 3 – Interactive Form Validation | script.js
   jQuery Features: Event Handling, CSS Manipulation, DOM Manipulation
   ============================================================ */

/* ══════════════════════════════════════════
   VALIDATION RULES
══════════════════════════════════════════ */
const rules = {
  fullName: {
    validate: (v) => v.trim().length >= 3 && /^[a-zA-Z\s]+$/.test(v.trim()),
    message:  'Name must be at least 3 letters (no numbers).'
  },
  email: {
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    message:  'Enter a valid email address.'
  },
  phone: {
    validate: (v) => /^[0-9\+\-\s]{10,15}$/.test(v.trim()),
    message:  'Enter a valid phone number (10–15 digits).'
  },
  username: {
    validate: (v) => v.trim().length >= 4 && /^[a-zA-Z0-9_]+$/.test(v.trim()),
    message:  'Username: 4+ chars, letters/numbers/underscores only.'
  },
  password: {
    validate: (v) => v.length >= 8,
    message:  'Password must be at least 8 characters.'
  },
  confirmPw: {
    validate: (v) => v === $('#password').val(),
    message:  'Passwords do not match.'
  }
};

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */

/**
 * setFieldState — CSS Manipulation via jQuery addClass / removeClass
 * @param {string} fieldId   - DOM id of .field wrapper (e.g. 'field-name')
 * @param {string} inputId   - DOM id of the <input>
 * @param {'valid'|'error'|''} state
 * @param {string} [msg]     - Error message (shown when state === 'error')
 */
function setFieldState(fieldId, inputId, state, msg = '') {
  const $field  = $(`#${fieldId}`);
  const $status = $(`#status-${inputId.replace('confirmPw','confirm')}`);
  const $err    = $(`#err-${inputId.replace('confirmPw','confirm')}`);

  // CSS Manipulation: remove both states then apply the new one
  $field.removeClass('valid error');

  if (state === 'valid') {
    $field.addClass('valid');                         // CSS Manipulation
    $status.text('✓').css('color', '#16a34a');        // CSS Manipulation
    $err.hide();                                      // DOM Manipulation
  } else if (state === 'error') {
    $field.addClass('error');                         // CSS Manipulation
    $status.text('✕').css('color', '#ef4444');        // CSS Manipulation
    $err.text(msg).show();                            // DOM Manipulation
  } else {
    $status.text('').css('color', '');
    $err.hide();                                      // DOM Manipulation
  }
}

/** validateField — runs a single field's rule and updates UI */
function validateField(inputId) {
  const fieldId = `field-${inputId === 'confirmPw' ? 'confirm' : inputId}`;
  const val     = $(`#${inputId}`).val();
  const rule    = rules[inputId];

  if (!val) {
    setFieldState(fieldId, inputId, '');
    return false;
  }

  if (rule.validate(val)) {
    setFieldState(fieldId, inputId, 'valid');
    return true;
  } else {
    setFieldState(fieldId, inputId, 'error', rule.message);
    return false;
  }
}

/** validateStep1 — validates all Step 1 fields, returns true if all pass */
function validateStep1() {
  const fields  = ['fullName', 'email', 'phone'];
  let allValid  = true;

  fields.forEach(id => {
    const fieldId = `field-${id}`;
    const val     = $(`#${id}`).val().trim();
    const rule    = rules[id];

    if (!val) {
      setFieldState(fieldId, id, 'error', 'This field is required.');
      allValid = false;
    } else if (!rule.validate(val)) {
      setFieldState(fieldId, id, 'error', rule.message);
      allValid = false;
    } else {
      setFieldState(fieldId, id, 'valid');
    }
  });

  return allValid;
}

/** validateStep2 — validates all Step 2 fields, returns true if all pass */
function validateStep2() {
  const fields = ['username', 'password', 'confirmPw'];
  let allValid = true;

  fields.forEach(id => {
    const fieldId = `field-${id === 'confirmPw' ? 'confirm' : id}`;
    const val     = $(`#${id}`).val();
    const rule    = rules[id];

    if (!val) {
      setFieldState(fieldId, id, 'error', 'This field is required.');
      allValid = false;
    } else if (!rule.validate(val)) {
      setFieldState(fieldId, id, 'error', rule.message);
      allValid = false;
    } else {
      setFieldState(fieldId, id, 'valid');
    }
  });

  // Terms checkbox — DOM Manipulation: check state
  if (!$('#terms').is(':checked')) {
    $('#field-terms').addClass('error');              // CSS Manipulation
    $('#err-terms').text('You must agree to the terms.').show(); // DOM Manipulation
    allValid = false;
  } else {
    $('#field-terms').removeClass('error');           // CSS Manipulation
    $('#err-terms').hide();                           // DOM Manipulation
  }

  return allValid;
}

/* ══════════════════════════════════════════
   PASSWORD STRENGTH METER
══════════════════════════════════════════ */
function getStrength(pw) {
  let score = 0;
  if (pw.length >= 8)                       score++;
  if (pw.length >= 12)                      score++;
  if (/[A-Z]/.test(pw))                     score++;
  if (/[0-9]/.test(pw))                     score++;
  if (/[^a-zA-Z0-9]/.test(pw))             score++;
  return score;
}

function updateStrengthMeter(pw) {
  if (!pw) {
    $('#strengthWrap').removeClass('visible');         // CSS Manipulation
    return;
  }

  $('#strengthWrap').addClass('visible');              // CSS Manipulation

  const score = getStrength(pw);
  let width, color, label;

  if (score <= 1)      { width = '20%'; color = '#ef4444'; label = 'Weak'; }
  else if (score <= 2) { width = '45%'; color = '#f59e0b'; label = 'Fair'; }
  else if (score <= 3) { width = '65%'; color = '#0ea5e9'; label = 'Good'; }
  else if (score <= 4) { width = '82%'; color = '#16a34a'; label = 'Strong'; }
  else                 { width = '100%'; color = '#15803d'; label = '💪 Very Strong'; }

  // CSS Manipulation: animate strength bar width and color
  $('#strengthFill').css({ width, background: color });
  $('#strengthLabel').text(label).css('color', color);  // CSS Manipulation
}

/* ══════════════════════════════════════════
   STEP NAVIGATION
══════════════════════════════════════════ */

/** goToStep2 — transition from Step 1 to Step 2 */
function goToStep2() {
  // DOM Manipulation: hide step1, show step2 with slideUp/slideDown
  $('#step1').slideUp(250, function () {               // Effects
    $('#step2').slideDown(280);                        // Effects
  });

  // CSS Manipulation: update progress indicators
  $('#step-indicator-1').removeClass('active').addClass('done');
  $('#step-indicator-2').addClass('active');
  $('.step-line').first().addClass('filled');          // CSS Manipulation
}

/** goToStep1 — go back */
function goToStep1() {
  $('#step2').slideUp(250, function () {               // Effects
    $('#step1').slideDown(280);                        // Effects
  });

  // CSS Manipulation: revert progress
  $('#step-indicator-2').removeClass('active');
  $('#step-indicator-1').addClass('active').removeClass('done');
  $('.step-line').first().removeClass('filled');       // CSS Manipulation
}

/** showSuccess — reveal success screen */
function showSuccess() {
  // Build summary — DOM Manipulation
  const name  = $('#fullName').val().trim();
  const email = $('#email').val().trim();
  const uname = $('#username').val().trim();
  const phone = $('#phone').val().trim();

  const $summary = $('#successSummary').empty();      // DOM Manipulation

  [
    { key: 'Name',     val: name  },
    { key: 'Email',    val: email },
    { key: 'Username', val: uname },
    { key: 'Phone',    val: phone }
  ].forEach(row => {
    $summary.append(`                                 
      <div class="summary-row">
        <span class="summary-key">${row.key}</span>
        <span class="summary-val">${row.val}</span>
      </div>
    `);                                               // DOM Manipulation: append rows
  });

  // Transition to success screen
  $('#step2').slideUp(260, function () {              // Effects
    $('#successScreen').fadeIn(380);                  // Effects: fadeIn
  });

  // CSS Manipulation: complete progress indicator
  $('#step-indicator-2').removeClass('active').addClass('done');
  $('#step-indicator-3').addClass('active');
  $('.step-line').last().addClass('filled');          // CSS Manipulation
}

/* ══════════════════════════════════════════
   EVENT HANDLERS
══════════════════════════════════════════ */

/* ── Blur validation — validate on leaving each field ── */
// Event Handling: .on('blur')
$('#fullName, #email, #phone').on('blur', function () {
  validateField(this.id);
});

$('#username, #confirmPw').on('blur', function () {
  validateField(this.id);
});

$('#password').on('blur', function () {
  validateField('password');
});

/* ── Live input feedback ── */
// Event Handling: .on('input')
$('#fullName, #email, #phone, #username, #password, #confirmPw').on('input', function () {
  const id = this.id;

  // Only show valid tick live (don't show error while typing)
  if (rules[id] && rules[id].validate($(this).val())) {
    const fieldId = `field-${id === 'confirmPw' ? 'confirm' : id}`;
    setFieldState(fieldId, id, 'valid');
  }

  // Live password strength
  if (id === 'password') {
    updateStrengthMeter($(this).val());
  }

  // Re-validate confirm when password changes
  if (id === 'password' && $('#confirmPw').val()) {
    validateField('confirmPw');
  }
});

/* ── Terms checkbox ── */
// Event Handling: .on('change')
$('#terms').on('change', function () {
  if ($(this).is(':checked')) {
    $('#field-terms').removeClass('error');            // CSS Manipulation
    $('#err-terms').hide();                           // DOM Manipulation
  }
});

/* ── Password visibility toggle ── */
// Event Handling: .on('click')
$('#togglePw').on('click', function () {
  const $pw   = $('#password');
  const isHid = $pw.attr('type') === 'password';

  // DOM Manipulation: toggle input type
  $pw.attr('type', isHid ? 'text' : 'password');
  $(this).text(isHid ? '🙈' : '👁');                  // DOM Manipulation
});

/* ── Next Button (Step 1 → Step 2) ── */
// Event Handling: .on('click')
$('#nextBtn').on('click', function () {
  if (validateStep1()) {
    goToStep2();
  }
});

/* ── Back Button ── */
// Event Handling: .on('click')
$('#backBtn').on('click', function () {
  goToStep1();
});

/* ── Submit Button (Step 2) ── */
// Event Handling: .on('click')
$('#submitBtn').on('click', function () {
  if (validateStep2()) {
    showSuccess();
  }
});

/* ── Reset Button ── */
// Event Handling: .on('click')
$('#resetBtn').on('click', function () {
  // DOM Manipulation: reset all fields
  $('input[type="text"], input[type="email"], input[type="tel"], input[type="password"]').val('');
  $('#terms').prop('checked', false);

  // CSS Manipulation: clear all validation states
  $('.field').removeClass('valid error');
  $('.error-msg').hide();
  $('.status-icon').text('');
  $('#strengthWrap').removeClass('visible');
  $('#strengthFill').css({ width: '0%' });
  $('.step-line').removeClass('filled');
  $('.step').removeClass('active done');
  $('#step-indicator-1').addClass('active');

  // DOM Manipulation: hide success, show step 1
  $('#successScreen').fadeOut(200, function () {       // Effects
    $('#step1').slideDown(280);                        // Effects
  });
});

/* ── Enter key support ── */
// Event Handling: .on('keydown')
$(document).on('keydown', function (e) {
  if (e.key === 'Enter') {
    if ($('#step1').is(':visible'))  $('#nextBtn').trigger('click');
    if ($('#step2').is(':visible'))  $('#submitBtn').trigger('click');
  }
});
