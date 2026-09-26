
## Approach

The window of $d$ transactions slides one step at a time: one transaction enters at the front, one leaves at the back, and in between we need its median. Re-sorting the window for every transaction is $O(n d \log d)$ and far too slow, so we need a container that stays sorted while it changes - and that keeps duplicates, because two transactions can easily have the same amount.

That is a **multiset**. The window lives in `multiset<int> win`, sliding costs one `insert` and one `erase`, both $O(\log d)$.

But a multiset cannot be indexed - there is no `win[d / 2]`, and walking to the middle from `begin()` every time would cost $O(d)$ and undo everything we gained. So instead of finding the middle again and again, we **keep a pointer on it**.

### The pointer in the middle

Let `mid` be a pointer to the element of **rank $d / 2$** in the window (counting from $0$). For odd $d$ that is the middle element itself; for even $d$ it is the upper of the two middle ones, so the lower one is right next to it, at `prev(mid)`.

The window changes by exactly two operations per step, and each one shifts `mid`'s rank by at most one:

- **Inserting a value smaller than `*mid`** pushes the element `mid` points at one place to the right, so its rank becomes $d / 2 + 1$. Stepping `mid--` puts us back on rank $d / 2$. A value bigger than `*mid` lands behind it and changes nothing. (An **equal** value also lands behind it, because `insert` places a new element after the ones equal to it - that is why the test is `<` and not `<=`.)
- **Erasing a value that is at most `*mid`** pulls everything from `mid` on one place to the left, so we step `mid++` **before** the erase and land on rank $d / 2$ once it is done.

Doing the insert first and the erase second means the multiset briefly holds $d + 1$ elements, which is fine - the pointer is correct before and after the pair.

**Careful:** erase with `win.lower_bound(x)`, not `win.find(x)`. With duplicates, `lower_bound` returns the **first** copy of $x$, which after the `mid++` above always sits strictly before `mid` - so the element we delete is never the one `mid` points at, and the pointer survives. `find` may hand back any copy, including that one, and erasing it leaves `mid` dangling.

### Getting rid of the fraction

The median can be something like $3.5$, and comparing $x \ge 2m$ with `double` invites rounding trouble. But with `mid` in hand, $2m$ is a whole number in both cases:

$$2m = \begin{cases} 2 \cdot (*mid) & d \text{ odd} \\ *prev(mid) + *mid & d \text{ even} \end{cases}$$

So the entire comparison stays in `int`. Doubling the median instead of halving the sum is the trick worth remembering.

## Example

The state at each checked transaction of the statement example, with $d = 3$:

| transaction | window before it | `*mid` | $2m$ | warning | total |
|-------------|------------------|--------|------|---------|-------|
| $4$ | $\{2, 3, 5\}$ | $3$ | $6$ | no | $0$ |
| $3$ | $\{3, 4, 5\}$ | $4$ | $8$ | no | $0$ |
| $6$ | $\{3, 3, 4\}$ | $3$ | $6$ | **yes** | $1$ |
| $2$ | $\{3, 4, 6\}$ | $4$ | $8$ | no | $1$ |
| $9$ | $\{2, 3, 6\}$ | $3$ | $6$ | **yes** | $2$ |

The windows are shown sorted, which is how the multiset holds them. $d = 3$ is odd, so `mid` sits on rank $1$ - the middle - and $2m$ is simply twice it. The first three transactions are never checked, so the answer is $2$.

Follow the fourth row into the fifth to see the pointer move. The transaction $2$ is inserted and it is smaller than `*mid` $= 4$, so `mid--` lands on $3$. The transaction leaving the window is $4$, which is **not** at most the new `*mid` $= 3$, so `mid` stays where it is and the $4$ is erased. What remains is $\{2, 3, 6\}$ with `mid` on $3$ - exactly the fifth row.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    iostream::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;

    while(t--) {

        int n, d;
        cin >> n >> d;

        vector<int> a(n);
        for(int i = 0; i < n; i++) cin >> a[i];

        multiset<int> win(a.begin(), a.begin() + d);   // the first d transactions
        auto mid = next(win.begin(), d / 2);           // the element of rank d/2

        int warnings = 0;

        for(int i = d; i < n; i++) {

            int twiceMedian;
            if(d % 2 == 1) twiceMedian = 2 * (*mid);
            else twiceMedian = *prev(mid) + *mid;

            if(a[i] >= twiceMedian) warnings++;

            win.insert(a[i]);
            if(a[i] < *mid) mid--;          // everything from mid on moved one place right
            if(a[i - d] <= *mid) mid++;     // everything from mid on is about to move left
            win.erase(win.lower_bound(a[i - d])); // the first copy, so it is never mid itself
        }

        cout << warnings << "\n";
    }

    return 0;
}
```

`next(it, k)` returns the pointer `k` steps after `it` and `prev(it)` the one step before it - `next(win.begin(), d / 2)` is the only place we pay $O(d)$, and it happens once per testcase.

## Complexity

Time $O(n \log d)$
Memory $O(d)$
