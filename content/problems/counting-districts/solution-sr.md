
## Pristup

Prvo što pada na pamet - ispisati svaku grupu gradova pa odbaciti one koje nisu povezane - ne dolazi u obzir. Jedan jedini grad na koji je zakačeno još $999$ njih ima 139-cifren broj oblasti od najviše $100$ gradova. Njih dakle moramo da izbrojimo a da nijednu ne ispišemo, i baš na to nas modul u izlazu i podseća.

Proglasimo grad $1$ korenom, kao u lekciji. Svaka oblast sada ima svoj **najviši grad**, onaj najbliži korenu, i takav je uvek samo jedan: put između dva grada iste oblasti ide preko njihovog zajedničkog pretka, a taj predak mora i sam biti u oblasti, i stoji iznad oba - pa oba ne mogu biti najviša. Zato možemo za svaki grad $v$ da izbrojimo oblasti kojima je baš $v$ najviši, i tako svaku oblast obuhvatiti tačno jednom.

Oblast kojoj je $v$ najviši grad cela staje u podstablo grada $v$ i sadrži $v$. Odatle i stanje:

$cnt[v][j]$ - koliko ima oblasti od **tačno $j$ gradova** koje leže u podstablu grada $v$ i sadrže $v$.

Za list je to lako: jedina takva oblast je on sam, pa je $cnt[v][1] = 1$.

### Dete po dete

Decu grada $v$ obrađujemo jedno po jedno. Neka je nekoliko njih već obrađeno i neka $cnt[v][a]$ broji oblasti od $a$ gradova sklopljene od $v$ i te dece. Kad na red dođe novo dete $c$, biramo jedno od dvoga:

- **Iz $c$ ne uzimamo ništa.** Oblast se na toj strani zaustavlja u $v$ i ostaje joj istih $a$ gradova.
- **Iz podstabla deteta $c$ uzimamo komad u kome je i sam grad $c$.** Grad $c$ mora da bude u njemu: iz $v$ u to podstablo vodi jedino put do $c$, pa komad bez $c$ ničim ne bi dodirivao $v$ i oblast bi se prekinula. Takvih komada od $b$ gradova ima $cnt[c][b]$.

**Odatle i $a + b$.** U oblasti koju držimo je $a$ gradova - sam $v$ i gradovi iz već obrađene dece. U komadu iz $c$ je $b$ gradova, a svi oni leže u podstablu deteta $c$, pa nijedan grad ne može da bude i tu i tamo. Kad to dvoje spojimo, u novoj oblasti stoji tačno $a + b$ gradova. Uz to, svaka od $cnt[v][a]$ starih oblasti sme da uzme bilo koji od $cnt[c][b]$ komada, pa taj par veličina daje $cnt[v][a] \cdot cnt[c][b]$ novih oblasti od $a + b$ gradova:

$$new[a] = new[a] + cnt[v][a]$$
$$new[a+b] = new[a+b] + cnt[v][a] \cdot cnt[c][b]$$

Prva jednakost se primeni po jednom za svaku veličinu $a$ koju držimo, a druga po jednom za svaki par veličina - to su tačno dve ugnežđene petlje u kodu, `nxt[a] += cnt[a]` i `nxt[a+b] += cnt[a] * sub[b]`.

Uhvatimo to na delu u gradu $1$ iz primera ispod, i to u trenutku kad je grad $2$ već obrađen a grad $3$ još nije. Držimo jednu oblast od $2$ grada ($\{1,2\}$) i dve od $3$ grada ($\{1,2,4\}$ i $\{1,2,5\}$), a grad $3$ nudi jedan komad od jednog grada. U $new[3]$ tada uđe dvojka iz prve jednakosti - te dve trogradske oblasti prosto zaobiđu grad $3$ - i još $1 \cdot 1$ iz druge, za $a = 2$ i $b = 1$: $\{1,2\}$ spojeno sa $\{3\}$. To je poslednja vrsta u tabeli ispod: $[1, 1, 2]$ ulazi, $[1, 2, 3]$ izlazi.

Kad su sva deca obrađena, dodaj $cnt[v][1] + cnt[v][2] + \dots + cnt[v][K]$ na rešenje i vrati $cnt[v]$ roditelju.

### Sečenje vrsta na $K$

Prebrojimo množenja. Pri spajanju u gradu $v$ svaka veličina s jedne strane se pomnoži sa svakom s druge, a preko celog stabla ti parovi nisu ništa drugo do parovi gradova - svaki par se pomnoži tačno jednom, u svom najvišem zajedničkom gradu, i nigde više. Ako ništa ne preduzmemo, to je $\frac{n(n-1)}{2}$ množenja, dakle $O(n^2)$.

Ali u oblast ne sme da uđe više od $K$ gradova, pa nam sve preko $K$ i ne treba, a rešava ga jedan jedini $\min$: odseci svaku `cnt` vrstu na $\min(\text{veličina podstabla}, K)$. Sada nijedna strana spajanja nije duža od $K$, pa isto brojanje parova daje $O(n \cdot K)$.

Ovde oboje staje u ograničenja, jer $n$ ide samo do $1000$, pa to nije razlika između prolaza i pada. Razlika je u tome što isti kod ostaje brz i na sto puta većem stablu, a plaća se jednim $\min$ više.

**Pažnja:** i `cnt[a]` i `sub[b]` su već svedeni po modulu, pa je svaki manji od $10^9 + 7$ - ali njihov proizvod ide do $10^{18}$, a toliko `int` ne može da primi. Množi u `long long` pa odmah svedi po modulu.

## Primer

Prvi test primer, uz $K = 3$ i koren u gradu $1$:

```
    1
   / \
  2   3
 / \
4   5
```

Vrstu jednog grada zapisujemo kao $[cnt[v][1], cnt[v][2], cnt[v][3]]$. Deca se završavaju pre roditelja, pa listovi i spajanja idu ovim redom:

| u gradu | uklapa se | dotad | vrsta deteta | posle | šta je napravila linija $a + b$ |
| ---- | ---- | ---- | ---- | ---- | ---- |
| $4$ | - | - | - | $[1, 0, 0]$ | zasad ništa - list počinje kao $\{4\}$ |
| $5$ | - | - | - | $[1, 0, 0]$ | isto tako, $\{5\}$ |
| $2$ | grad $4$ | $[1, 0, 0]$ | $[1, 0, 0]$ | $[1, 1, 0]$ | $\{2,4\}$, iz $a = 1$ i $b = 1$ |
| $2$ | grad $5$ | $[1, 1, 0]$ | $[1, 0, 0]$ | $[1, 2, 1]$ | $\{2,5\}$ iz $a = 1$, i $\{2,4,5\}$ iz $a = 2$ |
| $3$ | - | - | - | $[1, 0, 0]$ | još jedan list, $\{3\}$ |
| $1$ | grad $2$ | $[1, 0, 0]$ | $[1, 2, 1]$ | $[1, 1, 2]$ | $\{1,2\}$ iz $b = 1$, pa $\{1,2,4\}$ i $\{1,2,5\}$ iz $b = 2$ |
| $1$ | grad $3$ | $[1, 1, 2]$ | $[1, 0, 0]$ | $[1, 2, 3]$ | $\{1,3\}$, i $\{1,2,3\}$ iz $a = 2$ |

U poslednjoj koloni stoji samo ono što je lepljenje napravilo. Sve iz kolone **dotad** ostaje i dalje tu, jer to baš prepisuje ona druga linija - oblasti koje novo dete zaobilaze. Tako grad $2$ kroz drugo spajanje zadrži $\{2,4\}$, a gradu $1$ u poslednjoj vrsti ostaju obe trogradske oblasti sa kojima je u nju i ušao.

Pogledaj pažljivo spajanje u kome grad $1$ uklapa grad $2$. U vrsti deteta stoji i jedna trogradska oblast, $\{2,4,5\}$, ali bi njeno uzimanje značilo $a = 1$ uz $b = 3$, a $4$ grada su preko $K$ - pa ona u vrstu nikada i ne uđe. To je sečenje iz prethodnog odeljka, na stablu od pet gradova.

Gotova vrsta ide pravo u rešenje: gradovi $3$, $4$ i $5$ daju po $1$, grad $2$ daje $1 + 2 + 1 = 4$, a grad $1$ daje $1 + 2 + 3 = 6$. Sve zajedno $1 + 1 + 1 + 4 + 6 = 13$, baš kao u izlazu.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

const int MOD = 1e9 + 7;

int n, k;
vector<vector<int>> adj;
long long answer;

void addEdge(int u, int v){
    adj[u].push_back(v);
    adj[v].push_back(u);
}

//returns cnt, where cnt[j] is the number of districts of exactly j cities that
//lie inside the subtree of v and contain v itself
vector<long long> dfs(int v, int p){

    vector<long long> cnt(2, 0);
    cnt[1] = 1; //the district that is only v

    for(int i=0;i<adj[v].size();i++){

        int to = adj[v][i];

        if(to == p){ //the only edge leading back is the one we came from
            continue;
        }

        vector<long long> sub = dfs(to, v);

        int lim = min((int)(cnt.size() + sub.size() - 2), k); //nothing above k is ever needed
        vector<long long> nxt(lim + 1, 0);

        for(int a=1;a<cnt.size();a++){

            nxt[a] = (nxt[a] + cnt[a]) % MOD; //take nothing from this child

            for(int b=1;b<sub.size() && a + b <= lim;b++){
                nxt[a+b] = (nxt[a+b] + cnt[a] * sub[b]) % MOD; //glue the two pieces together
            }
        }

        cnt = nxt;
    }

    for(int j=1;j<cnt.size();j++){
        answer = (answer + cnt[j]) % MOD; //every district is counted at its topmost city
    }

    return cnt;
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        cin>>n>>k;

        adj = vector<vector<int>>(n + 1); // a fresh tree for every testcase

        for(int i=0;i<n-1;i++){
            int u, v;
            cin>>u>>v;
            addEdge(u, v);
        }

        answer = 0;
        dfs(1, 0); //root the tree at city 1

        cout<<answer<<'\n';
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(n \cdot K)$
Memorijska složenost je $O(n \cdot K)$

Memoriju troši rekurzija: na svakom nivou stabla stoji po jedna vrsta od najviše $K + 1$ brojeva, a stablo ume da bude i običan put. Na granicama je to $10^5$ brojeva, daleko ispod ograničenja.
