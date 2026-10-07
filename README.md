# Jana Ruzickova - blueprint webu

Staticky, mobile-first web v HTML, CSS a vanilla JavaScriptu. Bez buildu, instalace balicku a backendu.

## Otevreni

Otevrete `index.html` v prohlizeci. Vsechny ctyri stranky funguji i pres `file://`. Google Fonts potrebuji internet; bez nej se pouziji zalozni fonty.

## Soubory

- `index.html`: domovska stranka, predstaveni, sluzby, vyber portfolia.
- `sluzby.html`: ukazkovy cenik a nejcastejsi otazky.
- `galerie.html`: sest placeholderu, filtry, lightbox, sipky, Escape a swipe.
- `kontakt.html`: validace poptavky, stazeni textu, informace o soukromi.
- `styles.css`: sdilene styly a responzivni layout.
- `script.js`: menu, animace, galerie a formular.
- `Images/placeholder.svg`: lokalni placeholder bez externich fotografii.

## Doplneni fotografii

Fotografie ulozte do existujici slozky `Images/` (velke I zachovejte i na hostingu). V HTML nahradte `src="Images/placeholder.svg"` konkretnimi cestami a aktualizujte `alt`, rozmery i popisky. U hero fotografie je vhodny siroky zaber s volnym prostorem vlevo pro text. Portrety a portfolio maji pomer 4:5. Pouzijte optimalizovane WebP nebo AVIF s JPEG zalohou podle potreby.

V galerii muzete na tlacitko `.gallery-item` pridat `data-full="Images/fotografie-ve-vetsim-rozliseni.webp"`. Lightbox jinak pouzije stejnou fotografii jako nahled. Barevne tridy `tone-sage` a `tone-deep` jsou jen pro placeholdery: po pridani skutecnych fotek je odstrante, aby se nemenily barvy make-upu. Odstrante take stitky `FOTOGRAFIE BRZY`, `PORTRÉT JANY` a popisek hero placeholderu.

## Kontakt a odesilani

Kontakty, lokalita ani socialni profily nebyly dodany, proto web neobsahuje vymyslene udaje. V `kontakt.html` nahradte texty kontaktu odkazy `mailto:`, `tel:` a skutecnymi URL Instagramu a Facebooku.

Formular nyni neposila nic na server. Po validaci pripravi textovou poptavku ke stazeni. Osobni udaje se neukladaji do localStorage ani cookies.

Pro odeslani pres e-mailovou aplikaci vyplnte na formulari `data-recipient="skutecny-email@domena.cz"`. Po validaci se objevi tlacitko pro otevreni e-mailu; uzivatel jej musi sam odeslat. Aktualizujte i uvodni poznamku formulare.

Prime odesilani bez e-mailove aplikace vyzaduje backend nebo formularovou sluzbu: pred zverejnenim zapojte skutecny endpoint, serverovou validaci, ochranu proti spamu a finalni informace o zpracovani osobnich udaju. Nikdy nevkladejte tajne API klice do frontendu.

## Pred zverejnenim

- Potvrdte cenik, popisy sluzeb a vsechny obchodni podminky s Janou. Uvedene ceny jsou oznacene jako ukazkove.
- Doplnte fotografie se souhlasem fotografovanych osob, skutecne kontakty a lokalitu.
- Dokoncete zvoleny zpusob odesilani a pravni informace.
- Zkontrolujte web na mobilu, ovladani klavesnici a obsah s realnymi fotografiemi.

Web respektuje `prefers-reduced-motion`. Menu ma ovladani klavesnici; lightbox pouziva nativni dialog a vraci fokus na otevreny nahled.