Stara mašina ima samo jedan registar. U njega učitaš broj $n$, a mašina zatim počne da broji unazad: registar radi AND sa $n - 1$, pa sa $n - 2$, pa sa $n - 3$, i tako redom, broj po broj.

Pre ili kasnije registar postane $0$, a kada se to desi više nikada ne može da se vrati. Tvoj zadatak je da javiš na kom broju je mašina bila u tom trenutku.

Formalno, odredi najveće $k$ za koje važi

$$n \, \& \, (n-1) \, \& \, (n-2) \, \& \, \ldots \, \& \, k = 0$$

gde $\&$ označava bitovsku AND operaciju. Vrednost $k = 0$ je dozvoljena - mašini nije problem da izbroji skroz do nule.

## Ulaz

U prvom redu ulaza je ceo broj $t$ - broj test primera.
U svakom od narednih $t$ redova nalazi se ceo broj $n$ - broj učitan u registar.

## Izlaz

Za svaki test primer ispiši u zasebnom redu najveće takvo $k$.

## Primer

```Input
4
2
5
17
1
```

```Output
1
3
15
0
```

Za $n = 5$ mašina prvo uradi $5 \, \& \, 4 = 4$, što još uvek nije $0$, a zatim $4 \, \& \, 3 = 0$ - dakle stala je na $3$. Za $n = 1$ registar sve vreme drži $1$ i tek ga $1 \, \& \, 0$ isprazni, pa je odgovor $0$.

## Ograničenja

$1 \le t \le 1000$
$1 \le n \le 10^9$

---

Zadatak je adaptiran iz zadatka [And Then There Were K](https://codeforces.com/contest/1527/problem/A), zadatak A sa Codeforces Round 721 (Div. 2).
