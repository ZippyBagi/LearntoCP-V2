
## Pristup

Kada je visina testere $h$ poznata, lako je izračunati koliko ćemo drveta dobiti: svako stablo više od $h$ daje $h_i - h$ metara, a niža ne daju ništa. Mogli bismo da redom probamo $h = 0, 1, 2, \dots$ i zaustavimo se na poslednjoj visini koja nam još daje dovoljno - ali najviše stablo ide do $10^4$ metara, a stabala ima do $10^5$, što je $10^9$ koraka.

Ne moramo da probamo svaku. Primeti da spuštanjem testere nikad ne dobijamo manje drveta: stablo koje se ionako seklo dodaje još jedan metar, a ona koja su bila preniska počinju da daju nešto. Znači, ako na visini $h$ ima dovoljno drveta, ima ga i na svakoj nižoj:

`DA DA DA ... DA NE NE NE`

a nama treba **poslednje DA**. To je upravo binarna pretraga po rešenju.

Za proveru nam služi ona ista petlja sabiranja odozgo, u $O(n)$:

- `low = 0` - testera na zemlji uvek daje dovoljno, jer postavka garantuje da u šumi ima dovoljno drveta;
- `high` - najviše stablo, do kog dolazimo pomoću `max_element` (zgodna C++ funkcija koja vraća iterator na najveći element; obična for petlja radi isti posao).

**Pažnja:** kod nas visina koja prođe znači da dalje treba tražiti **naviše**, a ne naniže - pa je `low` taj koji se pomera kad provera uspe. Upiši `mid` u `ans` pre nego što kreneš dalje, inače će ti najbolja visina koja prolazi izmaći.

## Primer

Prva šuma je $[24, 21, 19, 14, 22]$, a Milanu treba $14$ metara:

| `low` | `high` | `mid` | drveta na `mid` | |
|---|---|---|---|---|
| $0$ | $24$ | $12$ | $40$ | dovoljno |
| $13$ | $24$ | $18$ | $14$ | dovoljno |
| $19$ | $24$ | $21$ | $4$ | premalo |
| $19$ | $20$ | $19$ | $10$ | premalo |

Proveri drugi red: na $18$ metara stabla daju $6 + 3 + 1 + 0 + 4 = 14$ - taman koliko treba, pa pamtimo $18$ i dižemo testeru još malo. Od $19$ naviše više ništa ne prolazi, i $18$ ostaje kao rešenje.

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

        int n, x;
        cin>>n>>x;

        vector<int> a(n);
        for(int i=0;i<n;i++){
            cin>>a[i];
        }

        int low = 0;
        int high = *max_element(a.begin(), a.end()); // above the tallest tree nothing gets cut

        int ans = 0;

        while(low <= high){

            int mid = low + (high - low) / 2;

            int cut = 0;
            for(int i=0;i<n;i++){
                if(a[i] > mid){
                    cut += a[i] - mid; // only the part above the blade falls
                }
            }

            if(cut >= x){
                ans = mid;      // enough wood - try to raise the saw
                low = mid + 1;
            }else{
                high = mid - 1;
            }
        }

        cout<<ans<<'\n';
    }
    return 0;
}
```

Cela šuma ima najviše $10^5 \cdot 10^4 = 10^9$ metara, a toliko `int` još uvek prima, pa nam ovde `long long` nije potreban. Kod krupnijeg drveća bi bio - vidi [Drvoseča II](/sr/Problems/woodcutter-2).

## Složenost

Vremenska složenost je $O(n \log H)$, gde je $H$ visina najvišeg drveta.
Memorijska složenost je $O(n)$.
