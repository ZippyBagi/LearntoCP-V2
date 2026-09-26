
## Pristup

Provera svakog para su dve ugnežđene petlje, $O(n^2)$ - pri $n = 10^5$ to je $5 \cdot 10^9$ poređenja, mnogo presporo. Parove moramo da izbrojimo a da ih nikad ne pogledamo pojedinačno.

Presecimo niz na pola. Svaka inverzija je onda tačno jedne od tri vrste:

- obe pozicije su u **levoj** polovini,
- obe su u **desnoj**,
- po jedna u svakoj - par koji **prelazi** granicu.

Prve dve vrste su isti zadatak nad kraćim nizom, pa se njima bavi rekurzija. Sav posao je u brojanju parova preko granice, i tu nam merge sort izlazi u susret: ako usput sortiramo obe polovine, ti parovi se izbroje u jednom prolazu.

### Brojanje preko granice, tokom objedinjavanja

Neka su obe polovine već sortirane i neka ih objedinjujemo, `i` šeta levom a `j` desnom. U svakom koraku poredimo `a[i]` i `a[j]`:

- `a[i] <= a[j]` - uzimamo sleva. Nema inverzije: levi element ionako stoji ranije, a nije veći.
- `a[i] > a[j]` - uzimamo zdesna, i to **jeste** inverzija. Ali ne jedna: leva polovina je sortirana, pa je sve od `i` do njenog kraja $\ge$ `a[i]`, a time i veće od `a[j]`. Svi ti elementi stoje na ranijim pozicijama od `a[j]`. To je `mid - i` inverzija, izbrojanih u jednom potezu.

Sortiranje polovina ništa ne kvari, jer premeštanje unutar jedne polovine ne menja koliko je njenih elemenata veće od nekog elementa one druge.

Znači, algoritam je merge sort sa jednom dodatnom linijom. Ista rekurzija, isto objedinjavanje, plus `inversions += mid - i` u grani koja uzima zdesna.

**Pažnja:** rezultat ume da naraste do $\frac{n(n-1)}{2} \approx 5 \cdot 10^9$ za obrnuto sortiran niz od $10^5$ elemenata - daleko van opsega tipa `int`. Brojač mora biti `long long`.

## Primer

Prvi niz je $[3, 1, 4, 2, 5]$. Merge sort ga cepa na $[3, 1]$ i $[4, 2, 5]$, pa se dešavaju ova četiri objedinjavanja, ovim redom:

| leva polovina | desna polovina | objedinjeno | izbrojano preko granice |
|---|---|---|---|
| $3$ | $1$ | $1\ 3$ | $1$ |
| $2$ | $5$ | $2\ 5$ | $0$ |
| $4$ | $2\ 5$ | $2\ 4\ 5$ | $1$ |
| $1\ 3$ | $2\ 4\ 5$ | $1\ 2\ 3\ 4\ 5$ | $1$ |

Pogledaj poslednji red: uzmemo $1$ sleva, pa $2$ zdesna dok $3$ još čeka u levoj polovini - jedan prelaz preko granice, par $(3, 2)$. Ostatak objedinjavanja ide redom. Kad se kolona sabere, dobija se $1 + 0 + 1 + 1 = 3$, koliko i treba.

Primeti da su ta četiri reda našla tri inverzije na tri različita mesta: $(3, 1)$ u prvom objedinjavanju, $(4, 2)$ u trećem, $(3, 2)$ u četvrtom. Svaki par se prebroji tačno jednom, u onom objedinjavanju u kom se njegova dva elementa prvi put nađu u istoj polovini.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

// sorts a[left..right) and returns how many inversions live inside it
long long sortCount(int left, int right, vector<int>& a, vector<int>& tmp){

    if(right - left < 2){
        return 0; // a single element cannot be inverted with anything
    }

    int mid = left + (right - left) / 2;

    long long inversions = sortCount(left, mid,a,tmp) + sortCount(mid, right,a,tmp);

    int i = left, j = mid, k = left;

    while(i < mid && j < right){
        if(a[i] <= a[j]){
            tmp[k] = a[i]; // not an inversion - equal counts as not inverted
            i++;
        }else{
            tmp[k] = a[j];
            j++;
            inversions += mid - i; // a[j] jumps over the whole rest of the left half
        }
        k++;
    }

    while(i < mid){ tmp[k] = a[i]; i++; k++; }
    while(j < right){ tmp[k] = a[j]; j++; k++; }

    for(int p=left;p<right;p++){
        a[p] = tmp[p];
    }

    return inversions;
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        int n;
        cin>>n;

        vector<int> a = vector<int>(n);
        vector<int> tmp = vector<int>(n); // scratch space the merge writes into
        for(int i=0;i<n;i++){
            cin>>a[i];
        }

        cout<<sortCount(0, n,a,tmp)<<'\n';
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(n \log n)$.
Memorijska složenost je $O(n)$.

## Bonus: ono drugo poznato rešenje

Postoji i drugi uobičajen način da se izbroje inverzije, preko **Fenvikovog stabla** (poznatog i kao binarno indeksirano stablo). Upoznaćemo se sa njim u budućoj lekciji, gde se baš ovaj zadatak i vraća, kao [Broj inverzija II](/sr/Problems/inversions-2).