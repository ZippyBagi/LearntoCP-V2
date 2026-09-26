
## Approach

The key observation is that there are only two ways to enter any field: from the field above it, or from the field to its left.

So if we know the best possible sum for reaching those two fields, the best sum for reaching the current field is simply the better of the two, plus the value of the current field.

This gives us the recursive formula:

$$dp[i][j] = a[i][j] + max(dp[i-1][j], dp[i][j-1])$$

where $dp[i][j]$ is the maximum sum of a path from the upper left corner to the field $(i, j)$.

We fill the table bottom up, starting from $dp[0][0] = a[0][0]$, and going row by row. The only thing to be careful about are the edges: fields in the first row can only be entered from the left, and fields in the first column only from above.

The answer is $dp[n-1][m-1]$.
## Code

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

(The same idea can also be written top down: a recursive function with memoization that, for the field $(i, j)$, calls itself for $(i-1, j)$ and $(i, j-1)$. Both run in the same complexity, we use bottom up as it is simpler here.)
## Complexity

Time $O(n*m)$
Memory $O(n*m)$
