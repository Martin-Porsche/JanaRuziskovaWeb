# Kompletní zadání pro vývoj webu: Portfolio vizážistky

Tohle je příručka a detailní prompt, jak chci, aby vypadal a fungoval tento web.

## Hlavní věci
Tento web má být pro paní Janu Růžičkovou, která už několik let dělá profesionální make-up ostatním lidem a samozřejmě i sobě. 
Chci, abys udělal ten web primárně v elegantní růžové paletě. Fotky z praxe budou ve složce `images/`, to samé i profilové fotky Jany. Chci, abys vytvářel další `.html` soubory podle potřeby a také oddělené `.css` soubory pro stylování. Bude také potřeba přidat JavaScript na animace, interaktivní prvky a celkově moderní frontend.

## Software & Architektura
- **Mobile-first přístup:** Tohle je absolutní priorita. Její klientela (převážně ženy) si to bude prohlížet ze 90 % na telefonech (Instagram/TikTok prokliky). Navrhni UI pro mobily a následně ho škáluj pro desktop.
- **Technologie:** Použij čisté a sémantické HTML5, moderní CSS3 (využij Flexbox a CSS Grid) a Vanilla JavaScript pro interakci (nepoužívej těžké frameworky, ať je to rychlé).

## Požadovaná struktura stránek
1. **`index.html` (Domovská stránka):** Poutavý hero banner (velká fotka Jany při práci nebo detail líčení), krátké představení, sekce s nejlepšími ukázkami práce a jasné Call-to-Action (CTA) tlačítko na rezervaci.
2. **`sluzby.html` (Služby a ceník):** Přehledný ceník rozdělený do kategorií (např. svatební líčení, večerní make-up, foto make-up, kurzy líčení).
3. **`galerie.html` (Portfolio):** Grid s fotkami z praxe. Tady pomocí JS naprogramuj responzivní "lightbox" galerii – když uživatel klikne na fotku, zvětší se přes celou obrazovku s možností listovat (šipky/swipe na mobilu).
4. **`kontakt.html` (Kontakt):** Funkční kontaktní formulář (udělej přes JS validaci políček před odesláním), odkazy na její sociální sítě (Instagram, Facebook), telefon a e-mail.

## Design & UI/UX detaily
- **Barevná paleta:** Nechceme žádnou křiklavou magentu z pouti. Použij elegantní a profi odstíny. Například světle pastelovou růžovou na pozadí (`#FDF0F3`), rose-gold detaily na tlačítka a linky (`#B76E79`) a tmavší tlumenou vínovou nebo grafitově šedou na texty pro skvělou čitelnost.
- **Typografie:** Pro nadpisy použij elegantní patkový (serif) font, který působí prémiově (např. *Playfair Display*). Pro běžný text použij čistý, moderní bezpatkový (sans-serif) font (např. *Montserrat* nebo *Lato*).
- **Interakce a Animace (JS/CSS):** 
  - Vytvoř funkční "hamburger" menu pro mobilní zobrazení, které plynule vyjede ze strany.
  - Implementuj "smooth scrolling" pro kotvy.
  - Přidej jemné "fade-in" nebo "slide-up" animace (např. pomocí Intersection Observer API v JS), aby se prvky na stránce elegantně objevovaly při scrollování dolů.