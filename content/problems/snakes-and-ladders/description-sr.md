U igri "Zmije i lestve" igrač se kreće duž niza polja tako što baca kockicu i pomera se za onoliko polja koliko je pala. Neka polja su posebna:

- ako stane na polje sa **lestvama**, penje se na više polje do kog one vode;
- ako stane na polje sa **zmijom**, spušta se na niže polje do kog ona vodi.

Polje na koje ga prebace može i samo imati zmiju ili lestve, pa ga one nose dalje, i tako sve dok se ne zaustavi na polju na kom nema ni jedno ni drugo.

Ako se pritom ikada vrati na polje kroz koje je u tom nizu već prošao, upao je u petlju, **istog trena gubi** i do cilja više ne može. Takva polja mora da zaobiđe.

Odredi najmanji broj bacanja potreban da se od početnog polja stigne do završnog.

## Ulaz

U prvoj liniji ulaza nalazi se ceo broj $t$ - broj test primera.
U prvoj liniji svakog test primera su brojevi $n$, $k$ i $m$ - broj polja, najveći broj koji kockica može da pokaže i koliko ukupno ima zmija i lestvi. Polja su označena brojevima od $0$ do $n-1$; igrač kreće sa polja $0$, a završno polje je $n-1$. Kockica daje bilo koji broj od $1$ do $k$, a bacanje koje bi igrača odnelo **preko** završnog polja nije dozvoljeno.
U narednih $m$ linija nalaze se po dva broja $u$ i $v$ - zmija ili lestve sa polja $u$ na polje $v$. Nijedno polje nema više od jedne, a ni početno ni završno polje nemaju nijednu.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji najmanji broj bacanja do završnog polja, ili $-1$ ako se do njega ne može stići.

## Primer

```Input
2
18 2 5
2 12
3 13
8 17
11 1
14 7
5 2 2
1 3
3 1
```

```Output
3
2
```

U prvom test primeru igrač baci $2$ i sa polja $0$ dolazi na polje $2$, odakle ga lestve dižu na $12$. Novo bacanje $2$ ga vodi na $14$, gde ga zmija spušta na $7$. Poslednje bacanje $1$ ga stavlja na $8$, a odatle ga lestve nose na polje $17$ - cilj, u tri bacanja.

U drugom test primeru polja $1$ i $3$ pokazuju jedno na drugo, pa ko stane na bilo koje od njih odmah gubi. Igrač mora da ih preskoči: $0 \rightarrow 2 \rightarrow 4$, u dva bacanja.

## Ograničenja

$1 \le t \le 1000$
$2 \le n \le 2000$
$1 \le k \le n - 1$
$0 \le m \le n - 2$
$0 < u < n - 1$
$0 \le v \le n - 1$
$u \ne v$, i nijedno $u$ se ne ponavlja
zbir svih $n$ nije veći od $2 \cdot 10^4$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Zmije i lestve](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka3/zmije_i_lestve), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
