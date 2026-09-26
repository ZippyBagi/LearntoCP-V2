
## Approach

Checking every pair is two nested loops, $O(n^2)$ - at $n = 10^5$ that is $5 \cdot 10^9$ comparisons, far too slow. We need to count the pairs without ever looking at them one at a time.

Split the array in half. Every inversion is then one of exactly three kinds:

- both positions in the **left** half,
- both positions in the **right** half,
- one in each - a **crossing** pair.

The first two are the same problem on a smaller array, so recursion handles them. All the work is in counting the crossing pairs, and that is where merge sort does us a favour: if we sort the two halves along the way, the crossing pairs become easy to count in one pass.

### Counting the crossings during the merge

Suppose both halves are already sorted and we are merging them, `i` walking the left half and `j` the right one. At each step we compare `a[i]` with `a[j]`:

- `a[i] <= a[j]` - we take from the left. No inversion: the left element comes earlier in the original array and it is not bigger.
- `a[i] > a[j]` - we take from the right, and this **is** an inversion. But not just one: the left half is sorted, so everything from `i` to the end of the left half is $\ge$ `a[i]` and therefore also bigger than `a[j]`. Every one of them sits at an earlier position than `a[j]`. That is `mid - i` inversions, all counted in a single step.

Sorting the halves does not lose anything, because reordering inside a half never changes how many of its elements are bigger than a given element of the other half.

So the algorithm is merge sort with one extra line. Same recursion, same merge, plus `inversions += mid - i` in the branch that takes from the right.

**Careful:** the answer can be as large as $\frac{n(n-1)}{2} \approx 5 \cdot 10^9$ for a reversed array of $10^5$ elements - well past what an `int` holds. The counter must be `long long`.

## Example

The first array is $[3, 1, 4, 2, 5]$. Merge sort splits it into $[3, 1]$ and $[4, 2, 5]$, and these are the four merges that happen, in the order they happen:

| left half | right half | merged | crossings counted |
|---|---|---|---|
| $3$ | $1$ | $1\ 3$ | $1$ |
| $2$ | $5$ | $2\ 5$ | $0$ |
| $4$ | $2\ 5$ | $2\ 4\ 5$ | $1$ |
| $1\ 3$ | $2\ 4\ 5$ | $1\ 2\ 3\ 4\ 5$ | $1$ |

Look at the last row: we take $1$ from the left, then $2$ from the right while $3$ is still waiting in the left half - one crossing, the pair $(3, 2)$. The rest of the merge takes everything in order. Adding the column up gives $1 + 0 + 1 + 1 = 3$, the answer.

Notice that the four rows found the three inversions in three different places: $(3, 1)$ in the first merge, $(4, 2)$ in the third, $(3, 2)$ in the fourth. Every pair is counted exactly once, in the merge where the two elements first end up in the same half.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

// sorts a[left..right) and returns how many inversions live inside it
long long sortCount(int left, int right, vector<int>& a, vector<int>& tmp){

    if(right - left < 2){
        return 0; // a single element cannot be inverted with anything
    }

    int mid = left + (right - left) / 2;

    long long inversions = sortCount(left, mid,a,tmp) + sortCount(mid, right,a,tmp);

    int i = left, j = mid, k = left;

    while(i < mid && j < right){
        if(a[i] <= a[j]){
            tmp[k] = a[i]; // not an inversion - equal counts as not inverted
            i++;
        }else{
            tmp[k] = a[j];
            j++;
            inversions += mid - i; // a[j] jumps over the whole rest of the left half
        }
        k++;
    }

    while(i < mid){ tmp[k] = a[i]; i++; k++; }
    while(j < right){ tmp[k] = a[j]; j++; k++; }

    for(int p=left;p<right;p++){
        a[p] = tmp[p];
    }

    return inversions;
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        int n;
        cin>>n;

        vector<int> a = vector<int>(n);
        vector<int> tmp = vector<int>(n); // scratch space the merge writes into
        for(int i=0;i<n;i++){
            cin>>a[i];
        }

        cout<<sortCount(0, n,a,tmp)<<'\n';
    }
    return 0;
}
```

## Complexity

Time $O(n \log n)$
Memory $O(n)$

## Bonus: the other well-known solution

There is a second standard way to count inversions, with a **Fenwick tree** (also called a binary indexed tree). We will learn more about it in future lessons, and this exact problem comes back there as [Number of Inversions II](/en/Problems/inversions-2).