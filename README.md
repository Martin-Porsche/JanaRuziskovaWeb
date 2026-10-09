# Jana Ruzickova - blueprint webu

Staticky, mobile-first web v HTML, CSS a vanilla JavaScriptu. Bez buildu, instalace balicku a vlastniho backendu. Poptavky odesila externi sluzba FormSubmit.

## Otevreni

Otevrete `index.html` v prohlizeci. Stranky funguji i pres `file://`, ale prime odesilani formulare vyzaduje HTTP/HTTPS a internet. Pri otevreni z disku formular nabidne stazeni poptavky nebo otevreni e-mailove aplikace. Google Fonts potrebuji internet; bez nej se pouziji zalozni fonty.

Pro mistni zkouseni spustte z korenove slozky `python3 -m http.server 8765 --bind 127.0.0.1` a otevrete `http://127.0.0.1:8765/`. Na hostingu neni Python potreba.

## Soubory

- `index.html`: domovska stranka, predstaveni, sluzby, vyber portfolia.
- `sluzby.html`: ukazkovy cenik a nejcastejsi otazky.
- `galerie.html`: sest placeholderu, filtry, lightbox, sipky, Escape a swipe.
- `kontakt.html`: validace a odeslani poptavky pres FormSubmit, mistni e-mailova alternativa, informace o soukromi.
- `styles.css`: sdilene styly a responzivni layout.
- `script.js`: menu, animace, galerie a formular.
- `Images/placeholder.svg`: lokalni placeholder bez externich fotografii.

## Doplneni fotografii

Fotografie ulozte do existujici slozky `Images/` (velke I zachovejte i na hostingu). V HTML nahradte `src="Images/placeholder.svg"` konkretnimi cestami a aktualizujte `alt`, rozmery i popisky. U hero fotografie je vhodny siroky zaber s volnym prostorem vlevo pro text. Portrety a portfolio maji pomer 4:5. Pouzijte optimalizovane WebP nebo AVIF s JPEG zalohou podle potreby.

V galerii muzete na tlacitko `.gallery-item` pridat `data-full="Images/fotografie-ve-vetsim-rozliseni.webp"`. Lightbox jinak pouzije stejnou fotografii jako nahled. Barevne tridy `tone-sage` a `tone-deep` jsou jen pro placeholdery: po pridani skutecnych fotek je odstrante, aby se nemenily barvy make-upu. Odstrante take stitky `FOTOGRAFIE BRZY`, `PORTRÉT JANY` a popisek hero placeholderu.

## Kontakt a odesilani

Kontakty, lokalita ani socialni profily nebyly dodany, proto web neobsahuje vymyslene udaje. V `kontakt.html` nahradte texty kontaktu odkazy `mailto:`, `tel:` a skutecnymi URL Instagramu a Facebooku.

Formular odesila poptavky pres [FormSubmit](https://formsubmit.co/) na docasnou adresu `sekerabka@gmail.com`. S JavaScriptem pouziva AJAX: navstevnice zustane na kontaktni strance a vidi ruzove potvrzeni az po kladne odpovedi sluzby. Potvrzeni znamena prijeti sluzbou, nikoli zarucene doruceni do schranky nebo rezervaci terminu. Pri chybe, preruseni spojeni nebo cekani delsim nez 20 sekund se zachovaji vyplnene udaje a nabidne se e-mailova alternativa. Opakovani po nepotvrzenem odeslani muze vytvorit duplicitni poptavku.

Behem odesilani jsou pole a tlacitko zablokovane proti opakovanemu kliknuti. AJAX nezobrazuje interaktivni CAPTCHA; formular pouziva honeypot a ochrany poskytovatele. Pred verejnym spustenim overte ochranu proti spamu a limity sluzby. Bez JavaScriptu zustava nativni odeslani s kontrolou povinnych poli a presmerovanim na stranku FormSubmit, kde muze nasledovat Google reCAPTCHA.

### Vzhled e-mailu

AJAX posila cesky predmet, nazvy poli, nazvy sluzeb a cesky format data. Pole `_replyto` umoznuje odpovedet na adresu klientky. FormSubmit ale nabizi pouze sablony `basic`, `table` a `box`; jeho systemove texty ani barvy nelze upravit vlastnim HTML/CSS. Aktualne se pouziva `table`. Uplne cesky e-mail v ruzovem designu vyzaduje poskytovatele s vlastnimi sablonami (napriklad EmailJS) nebo vlastni backend. Pri zmene poskytovatele aktualizujte take informace o soukromi. Nikdy nevkladejte tajne prihlasovaci udaje do klientskych souboru.

### Prvni aktivace

1. Otevrete kontakt pres mistni server nebo hosting a odeslete zkusebni poptavku s neosobnimi testovacimi udaji.
2. Ve schrance `sekerabka@gmail.com` najdete aktivacni e-mail od FormSubmit a potvrdte jej. Zkontrolujte take spam. Bez aktivace nelze spolehat na dorucovani poptavek.
3. Po aktivaci odeslete dalsi zkusebni poptavku a overte jeji doruceni. Dorucovani znovu zkontrolujte po nasazeni na skutecny hosting.

### Kdyz odesilani na GitHub Pages nefunguje

Aktivace pri vyvoji na localhostu nezarucuje aktivaci nasazeneho formulare. Pokud FormSubmit odpovi `This form needs Activation`, najdete ve schrance prijemce nejnovejsi aktivacni e-mail pro nasazenou adresu, kliknete na `Activate Form` a odeslete poptavku znovu. Zkontrolujte i spam. Puvodni nepotvrzena poptavka neni dukazem doruceni.

Skript rozpozna aktivaci i pri `success: false`. Pri jinem odmitnuti zobrazi HTTP stav a zpravu sluzby; pri chybe spojeni zachova vyplnene udaje. Po uprave skriptu publikujte zmeny do vetve pouzivane GitHub Pages, pockejte na dokonceni nasazeni a obnovte stranku bez cache (`Ctrl+Shift+R`).

Pri zmene prijemce upravte na formulari `action="https://formsubmit.co/novy-email"` i `data-recipient="novy-email"`, text v sekci soukromi a tento navod. Novou adresu bude nutne aktivovat. Adresa je verejna ve zdrojovem kodu; FormSubmit po aktivaci nabizi take identifikator pro jeji skryti v endpointu.

Pri otevreni pres `file://` se formular neposila do FormSubmit. Nabidne stazeni textu nebo otevreni poptavky v e-mailove aplikaci; uzivatel ji musi sam odeslat.

Web neuklada obsah poptavky do localStorage ani cookies. Pri primem odeslani se ale udaje predaji FormSubmit a cilove e-mailove schrance. Podle dokumentace sluzba uchovava poptavky 30 dnu. Pred zverejnenim doplnte udaje spravce a finalni informace o zpracovani osobnich udaju a overte vhodnost sluzby pro zamyslene pouziti. Nikdy nevkladejte tajne API klice do frontendu.

## Pred zverejnenim

- Potvrdte cenik, popisy sluzeb a vsechny obchodni podminky s Janou. Uvedene ceny jsou oznacene jako ukazkove.
- Doplnte fotografie se souhlasem fotografovanych osob, skutecne kontakty a lokalitu.
- Aktivujte cilovou adresu FormSubmit, overte skutecne dorucovani z hostingu a dokoncete pravni informace.
- Zkontrolujte web na mobilu, ovladani klavesnici a obsah s realnymi fotografiemi.

Web respektuje `prefers-reduced-motion`. Menu ma ovladani klavesnici; lightbox pouziva nativni dialog a vraci fokus na otevreny nahled.