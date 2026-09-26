Dati su broj $s$ i niz od $n$ **međusobno različitih** nenegativnih celih brojeva. Tvoj zadatak je da izbrojiš parove elemenata niza čiji je zbir tačno $s$.

## Ulaz

U prvoj liniji je jedan ceo broj $t$ - broj test primera.

- U prvoj liniji svakog test primera su dva cela broja $n$ i $s$ - broj elemenata i traženi zbir.
- U sledećoj liniji je $n$ međusobno različitih celih brojeva $a_0, a_1, \ldots, a_{n-1}$ - elementi niza.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji broj parova različitih elemenata čiji je zbir jednak $s$.

## Primer

```Input
2
6 7
2 5 4 7 0 6
5 8
1 2 3 4 6
```

```Output
2
1
```

U prvom test primeru parovi su $(2, 5)$ i $(7, 0)$. U drugom test primeru jedini par je $(2, 6)$ - primeti da $4$ ne može da se upari sam sa sobom.

## Ograničenja

$1 \le t \le 1000$
$1 \le n \le 2 \cdot 10^5$
$0 \le a_i \le 10^9$
$0 \le s \le 2 \cdot 10^9$
$n_1 + n_2 + \ldots + n_t \le 2 \cdot 10^5$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Broj parova datog zbira](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/broj_parova_datog_zbira2), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
