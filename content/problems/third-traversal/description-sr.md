**Binarno stablo** je stablo u kom svaki čvor ima najviše dvoje dece, levo i desno. Postoje tri uobičajena redosleda obilaska njegovih čvorova, a svaki je određen time gde koren stoji u odnosu na dva podstabla:

- **KLD** (prefiksni) - prvo koren, pa celo levo podstablo, pa celo desno podstablo;
- **LKD** (infiksni) - prvo levo podstablo, pa koren, pa desno podstablo;
- **LDK** (postfiksni) - prvo levo podstablo, pa desno podstablo, a koren na kraju.

Unutar podstabla važi isto pravilo - podstablo se obilazi po svom redosledu, tačno onako kako se obilazi i celo stablo.

Svaki čvor našeg stabla označen je **različitim** malim slovom engleske abecede, pa svaki od tri obilaska daje po jednu nisku slova. Za dato stablo su ti data njegova KLD i LKD niska; ispiši njegovu LDK nisku.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U prvoj liniji svakog test primera je **KLD** niska nekog stabla.
U drugoj liniji je **LKD** niska istog tog stabla.

Obe niske se sastoje od istog skupa različitih malih slova, poređanih na dva različita načina. Niske uvek opisuju jedno postojeće binarno stablo.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji **LDK** nisku tog stabla.

## Primer

```Input
1
abecfg
beafcg
```

```Output
ebfgca
```

Ove dve niske opisuju sledeće stablo:

```
       a
      / \
     /   \
    b     c
     \   / \
      e f   g
```

Čvor `b` nema levo dete, samo desno. Kad se stablo pročita po KLD, dobija se `a`, pa celo levo podstablo `be`, pa celo desno podstablo `cfg` - dakle `abecfg`. Po LKD se dobija `be`, pa `a`, pa `fcg` - dakle `beafcg`. Kod LDK koren ide poslednji, pa je rešenje `eb` + `fgc` + `a`, odnosno `ebfgca`.

## Ograničenja

$1 \le t \le 100$
$1 \le$ dužina svake niske $\le 26$
Obe niske čine ista različita mala slova

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Treći obilazak](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/treci_obilazak), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
