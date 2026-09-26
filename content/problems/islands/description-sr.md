Satelit je snimio deo okeana i podelio ga na mrežu od $n$ vrsta i $m$ kolona. Svako polje na snimku je ili kopno, oznaka `#`, ili voda, oznaka `.`.

**Ostrvo** je skup polja kopna po kojima možeš da pređeš a da ne pokvasiš noge, koračajući samo **gore, dole, levo i desno**. Dva polja kopna koja se dodiruju samo temenom nisu na istom ostrvu, jer se dijagonalno ne sme koračati.

Prebroj ostrva na snimku i izmeri koliko je veliko najveće.

## Ulaz

U prvoj liniji ulaza nalazi se ceo broj $t$ - broj test primera.
U prvoj liniji svakog test primera su brojevi $n$ i $m$ - broj vrsta i broj kolona snimka.
U narednih $n$ linija nalazi se po $m$ karaktera, `#` ili `.`, koji opisuju jednu vrstu snimka.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji dva broja - koliko ostrva ima na snimku i od koliko se polja sastoji najveće. Ako je na snimku samo voda, ispiši `0 0`.

## Primer

```Input
1
4 6
#..##.
##..#.
....#.
.##..#
```

```Output
4 4
```

Ostrva ima četiri, a najveće je ono uz desnu stranu gornjeg dela snimka, od $4$ polja. Obrati pažnju na usamljeno polje u donjem desnom uglu: sa ostrvom iznad sebe dodiruje se samo temenom, pa se broji kao zasebno ostrvo.

## Ograničenja

$1 \le t \le 1000$
$1 \le n, m \le 200$
zbir svih $n \cdot m$ nije veći od $10^5$
