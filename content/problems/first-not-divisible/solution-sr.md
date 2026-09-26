
## Pristup

Prolazak kroz ceo niz za svaki delilac košta $O(n \cdot q)$ - presporo. Ključ je u garanciji: za svaki delilac niz izgleda kao

$$\underbrace{da, da, \ldots, da}_{deljivi}, \underbrace{ne, ne, \ldots, ne}_{nedeljivi}$$

pa je ceo odgovor jedan broj - **pozicija granice**.

Nalaženje granice u ovakvom da-ne nizu je posao za binarnu pretragu, samo malo drugačiju od traženja vrednosti: umesto da srednji element poredimo sa traženim, srednjem elementu postavljamo da-ne pitanje.

Drži dve granice, `left` i `right`, koje uvek znače: prvo "ne" se nalazi negde između njih. Kreni od $left = 0$ i $right = n$ - vrednost $n$ pokriva slučaj kada je **svaki** element deljiv, pa prvo "ne" i ne postoji.

Pogledaj srednju poziciju:

- ako $a_{middle}$ **jeste** deljiv, granica je strogo desno od njega: $left = middle + 1$;
- ako **nije**, prvo "ne" je na $middle$ ili pre njega: $right = middle$.

Kada se dve granice sretnu, `left` je pozicija prvog elementa koji nije deljiv - a to je tačno **broj deljivih elemenata**.

**Pažnja:** elementi su do $10^{18}$ i ne staju u `int` - čitaj ih u `long long`. Delioce takođe.

## Primer

Delilac $10$ na nizu iz postavke zadatka ($n = 13$):

`a = 210 2310 390 30 510 66 6 138 46 106 59 17 23`

| $left$ | $right$ | $middle$ | $a_{middle}$ | deljiv? | nove granice |
| ------ | ------- | -------- | ------------ | ------- | ------------ |
| $0$    | $13$    | $6$      | $6$          | ne      | $right = 6$  |
| $0$    | $6$     | $3$      | $30$         | **da**  | $left = 4$   |
| $4$    | $6$     | $5$      | $66$         | ne      | $right = 5$  |
| $4$    | $5$     | $4$      | $510$        | **da**  | $left = 5$   |

Sada je $left = right = 5$: prvi element koji nije deljiv sa $10$ je na poziciji $5$, pa je $5$ elemenata deljivo - prvi odgovor. Četiri pitanja umesto trinaest.

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

        vector<long long> a(n); // the values can be up to 10^18, they do not fit in an int
        for(int i = 0; i < n; i++) cin >> a[i];

        while(q--) {

            long long d;
            cin >> d;

            // find the first position where the element is not divisible by d
            int left = 0, right = n; // right = n: maybe every element is divisible

            while(left < right) {
                int middle = (left + right) / 2;
                if(a[middle] % d == 0) left = middle + 1; // the border is right of middle
                else right = middle;                      // middle is not divisible, the border is at middle or left of it
            }

            cout << left << "\n"; // left = number of divisible elements
        }
    }

    return 0;
}
```

## Složenost

Vremenska složenost je $O(q \log n)$.
Memorijska složenost je $O(n)$.
