
## Pristup

Svaka vrsta insekata mora da se podeli u jednake timove veličine $d$ - to radi tačno kada $d$ deli broj insekata te vrste. Veličina koja radi za sve tri vrste je **zajednički delilac** brojeva $a$, $b$ i $c$, a mi tražimo najveći: njihov **najveći zajednički delilac**.

Isprobavanje svakog kandidata do $2 \cdot 10^9$ je presporo - ali Euklidov algoritam iz lekcije o NZD nalazi NZD dva broja gotovo trenutno, tako što par $(a, b)$ stalno zamenjuje parom $(b, a \bmod b)$ dok drugi broj ne padne na $0$.

Za tri broja, uzmi ih dva po dva:

$$nzd(a, b, c) = nzd(nzd(a, b), c)$$

što važi zato što broj deli i $a$ i $b$ tačno kada deli $nzd(a, b)$.
## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int gcd(int a, int b){
    while(b != 0){
        int r = a % b;
        a = b;
        b = r;
    }
    return a;
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        int a, b, c; // up to 2 * 10^9, which still fits in an int
        cin>>a>>b>>c;

        cout<<gcd(gcd(a, b), c)<<'\n'; // the gcd of three numbers, two at a time
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(t \log a)$.
Memorijska složenost je $O(1)$.
