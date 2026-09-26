Zavod za statistiku želi da objavi pošten podatak o prosečnoj plati. Aritmetička sredina se pokazala kao loš izbor - nekoliko ljudi sa ogromnim platama je podigne daleko iznad onoga što zarađuje običan čovek. Zato su prešli na **medijanu**: poređaj sve plate u neopadajući niz i uzmi onu na sredini. Ako je broj plata paran, nema jedne središnje, pa je medijana aritmetička sredina **dve** središnje vrednosti.

Na primer, medijana niza $1, 2, 4, 7, 9$ je $4$, a medijana niza $1, 2, 4, 5, 7, 9$ je $4.5$.

Plate pristižu jedna po jedna, i u svakom trenutku zavod može da zatraži medijanu svega što je do tada prijavljeno. Napiši program koji odgovara na svako takvo pitanje.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U prvoj liniji svakog test primera je ceo broj $q$ - broj operacija.
U svakoj od sledećih $q$ linija je po jedna operacija, u jednom od dva oblika:

- `d x` - prijavljena je nova plata $x$;
- `m` - ispiši medijanu svih do tada prijavljenih plata u tom test primeru.

Prva operacija svakog test primera je sigurno oblika `d x`.

## Izlaz

Za svaku operaciju `m`, redom kojim se operacije pojavljuju, ispiši u posebnoj liniji medijanu u tom trenutku, zaokruženu na **jednu decimalu**.

## Primer

```Input
1
6
d 5
d 7
d 6
m
d 8
m
```

```Output
6.0
6.5
```

Kod prvog pitanja prijavljene plate su $5, 7, 6$, što sortirano daje $5, 6, 7$ - središnja je $6$. Kod drugog pitanja to su $5, 6, 7, 8$, pa je medijana sredina dve središnje vrednosti, $(6 + 7) / 2 = 6.5$.

## Ograničenja

$1 \le t \le 10$
$1 \le q \le 10^5$
zbir svih $q$ po test primerima ne prelazi $2 \cdot 10^5$
$1 \le x \le 10^9$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Ažuriranje medijane](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/azuriranje_medijane), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
