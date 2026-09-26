U prodavnici se prodaje puno vrsta proizvoda i njihovi bar-kodovi su poznati, dati kao **sortiran** spisak. Proizvođač dostavlja spisak bar-kodova svojih proizvoda, bez posebnog redosleda. Tvoj zadatak je da odrediš koliko se proizvoda tog proizvođača već prodaje u prodavnici.

## Ulaz

U prvoj liniji je jedan ceo broj $t$ - broj test primera.

- U prvoj liniji svakog test primera su dva cela broja $n$ i $q$ - broj proizvoda u prodavnici i broj proizvođačevih proizvoda.
- U sledećoj liniji je $n$ celih brojeva u **rastućem redosledu** - bar-kodovi proizvoda u prodavnici.
- U sledećoj liniji je $q$ celih brojeva - bar-kodovi proizvođačevih proizvoda.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji broj proizvođačevih bar-kodova koji se nalaze na spisku prodavnice.

## Primer

```Input
1
5 5
1 3 5 6 7
2 3 4 5 8
```

```Output
2
```

Od proizvođačevih bar-kodova, samo se $3$ i $5$ nalaze na spisku prodavnice.

## Ograničenja

$1 \le t \le 1000$
$1 \le n, q \le 2 \cdot 10^5$
$1 \le a_i \le 10^9$
I zbir svih $n$ i zbir svih $q$ po test primerima su najviše $2 \cdot 10^5$.

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Provera bar-kodova](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/binarna_pretraga), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
