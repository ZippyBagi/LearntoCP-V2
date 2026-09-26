
## Pristup

XOR radi nad svakim bitom zasebno, pa ključ određuj **bit po bit**.

Ima smisla upaliti bit $k$ ključa samo kada **oba** broja $a$ i $b$ imaju taj bit - tada ga $x$ ^ $x = 0$ briše iz oba broja i ta pozicija ne košta ništa. To je tačno ključ $x = a \, \& \, b$.

Posle tih brisanja ostaju pozicije na kojima se $a$ i $b$ razlikuju, a njih uvek plaćamo: šta god ključ tu uradio, tačno jedan od dva broja zadrži svoju $1$. To je upravo definicija XOR-a:

$$\min_{x} \left( (a \oplus x) + (b \oplus x) \right) = a \oplus b$$
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

        unsigned int a, b;
        cin>>a>>b;

        cout<<(a ^ b)<<'\n'; // only the bits where a and b differ survive, each paid once
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(t)$.
Memorijska složenost je $O(1)$.
