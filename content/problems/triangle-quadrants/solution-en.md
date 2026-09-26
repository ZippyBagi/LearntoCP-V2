
## Approach

The four quadrants are all the same shape, so let's answer one question - does the triangle have an interior point in quadrant $1$, the one with $x > 0$ and $y > 0$ - and then run the same code four times with the signs flipped.

Cutting the triangle along the two axes and measuring what is left works, but it drags in fractions: the corners of the cut-off piece land in the middle of the axes, at coordinates that are not whole numbers. There is a way to answer the question with nothing but `orientation` from the Lines lesson.

### Turn it around

Ask when the triangle **misses** the quadrant instead. Two convex shapes with no common area can always be told apart by a straight line: the triangle on one side, the quadrant on the other. A shape that would have to squeeze past the line to reach the other side simply cannot.

That would be an infinite number of lines to try, except for one thing. Take a separating line and slide it and turn it until it cannot move any further towards the triangle. It ends up **pressed flat** against one of the two shapes - lying along a side of the triangle, or along one of the axes. So five lines decide everything:

- the $y$ axis,
- the $x$ axis,
- and the three lines carrying the sides of the triangle.

If none of these five separates the triangle from the quadrant, nothing does, and the quadrant gets a `+`.

### Walk it counter-clockwise first

"Which side of the line" is exactly what `orientation` answers, so the last three lines are already within reach. The annoying part is that the answer for the triangle itself depends on the order the vertices happened to be read in: for one input the triangle is `+` of its own side, for the mirrored input it is `-`.

Fix it once, at the start:

~!
```cpp
if(orientation(p[0], p[1], p[2]) == '-') swap(p[1], p[2]);
```

Swapping two vertices draws the same triangle, only walked the other way round. After this the three vertices always run counter-clockwise, and that means the triangle is on the `+` side of **every one of its own sides**. From here on nothing has to remember which side anything is on - we only ever ask "is this `+`?".

### The two axes

Quadrant $1$ lies entirely in $x \ge 0$. So the $y$ axis separates it from the triangle exactly when the triangle lies entirely in $x \le 0$ - that is, when all three vertices have $x \le 0$. The $x$ axis is the same story with $y$.

For the other quadrants the inequality flips, which is why the code carries the two signs $s_x$ and $s_y$ around and writes the test as $s_x \cdot x_i \le 0$ for every vertex.

### A side of the triangle

Take the side from `a` to `b`. The triangle is on the `+` side of it, so this line separates the two exactly when **no point of the quadrant** is `+`.

The quadrant holds infinitely many points, but we do not have to visit them. Every point of quadrant $1$ is reached from the origin by walking some distance along the $x$ axis and then some distance along the $y$ axis, and `orientation` is driven by a cross product, which changes at a steady rate as we walk in a fixed direction - it never sneaks from `-` up to `+` and back. So three questions settle the whole quadrant:

- where is the origin,
- what does a step along the first road do,
- what does a step along the second road do.

The last two ask about **directions**, and `orientation` wants points. Take the step from `a` itself: `a` lies on the line and contributes nothing, so `orientation(a, b, add(a, alongX))` measures the step and only the step.

If none of the three comes back `+`, the whole quadrant sits on the far side of that line, and the quadrant is out.

**Careful:** this is why `orientation` computes its cross product in `long long`. A coordinate reaches $10^6$, so a difference reaches $2 \cdot 10^6$ and the cross product reaches $8 \cdot 10^{12}$ - far past `int`.

## Example

Take the fourth testcase, the triangle $(0, 0)$, $(-3, 1)$, $(1, -3)$, which has a vertex sitting exactly at the origin. `orientation` of the three vertices is `+`, so they already run counter-clockwise and nothing gets swapped.

Now ask about quadrant $1$. Neither axis separates - the triangle has a vertex with $x > 0$ and one with $y > 0$ - so we try its sides, and the very first one, from $(0,0)$ to $(-3,1)$, settles it:

| what we ask about quadrant $1$ | `orientation` |
|---|---|
| where is the origin | `=` |
| where does a step along the $x$ axis land | `-` |
| where does a step along the $y$ axis land | `-` |

Not one of them is `+`, so every point of quadrant $1$ lies on the far side of that line while the triangle lies on the near side. The quadrant is out.

The other three quadrants survive all five lines:

| quadrant | verdict |
|---|---|
| $1$ | `-`, separated by the side from $(0,0)$ to $(-3,1)$ |
| $2$ | `+` |
| $3$ | `+` |
| $4$ | `+` |

In the first three testcases no side of the triangle is ever needed - every `-` is decided by an axis alone, because those triangles lie wholly on one side of one.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

struct v{

    long long x, y;
};

v add(v a, v b){

    return {a.x + b.x, a.y + b.y};
}

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

// does the triangle p, walked counter-clockwise, reach the quadrant with signs (sx, sy)?
bool reaches(v p[3], long long sx, long long sy){

    // the y axis: the quadrant is on the sx side of it, so it separates the two
    // when the whole triangle sits on the other side. then the same for the x axis
    if(sx * p[0].x <= 0 && sx * p[1].x <= 0 && sx * p[2].x <= 0) return false;
    if(sy * p[0].y <= 0 && sy * p[1].y <= 0 && sy * p[2].y <= 0) return false;

    v origin = {0, 0};
    v alongX = {sx, 0}, alongY = {0, sy}; // the two roads, walked away from the centre

    for(int i = 0; i < 3; i++){

        v a = p[i], b = p[(i + 1) % 3];

        // counter-clockwise, so the triangle is on the '+' side of its own side ab,
        // and this side separates the two when nothing of the quadrant is '+'
        if(orientation(a, b, origin) == '+') continue;
        if(orientation(a, b, add(a, alongX)) == '+') continue;
        if(orientation(a, b, add(a, alongY)) == '+') continue;

        return false;
    }

    return true;
}

int main(){

    iostream::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;

    while(t--){

        v p[3];
        for(int i = 0; i < 3; i++) cin >> p[i].x >> p[i].y;

        // walk the triangle counter-clockwise, so its inside is always the '+' side
        if(orientation(p[0], p[1], p[2]) == '-') swap(p[1], p[2]);

        cout << (reaches(p,  1,  1) ? '+' : '-')
             << (reaches(p, -1,  1) ? '+' : '-')
             << (reaches(p, -1, -1) ? '+' : '-')
             << (reaches(p,  1, -1) ? '+' : '-') << "\n";
    }

    return 0;
}
```

Notice that a `=` counts as separated, and that the axis tests use `<= 0` rather than `< 0`. That is what makes touching not count. A triangle that only leans against an axis is still separated by it, and a quadrant that only reaches the line of a side never gets inside the triangle, so both stay `-`.

## Complexity

Time $O(1)$ per testcase - four quadrants, five lines each
Memory $O(1)$
