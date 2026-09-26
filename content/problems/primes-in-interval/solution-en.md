
## Approach

Checking every number of every interval with the $\sqrt{n}$ test costs up to $10^6$ checks per interval - with $10^5$ intervals, hopeless. But all the intervals live inside $[1, 10^6]$, so we can prepare everything **once** and answer each question instantly.

First run the **sieve of Eratosthenes** from the lesson up to $10^6$: after it, `is_prime[x]` answers "is $x$ prime?" in $O(1)$.

The questions ask about ranges, and for ranges we already have a tool - **prefix sums**. Build two prefix arrays over the sieve:

- $cnt_i$ - how many primes there are among $1, \ldots, i$;
- $sum_i$ - the sum of those primes.

Then every interval is two subtractions, just like in [Segment Sums](/en/Problems/segment-sums):

$$cnt_b - cnt_{a-1} \qquad sum_b - sum_{a-1}$$

**Careful:** the sum of all primes up to $10^6$ is about $3.7 \cdot 10^{10}$ - it does not fit in an `int`, so the $sum$ array is `long long`. The modulo is taken only when printing: subtract first, then `% 1000000`.
## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

const int MAXN = 1000000;

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    vector<bool> is_prime(MAXN + 1, true);
    is_prime[0] = false;
    is_prime[1] = false; // remember, 1 is not prime!

    for(int i=2;(long long)i*i<=MAXN;i++){
        if(is_prime[i]){
            for(int j=i*i;j<=MAXN;j+=i){
                is_prime[j] = false;
            }
        }
    }

    // prefix counts and prefix sums over the sieve
    vector<int> cnt(MAXN + 1, 0);
    vector<long long> sum(MAXN + 1, 0); // the sum of primes overflows an int

    for(int i=1;i<=MAXN;i++){
        cnt[i] = cnt[i-1] + (is_prime[i] ? 1 : 0);
        sum[i] = sum[i-1] + (is_prime[i] ? i : 0);
    }

    int t;
    cin>>t;

    while(t--){

        int a, b;
        cin>>a>>b;

        cout<<cnt[b] - cnt[a-1]<<' '<<(sum[b] - sum[a-1]) % 1000000<<'\n';
    }
    return 0;
}
```

## Complexity

Time $O(N \log \log N + t)$ where $N = 10^6$
Memory $O(N)$
