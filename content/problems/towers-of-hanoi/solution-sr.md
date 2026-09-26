
## Pristup

Posmatraj samo **najveći disk**. On mora da završi na štapu $3$, a na njemu nikada ništa ne sme da stoji, pa u trenutku kada se pomera ostala dva štapa moraju da izgledaju ovako: štap $3$ je potpuno prazan, a svih $n-1$ manjih diskova stoji na štapu $2$.

Znači ceo posao se deli na tri koraka:

1. premesti gornjih $n-1$ diskova sa štapa $1$ na štap $2$,
2. premesti najveći disk sa štapa $1$ na štap $3$ - jedna jedina linija izlaza,
3. premesti tih $n-1$ diskova sa štapa $2$ na štap $3$.

Koraci $1$ i $3$ su **isti problem sa jednim diskom manje**. To je celo rešenje: funkcija koja premešta $k$ diskova sa jednog štapa na drugi, koristeći treći kao odlagalište.

~!
```c++
hanoi(k, from, to, spare)
```

Štapovi menjaju uloge na svakom nivou - u koraku $1$ je odredište $3$ pomoćni štap, a u koraku $3$ je to polazni štap $1$. Zato funkcija prima sva tri kao parametre umesto da ih imenuje.

Bazni slučaj je $k = 0$: nema diskova, nema šta da se ispiše, samo se vraćamo.

**Zašto manji diskovi nikada ne smetaju?** Zato što dok radimo sa njima, najveći disk i dalje leži na dnu svog štapa - a veći je od svega što premeštamo, pa se bilo koji disk sme spustiti na njega. Isti argument se ponavlja nivo niže, pa je svaki potez koji funkcija napravi dozvoljen.

**Zašto je ovo najmanji mogući broj poteza?** Najveći disk mora da se pomeri bar jednom, a pre nego što to može, svih $n-1$ ostalih mora da bude i sa štapa $1$ i sa štapa $3$ - dakle na štapu $2$. Znači nijedno rešenje ne može biti bolje od "reši $n-1$, jedan potez, reši $n-1$", a to je tačno ono što radimo. Prebrojimo linije: $f(n) = 2f(n-1) + 1$ uz $f(0) = 0$, pa je $f(n) = 2^n - 1$.

## Primer

Prvi test primer, $n = 3$ - sedam linija koje pozivi ispisuju, redom kojim izlaze:

| # | ispisano | disk | ko je ispisao |
|---|---|---|---|
| 1 | $1\ 3$ | $1$ | korak 1 poziva "premesti 2 diska $1 \rightarrow 2$", nivo dublje |
| 2 | $1\ 2$ | $2$ | korak 2 poziva "premesti 2 diska $1 \rightarrow 2$" |
| 3 | $3\ 2$ | $1$ | korak 3 poziva "premesti 2 diska $1 \rightarrow 2$" |
| 4 | **$1\ 3$** | **$3$** | **korak 2 glavnog poziva - najveći disk** |
| 5 | $2\ 1$ | $1$ | korak 1 poziva "premesti 2 diska $2 \rightarrow 3$" |
| 6 | $2\ 3$ | $2$ | korak 2 poziva "premesti 2 diska $2 \rightarrow 3$" |
| 7 | $1\ 3$ | $1$ | korak 3 poziva "premesti 2 diska $2 \rightarrow 3$" |

Pročitaj prve tri linije zajedno: one su jedan poziv, "premesti 2 diska sa štapa $1$ na štap $2$", a unutar njega štap $3$ igra ulogu pomoćnog. Posle linije $3$ dva mala diska zaista stoje na štapu $2$ i štap $3$ je prazan, pa je linija $4$ dozvoljena. Poslednje tri linije su ogledalo prve tri: "premesti 2 diska sa štapa $2$ na štap $3$", sa štapom $1$ kao pomoćnim.

**Pažnja:** potezi test primera se ispisuju jedan za drugim, bez ičega između. Nemoj ispisivati broj poteza ni razdvajač - onaj ko čita tvoj izlaz zna da test primer sa $n$ diskova ima tačno $2^n - 1$ linija.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

void hanoi(int n, int from, int to, int spare){

    if(n == 0){ // nothing left to move - the base case
        return;
    }

    hanoi(n - 1, from, spare, to); // clear the n-1 smaller discs out of the way
    cout<<from<<" "<<to<<"\n"; // now the biggest disc is free to move
    hanoi(n - 1, spare, to, from); // and the small ones come back on top of it
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        int n;
        cin>>n;

        hanoi(n, 1, 3, 2); // from peg 1 to peg 3, peg 2 is the spare one
    }
    return 0;
}
```

Primeti da štapove nigde ne čuvamo - u programu nema nijednog niza diskova. Stanje kula živi isključivo u lancu poziva.

## Složenost

Vremenska složenost je $O(2^n)$ po test primeru.
Memorijska složenost je $O(n)$.
