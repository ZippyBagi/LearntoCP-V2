
## Pristup

Isto brojanje, samo sa druge strane. Umesto da niz cepamo na pola, prošetamo ga **sleva nadesno** i za svaki element postavimo jedno pitanje:

> koliko je elemenata koji su već iza mene veće od ovog?

Svaki takav element pravi inverziju sa tekućim, a svaka inverzija se prebroji tačno jednom - u trenutku kad se stigne do njenog **kasnijeg** elementa. Kad se ti brojevi saberu, dobija se rešenje.

Treba nam, dakle, vreća do sada viđenih vrednosti koja ume brzo da odgovori na "koliko vas je veće od $v$". To je posao za Fenvikovo stablo indeksirano **po vrednosti**. Ali pre nego što se bilo šta indeksira po vrednosti, vrednosti moraju da budu male - a naše nisu.

### Kompresija koordinata

Stablu indeksiranom po vrednosti treba po jedno mesto za svaku vrednost koja se uopšte može pojaviti. Naše idu od $-10^9$ do $10^9$, što je $2 \cdot 10^9$ mesta - više memorije nego što imamo, a i sama izgradnja bi trajala duže od celog vremenskog ograničenja.

Ali niz od $10^5$ elemenata sadrži najviše $10^5$ različitih vrednosti, a za inverzije je bitan **samo poredak**: da li je $a_i > a_j$ se ne menja ako svaku vrednost zamenimo njenim mestom u sortiranom spisku različitih vrednosti. To mesto se zove **redni broj** vrednosti, a posle zamene su vrednosti $1 \dots N$, gde je $N \le n$ - dovoljno male da indeksiraju stablo.

Niz $[70, -5, 1000, 0, 10^9]$ ima različite sortirane vrednosti $[-5, 0, 70, 1000, 10^9]$, pa se sabija na $[3, 1, 4, 2, 5]$ - a to je primer iz postavke, i ima iste tri inverzije. Ogromni brojevi nikad nisu ni radili nikakav posao.

~!
```cpp
vector<int> sorted = a;
sort(sorted.begin(), sorted.end());
sorted.erase(unique(sorted.begin(), sorted.end()), sorted.end()); // drop duplicates
int v = lower_bound(sorted.begin(), sorted.end(), a[i]) - sorted.begin() + 1; // rank of a[i]
```

`unique` zapravo ne skraćuje vektor - gura duplikate na kraj i vraća mesto na kom se završava deo koji vredi zadržati, pa ih tek `erase` posle njega uklanja. To dvoje uvek idu zajedno. `lower_bound` zatim nalazi mesto vrednosti u tom spisku, a $+1$ pomera redne brojeve da kreću od $1$, jer Fenvikovo stablo ne može da koristi indeks $0$.

**Pažnja:** duplikati moraju napolje. Jednake vrednosti moraju da dobiju **jednake** redne brojeve - da smo ih delili po pozicijama, dva jednaka elementa bi se na kraju poredila kao inverzija.

### Brojanje u hodu

Sada stablo drži jedinicu na rednom broju svakog do sada viđenog elementa, a `countUpTo(v)` - `prefixSum` iz lekcije - kaže koliko ih je $\le v$. Ako je viđeno $i$ elemenata, onih većih od $a_i$ ima

$$i - countUpTo(a_i)$$

Zatim ubacimo $a_i$ u stablo i idemo dalje. Dve operacije po $O(\log n)$ za svaki element, dakle $O(n \log n)$ ukupno - isto kao merge sort, ali sa drugom slikom iza toga.

**Pažnja:** brojimo elemente $\le a_i$ pa oduzimamo, umesto da brojimo one $< a_i$ i to iskoristimo. Brojanje $< a_i$ bi jednake vrednosti tretiralo kao inverzije, a za inverziju je potrebno da je $a_i > a_j$ **strogo**.

**Pažnja:** rešenje dostiže $\frac{n(n-1)}{2} \approx 5 \cdot 10^9$ za obrnuto sortiran niz od $10^5$ elemenata, daleko van opsega tipa `int`. Brojač je `long long`.

Primeti i da ovo stablo samo dodaje jedinicu na poziciju, pa nam ne trebaju ni niz `elements` ni `delta` iz lekcije - nema stare vrednosti koju bi trebalo oduzeti.

## Primer

Šetnja kroz $[3, 1, 4, 2, 5]$, gde "viđeno" znači elemente strogo levo:

| $a_i$ | redni broj | viđeno do sada | od toga $\le a_i$ | većih, dakle novih inverzija | ukupno |
|---|---|---|---|---|---|
| $3$ | $3$ | $0$ | $0$ | $0$ | $0$ |
| $1$ | $1$ | $1$ | $0$ | $1$ | $1$ |
| $4$ | $4$ | $2$ | $2$ | $0$ | $1$ |
| $2$ | $2$ | $3$ | $1$ | $2$ | $3$ |
| $5$ | $5$ | $4$ | $4$ | $0$ | $3$ |

Proveri red za $2$: iza njega su tri elementa - $3$, $1$ i $4$ - a samo $1$ nije veći, pa je to $3 - 1 = 2$ nove inverzije, parovi $(3, 2)$ i $(4, 2)$. Petica na kraju je veća od svega iza sebe i ne dodaje ništa, i zato se ukupan zbir zaustavlja na $3$.

Uporedi ovo sa [rešenjem preko merge sorta](/sr/Problems/inversions): tamo su iste te tri inverzije nađene u tri različita objedinjavanja, svaka onda kad su joj se dva elementa prvi put našla u istoj polovini. Ovde se svaka nalazi kod svog kasnijeg elementa. Isti zbir, samo prebrojan drugim redom.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int N;             // how many distinct values there are
vector<int> tree;  // counting Fenwick tree, indexed by value

// one more copy of value i has been seen
void addValue(int i){
    for(; i <= N; i += i & -i){
        tree[i]++;
    }
}

// how many of the seen values are <= i
long long countUpTo(int i){
    long long c = 0;
    for(; i > 0; i -= i & -i){
        c += tree[i];
    }
    return c;
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        int n;
        cin>>n;

        vector<int> a(n);
        for(int i=0;i<n;i++){
            cin>>a[i];
        }

        // coordinate compression - the tree is indexed by value, and the values
        // themselves go up to 10^9, but there are only n of them
        vector<int> sorted = a;
        sort(sorted.begin(), sorted.end());
        sorted.erase(unique(sorted.begin(), sorted.end()), sorted.end());
        N = sorted.size();

        tree = vector<int>(N + 1, 0); // a fresh tree for every testcase

        long long inversions = 0;

        for(int i=0;i<n;i++){

            int v = lower_bound(sorted.begin(), sorted.end(), a[i]) - sorted.begin() + 1; // rank, 1..N

            inversions += i - countUpTo(v); // i elements seen so far, minus those <= a[i]

            addValue(v);
        }

        cout<<inversions<<'\n';
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(n \log n)$.
Memorijska složenost je $O(n)$.
