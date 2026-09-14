>In this lesson, we will learn about a data structure that answers dynamic range queries in O(log n) - Segment trees

What even are **dynamic range queries?**

Remember prefix sums, we wanted to know the sum of elements between `[l,r]` - these are **range queries.**

**Dynamic range queries** are the same things, except the elements of the array **can change** between queries.

### Segment Trees

To understand how segment trees work, we first need to create a mental image of them in our head.

Imagine we have an array `a = {1, 2, 5, 3, -2, 8, -3, 6}`, with size `n`(for now lets say its a perfect power of 2). 

1. We first take all the elements and place them as leaves in our tree (at the very bottom).

2. Then each 2 adjacent leaves turn into a node of size 2

3. Each two nodes of size 2, combines into a node of size 4.

4. This repeats until we have one single node of size `n`

This is a segment tree!

	![[segment-tree-shape.png|An eight element array laid out as the leaves at the bottom of a tree, where each two adjacent nodes merge into one node above them, through three levels, up to a single root covering the whole array]]

Imagine that instead of just merging the elements into arrays of increasing sizes, we stored the sum of adjacent leaves.

Aka, when two nodes merge, the newly created node will store the sum of them.

Look at the visualization:

	![[segment-tree-sums.png|The same tree over the array 1 2 5 3 -2 8 -3 6, where every node holds the sum of its two children: the level above the leaves is 3 8 6 3, then 11 and 9, and the root is 20]]

>Note:
>The elements of the array are indexed from 0, as always, but the nodes of the tree are indexed from 1. We will soon see why that makes the implementation much easier.
### How do we use them?

Lets say that I wanted to know the sum from `[0,6]`

Start with `ans = 0`

On the tree, the sums from `[0,1]`, `[2,3]` and `[4,5]` are already computed in the nodes above the leaves.

The only element that is not in the nodes above is `[6]`, so we must add it, before moving to the next layer, `ans += -3`

	![[segment-tree-query-1.png|First step of the query over the range 0 to 6, where the lone leaf holding -3 is coloured in because it has no partner to carry it up to the next level]]

On the next layer, `[0,3]` is already computed in the layer above, and `[4,5]` is left alone, so we add that node to the answer as well `ans += 6`

	![[segment-tree-query-2.png|Second step of the same query, one level up, where the node covering the range 4 to 5 with value 6 is left without a partner and goes into the answer]]

Finally, we are left with just one node (the sum `[0,3]`), so we can add it as well. `ans += 11`

	![[segment-tree-query-3.png|Final step of the query, where the node covering the range 0 to 3 with value 11 is taken and the running total reaches 14]]

Our final answer is `14`, and we computed it in just 3 steps!

### Updating elements

Updating elements is also very fast:

Lets say I wanted to change `a[7]` to `9`.

Since we changed a leaf node, we have to recompute all the nodes connected to it in our tree. (there will always be $\log n$ of them)

	![[segment-tree-update.png|The path from the changed leaf holding 9 up to the root, where only the nodes on that path are recomputed while the rest of the tree is untouched]]

Just like that, we updated our tree in just 3 steps!

>The same principle for querying and updating applies, no matter the operation. 
>In other words segment trees can store multiples, minimums, maximums, xor's, and's,...

### Implementation

In code, we won't store our tree as a graph, instead we will compress it into one big array.

In this array, indices `[n,2*n-1]` will be our leaves, the previous `n/2` elements will be the first layer, previous `n/4` elements, the second, and so on up to the root, which sits at `s[1]`. The slot `s[0]` is left unused.

	![[segment-tree-flat-array.png|The segment tree flattened into an array of length 16, with the root at index 1, the next level at indices 2 and 3, then 4 to 7, and the leaves at indices 8 to 15]]

The element at position `p` of the array `a` lives at `s[n + p]`.

If the size of our array is not a power of 2, we simply use the highest power of 2 that is `>= a.size()`. The extra leaves stay at zero and do not affect the sum.

Now we can see why the nodes are indexed from 1. Assuming we are at `i`: 

- To get from a leaf to its parent we do `i/2`
- To get from a parent to its LEFT child we do: `2*i`
- To get from a parent to its RIGHT child we do: `2*i+1`

That also gives us one small fact we will need in a moment: a node with an ODD index is always a right child, and a node with an EVEN index is always a left child.

### Code:

We will explore the code, block by block:

This helper function finds the first power of 2 that is `>= a`. 
~!
```c++
long long power_of_two(long long a){

    long long d = 1;

    while(d < a){
        d*=2;
    }

    return d;
}
```

This block creates a segment tree:

We build the tree from `n-1`, each node is built by doing an operation on its two children!
~!
```c++
vector<long long> create_segment_tree(vector<long long>& a){

	int n = power_of_two(a.size());
	
	vector<long long> s(2*n,0);
	 
	for(int i =0; i<a.size();i++){ //copy the original elements
		s[n+i] = a[i];
	}
	
	for(int i = n-1; i>=1; i--){ //build the tree
		s[i] = s[i*2] + s[i*2 + 1];
	}
	
	return s;
}
```

This block queries the tree with a range:

To query elements, we repeatedly check for elements that are not in the node above.

We do so with `l % 2 != 0`. Aka if the leftmost element is ODD, it must be the RIGHT child, since it doesn't have a left child next to it, it can't move to the next layer.

The same logic is with `r % 2 == 0`. If the rightmost element is EVEN, it must be a LEFT child, since it has no right neighbor, it can't move on. 

Then we move on to the next layer with `l /= 2` and `r /= 2`

~!
```c++
long long query(vector<long long>& s, int l, int r){

    l+=s.size() / 2; // We must start from leaves
    r+=s.size() / 2;

    long long ans = 0;

    while(l<=r){
    
        if (l % 2 == 1){ // Check the leftmost one
            ans += s[l];
            l++;
        }
        if(r % 2 == 0){ // Check the righmost one
            ans += s[r];
            r--;
        }
        
        // Move on to the next layer
        l/=2;
        r/=2;
    }

    return ans;
}
```

Finally the code for updating the tree:

To do so, we just replace the child, and recompute each layer (The same way we created the tree) above it:

~!
```c++
void replace_element(vector<long long>& s, long long el, int pos){

    int index = pos + s.size() / 2;
    
    s[index] = el;
    
	for (index /= 2; index >= 1; index /= 2){
	
		s[index] = s[2*index] + s[2*index+1]; // Recompute 
	}   
}
```

Building the tree costs **O(n)**, while every query and every update costs **O(log n)**.

>Note:
>If you need a different operation, you only change the `+` in three places - when building, when querying and when updating. Just watch the starting value: it is `0` for a sum, but it has to be something large for a minimum, and `1` for a product.
