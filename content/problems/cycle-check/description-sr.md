U budućnosti će postojati više svetova, a unutar svakog od njih ljudi će moći da se teleportuju sa planete na planetu. Teleport je **jednosmeran**: veza sa planete $a$ na planetu $b$ vodi od $a$ do $b$, ali ne i nazad.

Za svaki svet odredi da li postoji planeta sa koje se može otići pa se nizom teleportovanja vratiti na nju.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj svetova.
U prvoj liniji svakog sveta su dva cela broja $v$ i $e$ - broj planeta i broj teleporta.
U svakoj od sledećih $e$ linija su dva cela broja $a$ i $b$ - teleport koji vodi sa planete $a$ na planetu $b$.

Planete su označene brojevima od $0$ do $v-1$.

## Izlaz

Za svaki svet ispiši u posebnoj liniji `yes` ako postoji planeta sa koje se može otići i vratiti na nju, a `no` u suprotnom.

## Primer

```Input
2
5 5
0 1
2 1
2 3
3 4
4 2
5 5
0 1
2 1
2 3
3 4
4 0
```

```Output
yes
no
```

U prvom svetu se sa planete $2$ može otići i vratiti, teleportovanjem $2 \rightarrow 3 \rightarrow 4 \rightarrow 2$. Drugi svet koristi skoro iste veze, ali poslednja vodi na planetu $0$ umesto na planetu $2$ - a na planetu $0$ ne stiže nijedan teleport, pa se nazad ne može nikako.

## Ograničenja

$1 \le t \le 20$
$2 \le v \le 5000$
$1 \le e \le 2 \cdot 10^4$
$0 \le a, b \le v-1$
Zbir $v$ preko svih svetova ne prelazi $5 \cdot 10^4$, a zbir $e$ ne prelazi $2 \cdot 10^5$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Provera ciklusa](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka3/provera_ciklusa), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
