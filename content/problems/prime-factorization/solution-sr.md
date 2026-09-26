
## Pristup

Ovo je algoritam iz lekcije o rastavljanju na proste činioce: isprobavaj delioce $d = 2, 3, 4, \ldots$ i kad god $d$ deli $n$, ispiši ga i podeli $n$ njime - iznova i iznova, da svaki prost broj izađe onoliko puta koliko se pojavljuje.

Petlja treba da radi samo dok je $d \cdot d \le n$: broj $n$ može da ima **najviše jedan** prost činilac veći od $\sqrt{n}$ (dva takva pomnožena već bi premašila $n$). Zato posle petlje, ako je $n$ i dalje veći od $1$, to što je ostalo je taj jedan veliki prost broj - ispiši ga.

**Pažnja:** za $n \le 2 \cdot 10^9$ sve staje u `int` - i $n$ i proizvod $d \cdot d$ ostaju ispod granice int-a od oko $2.1 \cdot 10^9$ (petlja staje na $d \approx \sqrt{n}$). Da je granica veća, $d \cdot d$ bi tražio `long long`.
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

        int n; // up to 2 * 10^9 still fits in an int
        cin>>n;
        
        for(int d=2;d*d<=n;d++){
            while(n % d == 0){ // print d as many times as it divides n
                cout<<d<<' ';
                n /= d;
            }
        }

        if(n > 1){ // at most one prime factor larger than sqrt(n) can remain
            cout<<n;
        }

        cout<<'\n';
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(t \sqrt{n})$.
Memorijska složenost je $O(1)$.
