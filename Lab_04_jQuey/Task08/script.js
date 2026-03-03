// Lab Task 8 — Quiz Game
// jQuery Features: DOM Manipulation, Event Handling, Effects & Animations, CSS Manipulation

$(document).ready(function () {

  // ── Question bank ────────────────────────────────────────────
  var questions = [
    {
      q: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"],
      answer: 0
    },
    {
      q: "Which jQuery method hides an element with a sliding effect?",
      options: [".hide()", ".fadeOut()", ".slideUp()", ".collapse()"],
      answer: 2
    },
    {
      q: "What does CSS stand for?",
      options: ["Computer Style Sheets", "Creative Style Syntax", "Cascading Style Sheets", "Colorful Style Sheets"],
      answer: 2
    },
    {
      q: "Which symbol is used to select an element by ID in jQuery?",
      options: [".", "#", "*", "@"],
      answer: 1
    },
    {
      q: "What is the correct jQuery syntax to hide all <p> elements?",
      options: ['$("p").hide()', 'p.hide()', '$("#p").hide()', '$(".p").hide()'],
      answer: 0
    },
    {
      q: "Which HTML tag is used to link an external JavaScript file?",
      options: ["<js>", "<javascript>", "<script>", "<link>"],
      answer: 2
    },
    {
      q: "Which jQuery event fires when the DOM is fully loaded?",
      options: ["$(window).load()", "$(document).ready()", "$(body).onload()", "$.init()"],
      answer: 1
    },
    {
      q: "What does AJAX stand for?",
      options: ["Asynchronous JavaScript and XML", "Active JavaScript and XML", "Automated Java API Exchange", "Async JSON and XHTML"],
      answer: 0
    },
    {
      q: "Which CSS property controls the text size?",
      options: ["text-style", "font-size", "text-size", "font-style"],
      answer: 1
    },
    {
      q: "Which jQuery method is used to attach multiple event handlers to one element?",
      options: [".bind()", ".live()", ".on()", ".attach()"],
      answer: 2
    }
  ];

  var keys = ['A', 'B', 'C', 'D'];

  // ── State ────────────────────────────────────────────────────
  var currentQ  = 0;
  var score     = 0;
  var answered  = false;
  var userAnswers = []; // {correct: bool, q: string}

  // ── Cache elements ───────────────────────────────────────────
  var $start    = $('#screen-start');
  var $quiz     = $('#screen-quiz');
  var $result   = $('#screen-result');
  var $qCounter = $('#q-counter');
  var $progFill = $('#progress-fill');
  var $liveScore= $('#live-score');
  var $qText    = $('#q-text');
  var $optList  = $('#options-list');
  var $btnNext  = $('#btn-next');

  // ── Screen switcher ──────────────────────────────────────────
  function showScreen($target) {
    $('.screen').addClass('hidden');
    $target.removeClass('hidden');
    $target.css({ opacity: 0, transform: 'translateY(20px)' })
      .animate({ opacity: 1 }, 350);
    $target.css('transform', 'translateY(0)');
  }

  // ── Render a question ────────────────────────────────────────
  function renderQuestion() {
    answered = false;
    var data = questions[currentQ];

    // Update top bar
    $qCounter.text('Q ' + (currentQ + 1) + ' / ' + questions.length);
    var pct = (currentQ / questions.length) * 100;
    $progFill.css('width', pct + '%');

    // Fade out card, update, fade in
    $('#question-card').fadeOut(180, function () {
      $qText.text(data.q);
      $(this).fadeIn(220);
    });

    // Build option buttons
    $optList.empty();
    $.each(data.options, function (i, opt) {
      var $li = $('<li>');
      var $btn = $('<button class="option-btn">')
        .attr('data-idx', i)
        .html('<span class="option-key">' + keys[i] + '</span>' + opt);
      $li.append($btn);
      $optList.append($li);
    });

    $btnNext.addClass('hidden');
  }

  // ── Handle answer selection ──────────────────────────────────
  $optList.on('click', '.option-btn', function () {
    if (answered) return;
    answered = true;

    var selected = parseInt($(this).data('idx'));
    var correct  = questions[currentQ].answer;
    var isRight  = selected === correct;

    if (isRight) {
      score++;
      $liveScore.text(score);
      $(this).addClass('correct');
      // Small pop animation on score
      $liveScore.css({ color: '#3ddc84' });
      setTimeout(function () { $liveScore.css({ color: '' }); }, 600);
    } else {
      $(this).addClass('wrong shake');
      // Also reveal the correct answer
      $optList.find('.option-btn').eq(correct).addClass('correct');
    }

    userAnswers.push({ correct: isRight, q: questions[currentQ].q });

    // Disable all buttons
    $optList.find('.option-btn').prop('disabled', true);

    $btnNext.removeClass('hidden');
  });

  // ── Next button ──────────────────────────────────────────────
  $btnNext.on('click', function () {
    currentQ++;
    if (currentQ < questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  });

  // ── Show results ─────────────────────────────────────────────
  function showResult() {
    // Final progress fill
    $progFill.css('width', '100%');
    showScreen($result);

    // Animate ring
    var pct = score / questions.length;
    var circumference = 314;
    var offset = circumference - (pct * circumference);
    setTimeout(function () {
      $('#ring-fill').css('stroke-dashoffset', offset);
      // Animate number counter
      $({ n: 0 }).animate({ n: score }, {
        duration: 1000,
        step: function () { $('#ring-num').text(Math.round(this.n)); },
        complete: function () { $('#ring-num').text(score); }
      });
    }, 200);

    // Result message
    var msg;
    if (score === 10)      msg = "PERFECT!\nGenius detected!";
    else if (score >= 8)   msg = "EXCELLENT!\nAlmost flawless!";
    else if (score >= 6)   msg = "GOOD JOB!\nKeep learning!";
    else if (score >= 4)   msg = "NOT BAD!\nReview &amp; retry!";
    else                   msg = "KEEP TRYING!\nYou got this!";
    $('#result-msg').html(msg.replace('\n', '<br>'));

    // Color ring by score
    if (score >= 8)      $('#ring-fill').css('stroke', '#3ddc84');
    else if (score >= 5) $('#ring-fill').css('stroke', '#f7c948');
    else                 $('#ring-fill').css('stroke', '#ff4d6d');

    // Build breakdown
    var $bd = $('#result-breakdown').empty();
    $.each(userAnswers, function (i, ans) {
      var icon = ans.correct ? '✅' : '❌';
      var cls  = ans.correct ? 'correct-row' : 'wrong-row';
      var $row = $(
        '<div class="breakdown-row ' + cls + '">' +
          '<span class="breakdown-icon">' + icon + '</span>' +
          '<span class="breakdown-q">Q' + (i+1) + ': ' + ans.q + '</span>' +
        '</div>'
      );
      $bd.append($row);
    });
  }

  // ── Start button ─────────────────────────────────────────────
  $('#btn-start').on('click', function () {
    currentQ   = 0;
    score      = 0;
    answered   = false;
    userAnswers = [];
    $liveScore.text('0');
    renderQuestion();
    showScreen($quiz);
  });

  // ── Play again ───────────────────────────────────────────────
  $('#btn-restart').on('click', function () {
    currentQ   = 0;
    score      = 0;
    answered   = false;
    userAnswers = [];
    $liveScore.text('0');
    $progFill.css('width', '0%');
    $('#ring-fill').css({ 'stroke-dashoffset': '314', stroke: 'var(--accent)' });
    $('#ring-num').text('0');
    renderQuestion();
    showScreen($quiz);
  });

});