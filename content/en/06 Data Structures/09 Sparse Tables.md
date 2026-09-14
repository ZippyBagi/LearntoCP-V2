>In this lesson we will learn to solve static range queries without an inverse in O(1), things like min,max,etc...

We already know what static range queries are - a series of `[l, r]` questions where we need to find something in an array between `l` and `r`.

The most common ones are prefix sums, but prefix sums don't work on min and max.

Thats where Sparse Tables come in!

### Theory

>Before we begin there is one thing to note:
>Sparse tables are only useful if the operation we want to use is overlap friendly, in other words if the segment [1, 10] has the same result as [1,6] with [3,10]!

Once we know that is satisfied we can build the table for O(1) queries! (if it's not satisfied, we can just use a segment tree).

And the table is going to be a 2D array where `lookup[i][j]`, will store values from `i` to `2^j`.

We can imagine it as a staircase, where the first layer is the original array, and each layer above goes 1 step more at a time:

	![[sparse-table-layers.png|An array of 12 elements as the bottom layer, with three layers above it covering 2, 4 and 8 elements starting from index 0, and a dashed outline beside each one showing the block that starts at index 1]]

We will use this array of `12` elements for the whole lesson: `5 2 9 7 1 8 3 6 4 10 2 7`

The dashed blocks matter as much as the solid ones. Unlike a segment tree, a sparse table has a block starting at **every** index, not just at the ones that tile neatly. That is why the table is `n * log n` big, and it is also what makes the query work.

This structure is somewhat similar to segment trees(as in we go in steps of powers of 2)

#### Building the table

Lets use `max` as an example

To build the actual table, we will use dynamic programming, starting from the first layer which is just the original array.

	![[sparse-table-base.png|The sparse table drawn as four rows, where the bottom row j equals 0 holds the array 5 2 9 7 1 8 3 6 4 10 2 7 and the three rows above it are still empty, each one shorter than the one below]]

Notice that each layer is shorter than the one below it. A block of `2^j` elements starting at `i` only exists while `i + 2^j` still fits inside the array, so layer `j` has `n - 2^j + 1` entries.

`lookup[i][j]` covers the segment `[i, i + 2^j - 1]`

So each entry is the max of the entry directly below it and the entry `2^(j-1)` places to the right of that one:

`lookup[i][j] = max(lookup[i][j-1], lookup[i + 2^(j-1)][j-1])`

	![[sparse-table-step.png|One build step, where lookup at 0 and 2 on layer 1 holding 5 and 9 are combined into lookup at 0 on layer 2, which becomes 9, with the two halves sitting 2 to the power 1 apart]]

Repeat until the whole table is built:

	![[sparse-table-full.png|The finished table, with layer 0 holding the array, layer 1 holding 5 9 9 7 8 8 6 6 10 10 7, layer 2 holding 9 9 9 8 8 8 10 10 10 and layer 3 holding 9 9 10 10 10]]

#### Querying for a value

This is the part that requires overlap friendliness of the operation used.

We first find highest power of 2 that is smaller than or equal to count of elements in given range. Lets call it `k`, so the block length is `2^k`.

Then two blocks are enough: one glued to the left end of the range, `lookup[l][k]`, and one glued to the right end, `lookup[r - 2^k + 1][k]`. Because `2^k` is more than half the range, the two of them always meet, and usually overlap.

	![[sparse-table-query.png|The query from 3 to 9 answered by two blocks of length 4, lookup at 3 holding 8 and lookup at 6 holding 10, which overlap on index 6 and give a maximum of 10]]

Asking for `[3, 9]` is `7` elements, so `k = 2` and both blocks are `4` long. They cover `[3, 6]` and `[6, 9]`, overlapping on index `6` - and since `max` does not care about being told the same thing twice, the answer is simply `max(8, 10) = 10`.

This is why we get O(1)


#### Code:


The build has two loops:

The **outer** loop walks the layers, from `1` upwards. It has to be the outer one, because layer `j` is built entirely out of layer `j-1` - by the time we start a layer, the one below it must already be finished.

The **inner** loop walks the starting positions inside one layer. It stops at `i + 2^j <= n`, which is what makes each layer shorter than the last: once the block would run off the end of the array, there is nothing left to store.

Building code:
~!
```c++
vector<vector<int>> buildSparseTable(vector<int> &arr) {

    int n = arr.size();

    int levels = 1;

    while((1<<levels) <= n){ //how many doublings still fit inside n
        levels++;
    }

    vector<vector<int>> lookup(n, vector<int>(levels, 0));

    for(int i=0;i<n;i++){ //layer 0 is the array itself
        lookup[i][0] = arr[i];
    }

    for(int j=1;j<levels;j++){ //one layer at a time, each covering twice as much

        for(int i=0; i + (1<<j) <= n; i++){ //every start whose block still fits

            lookup[i][j] = max(lookup[i][j-1], lookup[i + (1<<(j-1))][j-1]);
        }
    }

    return lookup;
}
```

The query has one loop, and it is only there to find `k`. It counts how many times we can double before passing the length of the range, which is at most `log n` steps and happens once per query.

Query code:
~!
```c++
long long power_of_two(long long a){ //the largest k with 2^k <= a

    long long k = 0;

    while((1LL<<(k+1)) <= a){
        k++;
    }

    return k;
}

int query(int L, int R, vector<vector<int>> &lookup)  {

    int len = R - L + 1;

    int k = power_of_two(len); //both blocks we read are 2^k long

    return max(lookup[L][k], lookup[R - (1<<k) + 1][k]);
}
```

Putting it together on our array:
~!
```c++
int main(){

    vector<int> arr = {5, 2, 9, 7, 1, 8, 3, 6, 4, 10, 2, 7};

    vector<vector<int>> lookup = buildSparseTable(arr);

    cout<<query(3, 9, lookup)<<'\n';
    cout<<query(0, 4, lookup)<<'\n';
    cout<<query(6, 8, lookup)<<'\n';

    return 0;
}
```
Output:
`10`
`9`
`6`

Building fills `n * log n` entries and each one costs a single comparison, while a query reads exactly two of them no matter how wide the range is.

Build: **O(n log n)**
Query: **O(1)**
Memory: **O(n log n)**

>Note:
>Sparse tables are built once and never change. There is no update operation - the moment an element can change, the whole table below it is wrong, and you want a segment tree instead.