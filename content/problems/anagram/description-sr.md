Dve fraze su **anagrami** ako jedna može da se pretvori u drugu premeštanjem slova. Karakteri koji nisu slova - razmaci i interpunkcija - potpuno se zanemaruju.

Tvoj zadatak je da za svaki dati par fraza proveriš da li su anagrami.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
Svaki test primer čine dve linije, po jedna fraza u liniji. Fraze se sastoje od malih slova engleske abecede, razmaka i interpunkcijskih znakova (kao što su `. , ! ? ' -`).

## Izlaz

Za svaki test primer ispiši `YES` ako su fraze anagrami, a `NO` ako nisu.

## Primer

```Input
2
panta redovno zakasni
neopravdan izostanak
oni su skrsili vagu
suvisni kilogrami
```

```Output
YES
NO
```

U prvom test primeru obe fraze koriste tačno slova fraze "neopravdan izostanak". U drugom se brojevi slova razlikuju.

## Ograničenja

$1 \le t \le 100$
Svaka linija ima najviše $10^5$ karaktera.

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Anagram](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/anagram), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
