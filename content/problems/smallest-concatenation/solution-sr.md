
## Pristup

Isprobavanje svih $n!$ redosleda ne dolazi u obzir, pa tražimo pohlepno pravilo: neki raspored brojeva za koji je garantovano da je najbolji.

Prirodne ideje brzo padaju. Numeričko sortiranje stavlja $3$ pre $32$, ali je $332 > 323$. Sortiranje kao reči radi isto ("3" < "32" po abecedi). Primer je napravljen da obori oba.

Pravo pitanje je lokalno: **kada $x$ treba da ide pre $y$?** Da su oni jedina dva broja, rezultat bi bio ili $xy$ ili $yx$ (kao niske cifara) - pa $x$ ide prvi tačno kada je

$$xy < yx$$

Sortiraj sa tim poređenjem i svaki susedni par je u svom najboljem poretku. A ako nijedna zamena suseda ne može da popravi rezultat, ne može ni jedno preuređivanje - do svakog redosleda se stiže zamenama suseda, od kojih nijedna ne pomaže.

**Pažnja:** rezultat ima do milion cifara - ne postoji brojevni tip koji ga drži. Radi sa **niskama** od početka do kraja: čitaj brojeve kao niske, poredi `x + y < y + x` nadovezivanjem niski, ispiši sortirane delove jedan za drugim.

(Jedna finesa koju ovo pravilo rešava besplatno: poređenje $xy$ sa $yx$ uvek poredi niske **jednake dužine**, pa se poređenje niski i poređenje brojeva slažu - baš zato obično abecedno sortiranje samih $x$ i $y$ nije bilo dovoljno.)

## Primer

Prvi test primer - presude komparatora tokom sortiranja:

| par | kao $xy$ / $yx$ | poredak |
|---|---|---|
| $3$ i $32$ | $332$ i $323$ | $32$ prvi |
| $11$ i $12$ | $1112$ i $1211$ | $11$ prvi |
| $3$ i $987$ | $3987$ i $9873$ | $3$ prvi |

Ceo sortirani redosled je $11, 12, 32, 3, 987$, i njegovim čitanjem se dobija `1112323987` - rezultat. Drugi test primer je zamka jednakih prefiksa: pravilo poredi `91919919191` ($91919$ prvi) sa `91919191919` ($919191$ prvi), druga niska je manja, pa $919191$ zauzima prvo mesto.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

bool cmp(const string &x, const string &y){
    return x + y < y + x; // x goes before y exactly when the number xy is smaller than yx
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        int n;
        cin>>n;

        vector<string> a(n); // the numbers are kept as strings
        for(int i=0;i<n;i++){
            cin>>a[i];
        }

        sort(a.begin(), a.end(), cmp);

        for(int i=0;i<n;i++){
            cout<<a[i]; // the result is one long number, printed piece by piece
        }
        cout<<'\n';
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(n \log n \cdot d)$ gde je $d$ broj cifara po elementu.
Memorijska složenost je $O(n \cdot d)$.
