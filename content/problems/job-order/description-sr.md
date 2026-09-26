Da bi se sklopio automobil, treba obaviti čitav spisak poslova, a neki od njih zavise od drugih - osovine moraju da se ugrade pre točkova. Tvoj zadatak je da nađeš redosled u kom se svih $n$ poslova može obaviti, a da nijedan posao ne krene pre onoga od koga zavisi.

Poslovi su označeni brojevima od $0$ do $n-1$. Obično je moguće više redosleda, pa ispiši **leksikografski najmanji**: od svih ispravnih redosleda onaj kome je prvi broj najmanji, a među njima onaj kome je drugi broj najmanji, i tako dalje.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U prvoj liniji svakog test primera su dva cela broja $n$ i $m$ - broj poslova i broj zavisnosti.
U svakoj od sledećih $m$ linija su dva cela broja $x$ i $y$, što znači da posao $y$ mora da se obavi **pre** posla $x$. Obrati pažnju na redosled: posao koji je u liniji **drugi** je onaj koji ide **prvi**.

Garantuje se da redosled postoji.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji svih $n$ brojeva poslova u leksikografski najmanjem ispravnom redosledu, razdvojene sa po jednim razmakom.

## Primer

```Input
1
6 6
3 1
3 2
4 2
4 5
1 0
0 5
```

```Output
2 5 0 1 3 4
```

Samo poslovi $2$ i $5$ nemaju ništa pre sebe, a $2$ je manji, pa ide prvi. Time se ništa novo ne oslobađa, pa sledi $5$, koji oslobađa i $0$ i $4$ - a $0$ je manji. Posao $4$ mora da čeka da se završe i $2$ i $5$, a posao $3$ da se završe $1$ i $2$.

## Ograničenja

$1 \le t \le 10$
$2 \le n \le 5 \cdot 10^4$
$1 \le m \le 10n$
$0 \le x, y \le n-1$ i $x \ne y$
Zbir $n$ preko svih test primera ne prelazi $10^5$, a zbir $m$ ne prelazi $2 \cdot 10^5$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Redosled poslova](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka3/redosled_poslova), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
