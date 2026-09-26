Dat ti je niz od $n$ celih brojeva, a zatim i spisak od $m$ operacija koje treba redom izvršiti nad njim. Svaka operacija je jedne od dve vrste: ili menja jedan element, ili traži zbir uzastopnih elemenata na nekoj deonici.

Napiši program koji ispisuje odgovor na svako pitanje, koristeći niz onakav kakav je u tom trenutku.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U prvoj liniji svakog test primera su dva cela broja $n$ i $m$ - dužina niza i broj operacija.
U drugoj liniji je $n$ celih brojeva $a_0, a_1, \dots, a_{n-1}$.
U svakoj od sledećih $m$ linija je po jedna operacija, u jednom od dva oblika:

- `s i v` - upiši (set) vrednost $v$ na poziciju $i$;
- `q l r` - ispiši (query) zbir elemenata na pozicijama $l, l+1, \dots, r$.

Pozicije se broje **od $0$**, pa su $i$, $l$ i $r$ svi između $0$ i $n-1$.

## Izlaz

Za svaku operaciju `q`, redom kojim se operacije javljaju, ispiši u posebnoj liniji zbir te deonice.

## Primer

```Input
1
5 5
1 2 3 4 5
q 0 4
q 2 3
s 2 5
s 3 6
q 0 4
```

```Output
15
7
19
```

Niz kreće kao $1, 2, 3, 4, 5$, pa je zbir celog niza $15$, a pozicije od $2$ do $3$ daju $3 + 4 = 7$. Posle dve izmene niz je $1, 2, 5, 6, 5$, čiji je zbir $19$.

## Ograničenja

$1 \le t \le 10$
$1 \le n \le 10^5$
$1 \le m \le 10^5$
$0 \le a_i \le 10$ i $0 \le v \le 10$
$0 \le i \le n-1$ i $0 \le l \le r \le n-1$
Zbir $n$ preko svih test primera ne prelazi $2 \cdot 10^5$, kao ni zbir $m$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Sume segmenata promenljivog niza](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka3/sume_segmenata_promenljivog_niza1), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
