Za svaki od $t$ intervala $[a, b]$ odredi koliko prostih brojeva sadrži i koliki im je zbir. Pošto zbir može da bude veliki broj, ispiši samo njegov ostatak pri deljenju sa $1000000$.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U svakoj od sledećih $t$ linija su dva cela broja $a$ i $b$ - krajevi intervala.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji dva broja razdvojena razmakom: broj prostih u $[a, b]$ i njihov zbir po modulu $1000000$.

## Primer

```Input
1
1 1000
```

```Output
168 76127
```

Do $1000$ ima $168$ prostih brojeva i njihov zbir je $76127$.

## Ograničenja

$1 \le t \le 10^5$
$1 \le a \le b \le 10^6$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Eratostenovo sito](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/eratostenovo_sito), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
