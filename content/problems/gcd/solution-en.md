
## Approach

Every insect kind must split into equal teams of size $d$ - that works exactly when $d$ divides the count of that kind. A size that works for all three kinds is a **common divisor** of $a$, $b$ and $c$, and we want the largest one: their **greatest common divisor**.

Trying every candidate up to $2 \cdot 10^9$ is far too slow - but Euclid's algorithm from the GCD lesson finds the gcd of two numbers almost instantly, by repeatedly replacing the pair $(a, b)$ with $(b, a \bmod b)$ until the second number hits $0$.

For three numbers, take them two at a time:

$$gcd(a, b, c) = gcd(gcd(a, b), c)$$

which works because a number divides both $a$ and $b$ exactly when it divides $gcd(a, b)$.
## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int gcd(int a, int b){
    while(b != 0){
        int r = a % b;
        a = b;
        b = r;
    }
    return a;
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        int a, b, c; // up to 2 * 10^9, which still fits in an int
        cin>>a>>b>>c;

        cout<<gcd(gcd(a, b), c)<<'\n'; // the gcd of three numbers, two at a time
    }
    return 0;
}
```

## Complexity

Time $O(t \log a)$
Memory $O(1)$
