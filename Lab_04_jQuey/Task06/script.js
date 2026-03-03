/* ============================================================
   Task 6 – API Data Fetcher | script.js
   jQuery Features: Ajax, DOM Manipulation, Event Handling
   ============================================================ */

/* ── App State ── */
const state = {
  source:       'posts',
  endpoint:     'https://jsonplaceholder.typicode.com/posts',
  allData:      [],
  filtered:     [],
  shown:        0,
  pageSize:     9,
  lastEndpoint: ''
};

const avatarClasses = ['av-rose','av-amber','av-violet','av-teal','av-blue','av-green','av-pink','av-orange','av-cyan','av-indigo'];
const tagClasses    = ['tag-rose','tag-amber','tag-violet','tag-teal','tag-blue'];
const tagLabels     = ['jQuery','Ajax','API','REST','JSON'];

/* ══════════════════════════════════════════
   SKELETON LOADER
══════════════════════════════════════════ */

function showSkeletons(count) {
  const $grid = $('#skeletonGrid').empty();             // DOM Manipulation: clear
  for (let i = 0; i < count; i++) {
    // DOM Manipulation: build and append skeletons
    $grid.append(
      '<div class="skeleton-card">' +
        '<div class="skel-line short"></div>' +
        '<div class="skel-line wide"></div>' +
        '<div class="skel-line medium"></div>' +
        '<div class="skel-line wide"></div>' +
        '<div class="skel-line short"></div>' +
      '</div>'
    );
  }
  $('#loadingState').fadeIn(200);                       // Effects
  $('#resultsGrid, #errorState, #emptySearch').hide();  // DOM Manipulation
}

function hideSkeletons() {
  $('#loadingState').fadeOut(150);                      // Effects
}

/* ══════════════════════════════════════════
   STATS
══════════════════════════════════════════ */

function updateStats() {
  // DOM Manipulation: update live stat counters
  $('#statShowing').text(state.shown);
  $('#statTotal').text(state.filtered.length);
  $('#statSource').text(state.source.charAt(0).toUpperCase() + state.source.slice(1));
}

function setStatus(msg) {
  $('#statStatus').text(msg);                           // DOM Manipulation
}

/* ══════════════════════════════════════════
   CARD BUILDERS
   DOM Manipulation: construct card HTML
══════════════════════════════════════════ */

function buildPostCard(item, delay) {
  const t1 = tagClasses[item.id % 5];
  const t2 = tagClasses[(item.id + 2) % 5];
  const l1 = tagLabels[item.id % 5];
  const l2 = tagLabels[(item.id + 2) % 5];
  const body = item.body ? item.body.slice(0, 90) + '…' : '';
  return $('<div class="result-card" style="animation-delay:' + delay + 'ms">' +
    '<span class="card-id-badge">#' + item.id + '</span>' +
    '<h3 class="card-title">' + item.title + '</h3>' +
    '<p class="card-body-text">' + body + '</p>' +
    '<div class="card-tags">' +
      '<span class="card-tag ' + t1 + '">' + l1 + '</span>' +
      '<span class="card-tag ' + t2 + '">' + l2 + '</span>' +
    '</div></div>');
}

function buildUserCard(item, delay) {
  const avCls   = avatarClasses[item.id % avatarClasses.length];
  const initials = item.name.split(' ').map(function(w){ return w[0]; }).join('').slice(0,2);
  return $('<div class="result-card" style="animation-delay:' + delay + 'ms">' +
    '<div class="user-avatar ' + avCls + '">' + initials + '</div>' +
    '<div class="user-name">' + item.name + '</div>' +
    '<div class="user-meta">✉️ ' + item.email + '</div>' +
    '<div class="user-meta">🌐 ' + item.website + '</div>' +
    '<div class="user-meta">📍 ' + item.address.city + '</div>' +
    '<div class="user-company">🏢 ' + item.company.name + '</div>' +
    '</div>');
}

function buildTodoCard(item, delay) {
  const done   = item.completed;
  const sCls   = done ? 'done'      : 'pending';
  const sTxt   = done ? '✓ Completed' : '⏳ Pending';
  const tCls   = done ? 'todo-title-text completed' : 'todo-title-text';
  return $('<div class="result-card" style="animation-delay:' + delay + 'ms">' +
    '<span class="todo-status ' + sCls + '">' + sTxt + '</span>' +
    '<p class="' + tCls + '">' + item.title + '</p>' +
    '<div class="todo-user">User #' + item.userId + '</div>' +
    '</div>');
}

function buildPhotoCard(item, delay) {
  const title = item.title.length > 70 ? item.title.slice(0,70) + '…' : item.title;
  return $('<div class="result-card" style="animation-delay:' + delay + 'ms">' +
    '<img class="photo-thumb" src="' + item.thumbnailUrl + '" alt="' + item.title + '" loading="lazy"/>' +
    '<span class="card-id-badge">#' + item.id + '</span>' +
    '<p class="photo-title">' + title + '</p>' +
    '</div>');
}

function buildCard(item, delay) {
  switch (state.source) {
    case 'users':  return buildUserCard(item, delay);
    case 'todos':  return buildTodoCard(item, delay);
    case 'photos': return buildPhotoCard(item, delay);
    default:       return buildPostCard(item, delay);
  }
}

/* ══════════════════════════════════════════
   RENDER CARDS
   DOM Manipulation: append cards to grid
══════════════════════════════════════════ */

function renderCards(items, append) {
  const $grid = $('#resultsGrid');

  if (!append) {
    $grid.empty();                                    // DOM Manipulation: clear grid
    state.shown = 0;
  }

  if (!items || items.length === 0) {
    $('#emptySearch').fadeIn(200);                    // Effects
    updateStats();
    return;
  }

  $('#emptySearch').hide();                           // DOM Manipulation

  const batch = items.slice(state.shown, state.shown + state.pageSize);

  $.each(batch, function(i, item) {                  // jQuery .each() iteration
    const $card = buildCard(item, i * 45);
    $grid.append($card);                             // DOM Manipulation: append card
  });

  state.shown += batch.length;

  // Show / hide Load More button
  if (state.shown < items.length) {
    const remaining = items.length - state.shown;
    $('#loadMoreCount').text('+' + remaining);        // DOM Manipulation
    $('#loadMoreBtn').fadeIn(200);                    // Effects
  } else {
    $('#loadMoreBtn').fadeOut(150);                   // Effects
  }

  updateStats();
}

/* ══════════════════════════════════════════
   FETCH DATA — jQuery $.ajax
   Core Ajax feature
══════════════════════════════════════════ */

function fetchData() {
  // Avoid duplicate fetch for same endpoint
  if (state.endpoint === state.lastEndpoint && state.allData.length > 0) {
    state.shown = 0;
    renderCards(state.filtered, false);
    return;
  }

  showSkeletons(6);
  setStatus('Loading…');

  // Disable fetch button while loading
  $('#fetchBtn').prop('disabled', true);              // DOM Manipulation

  /*
   * ── jQuery $.ajax ────────────────────────────────────────
   * Performs an async HTTP GET to the selected API endpoint.
   * All three callbacks use jQuery DOM Manipulation to update the UI.
   */
  $.ajax({                                            // Ajax: core call
    url:      state.endpoint,
    method:   'GET',
    dataType: 'json',

    /* Ajax: beforeSend — runs before request fires */
    beforeSend: function() {
      setStatus('Fetching…');                         // DOM Manipulation
    },

    /* Ajax: success — data received */
    success: function(data) {
      state.allData      = data;
      state.filtered     = data;
      state.shown        = 0;
      state.lastEndpoint = state.endpoint;

      hideSkeletons();
      setStatus('✓ Loaded');                          // DOM Manipulation

      // Effects: fade results grid in after populating
      $('#resultsGrid').hide();
      renderCards(state.filtered, false);
      $('#resultsGrid').fadeIn(320);                  // Effects

      // DOM Manipulation: update button label
      $('#fetchBtnText').text('↺ Refresh');
      $('#fetchBtn').prop('disabled', false);         // DOM Manipulation

      // Reset search input
      $('#searchInput').val('');                      // DOM Manipulation
      $('#clearSearch').hide();                       // DOM Manipulation
    },

    /* Ajax: error — request failed */
    error: function(xhr, status, err) {
      hideSkeletons();
      setStatus('Error');

      // DOM Manipulation: show error box with message
      $('#errorMsg').text('Error ' + xhr.status + ': ' + (err || 'Request failed'));
      $('#errorState').fadeIn(200);                   // Effects
      $('#fetchBtn').prop('disabled', false);         // DOM Manipulation
    }
  });
}

/* ══════════════════════════════════════════
   FILTER / SEARCH
   DOM Manipulation: filter and re-render
══════════════════════════════════════════ */

function filterData(query) {
  if (!query.trim()) {
    state.filtered = state.allData;
  } else {
    var q = query.toLowerCase();
    state.filtered = $.grep(state.allData, function(item) {  // jQuery $.grep filter
      return JSON.stringify(item).toLowerCase().indexOf(q) !== -1;
    });
  }
  state.shown = 0;
  renderCards(state.filtered, false);
}

/* ══════════════════════════════════════════
   EVENT: SOURCE TABS
   Event Handling: switch data source
══════════════════════════════════════════ */

$('#sourceTabs').on('click', '.source-tab', function() {   // Event Handling
  var $tab = $(this);

  // CSS Manipulation: update active tab
  $('.source-tab').removeClass('active');                   // CSS Manipulation
  $tab.addClass('active');                                  // CSS Manipulation

  state.source   = $tab.data('source');
  state.endpoint = $tab.data('endpoint');
  state.allData  = [];
  state.filtered = [];
  state.shown    = 0;

  // DOM Manipulation: reset UI for new source
  var label = state.source.charAt(0).toUpperCase() + state.source.slice(1);
  $('#fetchBtnText').text('⚡ Fetch ' + label);             // DOM Manipulation
  $('#resultsGrid').empty();                                // DOM Manipulation
  $('#loadMoreBtn').hide();                                 // DOM Manipulation
  $('#searchInput').val('');                                // DOM Manipulation
  $('#clearSearch').hide();                                 // DOM Manipulation
  $('#errorState').hide();                                  // DOM Manipulation
  $('#emptySearch').hide();                                 // DOM Manipulation
  setStatus('Ready');
  updateStats();
});

/* ══════════════════════════════════════════
   EVENT: FETCH BUTTON
   Event Handling: trigger Ajax fetch
══════════════════════════════════════════ */

$('#fetchBtn').on('click', function() {                     // Event Handling
  fetchData();
});

/* ══════════════════════════════════════════
   EVENT: LOAD MORE BUTTON
   Event Handling: paginate results
══════════════════════════════════════════ */

$('#loadMoreBtn').on('click', function() {                  // Event Handling
  renderCards(state.filtered, true);                       // DOM Manipulation: append more
});

/* ══════════════════════════════════════════
   EVENT: RETRY BUTTON
   Event Handling: retry failed fetch
══════════════════════════════════════════ */

$('#retryBtn').on('click', function() {                     // Event Handling
  $('#errorState').fadeOut(150, function() {                // Effects
    state.lastEndpoint = '';
    fetchData();
  });
});

/* ══════════════════════════════════════════
   EVENT: SEARCH INPUT — live filter
   Event Handling: input + clear
══════════════════════════════════════════ */

$('#searchInput').on('input', function() {                  // Event Handling
  var val = $(this).val();
  // DOM Manipulation: show/hide clear button
  if (val.length > 0) {
    $('#clearSearch').show();                               // DOM Manipulation
  } else {
    $('#clearSearch').hide();                               // DOM Manipulation
  }
  if (state.allData.length === 0) return;
  filterData(val);
});

$('#clearSearch').on('click', function() {                  // Event Handling
  $('#searchInput').val('').trigger('input');               // DOM Manipulation + trigger Event
  $(this).hide();                                           // DOM Manipulation
  $('#searchInput').focus();
});

// Event Handling: Escape key clears search
$(document).on('keydown', function(e) {                    // Event Handling
  if (e.key === 'Escape' && $('#searchInput').val()) {
    $('#searchInput').val('').trigger('input');
  }
});

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */

$(document).ready(function() {                             // DOM Manipulation: on ready
  updateStats();
  fetchData(); // Auto-fetch on load
});
