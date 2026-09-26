
## Approach

Checking every candidate $h$ by counting papers costs $O(n)$ per candidate, $O(n^2)$ in total - too slow. Sorting turns the whole task into one scan.

Sort the citations **descending**, largest first. Now look at position $i$ (counting from $1$): the first $i$ papers are the $i$ most cited ones, so

- "there are at least $i$ papers with at least $i$ citations" is true exactly when the **$i$-th paper on the sorted list** has at least $i$ citations.

So walk $h$ from the front: while the $(h+1)$-th paper has at least $h + 1$ citations, the h-index can grow. The first position where the sorted value drops below its position is where we stop - everything after it is even smaller.

**Careful:** the h-index can be $0$ - a scientist whose papers all have $0$ citations never enters the loop. Starting with $h = 0$ handles it without a special case.

## Example

The first testcase sorted descending:

| position | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $8$ |
|---|---|---|---|---|---|---|---|---|
| citations | $17$ | $12$ | $9$ | $7$ | **$5$** | $5$ | $3$ | $0$ |

At position $5$ the paper has $5 \ge 5$ citations - still fine. At position $6$ the paper has $5 < 6$ - stop. The h-index is $5$: five papers with at least five citations each, and a sixth such paper does not exist.

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

        sort(a.begin(), a.end());
        reverse(a.begin(), a.end()); // largest number of citations first

        int h = 0;
        while(h < n && a[h] >= h + 1){ // the (h+1)-th paper still has at least h+1 citations
            h++;
        }

        cout<<h<<'\n';
    }
    return 0;
}
```

## Complexity

Time $O(n \log n)$
Memory $O(n)$
