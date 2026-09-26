Bazna stanica upravlja sa dva robota. Prvi robot nosi broj $a$, a drugi broj $b$.

Pre nego što krenu da rade, stanica emituje **ključ** - jedan nenegativan ceo broj $x$ koji oba robota prime. Robot zatim troši energiju jednaku svom broju XOR ključ, pa oba robota zajedno potroše

$$(a \oplus x) + (b \oplus x)$$

gde $\oplus$ označava bitovsku XOR operaciju.

Stanica bira ključ i on može biti bilo koji nenegativan ceo broj. Izaberi ga tako da ukupna potrošena energija bude što manja i ispiši taj najmanji zbir.

## Ulaz

U prvom redu ulaza je ceo broj $t$ - broj test primera.
U svakom od narednih $t$ redova nalaze se dva cela broja $a$ i $b$ - brojevi koje nose roboti.

## Izlaz

Za svaki test primer ispiši u zasebnom redu najmanju moguću ukupnu energiju.

## Primer

```Input
3
6 12
4 9
5 5
```

```Output
10
13
0
```

U prvom test primeru ključ $x = 4$ daje $(6 \oplus 4) + (12 \oplus 4) = 2 + 8 = 10$, i nijedan drugi ključ nije bolji. U trećem test primeru oba robota nose isti broj, pa ih ključ $x = 5$ oba isprazni.

## Ograničenja

$1 \le t \le 1000$
$1 \le a, b \le 10^9$

---

Zadatak je adaptiran iz zadatka [XORwice](https://codeforces.com/contest/1421/problem/A), zadatak A sa Codeforces Round 676 (Div. 2).
