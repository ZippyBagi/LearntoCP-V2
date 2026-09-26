
## Pristup

Svetiljka obasjava sve u opsegu dužine $2d$: od $d$ levo do $d$ desno od sebe. Obrni pitanje:

- jedna svetiljka može da obasja **grupu kuća** tačno kada su krajnja leva i krajnja desna kuća u grupi udaljene najviše $2d$ (svetiljku stavimo na sredinu);
- dakle, tražimo najviše kuća koje staju u **prozor dužine $2d$**.

Kada koordinate sortiramo, najbolja grupa su uvek uzastopne kuće - zato prvo **sortiraj** koordinate.

Sada pusti dva pokazivača kroz sortirane koordinate, oba idu samo napred:

- `right` proširuje prozor sledećom kućom;
- `left` ga skraćuje otpozadi dok je prozor preširok, to jest dok je $x_{right} - x_{left} > 2d$.

Posle skraćivanja prozor $[left, right]$ ponovo staje pod jednu svetiljku, pa je njegova veličina `right - left + 1` kandidat za rezultat.

Svaki pokazivač napravi najviše $n$ koraka, pa je prolaz $O(n)$ - posle sortiranja od $O(n \log n)$. I ništa nismo preskočili: za svako `right` smo našli najširi dobar prozor koji se tu završava.

## Primer

Prvi test primer sortiran: $[-68, -11, -4, 13, 15, 29]$, dužina prozora $2d = 26$:

| $x_{right}$ | prozor počinje od | veličina |
|---|---|---|
| $-68$ | $-68$ | $1$ |
| $-11$ | $-11$ | $1$ |
| $-4$ | $-11$ | $2$ |
| $13$ | $-11$ | $3$ |
| $15$ | $-11$ | **$4$** |
| $29$ | $13$ | $3$ |

Pogledaj red broja $15$: prozor $[-11, 15]$ ima raspon $26 \le 26$, četiri kuće - rezultat. Već kod sledeće kuće, $29$, raspon do $-11$ je $40$, pa `left` skače na $13$ i ostaju samo tri kuće.

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

        int n, d;
        cin >> n >> d;

        vector<int> x(n); // coordinates within +-10^9, and 2*d up to 2*10^9, both fit in an int
        for(int i = 0; i < n; i++) cin >> x[i];

        sort(x.begin(), x.end());

        int best = 0, left = 0;

        for(int right = 0; right < n; right++) {
            while(x[right] - x[left] > 2 * d) left++; // shrink the window until it fits under one lamp
            best = max(best, right - left + 1);
        }

        cout << best << "\n";
    }

    return 0;
}
```

## Složenost

Vremenska složenost je $O(n \log n)$.
Memorijska složenost je $O(n)$.
