
## Pristup

Ključno zapažanje je da do svakog polja možemo doći na samo dva načina: sa polja iznad njega, ili sa polja levo od njega.

Ako znamo najbolji mogući zbir za ta dva polja, najbolji zbir za trenutno polje je jednostavno bolji od ta dva, plus vrednost trenutnog polja.

To nam daje rekurzivnu formulu:

$$dp[i][j] = a[i][j] + max(dp[i-1][j], dp[i][j-1])$$

gde je $dp[i][j]$ najveći zbir puta od gornjeg levog ugla do polja $(i, j)$.

Tabelu popunjavamo odozdo naviše (bottom up), počevši od $dp[0][0] = a[0][0]$, red po red. Jedino na šta treba obratiti pažnju su ivice: do polja u prvom redu može se doći samo sleva, a do polja u prvoj koloni samo odozgo.

Rešenje je $dp[n-1][m-1]$.
## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    iostream::sync_with_stdio(false);
    cin.tie(0);

    int n, m;
    cin >> n >> m;

    vector<vector<int>> a(n, vector<int>(m));

    for(int i = 0; i < n; i++){
        for(int j = 0; j < m; j++){
            cin >> a[i][j];
        }
    }

    vector<vector<int>> dp(n, vector<int>(m, 0));
	
    for(int i = 0; i < n; i++){
        for(int j = 0; j < m; j++){
			
			if(i == 0 && j == 0){
				dp[i][j] = a[i][j];
				continue;
			}
			
            int best_prev = -1;

            if(i > 0) best_prev = max(best_prev, dp[i-1][j]); // dolazimo odozgo
            if(j > 0) best_prev = max(best_prev, dp[i][j-1]); // dolazimo sleva

            dp[i][j] = a[i][j] + best_prev;
        }
    }

    cout << dp[n-1][m-1];
}
```

(Ista ideja može se napisati i odozgo naniže: rekurzivna funkcija sa memoizacijom koja za polje $(i, j)$ poziva sebe za $(i-1, j)$ i $(i, j-1)$. Oba pristupa imaju istu složenost, ovde koristimo bottom up jer je jednostavniji.)
## Složenost

Vremenska složenost je $O(n*m)$, a memorijska složenost je $O(n*m)$.
