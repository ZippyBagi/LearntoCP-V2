Matrica dimenzija $n \times n$ na početku je puna nula. Zatim se u nju upisuju jedinice, jedna po jedna i zadatim redosledom.

Kroz matricu se krećeš tako što prelaziš sa polja na polje na kojem stoji jedinica, i to samo **gore, dole, levo i desno** - nikada dijagonalno. Preći matricu znači krenuti sa bilo kog polja **prve vrste** i tim kretanjem stići do bilo kog polja **poslednje vrste**.

Posle svake upisane jedinice matrica može, ali ne mora, biti prohodna. Odredi koliko jedinica treba upisati da bi matrica prvi put postala prohodna.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U prvoj liniji svakog test primera su dva cela broja $n$ i $m$ - stranica matrice i broj jedinica koje će biti upisane.
U svakoj od sledećih $m$ linija su dva cela broja $r$ i $c$ - vrsta i kolona sledeće jedinice, pri čemu se obe broje **od $0$**.

Nijedno polje nije navedeno dvaput.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji koliko je jedinica bilo upisano kada je matrica prvi put postala prohodna, ili $-1$ ako nikada ne postane prohodna.

## Primer

```Input
3
4 9
0 0
0 1
1 1
3 3
1 3
2 0
3 0
2 1
2 2
1 1
0 0
3 2
0 0
2 2
```

```Output
8
1
-1
```

Posle osme jedinice prva matrica izgleda ovako, a označena polja vode od prve vrste do poslednje:

```
1100
0101
1100
1001
```

U drugom test primeru matrica ima samo jedno polje, koje je istovremeno i prva i poslednja vrsta, pa je dovoljan jedan upis. U trećem test primeru dve jedinice stoje u suprotnim uglovima i nikada se ne dodirnu.

## Ograničenja

$1 \le t \le 10$
$1 \le n \le 200$
$1 \le m \le n^2$
$0 \le r, c \le n-1$
Zbir svih $m$ po test primerima najviše je $10^5$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Prvi put kroz matricu](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka3/prvi_put_kroz_matricu), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
