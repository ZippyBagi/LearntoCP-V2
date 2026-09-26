
## Pristup

Provera svih parova traje $O(n^2)$ - presporo za $n = 2 \cdot 10^5$. Ovo je tačno situacija iz lekcije o dva pokazivača, uz jedan dodatak: tamo smo tražili jedan par, ovde ih sve brojimo.

Prvo **sortiraj** niz. Zatim postavi `left` na najmanji, a `right` na najveći element i pogledaj zbir $a_{left} + a_{right}$:

- ako je zbir **premali**, nijedan par sa $a_{left}$ ne valja - sve levo od `right` je još manje - pa pomeri `left` napred;
- ako je zbir **preveliki**, nijedan par sa $a_{right}$ ne valja, pa pomeri `right` nazad;
- ako je zbir **tačno $s$**, našli smo par - izbroj ga i pomeri **oba** pokazivača.

Pošto su svi elementi **međusobno različiti**, $a_{left}$ ne može da napravi još jedan par - njegov jedini mogući partner je $a_{right}$, koga smo upravo iskoristili.

Svaki korak pomera bar jedan pokazivač, pa se pokazivači sretnu posle najviše $n$ koraka.

## Primer

Prvi test primer sortiran: $[0, 2, 4, 5, 6, 7]$, $s = 7$:

| $a_{left}$ | $a_{right}$ | zbir | potez |
|---|---|---|---|
| $0$ | $7$ | $7$ | **broji se**, oba se pomeraju |
| $2$ | $6$ | $8$ | preveliki, `right--` |
| $2$ | $5$ | $7$ | **broji se**, oba se pomeraju |

Posle trećeg koraka pokazivači se mimoilaze i stajemo: $2$ para, što odgovara parovima $(2, 5)$ i $(7, 0)$ iz postavke.

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

        int n,k;
        cin>>n>>k;

        vector<int> a(n);

        for(int i=0;i<n;i++){
            cin>>a[i];
        }

        sort(a.begin(), a.end());

        int ans = 0;

        int l = 0;
        int r = n-1;

        while(l < r){
            if(a[l] + a[r] == k){
                ans++;
                l++;
                r--;
            }else if(a[l] + a[r] > k){ // the sum is too large
                r--;
            }else if(a[l] + a[r] < k){ // the sum is too small
                l++;
            }
        }
        cout<<ans<<'\n';

    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(n \log n)$.
Memorijska složenost je $O(n)$.
