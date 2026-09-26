
## Approach

A bonus depends on which dish came **immediately before**, so knowing which dishes are already eaten is not enough - the state has to remember the last one too, giving $dp[mask][last]$: the best enjoyment from a meal that used exactly the dishes in $mask$ and finished on $last$. 

Extending it means picking any dish $i$ not yet in $mask$ and paying $a_i$ plus the bonus $adj[last][i]$.

So each of the $2^n \cdot n$ states tries $n$ continuations - $O(2^n \cdot n^2)$, which at $n = 18$ is about $8 \cdot 10^7$.

Since every $a_i$ and every bonus is non-negative, a longer meal is never worse, so taking the running maximum over all states of size up to $m$ gives the same answer as insisting on exactly $m$.

**Careful:** $18$ dishes and $17$ bonuses at $10^9$ each reach $3.5 \cdot 10^{10}$, so the table and the answer are `long long`.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    cin.tie(0);
    iostream::sync_with_stdio(false);

    int t;
    cin>>t;

    while(t--){

        int n, m, k;
        cin>>n>>m>>k;

        vector<long long> a(n);
        for(int i=0;i<n;i++){
            cin>>a[i];
        }

        vector<vector<long long>> adj(n, vector<long long>(n, 0)); // adj[x][y] = bonus for y right after x

        for(int i=0;i<k;i++){
            long long x, y, z;
            cin>>x>>y>>z;
            x--;
            y--;
            adj[x][y] = z;
        }

        vector<vector<long long>> dp(1<<n, vector<long long>(n, -1)); // -1 means unreachable

        long long ans = 0;

        for(int i=0;i<n;i++){ // a meal that starts with dish i
            dp[1<<i][i] = a[i];
            ans = max(ans, a[i]);
        }

        for(int mask=1;mask<(1<<n);mask++){

            int cnt = __builtin_popcountll(mask);

            if(cnt >= m){ // already a full order, nothing more may be added
                continue;
            }

            for(int last=0;last<n;last++){

                if(dp[mask][last] == -1){
                    continue;
                }

                for(int i=0;i<n;i++){

                    if(mask & (1<<i)){ // dish i is already on the table
                        continue;
                    }

                    int new_mask = mask | (1<<i);

                    dp[new_mask][i] = max(dp[new_mask][i], dp[mask][last] + a[i] + adj[last][i]);

                    ans = max(ans, dp[new_mask][i]);
                }
            }
        }

        cout<<ans<<'\n';
    }
    return 0;
}
```

## Complexity

Time $O(2^n \cdot n^2)$
Memory $O(2^n \cdot n)$
