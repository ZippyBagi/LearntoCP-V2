
## Approach

#### Idea

Once we decide **in which order the colour blocks stand**, the tidy row is fully determined - and so is the cheapest way to reach it, because marbles of one colour are interchangeable and never need to cross each other.

So the whole problem is choosing an order for the colours. There are at most $20$ of them, and $20!$ orders is hopeless, but $2^{20}$ **subsets** is not. That is the usual trade: build the order left to right and remember only **which colours are already placed**, not how they were arranged among themselves.

$$dp[mask] = \text{fewest swaps to bring exactly the colours of } mask \text{ to the front}$$

We start from $dp[0] = 0$ and finish at $dp[\text{all colours}]$.

#### Counting the swaps

Neighbour swaps are counted by **inversions**: to reach a target row, we pay one swap for every pair of marbles whose relative order has to flip.

Take two colours $i$ and $j$ and suppose the finished row puts all of $j$ before all of $i$. Then every pair where an $i$ currently stands to the left of a $j$ must flip, and no other pair involving these two colours does. Their whole contribution is therefore one number, fixed before the dp begins:

$$cnt[i][j] = \text{pairs of marbles with colour } i \text{ somewhere before colour } j$$

One left-to-right pass fills the table: keep a running count of each colour seen so far, and when a marble of colour $c$ arrives, every earlier marble of colour $j$ forms one more such pair.

Now the transition writes itself. Appending colour $c$ to the block already built puts $c$ **after** every colour in $mask$, so we pay each of those crossings once:

$$dp[mask \cup \{c\}] \;\leftarrow\; dp[mask] + \sum_{j \in mask} cnt[c][j]$$

#### Edge cases

**Colours that never appear.** A row might use only $3$ of the $20$ colours, and a table over all $20$ would then be $2^{20}$ entries to walk instead of $2^3$. Renumbering the colours that actually occur into $0 \dots k-1$ costs one pass and makes every small input cheap.

**The answer does not fit in an `int`.** With $4 \cdot 10^5$ marbles the pair count reaches around $4 \cdot 10^{10}$, so `cnt`, the table and the answer are all `long long`.

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

        int n;
        cin>>n;

        vector<int> a(n);
        for(int i=0;i<n;i++){
            cin>>a[i];
            a[i]--;
        }

        // keep only the colours that actually occur, so the table is 2^k and not 2^20
        vector<int> id(20, -1);
        int k = 0;
        for(int i=0;i<n;i++){
            if(id[a[i]] == -1){
                id[a[i]] = k++;
            }
        }
        for(int i=0;i<n;i++){
            a[i] = id[a[i]];
        }

        // cnt[i][j] = pairs of marbles where colour i stands somewhere before colour j
        vector<vector<long long>> cnt(k, vector<long long>(k, 0));
        vector<long long> seen(k, 0);

        for(int i=0;i<n;i++){
            int c = a[i];
            for(int j=0;j<k;j++){
                cnt[j][c] += seen[j]; // every earlier marble of colour j pairs with this one
            }
            seen[c]++;
        }

        // dp[mask] = fewest swaps to put exactly the colours of mask at the front
        vector<long long> dp(1<<k, LLONG_MAX);
        dp[0] = 0;

        for(int mask=0;mask<(1<<k);mask++){

            if(dp[mask] == LLONG_MAX){
                continue;
            }

            for(int c=0;c<k;c++){

                if(mask & (1<<c)){ // colour c is already placed
                    continue;
                }

                long long add = 0;
                for(int j=0;j<k;j++){
                    if(mask & (1<<j)){
                        add += cnt[c][j]; // c must cross every c-before-j pair
                    }
                }

                int next = mask | (1<<c);
                dp[next] = min(dp[next], dp[mask] + add);
            }
        }

        cout<<dp[(1<<k)-1]<<'\n';
    }
    return 0;
}
```

## Complexity

Time $O(n \cdot k + 2^k \cdot k^2)$, where $k \le 20$ is the number of colours present
Memory $O(2^k + k^2)$
