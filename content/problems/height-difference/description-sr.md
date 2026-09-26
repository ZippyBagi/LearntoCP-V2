U jednom odeljenju biraju se glumci za školsku predstavu "Stanlio i Olio" - komičarski dvojac čuven po velikoj razlici u visini. Poznate su visine svih $n$ učenika, a dvojac izgleda kako treba tačno kada je razlika u visini njegova dva člana tačno $r$.

Tvoj zadatak je da izbrojiš na koliko načina mogu da se izaberu dva učenika tako da im razlika u visini bude tačno $r$. Dva učenika jednakih visina su i dalje dva različita učenika - parovi se broje po tome **ko je u njima**, a ne po visinama.

## Ulaz

U prvoj liniji je jedan ceo broj $t$ - broj test primera.

- U prvoj liniji svakog test primera su dva cela broja $n$ i $r$ - broj učenika i tražena razlika visina.
- U sledećoj liniji je $n$ celih brojeva $a_0, a_1, \ldots, a_{n-1}$ - visine učenika u milimetrima. Visine mogu da se ponavljaju.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji broj parova učenika čija je razlika visina tačno $r$.

## Primer

```Input
2
5 2350
15745 18095 15745 16234 13395
4 1
7 7 8 9
```

```Output
4
3
```

U prvom test primeru parovi su: prvi i drugi učenik, prvi i peti, drugi i treći, i treći i peti. U drugom test primeru oba učenika visine $7$ se uparuju sa onim visine $8$, a onaj visine $8$ sa onim visine $9$.

## Ograničenja

$1 \le t \le 1000$
$1 \le n \le 2 \cdot 10^5$
$1 \le a_i \le 10^9$
$1 \le r \le 10^9$
$n_1 + n_2 + \ldots + n_t \le 2 \cdot 10^5$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Razlika visina](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/razlika_visina1), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
