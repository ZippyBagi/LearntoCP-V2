Na sajmu magije mađioničari stalno ulaze u glavnu salu i izlaze iz nje. Snaga svakog mađioničara je poznata, a dva različita mađioničara mogu biti i jednako jaka.

S vremena na vreme organizatori žele da nekog angažuju za trik, pa pitaju za snagu **najslabijeg** mađioničara koji je trenutno u sali, ili za snagu **najjačeg**. Napiši program koji odgovara na ta pitanja.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U prvoj liniji svakog test primera je ceo broj $q$ - broj događaja.
U svakoj od sledećih $q$ linija je po jedan događaj, u jednom od četiri oblika:

- `i x` - mađioničar snage $x$ je ušao u salu;
- `e x` - mađioničar snage $x$ je izašao iz sale;
- `m` - ispiši snagu najslabijeg mađioničara u sali;
- `M` - ispiši snagu najjačeg mađioničara u sali.

Događaj `e x` se pojavljuje samo kada mađioničar snage $x$ zaista jeste u sali, i uklanja tačno **jednog** takvog.

## Izlaz

Za svaki događaj `m` ili `M`, redom kojim se događaji pojavljuju, ispiši traženu snagu u posebnoj liniji. Ako je sala u tom trenutku prazna, ispiši `-`.

## Primer

```Input
1
12
i 1
i 5
i 5
i 8
m
e 5
e 8
M
e 5
M
e 1
m
```

```Output
1
5
1
-
```

Sala se prvo napuni snagama $1, 5, 5, 8$, pa je najslabiji $1$. Pošto izađu jedan mađioničar snage $5$ i onaj snage $8$, u sali ostaju $1$ i $5$ - primeti da je **drugi** mađioničar snage $5$ i dalje tu, pa je najjači $5$. Kada i on izađe ostaje samo $1$, a nakon njegovog izlaska sala je prazna.

## Ograničenja

$1 \le t \le 10$
$1 \le q \le 10^5$
zbir svih $q$ po test primerima ne prelazi $2 \cdot 10^5$
$1 \le x < 10^9$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Najjači mađioničar](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/najjaci_madjionicar), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
