U nacionalnom parku ima $n$ ispostava koje povezuje $n - 1$ staza. Do svake ispostave se stiže iz svake druge, i to samo jednim putem - staze čine stablo.

Čuvare zanima koliko park ume da bude velik. Negde u njemu postoje dve ispostave između kojih se pešači duže nego između bilo koje druge dve, i njih zanima koliko se staza pređe na tom putu. Taj broj se zove **prečnik** stabla.

Napiši program koji ga računa.

## Ulaz

U prvoj liniji ulaza je ceo broj $t$ - broj test primera.
Za svaki test primer, u prvoj liniji stoji broj $n$ - koliko ima ispostava.
Sledi $n - 1$ linija, a u svakoj po dva broja $u$ i $v$ - staza između ispostava $u$ i $v$, prohodna u oba smera.

Ispostave nose brojeve od $1$ do $n$. Staze uvek povezuju sve ispostave i nigde ne zatvaraju krug, dakle čine stablo.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji koliko se staza pređe na najdužem putu u parku.

## Primer

```Input
3
7
1 2
1 3
2 4
3 5
4 6
5 7
4
1 2
1 3
1 4
1
```

```Output
6
2
0
```

U prvom test primeru najduže se pešači od ispostave $6$ do ispostave $7$, putem $6 \rightarrow 4 \rightarrow 2 \rightarrow 1 \rightarrow 3 \rightarrow 5 \rightarrow 7$, na kome se pređe $6$ staza. Primeti da ispostava $1$ nije nijedan njegov kraj - iz nje se do svake druge stiže za najviše $3$ staze. U drugom test primeru sve staze izlaze iz ispostave $1$, pa se između svake druge dve pređu tačno $2$. U trećem postoji samo jedna ispostava i nikuda se ne ide.

## Ograničenja

$1 \le t \le 100$
$1 \le n \le 10^5$
$1 \le u, v \le n$ i $u \ne v$
Zbir $n$ preko svih test primera ne prelazi $10^5$
