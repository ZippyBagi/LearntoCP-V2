Drvoseča Milan je otvorio radnju. Njegova testera stoji na stalku koji može da se podesi na bilo koju **celobrojnu** visinu u metrima, i tako seče svako drvo u šumi tačno na toj visini. Pada samo deo drveta **iznad** sečiva - drvo koje nije više od sečiva ostaje netaknuto.

Sada mu dolazi $q$ mušterija, jedna za drugom, i svaka naručuje neku količinu drveta. Milan i dalje brine o šumi, pa za svaku porudžbinu želi da podesi testeru što **više** može, a da i dalje dobije bar naručenu količinu.

Porudžbine su nezavisne - Milan svaku od njih planira za istu netaknutu šumu, pa se visine drveća nikada ne menjaju.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U prvoj liniji svakog test primera su dva cela broja $n$ i $q$ - broj drveća u šumi i broj porudžbina.
U drugoj liniji je $n$ celih brojeva $h_1, h_2, \dots, h_n$ - visine drveća.
U trećoj liniji je $q$ celih brojeva $x_1, x_2, \dots, x_q$ - naručene količine drveta.

## Izlaz

Za svaku porudžbinu ispiši u posebnoj liniji najveću visinu na koju testera može da se podesi.

## Primer

```Input
2
5 3
24 21 19 14 22
14 40 1
1 2
7
7 3
```

```Output
18
12
23
0
4
```

Prva šuma ukupno ima $100$ metara drveta. Za porudžbinu od $14$ metara testera ide na $18$; za $40$ metara mora da se spusti na $12$, gde svih pet stabala zajedno daje tačno $40$; a za jedan metar je dovoljno skinuti vrh najvišeg stabla, sa sečivom na $23$.

## Ograničenja

$1 \le t \le 5$
$1 \le n \le 10^5$
$1 \le q \le 10^5$
$1 \le h_i \le 10^9$
$1 \le x_j \le h_1 + h_2 + \dots + h_n$ - u šumi uvek ima dovoljno drveta

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Drva](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/drva), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
