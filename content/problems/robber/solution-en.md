
## Approach

For every house we have two choices: rob it, or skip it.

- If we rob it, we get its money, but we are not allowed to rob the previous house.
- If we skip it, the best we can do is whatever was best up to the previous house.

To compute this efficiently we use an array $dp[i]$, which stores the maximum amount of money we can steal from the **first $i$ houses**. The choice above translates directly into the formula:

$$dp[i] = max(a[i-1] + dp[i-2],\ dp[i-1])$$

The first option is "rob house $i$" (its money plus the best result while skipping the neighbor), and the second is "skip house $i$".

The base cases are $dp[0] = 0$ (no houses) and $dp[1] = a[0]$ (only one house, rob it). The answer is $dp[n]$.

**Careful:** with $n$ up to $2 \cdot 10^5$ and values up to $10^9$, the answer can reach around $10^{14}$, which doesn't fit in an `int` - we have to use `long long`.

## Example

For the houses from the statement, $2\ 7\ 9\ 3\ 1$:

| houses considered | 0 | 1 | 2 | 3 | 4 | 5 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| new house | - | 2 | 7 | 9 | 3 | 1 |
| $dp_i$ | 0 | 2 | 7 | 11 | 11 | 12 |

Check two entries: for the house with $9$, robbing it gives $9 + dp[1] = 11$ and skipping it gives $7$, so $dp[3] = 11$. For the house with $3$, robbing gives $3 + dp[2] = 10$, skipping gives $11$ - here skipping is better, so $dp[4]$ stays $11$.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    iostream::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;

    vector<long long> a(n);
    for(int i = 0; i < n; i++){
        cin >> a[i];
    }

    vector<long long> dp(n + 1, 0);

    dp[0] = 0;
    dp[1] = a[0];

    for(int i = 2; i <= n; i++){
        // the maximum between robbing house i (and skipping the neighbor)
        // or skipping house i
        dp[i] = max(a[i-1] + dp[i-2], dp[i-1]);
    }

    cout << dp[n];
}
```

## Bonus: O(1) memory

Notice that to compute $dp[i]$ we only ever need the previous **two** values. So instead of keeping the whole array, we can keep just two variables and update them as we go:

~!
```cpp
long long secondLast = 0, last = a[0];

for(int i = 1; i < n; i++){
    long long res = max(a[i] + secondLast, last);
    secondLast = last;
    last = res;
}

// the answer is in `last`
```

This is a common trick: whenever a DP formula only looks a fixed number of steps back, the memory can be reduced this way.

## Complexity

Time $O(n)$, Memory $O(n)$ (or $O(1)$ with the optimization)
