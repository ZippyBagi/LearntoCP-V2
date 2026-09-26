
## Pristup

Binarna pretraga iz zadatka [Drvoseča](/sr/Problems/woodcutter) i dalje dolazi do rešenja: ako na nekoj visini ima dovoljno drveta, ima ga i na svakoj nižoj, pa tražimo poslednju visinu koja prolazi.

Ono što više ne prolazi jeste cena jedne provere. Prolazak kroz svih $n$ stabala košta $O(n)$, a sada ga plaćamo $\log H \approx 30$ puta **po svakoj porudžbini** - do $10^5 \cdot 10^5 \cdot 30$ koraka. Pretraga ostaje kakva jeste, provera mora da se ubrza.

### Do kojih stabala testera dopire?

Samo do onih viših od sečiva. Ako **sortiramo** visine, ta stabla se uvek nađu na **kraju** niza, u jednom komadu - sve od prvog stabla visine $\ge h$ pa nadalje. Baš tu prvu poziciju vraća `lower_bound`, u $O(\log n)$:

~!
```cpp
int idx = lower_bound(a.begin(), a.end(), h) - a.begin();
```

Da li će stabla visine tačno $h$ upasti u taj komad nije ni važno - ovako ili onako daju $h - h = 0$ metara.

### Koliko je to drveta?

Svako od tih $n - idx$ stabala daje svoju visinu umanjenu za $h$, pa je

$$drvo(h) = (a_{idx} + a_{idx+1} + \dots + a_{n-1}) - h \cdot (n - idx)$$

Zbir u zagradi je zbir jednog kraja niza, a do njega stižemo **prefiksnim sumama**: ako $psum[i]$ čuva zbir prvih $i$ sortiranih visina, tražena vrednost je $psum[n] - psum[idx]$. Time cela provera pada na $O(\log n)$.

Sortiranje i prefiksne sume pravimo po jednom za svaku šumu, a onda ih svih $q$ porudžbina koristi.

**Pažnja:** $10^5$ stabala od po $10^9$ metara daje $10^{14}$, a i proizvod $h \cdot (n - idx)$ ide do te iste veličine - daleko van opsega tipa `int`. Visine, prefiksne sume, naručene količine i sve unutar provere moraju biti `long long`.

## Primer

Sortirana, prva šuma izgleda ovako: $[14, 19, 21, 22, 24]$, uz $psum = [0, 14, 33, 54, 76, 100]$. Evo kako ispada provera na samom rešenju, za svaku od tri porudžbine:

| porudžbina $x$ | rešenje $h$ | `idx` | zbir njihovih visina | posečenih stabala | drveta |
|---|---|---|---|---|---|
| $14$ | $18$ | $1$ | $86$ | $4$ | $86 - 18 \cdot 4 = 14$ |
| $40$ | $12$ | $0$ | $100$ | $5$ | $100 - 12 \cdot 5 = 40$ |
| $1$ | $23$ | $4$ | $24$ | $1$ | $24 - 23 \cdot 1 = 1$ |

Pogledaj prvi red: `lower_bound` za $18$ staje na $19$, koje se nalazi na poziciji $1$, pa se seku četiri stabla, zajedno visoka $100 - 14 = 86$ metara. Od svakog ostaje po $18$ metara na panju, tako da pada $86 - 72 = 14$ metara drveta. Metar više i ta ista četiri stabla daju samo $10$ - zato je $18$ rešenje.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

// how much wood the saw set to h gives, in O(log n)
long long cut(vector<long long>& a, vector<long long>& psum, long long h){
    int idx = lower_bound(a.begin(), a.end(), h) - a.begin(); // first tree at least h tall
    long long total = psum[a.size()] - psum[idx];             // their full height
    return total - h * (long long)(a.size() - idx);           // only the part above h
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        int n, q;
        cin>>n>>q;

        vector<long long> a(n);
        for(int i=0;i<n;i++){
            cin>>a[i];
        }

        sort(a.begin(), a.end()); // lower_bound needs a sorted array

        vector<long long> psum(n+1, 0);
        for(int i=0;i<n;i++){
            psum[i+1] = psum[i] + a[i]; // psum[i] = sum of the first i heights
        }

        while(q--){

            long long x;
            cin>>x;

            long long low = 0, high = a[n-1], ans = 0;

            while(low <= high){

                long long mid = low + (high - low) / 2;

                if(cut(a, psum, mid) >= x){
                    ans = mid;      // enough wood - try to raise the saw
                    low = mid + 1;
                }else{
                    high = mid - 1;
                }
            }

            cout<<ans<<'\n';
        }
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(n \log n + q \log n \log H)$, gde je $H$ visina najvišeg drveta.
Memorijska složenost je $O(n)$.
