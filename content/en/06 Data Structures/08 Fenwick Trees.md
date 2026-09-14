>In this lesson we will learn about a faster, but more limited, version of segment trees - Fenwick Trees (aka. Binary Indexed Trees, aka. BIT)

Just like Segment Trees, Fenwick trees answer **dynamic range queries**. 

But there are a few main differences: 

1. Fenwick Trees are faster by a constant factor (aka. They are still O($\log$ n), but the constants are smaller)
2. Fenwick Trees take up less memory (O(n) memory)
3. Fenwick Trees are simpler to implement (but harder to understand)
4. Fenwick Trees are more limited (Everything a Fenwick tree can solve, a Segment tree can as well, but not the other way)

### Main limitation

Due to how they work (we will get to that in a moment), fenwick trees require the operation they are implementing to have an inverse.

Operation that have inverses are: **addition**(it's inverse is subtraction), **subtraction** (it's inverse is addition), **multiplication** (it's inverse is division)...

Operations that don't have inverses are: **min**, **max**, **and**...

### Using the Tree

Getting a mental image of fenwick trees is rather difficult, so lets start from the explanation:

The tree will be stored as an array of size `n`.

On position `k`, will be the sum of the interval `[f(k)+1,k]`

And `f(k)` is the number you get by removing the first bit from the right (The "least significant bit").

This might seem odd, but think of it as a "fancy" prefix sum.

If we look at the array `a = {1, 2, 5, 3, -2, 8, -3}`, a Fenwick representation looks like this: 

	![[fenwick-segments.png|The array 1 2 5 3 -2 8 -3 above the Fenwick tree 1 3 5 11 -2 6 -3, with the interval each position covers drawn underneath it, so the positions that are powers of two cover the longest stretches]]

As you can see, we have a series of segments that cover each position.

The key observation we can make is that by summing the segments $$S =[f(k)+1,k] + [f(f(k))+1,f(k)] + ...$$
Until `f(k)` becomes 0, we actually get: 
$$S = [1, k]$$
Every step removes one set bit from `k`, and `k` has at most $\log k$ of them, so it takes $\log k$ steps to get the full sum!

	![[fenwick-prefix-walk.png|Computing the prefix up to position 7 in the Fenwick tree, where positions 7, 6 and 4 are taken and their intervals butt up against each other to cover the whole range 1 to 7]]

And to get the sum from $[a,b]$, we simply run $S(b) - S(a-1)$

>Note:
>Fenwick trees are **always** 1-indexed! Position 0 has no least significant bit, so every loop would get stuck on it.

### Updating elements

Let's say we wanted to change `5` to `11` in our array `a = {1, 2, 5, 3, -2, 8, -3}`

We would first calculate `delta`, which means by how much has our value changed: `delta = y - x` => `11 - 5` => `+6`.

Now we need to walk through all affected positions(lets call these positions **parents**), and add `delta` to them! (this is why Fenwick trees need an inverse)

We do so by a new "least significant bit" until the end of the array:

	![[fenwick-update.png|Changing position 3 in the Fenwick tree, where delta of plus 6 is added to position 3 and then to position 4, while the next hop to 8 falls past the end of the array so the loop stops]]

### Creating the Tree:

First we copy the original elements, and place a `0` on the first position:

	![[fenwick-build-copy.png|First build step, where the elements 1 2 5 3 -2 8 -3 are copied into positions 1 through 7 and position 0 is left holding a zero]]

Then, we go through each position, and add the current value to the parent's:

	![[fenwick-build-parents.png|Second build step, where every position adds its value into its parent, turning the array into 1 3 5 11 -2 6 -3]]

### Implementation

Getting `f(k)` is done with: `f(k) = k - (k & -k)`

Lets see with `0101` (5):

`-5` is `1011` in binary, so `0101 & 1011` = `0001`

`f(5) = 5 - 1 = 4`

Getting a parent is just as easy, except we add the bit instead of removing it:

`parent(k) = k + (k & -k)`

### Code:

Creating the tree:
~!
```c++
//assuming elements is a 0-indexed array
void createFenwick(vector<int>& a, const vector<int>& elements) {

    int n = elements.size();
    a.assign(n + 1, 0); //This function places changes the size of a, and then places zeros on every position

    // Step 1: copy elements
    for (int i = 1; i <= n; i++) {
        a[i] = elements[i - 1];
    }

    // Step 2: build Fenwick structure
    for (int i = 1; i <= n; i++) {
        int parent = i + (i & -i);
        if (parent <= n) {
            a[parent] += a[i];
        }
    }
}
```

Getting the Sum:
~!
```c++
int prefixSum(vector<int>& a, int k) {
	int sum = 0;
	
	while(k>0){
		sum += a[k];
		k -= k & -k;
	}
	return sum;
}
```

Adding an element. Watch out, `pos` is 1-indexed here, just like the whole tree:
~!
```c++
//Puts element el, on index pos
void add(vector<int>& a, vector<int>& elements,int pos, int el){
	
	int n = a.size();
	
	int delta = el - elements[pos-1]; //by how much the value changed
	elements[pos-1] = el;
	
	while(pos < n){
		a[pos] += delta;
		pos += pos & -pos;
	}
}
```

Time complexity: O(n) - for creation. O(log n) per query and update
Memory: O(n)

>Note:
>Notice that we have to keep the original `elements` array next to the tree. The tree only stores segment sums, so we cannot read an element's old value out of it - and we need that old value to compute `delta`.

As we can see, Fenwick trees are much faster to implement than Segment Trees.