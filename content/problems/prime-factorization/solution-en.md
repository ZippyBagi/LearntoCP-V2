
## Approach

This is the algorithm from the prime factorization lesson, applied as-is: try divisors $d = 2, 3, 4, \ldots$ and whenever $d$ divides $n$, print it and divide $n$ by it - repeatedly, so each prime comes out as many times as it appears.

The loop only needs to run while $d \cdot d \le n$: a number $n$ can have **at most one** prime factor above $\sqrt{n}$ (two of those multiplied together would exceed $n$). So after the loop, if $n$ is still bigger than $1$, whatever is left is that one big prime - print it.

**Careful:** for $n \le 2 \cdot 10^9$ everything fits in an `int` - both $n$ and the product $d \cdot d$ stay under the int limit of about $2.1 \cdot 10^9$ (the loop stops at $d \approx \sqrt{n}$). If the bound were larger, $d \cdot d$ would need a `long long`.

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

        int n; // up to 2 * 10^9 still fits in an int
        cin>>n;
        
        for(int d=2;d*d<=n;d++){
            while(n % d == 0){ // print d as many times as it divides n
                cout<<d<<' ';
                n /= d;
            }
        }

        if(n > 1){ // at most one prime factor larger than sqrt(n) can remain
            cout<<n;
        }

        cout<<'\n';
    }
    return 0;
}
```

## Complexity

Time $O(t \sqrt{n})$
Memory $O(1)$
