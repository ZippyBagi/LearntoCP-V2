
## Approach

Every pylon sits on one line, so the only thing that separates them is **how far along that line** they are. If we can attach one number to each pylon that grows as we travel, sorting by that number is the whole problem.

### The number

The direction of travel is handed to us by the first two pylons:

$$\vec{d} = P_1 - P_0$$

Now take any pylon $P_i$ and the vector $\vec{P_0 P_i}$ that points at it from the first pylon. Both vectors lie on the same line, so they are parallel, and the **dot product**

$$\vec{P_0 P_i} \cdot \vec{d}$$

is positive when $P_i$ is ahead of $P_0$ along the direction of travel, negative when it is behind, and $0$ only for $P_0$ itself. That is exactly the number we wanted.

The value is not the distance - it is the distance multiplied by $|\vec{d}|$, which is the same positive constant for every pylon in the testcase. A common positive factor never changes an order, so we can sort by it directly and never touch a square root.

### Why not just sort by $x$

Because a line can stand straight up. Every pylon then has the same $x$, and sorting by $x$ leaves the list untouched. Sorting by $y$ breaks on a horizontal line the same way, and choosing between "ascending" and "descending" is another thing to get wrong. The dot product answers all three questions at once: it picks the right coordinate, it weighs both of them, and it already points the right way because $\vec{d}$ does.

**Careful:** the dot product must be computed in `long long`. A coordinate reaches $10^6$, so a difference reaches $2 \cdot 10^6$, and the two products together reach $8 \cdot 10^{12}$ - far past `int`.

## Example

The first testcase, with $P_0 = (9, 4)$ and $P_1 = (5, 2)$, so $\vec{d} = (-4, -2)$:

| pylon $P_i$ | $\vec{P_0 P_i}$ | $\vec{P_0 P_i} \cdot \vec{d}$ |
|---|---|---|
| $(9, 4)$ | $(0, 0)$ | $0$ |
| $(5, 2)$ | $(-4, -2)$ | $20$ |
| $(15, 7)$ | $(6, 3)$ | $-30$ |
| $(7, 3)$ | $(-2, -1)$ | $10$ |
| $(13, 6)$ | $(4, 2)$ | $-20$ |

Sorted by the last column we get $-30, -20, 0, 10, 20$, which is the pylons $(15, 7), (13, 6), (9, 4), (7, 3), (5, 2)$ - the answer. Notice that $(15,7)$ has the largest $x$ of all and still comes first, because the cabin is travelling to the left.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

struct v{

    long long x, y;
};

int main() {
    iostream::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;

    while(t--) {

        int n;
        cin >> n;

        vector<v> p(n);
        for(int i = 0; i < n; i++) cin >> p[i].x >> p[i].y;

        // the cabin travels from the first pylon towards the second one
        v d = {p[1].x - p[0].x, p[1].y - p[0].y};

        vector<pair<long long, int>> key(n);

        for(int i = 0; i < n; i++) {

            // dot product of (p[i] - p[0]) and d - how far along the travel direction
            long long along = (p[i].x - p[0].x) * d.x + (p[i].y - p[0].y) * d.y;

            key[i] = {along, i};
        }

        sort(key.begin(), key.end());

        for(int i = 0; i < n; i++) {
            cout << p[key[i].second].x << " " << p[key[i].second].y << "\n";
        }
    }

    return 0;
}
```

The pylons are never reordered themselves - we sort a list of `(key, index)` pairs and print through the index. Since the pylons are distinct and collinear, no two keys can be equal, so there are no ties to break.

## Complexity

Time $O(n \log n)$ per testcase
Memory $O(n)$
