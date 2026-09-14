> U ovoj lekciji pričaćemo o matricama — odnosno vektorima vektora

### Teorija

Matrice su dvodimenzionalni nizovi.  Možemo ih zamisliti kao mrežu polja, gde svako polje čuva neku vrednost.

Matrica se označava kao `A x B`, gde `A` i `B` predstavljaju njene dimenzije.

Na primer, matrica dimenzije `3x3` izgleda ovako:

	![[matrix.png|Kvadratna matrica 3x3 u zagradama, sa redovima 6 2 7, 8 1 5 i 3 4 2]]

Matrica se sastoji od redova i kolona.

Ako gledamo primer iznad, redovi su: `[6, 2, 7]`, `[8, 1, 5]`, `[3, 4, 2]`

Kolone su: `[6, 8, 3]`, `[2, 1, 4]`, `[7, 5, 2]`
### Implementacija

Matrica sa **n** redova i **m** kolona piše se ovako:

`vector<vector<tip_podatka>> ime_matrice(n, vector<tip_podatka>(m, pocetna_vrednost));`

Hajde da rastavimo ovo na delove:

- `vector<vector<tip_podatka>>` — način na koji deklarišemo matricu
- `ime_matrice` — ime matrice
- `n` — broj redova koje matrica ima
- `vector<data_type>(m, default_value)` — opisuje kako izgleda svaki red matrice, odnosno vektor sa `m` elemenata

Elementu koji se nalazi u **i-tom** redu i **j-toj** koloni pristupamo pomoću: `a[i][j]`

Baš kao i kod običnih vektora, matrice su podrazumevano indeksirane od 0.  To znači da se element u drugom redu i trećoj koloni nalazi na poziciji `a[1][2]`.

Primer koda koji prikazuje `i` i `j` vrednosti svakog polja:

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    cin.tie(0);
    ios_base::sync_with_stdio(false);

    int n = 3;
    int m = 4;

    vector<vector<string>> a(n, vector<string>(m)); //inicijalizujemo matricu

    for(int i=0;i<n;i++){ //prolazimo kroz svaki red
        for(int j=0;j<m;j++){ //prolazimo kroz svaku kolonu u redu
        
            a[i][j] = "(" + to_string(i) + ", " + to_string(j) + ")"; //to_string pretvara broj u string, ostatak je samo formatiranje
        
        }
    }

    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            cout<<a[i][j]<<" ";
        }
        cout<<'\n'; //newline karakter (isto kao Enter)
    }

    return 0;
}
```

Output:

`(0, 0) (0, 1) (0, 2) (0, 3)`  
`(1, 0) (1, 1) (1, 2) (1, 3)`  
`(2, 0) (2, 1) (2, 2) (2, 3)`