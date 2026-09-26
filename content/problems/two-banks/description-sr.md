Kroz jedan grad protiče reka koja je savršeno prava. Na mapi je reka zadata sa dve različite tačke $A$ i $B$ kroz koje prolazi, a pruža se unedogled u oba smera.

Grad želi da zna kako su mu kuće raspoređene po obalama. Kuća je na **levoj obali** ako se nalazi levo od nekoga ko stoji u tački $A$ i gleda ka tački $B$, a na **desnoj obali** ako se nalazi njemu zdesna. Neke kuće su sagrađene tačno na reci i ne pripadaju nijednoj obali.

Tvoj zadatak je da prebrojiš kuće na svakoj obali.

## Ulaz

U prvoj liniji je jedan ceo broj $t$ - broj test primera.

- U prvoj liniji svakog test primera je jedan ceo broj $n$ - broj kuća.
- U drugoj liniji su četiri cela broja $A_x$, $A_y$, $B_x$, $B_y$ - dve tačke koje određuju reku. Tačke su različite.
- U svakoj od narednih $n$ linija su dva cela broja $x_i$ i $y_i$ - položaj jedne kuće.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji tri cela broja: broj kuća na levoj obali, broj kuća na desnoj obali, i broj kuća koje stoje na reci.

## Primer

```Input
2
5
0 0 4 4
0 4
1 4
4 0
2 2
5 1
3
0 0 1000000000 1000000000
1000000000 -1000000000
-1000000000 1000000000
5 5
```

```Output
2 2 1
1 1 1
```

U prvom test primeru reka ide dijagonalno kroz koordinatni početak. Kuće u tačkama $(0, 4)$ i $(1, 4)$ su iznad nje, kuće u tačkama $(4, 0)$ i $(5, 1)$ su ispod nje, a kuća u tački $(2, 2)$ stoji u vodi.

## Ograničenja

$1 \le t \le 10$
$1 \le n \le 10^5$
$-10^9 \le A_x, A_y, B_x, B_y \le 10^9$
$-10^9 \le x_i, y_i \le 10^9$
$A \ne B$
$n_1 + n_2 + \ldots + n_t \le 2 \cdot 10^5$
