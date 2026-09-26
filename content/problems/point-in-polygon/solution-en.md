
## Approach

Shoot a ray from $T$ straight to the right and count how many edges of the fence it crosses.

Far to the right we are certainly outside, and every crossing flips us between outside and inside. So an **odd** count means $T$ is inside and an **even** count means outside, no matter how twisted the fence is.

### Counting a crossing

An edge is worth looking at only when it reaches across the height of $T$ - one end above, one end below. Written as `(a.y > t.y) != (b.y > t.y)`, with **strictly above** on both sides, that also settles the ray passing exactly through a corner: the corner belongs to the edge whose other end is above it, and to that one only. Without a rule like this the two edges meeting at that corner both count and the parity is wrong.

Then the crossing has to be on the **right** of $T$, and that is a question about sides, so `orientation` answers it. For an edge running upwards the crossing is on the right exactly when $T$ is on the left of it, and for an edge running downwards the sign is the other way round.

### The fence itself

The ray test says nothing dependable about a point sitting **on** an edge - it comes out inside or outside depending on which way the edge happens to run. Since the statement counts the fence as inside, we test the edges first with `onSegment` and answer `YES` the moment one of them contains $T$. Only if none does do we fall back to the parity.

**Careful:** the cross products inside `orientation` must be computed in `long long`. A coordinate reaches $10^9$, a difference $2 \cdot 10^9$, and the whole expression $8 \cdot 10^{18}$.

## Example

The first testcase is the letter `C`, with $T = (2, 2)$ sitting in its notch. No edge contains $T$, so we count. All eight edges, in walking order:

| edge | reaches across $y = 2$ | crossing right of $T$ |
|---|---|---|
| $(0,0) - (5,0)$ | no | |
| $(5,0) - (5,1)$ | no | |
| $(5,1) - (1,1)$ | no | |
| $(1,1) - (1,3)$ | **yes** | no, it is at $x = 1$ |
| $(1,3) - (5,3)$ | no | |
| $(5,3) - (5,4)$ | no | |
| $(5,4) - (0,4)$ | no | |
| $(0,4) - (0,0)$ | **yes** | no, it is at $x = 0$ |

Only two edges reach across the height of $T$, and both of them lie to its left, so the count is zero. Even, so the answer is `NO` - the notch is outside, even though the fence wraps around it on three sides. In the second testcase, the square, two edges reach across the height of $T$ and only $(5,0) - (5,5)$ is to its right: one crossing, odd, `YES`.

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

bool onSegment(v a, v b, v p) {

    if(orientation(a, b, p) != '=') return false;

    return min(a.x, b.x) <= p.x && p.x <= max(a.x, b.x) &&
           min(a.y, b.y) <= p.y && p.y <= max(a.y, b.y);
}

bool crossesToTheRight(v a, v b, v t) {

    if((a.y > t.y) == (b.y > t.y)) return false; // the edge does not straddle t's height

    char o = orientation(a, b, t);

    return (b.y > a.y) ? (o == '+') : (o == '-'); // is the crossing right of t
}

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

        v q;
        cin >> q.x >> q.y;

        bool inside = false;
        int crossings = 0;

        for(int i = 0; i < n; i++) {
            int j = (i + 1) % n;

            if(onSegment(p[i], p[j], q)) { // on the fence - counts as inside
                inside = true;
                break;
            }

            if(crossesToTheRight(p[i], p[j], q)) crossings++;
        }

        if(!inside) inside = (crossings % 2 == 1);

        cout << (inside ? "YES" : "NO") << "\n";
    }

    return 0;
}
```

The direction of the walk never comes up. Clockwise and counter-clockwise give the same crossings, so nothing has to be normalised first.

## Complexity

Time $O(n)$ per testcase
Memory $O(n)$
