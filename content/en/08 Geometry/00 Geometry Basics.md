>In this lesson we will learn the basics about geometry in computer science. (also everything will be in 2D, which is nice)

Before we begin, lets remind ourselves of a basic theorem we should already know:
### Pythagorean Theorem

If we have a right triangle, with sides `a`, `b` and `c`. Where `c` is the longest side (also known as the hypothenuse ), it can be gotten by the formula: 

$$c^2 = a^2 + b^2$$

### Representing points and lines

Almost every geometry problem we get will be from the field of Analytic geometry, so let's familiarize ourselves with it.

Everything we get will be represented as points (a pair of two coordinates).

In code, they can be stored as either a `pair<int,int> point`

Or a struct:
~!
```c++
struct point{
	long long x;
	long long y;
};

int main(){
	point a;
	a.x = 1;
	a.y = 2;
}
```

Another thing we should know is how to represent a line (a pair of two points):
~!
```c++
struct line{
	point x;
	point y;
};
```
### The distance between two points

The distance between two points(`A` and `B`) can be derived directly from the Pythagorean Theorem.

Imagine a triangle between the points, where the distance between them is the hypothenuse `dist`. 
Their horizontal distance is now $|A_x - B_x|$
And vertical distance is $|A_y - B_y|$

To get `dist` we use:

$$dist = \sqrt{(A_x-B_x)^2 + (A_y-B_y)^2}$$
Notice that we don't need the absolute value, since we are squaring both terms!

	![[distance-triangle.png|Points A at (1,2) and B at (4,6) on a grid forming a right triangle with horizontal leg 3 and vertical leg 4, so the distance is the square root of 25, which is 5]]

### Implementation

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

struct point{

    long long x, y;
};

long long dist2(point a, point b){ // squared distance - stays an integer!

    long long dx = a.x - b.x;
    long long dy = a.y - b.y;

    return dx * dx + dy * dy;
}

double dist(point a, point b){

    return sqrt((double)dist2(a, b));
}

int main(){

    point a = {1, 2};
    point b = {4, 6};

    cout<<"Squared distance: "<<dist2(a, b)<<'\n';
    cout<<"Distance: "<<dist(a, b);

    return 0;
}
```
Output:
`Squared distance: 25`
`Distance: 5`

Notice two things: the coordinates are `long long` and not `int`, and we wrote a separate `dist2` function that never touches `sqrt`. Both of those choices are on purpose, and the next section explains why.

### A word about precision

This is the part where most geometry solutions die, so read it carefully.

**1. Stay in integers for as long as you can.**
If the input coordinates are whole numbers, then differences, sums and products of them are also whole numbers. Every calculation done in `long long` is **exact**. The moment we call `sqrt` we lose that.

**2. Watch out for overflow.**
Coordinates in problems often go up to $10^9$.. Squaring that gives $4 \cdot 10^{18}$, which barely fits into `long long` (the limit is about $9.2 \cdot 10^{18}$). This is why we used `long long` above - `int` coordinates are a classic trap.

**3. Avoid `sqrt` when you can.**
Very often we do not need the actual distance, only a comparison: which point is closer, is this distance bigger than that one, are these two distances equal. Since distances are never negative, we have:

$$dist(A, B) < dist(C, D) \iff dist^2(A, B) < dist^2(C, D)$$

So we can compare `dist2` instead of `dist` and keep everything exact and fast. The same trick works for "is the distance at most `r`": compare $dist^2 \le r^2$ instead of $dist \le r$.

>Tip:
>If the answer needs to be printed as a real number, control the output yourself with `cout<<fixed<<setprecision(6)<<ans;` - otherwise `cout` prints only 6 significant digits and large answers get mangled.

### Summary

| Thing | Formula | Note |
| ---- | ---- | ---- |
| Point | $(x, y)$ | a place |
| Line | two points | |
| Distance `A` to `B` | $\sqrt{(A_x-B_x)^2 + (A_y-B_y)^2}$ | compare squared when possible |

That is everything we need to describe where things are. In the next lesson we learn how to describe movement between them - vectors.
