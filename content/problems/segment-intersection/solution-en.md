
## Approach

Everything here is built from one function - the **orientation** of a point against a line. For a line through $A$ and $B$ and a third point $C$, the sign of $\vec{AB} \times \vec{AC}$ tells us whether $C$ is on the left (`+`), on the right (`-`), or exactly on the line (`=`).

We will need four of them, so let's name them up front:

$$abc, \; abd \quad \text{- where } C \text{ and } D \text{ sit relative to the line } AB$$

$$cda, \; cdb \quad \text{- where } A \text{ and } B \text{ sit relative to the line } CD$$

### The clean crossing

Start with the picture where the segments cross properly, somewhere in their interiors. Two things have to be true at the same time:

- $C$ and $D$ are on **opposite sides** of the line $AB$, so $abc \ne abd$;
- $A$ and $B$ are on **opposite sides** of the line $CD$, so $cda \ne cdb$.
### When somebody lands exactly on the line

The rule above asks `C` and `D` to end up on **different sides** of $AB$. A segment that only touches $AB$ and turns back never does that - both of its ends stay on the same side, so the rule says no while the real answer is yes. Two segments lying on top of each other fail it for the same reason.

All of those cases leave the same mark: one of the four orientations comes back `=`. That is the point doing the touching.

But `=` only says the point is on the **line**, and the line runs forever. Both $(2,2)$ and $(6,6)$ lie on the line through $A = (0,0)$ and $B = (4,4)$, and only $(2,2)$ is on the segment. So we also check that the point is inside the box spanned by the other two.

Any of the four points can be the one that touches, so that is four checks - one per orientation. A single shared point is all the problem asks for, so the first check that passes ends it.

## Example

The four orientations for each line of the example, with $A = (0,0)$ and $B = (4,4)$ throughout:

| segment $CD$ | $abc$ | $abd$ | $cda$ | $cdb$ | what happened | answer |
|---|---|---|---|---|---|---|
| $(0,4) - (4,0)$ | `+` | `-` | `-` | `+` | both pairs differ | `YES` |
| $(0,10) - (10,0)$ | `+` | `-` | `-` | `-` | **$A$ and $B$ on the same side of $CD$** | `NO` |
| $(4,4) - (8,0)$ | `=` | `-` | `-` | `=` | $C$ is on the line $AB$ and inside the box | `YES` |
| $(2,2) - (6,6)$ | `=` | `=` | `=` | `=` | everything collinear, $C$ inside the box | `YES` |
| $(1,0) - (5,4)$ | `-` | `-` | `+` | `+` | **no pair differs** | `NO` |

Check the second row by hand: $\vec{CD} = (10, -10)$, $\vec{CA} = (0, -10)$ gives $10 \cdot (-10) - (-10) \cdot 0 = -100$, and $\vec{CB} = (4, -6)$ gives $10 \cdot (-6) - (-10) \cdot 4 = -20$. Both negative, so the second condition fails and the answer is `NO` - even though the first condition was happy.

And the fourth row: every orientation is `=`, so the first condition cannot fire. It is the box check that saves us - $C = (2,2)$ is on the line $AB$ and inside the box $[0,4] \times [0,4]$, so the segments share it.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

struct v {
    long long x, y;
};

char orientation(v a, v b, v c) {

    // cross product of AB and AC - only its sign matters
    long long prod = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);

    if(prod > 0) return '+';
    if(prod < 0) return '-';
    return '=';
}

bool inBox(v a, v b, v p) {

    return min(a.x, b.x) <= p.x && p.x <= max(a.x, b.x) &&
           min(a.y, b.y) <= p.y && p.y <= max(a.y, b.y);
}

bool intersect(v a, v b, v c, v d) {

    char abc = orientation(a, b, c);
    char abd = orientation(a, b, d);
    char cda = orientation(c, d, a);
    char cdb = orientation(c, d, b);

    if(abc != abd && cda != cdb) return true; // the segments cross properly

    if(abc == '=' && inBox(a, b, c)) return true; // c sits on segment ab
    if(abd == '=' && inBox(a, b, d)) return true;
    if(cda == '=' && inBox(c, d, a)) return true;
    if(cdb == '=' && inBox(c, d, b)) return true;

    return false;
}

int main() {
    iostream::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;

    while(t--) {

        v a, b, c, d;
        cin >> a.x >> a.y >> b.x >> b.y >> c.x >> c.y >> d.x >> d.y;

        cout << (intersect(a, b, c, d) ? "YES" : "NO") << "\n";
    }

    return 0;
}
```
## Complexity

Time $O(1)$ per testcase
Memory $O(1)$
