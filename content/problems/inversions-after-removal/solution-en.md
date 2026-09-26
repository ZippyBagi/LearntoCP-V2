
## Approach

There are about $\frac{n^2}{2}$ pairs $(l, r)$ and counting the inversions of one $b$ takes $O(n \log n)$ on its own, so trying them one by one is hopeless. We need to say something about how the count moves as $l$ and $r$ move.

### Splitting the count in three

The array $b$ is a **prefix** $a_1 \dots a_l$ glued to a **suffix** $a_r \dots a_n$. Every inversion of $b$ therefore falls into exactly one of three groups:

- both positions inside the prefix - call it $P(l)$, and it does not depend on $r$;
- both positions inside the suffix - call it $S(r)$, and it does not depend on $l$;
- one position in each - call it $C(l, r)$, the pairs $i \le l$, $j \ge r$ with $a_i > a_j$.

$$inv(l, r) = P(l) + S(r) + C(l, r)$$

### Why the pairs that work form a tail

Fix $l$ and push $r$ one step to the right. The suffix loses its first element, so $S$ can only shrink and $C$ can only shrink, while $P$ does not move at all. **Cutting out more can never create an inversion** - so $inv(l, r)$ is non-increasing in $r$, and for each $l$ the good values of $r$ are everything from some threshold $R(l)$ to $n$. That is $n - R(l) + 1$ pairs, counted without looking at them.

Now fix $r$ and push $l$ one step to the right. The prefix gains an element, so $P$ can only grow and $C$ can only grow. So $inv$ is non-decreasing in $l$, which means $R(l)$ is non-decreasing too: **the threshold never moves back**. One pointer walks $l$ forward, another walks $r$ forward, and each takes at most $n$ steps in total.

### Keeping the three numbers up to date

The pointers only help if a single step is cheap, and each step asks a counting question: how many of the elements I am holding are bigger, or smaller, than this one. That is what a Fenwick tree indexed **by value** answers. We keep two of them:

- `pref` - the elements currently in the prefix, $a_1 \dots a_l$;
- `suff` - the elements currently in the suffix, $a_r \dots a_n$.

Each stores a $1$ at the position of every value it holds, so `bitSum(t, v)` is how many held values are $\le v$. From that, how many are bigger than $v$ is `bitSum(t, N) - bitSum(t, v)`, and how many are smaller is `bitSum(t, v - 1)`.

Adding $a_l$ to the prefix:

- $P$ grows by the prefix elements bigger than $a_l$ - each of them sits earlier and is larger;
- $C$ grows by the suffix elements smaller than $a_l$ - each of them sits later and is smaller.

Dropping $a_r$ from the suffix:

- $S$ falls by the remaining suffix elements smaller than $a_r$ - exactly the pairs $(r, j)$ with $j > r$ that $a_r$ was part of;
- $C$ falls by the prefix elements bigger than $a_r$.

We start with an empty prefix and the suffix holding the whole array, so $C = 0$ and $S$ is the inversion count of $a$ itself - which the same right-to-left loop computes while filling `suff`.

**Careful:** $r$ must always be greater than $l$. So before $a_l$ joins the prefix, the pointer has to be pushed past it - $a_l$ cannot sit in both halves at once.

**Careful:** the trees are indexed by value, but the values go up to $10^9$. Replace every value by its rank in the sorted order first - **coordinate compression**, explained in [Number of Inversions II](/en/Problems/inversions-2). After it the values are $1 \dots N$ with $N \le n$.

**Careful:** the answer counts up to $\frac{n(n-1)}{2} \approx 5 \cdot 10^9$ pairs, $k$ goes up to $10^{18}$, and the running inversion count passes $2 \cdot 10^9$ as well. All three are `long long`.

## Example

The third testcase is $k = 2$ over $a = 1, 5, 4, 1, 100$:

| $l$ | $inv(l, r)$ for $r = l+1 \dots n$ | $R(l)$ | pairs counted |
|---|---|---|---|
| $1$ | $3, 1, 0, 0$ | $3$ | $3$ |
| $2$ | $3, 1, 0$ | $4$ | $2$ |
| $3$ | $3, 1$ | $5$ | $1$ |
| $4$ | $3$ | none | $0$ |

Every row falls as $r$ grows, exactly as the argument above says, and the thresholds $3, 4, 5$ never move back - which is why one forward pass over $r$ serves all four rows. The total is $3 + 2 + 1 + 0 = 6$.

The last row is worth a look: with $l = 4$ the prefix is already $1, 5, 4, 1$, which carries $3$ inversions on its own, so no choice of $r$ can rescue it. Cutting more out never helps once the prefix alone is over budget.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int N, n, r;              // N = how many distinct values, r = start of the suffix
vector<int> a;            // the array, values replaced by their ranks 1..N
vector<int> pref, suff;   // two counting Fenwick trees, indexed by value
long long prefInv, suffInv, crossInv;

void bitAdd(vector<int>& t, int i, int delta){
    for(; i <= N; i += i & -i){
        t[i] += delta;
    }
}

// how many stored values are <= i
long long bitSum(vector<int>& t, int i){
    long long s = 0;
    for(; i > 0; i -= i & -i){
        s += t[i];
    }
    return s;
}

long long countBigger(vector<int>& t, int v){ return bitSum(t, N) - bitSum(t, v); }
long long countSmaller(vector<int>& t, int v){ return bitSum(t, v - 1); }

// a[r] leaves the suffix and the pointer moves on
void dropFromSuffix(){
    suffInv  -= countSmaller(suff, a[r]);  // pairs (r, j) with j > r and a[j] < a[r]
    crossInv -= countBigger(pref, a[r]);   // prefix elements bigger than a[r]
    bitAdd(suff, a[r], -1);
    r++;
}

// a[l] joins the prefix
void addToPrefix(int l){
    prefInv  += countBigger(pref, a[l]);   // prefix elements bigger than a[l]
    crossInv += countSmaller(suff, a[l]);  // suffix elements smaller than a[l]
    bitAdd(pref, a[l], 1);
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        long long k;
        cin>>n>>k;

        vector<int> raw(n);
        for(int i=0;i<n;i++){
            cin>>raw[i];
        }

        vector<int> sorted = raw; // coordinate compression - the trees are indexed by value
        sort(sorted.begin(), sorted.end());
        sorted.erase(unique(sorted.begin(), sorted.end()), sorted.end());
        N = sorted.size();

        a = vector<int>(n + 1);
        for(int i=0;i<n;i++){
            a[i+1] = lower_bound(sorted.begin(), sorted.end(), raw[i]) - sorted.begin() + 1;
        }

        pref = vector<int>(N + 1, 0);
        suff = vector<int>(N + 1, 0);

        // the suffix starts as the whole array, so it holds every inversion of a
        suffInv = 0;
        for(int i=n;i>=1;i--){
            suffInv += countSmaller(suff, a[i]);
            bitAdd(suff, a[i], 1);
        }

        prefInv = 0;
        crossInv = 0;
        r = 1;

        long long ans = 0;

        for(int l=1;l<=n-1;l++){

            while(r < l + 1){ // a[l] must leave the suffix before it joins the prefix
                dropFromSuffix();
            }

            addToPrefix(l);

            while(prefInv + suffInv + crossInv > k && r < n){
                dropFromSuffix();
            }

            if(prefInv + suffInv + crossInv <= k){
                ans += n - r + 1; // r works, and so does every position after it
            }
        }

        cout<<ans<<'\n';
    }
    return 0;
}
```

## Complexity

Time $O(n \log n)$
Memory $O(n)$
