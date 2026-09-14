>In this lesson we stop being handed a polygon and build one ourselves - the tightest one that holds a whole set of points.

### What is a convex hull

Hammer a nail into every point, stretch a rubber band around all of them and let go. The shape it snaps into is the **convex hull** - the smallest convex polygon that contains every point.

Two things follow straight from that picture:

- a point strictly inside never touches the band
- neither does a point sitting in the middle of one of its straight sides

So the hull is usually far smaller than the input, and what we want back is only its corners, in walking order.

	![[hull-rubber-band.png|Six points with a rubber band stretched around them, touching only the four corner points, while (2,2) and (1,3) sit inside and (2,0) lies on a straight side, so all three are skipped]]

### Graham scan

The whole algorithm is three steps.

**1. Pick the pivot: the lowest point, and the leftmost one if several tie.**

- Why is it certainly a corner? Draw a horizontal line through it. Every other point is on that line or above it, so the pivot sits on the edge of the whole set, not buried in the middle of it. A rubber band has to touch it.

**2. Sort everything else by angle around the pivot.**

- Because the pivot is the lowest point, every other point is above it (or level with it and to the right), so all the angles run from `0` to just under `180` - no wraparound, no ambiguity. Points sharing an angle go closest first.

- That sorted order is the real reason the algorithm works. Walk the finished hull counter-clockwise starting at the pivot: each corner sits at a bigger angle than the one before it, because a convex shape cannot double back on itself.

- So the hull's corners are **already** sitting in the sorted list, in exactly the order we want, with the non-corners scattered in between. We are not searching for the hull. We are deleting everything that is not the hull.

**3. Walk the list with a stack.**

- Before pushing the next point, look at the last two on the stack. If they and the new point do not make a **left turn**, the middle one is a dent, so pop it. Keep popping until the turn is a left turn, then push.

- Why is throwing that middle point away safe? Say the stack ends `... A B` and the next point is `C`. The sort put `A` before `B` before `C`, and the turn at `B` bends the wrong way. Together those leave `B` inside the triangle made by the pivot, `A` and `C` - and all three of those are points we were given. A rubber band around them passes straight over `B` without touching it. `B` is not a corner, and no point arriving later can make it one.

	![[graham-pop.png|A stack ending in A then B with the next point C turning the wrong way, so B is popped, and the resulting hull on the right where B sits strictly inside the triangle]]

So nothing that belongs on the hull is ever thrown away, and whatever survives on the stack turns left at every step - which is exactly what a convex chain is.

	![[graham-scan-steps.png|The three stages of Graham scan: choosing the lowest point as the pivot, sorting the remaining points by angle around it, and walking them to build the hull]]

### Implementation

Notice that `orientation` is doing all of the work again: once inside the sort, once inside the pop test. No angle is ever actually computed.

GrahamScan.cpp
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

char orientation(v a, v b, v c){ // where is c, relative to the line ab

    long long prod = cross(sub(b, a), sub(c, a));

    if(prod > 0){
        return '+';
    }

    if(prod < 0){
        return '-';
    }

    return '=';
}

long long dist2(v a, v b){

    long long dx = a.x - b.x, dy = a.y - b.y;

    return dx * dx + dy * dy;
}

v pivot; //every angle in the sort is measured from here

bool sort_function(v a, v b){

    char t = orientation(pivot, a, b);

    if(t == '='){ //same angle, so the closer one comes first
        return dist2(pivot, a) < dist2(pivot, b);
    }

    return t == '+';
}

vector<v> convexHull(vector<v> p){

    int n = p.size();

    int piv = 0; //lowest, then leftmost
    for(int i = 1; i < n; i++){
        if(p[i].y < p[piv].y || (p[i].y == p[piv].y && p[i].x < p[piv].x)){
            piv = i;
        }
    }
    swap(p[0], p[piv]);

    pivot = p[0];
    sort(p.begin() + 1, p.end(), sort_function);

    vector<v> hull;

    for(int i = 0; i < n; i++){
        while(hull.size() >= 2 && orientation(hull[hull.size() - 2], hull.back(), p[i]) != '+'){
            hull.pop_back();
        }

        hull.push_back(p[i]);
    }

    return hull;
}

int main(){

    vector<v> p = {{0, 0}, {4, 0}, {4, 4}, {0, 4}, {2, 2}, {2, 0}, {1, 3}};

    vector<v> hull = convexHull(p);

    cout<<hull.size()<<'\n';

    for(int i = 0; i < hull.size(); i++){
        cout<<hull[i].x<<" "<<hull[i].y<<'\n';
    }

    return 0;
}
```
Output:
`4`
`0 0`
`4 0`
`4 4`
`0 4`

Four corners, counter-clockwise. `(2, 2)` and `(1, 3)` are strictly inside and never survived a turn test. `(2, 0)` sits exactly in the middle of the bottom edge: it was pushed, then popped as soon as `(4, 0)` arrived, because the turn there is `=` and not `+`.

### Complexity

The sort is the whole cost: **O(n log n)**.

The scan after it is **O(n)** - every point is pushed exactly once and popped at most once, so the inner `while` cannot run more than `n` times in total, no matter how it looks.

>Note:
>The pop test is `!= '+'`, which throws away points lying exactly on a hull edge - usually what we want. If a problem asks for every point on the border, pop only on `'-'` instead.
