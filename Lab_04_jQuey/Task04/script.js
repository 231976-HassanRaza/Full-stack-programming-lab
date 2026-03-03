/* ============================================================
   Task 4 – Tabbed Content with Smooth Scroll | script.js
   jQuery Features: DOM Manipulation, Effects & Animations, Event Handling
   ============================================================ */

/* ══════════════════════════════════════════
   SMOOTH SCROLL HELPER
══════════════════════════════════════════ */

/**
 * smoothScrollTo — jQuery animated smooth scroll
 * Effects & Animations: $('html, body').animate({ scrollTop })
 * @param {string|jQuery} target  - selector or jQuery object
 * @param {number}        offset  - px offset from top (e.g. for sticky nav)
 * @param {number}        duration
 */
function smoothScrollTo(target, offset = 0, duration = 680) {
  const $target = typeof target === 'string' ? $(target) : target;
  if (!$target.length) return;

  const scrollTop = $target.offset().top - offset;

  // Effects & Animations: jQuery .animate() for smooth scroll
  $('html, body').animate({ scrollTop }, duration, 'swing');  // Effects
}

/* ══════════════════════════════════════════
   INK BAR (sliding pill highlight)
══════════════════════════════════════════ */

/**
 * moveInk — CSS Manipulation: sets left/width on the #tabInk element
 * to slide the highlight behind the active tab button.
 */
function moveInk($btn) {
  const $nav     = $('#tabNav');
  const navLeft  = $nav.offset().left;
  const btnLeft  = $btn.offset().left;
  const btnWidth = $btn.outerWidth();

  // CSS Manipulation: animate ink bar position
  $('#tabInk').css({                                   // CSS Manipulation
    left:  (btnLeft - navLeft + parseInt($nav.css('padding-left'))) + 'px',
    width: btnWidth + 'px'
  });
}

/* ══════════════════════════════════════════
   SWITCH TAB
══════════════════════════════════════════ */

/**
 * switchTab — the core tab-switching function
 * Uses: DOM Manipulation, Effects & Animations, CSS Manipulation
 */
function switchTab($btn) {
  const tabId = $btn.data('tab');               // DOM Manipulation: read data attr

  // ── 1. Update Tab Buttons ──────────────────
  // CSS Manipulation: remove active from all, add to clicked
  $('.tab-btn').removeClass('active');           // CSS Manipulation
  $btn.addClass('active');                       // CSS Manipulation

  // ── 2. Move the ink bar ────────────────────
  moveInk($btn);

  // ── 3. Hide current panel, show new one ───
  // Effects & Animations: fadeOut → fadeIn
  const $currentPanel = $('.tab-panel:visible');
  const $nextPanel    = $(`#panel-${tabId}`);

  if ($currentPanel.attr('id') === $nextPanel.attr('id')) return; // already active

  $currentPanel.fadeOut(200, function () {       // Effects: fadeOut
    $nextPanel.fadeIn(280);                      // Effects: fadeIn (DOM Manipulation: show element)
  });

  // ── 4. Smooth scroll to the tab section ───
  // Effects & Animations: animated scroll
  const stickyNavH = $('#tabNavWrap').outerHeight() + 12;
  smoothScrollTo('#tab-section', stickyNavH - 80, 620);  // Effects

  // ── 5. Update ARIA ─────────────────────────
  // DOM Manipulation: toggle aria-selected
  $('.tab-btn').attr('aria-selected', 'false'); // DOM Manipulation
  $btn.attr('aria-selected', 'true');           // DOM Manipulation
}

/* ══════════════════════════════════════════
   EVENT: TAB BUTTON CLICK
══════════════════════════════════════════ */

// Event Handling: delegated click on .tab-btn inside #tabNav
$('#tabNav').on('click', '.tab-btn', function () {  // Event Handling
  switchTab($(this));
});

/* ══════════════════════════════════════════
   EVENT: HERO SCROLL CTA
══════════════════════════════════════════ */

// Event Handling: click on hero scroll button
$('#heroScrollBtn').on('click', function (e) {      // Event Handling
  e.preventDefault();

  // Effects & Animations: smooth scroll to tab section
  smoothScrollTo('#tab-section', 20, 800);          // Effects
});

/* ══════════════════════════════════════════
   EVENT: KEYBOARD NAVIGATION (←/→ arrows)
══════════════════════════════════════════ */

// Event Handling: keydown on document
$(document).on('keydown', function (e) {            // Event Handling
  const $active = $('.tab-btn.active');
  let $target;

  if (e.key === 'ArrowRight') {
    $target = $active.next('.tab-btn');
  } else if (e.key === 'ArrowLeft') {
    $target = $active.prev('.tab-btn');
  }

  if ($target && $target.length) {
    $target.trigger('click');                       // DOM Manipulation: trigger click
    $target.focus();
  }
});

/* ══════════════════════════════════════════
   BACK TO TOP BUTTON
══════════════════════════════════════════ */

// Event Handling: scroll to show/hide back-to-top
$(window).on('scroll', function () {                // Event Handling
  if ($(this).scrollTop() > 400) {
    // CSS Manipulation + Effects: fadeIn button
    $('#backTop').fadeIn(200).css('display', 'flex'); // Effects
  } else {
    $('#backTop').fadeOut(180);                       // Effects: fadeOut
  }
});

// Event Handling: click back to top
$('#backTop').on('click', function () {             // Event Handling
  smoothScrollTo('#top', 0, 700);                   // Effects
});

/* ══════════════════════════════════════════
   HOVER: INFO CARDS — CSS Manipulation
══════════════════════════════════════════ */

// Event Handling + CSS Manipulation on info cards
$(document).on('mouseenter', '.info-card', function () { // Event Handling
  $(this).css('border-left-width', '4px');         // CSS Manipulation
}).on('mouseleave', '.info-card', function () {
  $(this).css('border-left-width', '1.5px');        // CSS Manipulation
});

/* ══════════════════════════════════════════
   INIT — position the ink bar on load
══════════════════════════════════════════ */

$(document).ready(function () {                     // DOM Manipulation: on ready
  // Small delay to let layout settle before measuring
  setTimeout(() => moveInk($('.tab-btn.active')), 80);

  // Re-position ink on window resize — Event Handling
  $(window).on('resize', function () {              // Event Handling
    moveInk($('.tab-btn.active'));                  // CSS Manipulation
  });
});
