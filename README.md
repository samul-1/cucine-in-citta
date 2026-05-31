# Cucine in città

Micro-app Next.js — scopri le cucine disponibili in qualsiasi città nel mondo usando le API pubbliche di BestieBite.

## Come runnarlo localmente

```bash
pnpm install
pnpm dev
# apri http://localhost:3000
```

Per i test:

```bash
pnpm test
```

Nessuna variabile d'ambiente necessaria. Tutte le API sono pubbliche.

## Architettura

- **`app/page.tsx`** — Server Component shell; delega tutto a `<CucineInCitta>` (Client Component). Nessuna logica server-side: le API BestieBite sono pubbliche.
- **`components/cucine-in-citta.tsx`** — possiede l'unico stato locale della pagina (`selectedCity` - questo stato non viene utilizzato per alcuna funzionalità, ma permette di imitare il border della card come nel wireframe fornito). Implementa la state machine: idle → suggestions → cuisines (+ loading/error/empty per ogni transizione).
- **`hooks/`** — `useCitySearch` e `useCuisines` wrappano TanStack Query. Il debounce (250ms) è applicato allo stato, non alla queryFn, così la cache key resta stabile durante la digitazione.
- **`lib/schemas.ts`** — Zod valida le risposte API al boundary. `image_emoji` validata come URL, `type` è un literal `'cuisine'`. Questo consente di non avere alcun `as Type` nella codebase.
- **`lib/api.ts`** — fetch functions pure che chiamano le API BestieBite. Le chiamate sono dirette, senza Route Handler intermediari.

## Server Component vs Client Component

**Scelta:** `app/page.tsx` e `app/layout.tsx` sono Server Components; tutto sotto `components/` è Client per gestire l'interattività basata sullo stato locale.

**Perché non RSC per il data fetching?** L'autocomplete richiede interattività lato client (digitazione, debounce, dropdown). Aggiungere Route Handlers come proxy avrebbe aggiunto latenza senza benefici: le API BestieBite non richiedono auth e non espongono segreti. TanStack Query gestisce caching, retry e staleTime natively lato client, pertanto non c'è bisogno di un layer server-side.

**Perché non URL search params per la città?** Lo stato locale è la scelta minima e corretta per un flusso lineare a pagina singola. Detto questo, sarebbe utile per la condivisione dei link (vedi "Una cosa che farei diversamente con più tempo" sotto).

## Alcune scelte di design

La gestione della Italy map: invece di generare un SVG tramite AI (impreciso; nessun tentativo, nemmeno con Claude Design, generava una mappa realistica) o importare d3-geo (40KB di bundle per un elemento decorativo; costo troppo elevato), ho estratto il path della penisola da un GeoJSON Natural Earth semplificato (66 punti per la mainland + Sicilia + Sardegna), proiettato e serializzato come `public/italy.svg` statico; zero dipendenze, zero bundle cost.

Skeleton loader per le suggestions: invece di un semplice "Caricamento..." testuale, ho creato dei placeholder che imitano la struttura dei risultati finali (un rettangolo più grande per il nome della città e uno più piccolo per la nazione; per ridurre il jump visivo quando i risultati vengono caricati), con animazione di pulsing. Questo migliora l'esperienza utente durante il caricamento.

## "Una cosa che farei diversamente con più tempo"

Aggiungere URL search params per la città selezionata (`?city=Milano&lat=45.46&lng=9.17`) così i link alle cucine di una città specifica sarebbero condivisibili e il browser back/forward funzionerebbe in modo nativo. Aggiungerei anche `@tanstack/react-query` DevTools in development per ispezionare la cache durante lo sviluppo.
