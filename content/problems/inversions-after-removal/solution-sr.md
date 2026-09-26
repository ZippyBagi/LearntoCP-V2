
## Pristup

Parova $(l, r)$ ima oko $\frac{n^2}{2}$, a brojanje inverzija jednog $b$ samo po sebi traje $O(n \log n)$, pa je proba jednog po jednog beznadežna. Moramo nešto da kažemo o tome kako se broj inverzija ponaša dok se $l$ i $r$ pomeraju.

### Rastavljanje na tri dela

Niz $b$ je **prefiks** $a_1 \dots a_l$ zalepljen na **sufiks** $a_r \dots a_n$. Zato svaka inverzija niza $b$ pada u tačno jednu od tri grupe:

- obe pozicije unutar prefiksa - nazovimo to $P(l)$, i ne zavisi od $r$;
- obe pozicije unutar sufiksa - nazovimo to $S(r)$, i ne zavisi od $l$;
- po jedna pozicija u svakom - nazovimo to $C(l, r)$, parovi $i \le l$, $j \ge r$ za koje je $a_i > a_j$.

$$inv(l, r) = P(l) + S(r) + C(l, r)$$

### Zašto parovi koji prolaze čine rep

Fiksiraj $l$ i gurni $r$ za jedno mesto udesno. Sufiks gubi svoj prvi element, pa $S$ može samo da opadne i $C$ može samo da opadne, dok se $P$ uopšte ne miče. **Izbacivanje viška nikad ne može da stvori inverziju** - dakle $inv(l, r)$ ne raste sa $r$, pa su za svako $l$ dobre vrednosti $r$ sve od nekog praga $R(l)$ do $n$. To je $n - R(l) + 1$ parova, prebrojanih bez i jednog pogleda na njih.

Sad fiksiraj $r$ i gurni $l$ za jedno mesto udesno. Prefiks dobija element, pa $P$ može samo da poraste i $C$ može samo da poraste. Znači $inv$ ne opada sa $l$, što znači da ni $R(l)$ ne opada: **prag se nikad ne vraća unazad**. Jedan pokazivač šeta $l$ unapred, drugi šeta $r$ unapred, i svaki ukupno napravi najviše $n$ koraka.

### Održavanje ta tri broja

Pokazivači pomažu samo ako je jedan korak jeftin, a svaki korak postavlja pitanje brojanja: koliko je elemenata koje trenutno držim veće, odnosno manje, od ovog. Na to odgovara Fenvikovo stablo indeksirano **po vrednosti**. Držimo dva takva:

- `pref` - elementi koji su trenutno u prefiksu, $a_1 \dots a_l$;
- `suff` - elementi koji su trenutno u sufiksu, $a_r \dots a_n$.

Svako čuva jedinicu na poziciji svake vrednosti koju drži, pa je `bitSum(t, v)` broj držanih vrednosti $\le v$. Odatle je broj onih većih od $v$ jednak `bitSum(t, N) - bitSum(t, v)`, a broj manjih `bitSum(t, v - 1)`.

Kad $a_l$ uđe u prefiks:

- $P$ poraste za broj elemenata prefiksa većih od $a_l$ - svaki od njih stoji ranije a veći je;
- $C$ poraste za broj elemenata sufiksa manjih od $a_l$ - svaki od njih stoji kasnije a manji je.

Kad $a_r$ izađe iz sufiksa:

- $S$ padne za broj preostalih elemenata sufiksa manjih od $a_r$ - baš parovi $(r, j)$ sa $j > r$ u kojima je $a_r$ učestvovao;
- $C$ padne za broj elemenata prefiksa većih od $a_r$.

Krećemo od praznog prefiksa i sufiksa koji drži ceo niz, pa je $C = 0$, a $S$ je broj inverzija samog niza $a$ - koji ista petlja zdesna nalevo izračuna dok puni `suff`.

**Pažnja:** $r$ mora uvek da bude veće od $l$. Zato pokazivač mora da pređe preko $a_l$ pre nego što $a_l$ uđe u prefiks - isti element ne može da bude u obe polovine.

**Pažnja:** stabla su indeksirana po vrednosti, a vrednosti idu do $10^9$. Zameni prvo svaku vrednost njenim rednim brojem u sortiranom poretku - **kompresija koordinata**, objašnjena u zadatku [Broj inverzija II](/sr/Problems/inversions-2). Posle nje su vrednosti $1 \dots N$, gde je $N \le n$.

**Pažnja:** rešenje broji do $\frac{n(n-1)}{2} \approx 5 \cdot 10^9$ parova, $k$ ide do $10^{18}$, a i tekući broj inverzija prelazi $2 \cdot 10^9$. Sva tri su `long long`.

## Primer

Treći test primer je $k = 2$ nad $a = 1, 5, 4, 1, 100$:

| $l$ | $inv(l, r)$ za $r = l+1 \dots n$ | $R(l)$ | prebrojanih parova |
|---|---|---|---|
| $1$ | $3, 1, 0, 0$ | $3$ | $3$ |
| $2$ | $3, 1, 0$ | $4$ | $2$ |
| $3$ | $3, 1$ | $5$ | $1$ |
| $4$ | $3$ | nema | $0$ |

Svaki red opada kako $r$ raste, tačno kao što gornji argument i kaže, a pragovi $3, 4, 5$ se nikad ne vraćaju unazad - i baš zato jedan prolaz unapred kroz $r$ opslužuje sva četiri reda. Ukupno je $3 + 2 + 1 + 0 = 6$.

Poslednji red vredi pogledati: pri $l = 4$ prefiks je već $1, 5, 4, 1$, koji sam nosi $3$ inverzije, pa ga nijedan izbor $r$ ne može spasti. Kad prefiks sam pređe budžet, dalje izbacivanje više ne pomaže.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int N, n, r;              // N = how many distinct values, r = start of the suffix
vector<int> a;            // the array, values replaced by their ranks 1..N
vector<int> pref, suff;   // two counting Fenwick trees, indexed by value
long long prefInv, suffInv, crossInv;

void bitAdd(vector<int>& t, int i, int delta){
    for(; i <= N; i += i & -i){
        t[i] += delta;
    }
}

// how many stored values are <= i
long long bitSum(vector<int>& t, int i){
    long long s = 0;
    for(; i > 0; i -= i & -i){
        s += t[i];
    }
    return s;
}

long long countBigger(vector<int>& t, int v){ return bitSum(t, N) - bitSum(t, v); }
long long countSmaller(vector<int>& t, int v){ return bitSum(t, v - 1); }

// a[r] leaves the suffix and the pointer moves on
void dropFromSuffix(){
    suffInv  -= countSmaller(suff, a[r]);  // pairs (r, j) with j > r and a[j] < a[r]
    crossInv -= countBigger(pref, a[r]);   // prefix elements bigger than a[r]
    bitAdd(suff, a[r], -1);
    r++;
}

// a[l] joins the prefix
void addToPrefix(int l){
    prefInv  += countBigger(pref, a[l]);   // prefix elements bigger than a[l]
    crossInv += countSmaller(suff, a[l]);  // suffix elements smaller than a[l]
    bitAdd(pref, a[l], 1);
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        long long k;
        cin>>n>>k;

        vector<int> raw(n);
        for(int i=0;i<n;i++){
            cin>>raw[i];
        }

        vector<int> sorted = raw; // coordinate compression - the trees are indexed by value
        sort(sorted.begin(), sorted.end());
        sorted.erase(unique(sorted.begin(), sorted.end()), sorted.end());
        N = sorted.size();

        a = vector<int>(n + 1);
        for(int i=0;i<n;i++){
            a[i+1] = lower_bound(sorted.begin(), sorted.end(), raw[i]) - sorted.begin() + 1;
        }

        pref = vector<int>(N + 1, 0);
        suff = vector<int>(N + 1, 0);

        // the suffix starts as the whole array, so it holds every inversion of a
        suffInv = 0;
        for(int i=n;i>=1;i--){
            suffInv += countSmaller(suff, a[i]);
            bitAdd(suff, a[i], 1);
        }

        prefInv = 0;
        crossInv = 0;
        r = 1;

        long long ans = 0;

        for(int l=1;l<=n-1;l++){

            while(r < l + 1){ // a[l] must leave the suffix before it joins the prefix
                dropFromSuffix();
            }

            addToPrefix(l);

            while(prefInv + suffInv + crossInv > k && r < n){
                dropFromSuffix();
            }

            if(prefInv + suffInv + crossInv <= k){
                ans += n - r + 1; // r works, and so does every position after it
            }
        }

        cout<<ans<<'\n';
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(n \log n)$.
Memorijska složenost je $O(n)$.
