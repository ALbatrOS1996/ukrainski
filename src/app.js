/* ============================================================
   INTERFEJS: router i ekrany
   ============================================================ */
(function () {
  'use strict';
  var U = UA.U, G = UA.G, S = G.S, SRS = UA.SRS, SP = UA.SP;
  var esc = U.esc, st = U.st, strip = U.strip, norm = U.norm;
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
    user: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>'
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
    ['start', 'Start', 'home', 1], ['slowka', 'Słówka', 'cards', 1], ['wymowa', 'Wymowa', 'ear', 1], ['dialogi', 'Dialogi', 'chat', 1],
    ['alfabet', 'Alfabet', 'abc'], ['przyjaciele', 'Fałszywi przyjaciele', 'alert'], ['gramatyka', 'Gramatyka', 'book'],
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
  function route() {
    if (cleanup) { try { cleanup(); } catch (e) { } cleanup = null; }
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    var h = (location.hash || '#/start').slice(2).split('/');
    var name = h[0] || 'start';
    if (!V[name]) name = 'start';
    renderNav(name === 'nauka' || name === 'test' ? 'slowka' : name === 'dialog' ? 'dialogi' : name === 'lekcja' ? 'gramatyka' : name);
    renderStatus();
    main.innerHTML = '';
    V[name].apply(null, h.slice(1));
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);

  /* ============================================================
     START
     ============================================================ */
  V.start = function () {
    var hr = new Date().getHours(), hello = hr < 11 ? 'До́брого ра́нку!' : hr < 18 ? 'До́брий день!' : 'До́брий ве́чір!';
    var L = G.level(), vs = SP.voiceStatus();
    var r = SRS.mastery('r'), p = SRS.mastery('p');
    var dr = SRS.due('r').length, dp = SRS.due('p').length, nr = Math.min(SRS.newLeft('r'), SRS.fresh('r').length), np = Math.min(SRS.newLeft('p'), SRS.fresh('p').length);
    var h = '<section class="hero"><div><p class="kicker">Ukraiński dla Polaka</p><h1 lang="uk">' + st(hello) + '</h1><p class="lead">' +
      (dr + dp ? 'Na dziś: <b>' + (dr + dp) + '</b> powtórek i <b>' + (nr + np) + '</b> nowych kart.' : nr ? 'Brak zaległych powtórek – możesz poznać <b>' + nr + '</b> nowych słów.' : 'Wszystko powtórzone. Чудо́во!') + '</p></div>' +
      '<div class="lvcard"><span class="lvbadge">' + ic('star') + '</span><div><b lang="uk">' + st(L.name) + '</b><small>' + esc(L.pl) + ' · ' + S.xp + ' XP</small>' + bar(S.xp - L.from, L.to - L.from) + '<small>' + (L.next ? 'do awansu: ' + (L.to - S.xp) + ' XP' : 'najwyższy stopień') + '</small></div></div></section>';
    if (!vs.ok) h += voiceHelp(vs);
    if (!S.seenIntro) h += '<section class="card intro"><h2>Jak działa ta aplikacja</h2><p>Polak rozumie po ukraińsku „z grubsza” bardzo szybko – i równie szybko utrwala błędy. Dlatego mniej czasu idzie tu na słowa przezroczyste, a więcej na to, co się różni: <b>akcent</b> (zaznaczony w każdym słowie), <b>fałszywych przyjaciół</b>, dźwięki <b>и/і</b> i <b>г/ґ</b> oraz gramatykę inną niż polska.</p><p><b>Rozpoznawanie</b> (UA→PL) i <b>produkcja</b> (PL→UA) liczą się osobno – rozpoznawanie jest dla Polaka dużo łatwiejsze i wspólny wynik zawyżałby postęp.</p><div class="row"><a class="btn primary" href="#/test">Test wejściowy: zalicz słowa, które już rozumiesz</a><a class="btn" href="#/alfabet">Zacznij od alfabetu</a><button class="btn ghost" id="hideIntro">Rozumiem, ukryj</button></div></section>';
    h += '<section class="duo">' + dirCard('r', 'Rozpoznawanie', 'UA → PL', dr, nr, r) + dirCard('p', 'Produkcja', 'PL → UA', dp, np, p) + '</section>';
    h += '<h2 class="sec">Ćwiczenia</h2><section class="tiles">' + [
      ['alfabet', 'abc', 'Alfabet', 'litery i dźwięki'], ['przyjaciele', 'alert', 'Fałszywi przyjaciele', S.stats.ff + ' trafień'],
      ['wymowa', 'ear', 'Wymowa', 'и/і, г/ґ, akcent'], ['dialogi', 'chat', 'Dialogi', Object.keys(S.dialogs).length + '/' + UA.DIALOGS.length + ' przećwiczone'],
      ['gramatyka', 'book', 'Gramatyka', 'tylko to, co inne'], ['dyktando', 'pen', 'Dyktando', 'słuchaj i pisz']
    ].map(function (t) { return '<a class="tile" href="#/' + t[0] + '">' + ic(t[1]) + '<b>' + t[2] + '</b><small>' + t[3] + '</small></a>'; }).join('') + '</section>';
    h += '<h2 class="sec">Odznaki</h2><section class="badges">' + G.BADGES.map(function (b) {
      return '<div class="bdg ' + (S.badges[b[0]] ? 'got' : '') + '" title="' + esc(b[2]) + '">' + ic('trophy') + '<b lang="uk">' + st(b[1]) + '</b><small>' + esc(b[2]) + '</small></div>';
    }).join('') + '</section>';
    main.innerHTML = h;
    var hi = $('#hideIntro'); if (hi) hi.onclick = function () { S.seenIntro = true; G.save(); route(); };
  };
  function dirCard(dir, name, arrow, due, nw, m) {
    return '<div class="card dir"><div class="dirh"><h2>' + name + '</h2><span class="arrow">' + arrow + '</span></div>' +
      '<div class="nums"><div><b>' + due + '</b><small>do powtórki</small></div><div><b>' + nw + '</b><small>nowe dziś</small></div><div><b>' + m.known + '</b><small>opanowane</small></div></div>' +
      bar(m.learning, m.total) + '<small class="muted">' + m.learning + ' z ' + m.total + ' słów w nauce' + (dir === 'p' && !m.learning ? ' · produkcja odblokowuje się po rozpoznawaniu' : '') + '</small>' +
      '<a class="btn primary block" href="#/nauka/' + dir + '">' + (due + nw ? 'Ucz się (' + (due + nw) + ')' : 'Przeglądaj dalej') + '</a></div>';
  }
  function voiceHelp(vs) {
    return '<section class="card warn"><h2>' + ic('vol') + ' Głos ukraiński</h2><p>' + esc(vs.msg) + ' Bez niego aplikacja działa, ale nie usłyszysz wymowy.</p><ul>' +
      '<li><b>Android:</b> Ustawienia → Zarządzanie ogólne / System → Zamiana tekstu na mowę → Usługi Google → Zainstaluj dane głosowe → <i>українська</i>.</li>' +
      '<li><b>iPhone:</b> Ustawienia → Dostępność → Treść mówiona → Głosy → Ukraiński.</li>' +
      '<li><b>Windows:</b> najprościej otworzyć aplikację w przeglądarce <b>Edge</b> (ma głosy uk-UA). W Chrome: Ustawienia Windows → Czas i język → Mowa → Dodaj głosy → Українська.</li></ul>' +
      '<p class="muted small">Uwaga z analizy: synteza mowy potrafi źle postawić akcent. Ufaj zaznaczonemu akcentowi w tekście bardziej niż głosowi.</p></section>';
  }

  /* ============================================================
     SŁÓWKA – menu
     ============================================================ */
  V.slowka = function () {
    var dr = SRS.due('r').length, dp = SRS.due('p').length;
    var h = head('Słówka', 'Słownictwo A1 z akcentem, formami i parami aspektowymi. Powtórki rozłożone w czasie (SM-2), osobno w obu kierunkach.');
    h += '<section class="duo">' + dirCard('r', 'Rozpoznawanie', 'UA → PL', dr, Math.min(SRS.newLeft('r'), SRS.fresh('r').length), SRS.mastery('r')) +
      dirCard('p', 'Produkcja', 'PL → UA', dp, Math.min(SRS.newLeft('p'), SRS.fresh('p').length), SRS.mastery('p')) + '</section>';
    h += '<section class="row"><a class="btn" href="#/test">' + ic('check') + ' Test wejściowy</a><a class="btn" href="#/slownik">' + ic('search') + ' Słownik</a><a class="btn" href="#/przyjaciele">' + ic('alert') + ' Fałszywi przyjaciele</a></section>';
    h += '<h2 class="sec">Tematy</h2><section class="topics">' + UA.TOPICS.map(function (t) {
      var ws = UA.WORDS.filter(function (w) { return w.topic === t.id; });
      var r = ws.filter(function (w) { var c = SRS.card(w, 'r'); return c && c.n >= 1; }).length, p = ws.filter(function (w) { var c = SRS.card(w, 'p'); return c && c.n >= 1; }).length;
      return '<a class="card topic" href="#/slownik/' + t.id + '"><b>' + esc(t.name) + '</b><small>' + ws.length + ' słów</small>' +
        '<div class="tb"><span>rozp.</span>' + bar(r, ws.length) + '</div><div class="tb"><span>prod.</span>' + bar(p, ws.length, 'gold') + '</div></a>';
    }).join('') + '</section>';
    h += '<p class="muted small">Nowe słowa wchodzą w kolejności tematów. Limit nowych kart na dzień zmienisz w Ustawieniach (teraz: ' + S.settings.newPerDay + ').</p>';
    main.innerHTML = h;
  };

  /* ============================================================
     SESJA NAUKI
     ============================================================ */
  V.nauka = function (dir) {
    dir = dir === 'p' ? 'p' : 'r';
    var t = U.today();
    var dueW = SRS.due(dir).sort(function (a, b) { return SRS.card(a, dir).d - SRS.card(b, dir).d; }).slice(0, 60);
    var newW = SRS.fresh(dir).slice(0, SRS.newLeft(dir));
    var queue = [];
    // przeplatanie: co trzecia karta nowa
    var i = 0, j = 0; while (i < dueW.length || j < newW.length) { if (i < dueW.length) queue.push(dueW[i++]); if (i < dueW.length) queue.push(dueW[i++]); if (j < newW.length) queue.push(newW[j++]); }
    var pos = 0, done = 0, ok = 0, retries = {};
    var title = dir === 'r' ? 'Rozpoznawanie <span class="arrow">UA → PL</span>' : 'Produkcja <span class="arrow">PL → UA</span>';
    if (!queue.length) {
      main.innerHTML = head(title, '', '#/slowka') + '<section class="card empty"><h2>Na dziś wszystko!</h2><p>' +
        (dir === 'p' && !SRS.mastery('r').learning ? 'Produkcja odblokowuje się dla słów, które już poznałeś w rozpoznawaniu.' : 'Brak powtórek i wyczerpany limit nowych słów. Wróć jutro albo zwiększ limit w ustawieniach.') +
        '</p><div class="row"><a class="btn primary" href="#/start">Start</a><a class="btn" href="#/dialogi">Poćwicz dialogi</a></div></section>';
      return;
    }
    function shell() {
      main.innerHTML = head(title, '', '#/slowka') + '<div class="sessbar">' + bar(pos, queue.length) + '<span>' + Math.min(pos + 1, queue.length) + '/' + queue.length + '</span></div><div id="stage"></div>';
    }
    shell();
    var keyH = null;
    function next() {
      if (pos >= queue.length) return finish();
      var w = queue[pos];
      $('.sessbar').innerHTML = bar(pos, queue.length) + '<span>' + (pos + 1) + '/' + queue.length + '</span>';
      (dir === 'r' ? showRec : showProd)(w, !SRS.card(w, dir));
    }
    function after(w, q, isNew) {
      if (isNew) SRS.countNew(dir);
      SRS.grade(w, dir, q);
      done++; if (q >= 3) ok++;
      if (q < 3) { var k = SRS.wid(w); retries[k] = (retries[k] || 0) + 1; if (retries[k] <= 2) queue.splice(Math.min(queue.length, pos + 4), 0, w); }
      G.addXP(q >= 3 ? (dir === 'p' ? 8 : 5) : 1);
      if (dir === 'p' && q >= 3) { S.stats.prodOk++; G.save(); }
      pos++; next();
    }
    function backHTML(w) {
      var s = SIM[w.sim];
      return '<div class="back"><div class="pl">' + esc(w.pl) + '</div>' +
        (w.forms ? '<div class="forms" lang="uk">' + st(w.forms) + '</div>' : '') +
        '<div class="tags"><span class="tag ' + s[1] + '">' + s[0] + '</span><span class="tag">' + esc(topicName(w.topic)) + '</span></div>' +
        (w.ex ? '<div class="ex"><p lang="uk">' + st(w.ex) + ' ' + say(w.ex) + '</p><p class="muted">' + esc(w.exPl) + '</p></div>' : '') +
        (w.sim === 'f' ? '<a class="small" href="#/przyjaciele">Uwaga: fałszywy przyjaciel – zobacz moduł</a>' : '') + '</div>';
    }
    function gradeBtns(w, set) {
      return '<div class="grades">' + set.map(function (g) {
        return '<button class="btn g' + g[0] + '" data-q="' + g[0] + '"><b>' + g[1] + '</b><small>' + (g[0] < 3 ? 'jeszcze raz' : days(SRS.preview(w, dir, g[0]))) + '</small><kbd>' + g[2] + '</kbd></button>';
      }).join('') + '</div>';
    }
    function bindGrades(w, isNew) {
      $$('.grades [data-q]').forEach(function (b) { b.onclick = function () { after(w, +b.getAttribute('data-q'), isNew); }; });
    }
    function showRec(w, isNew) {
      var stg = $('#stage');
      stg.innerHTML = '<div class="card fc">' + (isNew ? '<span class="newtag">nowe</span>' : '') + '<div class="meta">' + esc(POS[w.pos] || '') + '</div>' +
        '<div class="big">' + uaw(w.ua) + '</div><div class="sayrow">' + sayBoth(w.ua) + '</div><div id="bk"></div></div>' +
        '<div class="actions" id="act"><button class="btn primary block" id="show">Pokaż znaczenie <kbd>spacja</kbd></button></div>';
      if (S.settings.autoplay) SP.speak(w.ua);
      function reveal() {
        $('#bk').innerHTML = backHTML(w);
        $('#act').innerHTML = gradeBtns(w, [[1, 'Nie wiem', '1'], [3, 'Trudne', '2'], [4, 'Dobrze', '3'], [5, 'Łatwe', '4']]);
        bindGrades(w, isNew);
        keyH = function (e) { var m = { '1': 1, '2': 3, '3': 4, '4': 5 }[e.key]; if (m) after(w, m, isNew); };
      }
      $('#show').onclick = reveal;
      keyH = function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); reveal(); } };
    }
    function showProd(w, isNew) {
      var stg = $('#stage'), pair = w.ua.indexOf('/') > 0;
      var hint = POS[w.pos] + (pair ? ' – wpisz parę: niedokonany / dokonany' : '');
      stg.innerHTML = '<div class="card fc">' + (isNew ? '<span class="newtag">nowe</span>' : '') + '<div class="meta">' + esc(hint) + '</div>' +
        '<div class="big pl">' + esc(w.pl) + '</div>' +
        '<div class="ansrow"><input id="ans" class="answer" placeholder="po ukraińsku…"><button class="btn primary" id="chk">Sprawdź</button></div>' +
        '<div id="kbh"></div><div id="res"></div></div><div class="actions" id="act"><button class="btn ghost block" id="dunno">Nie wiem – pokaż</button></div>';
      var inp = $('#ans');
      $('#kbh').appendChild(UA.KB(inp, check));
      if (!('ontouchstart' in window) || S.settings.sysKb) inp.focus();
      $('#chk').onclick = check; $('#dunno').onclick = function () { result('bad'); };
      keyH = null;
      function check() {
        var a = norm(inp.value); if (!a) return;
        var exp = norm(w.ua);
        var expParts = exp.split('/').map(function (s) { return s.trim(); });
        var aParts = a.split(/\s*[\/,]\s*/).map(function (s) { return s.trim(); }).filter(Boolean);
        if (a === exp || (aParts.length === expParts.length && aParts.every(function (x, k) { return x === expParts[k]; }))) return result('ok');
        if (pair && aParts.length === 1 && aParts[0] === expParts[0]) return result('half');
        var d = U.lev(a.replace(/\s*\/\s*/g, '/'), exp.replace(/\s*\/\s*/g, '/'));
        if (d <= 1 && exp.length > 4) return result('typo', inp.value);
        result('bad', inp.value);
      }
      function result(kind, given) {
        inp.disabled = true; $('#kbh').innerHTML = ''; $('#chk').remove();
        var msg = { ok: '<b class="okc">' + G.praise() + '</b>', half: '<b class="mid">Brakuje formy dokonanej.</b> Ucz się par, nie pojedynczych form.', typo: '<b class="mid">Prawie – literówka?</b> Wpisałeś: <span lang="uk">' + esc(given) + '</span>', bad: given ? '<b class="badc">Niezupełnie.</b> Wpisałeś: <span lang="uk">' + esc(given) + '</span>' : '<b class="badc">Poprawna odpowiedź:</b>' }[kind];
        $('#res').innerHTML = '<div class="verdict ' + kind + '">' + msg + '</div><div class="big">' + uaw(w.ua) + '</div><div class="sayrow">' + sayBoth(w.ua) + '</div>' + backHTML(w).replace('<div class="pl">' + esc(w.pl) + '</div>', '');
        SP.speak(w.ua);
        G.sfx(kind === 'ok' ? 'ok' : 'bad');
        var set = kind === 'ok' ? [[3, 'Trudne', '1'], [4, 'Dobrze', '2'], [5, 'Łatwe', '3']] : kind === 'bad' ? [[1, 'Dalej', '1']] : [[1, 'Nie zaliczaj', '1'], [3, 'Zalicz jako trudne', '2']];
        $('#act').innerHTML = gradeBtns(w, set);
        bindGrades(w, isNew);
        keyH = function (e) { var b = $$('.grades [data-q]')[+e.key - 1]; if (b) b.click(); else if (e.key === 'Enter') $$('.grades [data-q]').pop().click(); };
      }
    }
    function finish() {
      document.removeEventListener('keydown', onKey);
      var pct = done ? Math.round(100 * ok / done) : 0;
      main.innerHTML = head(title, '', '#/slowka') + '<section class="card empty"><h2 lang="uk">' + st(pct >= 80 ? 'Чудо́во!' : 'До́бре!') + '</h2><p>Sesja zakończona: ' + done + ' odpowiedzi, ' + pct + '% zaliczonych.</p>' +
        '<div class="row"><a class="btn primary" href="#/start">Start</a>' + (dir === 'r' ? '<a class="btn" href="#/nauka/p">Teraz produkcja</a>' : '<a class="btn" href="#/dyktando">Dyktando</a>') + '</div></section>';
      if (pct >= 80 && done >= 5) G.confetti();
    }
    function onKey(e) { if (e.target.tagName === 'INPUT' && e.key !== 'Enter') return; if (keyH) keyH(e); }
    document.addEventListener('keydown', onKey);
    cleanup = function () { document.removeEventListener('keydown', onKey); };
    next();
  };

  /* ============================================================
     TEST WEJŚCIOWY – zaliczanie słów przezroczystych hurtem
     ============================================================ */
  V.test = function (topic) {
    topic = topic || UA.TOPICS[0].id;
    var ws = UA.WORDS.filter(function (w) { return w.topic === topic && (w.sim === 't' || w.sim === 'p') && !SRS.card(w, 'r'); });
    var h = head('Test wejściowy', 'Słowa przezroczyste i podobne nie muszą być wbijane pojedynczo. Dotknij słowa, które od razu rozumiesz – zobaczysz tłumaczenie, żeby się sprawdzić. Zaznaczone trafią do powtórek z długim odstępem (rozpoznawanie). Produkcję nadal przećwiczysz.', '#/slowka');
    h += '<div class="chips">' + UA.TOPICS.map(function (t) { return '<a class="chip ' + (t.id === topic ? 'on' : '') + '" href="#/test/' + t.id + '">' + esc(t.name) + '</a>'; }).join('') + '</div>';
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
    var h = head('Słownik', UA.WORDS.length + ' słów A1. Szukaj po ukraińsku (bez akcentów) lub po polsku.');
    h += '<div class="filters"><input id="q" type="search" placeholder="Szukaj…" aria-label="Szukaj"><select id="ft" aria-label="Temat"><option value="">Wszystkie tematy</option>' + UA.TOPICS.map(function (t) { return '<option value="' + t.id + '"' + (t.id === topic ? ' selected' : '') + '>' + esc(t.name) + '</option>'; }).join('') + '</select>' +
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
      '<label>Nowe słowa dziennie (w każdym kierunku) <input type="number" id="npd" min="0" max="50" value="' + s.newPerDay + '"></label>' +
      '<label>Cel dzienny (XP) <input type="number" id="goal" min="10" max="500" step="10" value="' + s.goal + '"></label>' +
      '<label class="sw"><input type="checkbox" id="str"' + (s.stress ? ' checked' : '') + '> Zaznaczaj akcent</label>' +
      '<label class="sw"><input type="checkbox" id="trs"' + (s.translit ? ' checked' : '') + '> Transliteracja (rusztowanie na początek)</label>' +
      '<label class="sw"><input type="checkbox" id="ap"' + (s.autoplay ? ' checked' : '') + '> Automatycznie czytaj słowo na karcie</label>' +
      '<label class="sw"><input type="checkbox" id="kb"' + (s.sysKb ? ' checked' : '') + '> Używaj też klawiatury systemowej telefonu</label>' +
      '<label class="sw"><input type="checkbox" id="snd"' + (s.sound ? ' checked' : '') + '> Dźwięki</label>' +
      '<label>Tempo mowy <select id="rate"><option value="0.75"' + (s.rate < 1 ? ' selected' : '') + '>0,75×</option><option value="1"' + (s.rate >= 1 ? ' selected' : '') + '>1×</option></select></label>' +
      '<label>Motyw <select id="th"><option value="">systemowy</option><option value="light"' + (s.theme === 'light' ? ' selected' : '') + '>jasny</option><option value="dark"' + (s.theme === 'dark' ? ' selected' : '') + '>ciemny</option></select></label></section>';
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

  function applyTheme() { if (S.settings.theme) document.documentElement.setAttribute('data-theme', S.settings.theme); else document.documentElement.removeAttribute('data-theme'); }
  applyTheme();
  route();
})();
