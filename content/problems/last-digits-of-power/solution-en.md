
## Approach

The power $a^n$ can have billions of digits - computing it is impossible. But we only need its last $k$ digits, and the last $k$ digits of a number are exactly its remainder modulo $10^k$.

The key fact about remainders: **taking the remainder after every multiplication changes nothing**. If we only ever care about the result modulo some fixed number, we can replace every intermediate value by its remainder - the last digits of a product depend only on the last digits of the factors.

Write $m = 10^k$ for that modulus. The task becomes: compute $a^n \bmod m$. Multiplying $n$ times is too slow for $n = 10^9$ - this is exactly what binary exponentiation from the lesson is for. Same loop, with one addition: a `% m` after every multiplication.

Since $m \le 10^9$, every product is below $10^{18}$ - it fits in a `long long`.

**Careful:** the answer is a remainder, but the output is **digits**: for $10^5 \bmod 1000 = 0$ the correct output is `000`, not `0`. Print the remainder padded to exactly $k$ digits with leading zeros.
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

        long long a, n, k;
        cin>>a>>n>>k;

        // keeping the last k digits means working modulo m = 10^k
        long long m = 1;
        for(int i = 0; i < k; i++){
            m *= 10;
        }

        long long res = 1 % m;
        long long base = a % m;

        while(n > 0){
            if(n % 2 == 1){
                res = res * base % m; // products stay below 10^18, they fit in a long long
            }
            base = base * base % m;
            n /= 2;
        }

        // res is the remainder mod 10^k; print it as exactly k digits
        string s = to_string(res);
        for(int i = s.size(); i < k; i++){
            cout << '0'; // pad with leading zeros
        }
        cout << s << '\n';
    }
    return 0;
}
```

## Complexity

Time $O(t \log n)$
Memory $O(1)$
