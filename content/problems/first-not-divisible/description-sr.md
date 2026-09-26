Posmotri niz $210, 2310, 390, 30, 510, 66, 6, 138, 46, 106, 59, 17, 23$. Zanimljiv je iz više razloga. Prvih pet brojeva je deljivo sa $10$, a posle toga nijedan broj nije deljiv sa $10$. Prvih deset brojeva je parno, a posle su svi neparni. Prvih osam brojeva je deljivo sa $6$, a posle nijedan nije. Ovakvi nizovi imaju posebno svojstvo: za određene delioce, brojevi deljivi tim deliocem idu **prvi**, a za njima idu samo brojevi koji nisu deljivi.

Dat ti je takav niz i $q$ delilaca. Za svaki delilac je **garantovano** (i nije potrebno proveravati) da elementi deljivi njime čine prefiks niza - tvoj zadatak je da za svaki delilac odrediš koliko je elemenata deljivo njime.

## Ulaz

U prvoj liniji je jedan ceo broj $t$ - broj test primera.

- U prvoj liniji svakog test primera su dva cela broja $n$ i $q$ - broj elemenata i broj delilaca.
- U sledećoj liniji je $n$ prirodnih brojeva - elementi niza.
- U sledećoj liniji je $q$ prirodnih brojeva - delioci.

## Izlaz

Za svaki delilac ispiši u posebnoj liniji broj elemenata deljivih njime.

## Primer

```Input
1
13 6
210 2310 390 30 510 66 6 138 46 106 59 17 23
10 2 6 2 4 15
```

```Output
5
10
8
10
0
5
```

Prvih pet elemenata je deljivo sa $10$, prvih deset sa $2$, prvih osam sa $6$, nijedan sa $4$ i prvih pet sa $15$.

## Ograničenja

$1 \le t \le 1000$
$1 \le n, q \le 2 \cdot 10^5$
$1 \le a_i < 10^{18}$
$1 \le d < 10^{18}$ za svaki delilac $d$
I zbir svih $n$ i zbir svih $q$ po test primerima su najviše $2 \cdot 10^5$.

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Prvi koji nije deljiv](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/prvi_paran1), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
