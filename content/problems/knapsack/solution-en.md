
## Approach

For every item there are two choices:

- **Pick the item** - if its weight fits in the remaining capacity, we gain its value but lose $w_i$ of capacity.
- **Skip the item** - we move on to the next one, keeping the capacity the same.

Two things change between subproblems: which items we have considered (from $0$ to $n$) and how much capacity we have (from $0$ to $W$). So we create a 2D array $dp$ of size $(n+1) \times (W+1)$, where $dp[i][j]$ stores the maximum value we can get **using the first $i$ items with a knapsack capacity of $j$**.

The base cases are the known entries: $dp[0][j] = 0$ (no items, no value) and $dp[i][0] = 0$ (no capacity). The remaining entries follow from the two choices:

$$dp[i][j] = max(dp[i-1][j],\ dp[i-1][j - w_i] + v_i)$$

where the second option is only allowed if $w_i \le j$. The answer is $dp[n][W]$.

### Example

For the items from the statement ($W = 5$), each row adds one more item $(w_i, v_i)$ into consideration:

|  | $j=0$ | $j=1$ | $j=2$ | $j=3$ | $j=4$ | $j=5$ |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| no items | 0 | 0 | 0 | 0 | 0 | 0 |
| + item $(4, 1)$ | 0 | 0 | 0 | 0 | 1 | 1 |
| + item $(5, 2)$ | 0 | 0 | 0 | 0 | 1 | 2 |
| + item $(1, 3)$ | 0 | 3 | 3 | 3 | 3 | 4 |
| + item $(3, 4)$ | 0 | 3 | 3 | 4 | 7 | 7 |

Check the last row at $j = 4$: skipping item $(3, 4)$ keeps the $3$ from the row above, while taking it gives its value $4$ plus the row above at capacity $4 - 3 = 1$, which is $4 + 3 = 7$. Taking wins. The answer is the bottom right corner: $7$.

### Memory optimization

Notice that row $i$ only depends on row $i-1$. So instead of the whole table, we can keep a single 1D array of size $W+1$, where after processing the first $i$ items, $dp[j]$ holds the best value for capacity $j$.

There is one trap: when updating with item $i$, we must iterate $j$ **from $W$ downwards**. That way $dp[j - w_i]$ still holds the value from the previous row (without item $i$) - if we iterated upwards, we could pick the same item twice.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    iostream::sync_with_stdio(false);
    cin.tie(0);

    int n, W;
    cin >> n >> W;

    vector<int> wt(n);
    vector<long long> val(n);

    for(int i = 0; i < n; i++){
        cin >> wt[i] >> val[i];
    }

    // dp[j] = maximum value achievable with capacity j,
    //         using the items processed so far
    vector<long long> dp(W + 1, 0);

    for(int i = 0; i < n; i++){

        // going from the back, so that dp[j - wt[i]] still holds
        // the result without the current item
        for(int j = W; j >= wt[i]; j--){
            dp[j] = max(dp[j], dp[j - wt[i]] + val[i]);
        }
    }

    cout << dp[W];
}
```

## Complexity

Time $O(n*W)$, Memory $O(W)$ (or $O(n*W)$ with the full 2D table)

Note that the complexity depends on the **value** of $W$, not just on the number of items - this is called *pseudo-polynomial* complexity, and it is the reason knapsack constraints always keep $W$ relatively small.
