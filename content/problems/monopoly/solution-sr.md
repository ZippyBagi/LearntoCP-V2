
## Pristup

Tabla je **krug** od $n$ polja, pa igrač koji je prešao $a$ polja stoji na polju $a \bmod n$ - svaki pun krug od $n$ polja ga vraća tamo gde je bio, bitan je samo **ostatak**. Ovo je tačno obrazac iz lekcije o modulu: pozicije se ponavljaju $0, 1, \dots, n-1, 0, 1, \dots$

Zato prvo zameni $a$ i $b$ stvarnim pozicijama: `a = a % n` i `b = b % n`. Sada su oba polja između $0$ i $n-1$ i postoje samo dva slučaja:

- ako je $b \ge a$, drugi igrač je ispred u istom krugu, pa je odgovor $b - a$;
- ako je $b < a$, prvi igrač mora da prođe pored polja $0$: $n - a$ koraka do $0$, pa još $b$, dakle odgovor je $n - a + b$.

**Pažnja:** u prvom slučaju mora $\ge$, ne $>$. Kada oba igrača stoje na istom polju ($b = a$) odgovor je $0$ koraka - druga grana bi pogrešno poslala prvog igrača u pun krug od $n$ koraka.

## Primer

| $n$ | $a$ | $b$ | $a \ \% \ n$ | $b \ \% \ n$ | slučaj | odgovor |
|-----|-----|-----|--------------|--------------|--------|---------|
| $10$ | $3$ | $7$ | $3$ | $7$ | $b \ge a$ | $7 - 3 = $ **$4$** |
| $10$ | $7$ | $3$ | $7$ | $3$ | $b < a$ | $10 - 7 + 3 = $ **$6$** |

Prvi red je lakši slučaj: polje $7$ je ispred polja $3$. Drugi red obilazi krug: $3$ koraka od polja $7$ do polja $0$, pa još $3$ - kretanje $6$ polja unapred sa polja $7$ zaista se završava na polju $3$.

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

        int n, a, b;
        cin >> n >> a >> b;

        a = a % n; // position of the first player
        b = b % n; // position of the second player

        if(b >= a) cout << b - a << "\n";
        else cout << n - a + b << "\n"; // wrap past field 0
    }

    return 0;
}
```

## Složenost

Vremenska složenost je $O(t)$.
Memorijska složenost je $O(1)$.
