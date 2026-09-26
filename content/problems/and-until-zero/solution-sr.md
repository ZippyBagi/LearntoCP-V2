
## Pristup

Simulacija odbrojavanja je beznadežna - za $n = 10^9$ to je pola milijarde koraka. Ali AND može samo da **gasi bitove**, pa je pravo pitanje kada umire poslednji preživeli bit.

Taj poslednji preživeli je **najviši** bit broja $n$. Nazovimo njegovu poziciju $h$, dakle $2^h \le n < 2^{h+1}$.

Svaki broj od $n$ naniže do $2^h$ ima taj bit upaljen, pa registar celim tim putem ostaje različit od nule. A $2^h$ ima **samo** taj bit, pa AND sa njim ostavlja registar na tačno $2^h$. Sledeći broj, $2^h - 1$, ima bit $h$ ugašen i završava posao:

$$k = 2^h - 1$$

Za nalaženje $h$ kreni od $1$ i shift-uj ulevo dok rezultat i dalje nije veći od $n$, baš kao `1 << x`.

## Primer

Četiri broja iz postavke:

| $n$  | $n$ binarno | najviši bit $h$ | $2^h$ | odgovor $2^h - 1$ | binarno |
| :--: | :---------: | :-------------: | :---: | :---------------: | :-----: |
| $2$  |    $10$     |       $1$       |  $2$  |        $1$        |   $1$   |
| $5$  |    $101$    |       $2$       |  $4$  |        $3$        |  $11$   |
| $17$ |   $10001$   |       $4$       | $16$  |       $15$        | $1111$  |
| $1$  |     $1$     |       $0$       |  $1$  |        $0$        |   $0$   |

Proveri treći red rukom: $17 \, \& \, 16 = 16$, i tek onda $16 \, \& \, 15 = 0$. Niži bitovi nikada nisu bili bitni - $5$ i $7$ uopšte ne liče jedan na drugi, a oba staju na $3$.

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

        unsigned int n;
        cin>>n;

        unsigned int h = 1;

        while((h << 1) <= n){ // h climbs to the largest power of two that is still <= n
            h <<= 1;
        }

        cout<<(h - 1)<<'\n';  // one step below that power of two, all lower bits set
    }
    return 0;
}
```

Uslov se proverava **pre** pomeranja, pa `h` nikada ne pretekne $n$ i nikada se ne prelije.

## Složenost

Vremenska složenost je $O(t \log n)$.
Memorijska složenost je $O(1)$.
