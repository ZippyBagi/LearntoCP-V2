
## Pristup

Pročitaj pravilo nasleđivanja, ali porodične reči zameni onima iz teorije grafova: idi prvo kod najstarijeg deteta, a kada kod neke osobe više nema dece koju treba obići, vrati se kod roditelja i uzmi sledeće. To je opis **DFS**-a, od reči do reči. Redosled nasleđivanja je, dakle, redosled kojim pretraga u dubinu obilazi stablo, a mesto neke osobe je broj ljudi koje je pretraga obišla pre nje.

Zato dodeljuj brojač **na ulasku** u čvor:

~!
```c++
rank_of[v] = counter;
counter++;
```

Decu obilazimo redom kojim su pročitana, a postavka kaže da su navedena od najstarijeg ka najmlađem - dakle, sortirati ne treba ništa. Grane vode samo od roditelja ka detetu, pa se nazad ne može ni otići i `visited` niz nam ne treba.

Čvorovi nam stižu kao imena, pa `map<string, int>` svakom imenu dodeli broj čim ga prvi put vidi; dodeljeni broj je `children.size()`, uvek prvi slobodan indeks. Traženje po mapi košta $O(\log n)$ i odatle logaritam u složenosti.

Ni kralj nije naveden. On je jedina osoba koja se **nigde ne pojavljuje kao dete**, pa dok čitaš parove postavi zastavicu na svako dete - ko ostane bez nje, taj je koren.

**Pažnja:** kralj ne mora biti prvi, a parovi ne moraju biti grupisani po roditelju. Jedino što je zagarantovano jeste da deca jednog roditelja među sobom zadržavaju redosled - a to nam je i dovoljno, jer ubacivanje onim redom kojim linije stižu preživljava bilo kakvo mešanje.

## Primer

Pretraga obilazi porodicu ovim redom, a to je sam redosled nasleđivanja:

| mesto | ime | mesto | ime |
|---|---|---|---|
| $0$ | Elisabeth | $10$ | Edward |
| $1$ | Charles | $11$ | James |
| $2$ | William | $12$ | Louise |
| $3$ | George | $13$ | Anne |
| $4$ | Charlotte | $14$ | Peter |
| $5$ | Louis | $15$ | Savannah |
| $6$ | Harry | $16$ | Isla |
| $7$ | Andrew | $17$ | Zara |
| $8$ | Beatrice | $18$ | Mia |
| $9$ | Eugenie | | |

Isprati zaron. Od Elisabeth pretraga ide na Charlesa ($1$), od njega na Williama ($2$), a od Williama na njegovo troje dece redom kojim su navedena - $3$, $4$, $5$. Tek tada je William gotov, pa se pretraga vraća kod Charlesa po Harryja na $6$, a onda skroz do Elisabeth po Andrewa na $7$.

Proveri Louise, na mestu $12$. Ona je drugo Edwardovo dete, a Edward je na $10$, pa njegova loza zauzima $10$, $11$ i $12$ - iza svih Charlesovih i Andrewovih potomaka, ali ispred cele Annine grane. Mesto neke osobe zavisi od cele porodice koja joj prethodi, a ne od toga koliko je duboko u stablu.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

void dfs(int v, vector<vector<int>>& children, vector<int>& rank_of, int& counter) {

    rank_of[v] = counter;
    counter++;

    for(int i=0;i<children[v].size();i++) { // oldest child first, then all of his line
        dfs(children[v][i], children, rank_of, counter);
    }
}

int main() {
    iostream::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;

    while(t--) {

        int n;
        cin >> n;

        map<string, int> id;          // a name gets a number the first time we see it
        vector<vector<int>> children; // children[v], oldest first - the order they were read in
        vector<bool> isChild;

        for(int i=0;i<n-1;i++) {

            string a, b;
            cin >> a >> b;

            if(id.count(a) == 0) { id[a] = children.size(); children.push_back(vector<int>()); isChild.push_back(false); }
            if(id.count(b) == 0) { id[b] = children.size(); children.push_back(vector<int>()); isChild.push_back(false); }

            children[id[a]].push_back(id[b]);
            isChild[id[b]] = true; // b has a parent, so b is not the king
        }

        int root = 0;
        for(int v=0;v<n;v++) if(!isChild[v]) root = v; // the one nobody fathered

        vector<int> rank_of(n, 0); // rank_of[v] is v's place in the line of succession
        int counter = 0;

        dfs(root, children, rank_of, counter);

        int q;
        cin >> q;

        for(int i=0;i<q;i++) {

            string name;
            cin >> name;

            cout << name << " " << rank_of[id[name]] << "\n";
        }
    }

    return 0;
}
```

## Složenost

Vremenska složenost je $O((n + q) \log n)$.
Memorijska složenost je $O(n)$.
