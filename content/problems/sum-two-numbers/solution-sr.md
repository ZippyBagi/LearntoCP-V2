Učitajte dva cela broja, saberite ih i ispišite rezultat.
## Pristup

Učitajte `a` i `b` sa standardnog ulaza, izračunajte `a + b` koristeći 32-bitni ceo broj i ispišite rezultat na standardni izlaz.

Nema potrebe za korišćenjem tipa long long, jer važi da je $10^9+10^9 < 2^{31}-1$ (maksimalna vrednost 32-bitnog int tipa).
## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b;
    return 0;
}
```

## Složenost

Vremenska složenost je $O(1)$, a memorijska složenost je $O(1)$.