Postfiksna notacija (zvana i obratna poljska notacija, u čast poljskog logičara Jana Lukašijeviča koji ju je izumeo) piše operator **posle** svoja dva operanda umesto između njih. Dakle, umesto `3 + 5` pišemo `3 5 +`. Velika prednost: postfiksnim izrazima ne trebaju zagrade - redosled operacija nikada nije dvosmislen.

Tvoj zadatak je da izračunaš vrednost postfiksnih izraza sastavljenih od **jednocifrenih brojeva** i operatora `+` i `*`, zapisanih bez razmaka.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U svakoj od sledećih $t$ linija je po jedan ispravan postfiksni izraz.

## Izlaz

Za svaki izraz ispiši u posebnoj liniji njegovu vrednost.

## Primer

```Input
2
12+3*
11+2*345+*+
```

```Output
9
31
```

Prvi izraz je `(1+2)*3`. Drugi je `(1+1)*2+3*(4+5)`.

## Ograničenja

$1 \le t \le 1000$
Svaki izraz ima najviše $199$ karaktera.
Vrednost izraza, kao i svakog međurezultata, je najviše $10^{18}$.

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Vrednost postfiksnog izraza](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/vrednost_postfiksnog_izraza), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
