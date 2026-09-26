
## Pristup

#### Ideja

Čim odlučimo **kojim redom stoje blokovi boja**, uredan red je potpuno određen - a s njim i najjeftiniji način da se do njega stigne, jer su klikeri iste boje međusobno zamenljivi i nikad ne moraju da se mimoilaze.

Znači, ceo zadatak je izbor redosleda boja. Njih ima najviše $20$, a $20!$ redosleda je beznadežno - ali $2^{20}$ **podskupova** nije. To je uobičajena zamena: red gradimo s leva na desno i pamtimo samo **koje su boje već postavljene**, a ne kako su međusobno raspoređene.

$$dp[mask] = \text{najmanje zamena da se tačno boje iz } mask \text{ dovedu na početak}$$

Krećemo od $dp[0] = 0$, a završavamo u $dp[\text{sve boje}]$.

#### Brojanje zamena

Zamene suseda broje se **inverzijama**: da bismo stigli do željenog reda, plaćamo po jednu zamenu za svaki par klikera kojima međusobni poredak mora da se obrne.

Uzmi dve boje $i$ i $j$ i pretpostavi da gotov red stavlja sve $j$ ispred svih $i$. Tada mora da se obrne svaki par u kom $i$ trenutno stoji levo od nekog $j$, a nijedan drugi par tih dveju boja. Njihov ukupan doprinos je zato jedan jedini broj, izračunat pre nego što dp uopšte krene:

$$cnt[i][j] = \text{parovi klikera kod kojih boja } i \text{ stoji negde pre boje } j$$

Tabelu puni jedan prolaz s leva na desno: čuvamo koliko je kog klikera do sada viđeno, pa kad naiđe kliker boje $c$, svaki raniji kliker boje $j$ pravi po jedan takav par.

Sada se prelaz piše sam. Dodavanje boje $c$ na već sagrađeni blok stavlja $c$ **iza** svih boja iz $mask$, pa svako od tih mimoilaženja plaćamo jednom:

$$dp[mask \cup \{c\}] \;\leftarrow\; dp[mask] + \sum_{j \in mask} cnt[c][j]$$

#### Granični slučajevi

**Boje kojih uopšte nema.** Red možda koristi samo $3$ od $20$ boja, a tabela nad svih $20$ bi onda imala $2^{20}$ polja za obilazak umesto $2^3$. Prenumerisanje boja koje se stvarno javljaju u $0 \dots k-1$ košta jedan prolaz i čini svaki mali ulaz jeftinim.

**Rešenje ne staje u `int`.** Pri $4 \cdot 10^5$ klikera broj parova ide do oko $4 \cdot 10^{10}$, pa su i `cnt`, i tabela, i rešenje `long long`.

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

        int n;
        cin>>n;

        vector<int> a(n);
        for(int i=0;i<n;i++){
            cin>>a[i];
            a[i]--;
        }

        // keep only the colours that actually occur, so the table is 2^k and not 2^20
        vector<int> id(20, -1);
        int k = 0;
        for(int i=0;i<n;i++){
            if(id[a[i]] == -1){
                id[a[i]] = k++;
            }
        }
        for(int i=0;i<n;i++){
            a[i] = id[a[i]];
        }

        // cnt[i][j] = pairs of marbles where colour i stands somewhere before colour j
        vector<vector<long long>> cnt(k, vector<long long>(k, 0));
        vector<long long> seen(k, 0);

        for(int i=0;i<n;i++){
            int c = a[i];
            for(int j=0;j<k;j++){
                cnt[j][c] += seen[j]; // every earlier marble of colour j pairs with this one
            }
            seen[c]++;
        }

        // dp[mask] = fewest swaps to put exactly the colours of mask at the front
        vector<long long> dp(1<<k, LLONG_MAX);
        dp[0] = 0;

        for(int mask=0;mask<(1<<k);mask++){

            if(dp[mask] == LLONG_MAX){
                continue;
            }

            for(int c=0;c<k;c++){

                if(mask & (1<<c)){ // colour c is already placed
                    continue;
                }

                long long add = 0;
                for(int j=0;j<k;j++){
                    if(mask & (1<<j)){
                        add += cnt[c][j]; // c must cross every c-before-j pair
                    }
                }

                int next = mask | (1<<c);
                dp[next] = min(dp[next], dp[mask] + add);
            }
        }

        cout<<dp[(1<<k)-1]<<'\n';
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(n \cdot k + 2^k \cdot k^2)$, gde je $k \le 20$ broj boja koje se javljaju.
Memorijska složenost je $O(2^k + k^2)$.
