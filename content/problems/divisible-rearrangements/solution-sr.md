
## Pristup

#### Ideja

Redosled cifara broja $n$ biramo sami, a cifara može biti i $18$ - previše redosleda da bismo ih obišli jedan po jedan.

Spasava nas to što nam nijedan konkretan redosled zapravo ne treba, već samo koliko ih je ispravnih. Zato broj gradimo s leva na desno i o dotadašnjem početku pamtimo taman toliko koliko nam treba da nastavimo: **koje je cifre potrošio**, kao bitmasku, i **koji ostatak daje pri deljenju sa $m$**.

Potrebno nam je i jedno i drugo, jer sami za sebe ne govore dovoljno. Maska ne može da kaže da li će gotov broj biti deljiv, a ostatak ne može da kaže koje su cifre još slobodne. Zato je tabela dvodimenzionalna:

$$dp[mask][rem] = \text{broj početaka koji koriste tačno cifre iz } mask \text{ i daju ostatak } rem$$

Za $18$ cifara i $m \le 100$ to je $2^{18} \cdot 100$ polja, pa tabelu pravimo onoliku koliku konkretan ulaz zahteva, a ne uvek najveću moguću.

#### Ostatak

Kada broju $x$ dopišemo cifru $d$, on postaje $10x + d$.

Sam $x$ ne možemo da čuvamo - ide do $10^{18}$ - ali to nam nije ni potrebno, jer ostatak broja $10x + d$ ne zavisi ni od čega osim od ostatka broja $x$:

$$rem_{novi} = (rem \cdot 10 + d) \bmod m$$

Upravo zato druga dimenzija ostaje mala: umesto $10^{18}$ mogućih početaka pamtimo jedan od najviše $100$ ostataka.

Krećemo od $dp[0][0] = 1$ - prazan početak nije potrošio nijednu cifru, a njegova vrednost $0$ daje ostatak $0$ - a rešenje nas čeka u $dp[\text{sve cifre potrošene}][0]$.

#### Granični slučajevi

Dva pravila dele ovo rešenje od pogrešnog rezultata.

**Nijedan broj ne sme da počne nulom.** Maska jednaka $0$ znači da biramo prvu cifru, a nuli tu nije mesto:

~!
```cpp
if(mask == 0 && a[i] == '0') continue;
```

**Isti broj ne sme da se prebroji dvaput.** Jednake cifre su međusobno zamenljive - $223$ ima dve dvojke, pa njihova zamena vodi drugim putem kroz tabelu, a sastavlja potpuno isti broj.

Zato cifre prvo sortiramo, čime jednake dolaze jedna do druge, pa jednaku cifru postavljamo tek **posle** njenog levog suseda:

~!
```cpp
if(i > 0 && a[i] == a[i-1] && !(mask & (1<<(i-1)))) continue;
```

Tako se svakoj grupi jednakih cifara nameće jedan jedini redosled, pa do svakog različitog broja stižemo tačno jednom. Sortiranje je ono što ovoj proveri daje smisao - bez njega su jednake cifre razbacane, pa nam `a[i-1]` o njima ne govori ništa.

## Kod


solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    cin.tie(0);
    iostream::sync_with_stdio(false);

    int t;
    cin>>t;

    while(t--){

        long long a1, m;
        cin>>a1>>m;

        string a = to_string(a1);
        sort(a.begin(), a.end()); // equal digits end up next to each other
        int n = a.size();

        // dp[mask][rem] = how many arrangements of exactly the digits in mask
        // leave remainder rem. Sized to this input, not to the worst case.
        vector<vector<long long>> dp(1<<n, vector<long long>(m, 0));
        dp[0][0] = 1;

        for(int mask=0;mask<(1<<n);mask++){
            for(int rem=0;rem<m;rem++){

                if(dp[mask][rem] == 0){
                    continue;
                }

                for(int i=0;i<n;i++){

                    if((mask>>i) & 1){ // digit i is already placed
                        continue;
                    }
                    if(mask == 0 && a[i] == '0'){ // nothing may start with a zero
                        continue;
                    }
                    if(i > 0 && a[i] == a[i-1] && !(mask & (1<<(i-1)))){ // equal digits are placed left to right
                        continue;
                    }

                    int next = mask | (1<<i);
                    int next_rem = (rem * 10 + (a[i] - '0')) % m;

                    dp[next][next_rem] += dp[mask][rem];
                }
            }
        }

        cout<<dp[(1<<n)-1][0]<<'\n';
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(2^D \cdot m \cdot D)$, gde je $D \le 18$ broj cifara.
Memorijska složenost je $O(2^D \cdot m)$.
