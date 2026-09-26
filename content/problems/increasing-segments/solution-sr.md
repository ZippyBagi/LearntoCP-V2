
## Pristup

Provera svakog mogućeg segmenta posebno (oko $n^2 / 2$ provera, dakle O($n^2$)) je prespora.

Umesto toga, prolazimo kroz niz jednom i na svakoj poziciji se pitamo: **koliko ova pozicija dodaje na ukupan zbir?**

Posmatrajmo svaki rastući segment posebno, i nazovimo prolazak kroz jedan segment nizom. Tada možemo da uporedimo $a_i$ sa elementom pre njega

- Ako je $a_i > a_{i-1}$, svaki element rastućeg niza pre $a_i$ obrazuje **novi** segment kome je $a_i$ kraj - pa svaki od njih doprinosi $+1$ ukupnom zbiru.
- Ako nije, nijedan rastući segment ne može da se završi na $a_i$, pa ne dodajemo ništa. (to znači da se prethodni niz završio i da počinje novi)

Te elemente pratimo brojačem: `elements` je dužina trenutnog rastućeg niza. Na povećanje dodaj `elements` na rezultat i produži niz za jedan. Na prekid ga vrati na $1$ - niz je sada samo $a_i$.

**Pažnja:** rezultat ne staje u `int`. Potpuno rastući niz od $2 \cdot 10^5$ elemenata sadrži $n(n-1)/2 \approx 2 \cdot 10^{10}$ segmenata, zato zbir čuvaj u `long long`-u.

## Primer

Prvi test primer, $[1, 3, 4, -2, 10]$:

| $a_i$            | $1$ | $3$ | $4$     | $-2$ | $10$ |
| ---------------- | --- | --- | ------- | ---- | ---- |
| dodati segmenti  | $0$ | $1$ | **$2$** | $0$  | $1$  |
| ukupno segmenata | 0   | 1   | 3       | 3    | 4    |
| `elements` posle | $1$ | $2$ | **$3$** | $1$  | $2$  |

Pogledaj 4: niz ispred je $[1, 3]$, i svaki od ta dva elementa daje po jedan novi segment sa krajem u $4$ - naime $[3, 4]$ i $[1, 3, 4]$. Broj $-2$ prekida niz i ne dodaje ništa, a zatim $10$ zatvara $[-2, 10]$ za još jedan. Ukupno: $0 + 1 + 2 + 0 + 1 = 4$ - rezultat.

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

        vector<int> a(n);

        for(int i=0;i<n;i++){
            cin>>a[i];
        }

        long long ans = 0; // the number of segments can be huge
        int elements = 1;  // length of the increasing run ending at a[i-1]

        for(int i=1;i<n;i++){
            if(a[i] > a[i-1]){
                ans += elements; // one new segment for every element of the run before a[i]
                elements++;      // the run extends with a[i]
            }else{
                elements = 1;    // the run breaks, a[i] starts a new one
            }
        }

        cout<<ans<<'\n';
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(n)$.
Memorijska složenost je $O(n)$.
