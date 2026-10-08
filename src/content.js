/* ============================================================
   TREŚCI: alfabet, fałszywi przyjaciele, wymowa, gramatyka, dialogi
   ============================================================ */
var UA = window.UA || (window.UA = {});

/* ---------- Alfabet ----------
   [litera, transliteracja PL, IPA, opis dla Polaka, przykład, znaczenie, różnica względem rosyjskiego?] */
UA.ALPHABET = [
  ['А а', 'a', 'ɑ', 'jak polskie a', 'ма́ма', 'mama'],
  ['Б б', 'b', 'b', 'jak b – także na końcu wyrazu (nie ubezdźwięczniamy!)', 'хліб', 'chleb'],
  ['В в', 'w', 'ʋ / u̯', 'jak w; na końcu sylaby jak krótkie u (jak „ł”), nigdy jak f', 'вовк', 'wilk'],
  ['Г г', 'h', 'ɦ', 'dźwięczne, gardłowe h (jak czeskie h) – to nie jest polskie „g”', 'гора́', 'góra'],
  ['Ґ ґ', 'g', 'g', 'jak polskie g; rzadka litera', 'ґа́нок', 'ganek', 1],
  ['Д д', 'd', 'd', 'jak d', 'дім', 'dom'],
  ['Е е', 'e', 'ɛ', 'jak polskie e – bez „j” na początku (inaczej niż rosyjskie е)', 'де́рево', 'drzewo', 1],
  ['Є є', 'je / ie', 'jɛ', 'je; po spółgłosce zmiękcza ją', 'є', 'jest, są', 1],
  ['Ж ж', 'ż', 'ʒ', 'jak ż', 'жі́нка', 'kobieta'],
  ['З з', 'z', 'z', 'jak z', 'зима́', 'zima'],
  ['И и', 'y', 'ɪ', 'jak polskie y, ale bliżej i (przednie, napięte)', 'ми', 'my', 1],
  ['І і', 'i', 'i', 'jak polskie i; nie zmiękcza tak mocno jak polskie i', 'ліс', 'las', 1],
  ['Ї ї', 'ji', 'ji', 'zawsze ji', 'ї́жа', 'jedzenie', 1],
  ['Й й', 'j', 'j', 'jak j', 'мій', 'mój'],
  ['К к', 'k', 'k', 'jak k', 'кіт', 'kot'],
  ['Л л', 'ł / l', 'l', 'twarde l (nie polskie ł!); przed і, я, ю, є, ь miękkie', 'ла́мпа', 'lampa'],
  ['М м', 'm', 'm', 'jak m', 'мо́ре', 'morze'],
  ['Н н', 'n', 'n', 'jak n', 'ніс', 'nos'],
  ['О о', 'o', 'ɔ', 'jak polskie o; nigdy nie brzmi jak a (inaczej niż w rosyjskim)', 'молоко́', 'mleko'],
  ['П п', 'p', 'p', 'jak p', 'по́шта', 'poczta'],
  ['Р р', 'r', 'r', 'jak r', 'рука́', 'ręka'],
  ['С с', 's', 's', 'jak s', 'син', 'syn'],
  ['Т т', 't', 't', 'jak t', 'тут', 'tu'],
  ['У у', 'u', 'u', 'jak u', 'уро́к', 'lekcja'],
  ['Ф ф', 'f', 'f', 'jak f (głównie w zapożyczeniach)', 'фрукт', 'owoc'],
  ['Х х', 'ch', 'x', 'jak ch', 'хліб', 'chleb'],
  ['Ц ц', 'c', 't͡s', 'jak c', 'ціна́', 'cena'],
  ['Ч ч', 'cz', 't͡ʃ', 'jak cz (trochę miększe)', 'чай', 'herbata'],
  ['Ш ш', 'sz', 'ʃ', 'jak sz', 'шко́ла', 'szkoła'],
  ['Щ щ', 'szcz', 'ʃt͡ʃ', 'zawsze szcz – dwa dźwięki', 'ще', 'jeszcze'],
  ['Ь ь', '\'', 'ʲ', 'znak miękki: zmiękcza poprzednią spółgłoskę, sam nie brzmi', 'день', 'dzień'],
  ['Ю ю', 'ju / iu', 'ju', 'ju; po spółgłosce zmiękcza ją', 'ю́шка', 'zupka, rosół'],
  ['Я я', 'ja / ia', 'jɑ', 'ja; po spółgłosce zmiękcza ją', 'я́блуко', 'jabłko'],
  ['’', '(j)', 'j', 'apostrof: spółgłoska przed nim twarda, a я, ю, є, ї po nim czytamy z j', 'п’ять', 'pięć']
];

/* ---------- Fałszywi przyjaciele ----------
   [ukraiński, prawdziwe znaczenie, mylące polskie skojarzenie, jak powiedzieć to polskie słowo po ukraińsku, przykład, przykład PL] */
UA.FRIENDS = [
  ['дружи́на', 'żona', 'drużyna', 'кома́нда', 'Моя́ дружи́на – вчи́телька.', 'Moja żona jest nauczycielką.'],
  ['о́воч', 'warzywo', 'owoc', 'фрукт', 'Карто́пля – це о́воч.', 'Ziemniak to warzywo.'],
  ['гарбу́з', 'dynia', 'arbuz', 'каву́н', 'Восени́ ми ку́пимо гарбу́з.', 'Jesienią kupimy dynię.'],
  ['ди́ня', 'melon', 'dynia', 'гарбу́з', 'Ди́ня соло́дка, як мед.', 'Melon jest słodki jak miód.'],
  ['склеп', 'krypta, grobowiec', 'sklep', 'магази́н, крамни́ця', 'Під це́рквою є старови́нний склеп.', 'Pod cerkwią jest dawna krypta.'],
  ['уро́к', 'lekcja', 'urok', 'чарі́вність', 'Сього́дні шість уро́ків.', 'Dziś jest sześć lekcji.'],
  ['за́раз', 'teraz', 'zaraz (za chwilę)', 'незаба́ром, за хвили́нку', 'Я за́раз на робо́ті.', 'Jestem teraz w pracy.'],
  ['прі́звище', 'nazwisko', 'przezwisko', 'прі́звисько', 'Як ва́ше прі́звище?', 'Jak brzmi pana nazwisko?'],
  ['живі́т', 'brzuch', 'żywot', 'життя́', 'У ме́не боли́ть живі́т.', 'Boli mnie brzuch.'],
  ['ду́же', 'bardzo', 'duże', 'вели́ке', 'Це ду́же ціка́во.', 'To bardzo ciekawe.'],
  ['бага́то', 'dużo', 'bogato', 'розкі́шно', 'Тут бага́то люде́й.', 'Tu jest dużo ludzi.'],
  ['чу́ти', 'słyszeć', 'czuć', 'відчува́ти', 'Я тебе́ пога́но чу́ю.', 'Słabo cię słyszę.'],
  ['ди́витися', 'patrzeć, oglądać', 'dziwić się', 'дивува́тися', 'Подиви́ся на це!', 'Popatrz na to!'],
  ['ча́шка', 'filiżanka', 'czaszka', 'че́реп', 'Ча́шка ка́ви, будь ла́ска.', 'Filiżankę kawy poproszę.'],
  ['ру́чка', 'długopis (też klamka, rączka)', 'tylko rączka', 'ру́ченька (o dłoni dziecka)', 'Пиші́ть ру́чкою, не олівце́м.', 'Piszcie długopisem, nie ołówkiem.'],
  ['крі́сло', 'fotel', 'krzesło', 'стіле́ць', 'Сіда́йте в крі́сло.', 'Proszę usiąść w fotelu.'],
  ['дива́н', 'kanapa', 'dywan', 'ки́лим', 'Ми ди́вимося фільм на дива́ні.', 'Oglądamy film na kanapie.'],
  ['па́м’ятник', 'pomnik', 'pamiętnik', 'щоде́нник', 'Це па́м’ятник Шевче́нкові.', 'To pomnik Szewczenki.'],
  ['ми́ло', 'mydło', 'miło', 'при́ємно', 'Ми́йте ру́ки з ми́лом.', 'Myjcie ręce mydłem.'],
  ['ду́мка', 'myśl; opinia', 'duma', 'го́рдість', 'Яка́ ва́ша ду́мка?', 'Jakie jest pana zdanie?'],
  ['кома́нда', 'drużyna', 'komenda', 'управлі́ння (полі́ції)', 'На́ша кома́нда ви́грала.', 'Nasza drużyna wygrała.'],
  ['ві́дпустка', 'urlop', 'odpust', 'ві́дпуст (церко́вне свя́то)', 'У ли́пні в ме́не ві́дпустка.', 'W lipcu mam urlop.'],
  ['літні́й', 'starszy, w podeszłym wieku', 'letni', 'лі́тній (akcent na 1. sylabie) = letni', 'Допоможі́ть літні́й жі́нці.', 'Proszę pomóc starszej pani.'],
  ['о́браз', 'obraz w sensie: wizerunek; ikona', 'obraz (malowidło)', 'карти́на', 'Над две́рима ви́сить о́браз.', 'Nad drzwiami wisi ikona.'],
  ['губа́', 'warga', 'gęba', 'рот (usta)', 'Не куса́й гу́би.', 'Nie przygryzaj warg.'],
  ['кварти́ра', 'mieszkanie', 'kwatera', 'житло́ на ніч, постій', 'Ми ма́ємо нову́ кварти́ру.', 'Mamy nowe mieszkanie.'],
  ['магази́н', 'sklep', 'magazyn', 'склад', 'Магази́н уже́ зачи́нений.', 'Sklep jest już zamknięty.'],
  ['чолові́к', 'mężczyzna; mąż', 'człowiek', 'люди́на', 'Мій чолові́к – лі́кар.', 'Mój mąż jest lekarzem.'],
  ['лю́тий', 'luty; wściekły', 'tylko „luty”', '–', 'Лю́тий соба́ка.', 'Wściekły pies.'],
  ['ли́хо', 'nieszczęście, bieda', 'licho (diabeł; marny)', 'чорт / ке́пський', 'Біда́ й ли́хо.', 'Bieda i nieszczęście.']
];

/* ---------- Pary minimalne (słuchanie) ---------- */
UA.PAIRS = [
  { id: 'yi', name: 'и [ɪ] czy і [i]?', items: [
    ['бик', 'byk', 'бік', 'bok'], ['лис', 'lis', 'ліс', 'las'], ['кит', 'wieloryb', 'кіт', 'kot'],
    ['дим', 'dym', 'дім', 'dom'], ['рис', 'ryż', 'ріс', 'rósł'], ['вид', 'widok', 'від', 'od'],
    ['си́ла', 'siła', 'сі́ла', 'usiadła'], ['пи́ти', 'pić', 'піти́', 'pójść']
  ]},
  { id: 'gh', name: 'г [ɦ] czy ґ [g]?', items: [
    ['гра́ти', 'grać', 'ґра́ти', 'krata'], ['гніт', 'ucisk', 'ґніт', 'knot (świecy)']
  ]}
];

/* г czy ґ? – pisownia */
UA.GG = ['ґа́нок|ganek', 'ґу́дзик|guzik', 'ґрунт|grunt, gleba', 'ґа́зда|gospodarz (zach.)', 'дзи́ґа|bączek (zabawka)', 'ґра́ти|krata',
  'гора́|góra', 'голова́|głowa', 'гро́ші|pieniądze', 'гаря́чий|gorący', 'горо́д|ogród warzywny', 'гарбу́з|dynia'];

/* Pary akcentowe – ten sam zapis, inne znaczenie */
UA.STRESS_PAIRS = [
  ['за́мок', 'zamek (budowla)', 'замо́к', 'zamek (do drzwi), kłódka'],
  ['му́ка', 'męka', 'мука́', 'mąka'],
  ['ру́ки', 'ręce (M. lm.)', 'руки́', 'ręki (D. lp.)'],
  ['бра́ти', 'brać', 'брати́', 'bracia'],
  ['о́рган', 'narząd; organ', 'орга́н', 'organy (instrument)'],
  ['а́тлас', 'atlas', 'атла́с', 'atłas (tkanina)']
];

/* ---------- Zasady wymowy (karty) ---------- */
UA.RULES = [
  { t: 'и i і to dwa różne dźwięki', b: 'и [ɪ] brzmi podobnie do polskiego y, ale jest bardziej przednie. і [i] to polskie i. Opozycja odróżnia znaczenia: бик (byk) – бік (bok). Ćwicz w „Parach minimalnych”.', ex: ['бик', 'бік', 'ми', 'ні'] },
  { t: 'г to nie g', b: 'г [ɦ] to dźwięczne, gardłowe h, jak w czeskim. Polskie g zapisuje się rzadką literą ґ. Typowy polski błąd: czytanie горо́д jak „gorod”.', ex: ['гора́', 'голова́', 'ґа́нок', 'ґу́дзик'] },
  { t: 'Bez ubezdźwięczniania na końcu', b: 'W ukraińskim dźwięczne spółgłoski na końcu wyrazu i przed bezdźwięcznymi zostają dźwięczne: хліб to [xlʲib], nie „chlip”. To jeden z najbardziej słyszalnych „polskich akcentów”. Wyjątek: г przed bezdźwięczną brzmi jak х (ле́гко [ˈlɛxkɔ]).', ex: ['хліб', 'дуб', 'сад', 'ніж', 'моро́з', 'кни́жка'] },
  { t: 'в na końcu sylaby = krótkie u', b: 'Na końcu sylaby в brzmi jak niezgłoskotwórcze u [u̯] – podobnie do polskiego ł. Nigdy jak f (polskie „krew” → [krɛf], ukraińskie кров → [krɔu̯]).', ex: ['вовк', 'Льві́в', 'кров', 'пра́вда'] },
  { t: 'щ = szcz', b: 'Litera щ to zawsze dwa dźwięki [ʃt͡ʃ], jak polskie szcz.', ex: ['ще', 'борщ', 'ща́стя', 'дощ'] },
  { t: 'Litery jotowane: я, ю, є, ї', b: 'Na początku wyrazu, po samogłosce i po apostrofie brzmią ja, ju, je, ji. Po spółgłosce (я, ю, є) zmiękczają ją: ня, лю. Litera ї zawsze brzmi ji.', ex: ['я́блуко', 'моя́', 'лю́ди', 'Украї́на'] },
  { t: 'Apostrof i znak miękki', b: 'Apostrof oddziela twardą spółgłoskę od jotowanej samogłoski: м’я́со [ˈmjasɔ], п’ять [pjatʲ]. Znak miękki ь zmiękcza spółgłoskę przed sobą: день, сіль.', ex: ['м’я́со', 'п’ять', 'сім’я́', 'день'] },
  { t: 'е i о bez niespodzianek', b: 'е to [ɛ] bez j (rosyjskie е brzmi „je”). о nie redukuje się do a: молоко́ to [mɔlɔˈkɔ], nie „małako”. Dla Polaka to ułatwienie – czyta się jak po polsku.', ex: ['молоко́', 'де́рево', 'метро́'] },
  { t: 'Akcent jest ruchomy', b: 'Akcent może paść na dowolną sylabę i przesuwa się w odmianie: рука́ – ру́ки, сестра́ – се́стри. W zwykłych tekstach nie jest zaznaczany, dlatego w aplikacji każda forma ma akcent.', ex: ['рука́', 'ру́ки', 'сестра́', 'се́стри'] },
  { t: 'дж i дз to jeden dźwięk', b: 'Dwuznaki дж [d͡ʒ] i дз [d͡z] czyta się jak polskie dż i dz.', ex: ['джерело́', 'дзво́ник', 'ґу́дзик'] }
];

/* ---------- Gramatyka kontrastowa ---------- */
UA.GRAMMAR = [
  { id: 'byt', t: 'Bez „być” w czasie teraźniejszym',
    b: '<p>W czasie teraźniejszym czasownik <b>бу́ти</b> zwykle się pomija – tam, gdzie Polak mówi „jestem”, Ukrainiec nic nie wstawia:</p><table class="tbl"><tr><td>Я вчи́тель.</td><td>Jestem nauczycielem.</td></tr><tr><td>Він удо́ма.</td><td>On jest w domu.</td></tr><tr><td>Де ти?</td><td>Gdzie jesteś?</td></tr><tr><td>Це моя́ ма́ма.</td><td>To (jest) moja mama.</td></tr></table><p>Forma <b>є</b> („jest/są”) pojawia się, gdy mówimy o istnieniu lub posiadaniu: <i>Тут є апте́ка?</i> – Czy jest tu apteka? <i>У ме́не є брат.</i> – Mam brata.</p><p>Uwaga: rzeczownik po pominiętym „być” stoi w mianowniku (<i>Я вчи́тель</i>), nie w narzędniku jak w polskim „jestem nauczycielem”.</p>',
    quiz: [
      ['Jestem zmęczony.', ['Я вто́млений.', 'Я є вто́млений.', 'Я бу́ти вто́млений.'], 0],
      ['Czy jest tu sklep?', ['Тут магази́н?', 'Тут є магази́н?', 'Тут є магази́ном?'], 1],
      ['Mam siostrę.', ['Я є сестра́.', 'У ме́не є сестра́.', 'Мені́ сестра́.'], 1],
      ['On jest lekarzem.', ['Він лі́карем.', 'Він є лі́карем є.', 'Він лі́кар.'], 2]
    ] },
  { id: 'past', t: 'Czas przeszły bez końcówek osobowych',
    b: '<p>Czas przeszły odmienia się tylko przez <b>rodzaj i liczbę</b> – jak polskie „czytał / czytała / czytali”, ale <b>bez końcówek -em, -eś, -śmy</b>. Osobę pokazuje zaimek.</p><table class="tbl"><tr><td>я, ти, він чита́<b>в</b></td><td>czytałem, czytałeś, czytał</td></tr><tr><td>я, ти, вона́ чита́<b>ла</b></td><td>czytałam, czytałaś, czytała</td></tr><tr><td>воно́ чита́<b>ло</b></td><td>czytało</td></tr><tr><td>ми, ви, вони́ чита́<b>ли</b></td><td>czytaliśmy, czytaliście, czytali</td></tr></table><p>Dlatego zaimek jest prawie obowiązkowy: <i>Я був у Ки́єві</i> – Byłem w Kijowie. Końcówka <b>-в</b> brzmi jak krótkie u: чита́в [t͡ʃɪˈtau̯].</p><p>Formy nieregularne: <i>міг, могла́</i> (móc), <i>ішо́в / йшов, ішла́</i> (iść), <i>їв, ї́ла</i> (jeść), <i>ніс, несла́</i> (nieść).</p>',
    quiz: [
      ['Czytałem książkę. (mówi mężczyzna)', ['Я чита́в кни́жку.', 'Я чита́вем кни́жку.', 'Чита́в-я кни́жку.'], 0],
      ['Byłaś wczoraj w szkole?', ['Ти була́ вчо́ра в шко́лі?', 'Ти булась вчо́ра в шко́лі?', 'Ти бу́ла вчо́ра в шко́лі?'], 0],
      ['Zrobiliśmy to.', ['Ми це зроби́лисьмо.', 'Ми це зроби́ли.', 'Ми це зроби́в.'], 1],
      ['Mógł przyjść.', ['Він мо́гнув прийти́.', 'Він міг прийти́.', 'Він могв прийти́.'], 1]
    ] },
  { id: 'fut', t: 'Dwa czasy przyszłe niedokonane',
    b: '<p>Czas przyszły niedokonany ma <b>dwie równoważne formy</b>:</p><table class="tbl"><tr><td>бу́ду чита́ти</td><td colspan="1">złożona – jak polskie „będę czytać”</td></tr><tr><td>чита́тиму</td><td>prosta – bezokolicznik + końcówka</td></tr></table><table class="tbl"><tr><td>я чита́тиму</td><td>ми чита́тимемо</td></tr><tr><td>ти чита́тимеш</td><td>ви чита́тимете</td></tr><tr><td>він чита́тиме</td><td>вони́ чита́тимуть</td></tr></table><p>Forma prosta jest typowo ukraińska i bardzo częsta. Uwaga: „будем читать” to rusycyzm – po ukraińsku <i>бу́демо чита́ти</i>.</p><p>Czas przyszły dokonany tworzy się jak w polskim: <i>прочита́ю</i> – przeczytam.</p>',
    quiz: [
      ['Będę pracować (forma prosta)', ['працюва́тиму', 'бу́ду працю́ю', 'працю́ватимем'], 0],
      ['Będziemy czekać', ['бу́дем чека́ти', 'бу́демо чека́ти', 'бу́демо чека́ли'], 1],
      ['Oni będą pisać (forma prosta)', ['писа́тимуть', 'бу́дуть пи́шуть', 'писа́тиме'], 0],
      ['Przeczytam (dokonany)', ['бу́ду прочита́ти', 'прочита́ю', 'чита́тиму'], 1]
    ] },
  { id: 'voc', t: 'Wołacz – używany zawsze',
    b: '<p>W polszczyźnie mówionej wołacz często zastępuje się mianownikiem („Ania, chodź!”). Po ukraińsku <b>wołacza używa się konsekwentnie</b> – mianownik w zwrocie brzmi niegrzecznie lub obco.</p><table class="tbl"><tr><td>Оле́на → <b>Оле́но</b></td><td>Окса́на → <b>Окса́но</b></td></tr><tr><td>Іва́н → <b>Іва́не</b></td><td>Петро́ → <b>Петре́</b></td></tr><tr><td>Андрі́й → <b>Андрі́ю</b></td><td>Марі́я → <b>Марі́є</b></td></tr><tr><td>пан → <b>па́не</b></td><td>друг → <b>дру́же</b></td></tr><tr><td>ма́ма → <b>ма́мо</b></td><td>лі́кар → <b>лі́карю</b></td></tr></table><p>W zwrotach grzecznościowych odmienia się i tytuł, i imię: <i>па́не Петре́</i>, <i>па́ні Оле́но</i> (па́ні się nie odmienia).</p>',
    quiz: [
      ['Oksano, chodź tutaj! (do Oksany)', ['Окса́на, іди́ сюди́!', 'Окса́но, іди́ сюди́!', 'Окса́ну, іди́ сюди́!'], 1],
      ['Panie Piotrze, …', ['Пан Петро́, …', 'Па́не Петре́, …', 'Па́не Петро́, …'], 1],
      ['Andriju!', ['Андрі́ю!', 'Андрі́й!', 'Андрі́є!'], 0],
      ['Przyjacielu!', ['Дру́же!', 'Друг!', 'Дру́гу!'], 0]
    ] },
  { id: 'vy', t: 'Forma grzecznościowa: Ви, nie „pan/pani”',
    b: '<p>Polskie „Czy pan ma czas?” (3. osoba) po ukraińsku brzmi <b>„Ви ма́єте час?”</b> – 2. osoba liczby mnogiej, jak w francuskim „vous”.</p><table class="tbl"><tr><td>Czy pani mówi po polsku?</td><td>Ви говори́те по-по́льськи?</td></tr><tr><td>Gdzie pan pracuje?</td><td>Де ви працю́єте?</td></tr><tr><td>Proszę usiąść.</td><td>Сіда́йте, будь ла́ска.</td></tr></table><p>Słowa <i>пан / па́ні</i> stoją tylko w zwrocie (z wołaczem) albo przy nazwisku: <i>Па́не Іва́не, ви бу́дете за́втра?</i> Konstrukcja „Чи пан ма́є…” to kalka z polskiego.</p>',
    quiz: [
      ['Czy pan ma długopis?', ['Чи пан ма́є ру́чку?', 'Ви ма́єте ру́чку?', 'Ти ма́єш ру́чку, па́не?'], 1],
      ['Skąd pani jest?', ['Зві́дки ви?', 'Зві́дки па́ні є?', 'Зві́дки па́ні?'], 0],
      ['Proszę wejść. (do nauczycielki)', ['Захо́дь!', 'Захо́дьте, будь ла́ска!', 'Хай па́ні захо́дить!'], 1]
    ] },
  { id: 'kalki', t: 'Rząd i przyimki – gdzie Polak kalkuje',
    b: '<p>Większość konstrukcji jest wspólna, ale kilka polskich odruchów daje błędy:</p><table class="tbl"><tr><td>Mam 40 lat.</td><td><b>Мені́</b> со́рок ро́ків. (celownik!)</td></tr><tr><td>Mam na imię Marcin.</td><td><b>Мене́ зва́ти</b> Ма́рцін.</td></tr><tr><td>Mam brata.</td><td><b>У ме́не є</b> брат. (też: Я ма́ю бра́та)</td></tr><tr><td>Myślę o tobie.</td><td>Ду́маю <b>про тебе́</b>. (про + biernik)</td></tr><tr><td>Mówię po ukraińsku.</td><td>Розмовля́ю <b>украї́нською</b>. / по-украї́нськи</td></tr><tr><td>Tęsknię za tobą.</td><td>Суму́ю <b>за тобо́ю</b>.</td></tr><tr><td>Za tydzień.</td><td><b>Че́рез</b> ти́ждень.</td></tr><tr><td>Boli mnie głowa.</td><td><b>У ме́не</b> боли́ть голова́.</td></tr></table>',
    quiz: [
      ['Mam 15 lat.', ['Я ма́ю п’ятна́дцять ро́ків.', 'Мені́ п’ятна́дцять ро́ків.', 'У ме́не п’ятна́дцять ро́ків.'], 1],
      ['Opowiedz o szkole.', ['Розкажи́ о шко́лі.', 'Розкажи́ про шко́лу.', 'Розкажи́ про шко́лі.'], 1],
      ['Za godzinę.', ['За годи́ну.', 'Че́рез годи́ну.', 'По годи́ні.'], 1],
      ['Boli mnie gardło.', ['Мене́ боли́ть го́рло.', 'У ме́не боли́ть го́рло.', 'Мені́ боли́ть го́рло.'], 1]
    ] },
  { id: 'sia', t: '-ся piszemy razem',
    b: '<p>Polskie „się” to osobne, ruchome słowo. Ukraińskie <b>-ся</b> to końcówka – zawsze na końcu czasownika i pisana łącznie:</p><table class="tbl"><tr><td>uczę się</td><td>вчу́<b>ся</b></td></tr><tr><td>jak się nazywasz?</td><td>як тебе́ зва́ти? (bez -ся!)</td></tr><tr><td>śmieje się</td><td>смі́єть<b>ся</b></td></tr><tr><td>spotkamy się</td><td>зустрі́немо<b>ся</b></td></tr></table><p>W mowie potocznej po samogłosce bywa skrócone do <b>-сь</b>: <i>вчи́лась</i>. Część polskich czasowników zwrotnych po ukraińsku nie ma -ся i odwrotnie (<i>сподіва́тися</i> – mieć nadzieję).</p>',
    quiz: [
      ['Uczę się ukraińskiego.', ['Я ся вчу украї́нської.', 'Я вчу́ся украї́нської.', 'Я вчу ся украї́нської.'], 1],
      ['Spotkajmy się jutro.', ['Зу́стріньмося за́втра.', 'Ся зу́стріньмо за́втра.', 'Зу́стріньмо ся за́втра.'], 0],
      ['Lekcja zaczyna się o ósmej.', ['Уро́к ся почина́є о во́сьмій.', 'Уро́к почина́ється о во́сьмій.', 'Уро́к почина́є ся о во́сьмій.'], 1]
    ] }
];

/* ---------- Dialogi ----------
   linie: [rola, ukraiński, polski] */
UA.DIALOGS = [
  { id: 'znajomosc', t: 'Poznajmy się', ua: 'Знайо́мство', roles: ['Окса́на', 'Ма́рцін'], lines: [
    [0, 'Приві́т! Мене́ зва́ти Окса́на. А тебе́?', 'Cześć! Mam na imię Oksana. A ty?'],
    [1, 'Приві́т! Я Ма́рцін. Ду́же при́ємно.', 'Cześć! Jestem Marcin. Bardzo mi miło.'],
    [0, 'Ти з По́льщі?', 'Jesteś z Polski?'],
    [1, 'Так, я з Варша́ви. А ти?', 'Tak, jestem z Warszawy. A ty?'],
    [0, 'Я зі Льво́ва. Ти до́бре говори́ш украї́нською!', 'Jestem ze Lwowa. Dobrze mówisz po ukraińsku!'],
    [1, 'Дя́кую, але́ я ще вчу́ся.', 'Dziękuję, ale jeszcze się uczę.'],
    [0, 'А чим ти займа́єшся?', 'A czym się zajmujesz?'],
    [1, 'Я вчи́тель істо́рії.', 'Jestem nauczycielem historii.']
  ]},
  { id: 'sklep', t: 'W sklepie', ua: 'У крамни́ці', roles: ['Продаве́ць', 'Покупе́ць'], lines: [
    [0, 'До́брий день! Чим мо́жу допомогти́?', 'Dzień dobry! W czym mogę pomóc?'],
    [1, 'До́брий день! Да́йте, будь ла́ска, хліб і молоко́.', 'Dzień dobry! Poproszę chleb i mleko.'],
    [0, 'Ще щось?', 'Coś jeszcze?'],
    [1, 'Так, кілогра́м я́блук. Скі́льки це ко́штує?', 'Tak, kilogram jabłek. Ile to kosztuje?'],
    [0, 'Ра́зом сто два́дцять гри́вень.', 'Razem sto dwadzieścia hrywien.'],
    [1, 'Мо́жна ка́рткою?', 'Można kartą?'],
    [0, 'Так, звича́йно. Ось ваш чек.', 'Tak, oczywiście. Oto paragon.'],
    [1, 'Дя́кую! До поба́чення!', 'Dziękuję! Do widzenia!']
  ]},
  { id: 'lekarz', t: 'U lekarza', ua: 'У лі́каря', roles: ['Лі́кар', 'Паціє́нт'], lines: [
    [0, 'До́брий день! На що ска́ржитеся?', 'Dzień dobry! Na co pan się skarży?'],
    [1, 'У ме́не боли́ть голова́ і го́рло.', 'Boli mnie głowa i gardło.'],
    [0, 'Відко́ли?', 'Od kiedy?'],
    [1, 'Від учо́ра. І ще ма́ю температу́ру.', 'Od wczoraj. I mam jeszcze gorączkę.'],
    [0, 'Ка́шель є?', 'Jest kaszel?'],
    [1, 'Так, тро́хи.', 'Tak, trochę.'],
    [0, 'Ось реце́пт. Прийма́йте ці лі́ки три́чі на день.', 'Oto recepta. Proszę brać te leki trzy razy dziennie.'],
    [1, 'Дя́кую, па́не лі́карю.', 'Dziękuję, panie doktorze.']
  ]},
  { id: 'urzad', t: 'W urzędzie', ua: 'В устано́ві', roles: ['Працівни́ця', 'Відві́дувач'], lines: [
    [0, 'До́брий день. Слу́хаю вас.', 'Dzień dobry. Słucham pana.'],
    [1, 'До́брий день. Я хо́чу пода́ти зая́ву.', 'Dzień dobry. Chcę złożyć wniosek.'],
    [0, 'Ваш па́спорт, будь ла́ска.', 'Proszę paszport.'],
    [1, 'Ось, будь ла́ска.', 'Proszę bardzo.'],
    [0, 'Запо́вніть цю фо́рму: ім’я́, прі́звище й адре́са.', 'Proszę wypełnić ten formularz: imię, nazwisko i adres.'],
    [1, 'Де тре́ба підписа́тися?', 'Gdzie trzeba się podpisać?'],
    [0, 'Ось тут, унизу́.', 'Tutaj, na dole.'],
    [1, 'Коли́ бу́де гото́во?', 'Kiedy będzie gotowe?'],
    [0, 'Че́рез ти́ждень.', 'Za tydzień.']
  ]},
  { id: 'szkola', t: 'Rozmowa z rodzicem', ua: 'У шко́лі', roles: ['Ма́ма', 'Учи́тель'], lines: [
    [0, 'До́брий день! Я ма́ма Андрі́я.', 'Dzień dobry! Jestem mamą Andrija.'],
    [1, 'До́брий день! Ду́же при́ємно. Сіда́йте, будь ла́ска.', 'Dzień dobry! Bardzo mi miło. Proszę usiąść.'],
    [0, 'Як Андрі́й навча́ється?', 'Jak Andrij się uczy?'],
    [1, 'До́бре. Він ду́же стара́ється, особли́во на уро́ках істо́рії.', 'Dobrze. Bardzo się stara, szczególnie na lekcjach historii.'],
    [0, 'А по́льська мо́ва?', 'A język polski?'],
    [1, 'Ще тро́хи ва́жко, але́ він шви́дко вчи́ться.', 'Jeszcze trochę trudno, ale szybko się uczy.'],
    [0, 'Чи мо́жу я чимо́сь допомогти́?', 'Czy mogę jakoś pomóc?'],
    [1, 'Так. Чита́йте з ним по-по́льськи вдо́ма.', 'Tak. Proszę czytać z nim po polsku w domu.'],
    [0, 'До́бре, дя́кую вам!', 'Dobrze, dziękuję panu!']
  ]},
  { id: 'dworzec', t: 'Na dworcu', ua: 'На вокза́лі', roles: ['Каси́рка', 'Пасажи́р'], lines: [
    [1, 'До́брий день. Оди́н квито́к до Ки́єва, будь ла́ска.', 'Dzień dobry. Jeden bilet do Kijowa, proszę.'],
    [0, 'На яки́й день?', 'Na który dzień?'],
    [1, 'На за́втра, на ра́нок.', 'Na jutro, na rano.'],
    [0, 'Є по́тяг о сьо́мій два́дцять.', 'Jest pociąg o siódmej dwadzieścia.'],
    [1, 'Чудо́во. Скі́льки ко́штує квито́к?', 'Świetnie. Ile kosztuje bilet?'],
    [0, 'Шістсо́т гри́вень.', 'Sześćset hrywien.'],
    [1, 'З яко́ї платфо́рми?', 'Z którego peronu?'],
    [0, 'З дру́гої. Щасли́вої доро́ги!', 'Z drugiego. Szczęśliwej podróży!']
  ]},
  { id: 'kawiarnia', t: 'W kawiarni', ua: 'У кав’я́рні', roles: ['Офіціа́нт', 'Гість'], lines: [
    [0, 'До́брий ве́чір! Що бу́дете замовля́ти?', 'Dobry wieczór! Co pan zamówi?'],
    [1, 'Мені́ ка́ву з молоко́м, будь ла́ска.', 'Dla mnie kawę z mlekiem, proszę.'],
    [0, 'А щось пої́сти?', 'A coś do jedzenia?'],
    [1, 'Так. Що ви пора́дите?', 'Tak. Co pan poleca?'],
    [0, 'Ра́джу наш медо́вик. Він ду́же смачни́й.', 'Polecam nasz miodownik. Jest bardzo smaczny.'],
    [1, 'До́бре, візьму́ медо́вик.', 'Dobrze, wezmę miodownik.'],
    [1, 'Раху́нок, будь ла́ска.', 'Rachunek, proszę.'],
    [0, 'Ось, будь ла́ска. Сто ві́сімдесят гри́вень.', 'Proszę. Sto osiemdziesiąt hrywien.']
  ]},
  { id: 'droga', t: 'Pytanie o drogę', ua: 'Як пройти́?', roles: ['Тури́ст', 'Перехо́жа'], lines: [
    [0, 'Ви́бачте, як пройти́ до музе́ю?', 'Przepraszam, jak dojść do muzeum?'],
    [1, 'Іді́ть пря́мо до пло́щі, а по́тім ліво́руч.', 'Proszę iść prosto do placu, a potem w lewo.'],
    [0, 'Це дале́ко?', 'Czy to daleko?'],
    [1, 'Ні, бли́зько. Хвили́н де́сять пі́шки.', 'Nie, blisko. Jakieś dziesięć minut pieszo.'],
    [0, 'А мо́жна дої́хати авто́бусом?', 'A można dojechać autobusem?'],
    [1, 'Так, тре́тім авто́бусом. Зупи́нка он там.', 'Tak, trójką. Przystanek jest tam.'],
    [0, 'Ду́же дя́кую!', 'Bardzo dziękuję!'],
    [1, 'Нема́ за що.', 'Nie ma za co.']
  ]}
];
