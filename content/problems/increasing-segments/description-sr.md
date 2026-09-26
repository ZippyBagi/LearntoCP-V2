Dat je niz $a$ od $n$ celih brojeva. **Segment** niza čini grupa uzastopnih elemenata. Segment je **rastući** ako je svaki njegov element strogo manji od sledećeg i ako ima **bar dva** elementa. Tvoj zadatak je da izbrojiš rastuće segmente datog niza.

Formalno, brojiš parove pozicija $(p, q)$, $0 \le p < q < n$, za koje važi $a_p < a_{p+1} < \ldots < a_q$.

## Ulaz

U prvoj liniji je jedan ceo broj $t$ - broj test primera.

- U prvoj liniji svakog test primera je ceo broj $n$ - broj elemenata.
- U sledećoj liniji je $n$ celih brojeva $a_0, a_1, \ldots, a_{n-1}$ - elementi niza.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji broj rastućih segmenata.

## Primer

```Input
2
5
1 3 4 -2 10
4
2 2 3 1
```

```Output
4
1
```

U prvom test primeru rastući segmenti su $[1, 3]$, $[1, 3, 4]$, $[3, 4]$ i $[-2, 10]$. U drugom je jedini $[2, 3]$ - par jednakih elemenata $[2, 2]$ se ne računa, rast mora biti strog.

## Ograničenja

$1 \le t \le 1000$
$2 \le n \le 2 \cdot 10^5$
$-10^9 \le a_i \le 10^9$
$n_1 + n_2 + \ldots + n_t \le 2 \cdot 10^5$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Broj rastućih segmenata](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/broj_rastucih_segmenata), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
