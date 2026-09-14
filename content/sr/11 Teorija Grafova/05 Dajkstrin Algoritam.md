>U ovoj lekciji učimo najpoznatiji algoritam za najkraće puteve - Dajkstrin algoritam

Dajkstrin algoritam rešava najkraće puteve na **težinskim grafovima sa pozitivnim težinama** (grafovima kod kojih nas prelazak grane nešto košta).

Zamisli gradove i puteve između njih, gde tražimo najkraći put od grada A do grada B.

Radićemo na ovom grafu:

	![[dijkstra-graph.png|Šest gradova od A do F povezanih sa osam težinskih puteva: A-B 4, A-C 2, C-B 1, C-D 8, B-E 10, D-E 2, D-F 6 i E-F 3]]

Broj na putu je ono što nas njegov prelazak košta. BFS broji puteve, pa bi za `E` odgovorio `A B E`, dva puta - ali ta ruta košta `4 + 10 = 14`, dok `A C D E` košta `2 + 8 + 2 = 12`, iako koristi tri puta. Brojanje nam više nije dovoljno.

>Veoma je važno da graf sadrži samo pozitivne težine!
### Teorija

Glavna ideja Dajkstre je da, kada posetimo čvor, već sigurno znamo najkraći put do njega.

Pretpostavimo da nam je na početku potrebno beskonačno vremena da stignemo do svakog čvora.

Krećemo iz `A`, a put od `A` do `A` nas košta `0` (već smo tu).

Sada prolazimo kroz sve susede čvora `A` i poredimo trenutno najmanje rastojanje suseda sa rastojanjem koje dobijamo prolaskom kroz `A`.

	![[dijkstra-relax.png|Mapa na kojoj je A završen, njegova dva puta su obojena, a niz dist ispod sadrži 0 za A, 4 za B, 2 za C i beskonačno za D, E i F]]

I `B` i `C` su bili na beskonačno, a svaki broj je manji od beskonačno, pa se oba popravljaju. Ovo poređenje zovemo **relaksacija** grane, i to je jedino što Dajkstra ikada radi sa rastojanjima.

Sledeći čvor koji posećujemo je **onaj sa najmanjim trenutnim rastojanjem!**

	![[dijkstra-pick.png|C se bira sledeći jer je 2 manje od 4, a relaksacija njegova dva puta postavlja D na 10 i spušta B sa 4 na 3]]

To je `C` sa `2`, a ne `B` sa `4`. I taj izbor se odmah isplati: put `C-B` košta `1`, pa nas `B` preko `C` košta `2 + 1 = 3`, i `4` koju smo maločas upisali biva zamenjena.

Zato nijedan čvor ne zaključavamo prerano. Rastojanje ostaje privremeno sve dok njegov čvor ne postane najmanji među preostalima.

Postupak ponavljamo dok svi čvorovi ne budu posećeni.

Evo konačnog rešenja:

	![[dijkstra-final.png|Završena mapa sa obojenim stablom najkraćih puteva i konačnim rastojanjima 0, 3, 2, 10, 12 i 15 za čvorove od A do F]]

>Pretragu možemo da prekinemo čim stignemo do ciljnog čvora! (Ako nas je zanimao samo najkraći put od `A` do `F`, na primer)

Da graf sadrži negativne težine, naša ideja **posećujemo najmanje rastojanje** bi pohlepno omanula i preskočila moguću prečicu!

Dovoljna su tri grada da se sve sruši. Iz `A` se do `B` stiže za `1`, a do `C` za `2`, dok put od `C` do `B` košta `-2`:

	![[dijkstra-negative.png|Graf sa tri grada gde put od A do B košta 1, od A do C košta 2, a od C do B košta minus 2, pa ruta A C B ukupno košta 0 i pobeđuje direktan put koji je Dajkstra već zaključala na 1]]

### Implementacija

Struktura koja stalno zna gde je najmanje rastojanje je **red sa prioritetom!** (koristimo `greater<>`)

Potrebne su nam 3 stvari

- već pomenuti `priority_queue<pair<int,int>> pq`, koji čuva čvor i njegovo rastojanje
- `vector<int> dist`, koji čuva rastojanja
- vektor suseda `vector<vector<pair<int,int>>> adj`, koji čuva veze i težine

Sada samo vrtimo while petlju dok se red sa prioritetom ne isprazni!

### Kod

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int n = 6;
vector<vector<pair<int,int>>> adj(n); //adj[u] čuva parove (sused, težina)
vector<int> dist(n, 1e9); //1e9 nam stoji umesto beskonačno

void addEdge(int u, int v, int w){
    adj[u].push_back({v, w});
    adj[v].push_back({u, w});
}

void dijkstra(int start){

    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq; //(rastojanje, čvor)

    dist[start] = 0;
    pq.push({0, start});

    while(!pq.empty()){

        int d = pq.top().first;
        int v = pq.top().second;
        pq.pop();

        if(d > dist[v]){ //stara stavka, već smo našli nešto bolje
            continue;
        }

        for(int i=0;i<adj[v].size();i++){

            int to = adj[v][i].first;
            int w = adj[v][i].second;

            if(dist[v] + w < dist[to]){ //preko v je jeftinije
                dist[to] = dist[v] + w;
                pq.push({dist[to], to});
            }
        }
    }
}

int main(){

    addEdge(0,1,4);  //A-B
    addEdge(0,2,2);  //A-C
    addEdge(2,1,1);  //C-B
    addEdge(2,3,8);  //C-D
    addEdge(1,4,10); //B-E
    addEdge(3,4,2);  //D-E
    addEdge(3,5,6);  //D-F
    addEdge(4,5,3);  //E-F

    dijkstra(0);

    for(int v=0;v<n;v++){
        cout<<(char)('A'+v)<<": "<<dist[v]<<'\n';
    }

    return 0;
}
```
Output:
`A: 0`
`B: 3`
`C: 2`
`D: 10`
`E: 12`
`F: 15`
Vremenska složenost: **O(m log n)**
Memorija: **O(n + m)**

Par je `(rastojanje, čvor)`, a ne obrnuto, zato što `priority_queue` poredi parove po prvom elementu. Time što je rastojanje prvo, red se uređuje baš po rastojanju.

>Napomena:
>Rekonstrukcija rute radi isto kao kod BFS-a: drži niz `parent` i upiši `parent[to] = v` u istoj liniji u kojoj popravljaš `dist[to]`.
