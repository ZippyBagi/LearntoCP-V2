Dat je niz $a$ od $n$ celih brojeva. **Segment** niza čini grupa uzastopnih elemenata sa **bar jednim** elementom. Tvoj zadatak je da odrediš najveći mogući zbir segmenta datog niza.

## Ulaz

U prvoj liniji je jedan ceo broj $t$ - broj test primera.

- U prvoj liniji svakog test primera je ceo broj $n$ - broj elemenata.
- U sledećoj liniji je $n$ celih brojeva $a_0, a_1, \ldots, a_{n-1}$ - elementi niza.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji najveći zbir segmenta.

## Primer

```Input
2
6
2 -3 4 -1 3 -2
3
-5 -2 -8
```

```Output
6
-2
```

U prvom test primeru najbolji segment je $[4, -1, 3]$ sa zbirom $6$. U drugom test primeru je svaki element negativan, pa je najbolji segment jedan jedini element $[-2]$.

## Ograničenja

$1 \le t \le 1000$
$1 \le n \le 2 \cdot 10^5$
$-10^9 \le a_i \le 10^9$
$n_1 + n_2 + \ldots + n_t \le 2 \cdot 10^5$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Maksimalni zbir segmenta](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/maksimalni_zbir_segmenta), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
