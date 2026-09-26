
## Pristup

Isprobavanje svakog para je oko $5 \cdot 10^9$ poređenja za $n = 10^5$ - daleko presporo. Zato poredimo AND i XOR tamo gde se odluka zapravo donosi: na **najvišem** bitu.

Uzmi dve oznake i pogledaj poziciju najvišeg upaljenog bita svake od njih.

**Ista pozicija $p$:** oba broja tu imaju $1$, pa AND zadržava taj bit i $a \, \& \, b \ge 2^p$, dok ga XOR gasi, a iznad $p$ nema ničega, pa je $a \oplus b < 2^p$. Par je jak.

**Različite pozicije**, recimo $p > q$: manja oznaka ima $0$ na poziciji $p$, pa je AND gasi i $a \, \& \, b < 2^p$, dok je XOR zadržava i $a \oplus b \ge 2^p$. Par nije jak.

> Par je jak tačno kada obe oznake imaju najviši upaljen bit na **istoj poziciji**.

Znači same oznake više nisu bitne. Rasporedi senzore u grupe po toj poziciji - svega $30$ grupa, pošto je $a_i < 2^{30}$ - i svaka dva senzora unutar grupe čine par, dok između grupa nikada nema para.

Koliko onda parova daje grupa veličine $c$? Poređaj senzore u niz i za svaki prebroj samo parove koje on započinje, da ništa ne bismo brojali dvaput. Prvi senzor se pari sa $c - 1$ senzora iza sebe. Drugi je već upario sa prvim, pa započinje samo $c - 2$ nova para. Treći započinje $c - 3$, i tako redom do poslednjeg, koji ne započinje nijedan:

$$(c-1) + (c-2) + (c-3) + \ldots + 2 + 1$$

To je zbir svih brojeva od $1$ do $c - 1$, a njega već umemo da sklopimo: presavij zbir na pola i sabiraj članove u parovima, spolja ka unutra. Prvi i poslednji daju $(c-1) + 1 = c$, drugi i pretposlednji daju $(c-2) + 2 = c$, i svaki takav par daje isto $c$. Članova ima $c - 1$, pa ovakvih parova ima $\frac{c-1}{2}$, a ceo zbir je

$$\frac{c \cdot (c-1)}{2}$$

Najviši bit nalazimo tako što broj pomeramo udesno dok ne ostane samo jedan bit, brojeći pomeranja.

## Primer

Uzmimo prvi test primer, $a = [1, 4, 3, 7, 10]$, i rasporedimo oznake po najvišem bitu:

| najviši bit |     oznake u grupi     | veličina $c$ | parova $\frac{c(c-1)}{2}$ |
| :---------: | :--------------------: | :----------: | :-----------------------: |
|     $0$     |        $1 = 1$         |     $1$      |            $0$            |
|     $1$     |       $3 = 11$         |     $1$      |            $0$            |
|     $2$     |  $4 = 100$, $7 = 111$  |     $2$      |            $1$            |
|     $3$     |      $10 = 1010$       |     $1$      |            $0$            |

Jedino grupa sa bitom $2$ ima društvo, pa je odgovor jedini par $(4, 7)$.
## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        int n;
        cin>>n;

        vector<long long> cnt(31, 0); // cnt[b] = how many numbers have bit b as their highest one

        for(int i=0;i<n;i++){

            unsigned int x;
            cin>>x;

            int b = 0;
            while((x >> 1) > 0){ // shift away low bits until only the highest one is left
                x >>= 1;
                b++;
            }

            cnt[b]++;
        }

        long long ans = 0;

        for(int b=0;b<31;b++){
            ans += cnt[b] * (cnt[b] - 1) / 2; // every pair inside a group is strong
        }

        cout<<ans<<'\n';
    }
    return 0;
}
```

Oznake nigde ne čuvamo - svaka se ubroji u svoju grupu čim je pročitamo.

## Složenost

Vremenska složenost je $O\left(n \log A\right)$, gde je $A$ najveća oznaka.
Memorijska složenost je $O(1)$.
