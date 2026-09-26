
## Pristup

Da isprobavamo svaki segment posebno, trebalo bi nam $O(n^2)$ ili više - presporo. Dovoljan je jedan prolaz kroz niz.

Dok prolazimo, pamtimo `sum` - najveći zbir segmenta **koji se završava na trenutnom elementu**. Kad stigne novi element $x$, za segment koji se završava na $x$ postoje samo dve mogućnosti:

- nastavlja se na najbolji segment sa prethodnog elementa, **produžen** za $x$;
- ili počinje iznova - samo $x$.

Nastavljamo samo ako nam deo pre $x$ nešto donosi. Zato posle sabiranja proverimo `if(sum < x)` - ako je produženi zbir manji od samog $x$, stari deo nas samo vuče nadole, pa ga odbacimo i krenemo od $x$.

Rezultat je najveći `sum` koji se pojavio tokom prolaska - čuvamo ga u `best` i popravljamo posle svakog elementa.

`sum` uvek sadrži bar trenutni element, pa segment nikad nije prazan. Zato je odgovor tačan i kad su svi brojevi negativni: za $[-5, -2, -8]$ dobijamo $-2$, a ne $0$.

**Pažnja:** zbirovi ne staju u `int` - $2 \cdot 10^5$ elemenata od po $10^9$ daje $2 \cdot 10^{14}$. Zato su `sum` i `best` tipa `long long`.

(Primeti da nam ceo niz uopšte ne treba - svaki element iskoristimo čim ga pročitamo, pa nema vektora i memorija je $O(1)$. Ova ideja je poznata kao Kadanov algoritam (Kadane).)

## Primer

Prvi test primer, $[2, -3, 4, -1, 3, -2]$:

| $x$ | $2$ | $-3$ | $4$ | $-1$ | $3$ | $-2$ |
|---|---|---|---|---|---|---|
| `sum` | $2$ | $-1$ | $4$ | $3$ | **$6$** | $4$ |
| `best` | $2$ | $2$ | $4$ | $4$ | **$6$** | $6$ |

Pogledaj 4: produžavanje daje $-1 + 4 = 3$, a to je manje od samog $4$ - zato tu krećemo iznova. Onda ga $-1$ i $3$ produže do $4 - 1 + 3 = 6$, segment $[4, -1, 3]$ - rezultat.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        int n;
        cin>>n;

        long long x;
        cin>>x;

        long long sum = x;  // largest sum of a segment ending at the current element
        long long best = x; // largest sum seen so far

        for(int i=1;i<n;i++){
            cin>>x;
            sum += x;
            if(sum < x){ // the part before x only drags the sum down
                sum = x; // so start fresh from x alone
            }
            if(sum > best){
                best = sum;
            }
        }

        cout<<best<<'\n';
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(n)$.
Memorijska složenost je $O(1)$.
