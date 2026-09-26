
## Approach

Trying every pair is about $5 \cdot 10^9$ comparisons for $n = 10^5$ - far too slow. So compare AND and XOR where the decision is actually made: at the **highest** bit.

Take two ids and look at the position of the highest set bit of each.

**Same position $p$:** both have a $1$ there, so AND keeps that bit and $a \, \& \, b \ge 2^p$, while XOR kills it and nothing lives above $p$, so $a \oplus b < 2^p$. The pair is strong.

**Different positions**, say $p > q$: the lower id has a $0$ at position $p$, so AND turns it off and $a \, \& \, b < 2^p$, while XOR keeps it and $a \oplus b \ge 2^p$. Not strong.

> A pair is strong exactly when both ids have their highest set bit in the **same position**.

So the ids themselves stop mattering. Group the sensors by that position - only $30$ groups, since $a_i < 2^{30}$ - and every two sensors inside a group are a pair, while nothing across groups ever is.

So how many pairs does a group of size $c$ give? Line the sensors up and count the pairs each one starts, so that nothing is counted twice. The first sensor pairs with the $c - 1$ sensors after it. The second one has already been paired with the first, so it only starts $c - 2$ new pairs. The third starts $c - 3$, and so on down to the last one, which starts none:

$$(c-1) + (c-2) + (c-3) + \ldots + 2 + 1$$

That is the sum of all numbers from $1$ to $c - 1$, which we already know how to collapse: fold the sum in half and add the terms in pairs from the outside in. The first and last give $(c-1) + 1 = c$, the second and second-to-last give $(c-2) + 2 = c$, and every such pair gives the same $c$. There are $c - 1$ terms, so there are $\frac{c-1}{2}$ of these pairs, and the whole sum is

$$\frac{c \cdot (c-1)}{2}$$

To find the highest bit, shift the number right until only one bit is left, counting the shifts.

## Example

Take the first testcase, $a = [1, 4, 3, 7, 10]$, and group the ids by their highest bit:

| highest bit |   ids in the group    | size $c$ | pairs $\frac{c(c-1)}{2}$ |
| :---------: | :-------------------: | :------: | :----------------------: |
|     $0$     |       $1 = 1$         |   $1$    |           $0$            |
|     $1$     |      $3 = 11$         |   $1$    |           $0$            |
|     $2$     | $4 = 100$, $7 = 111$  |   $2$    |           $1$            |
|     $3$     |     $10 = 1010$       |   $1$    |           $0$            |

Only the bit-$2$ group has company, so the answer is the single pair $(4, 7)$.
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

        int n;
        cin>>n;

        vector<long long> cnt(31, 0); // cnt[b] = how many numbers have bit b as their highest one

        for(int i=0;i<n;i++){

            unsigned int x;
            cin>>x;

            int b = 0;
            while((x >> 1) > 0){ // shift away low bits until only the highest one is left
                x >>= 1;
                b++;
            }

            cnt[b]++;
        }

        long long ans = 0;

        for(int b=0;b<31;b++){
            ans += cnt[b] * (cnt[b] - 1) / 2; // every pair inside a group is strong
        }

        cout<<ans<<'\n';
    }
    return 0;
}
```

The ids are never stored - each one is counted into its group the moment it is read.

## Complexity

Time $O\left(n \log A\right)$, where $A$ is the largest id
Memory $O(1)$
