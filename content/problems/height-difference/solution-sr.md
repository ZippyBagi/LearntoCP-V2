
## Pristup

Provera svih parova je $O(n^2)$ - presporo. **Sortiraj** visine; parovi se ne menjaju, jer par određuju samo dve vrednosti u njemu.

Sada prođi kroz sortirane visine i kod svakog učenika se zapitaj: **koliko parova upotpunjuje baš ovaj učenik?** Učenik visine $a_j$ čini par sa svakim učenikom visine tačno $a_j - r$ - a u sortiranom nizu svi oni stoje **jedan do drugog**, u jednom bloku.

Drži po jedan pokazivač na svakom kraju tog bloka:

- `low` - prvi element koji nije premali (bar $a_j - r$);
- `high` - prvi element koji je preveliki (više od $a_j - r$).

Sve između njih je tačno $a_j - r$, pa učenik $j$ dodaje `high - low` parova.

Kako se $j$ pomera desno, visina koju tražimo samo raste - pa oba pokazivača idu isključivo napred i ceo posao završavamo u jednom prolazu, istim argumentom kao u zadatku [Broj parova datog zbira](/sr/Problems/pairs-with-given-sum).

Za ponovljene visine ne treba ništa posebno: ako tri učenika imaju visinu $a_j - r$, blok je širok $3$ i sva tri para su izbrojana. A pošto je $r \ge 1$, blok je strogo levo od $j$, pa niko ne čini par sam sa sobom.

**Pažnja:** rezultat eksplodira sa duplikatima: $10^5$ učenika jedne visine i $10^5$ učenika visine tačno $r$ veće daje $10^{10}$ parova - brojač drži u `long long`-u.

## Primer

Prvi test primer sortiran: $[13395, 15745, 15745, 16234, 18095]$, $r = 2350$:

| $a_j$ | traži se | blok $[low, high)$ | dodati parovi |
|---|---|---|---|
| $13395$ | $11045$ | prazan | $0$ |
| $15745$ | $13395$ | $[0, 1)$ | $1$ |
| $15745$ | $13395$ | $[0, 1)$ | $1$ |
| $16234$ | $13884$ | prazan | $0$ |
| $18095$ | $15745$ | $[1, 3)$ | **$2$** |

Pogledaj poslednji red: učeniku visine $18095$ treba par visine $15745$, a **dva** su učenika te visine - pozicije $1$ i $2$ - pa on dodaje dva para. Ukupno: $1 + 1 + 2 = 4$ - rezultat.

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
        long long r;
        cin >> n >> r;

        vector<long long> a(n);
        for(int i = 0; i < n; i++) cin >> a[i];

        sort(a.begin(), a.end());

        long long cnt = 0;
        int low = 0, high = 0; // both pointers only ever move forward

        for(int i = 0; i < n; i++) {
            while(a[low] < a[i] - r) low++;    // first element >= a[i] - r
            while(a[high] <= a[i] - r) high++; // first element > a[i] - r
            cnt += high - low;                 // elements equal to exactly a[i] - r
        }

        cout << cnt << "\n";
    }

    return 0;
}
```

## Složenost

Vremenska složenost je $O(n \log n)$.
Memorijska složenost je $O(n)$.
