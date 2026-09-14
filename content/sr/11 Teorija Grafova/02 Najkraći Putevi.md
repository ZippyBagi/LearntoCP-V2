>U ovoj lekciji učimo šta je najkraći put i kako da ga pronađemo
### Šta je najkraći put?

**Put** od `u` do `v` je niz čvorova u kome je svaki sused sledećeg, koji počinje u `u` a završava se u `v`. Njegova **dužina** je broj grana na njemu - a ne broj čvorova.

	![[graph-running-example.png|Graf koji se koristi kroz celo poglavlje, sa 7 čvorova spojenih sa 7 grana 1-2, 1-3, 2-4, 2-5, 3-6, 5-7 i 6-7, gde je uz čvor 2 označeno da mu je stepen 3]]

Od `1` do `6` naš graf nudi dva puta:

- `1 3 6` - dužine 2
- `1 2 5 7 6` - dužine 4

**Najkraći put** je bilo koji put najmanje dužine, a taj minimum zovemo **rastojanje** između ta dva čvora i pišemo `d(u, v)`. Znači `d(1, 6) = 2`.

Tri stvari treba imati na umu:

- najkraćih puteva može da bude **više** - od `1` do `7` i `1 2 5 7` i `1 3 6 7` imaju dužinu 3. Zadatak koji traži "najkraći put" prihvata bilo koji od njih.
- ako put uopšte ne postoji, rastojanje je beskonačno - ta dva čvora su u različitim komponentama
- `d(v, v) = 0`, jer nas stajanje u mestu ništa ne košta

### Zašto ih BFS pronalazi

Seti se kako se BFS širi: prvo početni čvor, pa sve što je jednu granu daleko, pa sve što je dve grane daleko.

Taj redosled je ceo dokaz. Kada BFS krene da deli čvorove na rastojanju `k + 1`, već je podelio svaki čvor na rastojanju `k` ili manjem. Znači, čvor koji je u tom trenutku još neposećen ne može da bude bliži od `k + 1`.

	![[bfs-rings.png|Graf raspoređen u četiri vodoravna pojasa po rastojanju od čvora 1, obojena od tamnije ka svetlijoj za d jednako 0, 1, 2 i 3, gde svaka grana spaja jedan pojas sa sledećim]]

Drugim rečima: **kada BFS prvi put vidi neki čvor, vidi ga preko najkraćeg puta.** Nijedan kasniji put ne može da bude bolji, i zato provera `posecen` nikada ne baca ništa korisno.

Iz istog razloga DFS to ne može. DFS zaranja, pa je prvi put kada vidi neki čvor možda već napravio ogroman zaobilazak.

### Kod

Izmena je mala: umesto `posecen` imamo `rastojanje`, a `-1` znači "još nismo stigli do njega". Jedan niz sada radi oba posla, jer čvor ima rastojanje tačno onda kada je posećen.

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int n = 7;
vector<vector<int>> susedi(n+1);
vector<int> rastojanje(n+1, -1); //-1 znači "još nismo stigli do njega"

void dodajGranu(int u, int v){
    susedi[u].push_back(v);
    susedi[v].push_back(u);
}

void bfs(int pocetak){

    queue<int> q;

    rastojanje[pocetak] = 0;
    q.push(pocetak);

    while(!q.empty()){

        int v = q.front();
        q.pop();

        for(int i=0;i<susedi[v].size();i++){

            int sused = susedi[v][i];

            if(rastojanje[sused] == -1){ //vidimo ga prvi put, znači ovo je najkraći ulaz
                rastojanje[sused] = rastojanje[v] + 1;
                q.push(sused);
            }
        }
    }
}

int main(){

    dodajGranu(1,2);
    dodajGranu(1,3);
    dodajGranu(2,4);
    dodajGranu(2,5);
    dodajGranu(3,6);
    dodajGranu(5,7);
    dodajGranu(6,7);

    bfs(1);

    for(int v=1;v<=n;v++){
        cout<<v<<": "<<rastojanje[v]<<'\n';
    }

    return 0;
}
```
Output:
`1: 0`
`2: 1`
`3: 1`
`4: 2`
`5: 2`
`6: 2`
`7: 3`

Jedan BFS, i odjednom imamo rastojanje od `1` do **svakog** čvora - i dalje **O(n + m)**. Svaki čvor koji je na kraju ostao na `-1` prosto je nedostižan.

### Rekonstrukcija puta

Rastojanja su često dovoljna, ali ponekad zadatak traži i samu rutu. Ne moramo da čuvamo cele puteve: kada prvi put stignemo do suseda iz čvora `v`, zapišemo da nas je baš `v` pustio unutra.

~!
```c++
vector<int> roditelj(n+1, 0); //roditelj[v] je čvor iz koga smo stigli do v
```

Unutar `if`-a, jedna linija se pridružuje ostalima:

~!
```c++
            if(rastojanje[sused] == -1){
                rastojanje[sused] = rastojanje[v] + 1;
                roditelj[sused] = v; //pamtimo ko nas je pustio unutra
                q.push(sused);
            }
```

Sada je šetnja od `7` nazad do `1` prosto praćenje niza `roditelj` sve dok ne ispadnemo sa početka, na kome i dalje stoji `0`. Tako dobijamo put unazad, pa ga obrnemo:

~!
```c++
    vector<int> put;
    int v = 7;

    while(v != 0){ //idemo unazad dok ne ispadnemo sa početka
        put.push_back(v);
        v = roditelj[v];
    }

    reverse(put.begin(), put.end());

    for(int i=0;i<put.size();i++){
        cout<<put[i]<<" ";
    }
```
Output: `1 2 5 7`

Tri grane, baš koliko kaže `rastojanje[7] = 3`. Drugi najkraći put `1 3 6 7` je jednako tačan - BFS vraća onaj na koji je slučajno prvo naišao.

>Napomena:
>Sve ovo se oslanja na jednu pretpostavku: **sve grane koštaju isto**. BFS broji grane, pa čim zadatak da putevima različite dužine, ruta sa najmanje puteva prestaje da bude najkraća ruta i BFS daje pogrešan odgovor. Za grafove sa težinama koristi se Dajkstrin algoritam.
