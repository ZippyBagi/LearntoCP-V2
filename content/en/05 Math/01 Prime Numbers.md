>In this lesson we will learn what prime numbers are, and how to check if a number is prime!

A number is **prime** if it is only divisible by `1` and by itself.

The first few primes are: `2, 3, 5, 7, 11, 13, 17...`

>`1` is **not** a prime number! 

Lets look at how to check if a number is prime
### Brute force check

The simplest way is to try every number from `2` to `n-1`, and if any of them divides `n`, the number is not prime.

~!
```c++
	bool is_prime = true;

	for(long long i = 2; i < n; i++){
		if(n % i == 0){
			is_prime = false;
		}
	}
```

This works, but the complexity is **O(n)**. But that is too slow.

We can do much better.
### Divisors come in pairs

The key observation: if `d` divides `n`, then `n / d` also divides `n`.

For example, for `n = 36`:

`1 * 36`
`2 * 18`
`3 * 12`
`4 * 9`
`6 * 6`

Every divisor bigger than `6` is paired up with a divisor smaller than `6`. And `6` is exactly `sqrt(36)`.

In other words: **if n has any divisor, it has one that is <= sqrt(n)**

	![[divisor-pairs.png|The divisors of 36 in a row from 1 to 36 with arcs pairing each small divisor with its large partner, 1 with 36, 2 with 18, 3 with 12 and 4 with 9, meeting at the square root 6 in the middle]]

So instead of checking all the way up to `n`, it is enough to check up to `sqrt(n)`. 
### Implementation

Instead of writing `i <= sqrt(n)` (the `sqrt` function works with decimal numbers, which can cause precision bugs), we write the same condition as `i * i <= n`:

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    long long n;
    cin>>n;

    if(n < 2){ //0 and 1 are not prime
        cout<<n<<" is not prime";
        return 0;
    }

    for(long long i = 2; i * i <= n; i++){

        if(n % i == 0){ //we found a divisor, n is not prime

            cout<<n<<" is not prime";
            return 0;
        }
    }

    cout<<n<<" is prime";

    return 0;
}
```
Input: `97`
Output: `97 is prime`

Input: `91`
Output: `91 is not prime` (91 = 7 * 13)

Time complexity: **O(sqrt(n))**

For `n = 10^18`, that is around `10^9` operations instead of `10^18` - a massive difference.

>Note:
>`i` must be a `long long` as well! If `i` were an `int`, `i * i` would overflow for large `n`, and the loop would break!