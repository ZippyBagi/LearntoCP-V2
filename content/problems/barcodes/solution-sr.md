
## Pristup

Za svaki proizvođačev bar-kod treba odgovoriti na jedno pitanje: **da li je na spisku prodavnice?** Linearna pretraga košta $O(n)$ po bar-kodu, dakle ukupno $O(n \cdot q)$ - do $4 \cdot 10^{10}$ poređenja.

Ali spisak prodavnice je **već sortiran**, a pretraga sortiranog niza je posao za binarnu pretragu.

Za svaki od $q$ bar-kodova pokreni pretragu iz lekcije o binarnoj pretrazi:

- uporedi bar-kod sa srednjim elementom;
- odbaci polovinu koja ne može da ga sadrži;
- ponavljaj dok element ne bude nađen ili se granice ne mimoiđu.

Svaka pretraga košta $O(\log n)$ - za $n = 2 \cdot 10^5$ to je $18$ poređenja umesto $200000$.

Broji uspešne pretrage.
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

        int n, q;
        cin >> n >> q;

        vector<int> a(n);
        for(int i = 0; i < n; i++) cin >> a[i]; // already sorted

        int cnt = 0;

        while(q--) {

            int k;
            cin >> k;

            int left = 0, right = n - 1;
            bool found = false;

            while(left <= right) {
                int middle = (left + right) / 2;
                if(a[middle] == k) {
                    found = true;
                    break;
                } else if(k > a[middle]) left = middle + 1; // no value left of middle can be k
                else right = middle - 1;                    // no value right of middle can be k
            }

            if(found) cnt++;
        }

        cout << cnt << "\n";
    }

    return 0;
}
```

## Složenost

Vremenska složenost je $O(q \log n)$.
Memorijska složenost je $O(n)$.
