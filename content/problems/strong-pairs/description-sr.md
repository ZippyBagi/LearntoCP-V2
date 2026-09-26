U radionici na stolu leži $n$ senzora, a $i$-ti od njih ima oznaku $a_i$. Dva senzora mogu da se povežu samo ako su **jaki zajedno**, što uputstvo definiše ovako: senzori $i$ i $j$ čine jak par kada važi

$$a_i \, \& \, a_j \ge a_i \oplus a_j$$

gde $\&$ označava bitovsku AND operaciju, a $\oplus$ bitovsku XOR operaciju.

Prebroj koliko ima jakih parova $(i, j)$ za koje je $i < j$. Dva senzora sa različitih mesta na stolu uvek čine različit par, čak i kada im se oznake slučajno poklapaju.

## Ulaz

U prvom redu ulaza je ceo broj $t$ - broj test primera.
Svaki test primer zauzima dva reda. U prvom redu je ceo broj $n$ - broj senzora. U drugom redu je $n$ celih brojeva $a_1, a_2, \ldots, a_n$ - njihove oznake.

## Izlaz

Za svaki test primer ispiši u zasebnom redu broj jakih parova.

## Primer

```Input
3
5
1 4 3 7 10
4
6 2 5 3
2
2 4
```

```Output
1
2
0
```

U prvom test primeru jedini jak par je $(4, 7)$, jer je $4 \, \& \, 7 = 4$, dok je $4 \oplus 7 = 3$. U trećem test primeru je $2 \, \& \, 4 = 0$ i $2 \oplus 4 = 6$, pa taj par nije jak i odgovor je $0$.

## Ograničenja

$1 \le t \le 10$
$1 \le n \le 10^5$
$1 \le a_i \le 10^9$
Zbir svih $n$ preko svih test primera nije veći od $10^5$.

---

Zadatak je adaptiran iz zadatka [Rock and Lever](https://codeforces.com/contest/1420/problem/B), zadatak B sa Codeforces Round 672 (Div. 2).
