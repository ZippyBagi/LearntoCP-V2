>In this lesson we will learn how to multiply vectors - and why that is really useful

### Dot Product

The dot product is the first way we can multiply vectors. It is written as $\vec{A} \cdot \vec{B}$

It is calculated like this:  $$\vec{A} \cdot \vec{B} = \vec{A}_x * \vec{B}_x + \vec{A}_y * \vec{B}_y$$
It is useful because it tells us if two vectors are **normal to each other**.

#### Normal vectors

Normal vectors are vectors that form an **angle of 90°**

If the dot product of 2 vectors is `0`, then they are normal to each other.

	![[dot-product-normal.png|Three grids with vectors A and B at a sharp, right and wide angle, where the dot product is positive 9, exactly zero, and negative 8 respectively]]

#### Implementation
Assume that all vectors are implemented like this: 
~!
```c++
struct v{
	long long x;
	long long y;
};
```

The dot product is:
~!
```c++
int dot_product(v a, v b){
    return (a.x * b.x) + (a.y * b.y);
}
```

### Cross Product

The second, and more useful way of multiplying is the cross product.

We can use it to calculate whether a polygon is convex or not, are two vectors parallel? Is there an intersection between two vectors?, etc..

The cross product for two 2D vectors simplifies down to calculating the determinant of their coordinates. It is written as $A \times B$

Which means:

$$\vec{A} \times \vec{B} = \vec{A}_x * \vec{B}_y - \vec{A}_y * \vec{B}_x$$
The sign of the cross product tells us where two vectors are relative to each other.

#### Reading the Cross Product

Imagine the vectors are intersecting a circle.

When we do the cross product of $\vec{A} \times \vec{B}$, if the product is **positive**, then on the circle, to get from $\vec{A}$ to $\vec{B}$ we move counter-clockwise.

If the product is **negative**, to get from $\vec{A}$ to $\vec{B}$ ,we move clock-wise.

If the product is `0`, then $\vec{A}$ and $\vec{B}$ are **parallel**!

	![[cross-product-circle.png|Three grids with vectors A and B on a circle, where the cross product is positive 10 for a counter-clockwise turn, negative 7 for a clockwise turn, and zero when the vectors are parallel]]

#### The area of a triangle

The sign is only half of what the cross product carries. Its **size** is useful too.

Take $\vec{AB}$ and $\vec{AC}$, two vectors starting from the same point `A`, and complete them into a parallelogram. The absolute value of the cross product is exactly the area of that parallelogram.

A parallelogram is just two copies of the triangle `ABC` glued together, so we halve it:

$$P_{ABC} = \frac{|\vec{AB} \times \vec{AC}|}{2}$$

Let's check that on a triangle we can measure by hand. Take `A = (0, 0)`, `B = (4, 0)` and `C = (0, 3)`:

- $\vec{AB} = (4, 0)$ and $\vec{AC} = (0, 3)$
- $\vec{AB} \times \vec{AC} = 4 \cdot 3 - 0 \cdot 0 = 12$
- so the area is `12 / 2 = 6`

And it is a right triangle with legs `4` and `3`, whose area we already know is $\frac{4 \cdot 3}{2} = 6$.

Notice that the cross product hands us **twice** the area, and that doubled value is always a whole number. So we can compute areas exactly in `long long` and divide by 2 only at the very end - a trick the later lessons use constantly.

>Note:
>Without the absolute value the area is **signed**, exactly like before: positive when `C` is to the left of `AB`, negative when it is to the right. One number, two questions answered.

#### Implementation

```c++
int cross_product(v a, v b){

    return (a.x * b.y) - (a.y * b.x);
}
```