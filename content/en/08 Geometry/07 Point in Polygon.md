>In this lesson we will learn how to check whether a point is inside a polygon - the one question a person answers by looking, and a computer cannot.

For a **convex** polygon we could almost guess the answer: a point inside stays on the same side of every edge, so the first edge that puts it on the other side proves it is outside.

Most polygons in problems are not convex, and a single dent ruins that idea - a point can sit deep inside the shape and still be on the wrong side of the edge making the dent.

So we need something that ignores the shape completely.

### The ray trick

Stand at the point `T` and walk straight to the right, forever. Count how many edges you cross.

Far enough to the right you are certainly **outside**. Now walk back towards `T`: every edge you cross is a border, and crossing a border flips you between outside and inside.

So all we have to do is count:

- **odd** number of crossings => `T` is inside
- **even** number of crossings => `T` is outside

Dents, spikes and long thin corridors all work, because each one is still just a border being crossed.

	![[ray-casting-parity.png|A polygon with a notch and three horizontal rays cast from different points, counting 3, 3 and 0 crossings, so odd counts mean inside and even counts mean outside]]

### When does an edge count

An edge from `A` to `B` is crossed when two things are true:

1. It **reaches across the height of `T`** - one end above `T`, the other below.
2. The crossing is **to the right** - edges to the left of `T` are none of our business.

The first is a comparison of `y` values. The second is a question about sides, so `orientation` answers it: for an edge going up, the crossing is on the right exactly when `T` is on its left. For an edge going down, the sign flips.

	![[ray-crossing-test.png|Three grids showing when an edge counts for the ray from T: it does not when both ends are above the ray, it does not when the crossing is behind T, and it does when the edge reaches across and the crossing lies ahead]]

### The corner problem

Here is the one thing that breaks this algorithm.

When the ray passes exactly through a corner, two edges meet there. If both of them count, the parity is off by one and the answer flips.

The fix is one character - write the height test as **strictly above** on both sides:

~!
```c++
(a.y > t.y) != (b.y > t.y)
```

A corner at `T`'s height is not above `T`, so it gives the same `false` to both of its edges. The edge whose other end is above gets `true != false` and counts. The edge going down gets `false != false` and does not. Exactly one crossing, which is what we wanted.

The same rule quietly disposes of horizontal edges too: both ends are at the same height, so the two sides of the `!=` always agree, and the edge is skipped.

	![[ray-corner-rule.png|Three grids where the ray grazes a polygon corner, counting 1 crossing when one edge goes up and the other down, 0 when both go down, and 2 when both go up, so a grazed corner never flips the parity]]

>Note:
>`>` on both sides, never `>=` on one. It looks like an arbitrary detail and it is the whole correctness argument - get it wrong and your solution passes every test you draw by hand, then fails on the one with a flat top.

### Implementation

One thing left. The ray test says nothing dependable about a point sitting exactly **on** an edge, so we check the edges with `onSegment` first and let the caller decide what the border means.

The polygon is the arrow from the Polygons lesson - a square with a notch pushed down into it at `(2, 1)`.

PointInPolygon.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

struct v{

    long long x, y;
};

v sub(v a, v b){

    return {a.x - b.x, a.y - b.y};
}

long long cross(v a, v b){

    return (a.x * b.y) - (a.y * b.x);
}

char orientation(v a, v b, v c){

    long long prod = cross(sub(b, a), sub(c, a));

    if(prod > 0){
        return '+';
    }

    if(prod < 0){
        return '-';
    }

    return '=';
}

bool inBox(v a, v b, v p){

    return min(a.x, b.x) <= p.x && p.x <= max(a.x, b.x) &&
           min(a.y, b.y) <= p.y && p.y <= max(a.y, b.y);
}

bool onSegment(v a, v b, v p){

    return orientation(a, b, p) == '=' && inBox(a, b, p);
}

bool crossesToTheRight(v a, v b, v t){

    if((a.y > t.y) == (b.y > t.y)){ //the edge does not reach across t's height
        return false;
    }

    char o = orientation(a, b, t);

    return (b.y > a.y) ? (o == '+') : (o == '-'); //is the crossing on the right
}

int locate(vector<v> p, v t){ // 1 inside, -1 outside, 0 on the border

    int n = p.size();
    int crossings = 0;

    for(int i = 0; i < n; i++){
        int j = (i + 1) % n; //the last edge wraps back to the first point

        if(onSegment(p[i], p[j], t)){
            return 0;
        }

        if(crossesToTheRight(p[i], p[j], t)){
            crossings++;
        }
    }

    return (crossings % 2 == 1) ? 1 : -1;
}

int main(){

    vector<v> arrow = {{0, 0}, {4, 0}, {4, 4}, {2, 1}, {0, 4}};

    cout<<locate(arrow, {1, 1})<<'\n'; //inside
    cout<<locate(arrow, {2, 2})<<'\n'; //in the notch
    cout<<locate(arrow, {5, 1})<<'\n'; //well outside
    cout<<locate(arrow, {2, 0})<<'\n'; //in the middle of the bottom edge
    cout<<locate(arrow, {2, 1})<<'\n'; //the dented corner itself

    return 0;
}
```
Output:
`1`
`-1`
`-1`
`0`
`0`

Notice that the direction of the walk never came up, so nothing has to be prepared beforehand. This is **O(n)** per point.

### Faster, for convex polygons

**O(n)** per point is fine once. When a problem fixes one polygon and then asks about $10^5$ points, it is not.

A convex polygon splits into a fan of triangles all sharing `p[0]`, and those triangles come in angular order. Anything in angular order can be binary searched, so:

1. Binary search which triangle of the fan the point falls into.
2. Check it against that one triangle's far edge with a single `orientation`.

Two things have to hold first: the corners are listed counter-clockwise (the shoelace sign tells us), and the point is inside the wedge between the first and last edge leaving `p[0]`.

ConvexPointInPolygon.cpp
```c++
int locateConvex(vector<v> p, v t){ // p must be convex and counter-clockwise

    int n = p.size();

    char first = orientation(p[0], p[1], t);
    char last = orientation(p[0], p[n - 1], t);

    if(first == '-' || last == '+'){ //outside the wedge at p[0]
        return -1;
    }

    if(first == '='){ //on the first edge, if it is inside the box
        return onSegment(p[0], p[1], t) ? 0 : -1;
    }

    if(last == '='){
        return onSegment(p[0], p[n - 1], t) ? 0 : -1;
    }

    int lo = 1, hi = n - 1; //find the fan triangle p[0] p[lo] p[lo+1]

    while(hi - lo > 1){
        int mid = (lo + hi) / 2;

        if(orientation(p[0], p[mid], t) != '-'){
            lo = mid;
        }
        else{
            hi = mid;
        }
    }

    char o = orientation(p[lo], p[lo + 1], t); //the far edge of that triangle

    if(o == '='){
        return 0;
    }

    return (o == '+') ? 1 : -1;
}

int main(){

    vector<v> square = {{0, 0}, {4, 0}, {4, 4}, {0, 4}}; //counter-clockwise

    cout<<locateConvex(square, {2, 2})<<'\n'; //inside
    cout<<locateConvex(square, {5, 2})<<'\n'; //outside
    cout<<locateConvex(square, {4, 2})<<'\n'; //on the right edge
    cout<<locateConvex(square, {0, 0})<<'\n'; //the pivot corner
    cout<<locateConvex(square, {2, 5})<<'\n'; //above the polygon

    return 0;
}
```
Output:
`1`
`-1`
`0`
`0`
`-1`

**O(log n)** per point, with no preparation beyond fixing the winding order.

>Note:
>Convex only. A single dent destroys the angular order the binary search depends on, and there is no cheap version for the general case.