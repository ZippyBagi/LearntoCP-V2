
## Pristup

Pohlepni izbor: uvek gledamo film koji se **najranije završava**. On nas najranije oslobađa, a svaki drugi prvi izbor se završava kasnije - pa sve što staje posle njega, staje i posle našeg. Ta zamena nikada ne može da pokvari rešenje.

(Izbori poput "onaj koji prvi počinje" ili "najkraći" ne rade - film $0 \rightarrow 100$ počinje prvi, ali blokira celo veče, a kontraprimer za "najkraći" probaj sam da pronađeš.)

Algoritam:

1. Sortiramo filmove po **vremenu kraja**.
2. Čuvamo `current_time` - trenutak kada postajemo slobodni.
3. Uzimamo svaki film čiji je početak `>= current_time`, i pomeramo `current_time` na njegov kraj.

**Pažnja:** film sme da počne tačno kada se prethodni završava, pa je uslov `>=`, a ne `>`.

Da bismo sortirali po vremenu kraja, svaki film čuvamo kao `pair<int,int>` - zgodan tip koji drži dve vrednosti, kojima pristupamo sa `.first` i `.second`. Parovi se porede po `.first` (a po `.second` samo kod izjednačenja), pa stavljanje **vremena kraja na prvo mesto** čini da `sort()` uradi tačno ono što nam treba.

## Primer

Filmovi iz zadatka, sortirani po vremenu kraja:

| film | počinje kada smo slobodni? | odluka | current_time posle |
|:---:|:---:|:---:|:---:|
| $1 \rightarrow 3$ | $1 \ge 0$, da | **gledamo** | 3 |
| $2 \rightarrow 5$ | $2 \ge 3$, ne | preskačemo | 3 |
| $4 \rightarrow 7$ | $4 \ge 3$, da | **gledamo** | 7 |
| $6 \rightarrow 9$ | $6 \ge 7$, ne | preskačemo | 7 |

Odgledana dva filma - odgovor je $2$.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    iostream::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;

    vector<pair<int,int>> movies(n);

    for(int i = 0; i < n; i++){

        int start, end;
        cin >> start >> end;

        movies[i] = {end, start}; // kraj ide prvi, pa sortiranje sortira po vremenu kraja
    }

    sort(movies.begin(), movies.end());

    int count = 0;
    int current_time = 0;

    for(int i = 0; i < n; i++){

        if(movies[i].second >= current_time){ // film počinje kada smo već slobodni

            count++;
            current_time = movies[i].first; // zauzeti smo dok se ne završi
        }
    }

    cout << count;
}
```

## Složenost

Vremenska složenost je $O(n \log n)$
Memorijska složenost je $O(n)$
