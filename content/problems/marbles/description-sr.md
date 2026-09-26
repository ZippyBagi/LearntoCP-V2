Marko je poređao $n$ klikera u boji u jedan red. Voli da mu bude uredno, pa hoće da svaka boja završi u **jednom jedinom bloku**: svi klikeri te boje jedan do drugog, bez ijednog klikera druge boje između njih.

Jedini potez koji sme da odigra je da izabere dva **susedna** klikera i zameni im mesta.

Odredi najmanji broj zamena posle kojih je red uredan. Blokovi mogu da završe u bilo kom poretku - važno je samo da svaka boja čini tačno jedan od njih.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U prvoj liniji svakog test primera je jedan ceo broj $n$ - broj klikera.
U drugoj liniji je $n$ celih brojeva $a_1, a_2, \dots, a_n$ - boja svakog klikera, redom kojim leže.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji najmanji potreban broj zamena.

## Primer

```Input
3
7
3 4 2 3 4 2 2
5
20 1 14 10 2
13
5 5 4 4 3 5 7 6 5 4 4 6 5
```

```Output
3
0
21
```

U prvom test primeru dovoljne su tri zamene: zamenom trećeg i četvrtog klikera dobija se $3, 4, 3, 2, 4, 2, 2$, pa drugog i trećeg $3, 3, 4, 2, 4, 2, 2$, i na kraju četvrtog i petog $3, 3, 4, 4, 2, 2, 2$. U drugom se svaka boja javlja po jednom, pa je red već uredan.

## Ograničenja

$1 \le t \le 5$
$2 \le n \le 4 \cdot 10^5$
$1 \le a_i \le 20$
Zbir $n$ preko svih test primera ne prelazi $4 \cdot 10^5$

---

*Zadatak je nastao po uzoru na [Marbles](https://codeforces.com/problemset/problem/1215/E), zadatak 1215E sa Codeforces Round 585, autora Mike Mirzayanov i tima Codeforces. Postavka je naša.*
