>In this lesson we will learn about a surprisingly useful data structure - Union Find (Also known as DSU)

Imagine we have a **multiple disjoint sets** and a bunch of values, we want to know what set each value belongs to, and we also want to be able to add new values. And merge sets.

The obvious way is a `vector<set<int>>`, one `set` for each group. It works, but we can do much better.

The classic problem looks like this:

>We have `n` cities and no roads. Roads get built one at a time. After every new road, say how many separate road networks are left.

We already know how to count connected components with DFS, in O(n + m). But the question is asked after **every single road**, and re-running DFS each time turns a linear algorithm into a quadratic one.

Union Find answers it after every road, in what is basically constant time.

### Theory

The trick is that we never store the sets at all.

Instead, every value points at one other value - its **parent**. Following those pointers upwards always ends at a value that points to itself, and that value is the **root**.

The root is the name of the set. Two values are in the same set exactly when they end up at the same root.

![[union-find-forest.png|The values 0 to 7 as a forest of four trees, where 1 and 2 point up at the root 0 and 3 points up at 2, 6 points up at the root 5, and 4 and 7 stand alone, with every root carrying a small loop back to itself]]

So the whole structure is a forest - one tree per set - and all we need to store it is a single array, `parent`.

Think of a group chat where everybody remembers who added them. To find out which chat you are in, keep asking "who added you?" until you reach the person who made it. That person's name is the name of the chat.

#### Find

`find(x)` walks from `x` up the parents until it hits the root, and returns it.

#### Union

`unite(a, b)` finds the root of `a`, finds the root of `b`, and makes one of them point at the other.

	![[union-find-unite.png|Two separate trees, one holding 0 and 1 and the other holding 2 and 3, then the same picture after uniting them, where the root 2 now points up at the root 0 and the two trees have become one]]

If both roots come back the same, the two values were already together and there is nothing to do.

That is the entire data structure. One array, and two functions that are five lines each.

### Making it fast

Written exactly like that, it is also very easy to make it slow.

Call `unite(0,1)`, then `unite(1,2)`, then `unite(2,3)`, and so on. Every union hangs one root under the other, and after `n` of them the forest is a single chain `n` long. Now every `find` has to walk the whole thing.

There are two fixes, they are one line each, and together they are what makes Union Find worth using.

#### Path compression

When `find(x)` reaches the root, it already knows the answer for **every node it passed on the way**. So before returning, we point all of them straight at the root.

	![[union-find-path-compression.png|A chain of four nodes with the path walked by find of 3 coloured, and beside it the same nodes after path compression, where 1, 2 and 3 all point directly at 0]]

The next `find` on any of those nodes stops after one step. The walk we just paid for is never paid for again.

#### Union by size

When we merge, we get to choose which root goes under which. Always put the **smaller** tree under the bigger one.

A node only gets one level deeper when its tree is the smaller half of a merge, which means the tree it lands in is at least twice as big as the one it came from. Doubling can only happen log n times, so the depth never passes O(log n) - and that is before path compression even gets involved.

With both fixes in place, `find` and `unite` cost **O(α(n))**, where α is the inverse Ackermann function. It grows so slowly that for any `n` that fits in a computer it is at most `4`. Treat it as O(1) and you will never be wrong in practice.

>Note:
>You will also see **union by rank**, which compares the heights of the trees instead of their sizes. Both give the same complexity, but union by size has a bonus - `sz[find(x)]` tells us how many elements are in `x`'s set, and problems ask for that surprisingly often.
### Code:

We will go through it block by block:

Setting up. Every value starts alone, so it is its own root and its set has exactly one element. `components` keeps count of how many sets there are right now:
~!
```c++
int n = 8;
vector<int> parent(n);
vector<int> sz(n);
int components = n;

void createSets(){

    for(int i=0;i<n;i++){
        parent[i] = i; //everybody is their own root
        sz[i] = 1;
    }
}
```

`find`:
The assignment happens on the way **back out** of the recursion, so by the time the outermost call returns, every node on the path is pointing at the root:
~!
```c++
int find(int x){

    if(parent[x] == x){ //x is a root, so x is the name of its set
        return x;
    }

    parent[x] = find(parent[x]); //path compression

    return parent[x];
}
```

`unite` is where union by size lives. Notice that the first thing it does is call `find` on both arguments - what arrives are two values, and what we actually merge are their roots:
~!
```c++
void unite(int a, int b){

    a = find(a);
    b = find(b);

    if(a == b){ //already together, nothing to do
        return;
    }

    if(sz[a] < sz[b]){ //the smaller tree goes under the bigger one
        swap(a, b);
    }

    parent[b] = a;
    sz[a] += sz[b];

    components--;
}
```

And one small helper that we will use constantly:
~!
```c++
bool same(int a, int b){
    return find(a) == find(b);
}
```

Creation: **O(n)**
find and unite: **O(α(n))** - in practice O(1)
Memory: **O(n)**

>Always compare with and only with: `find(a) == find(b)`!
### Where we use it

- Connected components that only ever grow, like the road problem we opened with.
- Checking whether a new edge would close a cycle - if both of its ends are already in the same set, it would.
- Kruskal's algorithm for minimum spanning trees, which is the line above run in a loop. We will meet it later.
- Grouping by anything that behaves like "these two are the same": same team, same colour, same region of a grid.

>Note:
>Union Find can merge, but it can never split. Once two sets become one, no operation takes them back apart. If a problem **removes** edges instead of adding them, the usual trick is to read all of the input first and process the queries backwards - a removal read in reverse is just an addition.
