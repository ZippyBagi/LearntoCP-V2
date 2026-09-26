
## Approach

This is the check from the prime numbers lesson. Trying every divisor from $2$ to $n - 1$ costs up to $10^9$ steps per number - with $1000$ numbers, far too slow.

The lesson's observation saves us: **if $n$ has any divisor, it has one that is at most $\sqrt{n}$** - divisors come in pairs $d \cdot (n / d) = n$, and the smaller one of every pair is at most $\sqrt{n}$. So it is enough to try divisors up to $\sqrt{n}$ - at most around $31623$ of them for $n \le 10^9$.

As soon as one divisor is found, the answer is known - break out of the loop.

**Careful:** write the bound as `i * i <= n`, not `i <= sqrt(n)` - `sqrt` works with decimal numbers and can be off by a tiny amount at exactly the wrong moment. Here $n \le 10^9$, so `i * i` stays under $10^9$ and a plain `int` holds it comfortably (the int limit is about $2.1 \cdot 10^9$).

$1$ is not prime - handle it before the loop even starts.
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

        bool prime = true;
        if(n < 2) prime = false;

        for(int i=2;i*i<=n;i++){
            if(n % i == 0){ // found a divisor, n is not prime
                prime = false;
                break;
            }
        }

        if(prime){
            cout<<"YES"<<'\n';
        }else{
            cout<<"NO"<<'\n';
        }
    }
    return 0;
}
```

## Complexity

Time $O(t \sqrt{n})$
Memory $O(1)$
