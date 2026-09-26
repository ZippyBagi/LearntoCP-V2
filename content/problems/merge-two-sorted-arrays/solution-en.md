
## Approach

The lazy way out is to dump both lists into one array and call `sort`. It works, but it throws away the thing we were given for free: both lists are **already sorted**. Using that, the answer can be built in a single pass.

Ask which score comes first in the final ranking. It has to be the smallest of everything we have, and the smallest element of a sorted list is its **first** one - so the winner is either $a_1$ or $b_1$, and nothing else can compete. Write it down, cross it off its list, and ask the same question again about what is left.

That is the two-pointer technique from the lesson, with one pointer in each array:

- `i` - the first score of group A that has not been placed yet;
- `j` - the same for group B.

At every step we compare `a[i]` with `b[j]`, append the smaller one and move **only that pointer** forward. Each step places exactly one score, so after $m + n$ steps we are done - $O(m + n)$ instead of $O((m+n) \log (m+n))$.

**Careful:** the loop `while(i < m && j < n)` stops as soon as one list runs out, and the other one may still have scores in it. They are the largest ones and they are already in order, so two short loops copy the leftovers to the end. Forgetting them is the classic bug in this problem.

Equal scores are not a problem - when `a[i] == b[j]` we take from A, but taking from B would give exactly the same output.

## Example

The first testcase, $A = [1, 3, 5, 7]$ against $B = [2, 4, 5]$:

| `a[i]` | `b[j]` | taken | ranking so far |
|---|---|---|---|
| $1$ | $2$ | A: $1$ | $1$ |
| $3$ | $2$ | B: $2$ | $1\ 2$ |
| $3$ | $4$ | A: $3$ | $1\ 2\ 3$ |
| $5$ | $4$ | B: $4$ | $1\ 2\ 3\ 4$ |
| $5$ | $5$ | A: $5$ | $1\ 2\ 3\ 4\ 5$ |
| $7$ | $5$ | B: $5$ | $1\ 2\ 3\ 4\ 5\ 5$ |

Look at the fifth row: both lists offer a $5$, we take the one from A, and B keeps its own $5$ for the next step - which is why the ranking contains two of them. After the last row group B is empty while $7$ is still waiting in A, and the leftover loop puts it at the end.

This merge is also exactly the step that merge sort is built from - it will come back in the Divide and Conquer lesson.

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

        int m, n;
        cin>>m>>n;

        vector<int> a(m), b(n);
        for(int i=0;i<m;i++){
            cin>>a[i];
        }
        for(int j=0;j<n;j++){
            cin>>b[j];
        }

        vector<int> c;
        c.reserve(m + n);

        int i = 0, j = 0;

        while(i < m && j < n){
            if(a[i] <= b[j]){
                c.push_back(a[i]);
                i++;
            }else{
                c.push_back(b[j]);
                j++;
            }
        }

        while(i < m){ // whatever is left of A
            c.push_back(a[i]);
            i++;
        }
        while(j < n){ // ... or of B - only one of these two loops ever runs
            c.push_back(b[j]);
            j++;
        }

        for(int k=0;k<m+n;k++){
            cout<<c[k]<<(k+1 < m+n ? ' ' : '\n');
        }
    }
    return 0;
}
```

## Complexity

Time $O(m + n)$
Memory $O(m + n)$
