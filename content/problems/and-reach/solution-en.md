
## Approach

#### Idea

Fix $l$ and slide $r$ to the right. Each new element is ANDed into the running value, and AND can only ever **switch bits off** - never back on. So $f(l, r)$ never increases as $r$ grows.

That is the whole reason this problem is easy. The positions that satisfy $f(l, r) \ge k$ are a solid block starting at $l$: once the value drops below $k$ it can never climb back, so the answer is the last position of that block and **binary search** finds it.

What the binary search needs is $f(l, mid)$ for an arbitrary $mid$, quickly. The array never changes between questions, which is exactly the setting for a sparse table - build once, then answer any range in $O(1)$.

#### Why a sparse table can do AND

A sparse table answers a range by covering it with **two overlapping** blocks of length $2^j$: one anchored at the left end, one ending at the right end. For a sum that would be wrong, because the overlap gets counted twice.

AND does not care. It is **idempotent** - $x \mathbin{\&} x = x$ - so an element folded in twice contributes exactly what it did once, and the overlap is harmless:

~!
```cpp
int len = R - L + 1;
int k = power_of_two(len);            // the largest j with 2^j <= len
return lookup[L][k] & lookup[R - (1<<k) + 1][k];
```

That is the same property min and max have, and the reason those three show up in sparse tables while sums do not.

Building costs $O(n \log n)$, each range costs $O(1)$, and each question is a binary search over $\log n$ ranges - so $O(n \log n + q \log n)$ overall.

#### Edge cases

**No position works.** If $a_l$ itself is already below $k$, then so is every longer segment, and the answer is $-1$. Starting the search with `ans = -1` and only ever overwriting it on success handles this without a special case.

**The answer is an index, not a value.** The search runs over 0-based positions while the input and output are 1-based, so the read subtracts one and the print adds it back - except for $-1$, which is printed as it is.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

// the largest k with 2^k <= a
long long power_of_two(long long a){

    long long k = 0;

    while((1LL<<(k+1)) <= a){
        k++;
    }

    return k;
}

// the AND of the range [L, R], read off two blocks of length 2^k.
// They overlap when the length is not a power of two, which is fine - AND does
// not mind seeing the same element twice.
int query(vector<vector<int>>& lookup, int L, int R){

    int len = R - L + 1;
    int k = power_of_two(len);

    return lookup[L][k] & lookup[R - (1<<k) + 1][k];
}

int main(){

    cin.tie(0);
    iostream::sync_with_stdio(false);

    int t;
    cin>>t;

    while(t--){

        int n;
        cin>>n;

        int levels = 1;
        while((1<<levels) <= n){
            levels++;
        }

        vector<vector<int>> lookup(n+1, vector<int>(levels, 0));

        for(int i=0;i<n;i++){
            cin>>lookup[i][0]; // level 0 is the array itself
        }

        for(int j=1;j<levels;j++){
            for(int i=0;i + (1<<j) <= n;i++){
                lookup[i][j] = lookup[i][j-1] & lookup[i + (1<<(j-1))][j-1];
            }
        }

        int q;
        cin>>q;

        while(q--){

            int start, k;
            cin>>start>>k;

            start--; // the input counts positions from 1

            int l = start;
            int r = n - 1;
            int ans = -1;

            while(l <= r){

                int mid = l + (r - l) / 2;

                if(query(lookup, start, mid) >= k){
                    ans = mid;     // this far still holds, try further right
                    l = mid + 1;
                }else{
                    r = mid - 1;
                }
            }

            cout<<(ans == -1 ? -1 : ans + 1);
            cout<<(q > 0 ? ' ' : '\n'); // q is how many questions are left
        }
    }
    return 0;
}
```

## Complexity

Time $O(n \log n + q \log^2 n)$ - the extra $\log$ is `power_of_two` re-deriving the block size inside every range
Memory $O(n \log n)$
