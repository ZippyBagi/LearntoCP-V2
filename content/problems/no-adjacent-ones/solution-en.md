
## Approach

We are not asked for a count or for one clever array - we are asked for every array. So the algorithm has to walk through all of them, and the only question is how to walk without ever producing a forbidden one.

Fill the corridor **one room at a time**, left to right. Standing at position $i$, with positions $0$ through $i-1$ already decided, there are only two things we could write:

- a $0$ is always fine - an empty room can never break the rule
- a $1$ is fine only if position $i-1$ holds a $0$ (and position $0$ is always fine, since nothing stands before it)

Write one of them, hand the rest of the corridor to the recursion, and when position $n$ is reached the array is complete - print it. That is the whole solution: one base case, and a call that passes a smaller job forward.

Notice that the rule is checked at the moment we write the digit, not at the end. A branch that would break the rule is never entered at all, so we never build an array only to throw it away.

## Ordering

The required order comes for free. At every position we try $0$ **before** $1$, so of two arrays that first differ at position $i$, the one with the $0$ there is printed first - and that is exactly increasing order.
## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int n;
int a[25];

void generate(int i){

    if(i == n){                     // the array is complete
        for(int j = 0; j < n; j++){
            if(j) cout<<' ';
            cout<<a[j];
        }
        cout<<'\n';
        return;
    }

    a[i] = 0;                       // a 0 never breaks the rule
    generate(i + 1);

    if(i == 0 || a[i - 1] == 0){    // a 1 only when the room before is empty
        a[i] = 1;
        generate(i + 1);
        a[i] = 0;                   // undo, so the caller sees the array as it left it
    }
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    cin>>n;

    generate(0);

    return 0;
}
```

The array `a` is a single shared buffer that the recursion writes into and cleans up after itself, which is why nothing has to be copied on the way down.

## Complexity

Time $O(n \cdot F_{n+2})$, which is the size of the output
Memory $O(n)$ for the array and the call stack
