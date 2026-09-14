>U ovoj lekciji upoznajemo grafove - strukturu koja stoji iza google mapa, mreža i ogromnog dela zadataka koje ćeš ikada rešavati.

Do sada su nam podaci bili niz vrednosti (vektor) ili pravougaonik vrednosti (matrica). I jedno i drugo radi zato što je oblik unapred poznat.

Ali pogledaj mapu puteva. Iz nekih gradova izlazi jedan put, iz nekih pet. Nema ni vrste ni kolone - jedino je važno **ko je sa kim povezan**.

To je **graf**, i čim ga jednom prepoznaš, počećeš da ga vidiš svuda: gradovi i putevi, ljudi i poznanstva, stranice i linkovi, stanja slagalice i potezi između njih.

### Čvorovi i grane

Graf čine dve stvari:

- **čvorovi** (en. vertex) - sami objekti, crtamo ih kao krugove
- **grane** (en. edge) - veze između njih, crtamo ih kao linije

Dva čvora spojena granom su **susedi**.

Broj grana koje izlaze iz jednog čvora zove se njegov **stepen**.

Kroz celo ovo poglavlje koristimo jedan isti graf: 7 gradova, spojenih putevima `1-2`, `1-3`, `2-4`, `2-5`, `3-6`, `5-7` i `6-7`.

	![[graph-running-example.png|Graf koji se koristi kroz celo poglavlje, sa 7 čvorova spojenih sa 7 grana 1-2, 1-3, 2-4, 2-5, 3-6, 5-7 i 6-7, gde je uz čvor 2 označeno da mu je stepen 3]]

Treba nam još nekoliko reči:

- **put** je niz čvorova u kome je svaki sused sledećeg: `1 2 5 7` je put
- **ciklus** je put koji se vraća tamo odakle je krenuo: `1 2 5 7 6 3 1`
- graf je **povezan** ako između svaka dva čvora postoji put

Kroz celo poglavlje `n` označava broj čvorova, a `m` broj grana.

### Vrste grafova

Zadaci opisuju grafove na različite načine, a iz formulacije se vidi koji tip imaš pred sobom:

- **Neusmeren** - grana radi u oba smera (put između dva grada).
- **Usmeren** - grana radi samo u jednom smeru (jednosmerna ulica, praćenje na društvenoj mreži).
- **Bez težina** - sve grane su iste (put je put).
- **Sa težinama** - svaka grana nosi neki broj (dužina, cena, vreme).

Celo ovo poglavlje radi sa neusmerenim grafovima bez težina. Sve odavde važi i za ostale vrste, uz sitne izmene koje ćemo uvesti kada za njih dođe vreme.

### Lista suseda

Graf treba da sačuvamo tako da lako odgovaramo na pitanje koje zaista i postavljamo: **ko su susedi čvora `v`?**

Odgovor je vektor vektora. `susedi[v]` je spisak suseda čvora `v`, i ništa više od toga.

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    int n, m;
    cin>>n>>m; //n gradova, m puteva

    vector<vector<int>> susedi(n+1); //susedi[v] čuva susede čvora v

    for(int i=0;i<m;i++){

        int u, v;
        cin>>u>>v;

        susedi[u].push_back(v);
        susedi[v].push_back(u); //put vodi u oba smera
    }

    for(int v=1;v<=n;v++){

        cout<<v<<": ";
        for(int i=0;i<susedi[v].size();i++){
            cout<<susedi[v][i]<<" ";
        }
        cout<<'\n';
    }

    return 0;
}
```
Input:
`7 7` - n i m
`1 2`
`1 3`
`2 4`
`2 5`
`3 6`
`5 7`
`6 7`
Output:
`1: 2 3`
`2: 1 4 5`
`3: 1 6`
`4: 2`
`5: 2 7`
`6: 3 7`
`7: 5 6`

Obrati pažnju na dve sitnice. Vektor pravimo veličine `n+1`, da bi čvor `1` stajao na indeksu `1` - skoro svi zadaci numerišu čvorove od jedinice, a ako se protiv toga boriš, samo praviš greške. I granu ubacujemo **dva puta**, po jednom u svakom smeru, jer je put neusmeren.

Memorija je **O(n + m)**, a nabrajanje suseda čvora `v` košta tačno onoliko koliko `v` ima suseda. Za ovaj zapis treba da posegneš kad god nemaš poseban razlog da uradiš drugačije.

### Matrica susedstva

Ponekad je pitanje drugačije: **postoji li grana između `u` i `v`?** Sa listom suseda to znači prolazak kroz `susedi[u]`. Sa matricom je jedno čitanje.

`g[u][v]` je prosto `true` kada grana postoji.

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    int n, m;
    cin>>n>>m;

    vector<vector<bool>> g(n+1, vector<bool>(n+1, false));

    for(int i=0;i<m;i++){

        int u, v;
        cin>>u>>v;

        g[u][v] = true;
        g[v][u] = true;
    }

    cout<<g[1][3]<<'\n'; //postoji li put između 1 i 3?
    cout<<g[1][4]<<'\n'; //a između 1 i 4?

    return 0;
}
```
Input:
`7 7` - istih 7 puteva kao gore
Output:
`1`
`0`

Cena je memorija. Matrica ima $n^2$ polja bez obzira na to da li graf ima milion grana ili tri, pa nas to ograničava na otprilike `n = 5000`. Uz to, ne može da nabroji susede čvora `v` a da ne prođe kroz svih `n` polja u tom redu.

	![[graph-list-vs-matrix.png|Isti graf sa 7 čvorova zapisan na dva načina, kao lista suseda sa 14 stavki i kao matrica susedstva 7 puta 7 sa 49 polja, od kojih je većina nula]]

| | Lista suseda | Matrica susedstva |
| ---- | ---- | ---- |
| Memorija | O(n + m) | O(n^2) |
| Susedi čvora `v` | O(stepen čvora v) | O(n) |
| Postoji li grana `u-v`? | O(stepen čvora u) | O(1) |
| Kada je koristimo | skoro uvek | `n` je malo, a graf gust |

>Napomena:
>Graf sa `n` čvorova može da ima najviše $\frac{n(n-1)}{2}$ grana. Kada je `m` blizu tog broja, kažemo da je graf **gust**, a kada je daleko ispod - što je uobičajen slučaj - graf je **redak**. Lista suseda je i pravljena za retke grafove, i zato skoro uvek pobeđuje.
