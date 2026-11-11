# Jana Ruzickova - blueprint webu

Staticky, mobile-first web v HTML, CSS a vanilla JavaScriptu. Bez buildu, instalace balicku a vlastniho backendu. Prime odesilani poptavek je napojene na EmailJS s vlastni ceskou ruzovou sablonou.

## Otevreni

Otevrete `index.html` v prohlizeci. Stranky funguji i pres `file://`, ale prime odesilani formulare vyzaduje HTTP/HTTPS a internet. Pri otevreni z disku formular nabidne stazeni poptavky nebo otevreni e-mailove aplikace. Google Fonts potrebuji internet; bez nej se pouziji zalozni fonty.

Pro mistni zkouseni spustte z korenove slozky `python3 -m http.server 8765 --bind 127.0.0.1` a otevrete `http://127.0.0.1:8765/`. Na hostingu neni Python potreba.

## Soubory

- `index.html`: domovska stranka, predstaveni, sluzby, vyber portfolia.
- `sluzby.html`: ukazkovy cenik a nejcastejsi otazky.
- `galerie.html`: sest skutecnych ukazek svatebniho, vecerniho a plesoveho liceni, filtry, lightbox, sipky, Escape a swipe.
- `kontakt.html`: validace a odeslani poptavky pres EmailJS, e-mailova alternativa, informace o soukromi.
- `email-template.html`: ceska ruzova HTML sablona pro EmailJS, take samostatny nahled v prohlizeci.
- `styles.css`: sdilene styly a responzivni layout.
- `script.js`: menu, animace, galerie a formular.
- `Images/`: portret Jany a fotografie pro portfolio; puvodni `placeholder.svg` zustava jako rezerva.

## Doplneni fotografii

Fotografie jsou ve slozce `Images/` (velke I zachovejte i na hostingu). `Jana.png` je pouzita v banneru a predstaveni, `svatba1.jpeg` az `svatba4.jpeg` tvori svatebni kategorii, `Večerní.jpeg` vecerni a `Ples.jpeg` plesovou. Cislice rozlisuji vice ukazek stejne kategorie a v galerii zachovavaji poradi.

Pri pridani dalsi fotografie doplnte prislusne `.gallery-item` v `galerie.html`, nastavte `data-category`, `src`, `alt`, skutecne rozmery a popisky. Samotne pridani souboru do slozky novou polozku nevytvori. Portfolio ma ctvercove nahledy s `object-fit: contain`, aby kolaze pred a po zustaly cele; portret v predstaveni ma pomer 4:5. Pouzijte optimalizovane WebP nebo AVIF s JPEG zalohou podle potreby.

V galerii muzete na tlacitko `.gallery-item` pridat `data-full="Images/fotografie-ve-vetsim-rozliseni.webp"`. Lightbox jinak pouzije stejnou fotografii jako nahled. Na skutecne fotky nepridavejte barevne tridy `tone-sage` a `tone-deep`, aby se nemenily barvy make-upu.

## Kontakt a odesilani

Kontakty, lokalita ani socialni profily nebyly dodany, proto web neobsahuje vymyslene udaje. V `kontakt.html` nahradte texty kontaktu odkazy `mailto:`, `tel:` a skutecnymi URL Instagramu a Facebooku.

Formular pouziva primo REST API [EmailJS](https://www.emailjs.com/docs/rest-api/send/), bez dalsi knihovny nebo buildu. V `kontakt.html` je vyplnena sluzba `service_dk5npqe`, sablona `template_lke91nn` a verejny klic uctu. Prijemce je v EmailJS nastaveny napevno na `sekerabka@gmail.com`. Pri nedostupnosti sluzby lze poptavku stahnout nebo otevrit v e-mailove aplikaci a samostatne odeslat. Pokud nektery verejny identifikator chybi, data se do API neposilaji a nabidne se tato alternativa.

Overeni 6. 11. 2026: skutecny test z mistniho webu vratil `200 OK`, historie EmailJS zaznamenala `OK` a prijemce potvrdil doruceni i spravny ruzovy cesky vzhled. Po publikovani zmen na GitHub Pages znovu overte odeslani z nasazene adresy.

Pri odesilani zustane navstevnice na kontaktni strance. Ruzove potvrzeni se objevi pouze po odpovedi `200 OK` s telem `OK`, podle kontraktu API. Potvrzeni znamena prijeti sluzbou, nikoli zarucene doruceni do schranky nebo rezervaci terminu. Pri chybe, preruseni spojeni nebo cekani delsim nez 20 sekund se zachovaji vyplnene udaje a nabidne se e-mailova alternativa. Opakovani po nepotvrzenem odeslani muze vytvorit duplicitni poptavku. Behem odesilani jsou pole a tlacitko zablokovane proti opakovanemu kliknuti.

### Pripojeni uctu EmailJS

1. Prihlaste se nebo zalozte ucet v [EmailJS dashboardu](https://dashboard.emailjs.com/sign-up). Hesla a autorizaci schranky zadavejte vyhradne na strankach poskytovatele, nikdy do chatu nebo zdrojoveho kodu.
2. V `Email Services` pridejte odesilaci sluzbu, pripojte schranku a provedte test spojeni. Poznamenejte si `Service ID`.
3. V `Email Templates` vytvorte sablonu, v editoru HTML vlozte obsah `email-template.html` a ulozte ji. Nastavte `To Email` napevno na `sekerabka@gmail.com`, `From Name` na `Jana Ruzickova | Web`, adresu odesilatele ponechte podle pripojene sluzby, `Reply To` na `{{reply_to}}` a predmet na `Nova poptavka liceni: {{service}}` (diakritiku lze v dashboardu pouzit). Poznamenejte si `Template ID`.
4. V nastaveni uctu najdete `Public Key`. Do atributu formulare v `kontakt.html` vyplnte `data-emailjs-service`, `data-emailjs-template` a `data-emailjs-public-key`. Jde o verejne identifikatory urcene pro prohlizec, nikoli soukromy API klic. Do webu nikdy nevkladejte `Private Key`, heslo ani pristupovy token.
5. Publikujte zmeny na GitHub Pages a odeslete vlastni test. Overte doruceni, cesky obsah, vzhled e-mailu a adresu, ktera se pouzije po kliknuti na Odpovedet. Samotne mistni testy s nasimulovanym API neprokazuji skutecne dorucovani.

Prijemce nastavujte napevno v EmailJS, ne pomoci promenne z prohlizece. API dostava pouze `client_name`, `reply_to`, `phone`, `service`, `date`, `place` a `message`; tyto nazvy odpovidaji HTML sablone. Pouzivejte escapovane promenne `{{promenna}}`, nikoli neescapovane trojite zavorky. Odpovedi klientek smeruji pres `Reply To` na jejich adresu, nikoli pres zmenu adresy odesilatele.

### Vzhled a ochrana proti spamu

Sablona ma ceske popisky a ruzovou paletu webu. Pouziva e-mailove tabulky, vlozene styly a systemove zalozni fonty, takze nepotrebuje nacitat CSS ani Google Fonts. Otevreni samotneho HTML zobrazi promenne v zavorkach; EmailJS je nahradi pri odeslani. Bezplatny tarif muze k e-mailu pridat logo sluzby. Limity a branding overte v aktualnim ceniku.

Formular ma honeypot a ochranu proti dvojimu kliknuti; nejde o serverovou ochranu proti spamu. Pred verejnym pouzitim nastavte ochrany v uctu, sledujte kvotu a dorucitelnost. Pokud tarif podporuje seznam povolenych domen, povolte `https://martin-porsche.github.io` a vyvojovou adresu. K dalsimu zabezpeceni lze zapojit [reCAPTCHA v2](https://www.emailjs.com/docs/user-guide/adding-captcha-verification/); soucasny formular token CAPTCHA neposila, takze zapnuti povinne CAPTCHA v sablone vyzaduje soucasne doplnit widget a token do formulare. Tajny klic CAPTCHA patri jen do nastaveni poskytovatele, ne do webu.

### Nahradni odesilani a soukromi

Bez JavaScriptu je formular zablokovany a stranka nabidne primy e-mailovy odkaz. Pri otevreni pres `file://` JavaScript pripravi text a e-mailovou alternativu, ale do EmailJS nic neposila. Pri zmene prijemce upravte pevne `To Email` v EmailJS, `data-recipient`, e-mail v `noscript` a text soukromi v `kontakt.html`.

Web neuklada obsah poptavky do localStorage ani cookies. Pri primem odeslani se udaje predaji EmailJS, pripojenemu poskytovateli e-mailu a prijemci. Na sablone je zapnuto `Do not save private data`: hodnoty parametru se neukladaji do historie EmailJS a nelze z ni zpravu znovu odeslat. Provozni metadata se ridi podminkami poskytovatele, dorucena zprava zustava ve schrance. Pred zverejnenim doplnte udaje spravce a finalni informace o zpracovani osobnich udaju a overte vhodnost sluzby pro zamyslene pouziti.

## Pred zverejnenim

- Potvrdte cenik, popisy sluzeb a vsechny obchodni podminky s Janou. Uvedene ceny jsou oznacene jako ukazkove.
- Overte souhlasy ke zverejneni fotografii a doplnte skutecne kontakty a lokalitu.
- Dokoncete nastaveni EmailJS, ochranu proti spamu a skutecny test dorucovani z hostingu. Dokoncete pravni informace.
- Zkontrolujte web na mobilu, ovladani klavesnici a obsah s realnymi fotografiemi.

Web respektuje `prefers-reduced-motion`. Menu ma ovladani klavesnici; lightbox pouziva nativni dialog a vraci fokus na otevreny nahled.