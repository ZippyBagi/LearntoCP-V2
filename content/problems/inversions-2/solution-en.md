
## Approach

The same count, reached from the other end. Instead of splitting the array in half, walk it **left to right** and ask one question per element:

> of the elements already behind me, how many are bigger than this one?

Every such element forms an inversion with the current one, and every inversion gets counted exactly once - at the moment its **later** element is reached. Adding those numbers up gives the answer.

So we need a bag of the values seen so far that can answer "how many of you are bigger than $v$" quickly. A Fenwick tree indexed **by value** does exactly that. But before anything can be indexed by value, the values have to be small - and ours are not.

### Coordinate compression

A tree indexed by value needs one slot for every value that could ever show up. Ours run from $-10^9$ to $10^9$, which is $2 \cdot 10^9$ slots - more memory than we are given, and building it would take longer than the whole time limit on its own.

But an array of $10^5$ elements contains at most $10^5$ different values, and for inversions **only the order matters**: whether $a_i > a_j$ does not change if every value is replaced by its position in the sorted list of the distinct values. That position is called the value's **rank**, and after the swap the values are $1 \dots N$ with $N \le n$ - small enough to index a tree.

The array $[70, -5, 1000, 0, 10^9]$ has distinct sorted values $[-5, 0, 70, 1000, 10^9]$, so it compresses to $[3, 1, 4, 2, 5]$ - which is the statement example, and it has the same three inversions. The huge numbers were never doing any work.

~!
```cpp
vector<int> sorted = a;
sort(sorted.begin(), sorted.end());
sorted.erase(unique(sorted.begin(), sorted.end()), sorted.end()); // drop duplicates
int v = lower_bound(sorted.begin(), sorted.end(), a[i]) - sorted.begin() + 1; // rank of a[i]
```

`unique` does not actually shorten the vector - it shuffles the duplicates to the back and returns where the part worth keeping ends, so the `erase` after it is what removes them. The two always come as a pair. `lower_bound` then finds a value's position in that list, and the $+1$ shifts ranks to start at $1$, because a Fenwick tree cannot use index $0$.

**Careful:** the duplicates have to go. Equal values must come out with **equal** ranks - if we handed out ranks by position instead, two equal elements would end up comparing as an inversion.

### Counting as we walk

Now the tree holds a $1$ at the rank of every element seen so far, and `countUpTo(v)` - the lesson's `prefixSum` - is how many of them are $\le v$. If $i$ elements have been seen, the ones bigger than $a_i$ are

$$i - countUpTo(a_i)$$

Then we drop $a_i$ into the tree and move on. Two $O(\log n)$ operations per element, so $O(n \log n)$ overall - the same as merge sort, with a different picture behind it.

**Careful:** we count elements $\le a_i$ and subtract, rather than counting $< a_i$ and using that. Counting $< a_i$ would treat equal values as inversions, and an inversion needs $a_i > a_j$ **strictly**.

**Careful:** the answer reaches $\frac{n(n-1)}{2} \approx 5 \cdot 10^9$ for a reversed array of $10^5$ elements, well past `int`. The counter is `long long`.

Note that this tree only ever adds $1$ to a position, so we need neither the lesson's `elements` array nor its `delta` - there is no old value to subtract.

## Example

Walking $[3, 1, 4, 2, 5]$, where "seen" means the elements strictly to the left:

| $a_i$ | rank | seen so far | of those, $\le a_i$ | bigger, so new inversions | running total |
|---|---|---|---|---|---|
| $3$ | $3$ | $0$ | $0$ | $0$ | $0$ |
| $1$ | $1$ | $1$ | $0$ | $1$ | $1$ |
| $4$ | $4$ | $2$ | $2$ | $0$ | $1$ |
| $2$ | $2$ | $3$ | $1$ | $2$ | $3$ |
| $5$ | $5$ | $4$ | $4$ | $0$ | $3$ |

Check the $2$ row: three elements are behind it - $3$, $1$ and $4$ - and only $1$ is not bigger, so $3 - 1 = 2$ new inversions, the pairs $(3, 2)$ and $(4, 2)$. The $5$ at the end is bigger than everything behind it and adds nothing, which is why the running total stops at $3$.

Compare this with the [merge sort version](/en/Problems/inversions): there the same three inversions were found in three different merges, each at the moment its two elements first shared a half. Here each one is found at its later element. Same total, counted in a different order.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int N;             // how many distinct values there are
vector<int> tree;  // counting Fenwick tree, indexed by value

// one more copy of value i has been seen
void addValue(int i){
    for(; i <= N; i += i & -i){
        tree[i]++;
    }
}

// how many of the seen values are <= i
long long countUpTo(int i){
    long long c = 0;
    for(; i > 0; i -= i & -i){
        c += tree[i];
    }
    return c;
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        int n;
        cin>>n;

        vector<int> a(n);
        for(int i=0;i<n;i++){
            cin>>a[i];
        }

        // coordinate compression - the tree is indexed by value, and the values
        // themselves go up to 10^9, but there are only n of them
        vector<int> sorted = a;
        sort(sorted.begin(), sorted.end());
        sorted.erase(unique(sorted.begin(), sorted.end()), sorted.end());
        N = sorted.size();

        tree = vector<int>(N + 1, 0); // a fresh tree for every testcase

        long long inversions = 0;

        for(int i=0;i<n;i++){

            int v = lower_bound(sorted.begin(), sorted.end(), a[i]) - sorted.begin() + 1; // rank, 1..N

            inversions += i - countUpTo(v); // i elements seen so far, minus those <= a[i]

            addValue(v);
        }

        cout<<inversions<<'\n';
    }
    return 0;
}
```

## Complexity

Time $O(n \log n)$
Memory $O(n)$
