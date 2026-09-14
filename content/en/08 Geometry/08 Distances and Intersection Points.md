>In this lesson we stop asking yes or no questions and start asking for numbers - how far, and where exactly.

Everything so far has been a sign: which side, do they cross, is it inside. That is why all of it stayed in whole numbers, and all of it was exact.

Distances and crossing points are **measurements**, and measurements come out as fractions. This is where we finally leave the integers

### The shadow

So far the dot product had one job: telling us when two vectors are perpendicular. That was underselling it.

Shine a light straight down onto $\vec{u}$ and hold $\vec{w}$ above it. The shadow that $\vec{w}$ casts on $\vec{u}$ is called its **projection**, and it starts at the start of $\vec{u}$.

The sign of the dot product alone already tells us where that shadow lands:

- `dot(u, w) > 0` => the shadow falls **forwards**, the way $\vec{u}$ points
- `dot(u, w) < 0` => it falls **backwards**, behind the start of $\vec{u}$
- `dot(u, w) = 0` => no shadow, the perpendicular case we already knew

	![[projection-shadow.png|Three grids showing the projection of w onto u as a shadow along u: pointing forwards when the dot product is positive, backwards when it is negative, and vanishing when it is zero]]

### Distance to a line

We already know two ways to write the area of the triangle `ABP`:

- with the cross product: $\frac{|\vec{AB} \times \vec{AP}|}{2}$
- the way we learned in school: $\frac{base \cdot height}{2}$

Take `AB` as the base, and the height is exactly the perpendicular distance we are after. One area, two expressions, so:

$$dist(P, AB) = \frac{|\vec{AB} \times \vec{AP}|}{|\vec{AB}|}$$

The absolute value is there because the cross product is signed and a distance is not.

	![[point-line-distance.png|Triangle ABP on a grid with the height d drawn from P down to AB, and the area written two ways, as the cross product over 2 and as base times height over 2, so d equals the cross product divided by the length of AB]]

### Distance to a segment

A segment stops, so the perpendicular is only sometimes the answer - the closest point can also be `A` or `B` itself. The shadow tells us which of the three it is:

- `dot(AB, AP) <= 0` => the shadow falls behind `A`, so `A` is closest
- `dot(AB, BP) >= 0` => it reaches past `B`, so `B` is closest
- otherwise => the perpendicular lands on the segment

	![[segment-distance-three-cases.png|Three cases for the distance from a point P to a segment AB: the perpendicular lands on the segment, or the closest point is the endpoint B, or the closest point is the endpoint A]]

Both tests are integer dot products, so picking the case costs us no precision. The only real number in the whole function is the distance we return.

Distance.cpp
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

long long dot(v a, v b){

    return (a.x * b.x) + (a.y * b.y);
}

double len(v a){

    return sqrt((double)(a.x * a.x + a.y * a.y));
}

double distToLine(v a, v b, v p){

    return abs((double)cross(sub(b, a), sub(p, a))) / len(sub(b, a));
}

double distToSegment(v a, v b, v p){

    if(dot(sub(b, a), sub(p, a)) <= 0){ //the shadow falls behind a
        return len(sub(p, a));
    }

    if(dot(sub(b, a), sub(p, b)) >= 0){ //the shadow reaches past b
        return len(sub(p, b));
    }

    return distToLine(a, b, p); //the perpendicular lands on the segment
}

int main(){

    cout<<fixed<<setprecision(4);

    v a = {0, 0};
    v b = {4, 0};

    cout<<distToLine(a, b, {1, 3})<<" "<<distToSegment(a, b, {1, 3})<<'\n';
    cout<<distToLine(a, b, {6, 3})<<" "<<distToSegment(a, b, {6, 3})<<'\n';
    cout<<distToLine(a, b, {-3, 4})<<" "<<distToSegment(a, b, {-3, 4})<<'\n';
    cout<<distToLine(a, b, {2, 0})<<" "<<distToSegment(a, b, {2, 0})<<'\n';

    return 0;
}
```
Output:
`3.0000 3.0000`
`3.0000 3.6056`
`4.0000 5.0000`
`0.0000 0.0000`

The middle two rows are where the two functions part ways: `(6, 3)` is past the end, so the closest point is `B`, and `(-3, 4)` is off the back, so it is `A`.

### Where two lines meet

Describe the first line as a walk starting at `A`:

$$P = A + t \cdot \vec{AB}$$

so `t = 0` puts us at `A`, `t = 1` at `B`, and `t = 0.5` exactly halfway. Finding the crossing point means finding one number, `t`:

$$t = \frac{\vec{AC} \times \vec{CD}}{\vec{AB} \times \vec{CD}}$$

Both halves are integer cross products, with a single division right at the end. That is the best we could do - the answer really can be a fraction.

The denominator also warns us when not to divide. It is zero exactly when the two directions are parallel:

- not zero => the lines meet at exactly one point
- zero, and `C` is not on line `AB` => parallel, they never meet
- zero, and `C` is on line `AB` => the same line written twice

LineIntersection.cpp
```c++
struct point{

    double x, y;
};

int lineIntersection(v a, v b, v c, v d, point &out){ //1 one point, 0 parallel, -1 same line

    v ab = sub(b, a);
    v cd = sub(d, c);

    long long den = cross(ab, cd);

    if(den == 0){
        return (cross(ab, sub(c, a)) == 0) ? -1 : 0;
    }

    double t = (double)cross(sub(c, a), cd) / den;

    out = {a.x + t * ab.x, a.y + t * ab.y};

    return 1;
}

int main(){

    cout<<fixed<<setprecision(2);

    v a = {0, 0};
    v b = {4, 4};

    point p;

    cout<<lineIntersection(a, b, {0, 4}, {4, 0}, p)<<" "<<p.x<<" "<<p.y<<'\n';
    cout<<lineIntersection(a, b, {0, 10}, {10, 0}, p)<<" "<<p.x<<" "<<p.y<<'\n';
    cout<<lineIntersection(a, b, {1, 0}, {5, 4}, p)<<'\n';
    cout<<lineIntersection(a, b, {2, 2}, {6, 6}, p)<<'\n';

    return 0;
}
```
Output:
`1 2.00 2.00`
`1 5.00 5.00`
`0`
`-1`

Both of the first two rows are a single crossing point, and the difference matters: `(2, 2)` is in the middle of `AB`, while `(5, 5)` is well past `B`. This function answers about **lines**, and lines do not stop.

>Note:
>There is a second way to write a line, $ax + by + c = 0$, with $a = A_y - B_y$, $b = B_x - A_x$ and $c = A_x B_y - A_y B_x$. Plugging a point into the left side gives back exactly the orientation cross product, with the line-only parts computed once ahead of time. Handy when one line is tested against very many points.

### Keeping it exact

Once a `double` has been through a division it has stopped being a whole number, and every comparison after that is a guess. Two habits prevent it.

**Do not compute the point when the question is not about the point.**

"Is the crossing inside the segment `AB`" just means $0 \le t \le 1$, and `t` is a fraction of two integers we already have:

~!
```c++
long long num = cross(sub(c, a), cd);
long long den = cross(ab, cd);

if(den < 0){ //keep the denominator positive so the comparison does not flip
    num = -num;
    den = -den;
}

bool insideAB = (0 <= num && num <= den);
```

**Do not take a square root just to compare two distances.**

For one fixed line $|\vec{AB}|$ is the same positive number in both, so comparing $|\vec{AB} \times \vec{AP}|$ alone gives the same ordering. Across different lines the exact comparison needs fourth powers of the coordinates, which overflow `long long` long before they reach $10^9$ - there the `double` is the safer choice.

>The rule underneath all of it: signs are exact, measurements are not. Push the division as far towards the final answer as it will go.
