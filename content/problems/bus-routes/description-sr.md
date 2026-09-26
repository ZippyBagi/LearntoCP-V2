Poznate su autobuske linije jednog grada. Svaka linija je spisak stanica, a autobusi voze u **oba** smera - kada jednom uđeš u autobus, možeš da izađeš na bilo kojoj drugoj stanici te linije. Jedno takvo putovanje jednim autobusom zovemo **vožnja**, a presedanje u drugi autobus započinje novu.

Odredi najmanji broj vožnji potreban da se od zadate početne stigne do zadate krajnje stanice.

## Ulaz

U prvoj liniji ulaza nalazi se ceo broj $t$ - broj test primera.
U prvoj liniji svakog test primera su brojevi $s$ i $n$ - koliko grad ima stanica i koliko autobuskih linija. Stanice su označene brojevima od $1$ do $s$.
U narednih $n$ linija opisana je po jedna autobuska linija: prvo broj $m$ stanica na njenoj ruti, a zatim $m$ **različitih** brojeva stanica.
U poslednjoj liniji test primera su brojevi $a$ i $b$ - početna i krajnja stanica.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji najmanji broj vožnji od stanice $a$ do stanice $b$. Ako se do nje ne može stići, ispiši $-1$. Ako su $a$ i $b$ ista stanica, odgovor je $0$, jer nikuda ne treba ni ići.

## Primer

```Input
1
7 2
3 1 2 7
3 3 6 7
1 6
```

```Output
2
```

Uđi u prvi autobus na stanici $1$ i vozi se do stanice $7$, pa presedni u drugi autobus koji te odvozi do stanice $6$. Dve vožnje, a jednom ne može - nijedna linija ne sadrži i stanicu $1$ i stanicu $6$.

## Ograničenja

$1 \le t \le 1000$
$1 \le s \le 10^5$
$1 \le n \le 10^5$
$1 \le m$
$1 \le a, b \le s$
stanice jedne autobuske linije međusobno su različite
zbir svih $s$ nije veći od $2 \cdot 10^5$
zbir svih $m$ nije veći od $2 \cdot 10^5$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Autobuske rute](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka3/kruzni_autobusi), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
