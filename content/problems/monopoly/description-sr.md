Monopol je igra u kojoj se igrači kreću po poljima koja su postavljena u **krug**, uvek u smeru kazaljke na satu. Polja su označena brojevima od $0$ do $n-1$, oba igrača na početku igre stoje na polju $0$ i tokom igre se nikada ne kreću unazad. Ako znamo koliko je ukupno polja svaki igrač prešao od početka igre, znamo i gde se svaki od njih trenutno nalazi.

Tvoj zadatak je da izračunaš koliko koraka **unapred** prvi igrač treba da napravi da bi došao na polje na kom se nalazi drugi igrač.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U svakoj od sledećih $t$ linija su tri cela broja $n$, $a$ i $b$ - broj polja na tabli, ukupan broj polja koje je od početka igre prešao prvi igrač i ukupan broj polja koje je prešao drugi igrač.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji koliko koraka unapred prvi igrač treba da napravi da bi stigao na polje na kom stoji drugi igrač.

## Primer

```Input
2
10 3 7
10 7 3
```

```Output
4
6
```

U prvom test primeru igrači stoje na poljima $3$ i $7$, pa je dovoljno $4$ koraka. U drugom prvi igrač stoji na polju $7$ a drugi na polju $3$ - krećući se unapred prolazi polja $8, 9, 0, 1, 2$ i staje na $3$, što je $6$ koraka.

## Ograničenja

$1 \le t \le 10$
$1 \le n \le 10^9$
$0 \le a, b \le 10^9$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Monopol](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka3/monopol), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
