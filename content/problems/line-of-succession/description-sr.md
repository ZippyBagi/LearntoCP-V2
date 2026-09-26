Jedan kralj je davno osvojio presto i započeo kraljevsku lozu. Potomaka ima na pretek i svako od njih bi voleo da zna koji je po redu za krunu.

Pravilo nasleđivanja glasi ovako. Kralja nasleđuje njegov **najstariji sin**, pa najstarije dete tog sina, i tako redom naniže. Kada neki potomak nema dece, na red dolazi njegov **sledeći brat po starosti**, pa potomci tog brata, i tako dalje.

Za nekoliko članova porodice odredi koje mesto u redosledu nasleđivanja zauzimaju. Sam kralj je na mestu $0$.

## Ulaz

U prvoj liniji ulaza nalazi se ceo broj $t$ - broj test primera.
U prvoj liniji svakog test primera je broj $n$ - koliko osoba ima u porodičnom stablu, računajući i kralja.
U narednih $n - 1$ linija nalaze se po dva imena, `roditelj dete`. Deca istog roditelja navedena su **od najstarijeg ka najmlađem**, ali linije koje ih opisuju ne moraju ići jedna za drugom, niti kralj mora biti naveden prvi.
U sledećoj liniji je broj $q$ - koliko ima pitanja, a u narednih $q$ linija po jedno ime.

Imena se sastoje samo od engleskih slova i sva su različita - nema dve osobe sa istim imenom.

## Izlaz

Za svako pitanje ispiši u posebnoj liniji ime i mesto koje ta osoba zauzima u redosledu nasleđivanja, razdvojene razmakom.

## Primer

```Input
1
19
Elisabeth Charles
Elisabeth Andrew
Elisabeth Edward
Elisabeth Anne
Charles William
William George
Charles Harry
William Charlotte
William Louis
Anne Peter
Anne Zara
Edward James
Andrew Beatrice
Andrew Eugenie
Edward Louise
Peter Savannah
Peter Isla
Zara Mia
7
Harry
Charles
Charlotte
Louise
James
Isla
Andrew
```

```Output
Harry 6
Charles 1
Charlotte 4
Louise 12
James 11
Isla 16
Andrew 7
```

Elisabeth je na čelu porodice, jer je jedina koja se nigde ne pojavljuje kao nečije dete. Njen najstariji sin Charles zauzima mesto $1$, a cela njegova loza - William, pa Williamovo troje dece, pa Harry - dolazi na red pre nego što se stigne do njenog drugog sina, Andrewa, na mestu $7$.

## Ograničenja

$1 \le t \le 1000$
$2 \le n \le 5 \cdot 10^4$
$1 \le q \le 5 \cdot 10^4$
svako ime ima između $1$ i $20$ engleskih slova
$n - 1$ linija opisuje porodično stablo, pa je svaka osoba osim kralja tačno jednom navedena kao dete
svako ime iz pitanja postoji u porodičnom stablu
zbir svih $n$ nije veći od $10^5$
zbir svih $q$ nije veći od $10^5$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Prestolonaslednici](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka3/prestolonaslednici), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
