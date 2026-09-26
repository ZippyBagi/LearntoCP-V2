
## Approach

#### Idea

We are choosing an order for the digits of $n$, and there can be $18$ of them - far too many orders to walk one by one.

What saves us is that we never need an order itself, only how many valid ones there are. So we build the number left to right and remember just enough about the prefix so far to carry on: **which digits it has used**, as a bitmask, and **what it leaves modulo $m$**.

Both halves are needed, and neither works alone. The mask cannot tell us whether the finished number will be divisible; the value cannot tell us which digits are still free. So the table is two-dimensional:

$$dp[mask][rem] = \text{prefixes that use exactly the digits in } mask \text{ and leave remainder } rem$$

At $18$ digits and $m \le 100$ that is $2^{18} \cdot 100$ entries, so build it at the size the input actually calls for rather than at the maximum.

#### Remainder

Appending a digit $d$ to a number $x$ turns it into $10x + d$.

We cannot keep $x$ around - it runs to $10^{18}$ - and we do not have to, because the remainder of $10x + d$ depends on nothing but the remainder of $x$:

$$rem_{new} = (rem \cdot 10 + d) \bmod m$$

That is exactly why the second dimension stays small: instead of $10^{18}$ possible prefixes we carry one of at most $100$ remainders.

We start from $dp[0][0] = 1$ - the empty prefix has used no digits, and its value $0$ leaves remainder $0$ - and the answer waits at $dp[\text{all digits used}][0]$.

#### Edge cases

Two rules stand between this and a wrong count.

**Nothing may start with a zero.** A `mask` of $0$ means we are picking the very first digit, and a zero does not belong there:

~!
```cpp
if(mask == 0 && a[i] == '0') continue;
```

**The same number must not be counted twice.** Equal digits are interchangeable - $223$ has two twos, and swapping them takes a different path through the table while spelling the very same number.

So we sort the digits first, which puts equal ones side by side, and then only ever place an equal digit **after** its left neighbour:

~!
```cpp
if(i > 0 && a[i] == a[i-1] && !(mask & (1<<(i-1)))) continue;
```

That pins one order onto each group of equal digits, so every distinct number is reached exactly once. The sort is what gives the test meaning - without it the equal digits sit scattered and `a[i-1]` says nothing about them.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    cin.tie(0);
    iostream::sync_with_stdio(false);

    int t;
    cin>>t;

    while(t--){

        long long a1, m;
        cin>>a1>>m;

        string a = to_string(a1);
        sort(a.begin(), a.end()); // equal digits end up next to each other
        int n = a.size();

        // dp[mask][rem] = how many arrangements of exactly the digits in mask
        // leave remainder rem. Sized to this input, not to the worst case.
        vector<vector<long long>> dp(1<<n, vector<long long>(m, 0));
        dp[0][0] = 1;

        for(int mask=0;mask<(1<<n);mask++){
            for(int rem=0;rem<m;rem++){

                if(dp[mask][rem] == 0){
                    continue;
                }

                for(int i=0;i<n;i++){

                    if((mask>>i) & 1){ // digit i is already placed
                        continue;
                    }
                    if(mask == 0 && a[i] == '0'){ // nothing may start with a zero
                        continue;
                    }
                    if(i > 0 && a[i] == a[i-1] && !(mask & (1<<(i-1)))){ // equal digits are placed left to right
                        continue;
                    }

                    int next = mask | (1<<i);
                    int next_rem = (rem * 10 + (a[i] - '0')) % m;

                    dp[next][next_rem] += dp[mask][rem];
                }
            }
        }

        cout<<dp[(1<<n)-1][0]<<'\n';
    }
    return 0;
}
```

## Complexity

Time $O(2^D \cdot m \cdot D)$, where $D \le 18$ is the number of digits
Memory $O(2^D \cdot m)$
