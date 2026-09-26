Za niz $a$ i dve pozicije $l \le r$ označimo

$$f(l, r) = a_l \mathbin{\&} a_{l+1} \mathbin{\&} \dots \mathbin{\&} a_r$$

gde je $\&$ bitwise AND.

Dat ti je niz, a zatim i $q$ pitanja. Svako pitanje zadaje početnu poziciju $l$ i prag $k$, pa traži **najveće** $r$ za koje važi $l \le r \le n$ i $f(l, r) \ge k$ - dakle, dokle segment može da se rastegne udesno pre nego što mu AND padne ispod $k$.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U prvoj liniji svakog test primera je jedan ceo broj $n$ - dužina niza.
U drugoj liniji je $n$ celih brojeva $a_1, a_2, \dots, a_n$.
U trećoj liniji je jedan ceo broj $q$ - broj pitanja.
U svakoj od sledećih $q$ linija su dva cela broja $l$ i $k$ - početna pozicija i prag.

Pozicije se broje **od $1$**.

## Izlaz

Za svaki test primer ispiši u jednoj liniji odgovore na njegovih $q$ pitanja, redom i razdvojene razmacima. Ako je već i $f(l, l)$ ispod $k$, za to pitanje ispiši $-1$.

## Primer

```Input
3
5
15 14 17 42 34
3
1 7
2 15
4 5
5
7 5 3 1 7
4
1 7
5 7
2 3
2 2
7
19 20 15 12 21 7 11
4
1 15
4 4
7 12
5 7
```

```Output
2 -1 5
1 5 2 2
2 6 -1 5
```

Pogledajmo prvo pitanje prvog test primera. Kada krenemo od $l = 1$, dobijamo $f(1,1) = 15$, $f(1,2) = 14$, a zatim $f(1,3) = f(1,4) = f(1,5) = 0$, pa je $r = 2$ najdalja pozicija na kojoj se ostaje na $7$ ili iznad. Drugo pitanje kreće od $l = 2$, gde je već $a_2 = 14$ manje od $15$, pa je odgovor $-1$.

## Ograničenja

$1 \le t \le 10^4$
$1 \le n \le 2 \cdot 10^5$
$1 \le q \le 10^5$
$1 \le a_i \le 10^9$
$1 \le l \le n$ i $1 \le k \le 10^9$
Zbir svih $n$ po test primerima najviše je $2 \cdot 10^5$, a isto važi i za zbir svih $q$

---

*Zadatak je nastao po uzoru na [Iva & Pav](https://codeforces.com/problemset/problem/1878/E), zadatak 1878E sa Codeforces Round 900, autora Mike Mirzayanov i tima Codeforces. Postavka je naša.*
