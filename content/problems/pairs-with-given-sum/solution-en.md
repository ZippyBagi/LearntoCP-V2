
## Approach

Checking all pairs takes $O(n^2)$ - too slow for $n = 2 \cdot 10^5$. This is exactly the situation from the two pointers lesson, with one twist: there we looked for one pair, here we count all of them.

First **sort** the array. Now place `left` at the smallest element and `right` at the largest and look at the sum $a_{left} + a_{right}$:

- if the sum is **too small**, no pair with $a_{left}$ works - everything to the left of `right` is even smaller - so move `left` forward;
- if the sum is **too big**, no pair with $a_{right}$ works, so move `right` back;
- if the sum is **exactly $s$**, we found a pair - count it and move **both** pointers.

Because all elements are **different**, $a_{left}$ cannot form another pair - its only possible partner is $s - a_{left}$, which we just used. The same holds for $a_{right}$, so neither pointer has anything left to find.

Every step moves at least one pointer, so the pointers meet after at most $n$ steps.

## Example

The first testcase sorted: $[0, 2, 4, 5, 6, 7]$, $s = 7$:

| $a_{left}$ | $a_{right}$ | sum | action |
|---|---|---|---|
| $0$ | $7$ | $7$ | **count**, move both |
| $2$ | $6$ | $8$ | too big, `right--` |
| $2$ | $5$ | $7$ | **count**, move both |

After the third step the pointers cross and we stop: $2$ pairs, matching $(2, 5)$ and $(7, 0)$ from the statement.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        int n,k;
        cin>>n>>k;

        vector<int> a(n);

        for(int i=0;i<n;i++){
            cin>>a[i];
        }

        sort(a.begin(), a.end());

        int ans = 0;

        int l = 0;
        int r = n-1;

        while(l < r){
            if(a[l] + a[r] == k){
                ans++;
                l++;
                r--;
            }else if(a[l] + a[r] > k){ // the sum is too large
                r--;
            }else if(a[l] + a[r] < k){ // the sum is too small
                l++;
            }
        }
        cout<<ans<<'\n';

    }
    return 0;
}
```

## Complexity

Time $O(n \log n)$
Memory $O(n)$
