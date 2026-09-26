**Inverzija** u nizu je par pozicija $i < j$ kod kog je raniji element veći, dakle $a_i > a_j$. Sortiran niz nema nijednu inverziju, a niz sortiran naopako ima ih koliko ima i parova - pa broj inverzija govori koliko je niz daleko od sortiranog.

Tvoj zadatak je da ih prebrojiš.

Ovo je isti zadatak kao [Broj inverzija](/sr/Problems/inversions), ponovljen ovde da bi se rešio na drugi način - strukturom iz ovog poglavlja, umesto merge sortom.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U prvoj liniji svakog test primera je jedan ceo broj $n$ - dužina niza.
U drugoj liniji je $n$ celih brojeva $a_1, a_2, \dots, a_n$.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji broj inverzija u tom nizu.

## Primer

```Input
2
5
3 1 4 2 5
4
4 3 2 1
```

```Output
3
6
```

Prvi niz ima tri inverzije: parove $(3, 1)$, $(3, 2)$ i $(4, 2)$. Drugi je sortiran unazad, pa je svaki od njegovih $6$ parova inverzija.

## Ograničenja

$1 \le t \le 10$
$1 \le n \le 10^5$
$-10^9 \le a_i \le 10^9$
Zbir $n$ preko svih test primera ne prelazi $2 \cdot 10^5$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Broj inverzija](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/broj_inverzija), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
