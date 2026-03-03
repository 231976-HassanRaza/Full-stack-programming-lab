/* ============================================================
   Task 5 - Chained Style Editor | script.js
   jQuery Features: CSS Manipulation, Chaining, Event Handling
   ============================================================ */

/* ── State ── */
const state = {
  fontSize:      20,
  color:         '#1a1a2e',
  bg:            'transparent',
  bold:          false,
  italic:        false,
  underline:     false,
  strike:        false,
  upper:         false,
  shadow:        false,
  align:         'left',
  spacing:       0
};

/* ══════════════════════════════════════════
   CHAIN LOG
══════════════════════════════════════════ */

function buildChainCode(changes) {
  const lines = ['<span class="kw">$</span>(<span class="str">"#previewText"</span>)'];
  changes.forEach(c => {
    lines.push('  <span class="chain-symbol">.</span><span class="fn">' + c + '</span>');
  });
  return lines.join('\n');
}

function addLogEntry(chainParts) {
  const $entries = $('#chainEntries');
  $('.log-empty').remove();

  const time = new Date().toLocaleTimeString('en-US', { hour12: false });
  const code = buildChainCode(chainParts);

  const $entry = $(`
    <div class="log-entry">
      <div class="log-time">${time}</div>
      <div class="log-code">${code}</div>
    </div>
  `);

  // DOM Manipulation: prepend new entry
  $entries.prepend($entry);

  // Keep max 8 entries
  $entries.find('.log-entry:gt(7)').remove();
}

/* ══════════════════════════════════════════
   APPLY STYLES VIA CHAINING
   Core feature: jQuery CSS Manipulation + Chaining
══════════════════════════════════════════ */

function applyAllStyles(logChanges) {
  const $text = $('#previewText');

  // Build text-decoration value
  const decorations = [];
  if (state.underline) decorations.push('underline');
  if (state.strike)    decorations.push('line-through');
  const textDeco = decorations.length ? decorations.join(' ') : 'none';

  // Build text-shadow value
  const shadow = state.shadow
    ? '3px 3px 8px rgba(0,0,0,.25), -1px -1px 4px rgba(0,0,0,.1)'
    : 'none';

  /*
   * ── jQuery CHAINING ──────────────────────────────────────
   * All CSS properties applied in a SINGLE chain on $text.
   * Each .css() call returns the same jQuery object,
   * enabling the next method to chain without re-selecting.
   */
  $text
    .css('font-size',       state.fontSize + 'px')          // CSS Manipulation
    .css('color',           state.color)                     // CSS Manipulation
    .css('background-color', state.bg)                       // CSS Manipulation
    .css('font-weight',     state.bold ? '800' : '400')      // CSS Manipulation
    .css('font-style',      state.italic ? 'italic' : 'normal') // CSS Manipulation
    .css('text-decoration', textDeco)                        // CSS Manipulation
    .css('text-transform',  state.upper ? 'uppercase' : 'none')  // CSS Manipulation
    .css('text-shadow',     shadow)                          // CSS Manipulation
    .css('text-align',      state.align)                     // CSS Manipulation
    .css('letter-spacing',  state.spacing + 'px')            // CSS Manipulation
    .css('padding',         state.bg !== 'transparent' ? '12px 16px' : '8px 12px') // CSS Manipulation
    .css('border-radius',   state.bg !== 'transparent' ? '10px' : '8px'); // CSS Manipulation

  if (logChanges) {
    const chain = [
      `css(<span class="str">"font-size"</span>, <span class="str">"${state.fontSize}px"</span>)`,
      `css(<span class="str">"color"</span>, <span class="str">"${state.color}"</span>)`,
      `css(<span class="str">"background-color"</span>, <span class="str">"${state.bg}"</span>)`,
      `css(<span class="str">"font-weight"</span>, <span class="str">"${state.bold ? '800' : '400'}"</span>)`,
      `css(<span class="str">"font-style"</span>, <span class="str">"${state.italic ? 'italic' : 'normal'}"</span>)`,
      `css(<span class="str">"text-decoration"</span>, <span class="str">"${textDeco}"</span>)`,
      `css(<span class="str">"text-transform"</span>, <span class="str">"${state.upper ? 'uppercase' : 'none'}"</span>)`,
      `css(<span class="str">"text-align"</span>, <span class="str">"${state.align}"</span>)`,
      `css(<span class="str">"letter-spacing"</span>, <span class="str">"${state.spacing}px"</span>)`
    ];
    addLogEntry(chain);
  }
}

/* ══════════════════════════════════════════
   UPDATE STATUS TAGS
══════════════════════════════════════════ */

function updateStatusTags() {
  // DOM Manipulation: update active style tags
  $('#csSize').text(state.fontSize + 'px');

  $('#csColor')
    .css({ background: state.color, color: '#fff', 'border-color': state.color }) // CSS Manipulation
    .text(state.color);

  if (state.bg !== 'transparent') {
    $('#csBg').css({ background: state.bg, color: '#374151', 'border-color': '#d1d5db' }) // CSS Manipulation
      .text('BG').show();
  } else {
    $('#csBg').hide();
  }

  const active = [];
  if (state.bold)      active.push('Bold');
  if (state.italic)    active.push('Italic');
  if (state.underline) active.push('Underline');
  if (state.strike)    active.push('Strike');
  if (state.upper)     active.push('CAPS');
  if (state.shadow)    active.push('Shadow');

  // DOM Manipulation: update styles summary tag
  if (active.length) {
    $('#csStyles').text(active.join(' · ')).show();
  } else {
    $('#csStyles').text('').hide();
  }
}

/* ══════════════════════════════════════════
   UPDATE SLIDER TRACK FILL
══════════════════════════════════════════ */

function updateSliderFill() {
  const min = -2, max = 12, val = parseFloat(state.spacing);
  const pct = ((val - min) / (max - min)) * 100;
  // CSS Manipulation: update slider gradient
  $('#spacingSlider').css('background',
    `linear-gradient(90deg, #7c3aed ${pct}%, #e4e4e7 ${pct}%)`
  );
}

/* ══════════════════════════════════════════
   EVENTS: FONT SIZE BUTTONS
══════════════════════════════════════════ */

// Event Handling: click on size buttons
$('.btn-group').on('click', '.size-btn', function () {
  state.fontSize = parseInt($(this).data('size'));

  // CSS Manipulation: toggle active class
  $('.size-btn').removeClass('active');       // CSS Manipulation
  $(this).addClass('active');                // CSS Manipulation

  // Single-property chain log entry
  const chainPart = [`css(<span class="str">"font-size"</span>, <span class="str">"${state.fontSize}px"</span>)`];
  $('#previewText').css('font-size', state.fontSize + 'px'); // CSS Manipulation + Chaining
  addLogEntry(chainPart);
  updateStatusTags();
});

/* ══════════════════════════════════════════
   EVENTS: TEXT COLOR SWATCHES
══════════════════════════════════════════ */

// Event Handling: click on color swatch
$('#colorSwatches').on('click', '.swatch', function () {
  state.color = $(this).data('color');
  $('#colorSwatches .swatch').removeClass('active'); // CSS Manipulation
  $(this).addClass('active');                        // CSS Manipulation
  $('#customColor').val(state.color);
  $('#colorHex').text(state.color);
  // Chaining: set color and log
  $('#previewText').css('color', state.color);       // CSS Manipulation
  addLogEntry([`css(<span class="str">"color"</span>, <span class="str">"${state.color}"</span>)`]);
  updateStatusTags();
});

// Event Handling: custom color picker change
$('#customColor').on('input', function () {          // Event Handling
  state.color = $(this).val();
  $('#colorSwatches .swatch').removeClass('active'); // CSS Manipulation
  $('#colorHex').text(state.color);                  // DOM Manipulation
  $('#previewText').css('color', state.color);       // CSS Manipulation
  updateStatusTags();
});

/* ══════════════════════════════════════════
   EVENTS: BACKGROUND COLOR SWATCHES
══════════════════════════════════════════ */

// Event Handling: background swatch click
$('#bgSwatches').on('click', '.swatch', function () {
  state.bg = $(this).data('bg');
  $('#bgSwatches .swatch').removeClass('active');   // CSS Manipulation
  $(this).addClass('active');                       // CSS Manipulation
  // Chaining: apply bg and padding together
  $('#previewText')
    .css('background-color', state.bg)              // CSS Manipulation
    .css('padding', state.bg !== 'transparent' ? '12px 16px' : '8px 12px') // CSS Manipulation
    .css('border-radius', state.bg !== 'transparent' ? '10px' : '8px');    // CSS Manipulation
  addLogEntry([
    `css(<span class="str">"background-color"</span>, <span class="str">"${state.bg}"</span>)`,
    `css(<span class="str">"padding"</span>, <span class="str">"${state.bg !== 'transparent' ? '12px 16px' : '8px 12px'}"</span>)`
  ]);
  updateStatusTags();
});

/* ══════════════════════════════════════════
   EVENTS: STYLE TOGGLE BUTTONS
══════════════════════════════════════════ */

// Event Handling: toggle button clicks
$('.toggle-grid').on('click', '.toggle-btn', function () {
  const style = $(this).data('style');
  state[style] = !state[style];

  // CSS Manipulation: toggle active state
  $(this).toggleClass('active', state[style]);      // CSS Manipulation

  const decorations = [];
  if (state.underline) decorations.push('underline');
  if (state.strike)    decorations.push('line-through');

  // Chaining: apply all style-related props together
  const $text = $('#previewText');
  let chainParts = [];

  if (style === 'bold') {
    $text.css('font-weight', state.bold ? '800' : '400'); // CSS Manipulation
    chainParts.push(`css(<span class="str">"font-weight"</span>, <span class="str">"${state.bold ? '800' : '400'}"</span>)`);
  }
  if (style === 'italic') {
    $text.css('font-style', state.italic ? 'italic' : 'normal'); // CSS Manipulation
    chainParts.push(`css(<span class="str">"font-style"</span>, <span class="str">"${state.italic ? 'italic' : 'normal'}"</span>)`);
  }
  if (style === 'underline' || style === 'strike') {
    const deco = decorations.length ? decorations.join(' ') : 'none';
    $text.css('text-decoration', deco);             // CSS Manipulation
    chainParts.push(`css(<span class="str">"text-decoration"</span>, <span class="str">"${deco}"</span>)`);
  }
  if (style === 'upper') {
    $text.css('text-transform', state.upper ? 'uppercase' : 'none'); // CSS Manipulation
    chainParts.push(`css(<span class="str">"text-transform"</span>, <span class="str">"${state.upper ? 'uppercase' : 'none'}"</span>)`);
  }
  if (style === 'shadow') {
    const sh = state.shadow ? '3px 3px 8px rgba(0,0,0,.25)' : 'none';
    $text.css('text-shadow', sh);                   // CSS Manipulation
    chainParts.push(`css(<span class="str">"text-shadow"</span>, <span class="str">"${sh}"</span>)`);
  }

  if (chainParts.length) addLogEntry(chainParts);
  updateStatusTags();
});

/* ══════════════════════════════════════════
   EVENTS: ALIGNMENT BUTTONS
══════════════════════════════════════════ */

// Event Handling: alignment click
$('.panels-grid').on('click', '.align-btn', function () {
  state.align = $(this).data('align');
  $('.align-btn').removeClass('active');             // CSS Manipulation
  $(this).addClass('active');                        // CSS Manipulation
  $('#previewText').css('text-align', state.align);  // CSS Manipulation
  addLogEntry([`css(<span class="str">"text-align"</span>, <span class="str">"${state.align}"</span>)`]);
  updateStatusTags();
});

/* ══════════════════════════════════════════
   EVENTS: LETTER SPACING SLIDER
══════════════════════════════════════════ */

// Event Handling: range input change
$('#spacingSlider').on('input', function () {        // Event Handling
  state.spacing = parseFloat($(this).val());
  $('#spacingVal').text(state.spacing + 'px');       // DOM Manipulation
  $('#previewText').css('letter-spacing', state.spacing + 'px'); // CSS Manipulation
  updateSliderFill();
});

/* ══════════════════════════════════════════
   EVENT: APPLY ALL BUTTON — FULL CHAIN
   The signature "Apply All" — one giant jQuery chain
══════════════════════════════════════════ */

// Event Handling: Apply All button
$('#applyAllBtn').on('click', function () {          // Event Handling
  applyAllStyles(true);
  updateStatusTags();

  // Chaining: brief flash animation on preview
  $('#previewText')
    .css('outline', '2px solid #7c3aed')             // CSS Manipulation
    .css('outline-offset', '4px');                   // CSS Manipulation

  setTimeout(() => {
    $('#previewText')
      .css('outline', 'none')                        // CSS Manipulation
      .css('outline-offset', '0');                   // CSS Manipulation
  }, 600);
});

/* ══════════════════════════════════════════
   EVENT: RESET BUTTON
══════════════════════════════════════════ */

// Event Handling: reset click
$('#resetBtn').on('click', function () {             // Event Handling
  // Reset state
  state.fontSize = 20; state.color = '#1a1a2e'; state.bg = 'transparent';
  state.bold = false; state.italic = false; state.underline = false;
  state.strike = false; state.upper = false; state.shadow = false;
  state.align = 'left'; state.spacing = 0;

  // CSS Manipulation: reset all styles via chain
  $('#previewText')
    .css('font-size',       '20px')
    .css('color',           '#1a1a2e')
    .css('background-color', 'transparent')
    .css('font-weight',     '400')
    .css('font-style',      'normal')
    .css('text-decoration', 'none')
    .css('text-transform',  'none')
    .css('text-shadow',     'none')
    .css('text-align',      'left')
    .css('letter-spacing',  '0px')
    .css('padding',         '8px 12px')
    .css('border-radius',   '8px')
    .css('outline',         'none');

  // CSS Manipulation: reset all button active states
  $('.size-btn').removeClass('active');              // CSS Manipulation
  $('.size-btn[data-size="20"]').addClass('active'); // CSS Manipulation
  $('.align-btn').removeClass('active');             // CSS Manipulation
  $('.align-btn[data-align="left"]').addClass('active'); // CSS Manipulation
  $('.toggle-btn').removeClass('active');            // CSS Manipulation
  $('.swatch').removeClass('active');                // CSS Manipulation
  $('#colorSwatches .swatch[data-color="#1a1a2e"]').addClass('active'); // CSS Manipulation
  $('#bgSwatches .swatch[data-bg="transparent"]').addClass('active');   // CSS Manipulation

  // DOM Manipulation: reset slider and hex display
  $('#spacingSlider').val(0);
  $('#spacingVal').text('0px');
  $('#customColor').val('#1a1a2e');
  $('#colorHex').text('#1a1a2e');

  updateSliderFill();
  updateStatusTags();

  addLogEntry([
    '<span class="str">/* Reset all styles */</span>',
    `css(<span class="str">"font-size"</span>, <span class="str">"20px"</span>)`,
    `css(<span class="str">"color"</span>, <span class="str">"#1a1a2e"</span>)`,
    `css(<span class="str">"background-color"</span>, <span class="str">"transparent"</span>)`,
    `css(<span class="str">"font-weight"</span>, <span class="str">"400"</span>)`,
    `... + 6 more resets`
  ]);
});

/* ── Event: Clear Log ── */
$('#clearLogBtn').on('click', function () {          // Event Handling
  // DOM Manipulation: clear entries and show empty message
  $('#chainEntries').empty().append('<p class="log-empty">Apply styles to see the jQuery chain here.</p>');
});

/* ── Init ── */
updateSliderFill();
updateStatusTags();
