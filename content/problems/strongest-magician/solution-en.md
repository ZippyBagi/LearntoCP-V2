
## Approach

We need a collection of strengths that we can add to, remove from, and ask for its smallest and largest element - all of that while the collection keeps changing. A sorted vector would answer the questions instantly but cost $O(n)$ per insertion, and a plain `set` would be perfect except for one detail in the statement: two magicians may be **equally strong**, and a `set` refuses to keep the same value twice.

That is exactly the gap `multiset` fills. It behaves like a set - always sorted, $O(\log n)$ per operation - but it **keeps duplicates**. Every magician in the hall is one element, even if their strengths collide.

With that choice everything falls out:

- `i x` - `hall.insert(x)`;
- `m` - the smallest element, which is the first one: `*hall.begin()`;
- `M` - the largest element, which is the last one: `*hall.rbegin()`;
- `e x` - remove one magician of strength $x$.

Both `begin()` and `rbegin()` are pointers, so the `*` in front reads the value they point at, and both are $O(1)$ - a sorted structure has its minimum and maximum sitting at the ends for free.

**Careful:** `hall.erase(x)` removes **every** copy of $x$ at once, which would empty the hall of all equally strong magicians instead of one. To remove a single one we go through a pointer: `hall.erase(hall.find(x))`. The statement guarantees a magician of strength $x$ is present, so `find` never returns `hall.end()` here - without that guarantee we would have to check first.

**Careful:** `*hall.begin()` on an empty multiset is undefined behaviour, so the empty hall has to be handled before either query, not after.

## Example

The hall after each event of the statement example:

| event | hall | printed |
|-------|------|---------|
| `i 1` | $\{1\}$ | - |
| `i 5` | $\{1, 5\}$ | - |
| `i 5` | $\{1, 5, 5\}$ | - |
| `i 8` | $\{1, 5, 5, 8\}$ | - |
| `m` | $\{1, 5, 5, 8\}$ | **$1$** |
| `e 5` | $\{1, 5, 8\}$ | - |
| `e 8` | $\{1, 5\}$ | - |
| `M` | $\{1, 5\}$ | **$5$** |
| `e 5` | $\{1\}$ | - |
| `M` | $\{1\}$ | **$1$** |
| `e 1` | $\{\}$ | - |
| `m` | $\{\}$ | **$-$** |

The sixth row is the one that matters: `e 5` leaves $\{1, 5, 8\}$, with one $5$ still inside. Had we written `hall.erase(5)` both copies would have vanished, the next `M` would have printed $8$ instead of $5$, and every answer after it would be wrong too.

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

        int q;
        cin >> q;

        multiset<int> hall;

        while(q--) {

            char op;
            cin >> op;

            if(op == 'i') {
                int x;
                cin >> x;
                hall.insert(x);
            }
            else if(op == 'e') {
                int x;
                cin >> x;
                hall.erase(hall.find(x)); // find first, so only one copy leaves
            }
            else if(hall.empty()) cout << "-" << "\n";
            else if(op == 'm') cout << *hall.begin() << "\n";  // the smallest
            else cout << *hall.rbegin() << "\n";               // the largest
        }
    }

    return 0;
}
```

Reading the event into a `char` works because `cin` skips whitespace, so `m` and `M` are read as themselves and stay distinguishable - the two queries differ only in case.

## Complexity

Time $O(q \log q)$
Memory $O(q)$
