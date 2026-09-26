
## Approach

Simulating the countdown is hopeless - for $n = 10^9$ that is half a billion steps. But AND can only ever **turn bits off**, so the real question is when the last surviving bit dies.

That last survivor is the **highest** bit of $n$. Call its position $h$, so $2^h \le n < 2^{h+1}$.

Every number from $n$ down to $2^h$ has that bit set, so the register stays nonzero the whole way down. And $2^h$ itself has **only** that bit, so ANDing with it leaves the register at exactly $2^h$. The very next number, $2^h - 1$, has bit $h$ turned off and finishes the job:

$$k = 2^h - 1$$

To find $h$, start at $1$ and keep shifting left while the result is still not bigger than $n$, exactly like `1 << x`.

## Example

The four numbers from the statement:

| $n$  | $n$ in binary | highest bit $h$ | $2^h$ | answer $2^h - 1$ | in binary |
| :--: | :-----------: | :-------------: | :---: | :--------------: | :-------: |
| $2$  |    $10$       |       $1$       |  $2$  |       $1$        |    $1$    |
| $5$  |    $101$      |       $2$       |  $4$  |       $3$        |   $11$    |
| $17$ |   $10001$     |       $4$       | $16$  |      $15$        |  $1111$   |
| $1$  |     $1$       |       $0$       |  $1$  |       $0$        |    $0$    |

Check the third row by hand: $17 \, \& \, 16 = 16$, and only then $16 \, \& \, 15 = 0$. The low bits never mattered - $5$ and $7$ look nothing alike, yet both stop at $3$.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        unsigned int n;
        cin>>n;

        unsigned int h = 1;

        while((h << 1) <= n){ // h climbs to the largest power of two that is still <= n
            h <<= 1;
        }

        cout<<(h - 1)<<'\n';  // one step below that power of two, all lower bits set
    }
    return 0;
}
```

The condition is checked **before** the shift, so `h` never runs past $n$ and never overflows.

## Complexity

Time $O(t \log n)$
Memory $O(1)$
