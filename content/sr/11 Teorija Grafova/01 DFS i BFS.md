>U ovoj lekciji učimo dva načina da prošetamo kroz graf.

Sam zapis grafa nam ne vredi mnogo. Prvo pravo pitanje uvek je neka verzija ovoga: ako stojim u gradu `1`, dokle sve mogu da stignem?

	![[graph-running-example.png|Graf koji se koristi kroz celo poglavlje, sa 7 čvorova spojenih sa 7 grana 1-2, 1-3, 2-4, 2-5, 3-6, 5-7 i 6-7, gde je uz čvor 2 označeno da mu je stepen 3]]

Probaj da odgovoriš ručno. Iz `1` idemo u `2`, iz `2` u `5`, iz `5` u `7`, iz `7` u `6`, iz `6` u `3` - a `3` nas vodi pravo nazad u `1`. Napravili smo krug, i ništa nas ne sprečava da ga napravimo ponovo.

U tome je cela muka. Graf nije niz koji se negde završava; šetnja može da se vrati tamo odakle je krenula, pa se "samo nastavi dalje" nikada ne zaustavlja samo od sebe.

Rešenje je jedan niz. Zapisujemo svaki čvor na kome smo već stajali i odbijamo da na njega stanemo drugi put:

~!
```c++
vector<bool> posecen(n+1, false);
```

Sada šetnja mora da se završi, jer ima samo `n` čvorova koje možemo da precrtamo. Ostaje nerešeno pitanje redosleda. Kada stojimo na nekom čvoru, obično imamo više neposećenih suseda na izbor, a taj izbor nije sitnica - iz njega nastaju dva stvarno različita algoritma.

### Dva načina da biramo

Zamisli spisak čvorova koje smo videli, ali ih još nismo obišli. Svaki put kada stanemo negde novo, njegovi neposećeni susedi idu na spisak. Jedino pitanje je koga sledećeg skidamo sa spiska.

**Pretraga u dubinu** (en. depth first search) uvek uzima **najnovijeg**. Ode do suseda, odatle odmah kod jednog njegovog suseda, i tako sve dublje. Tek kada čvor više nema neposećenih suseda, vraća se korak nazad i proba nešto drugo.

**Pretraga u širinu** (en. breadth first search) uvek uzima **najstarijeg**. Završi sve susede početnog čvora pre nego što dodirne bilo šta dalje, pa se širi u krugovima.

Na našem grafu, ako krenemo iz `1`, dobijamo ovo:

	![[dfs-vs-bfs-order.png|DFS i BFS pokrenuti jedan pored drugog iz čvora 1 na istom grafu, sa obojenim granama kojima je svaka šetnja prošla i označenim redosledom obilaska, što daje 1 2 4 5 7 6 3 za DFS i 1 2 3 4 5 6 7 za BFS]]

DFS pravi jedan dugačak lanac. Zaroni `1 2 4`, vrati se, zaroni `5 7 6`, i tek iz `6` konačno stiže do `3` - do direktnog suseda početnog čvora, i to poslednjeg od svih. BFS nigde ne luta: `1`, pa `2 3`, pa `4 5 6`, pa `7`.

Vremenska složenost oba: **O(n + m)**.

### DFS - pretraga u dubinu

"Uzmi najnovijeg" je tačno ono što radi poziv funkcije - poziv koji upravo napravimo je onaj koji se sledeći izvršava, a tamo gde smo stali nastavljamo tek kada se on vrati. Zato nam rekurzija daje DFS besplatno.

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int n = 7;
vector<vector<int>> susedi(n+1);
vector<bool> posecen(n+1, false);

void dodajGranu(int u, int v){
    susedi[u].push_back(v);
    susedi[v].push_back(u);
}

void dfs(int v){

    posecen[v] = true;
    cout<<v<<" ";

    for(int i=0;i<susedi[v].size();i++){

        int sused = susedi[v][i];

        if(!posecen[sused]){ //nikada ne stajemo dva puta na isti čvor
            dfs(sused);
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

    dfs(1);

    return 0;
}
```
Output: `1 2 4 5 7 6 3`

Spisak se u kodu nigde ne pojavljuje. To je stek poziva, koji nam jezik održava sam.

### BFS - pretraga u širinu

"Uzmi najstarijeg" je FIFO, a to je **red**.

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int n = 7;
vector<vector<int>> susedi(n+1);
vector<bool> posecen(n+1, false);

void dodajGranu(int u, int v){
    susedi[u].push_back(v);
    susedi[v].push_back(u);
}

void bfs(int pocetak){

    queue<int> q;

    posecen[pocetak] = true;
    q.push(pocetak);

    while(!q.empty()){

        int v = q.front();
        q.pop();

        cout<<v<<" ";

        for(int i=0;i<susedi[v].size();i++){

            int sused = susedi[v][i];

            if(!posecen[sused]){
                posecen[sused] = true; //obeležavamo odmah, a ne kada izađe iz reda
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

    return 0;
}
```
Output: `1 2 3 4 5 6 7`

Krugovi se vide u izlazu: `1`, pa `2 3`, pa `4 5 6`, pa `7`.

Čvor obeleži kao posećen **kada ga ubacuješ** u red, a ne kada ga vadiš. Ako sačekaš, čvor koji ima dva suseda u tekućem krugu biće ubačen dva puta. To dovodi do nepotrebnog ponavljanja

### DFS bez rekurzije

Kada DFS pišemo bez rekurzije, on postaje isti kao BFS, samo što umesto reda koristimo stek!

~!
```c++
void dfs(int pocetak){

    stack<int> st;

    st.push(pocetak);

    while(!st.empty()){

        int v = st.top();
        st.pop();

        if(posecen[v]){ //mogao je da bude ubačen više puta
            continue;
        }

        posecen[v] = true;
        cout<<v<<" ";

        for(int i=0;i<susedi[v].size();i++){

            int sused = susedi[v][i];

            if(!posecen[sused]){
                st.push(sused);
            }
        }
    }
}
```
Output: `1 3 6 7 5 2 4`

Iako je redosled drugačiji nego kod rekurzivne verzije, ovo je i dalje ispravan DFS (samo smo dali prednost desnom susedu umesto levom).

Primeti i da `posecen` proveravamo **na izlasku**, a ne na ulasku. Isti čvor može da stoji u steku više puta, pa je do trenutka kada ga izvadimo neka ranija kopija možda već obrađena.

>Napomena:
>DFS napravi po jedan rekurzivni poziv za svaki čvor, pa graf oblika dugačkog lanca od 200000 čvorova znači 200000 ugnežđenih poziva, a to je `stack overflow`. Verzija odozgo nema to ograničenje, jer njen stek živi u običnoj memoriji - i baš zbog toga vredi da je znaš.

### Povezane komponente

Graf ne mora da bude u jednom komadu. Dodaj gradove `8` i `9` sa jednim putem između njih, a bez puta do ostalih - oni su sada zasebna **povezana komponenta**.

	![[connected-components.png|Graf u dva nepovezana dela, komponenta od sedam čvorova i zaseban par 8 i 9, što pokazuje da šetnja iz čvora 1 stiže samo do svoje komponente]]

Jedna šetnja pronalazi samo onaj deo iz koga je krenula. Da bismo videli ceo graf, pokrećemo novu iz svakog čvora do koga niko nije stigao. Funkcija `dfs` se uopšte ne menja - menja se samo `main`:

~!
```c++
int main(){

    dodajGranu(1,2);
    dodajGranu(1,3);
    dodajGranu(2,4);
    dodajGranu(2,5);
    dodajGranu(3,6);
    dodajGranu(5,7);
    dodajGranu(6,7);
    dodajGranu(8,9); //dva nova grada, bez puta do ostalih

    int komponente = 0;

    for(int v=1;v<=n;v++){

        if(!posecen[v]){ //v je u delu koji još nismo dotakli
            komponente++;
            dfs(v);
            cout<<'\n';
        }
    }

    cout<<"komponente: "<<komponente;

    return 0;
}
```
Output:
`1 2 4 5 7 6 3`
`8 9`
`komponente: 2`

Petlja se vrti `n` puta, ali obilazak i dalje posećuje svaki čvor jednom, pa je brojanje komponenti i dalje **O(n + m)**. BFS ovde radi isto tako dobro - menja se samo redosled ispisa.
