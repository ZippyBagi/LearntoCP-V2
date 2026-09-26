
## Approach

Trying every segment separately is $O(n^2)$ or worse - too slow. One pass is enough.

Walk through the array and keep `sum` - the largest sum of a segment **ending at the current element**. When a new element $x$ arrives, a segment ending at $x$ can only be one of two things:

- the best segment ending at the previous element, **extended** with $x$;
- or $x$ **alone**, starting fresh.

Extend only if the part before $x$ helps. After adding, check `if(sum < x)` - if the extended sum is smaller than $x$ alone, the old part was just dragging us down, so drop it and start from $x$.

The answer is the best `sum` seen at any position - keep it in `best` and update it after every element.

Since `sum` always contains at least the current element, the segment is never empty - that is why all-negative arrays give the right answer: for $[-5, -2, -8]$ we get $-2$, not $0$.

**Careful:** the sums do not fit in an `int` - $2 \cdot 10^5$ elements of $10^9$ add up to $2 \cdot 10^{14}$. Keep `sum` and `best` in `long long`.

(Notice that we never need the whole array - each element is used the moment it is read, so there is no vector and the memory is $O(1)$. This idea is known as Kadane's algorithm.)

## Example

The first testcase, $[2, -3, 4, -1, 3, -2]$:

| $x$ | $2$ | $-3$ | $4$ | $-1$ | $3$ | $-2$ |
|---|---|---|---|---|---|---|
| `sum` | $2$ | $-1$ | $4$ | $3$ | **$6$** | $4$ |
| `best` | $2$ | $2$ | $4$ | $4$ | **$6$** | $6$ |

Check the $4$: extending gives $-1 + 4 = 3$, which is less than $4$ alone - so we restart there. Then $-1$ and $3$ extend it to $4 - 1 + 3 = 6$, the segment $[4, -1, 3]$ - the answer.

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

        long long x;
        cin>>x;

        long long sum = x;  // largest sum of a segment ending at the current element
        long long best = x; // largest sum seen so far

        for(int i=1;i<n;i++){
            cin>>x;
            sum += x;
            if(sum < x){ // the part before x only drags the sum down
                sum = x; // so start fresh from x alone
            }
            if(sum > best){
                best = sum;
            }
        }

        cout<<best<<'\n';
    }
    return 0;
}
```

## Complexity

Time $O(n)$
Memory $O(1)$
