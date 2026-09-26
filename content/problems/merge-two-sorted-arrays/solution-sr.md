
## Pristup

Prvo što pada na pamet je da se oba spiska prospu u jedan niz i pozove `sort`. Prolazi, ali se tako baca ono najvrednije što smo dobili: spiskovi su **već sortirani**. Kad se to iskoristi, poredak se sklapa iz prve, u jednom prolazu.

Zapitaj se ko ide prvi u konačnom poretku. To je najmanji poen od svih, a najmanji poen sortiranog spiska stoji na njegovom **početku** - znači u igri su samo $a_1$ i $b_1$, niko treći ne dolazi u obzir. Upiši pobednika, precrtaj ga i postavi isto pitanje nad onim što je preostalo.

To je tehnika dva pokazivača iz lekcije, po jedan pokazivač u svakom nizu:

- `i` - prvi poen iz grupe A koji još nije upisan;
- `j` - isto to za grupu B.

U svakom koraku uporedimo `a[i]` i `b[j]`, upišemo manji i pomerimo **samo onaj pokazivač od koga smo uzeli**. Pošto svaki korak smesti tačno jedan poen, gotovi smo nakon $m + n$ koraka - $O(m + n)$ umesto $O((m+n) \log (m+n))$.

**Pažnja:** petlja `while(i < m && j < n)` prekida se čim se jedan spisak isprazni, a u onom drugom po pravilu još nešto ostane. Ti poeni su najveći od svih i već su međusobno uređeni, pa ih dve kratke petlje samo prepišu na kraj. Upravo se tu najčešće greši - ostatak se zaboravi i deo odeljenja nestane iz poretka.

Jednaki poeni ne prave problem - kad je `a[i] == b[j]` uzimamo iz A, ali bi i uzimanje iz B dalo isti izlaz.

## Primer

Prvi test primer, $A = [1, 3, 5, 7]$ i $B = [2, 4, 5]$:

| `a[i]` | `b[j]` | uzimamo | poredak do sada |
|---|---|---|---|
| $1$ | $2$ | A: $1$ | $1$ |
| $3$ | $2$ | B: $2$ | $1\ 2$ |
| $3$ | $4$ | A: $3$ | $1\ 2\ 3$ |
| $5$ | $4$ | B: $4$ | $1\ 2\ 3\ 4$ |
| $5$ | $5$ | A: $5$ | $1\ 2\ 3\ 4\ 5$ |
| $7$ | $5$ | B: $5$ | $1\ 2\ 3\ 4\ 5\ 5$ |

Pogledaj peti red: oba spiska nude peticu, uzimamo onu iz A, dok B svoju čuva za sledeći korak - zato se u poretku i nađu dve. Posle poslednjeg reda grupa B je prazna, a sedmica još čeka u A, pa je petlja za ostatak dopisuje na kraj.

Na istom ovakvom objedinjavanju počiva i merge sort - srešćeš ga ponovo u lekciji Podeli, pa vladaj.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        int m, n;
        cin>>m>>n;

        vector<int> a(m), b(n);
        for(int i=0;i<m;i++){
            cin>>a[i];
        }
        for(int j=0;j<n;j++){
            cin>>b[j];
        }

        vector<int> c;
        c.reserve(m + n);

        int i = 0, j = 0;

        while(i < m && j < n){
            if(a[i] <= b[j]){
                c.push_back(a[i]);
                i++;
            }else{
                c.push_back(b[j]);
                j++;
            }
        }

        while(i < m){ // whatever is left of A
            c.push_back(a[i]);
            i++;
        }
        while(j < n){ // ... or of B - only one of these two loops ever runs
            c.push_back(b[j]);
            j++;
        }

        for(int k=0;k<m+n;k++){
            cout<<c[k]<<(k+1 < m+n ? ' ' : '\n');
        }
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(m + n)$.
Memorijska složenost je $O(m + n)$.
