
## Pristup

Traži se najmanji broj koraka, svaki korak košta isto, a mapa je graf - to je BFS. Ostaje samo pitanje koji graf.

Onaj koji prvi pada na pamet je pogrešan izbor: stanice kao čvorovi, spojene kada ih neka linija obe sadrži. Linija sa $m$ stanica tada spaja **svaki par** svojih stanica:

$$m = 60000 \implies m(m-1) \approx 3.6 \cdot 10^9 \text{ grana}$$

i to od jedne jedine linije, opisane sa $60000$ brojeva.

### Vozi liniju umesto da je pamtiš

Sa stanice $v$ BFS traži sve stanice koje sa $v$ dele neku liniju - a taj spisak već imamo, to je sama linija. Zato pamtimo dve stvari: `route[i]`, stanice linije $i$, i `lines[v]`, linije koje staju na stanici $v$. Širenje iz $v$ onda znači: za svaku liniju kroz $v$, prođi kroz njene stanice.

Jedna zastavica to čini brzim. **Kada se jednom povezeš nekom linijom, sve njene stanice su ti dostupne**, i to sve po istoj ceni. Zato drugi dolazak na tu istu liniju ne može da ponudi ništa novo:

~!
```c++
if(used[line]) continue; // sve stanice ove linije su već dostignute
used[line] = true;
```

Sada svaku liniju prolazimo tačno jednom i cela pretraga košta koliko i samo čitanje ulaza.

**Pažnja:** obeleži `used[line]` čim uđeš u liniju, a ne kada završiš sa njom - iz istog razloga iz kog lekcija obeležava čvor pri ubacivanju u red.

Ostalo je BFS iz lekcije o najkraćim putevima: `dist[a] = 0`, a $-1$ znači da do te stanice još nismo stigli. Zato `dist[b]` sam po sebi ostane $-1$ kada se do krajnje stanice ne može stići, a to je baš ono što treba ispisati.

## Primer

| stanica izlazi iz reda | vožnji do nje | linije kroz nju | nove stanice koje otvara |
|---|---|---|---|
| $1$ | $0$ | prva linija | $2$, $7$ |
| $2$ | $1$ | prva linija (već provezena) | - |
| $7$ | $1$ | prva linija (već provezena), druga linija | $3$, $6$ |
| $3$ | $2$ | druga linija (već provezena) | - |
| $6$ | $2$ | druga linija (već provezena) | - |

Prvi red je cela prva vožnja: ulaskom na stanici $1$ otvaraju se i $2$ i $7$, jer je do obe potrebna ista jedna vožnja. Stanica $2$ zatim ne uradi ništa, pošto je njena jedina linija već provezena - tu se zastavica isplati. Na stanici $7$ presedamo, i ona otvara $3$ i $6$ na dve vožnje.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    iostream::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;

    while(t--) {

        int s, n;
        cin >> s >> n;

        vector<vector<int>> route(n);   // route[i] lists the stops of line i
        vector<vector<int>> lines(s+1); // lines[v] lists the lines stopping at v

        for(int i=0;i<n;i++) {

            int m;
            cin >> m;

            route[i].resize(m);

            for(int j=0;j<m;j++) {
                cin >> route[i][j];
                lines[route[i][j]].push_back(i);
            }
        }

        int a, b;
        cin >> a >> b;

        vector<int> dist(s+1, -1);   // dist[v] = fewest rides needed to reach stop v
        vector<bool> used(n, false); // a line is worth boarding only once

        queue<int> q;

        dist[a] = 0;
        q.push(a);

        while(!q.empty()) {

            int v = q.front();
            q.pop();

            for(int i=0;i<lines[v].size();i++) {

                int line = lines[v][i];

                if(used[line]) continue; // every stop of this line is already reached
                used[line] = true;

                for(int j=0;j<route[line].size();j++) {

                    int to = route[line][j];

                    if(dist[to] == -1) { // first time we see it, so this is the fewest rides
                        dist[to] = dist[v] + 1;
                        q.push(to);
                    }
                }
            }
        }

        cout << dist[b] << "\n"; // -1 already means "cannot get there"
    }

    return 0;
}
```

## Složenost

Vremenska složenost je $O(s + \sum m)$.
Memorijska složenost je $O(s + \sum m)$.
