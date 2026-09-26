
## Approach

Checking every possible segment separately (around $n^2 / 2$ checks, so O($n^2$)) is too slow.

Instead, we walk through the array once and ask at every position: **how much does this position add to the total?**

Lets treat each increasing segment separately, and lets call going through each segment a run. Then we can compare $a_i$ with the element before it

- If $a_i > a_{i-1}$, every element of the increasing run before $a_i$ forms a **new** segment with $a_i$ as its end - so each of them contributes $+1$ to the total.
- If not, no increasing segment can end at $a_i$, so we add nothing. (this means that the previous run ended, and a new one starts)

We can keep track of those elements with a counter: `elements` is the length of the current increasing run. On an increase, add `elements` to the answer and grow the run by one. On a break, reset it to $1$ - the run is now just $a_i$.

**Careful:** the answer does not fit in an `int`. A fully increasing array of $2 \cdot 10^5$ elements contains $n(n-1)/2 \approx 2 \cdot 10^{10}$ segments, so keep the sum in a `long long`.

## Example

The first testcase, $[1, 3, 4, -2, 10]$:

| $a_i$            | $1$ | $3$ | $4$     | $-2$ | $10$ |
| ---------------- | --- | --- | ------- | ---- | ---- |
| segments added   | $0$ | $1$ | **$2$** | $0$  | $1$  |
| segments total   | 0   | 1   | 3       | 3    | 4    |
| `elements` after | $1$ | $2$ | **$3$** | $1$  | $2$  |

Check the $4$: the run in front of it is $[1, 3]$, and each of those two elements gives one new segment ending at $4$ - namely $[3, 4]$ and $[1, 3, 4]$. The $-2$ breaks the run and adds nothing, then $10$ closes $[-2, 10]$ for one more. Total: $0 + 1 + 2 + 0 + 1 = 4$ - the answer.

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

        int n;
        cin>>n;

        vector<int> a(n);

        for(int i=0;i<n;i++){
            cin>>a[i];
        }

        long long ans = 0; // the number of segments can be huge
        int elements = 1;  // length of the increasing run ending at a[i-1]

        for(int i=1;i<n;i++){
            if(a[i] > a[i-1]){
                ans += elements; // one new segment for every element of the run before a[i]
                elements++;      // the run extends with a[i]
            }else{
                elements = 1;    // the run breaks, a[i] starts a new one
            }
        }

        cout<<ans<<'\n';
    }
    return 0;
}
```

## Complexity

Time $O(n)$
Memory $O(n)$
