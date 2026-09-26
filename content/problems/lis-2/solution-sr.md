
## Pristup

Klasičan $O(n^2)$ DP je ovde prespor ($n = 10^5$ daje oko $10^{10}$ operacija), pa nam treba pametnija ideja.

Umesto da pamtimo sve, pamtićemo samo jednu stvar po dužini: za svaku dužinu, **najmanju vrednost** kojom rastući podniz te dužine može da se završi.

Zašto najmanju? Zamisli dva rastuća podniza dužine 3, jedan se završava sa $8$, a drugi sa $4$. Onaj koji se završava sa $4$ je jednostavno lakše produžiti ($5, 6, 7...$ svi rade za njega, ali ne i za onaj drugi), pa onaj koji se završava sa $8$ možemo slobodno zaboraviti.

Ove vrednosti čuvamo u nizu `tails`, gde je `tails[i]` najmanja moguća završna vrednost rastućeg podniza dužine $i+1$ pronađenog do sada. Zatim prolazimo kroz ulaz, i za svaki novi element $x$ postoje samo dva slučaja:

- $x$ je veći od poslednjeg elementa niza `tails` - tada $x$ produžava naš najduži podniz i dodajemo ga na kraj.
- U suprotnom, $x$ ne može da napravi duži podniz, ali može biti **jeftiniji završetak** za neku postojeću dužinu: nalazimo prvi element niza `tails` koji je $\ge x$ i menjamo ga sa $x$.

Rešenje je jednostavno konačna dužina niza `tails`.

## Primer

Hajde da ovo primenimo na primer, $3\ 6\ 1\ 2\ 8\ 2\ 4\ 5$:

| Novi element | `tails` posle | Šta se desilo |
|:---:|:---|:---|
| $3$ | **3** | prvi element, podniz dužine 1 |
| $6$ | 3 **6** | veći od svega - produžava |
| $1$ | **1** 6 | menja 3: podniz dužine 1 sada može da se završi sa 1 |
| $2$ | 1 **2** | menja 6: podniz dužine 2 sada može da se završi sa 2 (naime $1, 2$) |
| $8$ | 1 2 **8** | veći od svega - produžava |
| $2$ | 1 **2** 8 | menja samog sebe - ništa se ne menja |
| $4$ | 1 2 **4** | menja 8: podniz dužine 3 sada može da se završi sa 4 |
| $5$ | 1 2 4 **5** | veći od svega - produžava |

`tails` ima 4 elementa, pa je rešenje $4$.

**Pažnja:** `tails` nije nužno stvarni podniz datog niza! Za ulaz $5\ 6\ 1$ on na kraju izgleda kao $1\ 6$, a $1, 6$ se nikad ne pojavljuje u tom redosledu. Svaki element samo odgovara na pitanje "koji je najjeftiniji završetak za ovu dužinu?" - ali **dužina** niza `tails` je uvek tačna, a to je sve što nam treba.

## Zašto je ovo brzo?

Primeti da je `tails` uvek **sortiran** (duži podniz ne može da se završi jeftinije od kraćeg - kraći je sadržan u njemu). To znači da korak "nađi prvi element $\ge x$" ne mora da proverava svaki element: može se uraditi **binarnom pretragom**, u $O(\log n)$.

U C++-u ova pretraga već postoji: `lower_bound(tails.begin(), tails.end(), x)` vraća poziciju prvog elementa $\ge x$ u sortiranom opsegu (ili kraj, ako takvog nema). Dakle, svaki od $n$ elemenata košta nas samo $O(\log n)$.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    iostream::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;

    vector<long long> a(n);
    for(int i = 0; i < n; i++){
        cin >> a[i];
    }

    // tails[i] = najmanja moguća završna vrednost rastućeg
    //            podniza dužine i+1
    vector<long long> tails;

    for(int i = 0; i < n; i++){

        // prvi element >= a[i]
        auto it = lower_bound(tails.begin(), tails.end(), a[i]);

        if(it == tails.end()){ // ako takav element ne postoji
            tails.push_back(a[i]); // a[i] produžava najduži podniz
        }else{
            *it = a[i]; // a[i] je jeftiniji završetak za tu dužinu, *it menja tails[tamo gde je it]
        }
    }

    cout << tails.size();
}
```

Pažnja: koristimo `lower_bound` (prvi element $\ge x$), a ne `upper_bound` (prvi element $> x$), zato što podniz mora biti **strogo** rastući - element jednak $x$ mora biti zamenjen, a ne produžen.

## Složenost

Vremenska složenost je $O(n \log n)$
Memorijska složenost je $O(n)$
