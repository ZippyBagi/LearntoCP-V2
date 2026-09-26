Đaci označeni brojevima od $0$ do $n-1$ sede u krugu i igraju se razbrajalice. Brojanje kreće od đaka $0$ i ide ukrug; svaki $m$-ti đak ispada iz igre, a brojanje se nastavlja od sledećeg. Tvoj zadatak je da odrediš koji đak ostaje poslednji.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U svakoj od sledećih $t$ linija su dva cela broja $n$ i $m$ - broj đaka i dužina brojalice.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji broj poslednjeg preostalog đaka.

## Primer

```Input
2
8 3
2 2
```

```Output
6
0
```

U prvom test primeru đaci ispadaju redosledom $2, 5, 0, 4, 1, 7, 3$ i ostaje đak $6$. U drugom, brojanje $0, 1$ izbacuje đaka $1$, pa ostaje đak $0$.

## Ograničenja

$1 \le t \le 100$
$2 \le n \le 5000$
$2 \le m \le n$
$n_1 + n_2 + \ldots + n_t \le 5000$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Josifov problem](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/josifov_problem), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
