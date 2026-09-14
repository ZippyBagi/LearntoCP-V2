> In this lesson we will learn how to do prime factorization in O(log n) with some setup

When we want to factorize a large number of numbers, it is inefficient to do then one my one in O(sqrt(n)).

Instead we will setup a special kind of Sieve in O(max(n)) that will drastically speed things up.

### The setup

The idea is simple, for each number, keep their **smallest prime divisor**!

Similarly to a regular Sieve. Create an array `sieve` of size `n` where `sieve[i] = i` then:

1. Take the smallest number where `sieve[i] = i` - it is **prime**.
2. For **all of its multiples**, if they haven't been changed (if `sieve[j] == j`), set `sieve[j] = i`  - their smallest prime divisor is `i`.
3. Repeat.

Wherever `sieve[i] == i` that number is prime.

Here is the finished sieve for the first `50` numbers. Each cell shows the number and the **smallest prime factor** stored for it. Primes are the outlined cells, where `sieve[i] == i`:

	![[smallest-prime-factor.png|A grid of the numbers 1 to 50, each cell labelled with its smallest prime factor and colour coded by whether that factor is 2, 3, 5 or 7, with primes drawn as outlined cells where the factor is the number itself]]

### The Factorization

Now every number `x` can be factorized by repeatedly dividing it by `sieve[x]`, and keeping track of what divided it.

Repeat this process `while(x > 1)`

For example `36`:

| x   | sieve[x] | prime factors | New x |
| --- | -------- | ------------- | ----- |
| 36  | 2        | 2             | 18    |
| 18  | 2        | 2,2           | 9     |
| 9   | 3        | 2,2,3         | 3     |
| 3   | 3        | 2,2,3,3       | 1     |
### The code

We build the sieve **once** into a global array, then reuse it for as many queries as we like. `create_sieve` fills `sieve[x]` with the smallest prime divisor of `x`, and `factorize` reads that array to break any `x` apart:

Solution.cpp
```c++
#include <bits/stdc++.h>
using namespace std;

const int N = 1000000; // build the sieve up to N
vector<int> sieve(N + 1); // sieve[x] = smallest prime divisor of x

void create_sieve(){
    for(int i = 1; i <= N; i++){
        sieve[i] = i; // start: assume x is its own smallest divisor
    }
    
    for(int i = 2; i * i <= N; i++){
        if(sieve[i] == i){ // i was never touched -> i is prime
        
            for(int j = i * i; j <= N; j += i){
            
                if(sieve[j] == j){ // j not touched yet
                    sieve[j] = i; // i is j's smallest prime divisor
                }
            }
        }
    }
}

vector<int> factorize(int x){
    vector<int> primes;
    
    while(x > 1){
    
        int p = sieve[x]; // smallest prime divisor of x
        
        while(x % p == 0){ // pull out every copy of p
            primes.push_back(p);
            x /= p;
        }
    }
    
    return primes;
}

int main(){
    create_sieve(); // one-time setup

    int x = 36;
    vector<int> factors = factorize(x); // reuse the sieve for any x

    cout << x << " = ";
    for(int i = 0; i < factors.size(); i++){
    
        cout << factors[i];
        
        if(i + 1 < factors.size()) cout << " * ";
    }
    
    cout << "\n";
    
    return 0;
}
```
Output: `36 = 2 * 2 * 3 * 3`

Time complexity:

`create_sieve` - O(N log log N) which is around O(N), and N is maximum element
`factorize` - each call is O(log x)