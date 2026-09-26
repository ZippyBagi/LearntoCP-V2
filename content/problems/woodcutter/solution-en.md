
## Approach

For a fixed saw height $h$ the amount of wood is easy to count: every tree taller than $h$ gives $h_i - h$ meters, the rest give nothing. So we could try $h = 0, 1, 2, \dots$ and stop at the last height that still works - but the tallest tree can be $10^4$ meters and there can be $10^5$ trees, which is $10^9$ steps.

We do not have to try them all. Notice that lowering the saw never takes wood away: a tree that was already being cut simply gives one more meter, and trees that were too short may start giving something. So if height $h$ produces enough wood, every height below it does as well:

`YES YES YES ... YES NO NO NO`

and we are looking for the **last YES**. That is exactly binary search by answer.

The `check` is the counting loop from above, in $O(n)$:

- `low = 0` - the saw on the ground always works, because the statement guarantees the forest holds enough wood;
- `high` - the tallest tree, found with `max_element` (a handy C++ function that returns an iterator to the largest element; a for loop does the same job).

**Careful:** here a working height means we should search **higher**, not lower - so the successful branch is the one that moves `low`. Store `mid` in `ans` before moving on, otherwise the best working height is lost.

## Example

The first forest is $[24, 21, 19, 14, 22]$ and Milan needs $14$ meters:

| `low` | `high` | `mid` | wood at `mid` | |
|---|---|---|---|---|
| $0$ | $24$ | $12$ | $40$ | enough |
| $13$ | $24$ | $18$ | $14$ | enough |
| $19$ | $24$ | $21$ | $4$ | too little |
| $19$ | $20$ | $19$ | $10$ | too little |

Check the second row: at $18$ meters the trees give $6 + 3 + 1 + 0 + 4 = 14$ - exactly enough, so we keep $18$ and try higher. Everything from $19$ up fails, and $18$ stays as the answer.

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

        int n, x;
        cin>>n>>x;

        vector<int> a(n);
        for(int i=0;i<n;i++){
            cin>>a[i];
        }

        int low = 0;
        int high = *max_element(a.begin(), a.end()); // above the tallest tree nothing gets cut

        int ans = 0;

        while(low <= high){

            int mid = low + (high - low) / 2;

            int cut = 0;
            for(int i=0;i<n;i++){
                if(a[i] > mid){
                    cut += a[i] - mid; // only the part above the blade falls
                }
            }

            if(cut >= x){
                ans = mid;      // enough wood - try to raise the saw
                low = mid + 1;
            }else{
                high = mid - 1;
            }
        }

        cout<<ans<<'\n';
    }
    return 0;
}
```

The whole forest fits in $10^5 \cdot 10^4 = 10^9$ meters, which still fits in an `int`, so no `long long` is needed here. With bigger trees it would be - see [Woodcutter II](/en/Problems/woodcutter-2).

## Complexity

Time $O(n \log H)$, where $H$ is the height of the tallest tree
Memory $O(n)$
