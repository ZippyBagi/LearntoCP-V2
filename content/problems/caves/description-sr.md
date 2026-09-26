Ekipa speleologa nalazi se u ulaznoj dvorani pećine, na tlu čija je nadmorska visina poznata.

Pećina ima $n$ dvorana označenih brojevima od $1$ do $n$, a ulazna je dvorana $1$. Povezuje ih $n - 1$ hodnik, i to tako da se iz svake dvorane može doći do svake, a da se pritom nigde ne može ići u krug. Za svaki hodnik znamo koje dve dvorane spaja i koliku visinsku razliku savlađuje.

Odredi najnižu nadmorsku visinu do koje speleolozi mogu da se spuste.

## Ulaz

U prvoj liniji ulaza nalazi se ceo broj $t$ - broj test primera.
U prvoj liniji svakog test primera su brojevi $h$ i $n$ - nadmorska visina tla u ulaznoj dvorani i broj dvorana.
U narednih $n - 1$ linija nalaze se po tri cela broja $u$, $v$ i $d$ koji opisuju jedan hodnik: iz koje dvorane polazi, u koju vodi i za koliko se pritom menja visina. Svaki hodnik je zapisan u smeru **od ulaza**, pa je $u$ uvek dvorana bliža ulazu. **Negativno** $d$ znači da je dvorana u koju hodnik vodi **niža** od one iz koje polazi.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji najnižu nadmorsku visinu do koje speleolozi mogu da stignu.

## Primer

```Input
1
278 7
1 2 -20
1 3 -10
2 4 -5
2 5 10
3 6 -33
3 7 7
```

```Output
235
```

Najdublje se stiže u dvoranu $6$. Put do nje vodi iz dvorane $1$ naniže u dvoranu $3$, što je $10$ metara, pa opet naniže u dvoranu $6$, još $33$: $278 - 10 - 33 = 235$.

## Ograničenja

$1 \le t \le 1000$
$1 \le n \le 5 \cdot 10^4$
$|h| \le 10^4$
$1 \le u, v \le n$
$|d| \le 10^3$
$n - 1$ hodnik povezuje sve dvorane i nigde se ne može ići u krug
zbir svih $n$ nije veći od $10^5$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Pećine](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka3/pecine), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
