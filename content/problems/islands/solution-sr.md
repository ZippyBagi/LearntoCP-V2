
## Pristup

Spisak grana nam niko nije dao, ali graf je ipak tu: **svako polje kopna je čvor, a dva polja spaja grana kada su jedno uz drugo gore, dole, levo ili desno**. Ostrvo je onda komponenta povezanosti, pa je ovo isto ono prebrojavanje komponenti iz lekcije, samo što usput merimo i veličinu.

Listu suseda ne moramo ni da napravimo. Susedi polja u vrsti $row$ i koloni $col$ su prosto četiri polja oko njega:

$$(row-1, col), \quad (row+1, col), \quad (row, col-1), \quad (row, col+1)$$

pa umesto da prolazi kroz `adj`, pretraga zove samu sebe četiri puta, jednom za svaki smer. Dijagonale među njima nema, i u tome je cela zamka iz primera.

### Zaustavljanje pretrage

Šetnju zaustavljaju dve stvari: voda i ivica snimka. Ako obe provere staviš na **početak** `dfs`-a, četiri poziva ostaju kratka - poziv smeš da napraviš nad bilo kojim poljem, a on jednostavno ne uradi ništa kad nema šta da se radi.

~!
```c++
if(row < 0 || row >= n || col < 0 || col >= m) return 0; // van snimka
if(grid[row][col] != '#' || visited[row][col]) return 0; // voda, ili već prebrojano
```

Redosled je bitan: granice moraju **prve**, jer je `grid[row][col]` za vrstu $-1$ već greška.

### Merenje ostrva

`dfs` vraća koliko je polja prebrojao. Na kopnu je to jedinica za polje na kom stojimo, plus ono što četiri poziva jave nazad:

~!
```c++
int size = 1;                             // ovo polje
size += dfs(row - 1, col, grid, visited); // gore
```

Na vodi i na već prebrojanom kopnu vraća nulu, iz provera odozgo. Ta nula nam olakšava prolazak kroz snimak: pozovi `dfs` na svakom polju, a svaki put kad odgovor nije nula, naišao si na novo ostrvo.

~!
```c++
int size = dfs(row, col, grid, visited);

if(size > 0) {
    islands++;
    largest = max(largest, size);
}
```

**Pažnja:** `visited[row][col] = true` mora **pre** četiri poziva, a ne posle. Polje iznad nas nas vidi kao svog suseda ispod, pa ako obeležavaš kasno, pretraga se odmah vrati tamo odakle je došla i vrti se u krug.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

int dfs(int row, int col, vector<string>& grid, vector<vector<bool>>& visited) {

    int n = grid.size(), m = grid[0].size();

    if(row < 0 || row >= n || col < 0 || col >= m) return 0; // outside the photo
    if(grid[row][col] != '#' || visited[row][col]) return 0; // water, or already counted

    visited[row][col] = true; // before the calls, so they cannot come back here

    int size = 1; // this square

    size += dfs(row - 1, col, grid, visited); // up
    size += dfs(row + 1, col, grid, visited); // down
    size += dfs(row, col - 1, grid, visited); // left
    size += dfs(row, col + 1, grid, visited); // right

    return size;
}

int main() {
    iostream::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;

    while(t--) {

        int n, m;
        cin >> n >> m;

        vector<string> grid(n);
        for(int i=0;i<n;i++) cin >> grid[i];

        vector<vector<bool>> visited(n, vector<bool>(m, false));

        int islands = 0, largest = 0;

        for(int row=0;row<n;row++) {
            for(int col=0;col<m;col++) {

                int size = dfs(row, col, grid, visited); // 0 if water, or land we already counted

                if(size > 0) { // nobody had reached this island before
                    islands++;
                    largest = max(largest, size);
                }
            }
        }

        cout << islands << " " << largest << "\n";
    }

    return 0;
}
```

I BFS nalazi iste komponente, samo se veličina tada broji dok polja izlaze iz reda, umesto da je pozivi vrate.

## Složenost

Vremenska složenost je $O(n \cdot m)$.
Memorijska složenost je $O(n \cdot m)$.
