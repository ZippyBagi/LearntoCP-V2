
## Approach

Counting the qualifiers one by one costs $O(n)$ per question - up to $4 \cdot 10^{10}$ steps in total. The scores are already sorted, so this is a job for the binary search functions from the lesson.

One catch: `lower_bound` and `upper_bound` only work on arrays sorted **ascending**, and Maja's scoreboard is sorted descending. The simplest cure - **reverse** the array once after reading it.

In the ascending array, the competitors with at least $p$ points form the **tail**: everything from the first element $\ge p$ to the end. And "first element $\ge p$" is the exact definition of `lower_bound`:

- `idx = lower_bound(a.begin(), a.end(), p) - a.begin()` - the position of the first score that is not too small;
- the answer is `n - idx` - the size of the tail.

Every question is now one binary search, $O(\log n)$.

**Careful:** subtracting `a.begin()` turns the iterator into an index - without it you have a position in memory, not a number.

## Example

Reversed, the scoreboard is $[23, 56, 73, 73, 89]$:

| $p$ | first score $\ge p$ | `idx` | answer $n - idx$ |
|---|---|---|---|
| $95$ | none | $5$ | $0$ |
| $50$ | $56$ | $1$ | $4$ |
| $70$ | $73$ | $2$ | $3$ |
| $0$ | $23$ | $0$ | $5$ |

Check the $70$ row: the first score with at least $70$ points is the $73$ at position $2$, and behind it stand $5 - 2 = 3$ competitors - exactly the three who qualify.

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

        int n, m;
        cin>>n>>m;

        vector<int> a(n);
        for(int i=0;i<n;i++){
            cin>>a[i]; // sorted from the largest to the smallest
        }

        reverse(a.begin(), a.end()); // lower_bound needs ascending order

        while(m--){
            int p;
            cin>>p;
            int idx = lower_bound(a.begin(), a.end(), p) - a.begin(); // first score >= p
            cout<<n - idx<<'\n'; // everything from there on passes
        }
    }
    return 0;
}
```

## Complexity

Time $O(n + m \log n)$
Memory $O(n)$
