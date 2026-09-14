>In this lesson we close the chapter with the one shape that is not made of straight pieces.

A circle has no corners to take orientations of, so none of the cross product machinery transfers. What replaces it is simpler: a circle is just **every point at distance `r` from the centre**, and we have been measuring distance since the first lesson.

### A point and a circle

Keep `r` exactly as it came in and reach for `r * r` in every comparison - the same rule as `dist2`, for the same reason. Both sides are non-negative, so squaring changes nothing except keeping us in whole numbers:

- `dist2(C, P) < r * r` => inside
- `dist2(C, P) == r * r` => exactly on the circle
- `dist2(C, P) > r * r` => outside

PointCircle.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

struct v{

    long long x, y;
};

struct circle{

    v c;
    long long r;
};

v sub(v a, v b){

    return {a.x - b.x, a.y - b.y};
}

long long dot(v a, v b){

    return (a.x * b.x) + (a.y * b.y);
}

long long cross(v a, v b){

    return (a.x * b.y) - (a.y * b.x);
}

long long dist2(v a, v b){

    return dot(sub(a, b), sub(a, b));
}

int pointVsCircle(circle k, v p){ // 1 inside, 0 on the circle, -1 outside

    long long d2 = dist2(k.c, p);
    long long r2 = k.r * k.r;

    if(d2 < r2){
        return 1;
    }

    if(d2 == r2){
        return 0;
    }

    return -1;
}

int main(){

    circle k = {{0, 0}, 5};

    cout<<pointVsCircle(k, {3, 3})<<'\n'; //inside
    cout<<pointVsCircle(k, {3, 4})<<'\n'; //exactly on it
    cout<<pointVsCircle(k, {5, 5})<<'\n'; //outside

    return 0;
}
```
Output:
`1`
`0`
`-1`

Every value here is a whole number, so "exactly on the circle" is a question we can actually answer. It is the last time in this lesson that things are this comfortable.

Every snippet from here on assumes these functions are already written above it.

### A line and a circle

One number decides everything: the perpendicular distance `d` from the centre to the line.

| | Points |
| ---- | ---- |
| `d > r` | 0, the line misses |
| `d = r` | 1, a **tangent** |
| `d < r` | 2 |

	![[line-circle-cases.png|Three circles with a line at different distances d from the centre: d greater than r gives no intersection points, d equal to r gives one, and d less than r gives two]]

The previous lesson gives us `d`, and we only want to compare it with `r`, so we square both sides and the count stays in integers:

$$(\vec{AB} \times \vec{AC})^2 \quad \text{against} \quad r^2 \cdot |\vec{AB}|^2$$

For the points themselves there is no avoiding real numbers, but the construction is short:

1. Drop a perpendicular from the centre onto the line. Where it lands is the **foot** - the shadow from the previous lesson puts it at $A + t \cdot \vec{AB}$ with $t = \frac{\vec{AB} \cdot \vec{AC}}{|\vec{AB}|^2}$.
2. The foot, the centre and one intersection point make a right triangle with hypotenuse `r` and one leg `d`, so the third side is $\sqrt{r^2 - d^2}$.
3. Step that far off the foot in both directions and you land on both points.

	![[line-circle-construction.png|A circle with a line cutting it, the perpendicular of length d dropped from the centre C to the foot on the line, and the right triangle with hypotenuse r whose other leg, the square root of r squared minus d squared, is the step to each intersection point]]

LineCircle.cpp
```c++
struct point{

    double x, y;
};

int lineCircle(circle k, v a, v b, vector<point> &out){ //returns how many points

    v ab = sub(b, a);
    v ac = sub(k.c, a);

    long long ab2 = dot(ab, ab);
    long long cr = cross(ab, ac);

    long long lhs = cr * cr; //squared distance to the line, times ab2
    long long rhs = k.r * k.r * ab2;

    out.clear();

    if(lhs > rhs){ //the line misses the circle
        return 0;
    }

    double t = (double)dot(ab, ac) / ab2; //the foot of the perpendicular
    point foot = {a.x + t * ab.x, a.y + t * ab.y};

    if(lhs == rhs){ //tangent, the foot is the single point
        out.push_back(foot);
        return 1;
    }

    double d2 = (double)lhs / ab2; //the real squared distance
    double step = sqrt(((double)k.r * k.r - d2) / ab2); //how far to walk, in units of ab

    out.push_back({foot.x - step * ab.x, foot.y - step * ab.y});
    out.push_back({foot.x + step * ab.x, foot.y + step * ab.y});

    return 2;
}

void print(vector<point> p){

    for(int i = 0; i < p.size(); i++){
        cout<<" ("<<p[i].x<<", "<<p[i].y<<")";
    }

    cout<<'\n';
}

int main(){

    cout<<fixed<<setprecision(2);

    circle k = {{0, 0}, 5};
    vector<point> p;

    cout<<lineCircle(k, {-10, 3}, {10, 3}, p); print(p); //cuts through
    cout<<lineCircle(k, {-10, 5}, {10, 5}, p); print(p); //tangent at the top
    cout<<lineCircle(k, {-10, 7}, {10, 7}, p); print(p); //misses

    return 0;
}
```
Output:
`2 (-4.00, 3.00) (4.00, 3.00)`
`1 (0.00, 5.00)`
`0`

This is about the **line** through `A` and `B`, not the segment. For a segment, find the points first and then check each one with the shadow test from the previous lesson.

### Two circles

Again one number decides it: the distance `d` between the two centres, weighed against the two radii. Slide the circles apart in your head and every case shows up in order:

| Case | Points |
| ---- | ---- |
| $d > r_1 + r_2$ | 0, too far apart |
| $d = r_1 + r_2$ | 1, touching from outside |
| $\|r_1 - r_2\| < d < r_1 + r_2$ | 2 |
| $d = \|r_1 - r_2\|$ | 1, touching from inside |
| $d < \|r_1 - r_2\|$ | 0, one is inside the other |
| $d = 0$ and $r_1 = r_2$ | the same circle, infinitely many |

	![[circle-circle-cases.png|Five arrangements of two circles ordered by the distance d between their centres, giving 0, 1, 2, 1 and 0 intersection points as the circles move from fully apart to one inside the other]]

Squaring gets the whole table back into integers - compare $d^2$ with $(r_1 + r_2)^2$ and $(r_1 - r_2)^2$, and the absolute value disappears on its own.

The construction mirrors the line case. The two points are symmetric about the line joining the centres, which they cross at distance $a = \frac{d^2 + r_1^2 - r_2^2}{2d}$ from $C_1$, and Pythagoras gives the perpendicular step $h = \sqrt{r_1^2 - a^2}$. To step perpendicular to $(x, y)$ we use $(-y, x)$ - the same vector turned a quarter turn.

	![[circle-circle-construction.png|Two overlapping circles with centres C1 and C2, the distance a measured along the centre line to the crossing chord, and the half chord h perpendicular to it reaching both intersection points]]

CircleCircle.cpp
```c++
int circleCircle(circle k1, circle k2, vector<point> &out){ //-1 means the same circle

    v dc = sub(k2.c, k1.c);
    long long d2 = dot(dc, dc);

    out.clear();

    if(d2 == 0){ //same centre - either the same circle or nothing
        return (k1.r == k2.r) ? -1 : 0;
    }

    long long sum = (k1.r + k2.r) * (k1.r + k2.r);
    long long dif = (k1.r - k2.r) * (k1.r - k2.r);

    if(d2 > sum || d2 < dif){
        return 0;
    }

    double d = sqrt((double)d2);
    double a = ((double)d2 + (double)k1.r * k1.r - (double)k2.r * k2.r) / (2 * d);

    point base = {k1.c.x + a * dc.x / d, k1.c.y + a * dc.y / d};

    if(d2 == sum || d2 == dif){ //tangent, from outside or from inside
        out.push_back(base);
        return 1;
    }

    double h = sqrt((double)k1.r * k1.r - a * a);
    point step = {-h * dc.y / d, h * dc.x / d}; //perpendicular to the line of centres

    out.push_back({base.x - step.x, base.y - step.y});
    out.push_back({base.x + step.x, base.y + step.y});

    return 2;
}

int main(){

    cout<<fixed<<setprecision(2);

    circle k = {{0, 0}, 5};
    vector<point> p;

    cout<<circleCircle(k, {{8, 0}, 5}, p); print(p); //overlapping
    cout<<circleCircle(k, {{10, 0}, 5}, p); print(p); //touching from outside
    cout<<circleCircle(k, {{20, 0}, 5}, p); print(p); //too far apart
    cout<<circleCircle(k, {{1, 0}, 1}, p); print(p); //the small one is inside
    cout<<circleCircle(k, {{0, 0}, 5}, p); print(p); //the same circle

    return 0;
}
```
Output:
`2 (4.00, -3.00) (4.00, 3.00)`
`1 (5.00, 0.00)`
`0`
`0`
`-1`

The fourth line deserves a second look. Zero points, and yet the small circle sits comfortably inside the big one - the count says nothing about containment, which is a separate test: $d + r_2 \le r_1$.

### The trap: tangency

Every table in this lesson has a middle row where two things are exactly equal, and those rows are the ones that break solutions.

With integer input we are fine - `lhs == rhs` and `d2 == sum` compare whole numbers. But once a circle comes out of a computation instead of the input, a tangency that should land on `d == r` arrives $10^{-15}$ off, and the answer silently becomes 0 or 2 points instead of 1.

So when doubles are unavoidable, compare with a tolerance:

~!
```c++
const double EPS = 1e-9;

if(abs(d - r) < EPS){ //treat it as a tangent
    ...
}
```

`EPS` is a **tolerance, not a magic number**. `1e-9` is reasonable around 1 and hopelessly tight around $10^9$, where a `double` has already lost those digits. It also changes the answer: circles that miss by $10^{-12}$ are now reported as touching. Usually that is what a problem wants - but it is a decision either way.

>Note:
>With integer input, do not introduce doubles just to compare. Every counting question here is exact in `long long`; only the point coordinates need a `sqrt`. Watch `cr * cr` in `lineCircle` though - `cr` alone reaches $4 \cdot 10^{18}$, so the exact test only holds up to coordinates of roughly $10^4$.

And that closes the chapter. Orientation, segment crossings, polygon area, the hull, and now circles all came out of two operations on vectors. Learn the dot and cross product properly and the rest is bookkeeping.
