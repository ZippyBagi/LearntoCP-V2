
## Pristup

#### Ideja

Fiksirajmo $l$ pa pomerajmo $r$ udesno. Svaki novi element ulazi u tekuću vrednost preko AND-a, a AND bitove može samo da **gasi** - nikada da ih vrati. Zato $f(l, r)$ ne može da poraste kako $r$ ide dalje.

U tome je i cela poenta zadatka. Pozicije za koje važi $f(l, r) \ge k$ čine jedan neprekidan blok koji počinje u $l$: kada vrednost jednom padne ispod $k$, više ne može da se digne, pa je rešenje poslednja pozicija tog bloka - a nju nalazi **binarna pretraga**.

Binarnoj pretrazi treba $f(l, mid)$ za proizvoljno $mid$, i to brzo. Niz se između pitanja ne menja, a to je upravo situacija za sparse tabelu - sagradimo je jednom, pa na svaki opseg odgovaramo u $O(1)$.

#### Zašto AND radi u sparse tabeli

Sparse tabela pokriva opseg pomoću **dva bloka koja se preklapaju**, oba dužine $2^j$: jedan je prislonjen uz levi kraj, drugi uz desni. Za zbir bi to bilo pogrešno, jer bi se presek sabrao dvaput.

AND-u to ne smeta. On je **idempotentan** - $x \mathbin{\&} x = x$ - pa element uračunat dvaput donosi tačno isto što i uračunat jednom, te preklapanje ništa ne kvari:

~!
```cpp
int len = R - L + 1;
int k = power_of_two(len);            // najveće j za koje je 2^j <= len
return lookup[L][k] & lookup[R - (1<<k) + 1][k];
```

Isto svojstvo imaju i min i max, i baš zato se njih troje i sreće uz sparse tabele, a zbirovi ne.

Gradnja košta $O(n \log n)$, svaki opseg $O(1)$, a svako pitanje je binarna pretraga preko $\log n$ opsega - dakle ukupno $O(n \log n + q \log n)$.

#### Granični slučajevi

**Nijedna pozicija ne prolazi.** Ako je već i samo $a_l$ manje od $k$, onda je manji i svaki duži segment, pa je rešenje $-1$. Ako pretragu započnemo sa `ans = -1` i u njega upisujemo samo kada provera prođe, ovaj slučaj se rešava sam od sebe.

**Rešenje je indeks, a ne vrednost.** Pretraga radi nad pozicijama koje se broje od $0$, dok ulaz i izlaz broje od $1$, pa pri čitanju oduzimamo jedinicu, a pri ispisu je vraćamo - osim kod $-1$, koje se ispisuje takvo kakvo jeste.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

// the largest k with 2^k <= a
long long power_of_two(long long a){

    long long k = 0;

    while((1LL<<(k+1)) <= a){
        k++;
    }

    return k;
}

// the AND of the range [L, R], read off two blocks of length 2^k.
// They overlap when the length is not a power of two, which is fine - AND does
// not mind seeing the same element twice.
int query(vector<vector<int>>& lookup, int L, int R){

    int len = R - L + 1;
    int k = power_of_two(len);

    return lookup[L][k] & lookup[R - (1<<k) + 1][k];
}

int main(){

    cin.tie(0);
    iostream::sync_with_stdio(false);

    int t;
    cin>>t;

    while(t--){

        int n;
        cin>>n;

        int levels = 1;
        while((1<<levels) <= n){
            levels++;
        }

        vector<vector<int>> lookup(n+1, vector<int>(levels, 0));

        for(int i=0;i<n;i++){
            cin>>lookup[i][0]; // level 0 is the array itself
        }

        for(int j=1;j<levels;j++){
            for(int i=0;i + (1<<j) <= n;i++){
                lookup[i][j] = lookup[i][j-1] & lookup[i + (1<<(j-1))][j-1];
            }
        }

        int q;
        cin>>q;

        while(q--){

            int start, k;
            cin>>start>>k;

            start--; // the input counts positions from 1

            int l = start;
            int r = n - 1;
            int ans = -1;

            while(l <= r){

                int mid = l + (r - l) / 2;

                if(query(lookup, start, mid) >= k){
                    ans = mid;     // this far still holds, try further right
                    l = mid + 1;
                }else{
                    r = mid - 1;
                }
            }

            cout<<(ans == -1 ? -1 : ans + 1);
            cout<<(q > 0 ? ' ' : '\n'); // q is how many questions are left
        }
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(n \log n + q \log^2 n)$ - dodatni $\log$ dolazi od funkcije `power_of_two`, koja u svakom opsegu iznova računa veličinu bloka.
Memorijska složenost je $O(n \log n)$.
