Za prirodan broj kažemo da je **otmen** ako u dekadnom zapisu ima **najviše $3$** cifre različite od nule. Tako su $4$, $200000$ i $10203$ otmeni, a $4231$, $102306$ i $7277420000$ nisu.

Dat ti je segment $[l, r]$. Prebroj koliko otmenih celih brojeva $x$ zadovoljava $l \le x \le r$.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj segmenata.
U svakoj od sledećih $t$ linija su dva cela broja $l$ i $r$ - krajevi jednog segmenta, oba uključena.

## Izlaz

Za svaki segment ispiši u posebnoj liniji broj otmenih celih brojeva unutar njega.

## Primer

```Input
4
1 1000
1024 1024
65536 65536
999999 1000001
```

```Output
1000
1
0
2
```

Svaki broj od $1$ do $999$ ima najviše tri cifre, pa ne može imati više od tri različite od nule, a $1000$ ima samo jednu takvu - svih $1000$ je otmeno. Broj $1024$ ima tri cifre različite od nule, a $65536$ ih ima pet. U poslednjem segmentu $999999$ ima šest takvih cifara, dok ih $1000000$ i $1000001$ imaju jednu odnosno dve.

## Ograničenja

$1 \le t \le 10^4$
$1 \le l \le r \le 10^{18}$

---

*Zadatak je nastao po uzoru na [Classy Numbers](https://codeforces.com/problemset/problem/1036/C), zadatak 1036C sa Educational Codeforces Round 50, autora Mike Mirzayanov i tima Codeforces. Postavka je naša.*
