# Ukraiński dla Polaka

Aplikacja do nauki języka ukraińskiego dla osób polskojęzycznych. Wykorzystuje podobieństwo obu języków, a ćwiczy głównie to, co się różni: ruchomy akcent, fałszywych przyjaciół, dźwięki и/і i г/ґ oraz gramatykę inną niż polska.

**Moduły:** alfabet z transliteracją (do wyłączenia) · 359 słów A1 z akcentem, formami i parami aspektowymi · powtórki SM-2 osobno dla rozpoznawania (UA→PL) i produkcji (PL→UA) · test wejściowy dla słów przezroczystych · fałszywi przyjaciele · pary minimalne, ćwiczenie akcentu, zasady wymowy · 8 dialogów z odgrywaniem ról, shadowingiem (nagrywanie w przeglądarce) i rozpoznawaniem mowy (jako zabawa) · dyktando · 7 lekcji gramatyki kontrastowej · klawiatura ekranowa z układem ukraińskim.

- **Na telefonie:** otwórz stronę aplikacji i wybierz „Dodaj do ekranu głównego” (Android: menu Chrome → Zainstaluj aplikację; iPhone: Safari → Udostępnij → Do ekranu początkowego). Działa offline.
- **Na komputerze:** plik `Ukrainski_dla_Polaka.html` otwierany w przeglądarce (najlepiej Edge – ma ukraińskie głosy).

## Budowanie

Źródła są w `src/` (`words.js` – słownictwo, `content.js` – alfabet, fałszywi przyjaciele, wymowa, gramatyka, dialogi, `core.js` – stan, mowa, klawiatura, SRS, `app.js` – ekrany). Polecenie `python build.py` tworzy:
- `Ukrainski_dla_Polaka.html` – jeden plik,
- `docs/` – wersję PWA publikowaną przez GitHub Pages (Settings → Pages → branch `main`, folder `/docs`).

## Zastrzeżenia

- Wymowa pochodzi z syntezy mowy urządzenia (uk-UA). Głos syntetyczny potrafi źle postawić akcent – wzorem jest akcent zaznaczony w tekście.
- Treści przygotowano bez native speakera. Przed szerszym użyciem (np. z uczniami) warto dać je do sprawdzenia osobie z Ukrainy.
