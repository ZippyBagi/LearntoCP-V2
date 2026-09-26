Ako je dato nekoliko prostih brojeva, njihov proizvod se lako izračuna. Obrnut smer je mnogo teži: iz proizvoda pronaći proste brojeve koji ga sačinjavaju. Tvoj zadatak je da ispišeš rastavljanje svakog datog broja na proste činioce.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U svakoj od sledećih $t$ linija je po jedan ceo broj $n$.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji proste činioce broja $n$ u **rastućem redosledu**, razdvojene po jednim razmakom. Svaki prost broj se pojavljuje onoliko puta koliko puta deli $n$.

## Primer

```Input
2
900
97
```

```Output
2 2 3 3 5 5
97
```

$900 = 2 \cdot 2 \cdot 3 \cdot 3 \cdot 5 \cdot 5$, a $97$ je prost, pa je sam sebi celo rastavljanje.

## Ograničenja

$1 \le t \le 100$
$2 \le n \le 2 \cdot 10^9$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Rastavljanje na proste činioce](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/rastavljanje_na_proste_cinioce), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
