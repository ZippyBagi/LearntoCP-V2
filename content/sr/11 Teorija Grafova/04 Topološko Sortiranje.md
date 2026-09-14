>U ovoj lekciji učimo redosled obilaska grafa koji poštuje sve zavisnosti - topološko sortiranje

**Topološko sortiranje** je redosled obilaska grafa u kome za svaku granu od čvora `a` do čvora `b` važi da `a` dolazi pre `b`.

### Primer

Zamisli da praviš plan nastave na fakultetu. Imaš 20 predmeta i treba da odlučiš kojim redom se slušaju.

Problem je što neki predmeti imaju uslove. Ne možeš da slušaš analizu pre nego što položiš osnove algebre.

Tu na scenu stupa topološko sortiranje.

Krećemo od predmeta koji nema nijedan uslov. Kada ga završimo, možemo da uzmemo neki drugi predmet bez uslova, ili predmet kome je upravo završeni bio uslov.

Postupak ponavljamo dok ne završimo sve predmete.

Ovakav redosled zovemo **topološki poredak**.

### Graf na kome radimo

Šest predmeta, a strelica od `a` do `b` znači "`a` mora da se završi pre `b`":

`1 -> 3`, `1 -> 4`, `2 -> 3`, `2 -> 5`, `3 -> 6`, `4 -> 6`, `5 -> 6`

Predmeti `1` i `2` nemaju uslova, pa plan može da počne bilo kojim od njih. Predmetu `6` prethode tri predmeta, pa on može da bude jedino poslednji.

Poređaj predmete u niz onim redosledom kojim ih slušamo i pravilo postaje nešto što se vidi golim okom: poredak je ispravan kada **sve strelice gledaju udesno**. Jedna strelica koja gleda unazad znači da smo predmet stavili pre njegovog uslova.

	![[topological-order.png|Graf od šest predmeta sa leve strane, a sa desne dva poretka istih čvorova: 1 2 4 3 5 6 gde svih sedam strelica gleda unapred, i 1 4 3 2 5 6 gde strelica od 2 do 3 gleda unazad i kvari poredak]]

>Napomena:
>Isti graf može da ima više topoloških poredaka.

>Napomena:
>Da bi graf uopšte imao topološki poredak, mora da bude usmeren i ne sme da ima cikluse.

### Implementacija

Topološki poredak efikasno nalazimo **Kanovim algoritmom** (en. Kahn's algorithm).

Za svaki čvor prvo prebrojimo koliko čvorova pokazuje na njega. Taj broj zovemo **ulazni stepen** (en. indegree).

Zatim u red (en. queue) ubacimo sve čvorove čiji je ulazni stepen `0`. U redu se nalazi tačno ono što u tom trenutku smemo da posetimo.

Kada izvadimo čvor iz reda, upišemo ga u rešenje i svakom njegovom susedu smanjimo ulazni stepen za jedan.

Ako je nekom susedu ulazni stepen tako pao na `0`, ubacujemo ga u red.

Postupak se završava kada se red isprazni, a redosled kojim smo vadili čvorove je jedan ispravan topološki poredak.

	![[kahn-steps.png|Kanov algoritam na grafu od šest predmeta, red po red, gde ulazni stepen svakog čvora pada kako se njegovi uslovi vade iz reda, red čuva čvorove čiji je stepen stigao do nule, a topo se puni vrednostima 1 2 4 3 5 6]]

Prati `indegree` vrstu po vrstu. Kada izvadimo `1`, stepen čvorova `3` i `4` pada za jedan, `4` stiže do `0` i ulazi u red. Nijedan čvor ne uđe dvaput, jer do nule stigne tačno jednom.

Upravo nam red ostavlja slobodu izbora. Posle `1` i `2` čekaju tri predmeta i svaki od njih sme da bude sledeći - zato isti graf i ima više ispravnih poredaka.

### Ciklusi

>Ako se red isprazni, a nisu svi čvorovi posećeni, graf ima ciklus.

Dodaj jednu strelicu od `6` nazad do `3` i plan postaje neizvodljiv: `3` čeka `6`, a `6` čeka `3`. Nijednom od njih ulazni stepen nikada ne stigne do nule.

	![[topological-cycle.png|Isti graf sa dodatom strelicom od 6 nazad do 3, gde čvorovi 1, 2, 4 i 5 normalno izlaze, a 3 i 6 ostaju zaglavljeni u ciklusu, pa se red isprazni dok topo sadrži samo četiri od šest čvorova]]

Algoritam se ne zaglavljuje i ne treba mu posebna provera. Prosto ostane bez čvorova sa ulaznim stepenom `0`, pa se `topo` vrati kraći nego što treba. Poređenje njegove veličine sa `n` je cela provera.

### Kod:

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int n = 6;
vector<vector<int>> adj(n+1);
vector<int> indegree(n+1, 0);

void addEdge(int u, int v){ //grana ide od u ka v
    adj[u].push_back(v);
    indegree[v]++;
}

int main(){

    addEdge(1,3);
    addEdge(1,4);
    addEdge(2,3);
    addEdge(2,5);
    addEdge(3,6);
    addEdge(4,6);
    addEdge(5,6);

    queue<int> q;

    for(int v=1;v<=n;v++){
        if(indegree[v]==0){ //ispred v ne stoji ništa
            q.push(v);
        }
    }

    vector<int> topo;

    while(!q.empty()){

        int v = q.front();
        q.pop();

        topo.push_back(v);

        for(int i=0;i<adj[v].size();i++){

            int to = adj[v][i];

            indegree[to]--; //jedan uslov čvora to je ispunjen

            if(indegree[to]==0){ //to sada sme da se sluša
                q.push(to);
            }
        }
    }

    if(topo.size() < n){ //red se ispraznio, a čvorova je ostalo
        cout<<"graf ima ciklus";
        return 0;
    }

    for(int i=0;i<topo.size();i++){
        cout<<topo[i]<<" ";
    }

    return 0;
}
```
Output: `1 2 4 3 5 6`

Primeti da `addEdge` dodaje granu samo u jednom smeru. Grana usmerenog grafa je jednosmerna ulica, a drugi red održava ulazni stepen tačnim već pri samoj izgradnji.

Svaki čvor uđe u red jednom i izađe jednom, a svaku granu pogledamo tačno jednom - onda kada izvadimo čvor iz koga ona kreće.

Vremenska složenost: **O(n + m)**
Memorija: **O(n + m)**

>Napomena:
>Zameni `queue` sa `priority_queue` i dobijaš najmanji ispravan poredak umesto bilo kog. Zadaci to traže češće nego što bi očekivao.
