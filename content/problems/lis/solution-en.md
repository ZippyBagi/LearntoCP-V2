
## Approach

### Finding the length

First we need to realize that any element alone forms a subsequence of length $1$.

Then we define $dp[i]$ as the length of the longest rising subsequence that **starts** at position $i$. From element $i$ we can jump to any **later** element that is **bigger**, and continue from there - so the best we can do is take the jump with the longest continuation:

$$dp[i] = 1 + max(dp[j]) \quad \text{for all } j > i \text{ where } a[j] > a[i]$$

If there is no such element, $dp[i] = 1$ (the subsequence ends here). Since every $dp[i]$ only depends on values to its **right**, we compute the array from right to left.

For our example this gives:

| $a_i$ | 3 | 6 | 1 | 2 | 8 | 2 | 4 | 5 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| $dp_i$ | 3 | 2 | 4 | 3 | 1 | 3 | 2 | 1 |

Check a few by hand: the $1$ has $dp = 4$ because $1, 2, 4, 5$ starts there, and the $6$ has $dp = 2$ because the only thing bigger after it is the $8$.

The length of the LIS is the biggest value in the table: $k = 4$.

(You will more often see the mirrored definition, "the LIS **ending** at position $i$", computed left to right - both are equally valid. We use this one because it makes the reconstruction below very natural.)

### Reconstructing the lexicographically smallest LIS

The $dp$ table is like a map: an element with $dp[i] = 4$ is a place where 4 more elements can still be chosen, and after it we need an element with $dp = 3$, then $dp = 2$, and so on. So we build the answer left to right, and at every step the candidates are the elements that come **after** the previously chosen one, are **bigger** than it, and have the **right $dp$ value**. Among the candidates we always pick the smallest - that is exactly what "lexicographically smallest" means.

For our example:

| We need | Candidates | We pick |
|:---:|:---:|:---:|
| $dp = 4$ | $1$ | $1$ |
| $dp = 3$, after the $1$, bigger than $1$ | $2, 2$ | $2$ (the first one) |
| $dp = 2$, after that $2$, bigger than $2$ | $4$ | $4$ |
| $dp = 1$, after the $4$, bigger than $4$ | $5$ | $5$ |

The answer is $1\ 2\ 4\ 5$.

Why is picking the smallest always safe? Because the $dp$ value itself is a **guarantee**: $dp[i] = 3$ means a rising continuation of 3 elements really exists from there, so we can never get stuck.

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

    // dp[i] = length of the longest strictly increasing subsequence starting at i
    vector<int> dp(n, 1);

    for(int i = n - 1; i >= 0; i--){
        for(int j = i + 1; j < n; j++){
            if(a[j] > a[i]){
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
    }

    int k = *max_element(dp.begin(), dp.end()); // a handy c++ function, can be replaced with a for loop

    cout << k << '\n';

    // greedy reconstruction of the lexicographically smallest LIS
    int pos = -1;               // index of the previously chosen element
    long long last = LLONG_MIN; // value of the previously chosen element

    for(int need = k; need >= 1; need--){

        int best = -1;

        for(int i = pos + 1; i < n; i++){
            if(dp[i] == need && a[i] > last){
                if(best == -1 || a[i] < a[best]){
                    best = i;
                }
            }
        }

        cout << a[best] << " ";

        pos = best;
        last = a[best];
    }
}
```

## Complexity

Time $O(n^2)$
Memory $O(n)$

For larger inputs there is a faster, $O(n \log n)$ way to find the length of the LIS - check out the problem [Longest Increasing Subsequence II](/en/Problems/lis-2).
