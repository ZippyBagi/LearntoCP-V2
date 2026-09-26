Banka želi da upozori svoje klijente na sumnjive aktivnosti na njihovim računima. Svaki put kada stigne nova transakcija, banka posmatra **medijanu** $m$ od $d$ transakcija **neposredno pre** nje, i ako je nova transakcija **bar dvostruko** veća od $m$, šalje se upozorenje.

Medijana niza brojeva je vrednost na sredini kada se niz sortira. Ako niz ima paran broj vrednosti, nema jedne središnje, pa je medijana aritmetička sredina **dve** središnje vrednosti - na primer, medijana niza $2, 3, 3, 4, 5, 6$ je $(3 + 4) / 2 = 3.5$.

Prvih $d$ transakcija nema $d$ transakcija pre sebe, pa nikada ne izazivaju upozorenje. Za dati spisak transakcija odredi koliko upozorenja banka pošalje.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U prvoj liniji svakog test primera su dva cela broja $n$ i $d$ - broj transakcija i koliko prethodnih transakcija banka posmatra.
U drugoj liniji svakog test primera je $n$ celih brojeva $a_1, a_2, \dots, a_n$ - iznosi transakcija, redom kojim su se desile.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji broj upozorenja koja banka pošalje.

## Primer

```Input
1
8 3
2 5 3 4 3 6 2 9
```

```Output
2
```

Upozorenja se šalju za $6$ (tri transakcije pre nje su $3, 4, 3$ sa medijanom $3$, a $6 \ge 2 \cdot 3$) i za $9$ (tri pre nje su $3, 6, 2$, opet sa medijanom $3$). Transakcija $5$ nije označena iako je velika - pre nje se desila samo jedna transakcija, a ne $3$.

## Ograničenja

$1 \le t \le 10$
$2 \le n \le 10^5$
$1 \le d \le n$
zbir svih $n$ po test primerima ne prelazi $2 \cdot 10^5$
$1 \le a_i \le 10^9$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Sumnjive transakcije](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/sumnjive_transakcije), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
