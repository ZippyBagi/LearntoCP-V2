
## Approach

Walk along the cut from the bottom edge to the top edge. One piece is then always on your left and the other always on your right - call them the **left piece** and the **right piece**. We will hold the left piece still and slide the right one by some vector $\vec{d}$.

### One segment at a time

The two pieces are pressed against each other along the whole cut, so look at a single straight segment of it, from $P_i$ to $P_{i+1}$, and ask what sliding by $\vec{d}$ does **there**. Only two things can happen: the right piece lifts off that segment, or it drives into the left piece. Nothing else - the segment is straight, and $\vec d$ is one fixed direction.

Which of the two happens is a question about sides, and the cross product answers those. With

$$\vec{e_i} = P_{i+1} - P_i$$

the right piece is on the right of $\vec{e_i}$, so it gets away from this segment exactly when $\vec d$ also points to the right of $\vec{e_i}$, or straight along it:

$$\vec{d} \times \vec{e_i} \ge 0$$

The $\ge$ rather than $>$ is deliberate. When the cross product is $0$ the piece slides **along** the segment instead of away from it, and that is still fine - the two pieces graze past each other and, the plate being finite, they do come apart in the end.

### Every segment at once

The slide works if and only if one single $\vec d$ satisfies that inequality for **every** segment of the cut. So the answer no longer depends on where the cut is, or on how long its pieces are, or on the size of the plate - only on the **directions** $\vec{e_i}$ it travels in. Two cuts made of the same directions in a different order get the same answer.

Now read the inequality the other way round. $\vec{d} \times \vec{e} \ge 0$ says that $\vec e$ lies to the **left** of $\vec d$, or exactly along it - that is, $\vec e$ is somewhere in the half turn that starts at $\vec d$ and sweeps $180°$ counter-clockwise. So the question has become:

> Is there a half of the circle that holds **all** of the cut's directions at once?

### Finding that half

First, one point per direction. Lengths carry nothing here - a long segment and a short one pointing the same way make exactly the same demand of $\vec d$ - so divide each $\vec{e_i}$ by the gcd of its two coordinates. A zigzag of a hundred segments alternating between two directions shrinks to two points, and sorting brings the repeats together so `unique` can drop them.

What is left is a handful of distinct points spread around a circle, and the question is whether some half of that circle holds all of them.

Now the test. Suppose they do all fit inside one closed half circle. Then the rest of the circle - at least $180°$ of it - is empty, and an empty stretch has to sit between two **neighbours** in sorted order, because having something between them is what stops two directions from being neighbours. It works the other way too: if two neighbours are $180°$ or more apart, then everything else is crammed into what is left over, which is $180°$ or less. So the two statements are the same statement:

> the directions fit in a half circle exactly when some two neighbours, in sorted order, are at least $180°$ apart.

That is why only **neighbouring** pairs are ever compared. A wider pair always has some other direction sitting between them, so it tells us nothing.

Finding the gap also answers "which way do we push". If the big gap runs counter-clockwise from $\vec a$ to $\vec b$, take $\vec d = \vec b$. Everything then lies within $180°$ counter-clockwise of $\vec b$ - which is exactly what "every $\vec e$ is to the left of $\vec d$" asked for.

Measuring a gap needs no real angle. Going counter-clockwise from a neighbour $\vec a$ to the next one $\vec b$, the gap is somewhere in $(0°, 360°)$, and one cross product splits that range:

| $\vec a \times \vec b$ | the gap from $\vec a$ to $\vec b$ |
|---|---|
| $> 0$ | less than $180°$ |
| $< 0$ | more than $180°$ |
| $= 0$, and $\vec a \cdot \vec b < 0$ | exactly $180°$ |
| $= 0$, and $\vec a \cdot \vec b > 0$ | nothing at all - the same direction twice |

The last row cannot happen between neighbours, since `unique` has already removed the repeats. It can only come up when a single direction is left over and the loop ends up comparing it with itself, and that case is the opposite of what the row says: one direction means the cut is straight, the whole circle is one enormous gap, and the pieces certainly come apart. So it is answered separately, before the loop, with `m == 1`.

The neighbours run in a circle, not a line, so the pair (last, first) has to be checked as well - that is the `% m`.

**Careful:** sorting by angle needs a comparator, and `atan2` is not it. Split the directions into the upper half of the circle ($y > 0$, plus $y = 0$ with $x > 0$) and the lower half, order those two groups first, and inside a group compare two directions with $\vec a \times \vec b > 0$. All integers, no rounding.

**Careful:** the cross products must be computed in `long long`. A coordinate reaches $10^6$, so a segment reaches $2 \cdot 10^6$ and a cross product reaches $8 \cdot 10^{12}$ - far past `int`.

## Example

The first cut, $(3,0) (2,2) (3,1) (3,4) (2,3) (3,5)$, has five segments:

| segment | $\vec{e_i}$ | direction | angle |
|---|---|---|---|
| $(3,0) \rightarrow (2,2)$ | $(-1, 2)$ | $(-1, 2)$ | $116.57°$ |
| $(2,2) \rightarrow (3,1)$ | $(1, -1)$ | $(1, -1)$ | $315°$ |
| $(3,1) \rightarrow (3,4)$ | $(0, 3)$ | $(0, 1)$ | $90°$ |
| $(3,4) \rightarrow (2,3)$ | $(-1, -1)$ | $(-1, -1)$ | $225°$ |
| $(2,3) \rightarrow (3,5)$ | $(1, 2)$ | $(1, 2)$ | $63.43°$ |

Sorted by angle the five directions sit at $63.43°, 90°, 116.57°, 225°, 315°$, and the gaps between neighbours are $26.57°, 26.57°, 108.43°, 90°$ and $108.43°$ back around to the start. The largest is only $108.43°$, so no half circle holds all five and the answer is `NO`.

The second cut is the zigzag $(-1,1), (1,1), (-1,1), (1,1), (-1,1)$, which is only **two** directions after the duplicates go: $45°$ and $135°$. The two gaps are $90°$ and $270°$, and $270°$ is more than enough - anything in that gap works as $\vec d$, for instance $\vec d = (1, 0)$, straight to the right. The answer is `YES`.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

struct v{

    ll x, y;
};

ll cross(v a, v b){

    return (a.x * b.y) - (a.y * b.x);
}

ll dot(v a, v b){

    return (a.x * b.x) + (a.y * b.y);
}

// 0 for the upper half of the circle, 1 for the lower one
int half(v a){

    return (a.y < 0 || (a.y == 0 && a.x < 0)) ? 1 : 0;
}

bool byAngle(v a, v b){

    if(half(a) != half(b)) return half(a) < half(b);
    return cross(a, b) > 0;
}

bool same(v a, v b){

    return a.x == b.x && a.y == b.y;
}

int main() {
    iostream::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;

    while(t--) {

        ll w, h;
        int n;
        cin >> w >> h >> n;

        vector<v> p(n);
        for(int i = 0; i < n; i++) cin >> p[i].x >> p[i].y;

        vector<v> dir;

        for(int i = 0; i + 1 < n; i++) {

            v e = {p[i + 1].x - p[i].x, p[i + 1].y - p[i].y};

            ll g = __gcd(llabs(e.x), llabs(e.y));      // keep only the direction
            e.x /= g;
            e.y /= g;

            dir.push_back(e);
        }

        sort(dir.begin(), dir.end(), byAngle);
        dir.erase(unique(dir.begin(), dir.end(), same), dir.end());

        int m = dir.size();
        bool ok = (m == 1);                            // one direction only - a straight cut

        for(int i = 0; i < m && !ok; i++) {

            v a = dir[i], b = dir[(i + 1) % m];        // neighbours around the circle

            ll c = cross(a, b);

            // the turn from a to b is more than half a circle, or exactly half of it
            if(c < 0 || (c == 0 && dot(a, b) < 0)) ok = true;
        }

        cout << (ok ? "YES" : "NO") << "\n";
    }

    return 0;
}
```

`w` and `h` are read and never used again. That is not an oversight - the plate's size genuinely cannot change the answer, and it is worth noticing that it does not.

`unique` removes only **neighbouring** duplicates, which is exactly why the sort has to come first. 

The gcd is not decoration either. Drop it and a straight cut recorded as two pieces of different lengths - say $(2, 3)$ followed by $(4, 6)$ - arrives at `unique` as two different vectors and survives as two directions. The `m == 1` shortcut never fires, the loop finds a gap of nothing between them, and the answer comes back `NO` for a cut that any child could pull apart.

## Complexity

Time $O(n \log n)$ per testcase, all of it the sort
Memory $O(n)$
