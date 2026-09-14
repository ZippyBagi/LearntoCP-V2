>In this set of lessons about combinatorics, we will learn how to think about problems that involve counting, arranging or combining.

This lesson will be focusing on the addition principle.

It states: 

> If one task can be done in `m` ways and a second task can be done in `n` ways, and the two tasks cannot be done at the same time, then there are `m + n` ways to choose one of the tasks

### Example:

A person has decided to shop at one store today, either in the north part of town or the south part of town. If they visit the north part of town, they will shop at either a mall, a furniture store, or a jewelry store (3 ways). If they visit the south part of town then they will shop at either a clothing store or a shoe store (2 ways). How many different shops can they end up at?

There are $3 + 2 = 5$ possible shops the person could end up shopping at today. 

### Explanation

This principle might seem trivial, or useless to know. But it is a really important foundation and something to think about when solving problems.

In the context of competitive programming, think about it like this:

>We are looking for the number of solutions to a problem. We divide the problem into non-overlapping subcases, count the solutions for each case separately, and finally add these numbers together. (X1 + X2 + X3 + ...)


### The sum symbol

This is also a good time to introduce the **sum symbol**

In math when we have

$$x_1 + x_2 + x_3 + x_4  + ... + x_n$$
We can write it down as:

$$\sum_{i=1}^{n} x_i$$
These two notations mean the **identical** thing, one is just shorter to write. 

$$x_1 + x_2 + x_3 + x_4  + ... + x_n = \sum_{i=1}^{n} x_i$$
If its easier, you can also imagine it as a `for` loop:

~!
```cpp
long long sum = 0;
for (int i = 1; i <= n; i++) {
    sum += x[i];
}
```