/* ============================================================
   Task 2 – Animated Image Gallery | script.js
   jQuery Features: Effects & Animations, DOM Manipulation, Chaining
   ============================================================ */

/* ── Gallery Data ── */
const slides = [
  {
    img:     'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80',
    title:   'Majestic Mountains',
    desc:    'Snow-capped peaks piercing through morning clouds in the Swiss Alps.',
    label:   'Nature',
    tags:    [{ text: 'Nature', cls: 'tag-blue' }, { text: 'Mountains', cls: 'tag-violet' }, { text: 'Alps', cls: 'tag-green' }]
  },
  {
    img:     'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80',
    title:   'Tropical Paradise',
    desc:    'Crystal-clear turquoise waters lapping against white sandy shores.',
    label:   'Beach',
    tags:    [{ text: 'Beach', cls: 'tag-blue' }, { text: 'Ocean', cls: 'tag-pink' }, { text: 'Summer', cls: 'tag-amber' }]
  },
  {
    img:     'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80',
    title:   'Enchanted Forest',
    desc:    'Ancient trees draped in morning mist — a walk through living history.',
    label:   'Forest',
    tags:    [{ text: 'Forest', cls: 'tag-green' }, { text: 'Nature', cls: 'tag-blue' }, { text: 'Mist', cls: 'tag-violet' }]
  },
  {
    img:     'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=900&q=80',
    title:   'Golden Sunset',
    desc:    'The sky ablaze with warm amber and rose as the sun dips below the horizon.',
    label:   'Sunset',
    tags:    [{ text: 'Sunset', cls: 'tag-amber' }, { text: 'Sky', cls: 'tag-rose' }, { text: 'Golden Hour', cls: 'tag-pink' }]
  },
  {
    img:     'https://images.unsplash.com/photo-1473081556163-2a17de81fc97?w=900&q=80',
    title:   'Desert Dunes',
    desc:    'Rippling sand waves sculpted by the wind across a boundless Saharan expanse.',
    label:   'Desert',
    tags:    [{ text: 'Desert', cls: 'tag-amber' }, { text: 'Sand', cls: 'tag-rose' }, { text: 'Sahara', cls: 'tag-violet' }]
  },
  {
    img:     'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=900&q=80',
    title:   'Waterfall Wonder',
    desc:    'A thundering cascade tumbles down mossy rocks into a crystal-clear pool.',
    label:   'Waterfall',
    tags:    [{ text: 'Waterfall', cls: 'tag-blue' }, { text: 'Water', cls: 'tag-green' }, { text: 'Wildlife', cls: 'tag-violet' }]
  }
];

/* ── State ── */
let current      = 0;
let autoplayTimer = null;
let isPlaying    = false;
const AUTOPLAY_MS = 3500;

/* ── Build Thumbnails & Dots ── */
function buildThumbsAndDots() {
  const $strip = $('#thumbStrip');
  const $dots  = $('#progressDots');

  slides.forEach((slide, i) => {
    // Thumbnail — DOM Manipulation
    const $thumb = $(`
      <div class="thumb${i === 0 ? ' active' : ''}" data-index="${i}">
        <img src="${slide.img}" alt="${slide.title}" loading="lazy"/>
      </div>
    `);
    $strip.append($thumb);

    // Progress dot — DOM Manipulation
    const $dot = $(`<span class="dot${i === 0 ? ' active' : ''}" data-index="${i}"></span>`);
    $dots.append($dot);
  });

  $('#totalSlides').text(slides.length);
}

/* ── Update Caption (with fade chaining) ── */
function updateCaption(slide) {
  // jQuery Chaining: fadeOut → change text → fadeIn in sequence
  $('#captionTitle, #captionDesc')
    .fadeOut(160, function () {
      $('#captionTitle').text(slide.title);
      $('#captionDesc').text(slide.desc);
      $('#captionTitle, #captionDesc').fadeIn(220);
    });

  // Tags — DOM Manipulation
  const $tags = $('#captionTags').empty();
  slide.tags.forEach(t => {
    $tags.append(`<span class="tag ${t.cls}">${t.text}</span>`);
  });

  // Slide label & counter
  $('#slideLabel').text(slide.label);
  $('#currentSlide').text(current + 1);
}

/* ── Update Thumbnails & Dots ── */
function updateThumbsAndDots(index) {
  // CSS Manipulation: toggle active class
  $('.thumb').removeClass('active').eq(index).addClass('active');
  $('.dot').removeClass('active').eq(index).addClass('active');

  // Scroll active thumb into view — DOM Manipulation
  const $activeThumb = $('.thumb').eq(index);
  const strip        = $('#thumbStrip')[0];
  const thumbLeft    = $activeThumb.position().left + strip.scrollLeft;
  const center       = thumbLeft - strip.offsetWidth / 2 + $activeThumb.outerWidth() / 2;
  $('#thumbStrip').animate({ scrollLeft: center }, 300);
}

/* ── Go To Slide ── */
function goTo(index) {
  const $img = $('#galleryImg');

  // jQuery Effects & Chaining: fadeOut → swap src → fadeIn
  $img
    .fadeOut(260, function () {
      current = (index + slides.length) % slides.length;

      // DOM Manipulation: update src
      $(this)
        .attr('src', slides[current].img)
        .attr('alt', slides[current].title)
        .fadeIn(320);                              // Chaining: chain fadeIn after fadeOut callback
    });

  updateCaption(slides[current]);
  updateThumbsAndDots(current);
  resetAutoplayBar();
}

/* ── Init First Slide ── */
function initGallery() {
  buildThumbsAndDots();

  // DOM Manipulation: set initial image
  $('#galleryImg')
    .attr('src', slides[0].img)
    .attr('alt', slides[0].title);

  updateCaption(slides[0]);
}

/* ── Autoplay ── */
function startAutoplay() {
  isPlaying = true;
  $('#autoplayBtn').addClass('playing');
  $('#autoplayText').text('Pause');
  $('#autoplayIcon').text('⏸');
  $('#autoplayBar').addClass('visible');
  runAutoplayBar();

  autoplayTimer = setInterval(() => {
    goTo(current + 1);
  }, AUTOPLAY_MS);
}

function stopAutoplay() {
  isPlaying = false;
  clearInterval(autoplayTimer);
  autoplayTimer = null;
  $('#autoplayBtn').removeClass('playing');
  $('#autoplayText').text('Autoplay');
  $('#autoplayIcon').text('▶');
  $('#autoplayBar').removeClass('visible');
  $('#autoplayFill').css('width', '0%');
}

function runAutoplayBar() {
  // Animate progress bar width — CSS Manipulation via jQuery .animate()
  $('#autoplayFill')
    .css('width', '0%')
    .animate({ width: '100%' }, AUTOPLAY_MS - 100, 'linear');
}

function resetAutoplayBar() {
  if (isPlaying) {
    $('#autoplayFill').stop(true).css('width', '0%');
    runAutoplayBar();
  }
}

/* ── Event: Prev Button ── */
$('#prevBtn').on('click', function () {             // Event Handling
  goTo(current - 1);
});

/* ── Event: Next Button ── */
$('#nextBtn').on('click', function () {             // Event Handling
  goTo(current + 1);
});

/* ── Event: Thumbnail Click ── */
$('#thumbStrip').on('click', '.thumb', function () { // Event Handling (delegated)
  const idx = parseInt($(this).data('index'));
  if (idx !== current) goTo(idx);
});

/* ── Event: Dot Click ── */
$('#progressDots').on('click', '.dot', function () { // Event Handling (delegated)
  const idx = parseInt($(this).data('index'));
  if (idx !== current) goTo(idx);
});

/* ── Event: Autoplay Toggle ── */
$('#autoplayBtn').on('click', function () {         // Event Handling
  isPlaying ? stopAutoplay() : startAutoplay();
});

/* ── Event: Keyboard Navigation ── */
$(document).on('keydown', function (e) {            // Event Handling
  if (e.key === 'ArrowLeft')  goTo(current - 1);
  if (e.key === 'ArrowRight') goTo(current + 1);
  if (e.key === ' ')          isPlaying ? stopAutoplay() : startAutoplay();
});

/* ── Init ── */
initGallery();
