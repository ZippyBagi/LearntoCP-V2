Drvoseča Milan treba da donese kući određenu količinu drveta. Njegova testera stoji na stalku koji može da se podesi na bilo koju **celobrojnu** visinu u metrima, i tako seče svako drvo u šumi tačno na toj visini. Pada samo deo drveta **iznad** sečiva - drvo koje nije više od sečiva ostaje netaknuto.

Što je testera više, to Milan dobija manje drveta. Pošto brine o šumi, ne želi da naseče ni metar više nego što mu treba.

Sva debla su jednako debela, pa se količina drveta meri prosto u metrima isečenog debla. Tvoj zadatak je da odrediš **najveću** celobrojnu visinu na koju Milan može da podesi testeru a da i dalje dobije bar onoliko drveta koliko mu treba.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U prvoj liniji svakog test primera su dva cela broja $n$ i $x$ - broj drveća u šumi i količina drveta koja je Milanu potrebna.
U drugoj liniji je $n$ celih brojeva $h_1, h_2, \dots, h_n$ - visine drveća.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji najveću visinu na koju testera može da se podesi.

## Primer

```Input
2
5 14
24 21 19 14 22
1 7
7
```

```Output
18
0
```

U prvom test primeru testera podešena na $18$ metara skida $6$ metara sa prvog drveta, $3$ sa drugog, $1$ sa trećeg, ništa sa četvrtog i $4$ sa petog - tačno onih $14$ metara koliko Milanu treba. U drugom test primeru jedino drvo mora da se poseče do zemlje.

## Ograničenja

$1 \le t \le 10$
$1 \le n \le 10^5$
$1 \le h_i \le 10^4$
$1 \le x \le h_1 + h_2 + \dots + h_n$ - u šumi uvek ima dovoljno drveta

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Drva](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/drva), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
