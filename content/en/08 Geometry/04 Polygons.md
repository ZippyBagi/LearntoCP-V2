>In this lesson we stop looking at two points at a time and start looking at whole shapes.

A **polygon** is a closed chain of points. We store it as a `vector` of points, in the order we walk around it, and the last point connects back to the first - we never write that closing edge down, we just remember it is there.

### Two words

- a polygon is **simple** when its edges never cross each other. Everything in this lesson assumes a simple polygon.
- a polygon is **convex** when it has no dents - walking around it we always turn the same way. Anything else is concave.

The points can be listed clockwise or counter-clockwise, and both draw the same shape. Which one we got is not noise though, and the next section hands it to us for free.

### The area

Take any polygon and connect every corner to the origin `(0, 0)`. The polygon is now cut into triangles - one per edge, spread out like a fan.

We already know the area of a triangle with a corner at the origin: it is `cross(p[i], p[j]) / 2`. So we just add them all up.

The catch is that the fan does not fit the polygon. Some triangles stick out past the edges, and if the origin is outside the polygon they can miss it entirely.

That is exactly what the **sign** fixes. Walking around the polygon, the far side is walked one way and the near side the other, so anything sticking out gets added once and subtracted once. Everything outside the polygon cancels, and only the polygon survives - no matter where the origin sits.

	![[shoelace-lacing.png|The shoelace formula laid out as two rows of x and y coordinates with arrows crossing between them like laces, one diagonal summing to 24 and the other to 3, giving an area of 21 over 2, which is 10.5]]

Writing those cross products out gives the **shoelace formula**:

$$2 \cdot P = \sum_{i=0}^{n-1} (x_i \, y_{i+1} - x_{i+1} \, y_i)$$

where the index `n` wraps back to `0`.

>The name comes from the picture: the products cross between the two rows the way laces cross a shoe.

### Running it by hand

Let's take the quadrilateral `(0,0) (4,0) (4,3) (1,3)`:

| `p[i]` | `p[i+1]` | term | value |
| ---- | ---- | ---- | ---- |
| `(0, 0)` | `(4, 0)` | $0 \cdot 0 - 4 \cdot 0$ | `0` |
| `(4, 0)` | `(4, 3)` | $4 \cdot 3 - 4 \cdot 0$ | `12` |
| `(4, 3)` | `(1, 3)` | $4 \cdot 3 - 1 \cdot 3$ | `9` |
| `(1, 3)` | `(0, 0)` | $1 \cdot 0 - 0 \cdot 3$ | `0` |

The sum is `21`, so the area is `10.5`.

Two things are worth noticing. The sum is **twice** the area, and it is always a whole number, so it stays exact in `long long`. And it is **signed** - positive when the points are given counter-clockwise, negative when clockwise. One loop, two answers.

Shoelace.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

struct v{

    long long x, y;
};

long long cross(v a, v b){

    return (a.x * b.y) - (a.y * b.x);
}

long long doubledArea(vector<v> p){

    long long sum = 0;

    for(int i = 0; i < p.size(); i++){
        int j = (i + 1) % p.size(); //the last point wraps back to the first

        sum += cross(p[i], p[j]);
    }

    return sum;
}

int main(){

    vector<v> p = {{0, 0}, {4, 0}, {4, 3}, {1, 3}};

    long long d = doubledArea(p);

    cout<<d<<'\n';
    cout<<d / 2.0<<'\n';

    reverse(p.begin(), p.end()); //same shape, walked the other way
    cout<<doubledArea(p)<<'\n';

    return 0;
}
```
Output:
`21`
`10.5`
`-21`

>Keep the doubled value and halve it only when a real number is actually needed. `21` is exact, `21 / 2` in integers is `10`, and the sign is the direction we walked.

Every snippet from here on assumes `v`, `cross` and `orientation` from the previous lesson are already written above it.
### Is the polygon convex

Walk around the polygon and watch the turn at every corner. In a convex polygon we always turn the same way - all left, or all right. The first corner that turns the other way is a dent.

Three points in a row are exactly what `orientation` takes, so the turn at a corner is `orientation` of that corner together with its two neighbours. We never care whether the answer is `+` or `-`, only that it never changes - which is why this works for both walking directions with no preparation.

Two details:

- The triples wrap around, so the last two corners take their neighbours from the front of the vector.
- `=` means three points on one straight line, which is not a turn at all. Skipping those keeps a polygon with a flat side convex.

	![[polygon-turn-signs.png|Three polygons with a sign chipped at each vertex: a square where every turn is positive is convex, a shape with one negative turn is not, and a square with a collinear point marked equals is still convex]]

Convex.cpp
```c++
bool isConvex(vector<v> p){

    char turn = '=';

    for(int i = 0; i < p.size(); i++){
        int j = (i + 1) % p.size();
        int k = (i + 2) % p.size();

        char o = orientation(p[i], p[j], p[k]);

        if(o == '='){ //three points in a row, no turn to judge
            continue;
        }

        if(turn == '='){ //the first real turn sets the direction
            turn = o;
        }
        else if(o != turn){
            return false;
        }
    }

    return true;
}

int main(){

    vector<v> square = {{0, 0}, {4, 0}, {4, 4}, {0, 4}};
    vector<v> arrow = {{0, 0}, {4, 0}, {4, 4}, {2, 1}, {0, 4}};
    vector<v> flat = {{0, 0}, {2, 0}, {4, 0}, {4, 4}, {0, 4}};

    cout<<isConvex(square)<<'\n';
    cout<<isConvex(arrow)<<'\n';
    cout<<isConvex(flat)<<'\n';

    return 0;
}
```
Output:
`1`
`0`
`1`

The arrow has a corner pushed inwards at `(2, 1)`, and that one turn comes back `-` while every other turn is `+`. The third shape is the square again with an extra corner in the middle of its bottom side: that corner returns `=`, gets skipped, and the answer stays `1`.

>Note:
>The turn test says nothing about whether the polygon is simple. A five pointed star turns the same way at every one of its corners and still crosses itself, so when the problem does not promise a simple polygon, that has to be checked separately.

### Summary

| Question                         | Test                                     |
| -------------------------------- | ---------------------------------------- |
| Area of a polygon                | shoelace sum, halved                     |
| Which way the points were listed | sign of the shoelace sum                 |
| Is the polygon convex            | every turn has the same sign             |
