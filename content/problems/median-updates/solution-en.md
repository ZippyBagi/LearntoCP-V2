
## Approach

Keeping a sorted vector and re-sorting after every new salary is far too slow. But notice what the question actually asks for: not the sorted order, only **what sits in the middle of it**. That is much less information, and a priority queue can hand us exactly one element - its top.

So let's split the salaries into two halves and keep each half in its own queue:

- `low` - a **max-heap** holding the **smaller half**, so its top is the largest of the small values;
- `high` - a **min-heap** holding the **larger half**, so its top is the smallest of the big values.

We keep two rules alive at all times. First, every value in `low` is at most every value in `high`. Second, `low` has either the same number of elements as `high`, or exactly one more.

With those two rules the tops of the queues **are** the middle of the sorted list. If the sizes are equal, the total count is even and the two middle values are `low.top()` and `high.top()`, so the median is their mean. If `low` has one extra element, the count is odd and that extra element is the middle one, so the median is `low.top()`.

### Inserting a salary

A new salary $x$ belongs to the smaller half if it is not bigger than the largest small value, so push it to `low` when `x <= low.top()` and to `high` otherwise. That keeps the first rule, but it can break the second one - one queue is now one element too big.

Fixing it takes a single move. If `low` grew to two more than `high`, take `low.top()` (the largest small value) and push it into `high`. If `high` became bigger than `low`, take `high.top()` (the smallest big value) and push it into `low`. The moved element is a border value, so it lands on the correct side and the first rule survives.

**Careful:** `top()` on an empty priority queue is undefined behaviour. The very first salary has to go into `low` without asking `low.top()` anything - the `low.empty()` check in the code is there for that.

## Example

The queues after each operation of the statement example:

| operation | `low` (max-heap) | `high` (min-heap) | printed |
|-----------|------------------|-------------------|---------|
| `d 5` | $\{5\}$ | $\{\}$ | - |
| `d 7` | $\{5\}$ | $\{7\}$ | - |
| `d 6` | $\{5, 6\}$ | $\{7\}$ | - |
| `m` | $\{5, 6\}$ | $\{7\}$ | **$6.0$** |
| `d 8` | $\{5, 6\}$ | $\{7, 8\}$ | - |
| `m` | $\{5, 6\}$ | $\{7, 8\}$ | **$6.5$** |

Watch the third row: $6$ is bigger than `low.top()` $= 5$, so it first goes into `high`, which makes `high` bigger than `low` - and the rebalancing move pushes $6$ back into `low`. At the first `m` the sizes are $2$ and $1$, so the answer is `low.top()` $= 6$. At the second one the sizes are $2$ and $2$, so it is $(6 + 7) / 2 = 6.5$.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    iostream::sync_with_stdio(false);
    cin.tie(0);

    cout << fixed << setprecision(1);

    int t;
    cin >> t;

    while(t--) {

        int q;
        cin >> q;

        priority_queue<int> low;                             // smaller half, biggest on top
        priority_queue<int, vector<int>, greater<int>> high;  // bigger half, smallest on top

        while(q--) {

            char op;
            cin >> op;

            if(op == 'd') {

                int x;
                cin >> x;

                if(low.empty() || x <= low.top()) low.push(x);
                else high.push(x);

                if(low.size() > high.size() + 1) { // low grew too big
                    high.push(low.top());
                    low.pop();
                }
                else if(high.size() > low.size()) { // high may never be the bigger one
                    low.push(high.top());
                    high.pop();
                }
            }
            else {
                if(low.size() == high.size()) cout << (low.top() + high.top()) / 2.0 << "\n";
                else cout << (double)low.top() << "\n";
            }
        }
    }

    return 0;
}
```

`cout << fixed << setprecision(1)` tells `cout` to print every following floating point number with exactly one decimal, which is what the output format asks for.

## Complexity

Time $O(q \log q)$
Memory $O(q)$
