
## Pristup

Sabiranje perioda dan po dan košta $O(n)$ po pitanju, pa $m$ pitanja košta $O(n \cdot m)$ - do $4 \cdot 10^{10}$ sabiranja. Potreban nam je svaki odgovor u konstantnom vremenu, a upravo to daju prefiksni zbirovi.

Neka je $pref_i$ ukupna zarada **prvih $i$ dana** (dakle $pref_0 = 0$, a $pref_n$ je sve). Prefiksne zbirove gradimo u jednom prolazu dok čitamo: $pref_{i+1} = pref_i + a_i$.

Zarada od dana $a$ do dana $b$ je zarada prvih $b + 1$ dana od koje je oduzeta zarada prvih $a$ dana:

$$pref_{b+1} - pref_a$$

Jedno oduzimanje po pitanju, ma koliko period bio dug.

**Pažnja:** indeksi su pomereni za jedan - $pref_{b+1}$, ne $pref_b$ - jer dan $b$ mora biti **uključen**. Proveri na periodu od jednog dana: za $a = b = 2$ formula daje $pref_3 - pref_2$, tačno dan $2$.

**Pažnja:** ukupna zarada može da dostigne $2 \cdot 10^5 \cdot 10^9 = 2 \cdot 10^{14}$, što ne staje u `int` - prefiksne zbirove drži u `long long`-u.

## Primer

Niz $[1, 2, 3, 4, 5]$ daje prefiksne zbirove:

| $i$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ |
|---|---|---|---|---|---|---|
| $pref_i$ | $0$ | $1$ | $3$ | $6$ | $10$ | $15$ |

Tri pitanja: $(0, 4)$ daje $pref_5 - pref_0 = 15 - 0 = 15$, $(1, 3)$ daje $pref_4 - pref_1 = 10 - 1 = 9$, a $(2, 2)$ daje $pref_3 - pref_2 = 6 - 3 = 3$ - sva tri odgovora iz postavke.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    iostream::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;

    while(t--) {

        int n;
        cin >> n;

        vector<long long> pref(n + 1, 0); // pref[i] = sum of the first i elements

        for(int i = 0; i < n; i++) {
            long long x;
            cin >> x;
            pref[i + 1] = pref[i] + x;
        }

        int m;
        cin >> m;

        while(m--) {
            int a, b;
            cin >> a >> b;
            cout << pref[b + 1] - pref[a] << "\n"; // sum of elements a..b
        }
    }

    return 0;
}
```

## Složenost

Vremenska složenost je $O(n + m)$.
Memorijska složenost je $O(n)$.
