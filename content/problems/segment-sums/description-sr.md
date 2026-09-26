Poznata je zarada jednog preduzeća tokom $n$ dana, označenih brojevima od $0$ do $n-1$. Tvoj zadatak je da odgovoriš na $m$ pitanja: za period zadat prvim danom $a$ i poslednjim danom $b$, kolika je ukupna zarada preduzeća u tom periodu?

## Ulaz

U prvoj liniji je jedan ceo broj $t$ - broj test primera.

- U prvoj liniji svakog test primera je ceo broj $n$ - broj dana.
- U sledećoj liniji je $n$ celih brojeva - zarade po danima.
- U sledećoj liniji je ceo broj $m$ - broj pitanja.
- U svakoj od narednih $m$ linija su dva cela broja $a$ i $b$ - prvi i poslednji dan perioda.

## Izlaz

Za svako pitanje ispiši u posebnoj liniji ukupnu zaradu od dana $a$ do dana $b$.

## Primer

```Input
1
5
1 2 3 4 5
3
0 4
1 3
2 2
```

```Output
15
9
3
```

Ceo period donosi $1 + 2 + 3 + 4 + 5 = 15$, dani od $1$ do $3$ donose $2 + 3 + 4 = 9$, a sam dan $2$ donosi $3$.

## Ograničenja

$1 \le t \le 100$
$1 \le n, m \le 2 \cdot 10^5$
$0 \le a \le b < n$
Zarada jednog dana je između $0$ i $10^9$.
I zbir svih $n$ i zbir svih $m$ po test primerima su najviše $2 \cdot 10^5$.

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Zbirovi segmenata](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/sume_segmenata), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
