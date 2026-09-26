
## Pristup

#### Ideja

Pitanje se postavlja **posle svake pojedinačne jedinice**, a matrica samo dobija polja - ništa se nikada ne oduzima.

Da posle svakog upisa pokrenemo pretragu iz početka, rešenje bi radilo, ali bismo svaki put prolazili kroz celu matricu: $m$ pretraga od po $O(n^2)$, što je pri $n = 200$ oko $1.6 \cdot 10^9$ koraka. A sve što jedna pretraga sazna, baci čim se završi.

Povezanost koja samo raste upravo je ono za šta Union Find i služi. Svako polje posmatramo kao jednu vrednost, pa kada se jedinica upiše, spajamo je sa onim susedima koji već imaju jedinicu. Svaki upis košta svega nekoliko operacija složenosti $O(\alpha)$, i ništa se ne računa iznova.

#### Dve dodatne vrednosti

Ostaje pravo pitanje: da li je **neko** polje prve vrste u istom skupu sa **nekim** poljem poslednje? Ako to proveravamo direktno, posle svakog upisa imamo $n^2$ parova, pa bismo poništili sve što smo upravo uštedeli.

Trik je da strukturi dodamo dve vrednosti koje uopšte nisu polja - nazovimo ih **nebo** i **tlo**. Svaki put kada jedinica padne u prvu vrstu, spajamo je sa nebom, a svaki put kada padne u poslednju, sa tlom.

Sada se celo pitanje svodi na jedno jedino poređenje:

~!
```cpp
same(SKY, GROUND)
```

Ako nebo i tlo imaju isti koren, onda neko gornje polje stiže do nekog donjeg - te dve vrednosti su mogle da se sretnu jedino preko lanca susednih jedinica.

Struktura, dakle, drži $n^2 + 2$ vrednosti, a rešenje je prvi korak u kojem ta jedna provera prođe.

#### Granični slučajevi

**Matrica od jednog polja.** Pri $n = 1$ to jedno polje je i u prvoj i u poslednjoj vrsti, pa se spaja i sa nebom i sa tlom, a rešenje je $1$. Upravo zato su dva `if`-a napisana odvojeno, a ne kao `if / else` - tako se ovaj slučaj reši sam od sebe.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int n; // values in the structure: one per cell, plus the sky and the ground
vector<int> parent;
vector<int> sz;
int components;

void createSets(){

    for(int i=0;i<n;i++){
        parent[i] = i; //everybody is their own root
        sz[i] = 1;
    }
}

int find(int x){

    if(parent[x] == x){ //x is a root, so x is the name of its set
        return x;
    }

    parent[x] = find(parent[x]); //path compression

    return parent[x];
}

void unite(int a, int b){

    a = find(a);
    b = find(b);

    if(a == b){ //already together, nothing to do
        return;
    }

    if(sz[a] < sz[b]){ //the smaller tree goes under the bigger one
        swap(a, b);
    }

    parent[b] = a;
    sz[a] += sz[b];

    components--;
}

bool same(int a, int b){
    return find(a) == find(b);
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        int side, m;
        cin>>side>>m;

        int SKY = side*side;        // one extra value joined to the whole top row
        int GROUND = side*side + 1; // and one joined to the whole bottom row

        n = side*side + 2;
        parent = vector<int>(n);
        sz = vector<int>(n);
        components = n;
        createSets();

        vector<char> one(side*side, 0); // which cells already hold a 1

        int dr[4] = {-1, 1, 0, 0};
        int dc[4] = {0, 0, -1, 1};

        int answer = -1;

        for(int step=1;step<=m;step++){

            int r, c;
            cin>>r>>c;

            int id = r*side + c;

            one[id] = 1;

            if(r == 0){
                unite(id, SKY);
            }
            if(r == side-1){
                unite(id, GROUND);
            }

            for(int d=0;d<4;d++){
                int nr = r + dr[d];
                int nc = c + dc[d];
                if(nr < 0 || nr >= side || nc < 0 || nc >= side){
                    continue;
                }
                if(one[nr*side + nc]){
                    unite(id, nr*side + nc);
                }
            }

            if(answer == -1 && same(SKY, GROUND)){
                answer = step;
            }
        }

        cout<<answer<<'\n';
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(m \cdot \alpha(n^2))$, što je u praksi $O(m)$.
Memorijska složenost je $O(n^2)$.
