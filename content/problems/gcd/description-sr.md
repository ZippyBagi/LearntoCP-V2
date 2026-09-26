Mravi, pčele i komarci organizuju sportski turnir. Žele da se podele u timove tako da se svaki tim sastoji od samo jedne vrste insekata, da svi timovi imaju **isti broj članova** i da je svaki insekt u tačno jednom timu. Ako se zna broj insekata svake vrste, tvoj zadatak je da odrediš najveći mogući broj članova tima.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U svakoj od sledećih $t$ linija su tri cela broja $a$, $b$ i $c$ - broj mrava, pčela i komaraca.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji najveći mogući broj članova tima.

## Primer

```Input
2
20 30 40
1000000000 2000000000 500000000
```

```Output
10
500000000
```

U prvom test primeru timovi od $10$ članova rade: $2$ tima mrava, $3$ tima pčela i $4$ tima komaraca. Nijedna veća veličina ne deli sva tri broja.

## Ograničenja

$1 \le t \le 1000$
$1 \le a, b, c \le 2 \cdot 10^9$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Najveći zajednički delilac](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/euklid), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
