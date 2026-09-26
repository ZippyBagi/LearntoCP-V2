
## Pristup

Najmanji broj bacanja na tabli gde svako bacanje košta isto jeste najkraći put meren granama, dakle BFS. Ali pre nego što pretraga uopšte može da krene, moramo da znamo gde te bacanje zapravo ostavlja.

Kad staneš na polje $x$, potez se tu ne završava: zmija ili lestve te nose dalje, možda i više puta. Zato definišimo

$$land[x] = \text{polje na kom se igrač konačno zaustavi kad stane na } x$$

Svako polje pokazuje na **najviše jedno** drugo, pa praćenje tog lanca nije pretraga u kojoj biramo kuda dalje, nego jedna jedina šetnja. Ona se završi na dva načina: dođe do polja na kom nema ničega, ili se vrati na polje kroz koje je već prošla i vrti se zauvek. Drugi slučaj je gubitnički i obeležavamo ga sa $land[x] = -1$.

### Pronalaženje petlji

Umesto `visited` zastavice ovde su nam potrebna tri stanja, jer moramo da razlikujemo polja koja su gotova od onih na kojima upravo radimo:

- $0$ - još nismo gledali
- $1$ - polje je na lancu koji trenutno razrešavamo
- $2$ - gotovo, $land$ je poznat

~!
```c++
if(state[v] == 2) return land[v]; // već poznato
if(state[v] == 1) return -1;      // vratili smo se u v, znači v je na ciklusu
```

Svako polje razrešimo jednom i posle ga samo čitamo, pa ceo prolaz košta $O(n)$. I polje koje samo vodi u petlju, a nije na njoj, ispadne $-1$, jer poziv koji čeka vrati $-1$ - a to je i tačno, igrača koji na njega stane petlja proguta isto tako.

### Pretraga

Sada je to BFS iz lekcije o najkraćim putevima, s tim što su potezi iz polja $v$ bacanja $1 \dots k$, a svako od njih stiže na $land[v + roll]$, a ne na $v + roll$:

~!
```c++
if(v + roll > n - 1) break;   // bacanje preko poslednjeg polja nije dozvoljeno
int to = land[v + roll];
if(to == -1) continue;        // to polje gubi igru, pa na njega nikada ne stajemo
```

`break`, a ne `continue`, jer bacanja odatle samo rastu.

**Pažnja:** rastojanje upisujemo polju na kom igrač **završi**, nikada onom koje je kockica pokazala. Polja sa zmijom ili lestvama su prolaz, a ne mesto na kom se stoji; ako i njima daš rastojanje, brojaćeš i same lestve kao bacanje.

## Primer

Prvi test primer, jedan red po polju kako izlazi iz reda:

| polje izlazi iz reda | bacanja do njega | šta kockica može | nova polja |
|---|---|---|---|
| $0$ | $0$ | $+1 \rightarrow 1$; $+2 \rightarrow 2 \rightarrow 12$ | $1$, $12$ |
| $1$ | $1$ | $+1 \rightarrow 2 \rightarrow 12$; $+2 \rightarrow 3 \rightarrow 13$ | $13$ |
| $12$ | $1$ | $+1 \rightarrow 13$; $+2 \rightarrow 14 \rightarrow 7$ | $7$ |
| $13$ | $2$ | $+1 \rightarrow 14 \rightarrow 7$; $+2 \rightarrow 15$ | $15$ |
| $7$ | $2$ | $+1 \rightarrow 8 \rightarrow 17$; $+2 \rightarrow 9$ | $17$, $9$ |

Dvostruke strelice su zmije i lestve na delu: bacanje $2$ sa polja $0$ pokazuje polje $2$, ali se igrač zaustavlja na $12$, pa rastojanje $1$ dobija polje $12$, a polje $2$ ga ne dobija nikada. Poslednji red rešava zadatak - sa polja $7$ jedno bacanje stiže na $8$, a tamošnje lestve isporučuju cilj, pa je $dist[17] = 3$.

U drugom test primeru petlja pokazuje zube:

| polje izlazi iz reda | bacanja do njega | šta kockica može | nova polja |
|---|---|---|---|
| $0$ | $0$ | $+1 \rightarrow 1$ gubi; $+2 \rightarrow 2$ | $2$ |
| $2$ | $1$ | $+1 \rightarrow 3$ gubi; $+2 \rightarrow 4$ | $4$ |
| $4$ | $2$ | | - |

Razrešavanje polja $1$ prošeta $1 \rightarrow 3 \rightarrow 1$ i zatekne polje $1$ još uvek u stanju $1$, pa oba polja dobiju $land = -1$ i pretraga ih zaobiđe. Bez tog prolaza šetnja se nikada ne bi zaustavila.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

int resolve(int v, vector<int>& jump, vector<int>& state, vector<int>& land) {

    if(state[v] == 2) return land[v]; // already known
    if(state[v] == 1) return -1;      // we walked back into v, so v sits on a cycle

    state[v] = 1;

    if(jump[v] == -1) land[v] = v;                      // nothing here, the player stays
    else land[v] = resolve(jump[v], jump, state, land); // he is carried on, wherever that ends up

    state[v] = 2;
    return land[v];
}

int main() {
    iostream::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;

    while(t--) {

        int n, k, m;
        cin >> n >> k >> m;

        vector<int> jump(n, -1); // jump[v] is where a snake or ladder on v leads, or -1
        vector<int> state(n, 0); // 0 = untouched, 1 = being resolved right now, 2 = finished
        vector<int> land(n, -1); // land[v] is where the player really ends up, or -1 if v is fatal

        for(int i=0;i<m;i++) {

            int u, v;
            cin >> u >> v;

            jump[u] = v;
        }

        for(int v=0;v<n;v++) resolve(v, jump, state, land);

        vector<int> dist(n, -1); // dist[v] = fewest throws needed to stand on v

        queue<int> q;

        dist[0] = 0;
        q.push(0);

        while(!q.empty()) {

            int v = q.front();
            q.pop();

            for(int roll=1;roll<=k;roll++) {

                if(v + roll > n - 1) break; // a throw past the last square is not allowed

                int to = land[v + roll];

                if(to == -1) continue; // that square loses the game, so we never step on it

                if(dist[to] == -1) { // first time we see it, so this is the fewest throws
                    dist[to] = dist[v] + 1;
                    q.push(to);
                }
            }
        }

        cout << dist[n-1] << "\n"; // -1 already means "cannot be done"
    }

    return 0;
}
```

## Složenost

Vremenska složenost je $O(n \cdot k)$.
Memorijska složenost je $O(n)$.
