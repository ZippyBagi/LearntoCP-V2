>In this lesson we stop asking which side of a line something is on and ask for the angle itself.

### Two ways to write the same angle

The dot product has an angle hidden inside it:

$$\vec{a} \cdot \vec{b} = |\vec{a}| \, |\vec{b}| \cos\theta$$

and the cross product hides the same angle, with its sine instead:

$$\vec{a} \times \vec{b} = |\vec{a}| \, |\vec{b}| \sin\theta$$

Divide the second by the first and both lengths cancel, leaving $\tan\theta$. Undoing that is exactly what `atan2` is for, and because it takes the two parts separately it also gets the quadrant right:

$$\theta = \text{atan2}(\vec{a} \times \vec{b}, \; \vec{a} \cdot \vec{b})$$

The answer comes back in $(-\pi, \pi]$ and it is **signed** - positive when `b` is counter-clockwise from `a`, the same rule the orientation gave us.
To convert it to degrees we multiply it by: `180.0 / acos(-1.0);`

	![[atan2-two-legs.png|Vectors a and b with the angle theta between them on the left, redrawn on the right as a right triangle whose horizontal leg is the dot product 9 and vertical leg the cross product 9, giving theta of 45 degrees]]

### Implementation

In simpler terms, we have a function that when given the cross and dot product, returns an angle.

Angles.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

struct v{

    long long x, y;
};

long long cross(v a, v b){

    return (a.x * b.y) - (a.y * b.x);
}

long long dot(v a, v b){

    return (a.x * b.x) + (a.y * b.y);
}

double angle(v a, v b){ //signed angle from a to b, in degrees

    return atan2((double)cross(a, b), (double)dot(a, b)) * 180.0 / acos(-1.0);
}

int main(){

    cout<<fixed<<setprecision(1);

    cout<<angle({1, 0}, {0, 1})<<'\n';
    cout<<angle({1, 0}, {-1, 0})<<'\n';
    cout<<angle({0, 1}, {1, 0})<<'\n';
    cout<<angle({3, 0}, {3, 3})<<'\n';

    return 0;
}
```
Output:
`90.0`
`180.0`
`-90.0`
`45.0`

>This is the first place in the chapter where we leave the integers. When a problem only asks which of two angles is bigger, the cross product answers that exactly - reach for `atan2` when the angle itself is part of the answer.
