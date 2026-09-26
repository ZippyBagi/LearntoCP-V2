
## Approach

An election is ideal when the least common multiple of the votes equals their product. Let's see what that really forces on the numbers.

Start with just two votes, $a$ and $b$. There is a well-known identity tying their lcm to their product:

$$lcm(a, b) = \frac{a \cdot b}{gcd(a, b)}$$

So $lcm(a, b)$ equals $a \cdot b$ only when $gcd(a, b) = 1$. The same must hold for **every** pair at once, so in an ideal election every two chosen votes are **coprime** - their gcd is $1$.

Two numbers are coprime exactly when they share no prime factor. So the whole condition is really a statement about primes: **each prime may appear in at most one of the chosen votes**. If two voters both picked a number divisible by $3$, the election is already ruined.

### Counting one prime at a time

This is the part that makes the problem easy. Because a prime can never be shared, we can settle each prime completely on its own.

Picture every voter $i$ as a **bucket** holding their number $a_i$. Fix one prime $q$ and ask: in how many ways can $q$ be handed out across the whole array?

Only one voter is ever allowed to take $q$. A voter can take it if $q$ divides their number - and they even get to choose how much of it: if the number is divisible by $q$ once, that voter can vote $q$; if it is divisible by $q$ twice, they can vote $q$ or $q^2$; and so on. So a voter whose number contains $q$ as a factor **$k$ times** gives us **$k$** different ways to use it.

Add up those counts over all the buckets and you have every "one voter takes $q$" option. Then throw in one more option for **nobody takes $q$ at all**. That is the whole count:

$$\text{Ways}(q) = 1 + (\text{how many times } q \text{ appears as a factor across all the numbers})$$

For instance, if the numbers hold three factors of $2$ between them, there are $1 + 3 = 4$ ways to deal with the prime $2$.

### Putting the primes together

Now the last step. The decision for the prime $2$ has nothing to do with the decision for the prime $3$: one vote can carry a factor of $2$ and a factor of $3$ at the same time with no conflict, and the "at most one voter" rule is checked separately for each prime. The primes are **completely independent**.

When independent choices stack up, you multiply them. (If there are $4$ ways to place the prime $2$ and $2$ ways to place the prime $3$, then each of the $4$ pairs with each of the $2$, giving $4 \cdot 2 = 8$ combinations - this is the **multiplication principle** of counting.) So the total number of ideal arrays is simply the product of the ways over all primes:

$$\text{answer} = \prod_{q \text{ prime}} \text{Ways}(q) \pmod{10^9 + 7}$$

To get each $\text{Ways}(q)$ we factorize every number and tally, for each prime, how many times it appears in total. Fast factorization comes from a **smallest-prime-factor sieve**: `sieve[x]` stores the smallest prime dividing $x$, so we peel any number apart by repeatedly dividing it by `sieve[x]`.

**Careful:** the product runs over many primes and shoots past an `int` almost immediately, so keep the running answer in a `long long` and take it modulo $10^9 + 7$ after every multiplication.

-g> This problem uses techniques from [Modified Sieve](/en/Theory/Math/Modified%20Sieve) and [Multiplication Principle](/en/Theory/Combinatorics/Multiplication%20Principle).

## Example

Take the first test case, $a = [2, 3, 1, 4]$. The $1$ has no prime factors, so only $2$ and $3$ matter:

| prime $q$ |       where it appears        | times in total | $\text{Ways}(q)$ |
| :-------: | :---------------------------: | :------------: | :--------------: |
|    $2$    | in $2$ (once), in $4$ (twice) |      $3$       |       $4$        |
|    $3$    |         in $3$ (once)         |      $1$       |       $2$        |

The prime $2$ shows up three times in total (once in the number $2$, twice in $4 = 2^2$), so there are $1 + 3 = 4$ ways to hand it out. The prime $3$ shows up once, giving $2$ ways. Multiplying the independent primes: $4 \cdot 2 = 8$, exactly the expected answer.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

const int maxN = 500000+10;
const int mod = 1e9 + 7;

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    vector<int> sieve(maxN);

    for(int i=1;i<sieve.size();i++){
        sieve[i] = i;
    }

    for(int i = 2;i*i<=maxN;i++){
        if(sieve[i] == i){                  // i is prime
            for(int j=i*i;j<maxN;j+=i){
                if(sieve[j] == j){          // first prime to reach j is its smallest
                    sieve[j] = i;
                }
            }
        }
    }

    vector<int> a(maxN,0);                   // a[q] = how many times prime q appeared

    while(t--){

        int n;
        cin>>n;

        vector<int> primes;                  // which primes we touched this test

        int x;
        for(int i=0;i<n;i++){
            cin>>x;
            while(x > 1){
                int p = sieve[x];            // smallest prime factor of x

                while(x % p == 0){
                    if(a[p] == 0){
                        primes.push_back(p);
                    }
                    a[p]++;                  // one more occurrence of this prime
                    x /= p;
                }
            }
        }

        long long ans = 1;

        for(const auto& x : primes){
            ans = (ans * (1+a[x])) % mod;    // multiply in Ways(q) = 1 + count
            a[x] = 0;                        // reset for the next test
        }

        cout<<ans<<'\n';
    }
    return 0;
}
```

We reset only the primes we actually used (kept in `primes`), so clearing the counters costs nothing extra - we never scan the whole `a` array between tests.

## Complexity

Let $A = 5 \cdot 10^5$ be the largest possible $a_i$.
Time $O(A \log \log A + (\sum n)\log A)$
Memory $O(A)$

The sieve is built once; after that every number is factorized in about $\log a_i$ steps.