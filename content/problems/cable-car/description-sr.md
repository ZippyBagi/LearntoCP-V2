Žičara se penje uz planinu po savršeno pravoj liniji. Usput prolazi pored $n$ stubova, a svaki stub stoji negde na toj istoj pravoj.

Inženjer koji je premeravao planinu zapisao je stubove onim redom kojim je nailazio na njih, a to nije red kojim ih kabina prolazi. Jednu stvar je ipak zabeležio: **prva dva** stuba u njegovom spisku zapisana su onim redom kojim ih kabina sreće, pa ta dva zajedno govore u kom smeru se kabina kreće.

Tvoj zadatak je da ceo spisak vratiš u redosled kretanja.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.

- U prvoj liniji svakog test primera je jedan ceo broj $n$ - broj stubova.
- U svakoj od sledećih $n$ linija su dva cela broja $x_i$ i $y_i$ - položaj jednog stuba.

Svih $n$ stubova u jednom test primeru su **različiti** i leže na jednoj pravoj. Kabina se kreće od prvog stuba iz spiska ka drugom.

## Izlaz

Za svaki test primer ispiši $n$ linija, položaje stubova onim redom kojim ih kabina prolazi, po dva cela broja u liniji.

## Primer

```Input
2
5
9 4
5 2
15 7
7 3
13 6
4
0 0
0 5
0 -3
0 9
```

```Output
15 7
13 6
9 4
7 3
5 2
0 -3
0 0
0 5
0 9
```

U prvom test primeru kabina ide od $(9, 4)$ ka $(5, 2)$, dakle nadole i ulevo, pa je stub na $(15, 7)$ onaj na koji prvo naiđe. U drugom test primeru prava je vertikalna, pa redosled nema nikakve veze sa $x$.

## Ograničenja

$1 \le t \le 10$
$3 \le n \le 5 \cdot 10^4$
$-10^6 \le x_i, y_i \le 10^6$
$n_1 + n_2 + \ldots + n_t \le 10^5$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Sortiranje duž linije](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka3/sortiranje_duz_linije), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
