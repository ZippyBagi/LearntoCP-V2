
## Approach

Writing the signal out is hopeless - $n$ goes up to $10^{18}$, and no array is that long.

Instead, read the construction carefully. Once the block of length $p = 2^k$ is finished, positions $p+1$ through $2p$ are nothing but that block inverted. So a position inside the second half is the **mirror** of a position in the first half, shifted back by exactly $p$.

That gives us everything. For a position $n > 1$, let $p$ be the largest power of two that is still **strictly smaller** than $n$. Then position $n$ lives in the copy made from the first $p$ digits, and

$$a(n) = 1 - a(n - p)$$

The base case is the digit the station started with, $a(1) = 1$.

This is a recursion of exactly the shape from the lesson: one base case, and one call that hands a smaller job forward.

It also finishes fast. Since $p$ is the largest power of two below $n$, we know $n \le 2p$, so $n - p \le p$ - the position at least halves on every call. For $n \le 10^{18}$ that is about $60$ calls, nowhere near a stack overflow.

## Example

Tracing $n = 15$:

| call     | largest $p < n$ | reduces to | value           |
| :------: | :-------------: | :--------: | :-------------: |
| $a(15)$  |       $8$       |   $a(7)$   | $1 - 1 = 0$     |
| $a(7)$   |       $4$       |   $a(3)$   | $1 - 0 = 1$     |
| $a(3)$   |       $2$       |   $a(1)$   | $1 - 1 = 0$     |
| $a(1)$   |        -        |     -      | $1$             |

The calls go down on the way in and the values come back up on the way out, so the answer for position $15$ is $0$.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

typedef unsigned long long ull;

int digitAt(ull n){

    if(n == 1){          // the digit the station started with
        return 1;
    }

    ull p = 1;

    while((p << 1) < n){ // p climbs to the largest power of two strictly below n
        p <<= 1;
    }

    return 1 - digitAt(n - p); // the second half is the first half, inverted
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        ull n;
        cin>>n;

        cout<<digitAt(n)<<'\n';
    }
    return 0;
}
```

Notice that every call flips the answer exactly once. So the digit is really decided by how many calls we make - even means $1$, odd means $0$. That count is the number of ones in the binary representation of $n - 1$, which is where the one-line versions of this problem come from.

## Complexity

Time $O(t \log n)$
Memory $O(\log n)$ for the call stack
