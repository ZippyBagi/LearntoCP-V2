**Inverzija** u nizu je par pozicija kod kog je raniji element veći - formalno, pozicije $i < j$ za koje važi $b_i > b_j$.

Dat ti je niz $a$ od $n$ pozitivnih celih brojeva. Izabereš dve pozicije $l$ i $r$, tako da je $1 \le l < r \le n$, izbaciš sve što je strogo između njih i ostaje ti

$$b = a_1 a_2 \dots a_l \; a_r a_{r+1} \dots a_n$$

Primeti da za $r = l + 1$ ne izbacuješ ništa, pa je $b$ tada ceo niz.

Prebroj parove $(l, r)$ za koje niz $b$ ima **najviše** $k$ inverzija.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U prvoj liniji svakog test primera su dva cela broja $n$ i $k$ - dužina niza i najveći dozvoljeni broj inverzija.
U drugoj liniji je $n$ celih brojeva $a_1, a_2, \dots, a_n$.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji broj parova $(l, r)$ posle kojih ostaje najviše $k$ inverzija.

## Primer

```Input
4
3 1
1 3 2
3 0
1 3 2
5 2
1 5 4 1 100
5 4
1 5 4 1 100
```

```Output
3
1
6
10
```

Prva dva test primera koriste isti niz $1, 3, 2$, koji ima tri moguća para. Par $(1, 3)$ ostavlja $b = 1, 2$ bez ijedne inverzije; parovi $(1, 2)$ i $(2, 3)$ ne izbacuju ništa i ostavljaju ceo niz, koji ima jednu inverziju. Zato za $k = 0$ prolazi jedan par, a za $k = 1$ sva tri. U poslednjem test primeru svih $10$ parova ostaje unutar $4$ inverzije.

## Ograničenja

$1 \le t \le 10$
$2 \le n \le 10^5$
$0 \le k \le 10^{18}$
$1 \le a_i \le 10^9$
Zbir $n$ preko svih test primera ne prelazi $2 \cdot 10^5$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Inverzije nakon izbacivanja segmenata](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka3/inverzije_nakon_izbacivanja_segmenata), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
