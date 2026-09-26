
## Pristup

Provera svakog broja svakog intervala testom sa $\sqrt{n}$ košta do $10^6$ provera po intervalu - sa $10^5$ intervala, beznadežno. Ali svi intervali žive unutar $[1, 10^6]$, pa možemo sve da pripremimo **jednom** i na svako pitanje odgovorimo trenutno.

Prvo pokreni **Eratostenovo sito** iz lekcije do $10^6$: posle njega, `is_prime[x]` odgovara na pitanje "da li je $x$ prost?" u $O(1)$.

Pitanja se tiču raspona, a za raspone već imamo alat - **prefiksne zbirove**. Izgradi dva prefiksna niza preko sita:

- $cnt_i$ - koliko prostih ima među $1, \ldots, i$;
- $sum_i$ - zbir tih prostih.

Tada je svaki interval dva oduzimanja, baš kao u zadatku [Zbirovi segmenata](/sr/Problems/segment-sums):

$$cnt_b - cnt_{a-1} \qquad sum_b - sum_{a-1}$$

**Pažnja:** zbir svih prostih do $10^6$ je oko $3.7 \cdot 10^{10}$ - ne staje u `int`, pa je niz $sum$ tipa `long long`. Moduo se uzima tek pri ispisu: prvo oduzmi, pa onda `% 1000000`.
## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

const int MAXN = 1000000;

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    vector<bool> is_prime(MAXN + 1, true);
    is_prime[0] = false;
    is_prime[1] = false; // remember, 1 is not prime!

    for(int i=2;(long long)i*i<=MAXN;i++){
        if(is_prime[i]){
            for(int j=i*i;j<=MAXN;j+=i){
                is_prime[j] = false;
            }
        }
    }

    // prefix counts and prefix sums over the sieve
    vector<int> cnt(MAXN + 1, 0);
    vector<long long> sum(MAXN + 1, 0); // the sum of primes overflows an int

    for(int i=1;i<=MAXN;i++){
        cnt[i] = cnt[i-1] + (is_prime[i] ? 1 : 0);
        sum[i] = sum[i-1] + (is_prime[i] ? i : 0);
    }

    int t;
    cin>>t;

    while(t--){

        int a, b;
        cin>>a>>b;

        cout<<cnt[b] - cnt[a-1]<<' '<<(sum[b] - sum[a-1]) % 1000000<<'\n';
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(N \log \log N + t)$ gde je $N = 10^6$.
Memorijska složenost je $O(N)$.
