Restoran nudi meni od $n$ jela, a ti si odlučio da naručiš tačno $m$ različitih. Jelo $i$ ti samo po sebi donosi $a_i$ jedinica uživanja.

Neka jela se ipak bolje slažu u određenom redosledu. Kuvar je zapisao $k$ sparivanja: sparivanje $x, y, c$ znači da, ako jelo $y$ pojedeš **neposredno posle** jela $x$, bez ičega između, dobijaš još $c$ jedinica povrh toga. Sparivanje važi samo u smeru u kom je zapisano.

Svojih $m$ jela možeš da pojedeš bilo kojim redosledom. Odredi najveće ukupno uživanje koje možeš da postigneš.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U prvoj liniji svakog test primera su tri cela broja $n$, $m$ i $k$ - broj jela na meniju, broj jela koja ćeš naručiti i broj sparivanja.
U drugoj liniji je $n$ celih brojeva $a_1, a_2, \dots, a_n$ - uživanje koje svako jelo donosi samo po sebi.
U svakoj od sledećih $k$ linija su tri cela broja $x$, $y$ i $c$ - jelo $y$ pojedeno neposredno posle jela $x$ donosi $c$ dodatnog uživanja.

Jela su označena brojevima od $1$ do $n$. Nijedno sparivanje $(x, y)$ nije navedeno dvaput.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji najveće ukupno uživanje.

## Primer

```Input
2
2 2 1
1 1
2 1 1
4 3 2
1 2 3 4
2 1 5
3 4 2
```

```Output
3
12
```

U prvom test primeru pojedi jelo $2$ pa jelo $1$: po jedna jedinica od svakog jela, plus još jedna za sparivanje. U drugom, redosled $4, 2, 1$ daje $4 + 2 + 1 = 7$ od samih jela, a sparivanje $2 \rightarrow 1$ dodaje $5$ - redosled $2, 1, 4$ nosi istih $12$.

## Ograničenja

$1 \le t \le 5$
$1 \le m \le n \le 18$
$0 \le k \le n \cdot (n-1)$
$0 \le a_i \le 10^9$
$1 \le x, y \le n$ i $x \ne y$, a $0 \le c \le 10^9$

---

*Zadatak je nastao po uzoru na [Kefa and Dishes](https://codeforces.com/problemset/problem/580/D), zadatak 580D sa Codeforces Round 321, autora Mike Mirzayanov i tima Codeforces. Postavka je naša.*
