
## Pristup

Krug je jedini nezgodan deo - a **red** ga rastvara. Stavi đake $0, 1, \ldots, n-1$ u red, početak reda = đak kod koga je brojanje trenutno stiglo. Tada je jedna runda brojanja:

- prvih $m - 1$ đaka preživi brojanje - svaki se premesti sa početka na **kraj** reda (to je taj "krug": kad te izbroje, čekaš sledeći krug);
- $m$-ti đak se uklanja zauvek.

Ponavljaj dok ne ostane jedan đak - početak reda je odgovor.

Svaka runda košta $m$ operacija nad redom i uklanja jednog đaka, pa je cela igra $O(n \cdot m)$ operacija - sa datim ograničenjima najviše oko $2.5 \cdot 10^7$, sasvim dovoljno brzo.

(Postoji i čuvena $O(n)$ formula za ovaj problem - Josifova rekurencija - ali je simulacija redom ovde poenta: pretvara "sedenje u krugu" u dve linije koda.)

## Primer

Prvi test primer, $n = 8$, $m = 3$ - red posle svakog ispadanja:

| ispao | red (početak prvi) |
|---|---|
| - | $0\ 1\ 2\ 3\ 4\ 5\ 6\ 7$ |
| $2$ | $3\ 4\ 5\ 6\ 7\ 0\ 1$ |
| $5$ | $6\ 7\ 0\ 1\ 3\ 4$ |
| $0$ | $1\ 3\ 4\ 6\ 7$ |
| $4$ | $6\ 7\ 1\ 3$ |
| $1$ | $3\ 6\ 7$ |
| $7$ | $3\ 6$ |
| $3$ | **$6$** |

Isprati prvu rundu: $0$ i $1$ su izbrojani i idu na kraj, $2$ je odbrojan i ispada. Poslednji preostali đak je $6$ - rezultat.

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

        int n, m;
        cin>>n>>m;

        queue<int> q;
        for(int i=0;i<n;i++){
            q.push(i); // the students sit in a circle, 0 is first in line
        }

        while(q.size() > 1){
            for(int i=0;i<m-1;i++){ // the first m-1 students survive this round
                q.push(q.front());  // and move to the back of the line
                q.pop();
            }
            q.pop(); // the m-th student leaves the game
        }

        cout<<q.front()<<'\n';
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(n \cdot m)$.
Memorijska složenost je $O(n)$.
