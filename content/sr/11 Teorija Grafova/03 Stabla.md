>U ovoj lekciji upoznajemo najprijatniju vrstu grafa - stablo, kod koga skoro svako teško pitanje postaje lako.

Uzmi našu mapu od 7 gradova i zatvori jedan put, onaj između `6` i `7`. Iz svakog grada se i dalje stiže do svakog drugog, ali sada nema načina da se ide u krug.

Povezan graf bez ciklusa je **stablo**, a iznenađujuće veliki deo sveta ima taj oblik: porodična stabla, raspored foldera, lanac poziva koji za sobom ostavlja rekurzivna funkcija.

	![[tree-from-graph.png|Graf sa 7 čvorova i 7 grana koji sadrži ciklus sa leve strane, i isti graf sa desne nakon uklanjanja grane 6-7, sa 6 grana, bez ciklusa i i dalje povezan]]

### Šta čini stablo

Definicija su dve reči - **povezan** i **bez ciklusa** - ali iz nje odmah slede dve posledice, i obe se stalno koriste.

**Stablo sa `n` čvorova ima tačno `n - 1` granu.**

**Između svaka dva čvora postoji tačno jedan put.** Bar jedan postoji zato što je graf povezan. Kada bi između istog para postojala dva različita puta, odlazak jednim i povratak drugim iscrtao bi ciklus - a on ne sme da postoji.

Ova druga činjenica radi pravi posao. U običnom grafu je pronalaženje rute između dva čvora pretraga. U stablu je ruta jedinstvena, pa je jedina ruta ujedno i najkraći put. Nema tu šta da se bira.

### Korenovanje stabla

Stablo nacrtano na papiru nema vrh - `1` nije važniji od `5`. Ali skoro svaki algoritam postaje lakši čim izaberemo jedan čvor i proglasimo ga **korenom**, pa celo stablo obesimo ispod njega.

Kada je koren izabran, pojavljuju se porodični nazivi:

- **roditelj** čvora `v` je njegov sused koji je korak bliže korenu. Koren nema roditelja.
- **deca** čvora `v` su njegovi ostali susedi - oni koji su korak dalje
- **dubina** čvora `v` je njegovo rastojanje od korena
- **list** je čvor koji nema decu

Korenovanje ne menja ništa na samom stablu. To je način na koji ga gledamo, i isto stablo slobodno možemo da obesimo gde god hoćemo.

	![[tree-rooted-at-1.png|Isto stablo obešeno o čvor 1 i nacrtano po dubinama od 0 do 3, sa korenom u narandžastoj boji, uokvirenim čvorovima koji imaju decu, i listovima 4, 6 i 7 u zelenoj]]

### Roditelj i dubina pomoću DFS-a

Sve ovo računa jedan DFS, uz jedan mali trik.

Dok šetamo kroz stablo, jedina grana koja vodi nazad ka korenu je ona kojom smo i došli. Zato umesto niza `posecen` prosto prosleđujemo roditelja nadole i odbijamo da se vratimo u njega. Pošto nema ciklusa, drugog puta nazad ni nema.

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int n = 7;
vector<vector<int>> susedi(n+1);
vector<int> roditelj(n+1, 0);
vector<int> dubina(n+1, 0);

void dodajGranu(int u, int v){
    susedi[u].push_back(v);
    susedi[v].push_back(u);
}

void dfs(int v, int p, int d){

    roditelj[v] = p;
    dubina[v] = d;

    for(int i=0;i<susedi[v].size();i++){

        int sused = susedi[v][i];

        if(sused != p){ //jedina grana koja vodi nazad je ona kojom smo došli
            dfs(sused, v, d+1);
        }
    }
}

int main(){

    dodajGranu(1,2);
    dodajGranu(1,3);
    dodajGranu(2,4);
    dodajGranu(2,5);
    dodajGranu(3,6);
    dodajGranu(5,7); //šest grana za sedam čvorova - stablo

    dfs(1, 0, 0); //korenujemo stablo u čvoru 1

    for(int v=1;v<=n;v++){
        cout<<v<<": roditelj "<<roditelj[v]<<", dubina "<<dubina[v]<<'\n';
    }

    return 0;
}
```
Output:
`1: roditelj 0, dubina 0`
`2: roditelj 1, dubina 1`
`3: roditelj 1, dubina 1`
`4: roditelj 2, dubina 2`
`5: roditelj 2, dubina 2`
`6: roditelj 3, dubina 2`
`7: roditelj 5, dubina 3`

Koren prijavljuje roditelja `0`, što je naš način da kažemo "niko" - čvorove numerišemo od `1`, pa je `0` slobodno. Čvorovi `4`, `6` i `7` nisu napravili nijedan rekurzivni poziv, pa su oni listovi.

Pošto stablo ima `n - 1` granu, ovaj DFS je **O(n)**.

>Napomena:
>`if(sused != p)` radi samo za stablo! Za svaku drugu vrstu grafa koristi vektor `posecen`

### Šume

Izbaci zahtev da graf bude povezan, zadrži "bez ciklusa", i dobijaš **šumu** - skup stabala, gde je svako od njih zasebna komponenta.

Sve odozgo i dalje radi; samo prođeš kroz čvorove i svaku komponentu korenuješ posebno.

>Stablo je mesto gde problemi sa grafovima postaju laki. Kad god u ograničenjima primetiš `n - 1` granu, ili zadatak usput kaže da putevi spajaju sve gradove bez ijedne petlje, imaš stablo pred sobom - a osobina o jedinstvenom putu je obično ključ celog rešenja.
