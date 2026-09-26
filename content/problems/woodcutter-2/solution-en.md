
## Approach

The binary search from [Woodcutter](/en/Problems/woodcutter) still finds the answer: if a saw height gives enough wood, every lower height does too, so we look for the last height that works.

What breaks is the price of one `check`. Walking over all $n$ trees costs $O(n)$, and now we pay it $\log H \approx 30$ times **per order** - up to $10^5 \cdot 10^5 \cdot 30$ steps. The search stays, the check has to get faster.

### Which trees does the saw reach?

Only the trees taller than the blade. If we **sort** the heights, those trees are always a **suffix** of the sorted array - everything from the first tree of height $\ge h$ to the end. That first position is exactly 
what `lower_bound` returns, in $O(\log n)$:

~!
```cpp
int idx = lower_bound(a.begin(), a.end(), h) - a.begin();
```

Trees of height exactly $h$ may or may not be included - they give $h - h = 0$ meters either way.

### How much wood is that?

Each of the $n - idx$ trees in the suffix gives its height minus $h$, so

$$wood(h) = (a_{idx} + a_{idx+1} + \dots + a_{n-1}) - h \cdot (n - idx)$$

The sum in brackets is a suffix sum, and suffix sums come from **prefix sums**: with $psum[i]$ holding the sum of the first $i$ sorted heights, it is $psum[n] - psum[idx]$. That makes the whole check $O(\log n)$.

Sorting and the prefix sums are built once per forest, and all $q$ orders reuse them.

**Careful:** $10^5$ trees of $10^9$ meters add up to $10^{14}$, and $h \cdot (n - idx)$ reaches the same size - far past what an `int` holds. The heights, the prefix sums, the ordered amounts and everything inside the check must be `long long`.

## Example

Sorted, the first forest is $[14, 19, 21, 22, 24]$ with $psum = [0, 14, 33, 54, 76, 100]$. Here is the final `check` of each of the three orders - the one at the answer itself:

| order $x$ | answer $h$ | `idx` | suffix sum | trees cut | wood |
|---|---|---|---|---|---|
| $14$ | $18$ | $1$ | $86$ | $4$ | $86 - 18 \cdot 4 = 14$ |
| $40$ | $12$ | $0$ | $100$ | $5$ | $100 - 12 \cdot 5 = 40$ |
| $1$ | $23$ | $4$ | $24$ | $1$ | $24 - 23 \cdot 1 = 1$ |

Take the first row: `lower_bound` for $18$ lands on the $19$ at position $1$, so four trees get cut, together $100 - 14 = 86$ meters tall, and the saw leaves $18$ meters of each standing - $86 - 72 = 14$ meters of wood. One meter higher the same four trees would give only $10$, which is why $18$ is the answer.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

// how much wood the saw set to h gives, in O(log n)
long long cut(vector<long long>& a, vector<long long>& psum, long long h){
    int idx = lower_bound(a.begin(), a.end(), h) - a.begin(); // first tree at least h tall
    long long total = psum[a.size()] - psum[idx];             // their full height
    return total - h * (long long)(a.size() - idx);           // only the part above h
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        int n, q;
        cin>>n>>q;

        vector<long long> a(n);
        for(int i=0;i<n;i++){
            cin>>a[i];
        }

        sort(a.begin(), a.end()); // lower_bound needs a sorted array

        vector<long long> psum(n+1, 0);
        for(int i=0;i<n;i++){
            psum[i+1] = psum[i] + a[i]; // psum[i] = sum of the first i heights
        }

        while(q--){

            long long x;
            cin>>x;

            long long low = 0, high = a[n-1], ans = 0;

            while(low <= high){

                long long mid = low + (high - low) / 2;

                if(cut(a, psum, mid) >= x){
                    ans = mid;      // enough wood - try to raise the saw
                    low = mid + 1;
                }else{
                    high = mid - 1;
                }
            }

            cout<<ans<<'\n';
        }
    }
    return 0;
}
```

## Complexity

Time $O(n \log n + q \log n \log H)$, where $H$ is the height of the tallest tree
Memory $O(n)$
