U Saransku se održavaju izbori za titulu "Najbolji broj". Na biralištu se nalazi $n$ ljudi, a $i$-ti od njih nosi broj $a_i$.

Kada čovek uđe u kabinu, ne glasa za svoj broj - glasa za kandidata koji je **delilac** tog broja. Dakle $i$-ti čovek bira neko $p_i$ koje deli $a_i$ (to može biti $1$, ili sam $a_i$, ili bilo šta između).

Kada svi izglasaju, ostaje nam niz glasova $[p_1, p_2, \ldots, p_n]$. Organizator kaže da su izbori **idealni** kada je najmanji zajednički sadržalac svih glasova jednak njihovom proizvodu:

$$nzs(p_1, p_2, \ldots, p_n) = p_1 \cdot p_2 \cdot \ldots \cdot p_n$$

Ovde je $nzs$ **najmanji zajednički sadržalac** - najmanji broj deljiv svakim $p_i$.

Prebroj koliko različitih idealnih nizova glasova postoji. Dva niza su različita ako se razlikuju u **bar jednoj** poziciji. Broj može biti ogroman, pa ispiši rezultat po modulu $10^9 + 7$.

## Ulaz

U prvom redu je broj test primera $t$.

Svaki test primer zauzima dva reda. U prvom redu je ceo broj $n$ - broj glasača. U drugom redu je $n$ celih brojeva $a_1, a_2, \ldots, a_n$ - brojevi koje nose.

Zbir svih $n$ preko svih test primera nije veći od $10^5$.

## Izlaz

Za svaki test primer ispiši u zasebnom redu broj idealnih nizova glasova, po modulu $10^9 + 7$.

## Primer

```Input
4
4
2 3 1 4
2
2 4
6
3 9 1 6 4 5
7
1 2 3 67 13 8 8
```

```Output
8
4
40
64
```

U prvom testu to rešenje je $8$ ispravnih nizova - na primer, svi glasaju $1$, ili četvrti čovek glasa $4$ dok ostali glasaju $1$, itd...

## Ograničenja

$1 \le t \le 10^4$
$1 \le n \le 10^5$
$1 \le a_i \le 5 \cdot 10^5$
Zbir svih $n$ preko svih test primera nije veći od $10^5$.

---

Zadatak je adaptiran iz zadatka [Elections in Saransk (easy version)](https://codeforces.com/contest/2236/problem/F1), zadatak F1 sa Codeforces Round 1103 (Div. 3).
