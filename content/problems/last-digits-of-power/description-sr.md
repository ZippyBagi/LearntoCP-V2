Za date prirodne brojeve $a$, $n$ i $k$, tvoj zadatak je da ispišeš poslednjih $k$ cifara stepena $a^n$.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U svakoj od sledećih $t$ linija su tri cela broja $a$, $n$ i $k$.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji **tačno** $k$ karaktera - poslednjih (krajnje desnih) $k$ cifara stepena $a^n$, uključujući vodeće nule.

## Primer

```Input
3
2 13 3
10 5 3
3452 20 4
```

```Output
192
000
0576
```

$2^{13} = 8192$, pa su njegove poslednje tri cifre $192$. $10^5 = 100000$ se završava sa tri nule - sve tri moraju biti ispisane.

## Ograničenja

$1 \le t \le 10^5$
$1 \le a, n \le 10^9$
$1 \le k \le 9$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Poslednjih k cifara stepena](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/poslednjih_k_cifara_stepena), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
