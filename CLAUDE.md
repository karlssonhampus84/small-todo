# TodoApp — Instruktionsfil för Claude Code

## Vad ska byggas?
En mörk, snabb och minimalistisk todo-app. Fokus på att lägga till, bocka av och ta bort uppgifter med så lite friktion som möjligt. Ingen AI, inga kategorier, ingen onödig komplexitet — bara en riktigt välgjord todo-app.

## Tech-stack
- **React + Vite** (lokalt dev-environment)
- **CSS Modules** eller **Tailwind** för styling
- **localStorage** för persistens — ingen backend behövs
- Inga externa UI-bibliotek

## Design
### Känsla
Mörk, tech, fokuserad. Tänk terminal möter modern app-design. Industriell/utilitarian men med polerade detaljer.

### Färgpalett (CSS-variabler)
```css
--bg:           #0d0d0d;   /* nästan svart bakgrund */
--surface:      #161616;   /* kort/input-yta */
--border:       #2a2a2a;   /* subtil avgränsare */
--accent:       #e5a00d;   /* varm gul accent (StreamFinder-arv) */
--text-primary: #f0f0f0;
--text-muted:   #666;
--done:         #3a3a3a;   /* avbockade items tonas ned */
```

### Typografi
- Monospace för todo-texten (t.ex. `JetBrains Mono` eller `IBM Plex Mono` från Google Fonts)
- Sans-serif för UI-element (t.ex. `DM Sans`)

### Layout
- Centrerad kolumn, max-bredd 600px, mobilanpassad
- Kompakt — ingen onödig whitespace
- Header: app-namn + antal kvarstående uppgifter
- Inputfält överst, lista under
- Varje todo-rad: checkbox | text | delete-knapp

## Funktioner (MVP)
1. **Lägg till todo** — via inputfält + Enter (eller knapp)
2. **Bocka av todo** — klick på checkbox, texten stryks över och tonas ned
3. **Ta bort todo** — delete-knapp synlig på hover
4. **Persistens** — sparas i localStorage, finns kvar vid reload
5. **Tomt state** — visar ett enkelt meddelande när listan är tom (t.ex. "Inget att göra.")

## Beteende & UX-detaljer
- Fokus hamnar automatiskt i inputfältet vid sidladdning
- Enter skickar formuläret, Escape rensar inputfältet
- Tomma todos ska inte kunna läggas till
- Avbockade todos hamnar sist i listan (eller kan filtreras bort)
- Smidig transition när todos läggs till/tas bort

## Vad som INTE ska byggas (MVP)
- Kategorier eller taggar
- Prioritering eller deadline
- Drag & drop
- AI-funktionalitet
- Backend eller användarhantering
- Dark/light mode-toggle (alltid mörkt)

## Arbetsflöde & roller
Projektet använder ett rollbaserat arbetsflöde med separata Claude Code-körningar. Varje roll triggas manuellt och har ett tydligt ansvar.

### Roller

**Strategen**
Du är en teknisk produktstrateg. Din uppgift är att ta en lös idé och forma den till ett tydligt kravdokument. Fyll i hålen, identifiera edge cases, föreslå teknisk lösning och lista exakt vad Utvecklaren ska implementera. Ställ frågor om något är oklart innan du levererar. Leverera ett strukturerat kravdokument, inte kod.

**Utvecklaren**
Du är en senior React-utvecklare. Din uppgift är att implementera exakt vad Strategens kravdokument säger — varken mer eller mindre. Skriv ren, läsbar kod enligt projektets filstruktur och konventioner. När implementationen är klar skriver du Playwright-tester för varje ny funktion. Sätt `data-testid`-attribut på alla interaktiva element.

**Bugg-jägaren**
Du är en noggrann QA-ingenjör. Din uppgift är att köra alla Playwright-tester och verifiera att implementationen faktiskt fungerar. Kör `npx playwright test`, tolka resultaten och rapportera: vad som fungerar, vad som fallerar och varför. Föreslå fix men implementera ingenting själv.

### Hur du triggar en roll
Starta varje körning med rollens namn:
- *"Du är Strategen. Här är idén: ..."*
- *"Du är Utvecklaren. Här är kravdokumentet: ..."*
- *"Du är Bugg-jägaren. Kör testerna och rapportera."*

## Testning med Playwright
Playwright används för end-to-end-tester — dvs. tester som simulerar en riktig användare i webbläsaren.

### Vad ska testas
Täck alla MVP-funktioner med ett test vardera:
1. Lägg till en todo och verifiera att den syns i listan
2. Bocka av en todo och verifiera att den stryks över
3. Ta bort en todo och verifiera att den försvinner
4. Verifiera att listan är tom vid första besök (tomt state)
5. Verifiera att todos finns kvar efter reload (localStorage)
6. Verifiera att tomma todos inte kan läggas till

### Konventioner
- Testfiler ligger i `tests/`
- Ett test per funktion, tydliga svenska eller engelska beskrivningar
- Använd `data-testid`-attribut på viktiga element (input, checkbox, delete-knapp) för stabila selektorer

### Köra tester
```bash
npx playwright test          # kör alla tester
npx playwright test --ui     # kör med visuellt UI
```

## Filstruktur
```
todo-app/
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── TodoInput.jsx
│   │   ├── TodoList.jsx
│   │   └── TodoItem.jsx
│   ├── hooks/
│   │   └── useTodos.js      # logik + localStorage
│   └── index.css
├── tests/
│   └── todo.spec.js         # Playwright e2e-tester
├── index.html
├── playwright.config.js
├── vite.config.js
└── CLAUDE.md
```

## Lokalt
```bash
npm install
npm run dev
```
Appen körs på `http://localhost:5173`

```bash
npx playwright test
```
Kör testerna mot den lokala dev-servern.
