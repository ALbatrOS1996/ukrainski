# Ukraiński dla Polaka

Aplikacja do nauki języka ukraińskiego dla osób polskojęzycznych. Wykorzystuje podobieństwo obu języków, a ćwiczy głównie to, co się różni: ruchomy akcent, fałszywych przyjaciół, dźwięki и/і i г/ґ oraz gramatykę inną niż polska.

**Moduły:** ścieżka A1 → C2 (63 lekcje, 755 słów z akcentem, formami i przykładami; kolejna lekcja otwiera się po poznaniu 70% słów poprzedniej albo po zdaniu testu) · trening, w którym aplikacja sama sprawdza znajomość słowa (najpierw prezentacja, potem tłumaczenie ABCD w obie strony, zdanie z luką, rozpoznawanie ze słuchu, pisownia ze słuchu, wpisywanie na klawiaturze ukraińskiej; wynik sam ustawia powtórki SM-2) · słuchanie (słowa, zdania, prawda/fałsz, czytanki A2–C2 z pytaniami) · alfabet · fałszywi przyjaciele · wymowa (pary minimalne, akcent) · 8 dialogów z odgrywaniem ról i shadowingiem · dyktando · gramatyka kontrastowa. Motyw czarno-fioletowy (opcjonalnie jasny).

- **Na telefonie:** otwórz stronę aplikacji i wybierz „Dodaj do ekranu głównego” (Android: menu Chrome → Zainstaluj aplikację; iPhone: Safari → Udostępnij → Do ekranu początkowego). Działa offline.
- **Na komputerze:** plik `Ukrainski_dla_Polaka.html` otwierany w przeglądarce (najlepiej Edge – ma ukraińskie głosy).

## Budowanie

Źródła są w `src/` (`words.js` – słownictwo A1, `words2.js` – lekcje A2–C2, `texts.js` – czytanki, `content.js` – alfabet, fałszywi przyjaciele, wymowa, gramatyka, dialogi, `core.js` – stan, mowa, klawiatura, SRS, `app.js` – ekrany). Polecenie `python build.py` tworzy:
- `Ukrainski_dla_Polaka.html` – jeden plik,
- `docs/` – wersję PWA publikowaną przez GitHub Pages (Settings → Pages → branch `main`, folder `/docs`).

## Zastrzeżenia

- Wymowa pochodzi z syntezy mowy urządzenia (uk-UA). Głos syntetyczny potrafi źle postawić akcent – wzorem jest akcent zaznaczony w tekście.
- Treści przygotowano bez native speakera. Przed szerszym użyciem (np. z uczniami) warto dać je do sprawdzenia osobie z Ukrainy.
