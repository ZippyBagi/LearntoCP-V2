
## Pristup

Rešenje je jednostavno i direktno. Za svako polje matrice proverimo sva susedna polja i prebrojimo koliko se bombi nalazi oko njega.

Nakon što proverimo svih 8 smerova, broj bombi za to polje biće jednak vrednosti brojača.

Jedini nezgodan deo je voditi računa da ne izađemo van granica matrice. Na primer, potrebno je proveriti da li `i-1` postoji pre nego što pokušamo da pristupimo tom polju.
## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    iostream::sync_with_stdio(false);
    cin.tie(0);

    int m,n;
    cin>>m>>n;

    vector<vector<int>> a(m, vector<int>(n));

    for(int i =0;i<m;i++){
        for(int j = 0; j< n;j++){
            cin>>a[i][j];
        }
    }

    vector<vector<int>> ans(m, vector<int>(n));

    for(int i =0;i<m;i++){
        for(int j = 0; j< n;j++){

            int number_of_bombs = 0;

            if(i - 1 >= 0) number_of_bombs += a[i-1][j]; //left
            if(i + 1 < m) number_of_bombs += a[i+1][j]; //right
            if(j - 1 >= 0) number_of_bombs += a[i][j-1]; //down
            if(j + 1 < n) number_of_bombs += a[i][j+1]; //up

            if(i-1 >= 0 && j-1 >= 0) number_of_bombs += a[i-1][j-1]; //left-down
            if(i-1 >= 0 && j+1 < n) number_of_bombs += a[i-1][j+1]; //left-up
            if(i+1 < m && j-1 >= 0) number_of_bombs += a[i+1][j-1]; //right-down;
            if(i+1 < m && j+1 < n) number_of_bombs += a[i+1][j+1]; //right-up

            ans[i][j] = number_of_bombs;
        }
    }

    for(int i =0;i<m;i++){
        for(int j = 0; j< n;j++){
            cout<<ans[i][j]<<" ";
        }
        cout<<'\n';
    }
}
```

## Složenost

Vremenska složenost je $O(m*n)$, a memorijska složenost je $O(n*m)$.