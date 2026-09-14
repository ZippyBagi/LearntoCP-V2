>In this lesson we will learn how to break any number down into its prime building blocks!

Every whole number greater than `1` can be written as a **product of prime numbers**, in exactly one way.

For example:

`84 = 2 * 2 * 3 * 7`
`97 = 97` (already prime)
`360 = 2 * 2 * 2 * 3 * 3 * 5`

	![[prime-factor-tree.png|A factor tree splitting 360 step by step, dividing by 2 three times then by 3 twice, leaving the prime factorisation 2 times 2 times 2 times 3 times 3 times 5]]

This is called the **prime factorization** of a number, and it is so fundamental that mathematicians named the rule the Fundamental Theorem of Arithmetic.
### Theory

In order to find the factorization, all we have to do it repeatedly divide the numbers

We go through candidates `d = 2, 3, 4...` and for each one:

- While `d` divides `n` - print `d`, and divide `n` by `d`

By dividing `n` immediately, we make sure each prime is printed **as many times as it appears** in the factorization.

This simple algorithm only prints prime numbers, that is because every non-prime number was already printed as a product of smaller primes.

Ex: `18 = 2 * 2 * 2 * 3` 

`6` divides 18, but it is not present, because it is there in the form of `2 * 3`

### One more trick

Just like with the prime check last lesson, we only need to try `d` up to `sqrt(n)`.

That is because a number `n` can have **at most one** prime factor larger than `sqrt(n)` (two of them multiplied together would already be bigger than `n`).

So after the loop finishes, if `n` is still greater than `1` - whatever is left **is** that one big prime factor, and we print it directly.

### Implementation

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    long long n;
    cin>>n;

    for(long long d = 2; d * d <= n; d++){

        while(n % d == 0){ //while d divides n

            cout<<d<<" ";
            n = n / d;
        }
    }

    if(n > 1){ //what remains is a prime factor larger than sqrt(n)
        cout<<n;
    }

    return 0;
}
```
Input: `84`
Output: `2 2 3 7`

Input: `97`
Output: `97`

Input: `360`
Output: `2 2 2 3 3 5`

Time complexity: **O(sqrt(n))**

>Note:
>Try removing the `if(n > 1)` check and factorizing `97`. The program prints nothing! The loop never finds a divisor because 97 is prime, so the leftover check is what saves us.
