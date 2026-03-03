$(function () {
  const TAG_COLORS = [
    { bg:'rgba(108,99,255,0.2)',  border:'rgba(108,99,255,0.4)', text:'#a78bfa', label:'Design' },
    { bg:'rgba(67,233,123,0.15)', border:'rgba(67,233,123,0.35)',text:'#43e97b', label:'Dev'    },
    { bg:'rgba(255,101,132,0.15)',border:'rgba(255,101,132,0.35)',text:'#ff6584',label:'QA'     },
    { bg:'rgba(56,189,248,0.15)', border:'rgba(56,189,248,0.35)', text:'#38bdf8', label:'PM'   },
    { bg:'rgba(251,191,36,0.15)', border:'rgba(251,191,36,0.35)', text:'#fbbf24', label:'UX'   },
  ];
  
  const DEFAULT_ITEMS = [
    { label:'Design System Setup',  sub:'Components & tokens',   tagIdx:0 },
    { label:'API Integration',      sub:'REST endpoints & auth', tagIdx:1 },
    { label:'Unit Test Coverage',   sub:'Jest · 90% target',     tagIdx:2 },
    { label:'Sprint Planning',      sub:'Backlog grooming',      tagIdx:3 },
    { label:'User Research',        sub:'Interview synthesis',   tagIdx:4 },
    { label:'Database Schema',      sub:'Migrations & indexes',  tagIdx:1 },
  ];

  let items = JSON.parse(JSON.stringify(DEFAULT_ITEMS));
  let logCount = 0;

  function esc(str){ return $('<div>').text(str).html(); }

  function renderList() {
    const $ul = $('#sortable').empty();
    items.forEach(function(item, i){
      const t = TAG_COLORS[item.tagIdx];
      $ul.append(`
        <li class="sort-item" data-index="${i}">
          <span class="handle"><span></span><span></span><span></span></span>
          <span class="item-number">${i+1}</span>
          <span class="item-content">
            <div class="item-label">${esc(item.label)}</div>
            <div class="item-sub">${esc(item.sub)}</div>
          </span>
          <span class="item-tag" style="background:${t.bg};border:1px solid ${t.border};color:${t.text}">${t.label}</span>
          <button class="btn-sm remove-btn" title="Remove">&#10005;</button>
        </li>
      `);
    });
    updateOrderChips();
  }

  function updateOrderChips() {
    const $c = $('#current-order').empty();
    $('#sortable .sort-item').each(function(i){
      const lbl = $(this).find('.item-label').text().split(' ')[0];
      $c.append(`<span class="order-chip">${i+1}. ${lbl}</span>`);
    });
  }

  function addLog(msg) {
    const $log = $('#order-log');
    if (logCount===0) $log.empty();
    logCount++;
    const t = new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'});
    $log.prepend(`<li class="log-entry"><span class="log-dot"></span><span>${msg}</span><span style="margin-left:auto;opacity:.45;font-size:10px">${t}</span></li>`);
    if ($log.children().length > 8) $log.children().last().remove();
  }

  function initSortable() {
    $('#sortable').sortable({
      handle: '.handle',
      placeholder: 'ui-sortable-placeholder',
      axis: 'y',
      revert: 120,
      start: function(e, ui){ ui.item.find('.item-label').css('color','#a78bfa'); },
      stop: function(e, ui){
        ui.item.find('.item-label').css('color','');
        const newItems = [];
        $('#sortable .sort-item').each(function(){
          newItems.push(items[$(this).data('index')]);
        });
        items = newItems;
        renderList();
        addLog('Reordered → ' + items.map(function(it,i){ return (i+1)+'. '+it.label.split(' ')[0]; }).join(' · '));
      }
    });
  }

  $(document).on('click','.remove-btn', function(){
    const $li = $(this).closest('.sort-item');
    const idx = $li.index();
    const removed = items[idx].label;
    $li.css({transition:'opacity .25s, transform .25s', opacity:0, transform:'translateX(30px)'});
    setTimeout(function(){
      items.splice(idx,1);
      renderList();
      initSortable();
      addLog('Removed: "' + removed + '"');
    }, 260);
  });

  $('#add-btn').on('click', addItem);
  $('#new-item-input').on('keydown', function(e){ if(e.key==='Enter') addItem(); });

  function addItem(){
    const val = $('#new-item-input').val().trim();
    if(!val){
      $('#new-item-input').css('border-color','#ff6584').focus();
      setTimeout(function(){ $('#new-item-input').css('border-color',''); }, 1000);
      return;
    }
    items.push({ label:val, sub:'Custom item', tagIdx: Math.floor(Math.random()*TAG_COLORS.length) });
    renderList();
    initSortable();
    $('#new-item-input').val('');
    addLog('Added: "' + val + '"');
  }

  $('#reset-btn').on('click', function(){
    items = JSON.parse(JSON.stringify(DEFAULT_ITEMS));
    renderList();
    initSortable();
    addLog('List reset to default order');
  });

  renderList();
  initSortable();
});