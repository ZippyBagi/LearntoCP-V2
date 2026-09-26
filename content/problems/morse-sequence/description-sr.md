Radio stanica emituje signal koji nikada ne prestaje.

Emisija počinje jednom jedinom cifrom, $1$. Svaki put kada operater ispiše blok od $2^k$ cifara, stanica ponovi ceo taj blok invertovan - svaka $1$ se vraća kao $0$, a svaka $0$ kao $1$ - i invertovana kopija se nadoveže na sve što je do tada zapisano.

Zapis tako raste ovako:


`1`
`1 0`
`1 0 0 1`
`1 0 0 1 0 1 1 0`

Za datu poziciju $n$ javi koja cifra stoji na toj poziciji. Pozicije se broje počev od $1$.

## Ulaz

U prvom redu ulaza je ceo broj $t$ - broj test primera.
U svakom od narednih $t$ redova nalazi se ceo broj $n$ - pozicija u signalu.

## Izlaz

Za svaki test primer ispiši u zasebnom redu cifru ($0$ ili $1$) na poziciji $n$.

## Primer

```Input
6
1
7
8
15
1234
12345678
```

```Output
1
1
0
0
0
1
```

Signal počinje sa $1, 0, 0, 1, 0, 1, 1, 0, \ldots$, pa se na poziciji $1$ i na poziciji $7$ nalazi $1$, dok je na poziciji $8$ cifra $0$.

## Ograničenja

$1 \le t \le 10^5$
$1 \le n \le 10^{18}$

---

Zadatak je, uz dozvolu, preuzet iz zadatka [Morzeov niz](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/morzeov_niz), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.
