>In this lesson we will learn how to compute the greatest common divisor and least common multiple of two numbers - in logarithmic time!

Two definitions first:

- **GCD** (Greatest Common Divisor) of `a` and `b` is the largest number that divides **both** of them.
- **LCM** (Least Common Multiple) of `a` and `b` is the smallest number that is divisible **by both** of them.

Example: for `a = 12` and `b = 18`:

- Divisors of `12`: `1, 2, 3, 4, 6, 12`
- Divisors of `18`: `1, 2, 3, 6, 9, 18`

The biggest shared one is `6`, so `GCD(12, 18) = 6`. And the smallest number both divide into is `36`, so `LCM(12, 18) = 36`.

	![[gcd-lcm.png|The divisors of 12 and of 18 listed in two rows with the shared divisors 1, 2, 3 and 6 highlighted, the greatest of them 6 marked green, giving GCD 6 and LCM 36]]

Comparing lists of divisors works, but finding them takes **O(sqrt(n))**. There is a much more elegant way, discovered over 2000 years ago.
### The Euclidean Algorithm

The whole algorithm is one observation:

`GCD(a, b) = GCD(b, a % b)`

Any number that divides both `a` and `b` also divides `a % b` (the remainder is just `a` minus `b` a couple of times). So the pair `(b, a % b)` has **exactly the same common divisors** as `(a, b)` - including the greatest one.

We repeat this until `b` becomes `0`, and then the answer is simply `a` (every number divides 0, so GCD(a, 0) = a).

Let's look at `GCD(12, 18)`:

| step | a | b | a % b |
| ---- | ---- | ---- | ---- |
| 1 | 12 | 18 | 12 |
| 2 | 18 | 12 | 6 |
| 3 | 12 | 6 | 0 |
| 4 | 6 | 0 | - |

`b` reached `0`, so `GCD(12, 18) = 6`. 

(Notice how the first step just swapped the numbers - the algorithm fixes the order by itself!)

### What about LCM?

LCM is very simple, thanks to this formula:

$$a * b = GCD(a, b) * LCM(a, b)$$

So:

$$LCM(a, b) = \frac{a*b}{GCD(a, b)}$$
### Implementation

When we are implementing LCM, we want to write it as  $LCM(a,b) = a/gcd(a,b) * b$, this is exactly the same as the formula above but it doesn't risk overflow

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

long long gcd(long long a, long long b){

    while(b != 0){

        long long r = a % b;
        a = b;
        b = r;
    }

    return a;
}

long long lcm(long long a, long long b){

	return a / gcd(a,b) * b; // We divide first, then multiply

}

int main(){

    long long a = 12;
    long long b = 18;

    long long g = gcd(a, b);
    long long l = lcm(a,b);

    cout<<"GCD: "<<g<<'\n';
    cout<<"LCM: "<<l;

    return 0;
}
```
Output:
`GCD: 6`
`LCM: 36`

Time complexity: **O(log(min(a, b)))**

It can be proven that the numbers shrink at least by half every two steps, which is where the logarithm comes from.

>Note:
>C++ already has this built in: `__gcd(a, b)` works out of the box, and since C++17 there are also `gcd(a, b)` and `lcm(a, b)`. Feel free to use them, but do note that some judges may not accept C++ 17
