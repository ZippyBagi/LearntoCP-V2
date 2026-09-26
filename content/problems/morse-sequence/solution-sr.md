
## Pristup

Ispisivanje signala je beznadežno - $n$ ide do $10^{18}$, a nijedan niz nije toliko dugačak.

Umesto toga, pažljivo pročitaj konstrukciju. Kada se blok dužine $p = 2^k$ završi, pozicije od $p+1$ do $2p$ nisu ništa drugo nego taj isti blok, invertovan. Znači, pozicija u drugoj polovini je **ogledalo** neke pozicije iz prve polovine, pomerene unazad za tačno $p$.

To je sve što nam treba. Za poziciju $n > 1$ neka je $p$ najveći stepen dvojke koji je i dalje **strogo manji** od $n$. Tada pozicija $n$ pripada kopiji napravljenoj od prvih $p$ cifara, pa važi

$$a(n) = 1 - a(n - p)$$

Bazni slučaj je cifra od koje je stanica krenula, $a(1) = 1$.

Ovo je rekurzija tačno onog oblika iz lekcije: jedan bazni slučaj i jedan poziv koji manji posao prosleđuje dalje.

Uz to se i brzo završava. Pošto je $p$ najveći stepen dvojke ispod $n$, znamo da je $n \le 2p$, pa je $n - p \le p$ - pozicija se na svakom pozivu bar prepolovi. Za $n \le 10^{18}$ to je oko $60$ poziva, daleko od prekoračenja steka.

## Primer

Praćenje poziva za $n = 15$:

| poziv    | najveće $p < n$ | svodi se na | vrednost        |
| :------: | :-------------: | :---------: | :-------------: |
| $a(15)$  |       $8$       |   $a(7)$    | $1 - 1 = 0$     |
| $a(7)$   |       $4$       |   $a(3)$    | $1 - 0 = 1$     |
| $a(3)$   |       $2$       |   $a(1)$    | $1 - 1 = 0$     |
| $a(1)$   |        -        |      -      | $1$             |

Pozivi se spuštaju naniže, a vrednosti se vraćaju naviše, pa je odgovor za poziciju $15$ jednak $0$.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

typedef unsigned long long ull;

int digitAt(ull n){

    if(n == 1){          // cifra od koje je stanica krenula
        return 1;
    }

    ull p = 1;

    while((p << 1) < n){ // p se penje do najvećeg stepena dvojke strogo ispod n
        p <<= 1;
    }

    return 1 - digitAt(n - p); // druga polovina je prva polovina, invertovana
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        ull n;
        cin>>n;

        cout<<digitAt(n)<<'\n';
    }
    return 0;
}
```

Primeti da svaki poziv tačno jednom obrne odgovor. Znači, cifru zapravo odlučuje broj poziva - paran broj daje $1$, neparan daje $0$. Taj broj je broj jedinica u binarnom zapisu broja $n - 1$, i odatle dolaze rešenja ovog zadatka u jednoj liniji.

## Složenost

Vremenska složenost je $O(t \log n)$.
Memorijska složenost je $O(\log n)$ zbog steka poziva.
