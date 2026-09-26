Lenka je napisala funkciju koja **meša** niz - trebalo bi da vrati iste brojeve u nasumičnom redosledu i ništa više. Pustila ju je na gomili test nizova, ali gledajući rezultate ne može da zaključi da li je funkcija ispravna.

Pomozi joj: za dati polazni niz i niz koji je njena funkcija vratila, proveri da li je drugi **permutacija** prvog, odnosno da li može da se dobije od njega samo promenom redosleda elemenata. Jednaki brojevi smeju da se ponavljaju, ali onda moraju da se ponavljaju isti broj puta u oba niza.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U prvoj liniji svakog test primera je ceo broj $n$ - dužina polaznog niza, a u drugoj liniji je njegovih $n$ elemenata.
U trećoj liniji je ceo broj $m$ - dužina vraćenog niza, a u četvrtoj liniji je njegovih $m$ elemenata.

## Izlaz

Za svaki test primer ispiši `YES` ako je drugi niz permutacija prvog, a `NO` ako nije.

## Primer

```Input
2
5
1 3 2 4 3
5
4 3 2 3 1
3
1000000000000000000 5 1000000000000000000
3
1000000000000000000 5 5
```

```Output
YES
NO
```

U prvom test primeru oba niza sadrže jednu $1$, jednu $2$, dve $3$ i jednu $4$. U drugom se vrednost $10^{18}$ u polaznom nizu pojavljuje dva puta, a u vraćenom samo jednom, pa je funkcija izgubila jedan broj.

## Ograničenja

$1 \le t \le 10$
$1 \le n, m \le 10^5$
zbir svih $n + m$ po test primerima ne prelazi $4 \cdot 10^5$
$1 \le a_i \le 10^{18}$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Provera permutacija](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/provera_permutacija1), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
