
### Binary Exponentiation  ( Fast Exponentiation )

We want to compute `a^b` efficiently.

The intuitive solution is to write it as:

`a * a * a * a...` - b times

Which gets us the complexity of **O(b)**, but there is a better way.

Lets look at an example, `3^10`, using math we can rewrite it as: 

**3^10 = (3^5)^2** 
**3^5 = 3 * 3^4**
Again we repeat this process: **3^4 = (3^2)^2**
And **3^2 = 3*3**

Lets look at the whole equation now:

**(3 * ( 3 * 3 )^2 )^2**

If we count the operations, we get `5`, compare to the `10` it would have taken if we multiplied by three 10 times

	![[binary-exponentiation.png|Binary exponentiation reducing 3^10 in five steps, each row halving an even exponent by squaring the base or peeling off one factor when the exponent is odd, reaching 59049 in five multiplications instead of ten]]

The larger the `b`, the more time we save by doing it this way. 

For a general case, the algorithm looks like this ( ans = 1 at the beginning ):

- If `m` is even, then `a = a*a` and `b = b/2`
- If `m` is odd, then `ans = ans * a`, and `b = b-1`
- Repeat until `m<=0`

The code looks like this: 

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    long long a = 3; //long long is like int, but it stores larger numbers
    long long b = 10;

    long long ans = 1;

    while(b > 0){

        if(b % 2 == 0){ // this tells us if b is even
            a = a*a;
            b = b/2;
        }else{
            ans = ans * a;
            b = b-1;
        }
    }

    cout<<ans;

	return 0;
}
```
Output: `59049`

The complexity of this algorithm is **O(log b)**