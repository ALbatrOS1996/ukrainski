/* ============================================================
   RDZEŃ: narzędzia tekstowe, stan, motywacja, mowa, klawiatura, SRS
   ============================================================ */
var UA = window.UA || (window.UA = {});
(function () {
  'use strict';
  var ACC = '́';
  var VOW = 'аеєиіїоуюяАЕЄИІЇОУЮЯ';

  /* ---------- Tekst ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function strip(s) { return String(s).split(ACC).join(''); }
  function norm(s) {
    return strip(String(s)).toLowerCase().replace(/[’ʼ'`´]/g, "'").replace(/[.,!?;:«»"„”…–—()]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  // wyraz z akcentem → HTML z wyróżnioną samogłoską akcentowaną
  function st(s) {
    var h = esc(s);
    if (!S.settings.stress) return strip(h);
    return h.replace(new RegExp('([' + VOW + '])' + ACC, 'g'), '<span class="st">$1' + ACC + '</span>');
  }
  // transliteracja na polski (rusztowanie dla początkujących)
  var TR = { а: 'a', б: 'b', в: 'w', г: 'h', ґ: 'g', д: 'd', е: 'e', ж: 'ż', з: 'z', и: 'y', і: 'i', ї: 'ji', й: 'j', к: 'k', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'ch', ц: 'c', ч: 'cz', ш: 'sz', щ: 'szcz' };
  var SOFT = { н: 'ń', с: 'ś', з: 'ź', ц: 'ć' };
  var IOT = { я: 'a', ю: 'u', є: 'e' };
  function translit(src) {
    var s = String(src), out = '';
    var chars = s.split('');
    function prevLetter(i) { for (var j = i - 1; j >= 0; j--) { if (chars[j] !== ACC) return chars[j].toLowerCase(); } return ''; }
    function nextLetter(i) { for (var j = i + 1; j < chars.length; j++) { if (chars[j] !== ACC) return chars[j].toLowerCase(); } return ''; }
    for (var i = 0; i < chars.length; i++) {
      var ch = chars[i], lo = ch.toLowerCase(), up = ch !== lo, r;
      if (ch === ACC) { out += ACC; continue; }
      if (lo === 'л') { r = /[іяюєь]/.test(nextLetter(i)) ? 'l' : 'ł'; }
      else if (lo === 'ь') { var p = prevLetter(i); r = ''; if (SOFT[p]) { out = out.slice(0, -1) + SOFT[p]; continue; } if (p !== 'л') r = 'ʹ'; }
      else if (IOT[lo]) { var pv = prevLetter(i); r = (pv && /[бвгґджзклмнпрстфхцчшщ]/.test(pv)) ? (pv === 'л' ? IOT[lo] : 'i' + IOT[lo]) : 'j' + IOT[lo]; }
      else if (TR[lo] != null) r = TR[lo];
      else if (/[’ʼ']/.test(ch)) r = '';
      else r = ch;
      if (up && r) r = r.charAt(0).toUpperCase() + r.slice(1);
      out += r;
    }
    return out;
  }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function lev(a, b) {
    var m = a.length, n = b.length, d = [], i, j;
    for (i = 0; i <= m; i++) { d[i] = [i]; } for (j = 0; j <= n; j++) d[0][j] = j;
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
  }
  function today() { var d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000); }

  /* ---------- Stan ---------- */
  var KEY = 'ukrainski_dla_polaka_v1';
  var S = {
    srs: {}, newDay: { d: 0, r: 0, p: 0 },
    settings: { newPerDay: 10, translit: true, stress: true, rate: 1, autoplay: true, theme: '', sound: true, sysKb: false, goal: 30 },
    days: [], xp: 0, xpLog: {}, badges: {}, goalDays: [],
    stats: { ff: 0, pairs: 0, stress: 0, dict: 0, gg: 0, abc: {}, prodOk: 0 }, grammar: {}, dialogs: {}, seenIntro: false
  };
  try {
    var raw = localStorage.getItem(KEY);
    if (raw) { var o = JSON.parse(raw); Object.keys(o).forEach(function (k) { if (k === 'settings' || k === 'stats') Object.keys(o[k]).forEach(function (s) { S[k][s] = o[k][s]; }); else S[k] = o[k]; }); }
    if (!S.xp1) { if (S.settings.goal === 50) S.settings.goal = 30; S.xp1 = 1; } // od 2026-10: 1 dobra odpowiedź = 1 XP
  } catch (e) { }
  function save() {
    var t = today(); if (S.days.indexOf(t) < 0) { S.days.push(t); S.days = S.days.slice(-500); }
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { }
  }
  function streak() { var t = today(), n = 0; if (S.days.indexOf(t) < 0) t--; while (S.days.indexOf(t - n) >= 0) n++; return n; }
  function xpToday() { return S.xpLog[today()] || 0; }

  /* ---------- Poziomy: stopnie kozackie ---------- */
  var LEVELS = [
    [0, 'Джу́ра', 'giermek kozacki'], [100, 'Коза́к', 'kozak'], [300, 'Деся́тник', 'dziesiętnik'], [700, 'Курінни́й', 'kureniowy'],
    [1200, 'Со́тник', 'setnik'], [2000, 'Осаву́л', 'osauł'], [3000, 'Полко́вник', 'pułkownik'], [4500, 'Генера́льний пи́сар', 'pisarz generalny'], [6500, 'Ге́тьман', 'hetman']
  ];
  function level(xp) {
    if (xp == null) xp = S.xp;
    var i = 0; while (i + 1 < LEVELS.length && xp >= LEVELS[i + 1][0]) i++;
    var from = LEVELS[i][0], to = LEVELS[i + 1] ? LEVELS[i + 1][0] : from + 3000;
    return { i: i, name: LEVELS[i][1], pl: LEVELS[i][2], from: from, to: to, pct: Math.min(1, (xp - from) / (to - from)), next: LEVELS[i + 1] };
  }

  /* ---------- SRS (SM-2), osobno rozpoznawanie (r) i produkcja (p) ---------- */
  function wid(w) { return strip(w.ua); }
  function card(w, dir) { return S.srs[wid(w) + ':' + dir]; }
  function grade(w, dir, q) {
    var k = wid(w) + ':' + dir, c = S.srs[k] || { e: 2.5, i: 0, n: 0, d: 0, l: 0 };
    if (q < 3) { c.n = 0; c.i = 0; c.l++; c.d = today(); }
    else {
      c.n++;
      if (c.n === 1) c.i = q === 5 ? 3 : 1;
      else if (c.n === 2) c.i = q === 3 ? 3 : q === 5 ? 8 : 6;
      else c.i = Math.max(c.i + 1, Math.round(c.i * (q === 3 ? 1.2 : q === 5 ? c.e * 1.3 : c.e)));
      c.e = Math.max(1.3, c.e + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
      c.d = today() + c.i;
    }
    S.srs[k] = c; save();
    return c;
  }
  function preview(w, dir, q) { // ile dni przy danej ocenie (do etykiet przycisków)
    var c = card(w, dir) || { e: 2.5, i: 0, n: 0 };
    if (q < 3) return 0;
    var n = c.n + 1;
    if (n === 1) return q === 5 ? 3 : 1;
    if (n === 2) return q === 3 ? 3 : q === 5 ? 8 : 6;
    return Math.max(c.i + 1, Math.round(c.i * (q === 3 ? 1.2 : q === 5 ? c.e * 1.3 : c.e)));
  }
  function newLeft(dir) {
    var t = today(); if (S.newDay.d !== t) S.newDay = { d: t, r: 0, p: 0 };
    return Math.max(0, S.settings.newPerDay - S.newDay[dir]);
  }
  function countNew(dir) { var t = today(); if (S.newDay.d !== t) S.newDay = { d: t, r: 0, p: 0 }; S.newDay[dir]++; save(); }
  function due(dir) { var t = today(); return UA.WORDS.filter(function (w) { var c = card(w, dir); return c && c.d <= t; }); }
  function fresh(dir) {
    return UA.WORDS.filter(function (w) {
      if (card(w, dir)) return false;
      if (dir === 'p') { var r = card(w, 'r'); return r && r.n >= 1; } // produkcja dopiero po poznaniu słowa
      return true;
    });
  }
  function mastery(dir) {
    var learning = 0, known = 0;
    UA.WORDS.forEach(function (w) { var c = card(w, dir); if (c && c.n >= 1) { learning++; if (c.i >= 21) known++; } });
    return { learning: learning, known: known, total: UA.WORDS.length };
  }

  /* ---------- Odznaki ---------- */
  var BADGES = [
    ['first', 'Пе́рший крок', 'Pierwsza powtórka słówka', function () { return mastery('r').learning >= 1; }],
    ['abc', 'Абе́тка', 'Obejrzane wszystkie litery alfabetu', function () { return Object.keys(S.stats.abc).length >= UA.ALPHABET.length; }],
    ['w50', 'Пів со́тні', '50 słów w nauce (rozpoznawanie)', function () { return mastery('r').learning >= 50; }],
    ['w150', 'Словни́к', '150 słów w nauce (rozpoznawanie)', function () { return mastery('r').learning >= 150; }],
    ['p50', 'Сам кажу́', '50 słów w nauce (produkcja)', function () { return mastery('p').learning >= 50; }],
    ['ff', 'Не обду́рите!', '25 trafień w fałszywych przyjaciołach', function () { return S.stats.ff >= 25; }],
    ['ear', 'Чу́йне ву́хо', '40 trafień w parach minimalnych', function () { return S.stats.pairs >= 40; }],
    ['acc', 'Ная́голос', '50 trafionych akcentów', function () { return S.stats.stress >= 50; }],
    ['dict', 'Дикта́нт', '15 dyktand na co najmniej 90%', function () { return S.stats.dict >= 15; }],
    ['dlg', 'Співрозмо́вник', 'Przećwiczone wszystkie dialogi', function () { return Object.keys(S.dialogs).length >= UA.DIALOGS.length; }],
    ['gram', 'Грама́тик', 'Zaliczone wszystkie lekcje gramatyki', function () { return Object.keys(S.grammar).filter(function (k) { return S.grammar[k] >= 0.75; }).length >= UA.GRAMMAR.length; }],
    ['s7', 'Ти́ждень', '7 dni nauki z rzędu', function () { return streak() >= 7; }],
    ['s30', 'Мі́сяць', '30 dni nauki z rzędu', function () { return streak() >= 30; }]
  ];
  function checkBadges() {
    BADGES.forEach(function (b) {
      if (!S.badges[b[0]] && b[3]()) { S.badges[b[0]] = today(); save(); toast('Odznaka: ' + strip(b[1]), b[2], 'badge'); sfx('badge'); confetti(); }
    });
  }

  /* ---------- XP ---------- */
  var listeners = [];
  function addXP(n) {
    var before = level().i;
    S.xp += n; var t = today(); S.xpLog[t] = (S.xpLog[t] || 0) + n;
    if (S.xpLog[t] >= S.settings.goal && S.goalDays.indexOf(t) < 0) { S.goalDays.push(t); toast('Pensum wykonane!', 'Cel dzienny: ' + S.settings.goal + ' XP', 'goal'); sfx('badge'); confetti(); }
    save();
    if (level().i > before) { var L = level(); toast('Awans: ' + strip(L.name), L.pl, 'level'); sfx('level'); confetti(); }
    checkBadges();
    listeners.forEach(function (f) { f(); });
  }
  function onChange(f) { listeners.push(f); }

  /* ---------- Toasty, pochwały, konfetti, dźwięk ---------- */
  var PRAISE = ['Чудо́во!', 'Моло́дець!', 'Пра́вильно!', 'Прекра́сно!', 'Так трима́ти!', 'Кла́сно!', 'Блиску́че!'];
  function praise() { return pick(PRAISE); }
  function toast(title, sub, kind) {
    var box = document.getElementById('toasts'); if (!box) return;
    var el = document.createElement('div'); el.className = 'toast ' + (kind || '');
    el.innerHTML = '<b>' + esc(title) + '</b>' + (sub ? '<span>' + esc(sub) + '</span>' : '');
    box.appendChild(el);
    setTimeout(function () { el.classList.add('out'); setTimeout(function () { el.remove(); }, 400); }, 2800);
  }
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function confetti() {
    if (RM) return;
    var c = document.createElement('canvas'); c.className = 'confetti'; document.body.appendChild(c);
    var W = c.width = innerWidth, H = c.height = innerHeight, x = c.getContext('2d');
    var cols = ['#1f4fa3', '#f2b705', '#b8322a', '#2e7d4f'];
    var P = []; for (var i = 0; i < 90; i++) P.push({ x: W / 2, y: H / 3, vx: (Math.random() - .5) * 12, vy: Math.random() * -10 - 3, r: Math.random() * 6 + 3, c: pick(cols), a: Math.random() * 6 });
    var t0 = performance.now();
    (function f(t) {
      x.clearRect(0, 0, W, H);
      P.forEach(function (p) { p.vy += .35; p.x += p.vx; p.y += p.vy; p.a += .2; x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillStyle = p.c; x.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); x.restore(); });
      if (t - t0 < 1800) requestAnimationFrame(f); else c.remove();
    })(t0);
  }
  var AC;
  function sfx(kind) {
    if (!S.settings.sound) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      var seq = { ok: [[660, .08], [880, .12]], bad: [[220, .18]], badge: [[523, .1], [659, .1], [784, .18]], level: [[392, .1], [523, .1], [659, .1], [784, .25]] }[kind] || [[600, .1]];
      var t = AC.currentTime;
      seq.forEach(function (n) {
        var o = AC.createOscillator(), g = AC.createGain();
        o.type = kind === 'bad' ? 'triangle' : 'sine'; o.frequency.value = n[0];
        g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.12, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + n[1]);
        o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + n[1] + .02); t += n[1] * .9;
      });
    } catch (e) { }
  }

  /* ---------- Mowa: synteza (TTS) ---------- */
  var voice = null, voicesLoaded = false;
  function loadVoices() {
    if (!('speechSynthesis' in window)) return;
    var vs = speechSynthesis.getVoices(); if (!vs.length) return;
    voicesLoaded = true;
    var uk = vs.filter(function (v) { return /^uk/i.test(v.lang); });
    uk.sort(function (a, b) { return score(b) - score(a); });
    voice = uk[0] || null;
    listeners.forEach(function (f) { f(); });
  }
  function score(v) { return (/natural|online|neural/i.test(v.name) ? 3 : 0) + (/google/i.test(v.name) ? 2 : 0) + (v.localService ? 0 : 1); }
  if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; setTimeout(loadVoices, 800); setTimeout(function () { if (!voicesLoaded) { voicesLoaded = true; listeners.forEach(function (f) { f(); }); } }, 2500); }
  function voiceStatus() {
    if (!('speechSynthesis' in window)) return { ok: false, msg: 'Ta przeglądarka nie obsługuje syntezy mowy.' };
    if (voice) return { ok: true, name: voice.name };
    return { ok: false, msg: voicesLoaded ? 'Nie znaleziono ukraińskiego głosu (uk-UA).' : 'Szukam głosów…' };
  }
  function speak(text, opt) {
    opt = opt || {};
    if (!('speechSynthesis' in window)) { if (opt.onend) opt.onend(); return; }
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(strip(text).replace(/\s*\/\s*/g, ', '));
    u.lang = 'uk-UA'; if (voice) u.voice = voice;
    u.rate = (opt.rate || S.settings.rate) * 0.95;
    if (opt.onend) {
      // zabezpieczenie: bez głosu niektóre przeglądarki nigdy nie zgłaszają końca mowy
      var fired = false, fin = function () { if (fired) return; fired = true; clearTimeout(tm); opt.onend(); };
      var tm = setTimeout(fin, Math.max(1800, strip(text).length * 110 / u.rate));
      u.onend = fin; u.onerror = fin;
    }
    speechSynthesis.speak(u);
  }

  /* ---------- Mowa: nagrywanie (shadowing) ---------- */
  var rec = { mr: null, chunks: [], stream: null };
  function canRecord() { return !!(navigator.mediaDevices && window.MediaRecorder); }
  function startRec() {
    return navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      rec.stream = stream; rec.chunks = [];
      rec.mr = new MediaRecorder(stream);
      rec.mr.ondataavailable = function (e) { if (e.data.size) rec.chunks.push(e.data); };
      rec.mr.start();
    });
  }
  function stopRec() {
    return new Promise(function (res) {
      if (!rec.mr) return res(null);
      rec.mr.onstop = function () {
        rec.stream.getTracks().forEach(function (t) { t.stop(); });
        var blob = new Blob(rec.chunks, { type: rec.mr.mimeType || 'audio/webm' });
        rec.mr = null; res(URL.createObjectURL(blob));
      };
      rec.mr.stop();
    });
  }
  function playUrl(url, onend) { var a = new Audio(url); a.onended = onend || null; a.play(); return a; }

  /* ---------- Mowa: rozpoznawanie (zabawa, nie ocena wymowy) ---------- */
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  function canRecognize() { return !!SR; }
  function recognize(cb) {
    var r = new SR(); r.lang = 'uk-UA'; r.interimResults = false; r.maxAlternatives = 3;
    r.onresult = function (e) { var alts = []; for (var i = 0; i < e.results[0].length; i++) alts.push(e.results[0][i].transcript); cb(null, alts); };
    r.onerror = function (e) { cb(e.error || 'error'); };
    r.start(); return r;
  }

  /* ---------- Klawiatura ekranowa (układ ukraiński) ---------- */
  var ROWS = ['йцукенгшщзхї', 'фівапролджєґ', 'ячсмитьбю’'];
  function keyboard(input, onEnter) {
    var el = document.createElement('div'); el.className = 'kb';
    var h = ROWS.map(function (r) { return '<div class="kb-row">' + r.split('').map(function (k) { return '<button type="button" class="key" data-k="' + k + '">' + k + '</button>'; }).join('') + '</div>'; }).join('');
    h += '<div class="kb-row"><button type="button" class="key wide" data-k="bs" aria-label="Usuń">⌫</button><button type="button" class="key space" data-k=" ">spacja</button><button type="button" class="key wide ent" data-k="ent">OK</button></div>';
    el.innerHTML = h;
    el.addEventListener('pointerdown', function (e) { if (e.target.closest('.key')) e.preventDefault(); });
    el.addEventListener('click', function (e) {
      var b = e.target.closest('.key'); if (!b) return;
      var k = b.getAttribute('data-k'), v = input.value, s = input.selectionStart == null ? v.length : input.selectionStart, en = input.selectionEnd == null ? v.length : input.selectionEnd;
      if (k === 'ent') { if (onEnter) onEnter(); return; }
      if (k === 'bs') { if (s === en && s > 0) s--; input.value = v.slice(0, s) + v.slice(en); input.setSelectionRange(s, s); }
      else { input.value = v.slice(0, s) + k + v.slice(en); input.setSelectionRange(s + k.length, s + k.length); }
      input.dispatchEvent(new Event('input'));
      if (S.settings.sysKb) input.focus();
    });
    input.setAttribute('inputmode', S.settings.sysKb ? 'text' : 'none');
    input.setAttribute('lang', 'uk'); input.setAttribute('autocomplete', 'off'); input.setAttribute('autocapitalize', 'off'); input.setAttribute('spellcheck', 'false');
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); if (onEnter) onEnter(); } });
    return el;
  }

  UA.U = { esc: esc, strip: strip, norm: norm, st: st, translit: translit, shuffle: shuffle, pick: pick, lev: lev, today: today };
  UA.G = {
    S: S, save: save, streak: streak, xpToday: xpToday, level: level, LEVELS: LEVELS, addXP: addXP, onChange: onChange,
    BADGES: BADGES, checkBadges: checkBadges, toast: toast, praise: praise, confetti: confetti, sfx: sfx, KEY: KEY
  };
  UA.SRS = { wid: wid, card: card, grade: grade, preview: preview, newLeft: newLeft, countNew: countNew, due: due, fresh: fresh, mastery: mastery };
  UA.SP = { speak: speak, voiceStatus: voiceStatus, canRecord: canRecord, startRec: startRec, stopRec: stopRec, playUrl: playUrl, canRecognize: canRecognize, recognize: recognize };
  UA.KB = keyboard;
})();

/* ---------- Przygotowanie przykładów do ćwiczeń z luką ----------
   W words2.js słowo w przykładzie jest ujęte w {…}; dla słów A1 szukamy go automatycznie. */
(function () {
  var ACC = '\u0301';
  function low(s) { return s.split(ACC).join('').toLowerCase().replace(/[’ʼ']/g, "'"); }
  function stripMap(s) { var out = '', map = []; for (var i = 0; i < s.length; i++) { if (s[i] === ACC) continue; map.push(i); out += s[i]; } return { s: low(out), map: map }; }
  function cut(w, a, b) { w._cz = { pre: w.ex.slice(0, a), t: w.ex.slice(a, b), post: w.ex.slice(b) }; }
  UA.WORDS.forEach(function (w) {
    if (!w.ex) return;
    var m = w.ex.match(/\{([^}]+)\}/);
    if (m) { var i = w.ex.indexOf(m[0]); w.ex = w.ex.replace(/[{}]/g, ''); cut(w, i, i + m[1].length); return; }
    var sm = stripMap(w.ex), heads = w.ua.split('/').map(function (x) { return low(x).replace(/[?…!.]/g, '').trim(); });
    for (var h = 0; h < heads.length; h++) {
      var hd = heads[h];
      if (hd.indexOf(' ') > 0) {
        var at = sm.s.indexOf(hd);
        if (at >= 0) { var a = sm.map[at], b = sm.map[at + hd.length - 1] + 1; if (w.ex[b] === ACC) b++; return cut(w, a, b); }
        continue;
      }
      var re = /[^\s,.!?;:«»"–—()]+/g, t;
      var stem = hd.length <= 3 ? null : hd.slice(0, Math.max(3, Math.ceil(hd.length * 0.6)));
      while ((t = re.exec(w.ex))) {
        var lt = low(t[0]);
        if (lt === hd || (stem && lt.indexOf(stem) === 0)) return cut(w, t.index, t.index + t[0].length);
      }
    }
  });
})();
