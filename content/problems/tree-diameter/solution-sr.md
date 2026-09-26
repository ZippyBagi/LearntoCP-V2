
## Pristup

Iz same definicije ispada i algoritam: izmeri svaki par i zapamti najveći rezultat. Jedna pretraga iz neke ispostave daje rastojanja do svih ostalih u $O(n)$, pa pretraga iz svake košta $O(n^2)$ - a pri $n = 10^5$ to je $10^{10}$ koraka. Presporo, ali vredi ga imati na umu, jer ćemo ga dvaput poboljšati.

### Koren u stablu

Postavimo koren parka u ispostavu $1$. Svaki put ima svoju **najvišu** ispostavu, onu najbližu korenu, i iz nje silazi u dvoje različite dece - ili se baš tu i završava. Uvedimo zato

$down[v]$ - koliko se najviše staza pređe na šetnji iz $v$ pravo naniže, kroz sopstveno podstablo

Najbolji put kome je $v$ najviša ispostava je zbir dve najveće vrednosti $down[c] + 1$ po deci ispostave $v$, s tim što ono što fali računamo kao $0$. A sam $down[v]$ je najveća od tih istih vrednosti:

$$down[v] = \max_{c \text{ dete od } v} (down[c] + 1)$$

Jedna šetnja kroz stablo ovo popuni, decu pre roditelja, a rešenje je najveći zbir na koji smo naišli. To je $O(n)$ i zadatak je time već rešen.

### Umesto toga, dve pretrage

Ima i kraće, a korenovanje mu uopšte ne treba.

**Kreni gde god hoćeš i idi do ispostave koja ti je najdalja. Ona je kraj nekog najdužeg puta.** Prva pretraga, iz ispostave $1$, nađe takvu ispostavu $u$, a druga, iz $u$, meri prečnik neposredno - njeno najveće rastojanje je rešenje.

Zašto je najdalja ispostava uvek kraj? Stavimo koren u ispostavu iz koje smo krenuli i neka je $u$ najdublja ispostava u parku. Uzmimo bilo koji najduži put, neka mu je najviša ispostava $t$, i neka iz $t$ silazi $d_1$ u jedno dete i $d_2 \le d_1$ u drugo - dužina mu je onda $d_1 + d_2$, a krajevi stoje na dubinama $depth(t) + d_1$ i $depth(t) + d_2$. Pošto dublje od $u$ nema ničega, važi $depth(u) \ge depth(t) + d_1$.

- Ako je $u$ ispod nekog drugog deteta od $t$ nego dublji kraj, ili uopšte nije ispod $t$, put od $u$ do tog dubljeg kraja sastaje se s njim u $t$ ili još više, pa je dug bar $(depth(u) - depth(t)) + d_1 \ge d_1 + d_1$.
- Inače je $u$ ispod istog deteta kao i dublji kraj, pa put od $u$ do **drugog** kraja prolazi tačno kroz $t$ i dug je $(depth(u) - depth(t)) + d_2 \ge d_1 + d_2$.

U oba slučaja se iz $u$ pruža put koji nije kraći od najdužeg, a to znači da je i $u$ kraj nekog najdužeg puta.

I dve pretrage su $O(n)$, ali staju u nekoliko linija, a pošto posao obavlja red, rekurzije nigde nema - što nije sitnica, jer bi park razvučen u jednu liniju od $10^5$ ispostava značio $10^5$ ugnežđenih poziva za rešenje sa korenom.

**Pažnja:** jedna pretraga nije dovoljna. Ona odgovara na pitanje koliko je šta udaljeno od **ispostave $1$**, a to nije isto pitanje - na primeru bi javila $3$ umesto $6$, jer ispostava $1$ stoji na sredini najdužeg puta. Prva pretraga služi samo da drugoj nađe odakle da krene.

## Primer

Prvi test primer, gde prva pretraga kreće iz ispostave $1$:

| pretraga | kreće iz | rastojanja koja nalazi | najdalja |
| ---- | ---- | ---- | ---- |
| prva | $1$ | $1:0$, $2:1$, $3:1$, $4:2$, $5:2$, $6:3$, $7:3$ | $6$ |
| druga | $6$ | $6:0$, $4:1$, $2:2$, $1:3$, $3:4$, $5:5$, $7:6$ | $7$ |

Prva pretraga nigde ne naiđe na rastojanje veće od $3$. Druga kreće sa kraja najdužeg puta i pređe ga celog, pa staje u ispostavi $7$, na rastojanju $6$ - to je rešenje. Šestica i sedmica su u prvoj pretrazi izjednačene na rastojanju $3$, pa da je druga krenula iz sedmice, stala bi u šestici, opet na $6$: koji od dva kraja prvo nađemo nije bitno.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int n;
vector<vector<int>> adj;
vector<int> dist;

void addEdge(int u, int v){
    adj[u].push_back(v);
    adj[v].push_back(u);
}

//fills dist with the number of trails from start to every outpost, and returns
//the outpost that ends up farthest away
int bfs(int start){

    queue<int> q;

    dist = vector<int>(n + 1, -1); //-1 means not reached yet, so no visited vector is needed

    dist[start] = 0;
    q.push(start);

    int farthest = start;

    while(!q.empty()){

        int v = q.front();
        q.pop();

        if(dist[v] > dist[farthest]){
            farthest = v;
        }

        for(int i=0;i<adj[v].size();i++){

            int to = adj[v][i];

            if(dist[to] == -1){ //mark it now, not when it leaves the queue
                dist[to] = dist[v] + 1;
                q.push(to);
            }
        }
    }

    return farthest;
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        cin>>n;

        adj = vector<vector<int>>(n + 1); // a fresh tree for every testcase

        for(int i=0;i<n-1;i++){
            int u, v;
            cin>>u>>v;
            addEdge(u, v);
        }

        int u = bfs(1); //the farthest outpost from anywhere is one end of a longest route
        int v = bfs(u); //so measuring from u gives the whole route

        cout<<dist[v]<<'\n';
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(n)$
Memorijska složenost je $O(n)$
