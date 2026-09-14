>In this lesson we will learn how to find ALL the prime numbers up to n, in almost linear time!

We already know how to check if a single number is prime in **O(sqrt(n))**.

But what if a problem asks us about primality of **many** numbers? Checking each one separately gives us **O(q * sqrt(n))**, which is often too slow.

Whenever we need "is x prime?" answered many times, we want to **precompute** the answers - just like we did with Prefix Sums.

And to do that we need the **Sieve of Eratosthenes**.
### Theory

The idea is beautifully simple. Write down all the numbers from `2` to `n`, then:

1. Take the smallest untouched number - it is **prime** (nothing smaller crossed it out).
2. Cross out **all of its multiples** - they have a divisor, so they are definitely not prime.
3. Repeat.

Let's run it for `n = 30`:

- `2` is untouched => prime. Cross out `4, 6, 8, 10...`
- `3` is untouched => prime. Cross out `6, 9, 12, 15...`
- `4` is crossed out, skip it.
- `5` is untouched => prime. Cross out `10, 15, 20, 25, 30`
- ...

Whatever survives the crossing out is a prime: `2 3 5 7 11 13 17 19 23 29`

	![[sieve-of-eratosthenes.png|The sieve of Eratosthenes running over the numbers 2 to 30 in three passes, crossing out the multiples of 2, then of 3, then of 5, and leaving the primes 2 3 5 7 11 13 17 19 23 29 standing]]

### Two optimizations

- When crossing out multiples of `i`, we can start from `i * i` instead of `2 * i`. Why? Every smaller multiple of `i` (like `3 * i`) has a factor smaller than `i`, so it was **already crossed out** by that smaller prime.

- Because of that, the outer loop only needs to run while `i * i <= n` - after that point, there is nothing new left to cross out.

### Implementation

We represent "crossed out" with a boolean vector:

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    int n = 30;

    vector<bool> is_prime(n+1, true); //everything starts untouched

    is_prime[0] = false;
    is_prime[1] = false; //remember, 1 is not prime!

    for(int i = 2; i * i <= n; i++){

        if(is_prime[i]){ //i is untouched, so it is prime

            for(int j = i * i; j <= n; j += i){ //cross out the multiples, starting from i*i
                is_prime[j] = false;
            }
        }
    }

    for(int i = 2; i <= n; i++){

        if(is_prime[i]){
            cout<<i<<" ";
        }
    }

    return 0;
}
```
Output: `2 3 5 7 11 13 17 19 23 29`

And from this point on, every "is x prime?" question is a single lookup: `is_prime[x]` - **O(1)**!

### Complexity

At first glance the two loops look like **O(n^2)**, but count what we actually do: for `2` we cross out `n/2` numbers, for `3` we cross out `n/3`, for `5` only `n/5`...

`n/2 + n/3 + n/5 + n/7 + ...`

This sum grows incredibly slowly - the total is **O(n log log n)**, which is nearly indistinguishable from **O(n)** in practice.

>Note:
>The sieve has the same weakness as Counting Sort - **memory**. We need a vector of size n, so this only works for n up to around 10^7. For a single huge number (like 10^18), stick to the O(sqrt(n)) check from the Prime Numbers lesson.
