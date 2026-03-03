/* ============================================================
   Task 1 – Dynamic List Manager | script.js
   jQuery Features: DOM Manipulation, Event Handling, CSS Manipulation
   ============================================================ */

let totalAdded   = 0;   // total items ever added
let totalRemoved = 0;   // total items ever removed
let itemSeq      = 0;   // incremental item number

/* ── Update Stats Cards & Empty State ── */
function updateStats() {
  const current = $('#itemList .list-item').length;

  $('#totalAdded').text(totalAdded);
  $('#currentCount').text(current);
  $('#totalRemoved').text(totalRemoved);

  if (current === 0) {
    $('#emptyState').fadeIn(200);   // DOM Manipulation: show empty state
    $('#clearBtn').hide();
  } else {
    $('#emptyState').hide();        // DOM Manipulation: hide empty state
    $('#clearBtn').show();
  }
}

/* ── Toast Notification ── */
function showToast(msg) {
  $('#toast').text(msg).addClass('show');           // DOM + CSS Manipulation
  setTimeout(() => $('#toast').removeClass('show'), 2200);
}

/* ── Add Item ── */
function addItem() {
  const val = $('#itemInput').val().trim();         // DOM Manipulation: read input

  // Validation — shake animation via CSS class toggle
  if (!val) {
    $('#itemInput').addClass('shake');              // CSS Manipulation
    setTimeout(() => $('#itemInput').removeClass('shake'), 400);
    showToast('⚠️  Please type something first!');
    return;
  }

  itemSeq++;
  totalAdded++;

  const num     = String(itemSeq).padStart(2, '0');
  const safeVal = $('<div>').text(val).html();      // XSS-safe encoding

  // Build new list item element — DOM Manipulation
  const $li = $(`
    <li class="list-item">
      <div class="item-chip">${num}</div>
      <span class="item-text">${safeVal}</span>
      <button class="delete-btn">✕ Delete</button>
    </li>
  `);

  $('#emptyState').hide();
  $('#itemList').append($li);                       // DOM Manipulation: append
  $('#itemInput').val('').focus();                  // DOM Manipulation: clear & focus
  updateStats();
  showToast('✅  Item added!');
}

/* ── Event: Add Button Click ── */
$('#addBtn').on('click', addItem);                  // Event Handling

/* ── Event: Enter Key in Input ── */
$('#itemInput').on('keydown', function (e) {        // Event Handling
  if (e.key === 'Enter') addItem();
});

/* ── Event: Delete Individual Item ── */
$('#itemList').on('click', '.delete-btn', function () {   // Event Handling (delegated)
  const $item = $(this).closest('.list-item');
  totalRemoved++;

  // Animate out then remove — DOM Manipulation + Effects
  $item.animate({ opacity: 0 }, 180, function () {
    $(this).slideUp(160, function () {
      $(this).remove();                             // DOM Manipulation: remove
      updateStats();
    });
  });

  showToast('🗑️  Item removed!');
});

/* ── Event: Hover Highlight ── */
// CSS Manipulation — add/remove class on hover
$('#itemList').on('mouseenter', '.list-item', function () {
  $(this).addClass('highlighted');                  // CSS Manipulation
}).on('mouseleave', '.list-item', function () {
  $(this).removeClass('highlighted');               // CSS Manipulation
});

/* ── Event: Clear All Button ── */
$('#clearBtn').on('click', function () {            // Event Handling
  const count = $('#itemList .list-item').length;
  totalRemoved += count;

  // Staggered fade + slide removal
  $('#itemList .list-item').each(function (i) {
    const $el = $(this);
    setTimeout(() => {
      $el.animate({ opacity: 0 }, 150, function () {
        $el.slideUp(120, function () {
          $el.remove();                             // DOM Manipulation: remove
          updateStats();
        });
      });
    }, i * 50);
  });

  showToast('🧹  All items cleared!');
});

/* ── Init ── */
updateStats();
