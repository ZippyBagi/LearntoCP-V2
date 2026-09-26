Takmičari iz programiranja imaju rejting izražen celim brojem (moguće i negativnim). Škola treba da pošalje tročlane ekipe na državno ekipno takmičenje, a uputstvo organizatora je da sve ekipe budu ujednačene: **zbirni rejting svake ekipe mora biti nula**. Ako su poznati rejtinzi svih takmičara jedne škole, tvoj zadatak je da odrediš na koliko načina škola može da odabere svoju ekipu.

Formalno, brojiš načine da se izaberu **tri različita takmičara** čiji je zbir rejtinga $0$.

## Ulaz

U prvoj liniji je jedan ceo broj $t$ - broj test primera.

- U prvoj liniji svakog test primera je ceo broj $n$ - broj takmičara.
- U sledećoj liniji je $n$ međusobno različitih celih brojeva $a_0, a_1, \ldots, a_{n-1}$ - njihovi rejtinzi.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji broj mogućih ekipa čiji je zbirni rejting nula.

## Primer

```Input
1
9
-8 -5 7 4 1 -2 9 -3 2
```

```Output
4
```

Ekipe su $(-8, 1, 7)$, $(-5, 4, 1)$, $(-3, 1, 2)$ i $(-5, -2, 7)$.

## Ograničenja

$1 \le t \le 100$
$3 \le n \le 5000$
$-10^9 \le a_i \le 10^9$
$n_1 + n_2 + \ldots + n_t \le 5000$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Trojke datog zbira (3sum)](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/three_sum1), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
