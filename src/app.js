/* ============================================================
   INTERFEJS: router i ekrany
   ============================================================ */
(function () {
  'use strict';
  var U = UA.U, G = UA.G, S = G.S, SRS = UA.SRS, SP = UA.SP;
  var esc = U.esc, st = U.st, strip = U.strip, norm = U.norm, shuffle = U.shuffle;
  var main = document.getElementById('main');
  function $(s, r) { return (r || main).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || main).querySelectorAll(s)); }

  /* ---------- Ikony (obrys 24×24, w stylu Lucide) ---------- */
  var IC = {
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    cards: '<rect x="2" y="6" width="14" height="16" rx="2"/><path d="M8 2h12a2 2 0 0 1 2 2v14"/>',
    ear: '<path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0"/><path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4"/>',
    chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
    abc: '<path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/>',
    alert: '<path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    pen: '<path d="M12 20h9"/><path d="M16.4 3.6a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    gear: '<path d="M12.2 2h-.4a2 2 0 0 0-2 2v.2a2 2 0 0 1-1 1.7l-.4.3a2 2 0 0 1-2 0l-.2-.1a2 2 0 0 0-2.7.7l-.2.4a2 2 0 0 0 .7 2.7l.2.1a2 2 0 0 1 1 1.7v.5a2 2 0 0 1-1 1.7l-.2.1a2 2 0 0 0-.7 2.7l.2.4a2 2 0 0 0 2.7.7l.2-.1a2 2 0 0 1 2 0l.4.3a2 2 0 0 1 1 1.7v.2a2 2 0 0 0 2 2h.4a2 2 0 0 0 2-2v-.2a2 2 0 0 1 1-1.7l.4-.3a2 2 0 0 1 2 0l.2.1a2 2 0 0 0 2.7-.7l.2-.4a2 2 0 0 0-.7-2.7l-.2-.1a2 2 0 0 1-1-1.7v-.5a2 2 0 0 1 1-1.7l.2-.1a2 2 0 0 0 .7-2.7l-.2-.4a2 2 0 0 0-2.7-.7l-.2.1a2 2 0 0 1-2 0l-.4-.3a2 2 0 0 1-1-1.7V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    vol: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/>',
    slow: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/>',
    mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><path d="M12 18v4"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
    play: '<path d="m6 3 14 9-14 9z"/>',
    swap: '<path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3.4.3 1.5 1.5 2.9 2.5 2.9"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.7V17c0 .6-.5 1-1 1.2-1.2.5-2 2-2 3.8"/><path d="M14 14.7V17c0 .6.5 1 1 1.2 1.2.5 2 2 2 3.8"/><path d="M18 2H6v7a6 6 0 0 0 12 0z"/>',
    eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    back: '<path d="m15 18-6-6 6-6"/>',
    next: '<path d="m9 18 6-6-6-6"/>',
    kb: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M7 16h10"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    user: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
    route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
    headphones: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'
  };
  function ic(n, c) { return '<svg class="ic ' + (c || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (IC[n] || '') + '</svg>'; }
  UA.ic = ic;

  var POS = { 'ч': 'rzecz. r. męski', 'ж': 'rzecz. r. żeński', 'с': 'rzecz. r. nijaki', 'мн': 'rzecz. tylko l. mnoga', 'д': 'czasownik', 'п': 'przymiotnik', 'пр': 'przysłówek', 'ф': 'zwrot', 'з': 'słowo funkcyjne' };
  var SIM = { t: ['przezroczyste', 'sim-t'], p: ['podobne z różnicą', 'sim-p'], f: ['fałszywy przyjaciel', 'sim-f'], o: ['zupełnie obce', 'sim-o'] };
  function topicName(id) { for (var i = 0; i < UA.TOPICS.length; i++) if (UA.TOPICS[i].id === id) return UA.TOPICS[i].name; return ''; }
  function say(text, cls) { return '<button type="button" class="say ' + (cls || '') + '" data-say="' + esc(text) + '" aria-label="Odsłuchaj">' + ic('vol') + '</button>'; }
  function sayBoth(text) { return say(text) + '<button type="button" class="say slow" data-say="' + esc(text) + '" data-rate="0.7" aria-label="Odsłuchaj wolno">' + ic('slow') + '<small>0,7</small></button>'; }
  function uaw(text, cls) { return '<span class="ua ' + (cls || '') + '" lang="uk">' + st(text) + '</span>' + (S.settings.translit ? '<span class="tr">' + esc(U.translit(text)) + '</span>' : ''); }
  function days(n) { return n <= 0 ? 'dziś' : n < 30 ? n + ' d' : n < 365 ? (Math.round(n / 3) / 10).toString().replace('.', ',') + ' mies.' : Math.round(n / 365) + ' l.'; }
  function head(title, sub, back) {
    return '<header class="phead">' + (back ? '<a class="backl" href="' + back + '">' + ic('back') + '<span>Wróć</span></a>' : '') + '<h1>' + title + '</h1>' + (sub ? '<p class="lead">' + sub + '</p>' : '') + '</header>';
  }
  function bar(v, max, cls) { return '<div class="bar ' + (cls || '') + '"><i style="width:' + Math.round(100 * Math.min(1, max ? v / max : 0)) + '%"></i></div>'; }

  /* ---------- Nawigacja ---------- */
  var NAV = [
    ['start', 'Start', 'home', 1], ['sciezka', 'Ścieżka', 'route', 1], ['sluchanie', 'Słuchanie', 'headphones', 1], ['wymowa', 'Wymowa', 'ear', 1],
    ['dialogi', 'Dialogi', 'chat'], ['alfabet', 'Alfabet', 'abc'], ['przyjaciele', 'Fałszywi przyjaciele', 'alert'], ['gramatyka', 'Gramatyka', 'book'],
    ['dyktando', 'Dyktando', 'pen'], ['slownik', 'Słownik', 'search'], ['ustawienia', 'Ustawienia', 'gear']
  ];
  function renderNav(cur) {
    document.getElementById('nav').innerHTML = NAV.map(function (n) {
      return '<a href="#/' + n[0] + '" class="' + (cur === n[0] ? 'on' : '') + '">' + ic(n[2]) + '<span>' + n[1] + '</span></a>';
    }).join('');
    var more = NAV.filter(function (n) { return !n[3]; }).some(function (n) { return n[0] === cur; }) || cur === 'wiecej';
    document.getElementById('bnav').innerHTML = NAV.filter(function (n) { return n[3]; }).map(function (n) {
      return '<a href="#/' + n[0] + '" class="' + (cur === n[0] ? 'on' : '') + '">' + ic(n[2]) + '<span>' + n[1] + '</span></a>';
    }).join('') + '<a href="#/wiecej" class="' + (more ? 'on' : '') + '">' + ic('grid') + '<span>Więcej</span></a>';
  }
  function renderStatus() {
    var L = G.level(), x = G.xpToday(), goal = S.settings.goal;
    document.getElementById('status').innerHTML =
      '<a href="#/start" class="lv" title="' + esc(L.pl) + '"><span class="lvn" lang="uk">' + esc(strip(L.name)) + '</span>' + bar(G.S.xp - L.from, L.to - L.from, 'thin') + '</a>' +
      '<span class="pill ' + (G.streak() ? 'hot' : '') + '" title="Seria dni nauki">' + ic('flame') + G.streak() + '</span>' +
      '<span class="pill goal ' + (x >= goal ? 'done' : '') + '" title="Cel dzienny">' + ic('target') + Math.min(x, goal) + '/' + goal + '</span>';
  }
  G.onChange(renderStatus);

  /* ---------- Globalne kliknięcia: odsłuch ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-say]');
    if (b) { e.preventDefault(); b.classList.add('speaking'); SP.speak(b.getAttribute('data-say'), { rate: b.getAttribute('data-rate') ? +b.getAttribute('data-rate') : null, onend: function () { b.classList.remove('speaking'); } }); }
  });

  /* ---------- Router ---------- */
  var V = {};
  var cleanup = null;
  var NAVMAP = { nauka: 'sciezka', trening: 'sciezka', etap: 'sciezka', test: 'sciezka', slowka: 'sciezka', dialog: 'dialogi', lekcja: 'gramatyka', czytanka: 'sluchanie' };
  function route() {
    if (cleanup) { try { cleanup(); } catch (e) { } cleanup = null; }
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    var h = (location.hash || '#/start').slice(2).split('/');
    var name = h[0] || 'start';
    if (!V[name]) name = 'start';
    renderNav(NAVMAP[name] || name);
    renderStatus();
    main.innerHTML = '';
    V[name].apply(null, h.slice(1));
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);

  /* ============================================================
     POZIOMY I ŚCIEŻKA A1 → C2
     ============================================================ */
  var LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  var LEVEL_NAME = { A1: 'początkujący', A2: 'podstawowy', B1: 'średni', B2: 'średnio zaawansowany', C1: 'zaawansowany', C2: 'biegły' };
  S.unlocked = S.unlocked || {};
  S.stats.listen = S.stats.listen || 0;
  S.stats.texts = S.stats.texts || {};
  function unitWords(id) { return UA.WORDS.filter(function (w) { return w.topic === id; }); }
  function seen(w) { var c = SRS.card(w, 'r'); return !!(c && c.n >= 1); }
  function unitProg(u) { var ws = unitWords(u.id); return ws.length ? ws.filter(seen).length / ws.length : 0; }
  function unitById(id) { return UA.TOPICS.filter(function (t) { return t.id === id; })[0]; }
  function unlocked(u) {
    var i = UA.TOPICS.indexOf(u);
    if (i <= 0 || S.unlocked[u.id]) return true;
    var prev = UA.TOPICS[i - 1];
    return unlocked(prev) && unitProg(prev) >= 0.7;
  }
  function currentUnit() {
    for (var i = 0; i < UA.TOPICS.length; i++) { var u = UA.TOPICS[i]; if (unlocked(u) && unitProg(u) < 1) return u; }
    return UA.TOPICS[UA.TOPICS.length - 1];
  }
  function levelUnlocked(lv) { return UA.TOPICS.some(function (t) { return t.level === lv && unlocked(t); }); }
  function levelWords(lv) { return UA.WORDS.filter(function (w) { var t = unitById(w.topic); return t && t.level === lv; }); }
  function ring(p, label) {
    var r = 21, c = 2 * Math.PI * r;
    return '<span class="ring"><svg viewBox="0 0 50 50" aria-hidden="true"><circle cx="25" cy="25" r="' + r + '" class="rbg"/><circle cx="25" cy="25" r="' + r + '" class="rfg" stroke-dasharray="' + c + '" stroke-dashoffset="' + (c * (1 - p)) + '"/></svg><b>' + label + '</b></span>';
  }
  G.BADGES.push(['ucho', 'Слуха́ч', '30 trafnych odpowiedzi w ćwiczeniach ze słuchu', function () { return S.stats.listen >= 30; }]);
  G.BADGES.push(['lvB1', 'Рі́вень B1', 'Odblokowany poziom B1', function () { return levelUnlocked('B1'); }]);
  G.BADGES.push(['lvC1', 'Рі́вень C1', 'Odblokowany poziom C1', function () { return levelUnlocked('C1'); }]);

  /* ============================================================
     START
     ============================================================ */
  V.start = function () {
    var hr = new Date().getHours(), hello = hr < 11 ? 'До́брого ра́нку!' : hr < 18 ? 'До́брий день!' : 'До́брий ве́чір!';
    var L = G.level(), vs = SP.voiceStatus(), cu = currentUnit(), q = buildQueue('all');
    var dueN = q.filter(function (e) { return !e.isNew; }).length, newN = q.length - dueN;
    var r = SRS.mastery('r'), p = SRS.mastery('p');
    var h = '<section class="hero"><div><p class="kicker">Ukraiński dla Polaka · poziom ' + cu.level + '</p><h1 lang="uk">' + st(hello) + '</h1><p class="lead">' +
      (q.length ? 'Na dziś: <b>' + dueN + '</b> powtórek i <b>' + newN + '</b> nowych słów. Aplikacja sama sprawdzi, co już umiesz.' : 'Wszystko na dziś zrobione. Чудо́во! Posłuchaj czytanki albo przećwicz dialog.') + '</p>' +
      '<div class="row"><a class="btn primary" href="#/trening/all">' + ic('play') + (q.length ? 'Ucz się (' + q.length + ')' : 'Trening') + '</a><a class="btn" href="#/sluchanie">' + ic('headphones') + 'Słuchanie</a></div></div>' +
      '<div class="lvcard"><span class="lvbadge">' + ic('star') + '</span><div><b lang="uk">' + st(L.name) + '</b><small>' + esc(L.pl) + ' · ' + S.xp + ' XP</small>' + bar(S.xp - L.from, L.to - L.from) + '<small>' + (L.next ? 'do awansu: ' + (L.to - S.xp) + ' XP' : 'najwyższy stopień') + '</small></div></div></section>';
    if (!vs.ok) h += voiceHelp(vs);
    if (!S.seenIntro2) h += '<section class="card intro"><h2>Co nowego</h2><p><b>Ścieżka A1 → C2</b>: ' + UA.TOPICS.length + ' lekcji, ' + UA.WORDS.length + ' słów. Kolejna lekcja otwiera się, gdy poznasz 70% słów poprzedniej – albo od razu, jeśli zdasz jej test.</p><p><b>Trening bez samooceny</b>: najpierw poznajesz słowo, potem aplikacja sama sprawdza, czy je znasz – tłumaczenie ABCD w obie strony, zdanie z luką, rozpoznawanie ze słuchu, wpisywanie. Wynik sam ustawia kolejną powtórkę.</p><p><b>Słuchanie</b>: słowa i zdania czytane na głos, pisownia ze słuchu, „prawda czy fałsz”, czytanki od A2 do C2.</p><div class="row"><a class="btn primary" href="#/sciezka">Zobacz ścieżkę</a><button class="btn ghost" id="hideIntro">Rozumiem</button></div></section>';
    h += '<a class="card nextunit" href="#/etap/' + cu.id + '">' + ring(unitProg(cu), Math.round(unitProg(cu) * 100) + '%') + '<div><p class="kicker">Twoja lekcja · ' + cu.level + '</p><b>' + esc(cu.name) + '</b><small>' + unitWords(cu.id).filter(seen).length + ' z ' + unitWords(cu.id).length + ' słów poznanych</small></div>' + ic('next') + '</a>';
    h += '<section class="kpis"><div class="kpi"><b>' + r.learning + '</b><small>słów rozpoznajesz</small></div><div class="kpi"><b>' + p.learning + '</b><small>słów potrafisz napisać</small></div><div class="kpi"><b>' + r.known + '</b><small>opanowane na stałe</small></div><div class="kpi"><b>' + S.stats.listen + '</b><small>trafień ze słuchu</small></div></section>';
    h += '<h2 class="sec">Ćwiczenia</h2><section class="tiles">' + [
      ['sciezka', 'route', 'Ścieżka A1–C2', UA.TOPICS.length + ' lekcji'], ['sluchanie', 'headphones', 'Słuchanie', 'słowa, zdania, czytanki'],
      ['wymowa', 'ear', 'Wymowa', 'и/і, г/ґ, akcent'], ['dialogi', 'chat', 'Dialogi', Object.keys(S.dialogs).length + '/' + UA.DIALOGS.length + ' przećwiczone'],
      ['przyjaciele', 'alert', 'Fałszywi przyjaciele', S.stats.ff + ' trafień'], ['gramatyka', 'book', 'Gramatyka', 'tylko to, co inne'],
      ['alfabet', 'abc', 'Alfabet', 'litery i dźwięki'], ['dyktando', 'pen', 'Dyktando', 'słuchaj i pisz']
    ].map(function (t) { return '<a class="tile" href="#/' + t[0] + '">' + ic(t[1]) + '<b>' + t[2] + '</b><small>' + t[3] + '</small></a>'; }).join('') + '</section>';
    h += '<h2 class="sec">Odznaki</h2><section class="badges">' + G.BADGES.map(function (b) {
      return '<div class="bdg ' + (S.badges[b[0]] ? 'got' : '') + '" title="' + esc(b[2]) + '">' + ic('trophy') + '<b lang="uk">' + st(b[1]) + '</b><small>' + esc(b[2]) + '</small></div>';
    }).join('') + '</section>';
    main.innerHTML = h;
    var hi = $('#hideIntro'); if (hi) hi.onclick = function () { S.seenIntro = true; S.seenIntro2 = true; G.save(); route(); };
  };
  function voiceHelp(vs) {
    return '<section class="card warn"><h2>' + ic('vol') + ' Głos ukraiński</h2><p>' + esc(vs.msg) + ' Bez niego aplikacja działa, ale nie usłyszysz wymowy (ćwiczenia ze słuchu będą niedostępne).</p><ul>' +
      '<li><b>Android:</b> Ustawienia → Zarządzanie ogólne / System → Zamiana tekstu na mowę → Usługi Google → Zainstaluj dane głosowe → <i>українська</i>.</li>' +
      '<li><b>iPhone:</b> Ustawienia → Dostępność → Treść mówiona → Głosy → Ukraiński.</li>' +
      '<li><b>Windows:</b> najprościej otworzyć aplikację w przeglądarce <b>Edge</b> (ma głosy uk-UA). W Chrome: Ustawienia Windows → Czas i język → Mowa → Dodaj głosy → Українська.</li></ul>' +
      '<p class="muted small">Synteza mowy potrafi źle postawić akcent. Ufaj zaznaczonemu akcentowi w tekście bardziej niż głosowi.</p></section>';
  }

  /* ============================================================
     ŚCIEŻKA
     ============================================================ */
  V.slowka = function () { location.replace('#/sciezka'); };
  V.nauka = function () { location.replace('#/trening/all'); };
  V.sciezka = function () {
    var cu = currentUnit();
    var h = head('Ścieżka A1 → C2', 'Lekcje otwierają się po kolei: następna – gdy poznasz 70% słów poprzedniej. Możesz też przeskoczyć dalej, zdając test lekcji.');
    h += '<div class="row"><a class="btn primary" href="#/trening/all">' + ic('play') + 'Codzienny trening</a><a class="btn" href="#/test">' + ic('check') + 'Test wejściowy (słowa przezroczyste)</a></div>';
    LEVELS.forEach(function (lv) {
      var units = UA.TOPICS.filter(function (t) { return t.level === lv; }), ws = levelWords(lv), kn = ws.filter(seen).length, text = (UA.TEXTS || []).filter(function (t) { return t.level === lv; })[0];
      h += '<section class="lvl ' + (levelUnlocked(lv) ? '' : 'locked') + '"><div class="lvlh"><span class="lvtag lv-' + lv + '">' + lv + '</span><div><b>Poziom ' + lv + ' – ' + LEVEL_NAME[lv] + '</b><small>' + kn + ' / ' + ws.length + ' słów · ' + units.length + ' lekcji</small></div></div>' + bar(kn, ws.length) +
        '<div class="units">' + units.map(function (u) {
          var ok = unlocked(u), p = unitProg(u);
          return '<a class="unode ' + (ok ? '' : 'lock') + (u === cu ? ' cur' : '') + (p >= 1 ? ' done' : '') + '" href="#/etap/' + u.id + '">' + (ok ? ring(p, p >= 1 ? '✓' : Math.round(p * 100) + '%') : '<span class="ring lockic">' + ic('lock') + '</span>') + '<span class="uname">' + esc(u.name) + '</span><small>' + unitWords(u.id).length + ' słów</small></a>';
        }).join('') + (text ? '<a class="unode text ' + (levelUnlocked(lv) ? '' : 'lock') + '" href="#/czytanka/' + text.id + '"><span class="ring lockic">' + ic('headphones') + '</span><span class="uname">Czytanka: ' + esc(text.t) + '</span><small>słuchanie + pytania</small></a>' : '') + '</div></section>';
    });
    main.innerHTML = h;
    var c = $('.unode.cur'); if (c && c.scrollIntoView && location.hash === '#/sciezka') setTimeout(function () { c.scrollIntoView({ block: 'center', behavior: 'smooth' }); }, 60);
  };
  V.etap = function (id) {
    var u = unitById(id); if (!u) return location.replace('#/sciezka');
    var ws = unitWords(id), ok = unlocked(u), p = unitProg(u), idx = UA.TOPICS.indexOf(u), nxt = UA.TOPICS[idx + 1];
    var fresh = ws.filter(function (w) { return !SRS.card(w, 'r'); }).length, due = ws.filter(function (w) { return ['r', 'p'].some(function (d) { var c = SRS.card(w, d); return c && c.d <= U.today(); }); }).length;
    var h = head('<span class="lvtag lv-' + u.level + '">' + u.level + '</span> ' + esc(u.name), ws.length + ' słów · poznane: ' + Math.round(p * 100) + '%', '#/sciezka');
    if (!ok) h += '<section class="card warn"><h2>' + ic('lock') + ' Lekcja zablokowana</h2><p>Otworzy się, gdy poznasz 70% słów poprzedniej lekcji. Jeśli znasz już ten materiał – zdaj test lekcji (min. 80%), a odblokujesz ją od razu.</p></section>';
    h += '<section class="card unithead">' + ring(p, Math.round(p * 100) + '%') + '<div class="row">' +
      (ok ? '<a class="btn primary" href="#/trening/' + id + '">' + ic('play') + (fresh ? 'Ucz się (' + fresh + ' nowych)' : 'Trening lekcji') + '</a>' : '') +
      '<button class="btn" id="utest">' + ic('target') + 'Test lekcji (10 pytań)</button>' + (due ? '<span class="muted small">' + due + ' słów czeka na powtórkę</span>' : '') + '</div></section>';
    h += '<section class="wlist">' + ws.map(function (w) {
      var r = SRS.card(w, 'r'), pc = SRS.card(w, 'p');
      return '<div class="wrow">' + say(w.ua) + '<div class="wmain"><div>' + uaw(w.ua) + '</div><div class="pl">' + esc(w.pl) + '</div>' + (w.ex ? '<div class="forms" lang="uk">' + st(w.ex) + '</div>' : '') + '</div><div class="wside"><span class="tag ' + SIM[w.sim][1] + '">' + SIM[w.sim][0] + '</span><span class="dots" title="rozpoznawanie / produkcja"><i class="' + (r && r.n ? (r.i >= 21 ? 'k' : 'l') : '') + '"></i><i class="' + (pc && pc.n ? (pc.i >= 21 ? 'k' : 'l') : '') + '"></i></span></div></div>';
    }).join('') + '</section>';
    main.innerHTML = h;
    $('#utest').onclick = function () {
      var items = shuffle(ws).slice(0, 10).map(function (w, i) { return [exUa2pl, exPl2ua, exCloze, exListen][i % 4](w) || exPl2ua(w); });
      runMC({ title: 'Test lekcji: ' + u.name, back: '#/etap/' + id, items: items, onEnd: function (good, n) {
        if (good / n >= 0.8) {
          var t = U.today();
          ws.forEach(function (w) { var k = SRS.wid(w) + ':r'; if (!S.srs[k] || !S.srs[k].n) S.srs[k] = { e: 2.5, i: 7, n: 2, d: t + 7, l: 0 }; });
          S.unlocked[id] = true; if (nxt) S.unlocked[nxt.id] = true; G.save(); G.confetti(); G.checkBadges();
          return '<div class="fb ok"><b>Lekcja zaliczona!</b><p>Słowa trafiły do powtórek' + (nxt ? ', a lekcja „' + esc(nxt.name) + '” jest odblokowana.' : '.') + '</p></div>';
        }
        return '<div class="fb bad"><b>Zabrakło do 80%.</b><p>Przećwicz słowa w treningu lekcji i spróbuj ponownie.</p></div>';
      } });
    };
  };

  /* ============================================================
     GENERATORY ĆWICZEŃ (aplikacja sama sprawdza znajomość słowa)
     ============================================================ */
  function lvOf(w) { var t = unitById(w.topic); return t ? t.level : 'A1'; }
  function pickOthers(w, keyFn, n, filter) {
    var own = keyFn(w), lv = lvOf(w), seenKeys = {}; seenKeys[own] = 1;
    var cand = shuffle(UA.WORDS.filter(function (x) { return x !== w && (!filter || filter(x)); }));
    cand.sort(function (a, b) { return score(b) - score(a); });
    function score(x) { return (x.pos === w.pos ? 2 : 0) + (lvOf(x) === lv ? 1 : 0) + (x.topic === w.topic ? 0.5 : 0); }
    var out = [];
    for (var i = 0; i < cand.length && out.length < n; i++) { var k = keyFn(cand[i]); if (!seenKeys[k] && k) { seenKeys[k] = 1; out.push(cand[i]); } }
    return out;
  }
  function mc(correct, others, keyFn) { var all = shuffle([correct].concat(others)); return { opts: all.map(keyFn), a: all.indexOf(correct) }; }
  function wordReveal(w) {
    return '<div class="reveal"><div class="big sm">' + uaw(w.ua) + '</div><div class="sayrow">' + sayBoth(w.ua) + '</div><div class="pl">' + esc(w.pl) + '</div>' + (w.ex ? '<div class="ex"><p lang="uk">' + st(w.ex) + ' ' + say(w.ex) + '</p><p class="muted">' + esc(w.exPl) + '</p></div>' : '') + '</div>';
  }
  function exUa2pl(w) {
    var o = mc(w, pickOthers(w, function (x) { return x.pl; }, 3), function (x) { return esc(x.pl); });
    return { kind: 'ua2pl', dir: 'r', w: w, title: 'Co to znaczy?', prompt: '<div class="big">' + uaw(w.ua) + '</div><div class="sayrow">' + sayBoth(w.ua) + '</div>', say: w.ua, opts: o.opts, a: o.a, reveal: wordReveal(w) };
  }
  function exListen(w) {
    var o = mc(w, pickOthers(w, function (x) { return x.pl; }, 3), function (x) { return esc(x.pl); });
    return { kind: 'listen', dir: 'r', w: w, title: 'Posłuchaj – co to znaczy?', prompt: listenBtn(w.ua), say: w.ua, listen: true, opts: o.opts, a: o.a, reveal: wordReveal(w) };
  }
  function exSpell(w) {
    var len = strip(w.ua).length;
    var o = mc(w, pickOthers(w, function (x) { return strip(x.ua); }, 3, function (x) { return Math.abs(strip(x.ua).length - len) <= 3; }), function (x) { return '<span lang="uk" class="ua">' + esc(strip(x.ua)) + '</span>'; });
    return { kind: 'spell', dir: 'r', w: w, title: 'Które słowo słyszysz?', prompt: listenBtn(w.ua), say: w.ua, listen: true, opts: o.opts, a: o.a, reveal: wordReveal(w) };
  }
  function exPl2ua(w) {
    var o = mc(w, pickOthers(w, function (x) { return strip(x.ua); }, 3), function (x) { return '<span lang="uk" class="ua">' + st(x.ua) + '</span>'; });
    return { kind: 'pl2ua', dir: 'p', w: w, title: 'Jak to powiedzieć po ukraińsku?', prompt: '<div class="big pl">' + esc(w.pl) + '</div><div class="meta">' + esc(POS[w.pos] || '') + '</div>', opts: o.opts, a: o.a, sayAfter: w.ua, reveal: wordReveal(w) };
  }
  function exCloze(w) {
    var cz = w._cz; if (!cz) return null;
    var others = pickOthers(w, function (x) { return x._cz ? strip(x._cz.t).toLowerCase() : ''; }, 3, function (x) { return !!x._cz; });
    if (others.length < 3) return null;
    var all = shuffle([w].concat(others));
    return { kind: 'cloze', dir: 'p', w: w, title: 'Uzupełnij zdanie', prompt: '<p class="cloze" lang="uk">' + st(cz.pre) + '<span class="gap">…</span>' + st(cz.post) + '</p><p class="muted">' + esc(w.exPl) + '</p>', opts: all.map(function (x) { return '<span lang="uk" class="ua">' + st(x._cz.t) + '</span>'; }), a: all.indexOf(w), sayAfter: w.ex, reveal: wordReveal(w) };
  }
  function exType(w) { return { kind: 'type', dir: 'p', w: w, title: 'Napisz po ukraińsku', reveal: wordReveal(w) }; }
  function listenBtn(text) { return '<div class="listenbox"><button type="button" class="bigplay" data-say="' + esc(text) + '" aria-label="Odtwórz">' + ic('vol') + '</button><button type="button" class="say slow" data-say="' + esc(text) + '" data-rate="0.65" aria-label="Wolniej">' + ic('slow') + '<small>wolniej</small></button></div>'; }
  function chooseEx(e) {
    var w = e.w, c = SRS.card(w, e.dir), n = c ? c.n : 0, x;
    if (e.dir === 'r') {
      if (e.isNew || n === 0) return exUa2pl(w);
      if (n === 1) return exListen(w);
      return U.pick([exUa2pl, exListen, exSpell])(w);
    }
    if (e.followUp) return exCloze(w) || exPl2ua(w);
    if (n === 0) return exPl2ua(w);
    if (n === 1) return exCloze(w) || exPl2ua(w);
    x = U.pick(w._cz ? [exCloze, exType, exPl2ua, exCloze] : [exType, exPl2ua])(w);
    return x || exPl2ua(w);
  }

  /* ---------- Kolejka treningu ---------- */
  function buildQueue(scope) {
    var t = U.today(), inScope = scope === 'all' ? function () { return true; } : function (w) { return w.topic === scope; };
    var due = [], fresh = [];
    UA.WORDS.forEach(function (w) {
      if (!inScope(w)) return;
      ['r', 'p'].forEach(function (d) { var c = SRS.card(w, d); if (c && c.d <= t) due.push({ w: w, dir: d }); });
    });
    due = shuffle(due).slice(0, 50);
    var limR = scope === 'all' ? SRS.newLeft('r') : 12, limP = scope === 'all' ? SRS.newLeft('p') : 12;
    var order = scope === 'all' ? UA.TOPICS.filter(unlocked) : [unitById(scope)];
    order.forEach(function (u) { unitWords(u.id).forEach(function (w) { if (!SRS.card(w, 'r') && fresh.length < limR) fresh.push({ w: w, dir: 'r', isNew: true }); }); });
    var freshP = UA.WORDS.filter(function (w) { return inScope(w) && seen(w) && !SRS.card(w, 'p'); }).slice(0, limP).map(function (w) { return { w: w, dir: 'p', firstP: true }; });
    var q = [], i = 0, j = 0, k = 0;
    while (i < due.length || j < fresh.length || k < freshP.length) {
      if (i < due.length) q.push(due[i++]); if (i < due.length) q.push(due[i++]);
      if (j < fresh.length) q.push(fresh[j++]);
      if (k < freshP.length) q.push(freshP[k++]);
    }
    return q;
  }

  /* ============================================================
     WSPÓLNY WIDOK PYTANIA (ABCD) + combo
     ============================================================ */
  function askMC(stage, q, done) {
    stage.innerHTML = '<div class="card fc qcard"><p class="qtitle">' + esc(q.title) + '</p>' + q.prompt + '</div><div class="opts' + (q.opts.length === 2 ? ' two' : '') + '">' + q.opts.map(function (o, i) { return '<button class="btn opt" data-i="' + i + '"><kbd>' + (i + 1) + '</kbd><span>' + o + '</span></button>'; }).join('') + '</div><div id="fb"></div>';
    if (q.say && (q.listen || S.settings.autoplay)) setTimeout(function () { SP.speak(q.say); }, 250);
    var answered = false;
    function pick(i, b) {
      if (answered) return; answered = true;
      var ok = i === q.a;
      $$('.opt', stage).forEach(function (x) { x.disabled = true; if (+x.getAttribute('data-i') === q.a) x.classList.add('right'); });
      if (!ok) b.classList.add('wrong'); else b.classList.add('pop');
      G.sfx(ok ? 'ok' : 'bad');
      if (q.sayAfter) SP.speak(q.sayAfter);
      $('#fb', stage).innerHTML = '<div class="verdict ' + (ok ? 'ok' : 'bad') + '"><b>' + (ok ? G.praise() : 'Niezupełnie.') + '</b></div>' + (q.reveal || '') + (q.extra || '') + '<button class="btn primary block" id="nx">Dalej <kbd>Enter</kbd></button>';
      $('#nx', stage).onclick = function () { done(ok, b); };
      $('#nx', stage).focus({ preventScroll: true });
      if (q.onAnswer) q.onAnswer(ok, b);
    }
    $$('.opt', stage).forEach(function (b) { b.onclick = function () { pick(+b.getAttribute('data-i'), b); }; });
    return function key(e) { var n = +e.key; if (n >= 1 && n <= q.opts.length) { var b = $$('.opt', stage)[n - 1]; if (b && !b.disabled) b.click(); } if (e.key === 'Enter') { var nx = $('#nx', stage); if (nx) { e.preventDefault(); nx.click(); } } };
  }
  function askType(stage, q, done) {
    var w = q.w, pair = w.ua.indexOf('/') > 0;
    stage.innerHTML = '<div class="card fc qcard"><p class="qtitle">' + esc(q.title) + '</p><div class="big pl">' + esc(w.pl) + '</div><div class="meta">' + esc(POS[w.pos] || '') + (pair ? ' – wpisz parę: niedokonany / dokonany' : '') + '</div>' +
      '<div class="ansrow"><input id="ans" class="answer" placeholder="po ukraińsku…"><button class="btn primary" id="chk">Sprawdź</button></div><div id="kbh"></div></div><div id="fb"></div>';
    var inp = $('#ans', stage), finished = false;
    $('#kbh', stage).appendChild(UA.KB(inp, check));
    if (!('ontouchstart' in window) || S.settings.sysKb) inp.focus();
    $('#chk', stage).onclick = check;
    function check() {
      if (finished) { var nx = $('#nx', stage); if (nx) nx.click(); return; }
      var a = norm(inp.value); if (!a) return;
      var exp = norm(w.ua), ep = exp.split('/').map(function (s) { return s.trim(); }), ap = a.split(/\s*[\/,]\s*/).filter(Boolean);
      var ok = a === exp || (ap.length === ep.length && ap.every(function (x, k) { return x === ep[k]; }));
      var near = !ok && U.lev(a.replace(/\s*\/\s*/g, '/'), exp.replace(/\s*\/\s*/g, '/')) <= 1 && exp.length > 4;
      var half = !ok && pair && ap.length === 1 && ap[0] === ep[0];
      finished = true; inp.disabled = true; $('#kbh', stage).innerHTML = '';
      G.sfx(ok || near ? 'ok' : 'bad'); SP.speak(w.ua);
      var msg = ok ? '<b>' + G.praise() + '</b>' : near ? '<b>Prawie – literówka.</b> Zaliczam, ale popraw zapis.' : half ? '<b>Brakuje formy dokonanej.</b>' : '<b>Niezupełnie.</b> Wpisałeś: <span lang="uk">' + esc(inp.value) + '</span>';
      $('#fb', stage).innerHTML = '<div class="verdict ' + (ok ? 'ok' : near || half ? 'typo' : 'bad') + '">' + msg + '</div>' + q.reveal + '<button class="btn primary block" id="nx">Dalej <kbd>Enter</kbd></button>';
      $('#nx', stage).onclick = function () { done(ok || near, $('#chk', stage)); };
    }
    return function key(e) { if (e.key === 'Enter' && finished) { var nx = $('#nx', stage); if (nx) { e.preventDefault(); nx.click(); } } };
  }

  /* ============================================================
     TRENING – nauka słów z automatycznym sprawdzaniem
     ============================================================ */
  V.trening = function (scope) {
    scope = scope || 'all';
    var u = scope === 'all' ? null : unitById(scope);
    var queue = buildQueue(scope), pos = 0, done = 0, okc = 0, combo = 0, best = 0, retries = {}, keyH = null;
    var back = u ? '#/etap/' + scope : '#/sciezka', title = u ? 'Trening: ' + u.name : 'Codzienny trening';
    if (!queue.length) {
      main.innerHTML = head(title, '', back) + '<section class="card empty"><h2>Na dziś wszystko!</h2><p>Brak powtórek i nowych słów w tym zakresie. Wróć jutro, zwiększ limit nowych słów w ustawieniach albo poćwicz słuchanie.</p><div class="row center"><a class="btn primary" href="#/sluchanie">Słuchanie</a><a class="btn" href="#/sciezka">Ścieżka</a></div></section>';
      return;
    }
    main.innerHTML = head(title, '', back) + '<div class="sessbar"></div><div id="stage"></div>';
    function onKey(e) { if (e.target.tagName === 'INPUT' && e.key !== 'Enter') return; if (keyH) keyH(e); }
    document.addEventListener('keydown', onKey);
    cleanup = function () { document.removeEventListener('keydown', onKey); };
    function bar2() { $('.sessbar').innerHTML = bar(pos, queue.length) + '<span>' + Math.min(pos + 1, queue.length) + '/' + queue.length + '</span>' + (combo >= 3 ? '<span class="combo">' + ic('flame') + combo + '</span>' : ''); }
    function next() {
      if (pos >= queue.length) return finish();
      bar2();
      var e = queue[pos];
      if (e.isNew && !e.shown) return intro(e);
      var q = chooseEx(e);
      keyH = (q.kind === 'type' ? askType : askMC)($('#stage'), q, function (ok, b) { result(e, ok, b); });
    }
    function intro(e) {
      e.shown = true; var w = e.w;
      $('#stage').innerHTML = '<div class="card fc introcard"><span class="newtag">nowe słowo</span><div class="meta">' + esc(POS[w.pos] || '') + ' · ' + lvOf(w) + '</div><div class="big">' + uaw(w.ua) + '</div><div class="sayrow">' + sayBoth(w.ua) + '</div><div class="pl bigpl">' + esc(w.pl) + '</div>' +
        (w.forms ? '<div class="forms" lang="uk">' + st(w.forms) + '</div>' : '') + '<div class="tags"><span class="tag ' + SIM[w.sim][1] + '">' + SIM[w.sim][0] + '</span></div>' +
        (w.ex ? '<div class="ex"><p lang="uk">' + st(w.ex) + ' ' + say(w.ex) + '</p><p class="muted">' + esc(w.exPl) + '</p></div>' : '') + '</div><div class="actions"><button class="btn primary block" id="gotit">Zapamiętane – sprawdź mnie <kbd>Enter</kbd></button></div>';
      if (S.settings.autoplay) SP.speak(w.ua);
      $('#gotit').onclick = next;
      keyH = function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); next(); } };
    }
    function result(e, ok, b) {
      var isNewCard = !SRS.card(e.w, e.dir);
      if (isNewCard) SRS.countNew(e.dir);
      SRS.grade(e.w, e.dir, ok ? 4 : 1);
      done++;
      if (ok) {
        okc++; combo++; best = Math.max(best, combo);
        var mult = 1 + Math.min(2, Math.floor(combo / 4)), r = b ? b.getBoundingClientRect() : null;
        G.addXP((e.dir === 'p' ? 8 : 5) * mult);
        if (r) floatXP('+' + (e.dir === 'p' ? 8 : 5) * mult, r.left + r.width / 2, r.top);
        if (e.dir === 'p') { S.stats.prodOk++; G.save(); }
        // nowe słowo: drugie sprawdzenie w tej samej sesji, ale w innej formie (zdanie z luką / PL → UA)
        if (e.isNew && !SRS.card(e.w, 'p')) queue.splice(Math.min(queue.length, pos + 4), 0, { w: e.w, dir: 'p', followUp: true });
      } else {
        combo = 0;
        var k = SRS.wid(e.w) + e.dir; retries[k] = (retries[k] || 0) + 1;
        if (retries[k] <= 2) queue.splice(Math.min(queue.length, pos + 3), 0, { w: e.w, dir: e.dir });
      }
      pos++; next();
    }
    function finish() {
      keyH = null; document.removeEventListener('keydown', onKey);
      var pct = done ? Math.round(100 * okc / done) : 0;
      $('.sessbar').innerHTML = '';
      $('#stage').innerHTML = '<section class="card empty"><h2 lang="uk">' + st(pct >= 80 ? 'Чудо́во!' : 'До́бре!') + '</h2><p>' + done + ' odpowiedzi, ' + pct + '% poprawnych · najdłuższa seria: ' + best + '.</p><p class="muted">Kolejne powtórki aplikacja zaplanowała sama – na podstawie tego, jak Ci poszło.</p><div class="row center"><a class="btn primary" href="#/sciezka">Ścieżka</a><a class="btn" href="#/sluchanie">Słuchanie</a></div></section>';
      if (pct >= 80 && done >= 6) G.confetti();
      G.checkBadges();
    }
    next();
  };
  function floatXP(text, x, y) {
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var el = document.createElement('div'); el.className = 'xpfloat'; el.textContent = text; el.style.left = x + 'px'; el.style.top = y + 'px';
    document.body.appendChild(el); setTimeout(function () { el.remove(); }, 1100);
  }

  /* ============================================================
     RUNDA PYTAŃ (testy lekcji, słuchanie)
     ============================================================ */
  function runMC(o) {
    var items = o.items.filter(Boolean), k = 0, good = 0, combo = 0, keyH = null;
    main.innerHTML = head(esc(o.title), o.sub || '', o.back) + '<div class="sessbar"></div><div id="stage"></div>';
    function onKey(e) { if (e.target.tagName === 'INPUT') return; if (keyH) keyH(e); }
    document.addEventListener('keydown', onKey);
    cleanup = function () { document.removeEventListener('keydown', onKey); };
    function show() {
      if (k >= items.length) return end();
      $('.sessbar').innerHTML = bar(k, items.length) + '<span>' + (k + 1) + '/' + items.length + '</span>' + (combo >= 3 ? '<span class="combo">' + ic('flame') + combo + '</span>' : '');
      var q = items[k];
      keyH = askMC($('#stage'), q, function (ok, b) {
        if (ok) { good++; combo++; var r = b.getBoundingClientRect(); G.addXP(4, r.left, r.top); floatXP('+4', r.left + r.width / 2, r.top); if (o.counter) { S.stats[o.counter] = (S.stats[o.counter] || 0) + 1; G.save(); } }
        else combo = 0;
        k++; show();
      });
    }
    function end() {
      keyH = null; document.removeEventListener('keydown', onKey);
      $('.sessbar').innerHTML = '';
      var extra = o.onEnd ? o.onEnd(good, items.length) || '' : '';
      $('#stage').innerHTML = '<section class="card empty"><h2>' + good + '/' + items.length + '</h2>' + extra + '<div class="row center"><a class="btn primary" href="' + o.back + '">Wróć</a>' + (o.again ? '<button class="btn" id="again">Jeszcze raz</button>' : '') + '</div></section>';
      if (good === items.length && items.length >= 8) G.confetti();
      if (o.again) $('#again').onclick = o.again;
      G.checkBadges();
    }
    show();
  }

  /* ============================================================
     SŁUCHANIE
     ============================================================ */
  function listenPool(lv) {
    if (lv === 'moje') { var m = UA.WORDS.filter(seen); return m.length >= 12 ? m : levelWords('A1'); }
    return levelWords(lv);
  }
  function defaultLv() { var lv = 'A1'; LEVELS.forEach(function (l) { if (levelUnlocked(l) && levelWords(l).some(seen)) lv = l; }); return lv; }
  V.sluchanie = function (mode, lv) {
    lv = lv || defaultLv();
    if (mode) return listenRun(mode, lv);
    var vs = SP.voiceStatus();
    var h = head('Słuchanie', 'Aplikacja czyta na głos słowa, zdania i teksty – Ty sprawdzasz, czy zrozumiałeś. Przycisk „wolniej” odtwarza nagranie w tempie 0,65×.');
    if (!vs.ok) h += voiceHelp(vs);
    h += '<div class="chips" role="group" aria-label="Poziom">' + LEVELS.concat(['moje']).map(function (l) { return '<a class="chip ' + (l === lv ? 'on' : '') + '" href="#/sluchanie//' + l + '">' + (l === 'moje' ? 'Moje słowa' : l) + '</a>'; }).join('') + '</div>';
    h += '<section class="tiles">' + [
      ['slowa', 'headphones', 'Usłysz i zrozum', 'słowo → tłumaczenie'], ['pisownia', 'pen', 'Pisownia ze słuchu', 'które słowo słyszysz?'],
      ['zdania', 'chat', 'Zdania', 'co znaczy usłyszane zdanie?'], ['prawda', 'check', 'Prawda czy fałsz?', 'czy tłumaczenie pasuje?']
    ].map(function (t) { return '<a class="tile" href="#/sluchanie/' + t[0] + '/' + lv + '">' + ic(t[1]) + '<b>' + t[2] + '</b><small>' + t[3] + ' · ' + (lv === 'moje' ? 'moje słowa' : lv) + '</small></a>'; }).join('') + '</section>';
    h += '<h2 class="sec">Czytanki ze słuchu</h2><section class="dlist">' + (UA.TEXTS || []).map(function (t) {
      var okL = levelUnlocked(t.level), sc = S.stats.texts[t.id];
      return '<a class="card dl" href="#/czytanka/' + t.id + '"><span class="lvtag lv-' + t.level + '">' + t.level + '</span><div><b>' + esc(t.t) + '</b><small lang="uk">' + st(t.ua) + (okL ? '' : ' · poziom jeszcze zablokowany – możesz spróbować') + '</small></div>' + (sc != null ? '<span class="tag sim-t">' + sc + '/3</span>' : '') + '</a>';
    }).join('') + '</section>';
    h += '<h2 class="sec">Więcej ze słuchu</h2><section class="row"><a class="btn" href="#/dyktando">' + ic('pen') + 'Dyktando</a><a class="btn" href="#/wymowa/pary/yi">' + ic('ear') + 'Pary и / і</a><a class="btn" href="#/dialogi">' + ic('chat') + 'Dialogi</a></section>';
    main.innerHTML = h;
  };
  function listenRun(mode, lv) {
    var pool = listenPool(lv), items = [], back = '#/sluchanie//' + lv;
    var withEx = pool.filter(function (w) { return w.ex; });
    if (mode === 'slowa') items = shuffle(pool).slice(0, 10).map(exListen);
    if (mode === 'pisownia') items = shuffle(pool).slice(0, 10).map(exSpell);
    if (mode === 'zdania') items = shuffle(withEx).slice(0, 8).map(function (w) {
      var others = pickOthers(w, function (x) { return x.exPl; }, 3, function (x) { return !!x.ex; }), all = shuffle([w].concat(others));
      return { title: 'Co znaczy usłyszane zdanie?', prompt: listenBtn(w.ex), say: w.ex, listen: true, opts: all.map(function (x) { return esc(x.exPl); }), a: all.indexOf(w), reveal: '<div class="ex"><p lang="uk">' + st(w.ex) + ' ' + say(w.ex) + '</p><p class="muted">' + esc(w.exPl) + '</p></div>' };
    });
    if (mode === 'prawda') items = shuffle(withEx).slice(0, 10).map(function (w) {
      var truth = Math.random() < 0.5, shown = truth ? w : pickOthers(w, function (x) { return x.exPl; }, 1, function (x) { return !!x.ex; })[0];
      if (!shown) { shown = w; truth = true; }
      return { title: 'Czy tłumaczenie pasuje do nagrania?', prompt: listenBtn(w.ex) + '<p class="trq">„' + esc(shown.exPl) + '”</p>', say: w.ex, listen: true, opts: ['Tak, pasuje', 'Nie, nie pasuje'], a: truth ? 0 : 1, reveal: '<div class="ex"><p lang="uk">' + st(w.ex) + ' ' + say(w.ex) + '</p><p class="muted">' + esc(w.exPl) + '</p></div>' };
    });
    var names = { slowa: 'Usłysz i zrozum', pisownia: 'Pisownia ze słuchu', zdania: 'Zdania ze słuchu', prawda: 'Prawda czy fałsz?' };
    runMC({ title: names[mode] + ' · ' + (lv === 'moje' ? 'moje słowa' : lv), back: back, items: items, counter: 'listen', again: function () { listenRun(mode, lv); } });
  }
  V.czytanka = function (id) {
    var t = (UA.TEXTS || []).filter(function (x) { return x.id === id; })[0]; if (!t) return location.replace('#/sluchanie');
    var showT = false, showP = false, rate = S.settings.rate;
    var h = head('<span class="lvtag lv-' + t.level + '">' + t.level + '</span> ' + esc(t.t), '<span lang="uk">' + st(t.ua) + '</span> · najpierw posłuchaj, potem odpowiedz na pytania. Tekst możesz odsłonić.', '#/sluchanie');
    h += '<section class="card"><div class="row"><button class="btn primary" id="play">' + ic('play') + 'Odtwórz tekst</button><button class="btn" id="slow">' + ic('slow') + 'Wolniej</button><button class="btn" id="tt">' + ic('eye') + 'Pokaż tekst</button><button class="btn ghost" id="tp">Tłumaczenie</button></div><div id="txt"></div></section>';
    h += '<h2 class="sec">Pytania</h2>' + t.qs.map(function (q, i) { return '<div class="card qz" data-q="' + i + '"><p><b>' + (i + 1) + '.</b> ' + esc(q[0]) + '</p><div class="opts">' + q[1].map(function (o, k) { return '<button class="btn opt" data-k="' + k + '"><span>' + esc(o) + '</span></button>'; }).join('') + '</div></div>'; }).join('') + '<div id="sum"></div>';
    main.innerHTML = h;
    function drawTxt() { $('#txt').innerHTML = (showT ? '<p class="readtext" lang="uk">' + st(t.text) + '</p>' : '') + (showP ? '<p class="muted">' + esc(t.pl) + '</p>' : ''); }
    $('#play').onclick = function () { SP.speak(t.text, { rate: rate }); };
    $('#slow').onclick = function () { SP.speak(t.text, { rate: 0.7 }); };
    $('#tt').onclick = function () { showT = !showT; drawTxt(); this.innerHTML = ic('eye') + (showT ? 'Ukryj tekst' : 'Pokaż tekst'); };
    $('#tp').onclick = function () { showP = !showP; drawTxt(); };
    var answered = 0, good = 0;
    $$('.qz').forEach(function (box) {
      var q = t.qs[+box.getAttribute('data-q')];
      $$('.opt', box).forEach(function (b) {
        b.onclick = function () {
          var k = +b.getAttribute('data-k');
          $$('.opt', box).forEach(function (x) { x.disabled = true; if (+x.getAttribute('data-k') === q[2]) x.classList.add('right'); });
          if (k === q[2]) { good++; S.stats.listen++; G.addXP(6); G.sfx('ok'); } else { b.classList.add('wrong'); G.sfx('bad'); }
          answered++;
          if (answered === t.qs.length) {
            S.stats.texts[t.id] = Math.max(S.stats.texts[t.id] || 0, good); G.save(); G.checkBadges();
            if (good === t.qs.length) G.confetti();
            $('#sum').innerHTML = '<section class="card empty"><h2>' + good + '/' + t.qs.length + '</h2><p>' + (good === t.qs.length ? 'Wszystko zrozumiane!' : 'Odsłoń tekst i tłumaczenie, posłuchaj jeszcze raz.') + '</p></section>';
          }
        };
      });
    });
  };

  /* ============================================================
     TEST WEJŚCIOWY – zaliczanie słów przezroczystych hurtem
     ============================================================ */
  V.test = function (topic) {
    topic = topic || UA.TOPICS[0].id;
    var ws = UA.WORDS.filter(function (w) { return w.topic === topic && (w.sim === 't' || w.sim === 'p') && !SRS.card(w, 'r'); });
    var h = head('Test wejściowy', 'Słowa przezroczyste i podobne nie muszą być wbijane pojedynczo. Dotknij słowa, które od razu rozumiesz – zobaczysz tłumaczenie, żeby się sprawdzić. Zaznaczone trafią do powtórek z długim odstępem (rozpoznawanie). Produkcję nadal przećwiczysz.', '#/sciezka');
    h += '<div class="chips">' + UA.TOPICS.map(function (t) { return '<a class="chip ' + (t.id === topic ? 'on' : '') + '" href="#/test/' + t.id + '">' + t.level + ' · ' + esc(t.name) + '</a>'; }).join('') + '</div>';
    if (!ws.length) h += '<section class="card empty"><p>W tym temacie nie ma już słów do zaliczenia testem.</p></section>';
    else h += '<section class="tgrid">' + ws.map(function (w, i) { return '<button class="tw" data-i="' + i + '"><span class="ua" lang="uk">' + st(w.ua) + '</span><small>' + esc(w.pl) + '</small></button>'; }).join('') + '</section>' +
      '<div class="actions sticky"><button class="btn primary block" id="pass" disabled>Zalicz zaznaczone (0)</button></div>';
    main.innerHTML = h;
    var sel = {};
    $$('.tw').forEach(function (b) {
      b.onclick = function () {
        var i = b.getAttribute('data-i'); sel[i] = !sel[i]; b.classList.toggle('on', !!sel[i]);
        var n = Object.keys(sel).filter(function (k) { return sel[k]; }).length;
        var p = $('#pass'); p.disabled = !n; p.textContent = 'Zalicz zaznaczone (' + n + ')';
      };
    });
    var p = $('#pass');
    if (p) p.onclick = function () {
      var t = U.today(), n = 0;
      Object.keys(sel).forEach(function (k) { if (!sel[k]) return; var w = ws[k]; S.srs[SRS.wid(w) + ':r'] = { e: 2.6, i: 21, n: 3, d: t + 21, l: 0 }; n++; });
      G.save(); G.addXP(n); G.toast('Zaliczono ' + n + ' słów', 'Wrócą w powtórkach za 3 tygodnie'); route();
    };
  };

  /* ============================================================
     SŁOWNIK
     ============================================================ */
  V.slownik = function (topic) {
    var h = head('Słownik', UA.WORDS.length + ' słów od A1 do C2. Szukaj po ukraińsku (bez akcentów) lub po polsku.');
    h += '<div class="filters"><input id="q" type="search" placeholder="Szukaj…" aria-label="Szukaj"><select id="ft" aria-label="Temat"><option value="">Wszystkie tematy</option>' + UA.TOPICS.map(function (t) { return '<option value="' + t.id + '"' + (t.id === topic ? ' selected' : '') + '>' + t.level + ' · ' + esc(t.name) + '</option>'; }).join('') + '</select>' +
      '<select id="fs" aria-label="Podobieństwo"><option value="">Każde podobieństwo</option>' + Object.keys(SIM).map(function (k) { return '<option value="' + k + '">' + SIM[k][0] + '</option>'; }).join('') + '</select></div><div id="list" class="wlist"></div>';
    main.innerHTML = h;
    function draw() {
      var q = norm($('#q').value), ft = $('#ft').value, fs = $('#fs').value;
      var ws = UA.WORDS.filter(function (w) { return (!ft || w.topic === ft) && (!fs || w.sim === fs) && (!q || norm(w.ua).indexOf(q) >= 0 || w.pl.toLowerCase().indexOf(q) >= 0); });
      $('#list').innerHTML = ws.slice(0, 400).map(function (w) {
        var r = SRS.card(w, 'r'), p = SRS.card(w, 'p');
        return '<div class="wrow">' + say(w.ua) + '<div class="wmain"><div>' + uaw(w.ua) + '</div><div class="pl">' + esc(w.pl) + '</div>' + (w.forms ? '<div class="forms" lang="uk">' + st(w.forms) + '</div>' : '') + '</div>' +
          '<div class="wside"><span class="tag ' + SIM[w.sim][1] + '">' + SIM[w.sim][0] + '</span><span class="dots" title="rozpoznawanie / produkcja"><i class="' + (r && r.n ? (r.i >= 21 ? 'k' : 'l') : '') + '"></i><i class="' + (p && p.n ? (p.i >= 21 ? 'k' : 'l') : '') + '"></i></span></div></div>';
      }).join('') || '<p class="muted">Brak wyników.</p>';
    }
    $('#q').oninput = draw; $('#ft').onchange = draw; $('#fs').onchange = draw; draw();
  };

  /* ============================================================
     FAŁSZYWI PRZYJACIELE
     ============================================================ */
  V.przyjaciele = function (mode) {
    if (mode === 'quiz') return friendsQuiz();
    var h = head('Fałszywi przyjaciele', 'Słowa, które wyglądają znajomo, a znaczą coś innego. Typowo polski problem: „przecież wiadomo, co to znaczy”.');
    h += '<div class="row"><a class="btn primary" href="#/przyjaciele/quiz">' + ic('target') + ' Quiz (10 pytań)</a><span class="muted">Trafienia: ' + S.stats.ff + '</span></div>';
    h += '<section class="ff">' + UA.FRIENDS.map(function (f) {
      return '<div class="card ffc"><div class="ffh">' + say(f[0]) + uaw(f[0], 'bigish') + '</div><p class="eq"><b>= ' + esc(f[1]) + '</b></p><p class="neq">≠ ' + esc(f[2]) + (f[3] && f[3] !== '–' ? ' <span class="muted">→ po ukr.</span> <span lang="uk">' + st(f[3]) + '</span>' : '') + '</p>' +
        '<p class="ex" lang="uk">' + st(f[4]) + ' ' + say(f[4]) + '</p><p class="muted small">' + esc(f[5]) + '</p></div>';
    }).join('') + '</section>';
    main.innerHTML = h;
  };
  function friendsQuiz() {
    var qs = U.shuffle(UA.FRIENDS).slice(0, 10), k = 0, good = 0;
    main.innerHTML = head('Quiz: fałszywi przyjaciele', 'Co naprawdę znaczy to słowo?', '#/przyjaciele') + '<div class="sessbar"></div><div id="stage"></div>';
    function q() {
      if (k >= qs.length) {
        $('#stage').innerHTML = '<section class="card empty"><h2>' + good + '/' + qs.length + '</h2><p>' + (good >= 8 ? 'Nie dasz się nabrać!' : 'Te pułapki wracają – warto powtórzyć.') + '</p><div class="row"><a class="btn primary" href="#/przyjaciele/quiz" id="again">Jeszcze raz</a><a class="btn" href="#/przyjaciele">Lista</a></div></section>';
        $('#again').onclick = function (e) { e.preventDefault(); friendsQuiz(); };
        return;
      }
      var f = qs[k];
      var other = U.pick(UA.FRIENDS.filter(function (x) { return x !== f; }));
      var opts = U.shuffle([[f[1], 1], [f[2], 0], [other[1], 0]]);
      $('.sessbar').innerHTML = bar(k, qs.length) + '<span>' + (k + 1) + '/' + qs.length + '</span>';
      $('#stage').innerHTML = '<div class="card fc"><div class="big">' + uaw(f[0]) + '</div><div class="sayrow">' + say(f[0]) + '</div></div><div class="opts">' +
        opts.map(function (o, i) { return '<button class="btn opt" data-i="' + i + '">' + esc(o[0]) + '</button>'; }).join('') + '</div><div id="fb"></div>';
      SP.speak(f[0]);
      $$('.opt').forEach(function (b) {
        b.onclick = function () {
          var o = opts[+b.getAttribute('data-i')];
          $$('.opt').forEach(function (x) { x.disabled = true; if (opts[+x.getAttribute('data-i')][1]) x.classList.add('right'); });
          if (o[1]) { good++; S.stats.ff++; G.save(); G.addXP(4); G.sfx('ok'); } else { b.classList.add('wrong'); G.sfx('bad'); }
          $('#fb').innerHTML = '<div class="card note"><p><b lang="uk">' + st(f[0]) + '</b> = ' + esc(f[1]) + '. ' + (f[3] && f[3] !== '–' ? 'Polskie „' + esc(f[2]) + '” to po ukraińsku <b lang="uk">' + st(f[3]) + '</b>.' : '') + '</p><p lang="uk">' + st(f[4]) + '</p><p class="muted small">' + esc(f[5]) + '</p><button class="btn primary block" id="nx">Dalej</button></div>';
          $('#nx').onclick = function () { k++; q(); };
        };
      });
    }
    q();
  }

  /* ============================================================
     WYMOWA
     ============================================================ */
  V.wymowa = function (sub, id) {
    if (sub === 'zasady') return rules();
    if (sub === 'pary') return pairsQuiz(id);
    if (sub === 'gg') return ggQuiz();
    if (sub === 'akcent') return stressQuiz();
    var h = head('Wymowa', 'Typowe problemy Polaków: и/і, г/ґ, brak ubezdźwięczniania, в na końcu sylaby i ruchomy akcent.');
    h += '<section class="tiles">' + [
      ['#/wymowa/zasady', 'book', 'Zasady wymowy', UA.RULES.length + ' kart z przykładami'],
      ['#/wymowa/pary/yi', 'ear', 'и czy і?', 'usłysz i wybierz · ' + S.stats.pairs + ' trafień'],
      ['#/wymowa/pary/gh', 'ear', 'г czy ґ?', 'usłysz i wybierz'],
      ['#/wymowa/gg', 'pen', 'Pisownia г / ґ', 'uzupełnij literę'],
      ['#/wymowa/akcent', 'target', 'Gdzie pada akcent?', S.stats.stress + ' trafień'],
      ['#/dialogi', 'mic', 'Shadowing', 'w dialogach: nagraj się i porównaj']
    ].map(function (t) { return '<a class="tile" href="' + t[0] + '">' + ic(t[1]) + '<b>' + t[2] + '</b><small>' + t[3] + '</small></a>'; }).join('') + '</section>';
    var vs = SP.voiceStatus(); if (!vs.ok) h += voiceHelp(vs);
    h += '<p class="muted small">Ćwiczenia słuchowe korzystają z syntezy mowy urządzenia. Głos syntetyczny może wymawiać и/і i г/ґ mniej wyraźnie niż człowiek – traktuj je jako trening, a wzorem niech będą nagrania native speakerów.</p>';
    main.innerHTML = h;
  };
  function rules() {
    main.innerHTML = head('Zasady wymowy', 'Dotknij przykładu, żeby go usłyszeć.', '#/wymowa') + '<section class="rules">' + UA.RULES.map(function (r) {
      return '<div class="card rule"><h2>' + esc(r.t) + '</h2><p>' + esc(r.b) + '</p><div class="exs">' + r.ex.map(function (x) { return '<button class="chip say-chip" data-say="' + esc(x) + '">' + ic('vol') + '<span lang="uk">' + st(x) + '</span></button>'; }).join('') + '</div></div>';
    }).join('') + '</section>';
  }
  function pairsQuiz(id) {
    var set = UA.PAIRS.filter(function (p) { return p.id === id; })[0] || UA.PAIRS[0];
    var k = 0, good = 0, N = 10, cur;
    main.innerHTML = head(esc(set.name), 'Posłuchaj i wybierz słowo, które słyszysz.', '#/wymowa') + '<div class="sessbar"></div><div id="stage"></div>';
    function q() {
      if (k >= N) { $('#stage').innerHTML = '<section class="card empty"><h2>' + good + '/' + N + '</h2><div class="row"><button class="btn primary" id="again">Jeszcze raz</button><a class="btn" href="#/wymowa">Wymowa</a></div></section>'; $('#again').onclick = function () { pairsQuiz(id); }; return; }
      var it = U.pick(set.items), side = Math.random() < .5 ? 0 : 2; cur = { it: it, side: side };
      $('.sessbar').innerHTML = bar(k, N) + '<span>' + (k + 1) + '/' + N + '</span>';
      $('#stage').innerHTML = '<div class="card fc"><button class="btn big-say" id="rep">' + ic('vol') + ' Odsłuchaj</button><button class="btn ghost" id="slow">' + ic('slow') + ' wolniej</button></div><div class="opts two">' +
        [0, 2].map(function (s) { return '<button class="btn opt" data-s="' + s + '"><span class="ua bigish" lang="uk">' + st(it[s]) + '</span><small>' + esc(it[s + 1]) + '</small></button>'; }).join('') + '</div><div id="fb"></div>';
      var w = it[side];
      $('#rep').onclick = function () { SP.speak(w); }; $('#slow').onclick = function () { SP.speak(w, { rate: .65 }); };
      setTimeout(function () { SP.speak(w); }, 250);
      $$('.opt').forEach(function (b) {
        b.onclick = function () {
          var s = +b.getAttribute('data-s');
          $$('.opt').forEach(function (x) { x.disabled = true; if (+x.getAttribute('data-s') === side) x.classList.add('right'); });
          if (s === side) { good++; S.stats.pairs++; G.save(); G.addXP(2); G.sfx('ok'); } else { b.classList.add('wrong'); G.sfx('bad'); }
          $('#fb').innerHTML = '<div class="row center">' + say(it[0]) + '<span lang="uk">' + st(it[0]) + '</span><span class="muted">vs</span><span lang="uk">' + st(it[2]) + '</span>' + say(it[2]) + '</div><button class="btn primary block" id="nx">Dalej</button>';
          $('#nx').onclick = function () { k++; q(); };
        };
      });
    }
    q();
  }
  function ggQuiz() {
    var items = U.shuffle(UA.GG).slice(0, 10), k = 0, good = 0;
    main.innerHTML = head('Pisownia: г czy ґ?', 'Polskie g to zwykle ukraińskie г [ɦ]. Litera ґ pojawia się w niewielu słowach – warto je znać.', '#/wymowa') + '<div class="sessbar"></div><div id="stage"></div>';
    function q() {
      if (k >= items.length) { $('#stage').innerHTML = '<section class="card empty"><h2>' + good + '/' + items.length + '</h2><div class="row"><button class="btn primary" id="again">Jeszcze raz</button><a class="btn" href="#/wymowa">Wymowa</a></div></section>'; $('#again').onclick = ggQuiz; return; }
      var p = items[k].split('|'), word = p[0], m = word.match(/[гґ]/), right = m[0];
      var gap = st(word).replace(/[гґ]/, '<span class="gap">_</span>');
      $('.sessbar').innerHTML = bar(k, items.length) + '<span>' + (k + 1) + '/' + items.length + '</span>';
      $('#stage').innerHTML = '<div class="card fc"><div class="big ua" lang="uk">' + gap + '</div><p class="muted">' + esc(p[1]) + '</p></div><div class="opts two"><button class="btn opt" data-l="г"><span class="ua bigish">г</span></button><button class="btn opt" data-l="ґ"><span class="ua bigish">ґ</span></button></div><div id="fb"></div>';
      $$('.opt').forEach(function (b) {
        b.onclick = function () {
          var l = b.getAttribute('data-l');
          $$('.opt').forEach(function (x) { x.disabled = true; if (x.getAttribute('data-l') === right) x.classList.add('right'); });
          if (l === right) { good++; S.stats.gg++; G.save(); G.addXP(2); G.sfx('ok'); } else { b.classList.add('wrong'); G.sfx('bad'); }
          $('.big.ua').innerHTML = st(word); SP.speak(word);
          $('#fb').innerHTML = '<button class="btn primary block" id="nx">Dalej</button>'; $('#nx').onclick = function () { k++; q(); };
        };
      });
    }
    q();
  }
  function stressQuiz() {
    var VOWELS = 'аеєиіїоуюя';
    var pool = UA.WORDS.filter(function (w) { var s = w.ua; return s.indexOf(' ') < 0 && s.indexOf('/') < 0 && s.indexOf('́') > 0 && strip(s).split('').filter(function (c) { return VOWELS.indexOf(c.toLowerCase()) >= 0; }).length >= 2; });
    var k = 0, good = 0, N = 12;
    main.innerHTML = head('Gdzie pada akcent?', 'Dotknij akcentowanej samogłoski. Akcent w ukraińskim jest ruchomy i w zwykłym tekście niezaznaczony.', '#/wymowa') + '<div class="sessbar"></div><div id="stage"></div>';
    function q() {
      if (k >= N) { $('#stage').innerHTML = '<section class="card empty"><h2>' + good + '/' + N + '</h2><div class="row"><button class="btn primary" id="again">Jeszcze raz</button><a class="btn" href="#/wymowa">Wymowa</a></div></section>'; $('#again').onclick = stressQuiz; return; }
      var word, meaning;
      if (Math.random() < .2) { var sp = U.pick(UA.STRESS_PAIRS), s = Math.random() < .5 ? 0 : 2; word = sp[s]; meaning = sp[s + 1] + ' (a nie: ' + sp[2 - s + 1] + ')'; }
      else { var w = U.pick(pool); word = w.ua; meaning = w.pl; }
      var plain = strip(word), idx = word.indexOf('́') - 1;
      $('.sessbar').innerHTML = bar(k, N) + '<span>' + (k + 1) + '/' + N + '</span>';
      $('#stage').innerHTML = '<div class="card fc"><p class="muted">' + esc(meaning) + '</p><div class="letters" lang="uk">' + plain.split('').map(function (c, i) {
        return VOWELS.indexOf(c.toLowerCase()) >= 0 ? '<button class="lt v" data-i="' + i + '">' + esc(c) + '</button>' : '<span class="lt">' + esc(c) + '</span>';
      }).join('') + '</div></div><div id="fb"></div>';
      $$('.lt.v').forEach(function (b) {
        b.onclick = function () {
          var i = +b.getAttribute('data-i');
          $$('.lt.v').forEach(function (x) { x.disabled = true; if (+x.getAttribute('data-i') === idx) x.classList.add('right'); });
          if (i === idx) { good++; S.stats.stress++; G.save(); G.addXP(2); G.sfx('ok'); } else { b.classList.add('wrong'); G.sfx('bad'); }
          SP.speak(word);
          $('#fb').innerHTML = '<div class="row center"><span class="ua bigish" lang="uk">' + U.st(word) + '</span>' + say(word) + '</div><button class="btn primary block" id="nx">Dalej</button>';
          $('#nx').onclick = function () { k++; q(); };
        };
      });
    }
    q();
  }

  /* ============================================================
     DIALOGI
     ============================================================ */
  V.dialogi = function () {
    var h = head('Dialogi', 'Krótkie scenki z życia: odsłuch, tekst do odkrycia, odgrywanie ról, shadowing z nagrywaniem i dyktando.');
    h += '<section class="dlist">' + UA.DIALOGS.map(function (d) {
      return '<a class="card dl" href="#/dialog/' + d.id + '">' + ic('chat') + '<div><b>' + esc(d.t) + '</b><small lang="uk">' + st(d.ua) + ' · ' + d.lines.length + ' kwestii</small></div>' + (S.dialogs[d.id] ? '<span class="tag sim-t">' + ic('check') + 'przećwiczony</span>' : '') + '</a>';
    }).join('') + '</section>';
    h += '<section class="card note"><h2>' + ic('mic') + ' Shadowing</h2><p>Posłuchaj kwestii, nagraj własną wersję i odtwórz obie po kolei – usłyszysz różnicę w akcencie i melodii. Nagrania zostają tylko w przeglądarce, nic nie jest wysyłane.</p></section>';
    main.innerHTML = h;
  };
  V.dialog = function (id) {
    var d = UA.DIALOGS.filter(function (x) { return x.id === id; })[0]; if (!d) { location.hash = '#/dialogi'; return; }
    var showText = true, showPl = false, rate = S.settings.rate, mine = {}, recIdx = -1, stopFlag = false, running = false;
    function render() {
      var h = head(esc(d.t), '<span lang="uk">' + st(d.ua) + '</span>', '#/dialogi');
      h += '<div class="dctl"><button class="btn primary" id="all">' + ic('play') + ' Cały dialog</button>' +
        '<button class="btn" id="rate">' + ic('slow') + ' Tempo ' + (rate < 1 ? '0,75×' : '1×') + '</button>' +
        '<button class="btn" id="tt">' + ic('eye') + (showText ? ' Ukryj tekst' : ' Pokaż tekst') + '</button>' +
        '<button class="btn" id="tp">' + (showPl ? 'Ukryj tłumaczenie' : 'Tłumaczenie') + '</button></div>' +
        '<div class="dctl"><span class="muted">Odegraj rolę:</span>' + d.roles.map(function (r, i) { return '<button class="btn role" data-r="' + i + '">' + ic('user') + '<span lang="uk">' + st(r) + '</span></button>'; }).join('') +
        '<a class="btn ghost" href="#/dyktando/' + d.id + '">' + ic('pen') + ' Dyktando</a></div>';
      h += '<div class="chatlog">' + d.lines.map(function (l, i) {
        return '<div class="bub r' + l[0] + '" data-i="' + i + '"><div class="who" lang="uk">' + st(d.roles[l[0]]) + '</div>' +
          '<div class="utt" lang="uk">' + (showText ? st(l[1]) : '<button class="reveal" data-i="' + i + '">• • • pokaż</button>') + '</div>' +
          (showPl ? '<div class="plt">' + esc(l[2]) + '</div>' : '') +
          '<div class="tools">' + '<button class="tb1" data-a="say" data-i="' + i + '" aria-label="Odsłuchaj">' + ic('vol') + '</button>' +
          (SP.canRecord() ? '<button class="tb1 ' + (recIdx === i ? 'rec' : '') + '" data-a="rec" data-i="' + i + '" aria-label="Nagraj się">' + ic(recIdx === i ? 'stop' : 'mic') + '</button>' : '') +
          (mine[i] ? '<button class="tb1" data-a="mine" data-i="' + i + '" aria-label="Moje nagranie">' + ic('play') + '<small>ja</small></button><button class="tb1" data-a="cmp" data-i="' + i + '" aria-label="Wzór, potem ja">' + ic('swap') + '<small>porównaj</small></button>' : '') +
          (SP.canRecognize() ? '<button class="tb1" data-a="sr" data-i="' + i + '" aria-label="Rozpoznawanie mowy">' + ic('target') + '<small>rozpoznaj</small></button>' : '') +
          '</div><div class="srres" id="sr' + i + '"></div></div>';
      }).join('') + '</div><div id="rp"></div>';
      if (SP.canRecognize()) h += '<p class="muted small">„Rozpoznaj” sprawdza tylko, czy system rozpoznał słowa – nie ocenia poprawności wymowy (zaliczy np. хліб wymówione z [p]). Traktuj to jako zabawę.</p>';
      main.innerHTML = h;
      bind();
    }
    function bind() {
      $('#all').onclick = function () { if (running) { stop(); return; } playSeq(0, -1); };
      $('#rate').onclick = function () { rate = rate < 1 ? 1 : 0.75; render(); };
      $('#tt').onclick = function () { showText = !showText; render(); };
      $('#tp').onclick = function () { showPl = !showPl; render(); };
      $$('.reveal').forEach(function (b) { b.onclick = function () { var i = +b.getAttribute('data-i'); b.parentNode.innerHTML = st(d.lines[i][1]); }; });
      $$('.role').forEach(function (b) { b.onclick = function () { roleplay(+b.getAttribute('data-r')); }; });
      $$('.tb1').forEach(function (b) {
        b.onclick = function () {
          var i = +b.getAttribute('data-i'), a = b.getAttribute('data-a'), line = d.lines[i][1];
          if (a === 'say') { hl(i); SP.speak(line, { rate: rate, onend: function () { hl(-1); } }); }
          if (a === 'rec') {
            if (recIdx === i) { SP.stopRec().then(function (url) { mine[i] = url; recIdx = -1; render(); }); }
            else { SP.startRec().then(function () { recIdx = i; render(); }).catch(function () { G.toast('Brak dostępu do mikrofonu', 'Zezwól przeglądarce na mikrofon'); }); }
          }
          if (a === 'mine') SP.playUrl(mine[i]);
          if (a === 'cmp') { hl(i); SP.speak(line, { rate: rate, onend: function () { setTimeout(function () { SP.playUrl(mine[i], function () { hl(-1); }); }, 300); } }); markDone(); }
          if (a === 'sr') {
            var box = $('#sr' + i); box.innerHTML = '<span class="muted">Słucham… powiedz kwestię.</span>';
            try {
              SP.recognize(function (err, alts) {
                if (err) { box.innerHTML = '<span class="badc">Nie udało się (' + esc(err) + ').</span>'; return; }
                var exp = norm(line).split(' '), best = 0, bestAlt = alts[0];
                alts.forEach(function (al) { var got = norm(al).split(' '), hit = exp.filter(function (w) { return got.indexOf(w) >= 0; }).length / exp.length; if (hit > best) { best = hit; bestAlt = al; } });
                box.innerHTML = 'Rozpoznano: <span lang="uk">„' + esc(bestAlt) + '”</span> – ' + (best >= 1 ? '<b class="okc">wszystkie słowa</b>' : '<b class="mid">' + Math.round(best * 100) + '% słów</b>');
                if (best >= .8) G.addXP(2);
              });
            } catch (e) { box.innerHTML = '<span class="badc">Rozpoznawanie niedostępne.</span>'; }
          }
        };
      });
    }
    function hl(i) { $$('.bub').forEach(function (b) { b.classList.toggle('now', +b.getAttribute('data-i') === i); }); var el = $('.bub.now'); if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
    function stop() { stopFlag = true; running = false; if ('speechSynthesis' in window) speechSynthesis.cancel(); hl(-1); $('#all').innerHTML = ic('play') + ' Cały dialog'; $('#rp').innerHTML = ''; }
    function playSeq(i, userRole) {
      stopFlag = false; running = true; $('#all').innerHTML = ic('stop') + ' Zatrzymaj';
      (function step(i) {
        if (stopFlag) return;
        if (i >= d.lines.length) { running = false; hl(-1); $('#all').innerHTML = ic('play') + ' Cały dialog'; $('#rp').innerHTML = userRole >= 0 ? '<div class="card note"><b>Koniec scenki.</b> Spróbuj teraz drugiej roli albo ukryj tekst.</div>' : ''; markDone(); return; }
        var l = d.lines[i]; hl(i);
        if (l[0] === userRole) {
          $('#rp').innerHTML = '<div class="card yourturn"><b>Twoja kwestia</b><p>' + esc(l[2]) + '</p><p class="muted small">Powiedz ją na głos po ukraińsku.</p><div class="row"><button class="btn" id="hint">Pokaż tekst</button><button class="btn primary" id="go">Dalej</button></div><div id="hintx"></div></div>';
          $('#hint').onclick = function () { $('#hintx').innerHTML = '<p lang="uk" class="ua">' + st(l[1]) + '</p>' + say(l[1]); };
          $('#go').onclick = function () { $('#rp').innerHTML = ''; step(i + 1); };
          $('#rp').scrollIntoView && $('#rp').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        } else SP.speak(l[1], { rate: rate, onend: function () { setTimeout(function () { step(i + 1); }, 450); } });
      })(i);
    }
    function roleplay(r) { showText = false; render(); playSeq(0, r); }
    function markDone() { if (!S.dialogs[d.id]) { S.dialogs[d.id] = U.today(); G.save(); G.addXP(15); G.checkBadges(); } else G.addXP(3); }
    cleanup = function () { stopFlag = true; if (recIdx >= 0) SP.stopRec(); };
    render();
  };

  /* ============================================================
     DYKTANDO
     ============================================================ */
  V.dyktando = function (dlg) {
    var pool = [];
    UA.DIALOGS.forEach(function (d) { if (!dlg || d.id === dlg) d.lines.forEach(function (l) { pool.push([l[1], l[2]]); }); });
    if (!dlg) UA.WORDS.forEach(function (w) { if (w.ex) pool.push([w.ex, w.exPl]); });
    var item, tries = 0;
    var h = head('Dyktando', 'Posłuchaj zdania i wpisz, co słyszysz. Akcentów nie trzeba wpisywać; interpunkcja i wielkość liter nie są oceniane.' + (dlg ? ' Zdania z jednego dialogu.' : ''), dlg ? '#/dialog/' + dlg : null);
    h += '<div class="card fc"><div class="row center"><button class="btn primary big-say" id="p1">' + ic('vol') + ' Odsłuchaj</button><button class="btn" id="p2">' + ic('slow') + ' wolno</button><button class="btn ghost" id="hintb">Podpowiedź (PL)</button></div><p id="hint" class="muted center"></p>' +
      '<div class="ansrow"><input id="ans" class="answer" placeholder="wpisz po ukraińsku…"><button class="btn primary" id="chk">Sprawdź</button></div><div id="kbh"></div><div id="res"></div></div>' +
      '<p class="muted small">Zrobione dyktanda (≥ 90%): ' + S.stats.dict + '</p>';
    main.innerHTML = h;
    var inp = $('#ans');
    $('#kbh').appendChild(UA.KB(inp, check));
    function newItem() { item = U.pick(pool); tries = 0; inp.value = ''; inp.disabled = false; $('#res').innerHTML = ''; $('#hint').textContent = ''; $('#chk').textContent = 'Sprawdź'; $('#chk').onclick = check; $('#kbh').style.display = ''; setTimeout(function () { SP.speak(item[0]); }, 300); }
    $('#p1').onclick = function () { SP.speak(item[0]); };
    $('#p2').onclick = function () { SP.speak(item[0], { rate: .65 }); };
    $('#hintb').onclick = function () { $('#hint').textContent = item[1]; };
    function check() {
      var exp = norm(item[0]).split(' '), got = norm(inp.value).split(' ').filter(Boolean);
      if (!got.length) return;
      // najdłuższy wspólny podciąg słów
      var m = exp.length, n = got.length, L = [], i, j;
      for (i = 0; i <= m; i++) { L[i] = []; for (j = 0; j <= n; j++) L[i][j] = 0; }
      for (i = m - 1; i >= 0; i--) for (j = n - 1; j >= 0; j--) L[i][j] = exp[i] === got[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
      var hit = {}; i = 0; j = 0; while (i < m && j < n) { if (exp[i] === got[j]) { hit[i] = 1; i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) i++; else j++; }
      var score = Object.keys(hit).length / exp.length;
      var words = strip(item[0]).split(/\s+/), sw = item[0].split(/\s+/);
      $('#res').innerHTML = '<div class="verdict ' + (score >= .9 ? 'ok' : score >= .6 ? 'typo' : 'bad') + '"><b>' + Math.round(score * 100) + '%</b> ' + (score >= .9 ? G.praise() : 'Porównaj z wzorem:') + '</div>' +
        '<p class="dict" lang="uk">' + sw.map(function (w, k) { return '<span class="' + (hit[k] ? 'okw' : 'badw') + '">' + st(w) + '</span>'; }).join(' ') + ' ' + say(item[0]) + '</p><p class="muted">' + esc(item[1]) + '</p>';
      inp.disabled = true; $('#kbh').style.display = 'none';
      G.addXP(Math.round(score * 8)); G.sfx(score >= .9 ? 'ok' : 'bad');
      if (score >= .9) { S.stats.dict++; G.save(); G.checkBadges(); }
      $('#chk').textContent = 'Następne'; $('#chk').onclick = newItem;
      void words;
    }
    newItem();
  };

  /* ============================================================
     GRAMATYKA KONTRASTOWA
     ============================================================ */
  V.gramatyka = function () {
    var h = head('Gramatyka', 'Bez pełnego kursu – tylko to, co działa inaczej niż w polskim i gdzie Polak kalkuje.');
    h += '<section class="dlist">' + UA.GRAMMAR.map(function (g, i) {
      var sc = S.grammar[g.id];
      return '<a class="card dl" href="#/lekcja/' + g.id + '"><span class="num">' + (i + 1) + '</span><div><b>' + esc(g.t) + '</b><small>' + g.quiz.length + ' pytań</small></div>' + (sc != null ? '<span class="tag ' + (sc >= .75 ? 'sim-t' : 'sim-p') + '">' + Math.round(sc * 100) + '%</span>' : '') + '</a>';
    }).join('') + '</section>';
    main.innerHTML = h;
  };
  V.lekcja = function (id) {
    var g = UA.GRAMMAR.filter(function (x) { return x.id === id; })[0]; if (!g) { location.hash = '#/gramatyka'; return; }
    var idx = UA.GRAMMAR.indexOf(g), nxt = UA.GRAMMAR[idx + 1];
    var h = head(esc(g.t), '', '#/gramatyka') + '<section class="card lesson" lang="pl">' + g.b.replace(/<td>([^<]*[а-яіїєґ][^<]*)<\/td>/gi, function (m, t) { return '<td lang="uk">' + st(t) + '</td>'; }) + '</section>';
    h += '<h2 class="sec">Sprawdź się</h2>' + g.quiz.map(function (q, i) {
      return '<div class="card qz" data-q="' + i + '"><p><b>' + (i + 1) + '.</b> ' + esc(q[0]) + '</p><div class="opts">' + q[1].map(function (o, k) { return '<button class="btn opt" data-k="' + k + '" lang="uk">' + st(o) + '</button>'; }).join('') + '</div></div>';
    }).join('') + '<div id="sum"></div>';
    main.innerHTML = h;
    var answered = 0, good = 0;
    $$('.qz').forEach(function (box) {
      var q = g.quiz[+box.getAttribute('data-q')];
      $$('.opt', box).forEach(function (b) {
        b.onclick = function () {
          var k = +b.getAttribute('data-k');
          $$('.opt', box).forEach(function (x) { x.disabled = true; if (+x.getAttribute('data-k') === q[2]) x.classList.add('right'); });
          if (k === q[2]) { good++; G.addXP(3); G.sfx('ok'); } else { b.classList.add('wrong'); G.sfx('bad'); }
          SP.speak(q[1][q[2]]);
          answered++;
          if (answered === g.quiz.length) {
            var sc = good / g.quiz.length; S.grammar[g.id] = Math.max(S.grammar[g.id] || 0, sc); G.save(); G.checkBadges();
            $('#sum').innerHTML = '<section class="card empty"><h2>' + good + '/' + g.quiz.length + '</h2><p>' + (sc >= .75 ? 'Lekcja zaliczona.' : 'Przeczytaj jeszcze raz tabelę i spróbuj ponownie.') + '</p><div class="row">' + (nxt ? '<a class="btn primary" href="#/lekcja/' + nxt.id + '">Następna: ' + esc(nxt.t) + '</a>' : '<a class="btn primary" href="#/gramatyka">Lista lekcji</a>') + '<button class="btn" id="redo">Powtórz</button></div></section>';
            $('#redo').onclick = route;
          }
        };
      });
    });
  };

  /* ============================================================
     ALFABET
     ============================================================ */
  V.alfabet = function (mode) {
    if (mode === 'quiz') return abcQuiz();
    var h = head('Alfabet', 'Cyrylica ukraińska ma 33 litery i apostrof. Kropka przy literze oznacza różnicę względem rosyjskiego (і, ї, є, ґ, и, е).');
    h += '<div class="row"><a class="btn primary" href="#/alfabet/quiz">' + ic('target') + ' Ćwiczenie: przeczytaj słowo</a><span class="muted">Obejrzane: ' + Object.keys(S.stats.abc).length + '/' + UA.ALPHABET.length + '</span></div>';
    h += '<div id="det"></div><section class="abc">' + UA.ALPHABET.map(function (a, i) {
      return '<button class="lt-tile ' + (S.stats.abc[i] ? 'seen' : '') + '" data-i="' + i + '">' + (a[6] ? '<i class="dot" title="inaczej niż w rosyjskim"></i>' : '') + '<b lang="uk">' + esc(a[0]) + '</b><small>' + esc(a[1]) + '</small></button>';
    }).join('') + '</section>';
    h += '<section class="card note"><h2>Transliteracja</h2><p>Zapis łaciński pod słowami (np. <i>chlib</i>) to tylko rusztowanie na początek. Wyłącz go w Ustawieniach, gdy tylko poczujesz się pewnie z cyrylicą.</p><label class="sw"><input type="checkbox" id="trs"' + (S.settings.translit ? ' checked' : '') + '> Pokazuj transliterację</label></section>';
    main.innerHTML = h;
    $('#trs').onchange = function () { S.settings.translit = this.checked; G.save(); };
    $$('.lt-tile').forEach(function (b) {
      b.onclick = function () {
        var i = +b.getAttribute('data-i'), a = UA.ALPHABET[i];
        if (!S.stats.abc[i]) { S.stats.abc[i] = 1; G.save(); G.addXP(1); }
        b.classList.add('seen');
        $$('.lt-tile').forEach(function (x) { x.classList.toggle('on', x === b); });
        $('#det').innerHTML = '<div class="card letter"><div class="lbig" lang="uk">' + esc(a[0]) + '</div><div><p><b>' + esc(a[1]) + '</b> <span class="ipa">[' + esc(a[2]) + ']</span></p><p>' + esc(a[3]) + '</p>' +
          '<p class="exw">' + say(a[4]) + uaw(a[4], 'bigish') + ' <span class="muted">– ' + esc(a[5]) + '</span></p></div></div>';
        SP.speak(a[4]);
        $('#det').scrollIntoView && $('#det').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      };
    });
  };
  function abcQuiz() {
    var pool = UA.WORDS.filter(function (w) { var s = strip(w.ua); return s.indexOf(' ') < 0 && s.indexOf('/') < 0 && s.length >= 3 && s.length <= 9; });
    var k = 0, good = 0, N = 10;
    main.innerHTML = head('Przeczytaj słowo', 'Wybierz poprawny zapis łaciński. Ćwiczenie oswaja z cyrylicą – potem wyłącz transliterację.', '#/alfabet') + '<div class="sessbar"></div><div id="stage"></div>';
    function q() {
      if (k >= N) { $('#stage').innerHTML = '<section class="card empty"><h2>' + good + '/' + N + '</h2><div class="row"><button class="btn primary" id="again">Jeszcze raz</button><a class="btn" href="#/alfabet">Alfabet</a></div></section>'; $('#again').onclick = abcQuiz; return; }
      var w = U.pick(pool), right = strip(U.translit(w.ua));
      var others = U.shuffle(pool.filter(function (x) { return x !== w && Math.abs(strip(x.ua).length - strip(w.ua).length) <= 2; })).map(function (x) { return strip(U.translit(x.ua)); }).filter(function (t) { return t !== right; }).slice(0, 2);
      var opts = U.shuffle([right].concat(others));
      $('.sessbar').innerHTML = bar(k, N) + '<span>' + (k + 1) + '/' + N + '</span>';
      $('#stage').innerHTML = '<div class="card fc"><div class="big ua" lang="uk">' + st(w.ua) + '</div></div><div class="opts">' + opts.map(function (o) { return '<button class="btn opt" data-o="' + esc(o) + '">' + esc(o) + '</button>'; }).join('') + '</div><div id="fb"></div>';
      $$('.opt').forEach(function (b) {
        b.onclick = function () {
          $$('.opt').forEach(function (x) { x.disabled = true; if (x.getAttribute('data-o') === right) x.classList.add('right'); });
          if (b.getAttribute('data-o') === right) { good++; G.addXP(2); G.sfx('ok'); } else { b.classList.add('wrong'); G.sfx('bad'); }
          SP.speak(w.ua);
          $('#fb').innerHTML = '<p class="center">' + esc(w.pl) + '</p><button class="btn primary block" id="nx">Dalej</button>'; $('#nx').onclick = function () { k++; q(); };
        };
      });
    }
    q();
  }

  /* ============================================================
     WIĘCEJ (menu na telefonie) i USTAWIENIA
     ============================================================ */
  V.wiecej = function () {
    main.innerHTML = head('Więcej') + '<section class="dlist">' + NAV.filter(function (n) { return !n[3]; }).map(function (n) {
      return '<a class="card dl" href="#/' + n[0] + '">' + ic(n[2]) + '<div><b>' + n[1] + '</b></div>' + ic('next') + '</a>';
    }).join('') + '</section>';
  };
  V.ustawienia = function () {
    var s = S.settings, vs = SP.voiceStatus();
    var h = head('Ustawienia');
    h += '<section class="card form">' +
      '<label>Nowe słowa dziennie <input type="number" id="npd" min="0" max="50" value="' + s.newPerDay + '"></label>' +
      '<label>Cel dzienny (XP) <input type="number" id="goal" min="10" max="500" step="10" value="' + s.goal + '"></label>' +
      '<label class="sw"><input type="checkbox" id="str"' + (s.stress ? ' checked' : '') + '> Zaznaczaj akcent</label>' +
      '<label class="sw"><input type="checkbox" id="trs"' + (s.translit ? ' checked' : '') + '> Transliteracja (rusztowanie na początek)</label>' +
      '<label class="sw"><input type="checkbox" id="ap"' + (s.autoplay ? ' checked' : '') + '> Automatycznie czytaj słowo na karcie</label>' +
      '<label class="sw"><input type="checkbox" id="kb"' + (s.sysKb ? ' checked' : '') + '> Używaj też klawiatury systemowej telefonu</label>' +
      '<label class="sw"><input type="checkbox" id="snd"' + (s.sound ? ' checked' : '') + '> Dźwięki</label>' +
      '<label>Tempo mowy <select id="rate"><option value="0.75"' + (s.rate < 1 ? ' selected' : '') + '>0,75×</option><option value="1"' + (s.rate >= 1 ? ' selected' : '') + '>1×</option></select></label>' +
      '<label>Motyw <select id="th"><option value="">czarno-fioletowy</option><option value="light"' + (s.theme === 'light' ? ' selected' : '') + '>jasny fioletowy</option></select></label></section>';
    h += '<section class="card"><h2>' + ic('vol') + ' Głos</h2><p>' + (vs.ok ? 'Używany głos: <b>' + esc(vs.name) + '</b>' : esc(vs.msg)) + '</p><button class="btn" data-say="Приві́т! Це украї́нська мо́ва.">' + ic('play') + ' Test głosu</button></section>';
    if (!vs.ok) h += voiceHelp(vs);
    h += '<section class="card"><h2>Postęp</h2><p class="muted">Postęp jest zapisany tylko w tej przeglądarce. Zrób kopię, żeby przenieść go na inne urządzenie.</p><div class="row"><button class="btn" id="exp">Eksportuj (plik)</button><label class="btn">Importuj<input type="file" id="imp" accept=".json,application/json" hidden></label><button class="btn danger" id="rst">Wyzeruj wszystko</button></div></section>';
    h += '<section class="card note"><h2>O treściach</h2><p>Słownictwo ' + UA.WORDS.length + ' słów (A1), ' + UA.FRIENDS.length + ' fałszywych przyjaciół, ' + UA.DIALOGS.length + ' dialogów, ' + UA.GRAMMAR.length + ' lekcji gramatyki. Pisownia według правопису z 2019 r., unikanie rusycyzmów i surżyku.</p><p><b>Ważne:</b> treść przygotowano bez udziału native speakera. Akcenty, przykłady i dialogi warto dać do sprawdzenia osobie z Ukrainy – tego nie zastąpi ani model językowy, ani synteza mowy.</p></section>';
    main.innerHTML = h;
    function upd(k, v) { s[k] = v; G.save(); }
    $('#npd').onchange = function () { upd('newPerDay', Math.max(0, Math.min(50, +this.value || 0))); };
    $('#goal').onchange = function () { upd('goal', Math.max(10, +this.value || 50)); renderStatus(); };
    $('#str').onchange = function () { upd('stress', this.checked); };
    $('#trs').onchange = function () { upd('translit', this.checked); };
    $('#ap').onchange = function () { upd('autoplay', this.checked); };
    $('#kb').onchange = function () { upd('sysKb', this.checked); };
    $('#snd').onchange = function () { upd('sound', this.checked); };
    $('#rate').onchange = function () { upd('rate', +this.value); };
    $('#th').onchange = function () { upd('theme', this.value); applyTheme(); };
    $('#exp').onclick = function () {
      var blob = new Blob([JSON.stringify(S)], { type: 'application/json' }), a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = 'ukrainski-postep-' + new Date().toISOString().slice(0, 10) + '.json'; a.click();
    };
    $('#imp').onchange = function () {
      var f = this.files[0]; if (!f) return;
      f.text().then(function (t) { var o = JSON.parse(t); if (!o.srs) throw 0; localStorage.setItem(G.KEY, JSON.stringify(o)); location.reload(); }).catch(function () { G.toast('Nieprawidłowy plik', 'To nie jest kopia postępu z tej aplikacji'); });
    };
    $('#rst').onclick = function () { if (confirm('Na pewno usunąć cały postęp? Tego nie da się cofnąć.')) { localStorage.removeItem(G.KEY); location.reload(); } };
  };

  function applyTheme() { document.documentElement.setAttribute('data-theme', S.settings.theme === 'light' ? 'light' : 'dark'); var m = document.querySelector('meta[name=theme-color]'); if (m) m.setAttribute('content', S.settings.theme === 'light' ? '#f6f4fb' : '#0b0a12'); }
  applyTheme();
  route();
})();
