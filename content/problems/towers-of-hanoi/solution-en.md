
## Approach

Look only at the **biggest disc**. It has to end up on peg $3$, and nothing may ever sit on it, so at the moment it moves the other two pegs must look like this: peg $3$ is completely empty, and all $n-1$ smaller discs are stacked on peg $2$.

So the whole job splits into three steps:

1. move the top $n-1$ discs from peg $1$ to peg $2$,
2. move the biggest disc from peg $1$ to peg $3$ - a single line of output,
3. move those $n-1$ discs from peg $2$ to peg $3$.

Steps 1 and 3 are **the same problem with one disc less**. That is the whole solution: a function that moves $k$ discs from one peg to another, using the third one as a parking spot.

~!
```c++
hanoi(k, from, to, spare)
```

The three pegs change roles at every level - in step 1 the destination $3$ is the spare peg, in step 3 the source $1$ is. That is why the function takes all three as parameters instead of naming them.

The base case is $k = 0$: no discs, nothing to print, just return.

**Why are the smaller discs never in the way?** Because while we work on them, the biggest disc is still lying on the bottom of its peg - and it is bigger than everything we are moving, so any disc may be dropped on it. The same argument repeats one level down, so every move the function makes is legal.

**Why is this the fewest possible moves?** The biggest disc has to move at least once, and before it can, all $n-1$ others must be off both peg $1$ and peg $3$ - that is, stacked on peg $2$. So a solution can never do better than "solve $n-1$, one move, solve $n-1$", which is exactly what we do. Counting the lines: $f(n) = 2f(n-1) + 1$ with $f(0) = 0$, so $f(n) = 2^n - 1$.

## Example

The first testcase, $n = 3$ - the seven lines the calls print, in the order they come out:

| # | printed | disc | who printed it |
|---|---|---|---|
| 1 | $1\ 3$ | $1$ | step 1 of "move 2 discs $1 \rightarrow 2$", one level deeper |
| 2 | $1\ 2$ | $2$ | step 2 of "move 2 discs $1 \rightarrow 2$" |
| 3 | $3\ 2$ | $1$ | step 3 of "move 2 discs $1 \rightarrow 2$" |
| 4 | **$1\ 3$** | **$3$** | **step 2 of the top call - the biggest disc** |
| 5 | $2\ 1$ | $1$ | step 1 of "move 2 discs $2 \rightarrow 3$" |
| 6 | $2\ 3$ | $2$ | step 2 of "move 2 discs $2 \rightarrow 3$" |
| 7 | $1\ 3$ | $1$ | step 3 of "move 2 discs $2 \rightarrow 3$" |

Read the first three lines together: they are one call, "move 2 discs from peg $1$ to peg $2$", and inside it peg $3$ plays the spare. After line $3$ the two small discs really are sitting on peg $2$ and peg $3$ is empty, so line $4$ is allowed. The last three lines are the mirror image: "move 2 discs from peg $2$ to peg $3$", with peg $1$ as the spare.

**Careful:** the moves of the testcases are printed one after another with nothing in between. Do not print the number of moves or a separator - the reader of your output knows that a testcase with $n$ discs takes exactly $2^n - 1$ lines.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

void hanoi(int n, int from, int to, int spare){

    if(n == 0){ // nothing left to move - the base case
        return;
    }

    hanoi(n - 1, from, spare, to); // clear the n-1 smaller discs out of the way
    cout<<from<<" "<<to<<"\n"; // now the biggest disc is free to move
    hanoi(n - 1, spare, to, from); // and the small ones come back on top of it
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        int n;
        cin>>n;

        hanoi(n, 1, 3, 2); // from peg 1 to peg 3, peg 2 is the spare one
    }
    return 0;
}
```

Notice we never store the pegs anywhere - there is no array of discs in the program. The state of the towers lives entirely in the chain of calls.

## Complexity

Time $O(2^n)$ per testcase
Memory $O(n)$
