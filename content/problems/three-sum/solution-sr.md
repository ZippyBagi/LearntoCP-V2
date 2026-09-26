
## Pristup

Isprobavanje svih trojki traje $O(n^3)$ - oko $2 \cdot 10^{10}$ provera za $n = 5000$, daleko presporo. Iskoristimo ono što već znamo o parovima.

Prvo **sortiraj** niz. Zatim fiksiraj **najmanjeg člana** ekipe, element $a_i$. Druga dva člana:

- moraju da dođu iz dela niza **desno od $i$**;
- moraju da imaju zbir tačno $-a_i$.

Taj unutrašnji zadatak je brojanje parova datog zbira u sortiranom nizu - klasičan prolaz sa dva pokazivača: `left` kreće odmah desno od $i$, `right` sa kraja, a zbir $a_i + a_{left} + a_{right}$ govori koji pokazivač da pomerimo.

Na pogodak smemo da izbrojimo par i pomerimo **oba** pokazivača, zato što su rejtinzi **međusobno različiti**: kada je $a_{left}$ deo nađenog para, njegov jedini mogući partner je $-a_i - a_{left}$, pa drugi par kroz $a_{left}$ ne postoji - isto važi za $a_{right}$.

Svaka ekipa je izbrojana tačno jednom, kod indeksa $i$ svog najmanjeg člana. Prolaz za jedno $i$ košta $O(n)$, pa je celo brojanje $O(n^2)$ - oko $2.5 \cdot 10^7$ koraka, sasvim dovoljno brzo.

**Pažnja:** tri rejtinga mogu da daju zbir do $3 \cdot 10^9$ po apsolutnoj vrednosti, što ne staje u `int`. Rejtinge drži u `long long`-u (ili konvertuj pre sabiranja).

## Primer

Primer sortiran: $[-8, -5, -3, -2, 1, 2, 4, 7, 9]$. Za svakog fiksiranog najmanjeg člana $a_i$ dva pokazivača nalaze:

| $a_i$ | nađeni parovi desno od njega | ekipe |
|---|---|---|
| $-8$ | $(1, 7)$ | $1$ |
| $-5$ | $(-2, 7)$, $(1, 4)$ | $2$ |
| $-3$ | $(1, 2)$ | $1$ |
| $-2, 1, 2, 4, 7, 9$ | nijedan | $0$ |

Pogledaj red broja $-5$: pokazivači pretražuju $[-3, -2, 1, 2, 4, 7, 9]$ tražeći zbir $5$ i pogađaju $-2 + 7$ i $1 + 4$. Ukupno $1 + 2 + 1 = 4$ ekipe - rezultat.

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

        vector<long long> a(n);
        for(int i = 0; i < n; i++) cin >> a[i];

        sort(a.begin(), a.end());

        long long cnt = 0;

        for(int i = 0; i < n; i++) {

            // count pairs to the right of i whose sum is -a[i]
            int left = i + 1, right = n - 1;

            while(left < right) {
                long long sum = a[i] + a[left] + a[right]; // up to 3 * 10^9, does not fit in an int
                if(sum == 0) {
                    cnt++;
                    left++;
                    right--;
                } else if(sum < 0) left++;
                else right--;
            }
        }

        cout << cnt << "\n";
    }

    return 0;
}
```

## Složenost

Vremenska složenost je $O(n^2)$.
Memorijska složenost je $O(n)$.
