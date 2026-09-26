Nadovezivanje dva broja $x$ i $y$ znači zapisivanje cifara broja $y$ odmah posle cifara broja $x$: nadovezivanjem $123$ i $45$ dobija se $12345$. Za dati niz brojeva, tvoj zadatak je da nađeš **najmanji** broj koji može da se dobije nadovezivanjem svih njih, svakog upotrebljenog tačno jednom, u nekom redosledu.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
Svaki test primer čine dve linije: u prvoj je ceo broj $n$ - broj elemenata, a u drugoj je $n$ celih brojeva $a_0, a_1, \ldots, a_{n-1}$.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji najmanji broj koji se dobija nadovezivanjem svih datih brojeva.

## Primer

```Input
2
5
32 11 987 12 3
2
91919 919191
```

```Output
1112323987
91919191919
```

U prvom test primeru redosled $11, 12, 32, 3, 987$ daje najmanji rezultat - primeti da $32$ ide **pre** $3$. U drugom, početak sa $919191$ pobeđuje početak sa $91919$.

## Ograničenja

$1 \le t \le 1000$
$1 \le n \le 10^5$
$1 \le a_i \le 10^9$
$n_1 + n_2 + \ldots + n_t \le 10^5$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Najmanji broj nadovezivanjem više brojeva](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/najmanji_broj_nadovezivanjem), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
