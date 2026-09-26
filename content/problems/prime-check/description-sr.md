Broj je **prost** ako je veći od $1$ i nema drugih delilaca osim $1$ i samog sebe. Tvoj zadatak je da za svaki dati broj proveriš da li je prost.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U svakoj od sledećih $t$ linija je po jedan ceo broj $n$.

## Izlaz

Za svaki test primer ispiši `YES` ako je $n$ prost, a `NO` ako nije.

## Primer

```Input
2
17
903543481
```

```Output
YES
NO
```

$17$ nema delilaca osim $1$ i $17$. Drugi broj jako dugo liči na prost, ali je $903543481 = 30059 \cdot 30059$.

## Ograničenja

$1 \le t \le 1000$
$1 \le n \le 10^9$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Prost broj](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/prost_broj), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
