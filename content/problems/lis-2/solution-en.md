
## Approach

The classic $O(n^2)$ DP is too slow here ($n = 10^5$ gives around $10^{10}$ operations), so we need a smarter idea.

Instead of remembering everything, we will only remember one thing per length: for each length, the **smallest value** that a rising subsequence of that length can end with.

Why the smallest? Imagine two rising subsequences of length 3, one ending in $8$ and one ending in $4$. The one ending in $4$ is simply easier to extend ($5, 6, 7...$ all work for it but not for the other one), so the one ending in $8$ can be safely forgotten.

We store these values in an array `tails`, where `tails[i]` is the smallest possible ending value of a rising subsequence of length $i+1$ found so far. Then we go through the input, and for each new element $x$ there are only two cases:

- $x$ is bigger than the last element of `tails` - then $x$ extends our longest subsequence, and we append it to the end.
- Otherwise, $x$ can't make a longer subsequence, but it might be a **cheaper ending** for some existing length: we find the first element of `tails` that is $\ge x$, and replace it with $x$.

The answer is simply the final length of `tails`.

## Example

Let's run this on the example, $3\ 6\ 1\ 2\ 8\ 2\ 4\ 5$:

| New element | `tails` after | What happened |
|:---:|:---|:---|
| $3$ | **3** | first element, subsequence of length 1 |
| $6$ | 3 **6** | bigger than everything - extends |
| $1$ | **1** 6 | replaces 3: a length-1 subsequence can now end with 1 |
| $2$ | 1 **2** | replaces 6: a length-2 subsequence can now end with 2 (namely $1, 2$) |
| $8$ | 1 2 **8** | bigger than everything - extends |
| $2$ | 1 **2** 8 | replaces itself - nothing changes |
| $4$ | 1 2 **4** | replaces 8: a length-3 subsequence can now end with 4 |
| $5$ | 1 2 4 **5** | bigger than everything - extends |

`tails` has 4 elements, so the answer is $4$.

**Careful:** `tails` is not necessarily a real subsequence of the array! For the input $5\ 6\ 1$ it ends up as $1\ 6$, and $1, 6$ never appears in that order. Each entry only answers the question "what is the cheapest ending for this length?" - but the **length** of `tails` is always correct, and that is all we need.

## Why is this fast?

Notice that `tails` is always **sorted** (a longer subsequence can't end cheaper than a shorter one - the shorter one is contained in it). That means the step "find the first element $\ge x$" doesn't need to check every element: it can be done with **binary search**, in $O(\log n)$.

In C++ this exact search already exists: `lower_bound(tails.begin(), tails.end(), x)` returns the position of the first element $\ge x$ in a sorted range (or the end, if there is none). So each of the $n$ elements costs us only $O(\log n)$.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    iostream::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;

    vector<long long> a(n);
    for(int i = 0; i < n; i++){
        cin >> a[i];
    }

    // tails[i] = smallest possible ending value of a rising
    //            subsequence of length i+1
    vector<long long> tails;

    for(int i = 0; i < n; i++){

        // first element >= a[i]
        auto it = lower_bound(tails.begin(), tails.end(), a[i]);

        if(it == tails.end()){ // if there is no such element
            tails.push_back(a[i]); // a[i] extends the longest subsequence
        }else{
            *it = a[i]; // a[i] is a cheaper ending for that length. *it changes tails[the position of it]
        }
    }

    cout << tails.size();
}
```

Careful: we use `lower_bound` (first element $\ge x$) and not `upper_bound` (first element $> x$), because the subsequence must be **strictly** increasing - an element equal to $x$ must be replaced, not extended.

## Complexity

Time $O(n \log n)$
Memory $O(n)$
