
## Pristup

**Vektorski proizvod** odgovara tačno na ono što se u zadatku pita.

Za kuću $P$ napravimo dva vektora koji polaze iz $A$:

$$\vec{AB} = (B_x - A_x,\; B_y - A_y) \qquad \vec{AP} = (P_x - A_x,\; P_y - A_y)$$

i gledamo samo **znak** izraza

$$\vec{AB} \times \vec{AP} = (B_x - A_x)(P_y - A_y) - (B_y - A_y)(P_x - A_x)$$

- **pozitivan** - od $\vec{AB}$ do $\vec{AP}$ skrećemo suprotno od kazaljke na satu, znači $P$ je na levoj obali;
- **negativan** - skrećemo u smeru kazaljke na satu, znači $P$ je na desnoj obali;
- **nula** - vektori su paralelni, znači $P$ leži na samoj reci.


**Pažnja:** proizvod mora da se računa u tipu `long long`.

## Primer

Prvi test primer, reka ide kroz $A = (0,0)$ i $B = (4,4)$, pa je $\vec{AB} = (4, 4)$:

| kuća $P$ | $\vec{AP}$ | $\vec{AB} \times \vec{AP}$ | obala |
|---|---|---|---|
| $(0, 4)$ | $(0, 4)$ | $16$ | leva |
| $(1, 4)$ | $(1, 4)$ | $12$ | leva |
| $(4, 0)$ | $(4, 0)$ | $-16$ | desna |
| $(2, 2)$ | $(2, 2)$ | $\mathbf{0}$ | **na reci** |
| $(5, 1)$ | $(5, 1)$ | $-16$ | desna |
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

        long long ax, ay, bx, by;
        cin >> ax >> ay >> bx >> by;

        int cntLeft = 0, cntRight = 0, cntOn = 0;

        for(int i = 0; i < n; i++) {

            long long x, y;
            cin >> x >> y;

            // vektorski proizvod AB i AP - bitan je samo znak
            long long prod = (bx - ax) * (y - ay) - (by - ay) * (x - ax);

            if(prod > 0) cntLeft++;
            else if(prod < 0) cntRight++;
            else cntOn++;
        }

        cout << cntLeft << " " << cntRight << " " << cntOn << "\n";
    }

    return 0;
}
```

Kuće se nigde ne pamte - svaka se pročita, razvrsta i zaboravi.

## Složenost

Vremenska složenost je $O(n)$ po test primeru.
Memorijska složenost je $O(1)$.
