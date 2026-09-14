>In this lesson we will learn how to make the computer write down every subset, sequence, permutation and combination - not just count them.

In the Combinatorics chapter we learned how to count these objects. `2^n` subsets, `n!` permutations, `n choose k` combinations.

But a formula gives us a number, not the objects themselves. Some problems want the objects: print every arrangement, or try each one and keep the best.

For a fixed size we could manage with nested loops - three of them give us every sequence of length 3. The moment the length comes from the input we are stuck, because we cannot write `k` nested loops when `k` is only known at runtime.

Recursion can. Each call is one more level of nesting, and the depth is decided while the program runs.

### One position at a time

Every generator in this lesson builds the object **left to right**, one position at a time:

~!
```c++
void generate(int pos){

    if(pos == length){ //the object is complete
        print();
        return;
    }

    for(every option allowed at this position){

        write the option into position pos
        generate(pos + 1);
        undo the option
    }
}
```

Read it as a tree. Each level of the recursion is one position, each iteration of the loop is one branch, and each leaf is one finished object.

Only one thing changes between the four objects: **which options are allowed at a position**. Everything else stays exactly as written above.

### Subsets

A subset is `n` independent yes/no decisions - for each element we either take it or we don't. So "position `i`" means "the decision about element `i`", and there are only two options.

We keep the elements we took in a vector called `chosen`.

Subsets.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int n = 3;
vector<int> chosen; //the subset we are building right now

void subsets(int i){

    if(i == n){ //we decided about every element

        cout<<"{ ";
        for(int j=0;j<chosen.size();j++){
            cout<<chosen[j]<<" ";
        }
        cout<<"}"<<'\n';

        return;
    }

    subsets(i+1); //leave element i+1 out

    chosen.push_back(i+1); //take element i+1
    subsets(i+1);
    chosen.pop_back(); //undo, so the caller finds chosen as it left it
}

int main(){

    subsets(0);

    return 0;
}
```
Output:
`{ }`
`{ 3 }`
`{ 2 }`
`{ 2 3 }`
`{ 1 }`
`{ 1 3 }`
`{ 1 2 }`
`{ 1 2 3 }`

Eight subsets, which is the $2^n$ we counted in the Combinatorics chapter - and now we have them, not just their number.

That `chosen.pop_back()` is not decoration. `chosen` is **one vector shared by every call**, so a call that pushes and returns without popping hands its parent a vector it no longer recognises. Delete the line and the output turns into this:

`{ }`, `{ 3 }`, `{ 3 2 }`, `{ 3 2 3 }`, `{ 3 2 3 1 }`, ...

	![[backtracking-undo.png|Four prints from a backtracking search compared with and without pop_back: with it the shared vector holds only the current branch, without it an element left behind by a returned call contaminates every later print]]

The rule is simple: whatever a call writes before recursing, it removes after recursing. This is called **backtracking** - we walk down a branch, and on the way back up we leave the state exactly as we found it.

### Sequences

Now let's allow more than two options. We want every sequence of length `k` built from the values `1` to `n`, repetitions allowed - think of every possible `k` digit PIN code.

Every value is allowed at every position, so the loop has no condition at all.

Sequences.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int n = 3; //we pick from the values 1..n
int k = 2; //the sequence is k long
vector<int> a(k);

void sequences(int pos){

    if(pos == k){

        for(int i=0;i<k;i++){
            cout<<a[i]<<" ";
        }
        cout<<'\n';

        return;
    }

    for(int v=1;v<=n;v++){ //every value fits at every position
        a[pos] = v;
        sequences(pos+1);
    }
}

int main(){

    sequences(0);

    return 0;
}
```
Output:
`1 1`
`1 2`
`1 3`
`2 1`
`2 2`
`2 3`
`3 1`
`3 2`
`3 3`

Nine sequences, which is $n^k = 3^2$.

There is no undo here, because `a[pos] = v` overwrites the slot on the next turn of the loop - undoing is only needed when the write actually adds something. And notice the output came out sorted without us sorting anything: we try the values in increasing order at every position, so the smaller object is always printed first.

### Permutations

A permutation uses every value exactly once. So the rule becomes: at this position we may try any value that is **not already placed to the left**. We track that with a `used` array.

Permutations.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int n = 3;
vector<int> a(n);
vector<bool> used(n+1, false); //used[v] tells us if v is already placed

void permutations(int pos){

    if(pos == n){

        for(int i=0;i<n;i++){
            cout<<a[i]<<" ";
        }
        cout<<'\n';

        return;
    }

    for(int v=1;v<=n;v++){

        if(used[v]){ //v is already somewhere to the left
            continue;
        }

        used[v] = true;
        a[pos] = v;
        permutations(pos+1);
        used[v] = false; //undo
    }
}

int main(){

    permutations(0);

    return 0;
}
```
Output:
`1 2 3`
`1 3 2`
`2 1 3`
`2 3 1`
`3 1 2`
`3 2 1`

Six of them, which is `3!`.

`used[v]` is a flag we set, so it has to be unset on the way back up. Forget that one line and the first branch marks every value as taken, and the program prints a single permutation.

### Combinations

A combination is a group of `k` elements where order does not matter. `1 3` and `3 1` are the same group, and we want to print it once.

We could generate every arrangement and throw away the ones we have seen. It is much better to never create them: **always print the group in increasing order**. Then each group has exactly one spelling, so we get it exactly once.

To do that, a position may only take values larger than the one before it. We pass that lower bound down as a second parameter.

Combinations.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int n = 3;
int k = 2;
vector<int> a(k);

void combinations(int pos, int start){

    if(pos == k){

        for(int i=0;i<k;i++){
            cout<<a[i]<<" ";
        }
        cout<<'\n';

        return;
    }

    for(int v=start;v<=n;v++){ //never look back
        a[pos] = v;
        combinations(pos+1, v+1); //the next position must go higher
    }
}

int main(){

    combinations(0, 1);

    return 0;
}
```
Output:
`1 2`
`1 3`
`2 3`

Three groups, which is $\binom{3}{2}$ - the six permutations above, divided by the `2!` orders we refused to repeat.

The `start` parameter does the same job as the `used` array, only cheaper. Because we always move forward, "not used yet" and "larger than the last one" mean the same thing here.

>Note:
>This code still enters branches that can never finish - starting at `3` leaves nothing for the second position. It costs nothing at this size, but the fix is one condition: stop the loop at `v <= n - (k - pos) + 1`, so a position never takes a value that leaves too few behind.

### The same algorithm four times

	![[generating-one-skeleton.png|The same nine length two branches shown three times, filtered by a different rule each time: every value keeps 9, only unused values keeps 6, and only values above the previous keeps 3]]

| Object | What we try at a position | How many |
| ---- | ---- | ---- |
| Subsets | take this element, or don't | $2^n$ |
| Sequences | every value from `1` to `n` | $n^k$ |
| Permutations | every value not used yet | $n!$ |
| Combinations | every value above the previous one | $\binom{n}{k}$ |

>The base case, the loop and the backtracking never changed. Only the condition inside the loop did.
### How big can n be?

These algorithms produce every object, so they can never be faster than the number of objects. Printing one object of length `n` costs O(n), which gives us:

| Object | Complexity |
| ---- | ---- |
| Subsets | **O(n * 2^n)** |
| Sequences | **O(k * n^k)** |
| Permutations | **O(n * n!)** |
| Combinations | **O(k * C(n, k))** |

Those numbers grow violently. `2^20` is about a million and perfectly fine, `2^30` is a billion and not. `10!` is around 3.6 million, `11!` is 40 million.

So generating subsets works up to around `n = 20`, and generating permutations up to around `n = 10`. 

>If the constraints are larger, the problem does not want you to generate anything - it wants counting, greedy or dynamic programming.
