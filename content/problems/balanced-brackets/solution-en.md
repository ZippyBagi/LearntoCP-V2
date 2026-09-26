
## Approach

The key question: when we meet a `)`, which `(` does it close?

It must close **the most recent** opener that is still unclosed. That "most recent thing first" pattern is exactly what a stack is for - the most recent unclosed `(` is always sitting on top.

So we scan the string once:

- When we see `(` - push it onto the stack, it is waiting for its pair.
- When we see `)` - pop the top of the stack, that opener is now closed.

There are exactly two ways this can go wrong:

- We have to pop from an **empty** stack - this `)` has nobody to close. The answer is `NO` immediately.
- The stack is **not empty at the end** - some `(` was never closed. Also `NO`.

If neither happens, every bracket found its pair - `YES`.

**Careful:** checking only that the counts of `(` and `)` are equal is not enough - `)(` has one of each but is not balanced. The *order* matters, which is why the empty-stack check must happen during the scan, not after it.

## Example

The statement string `(()())`, character by character (showing the stack size):

| character | action | stack size after |
|:---:|:---:|:---:|
| `(` | push | 1 |
| `(` | push | 2 |
| `)` | pop | 1 |
| `(` | push | 2 |
| `)` | pop | 1 |
| `)` | pop | 0 |

We never popped from an empty stack, and the stack ends empty - `YES`.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    iostream::sync_with_stdio(false);
    cin.tie(0);

    string s;
    cin >> s;

    stack<char> st;

    for(int i = 0; i < s.size(); i++){

        if(s[i] == '('){

            st.push(s[i]); // an opener, waiting for its pair

        }else{

            if(st.empty()){ // a closer with nobody to close
                cout << "NO";
                return 0;
            }
            st.pop();
        }
    }

    if(st.empty()){
        cout << "YES";
    }else{ // some openers were never closed
        cout << "NO";
    }

    return 0;
}
```

## Bonus: O(1) memory

Notice that we never look at *what* is on the stack, only whether it is empty - all its elements are `(` anyway. So the whole stack can be replaced by a single counter: `+1` on `(`, `-1` on `)`. If the counter ever goes negative - `NO`; if it ends at anything but zero - `NO`; otherwise `YES`.

(The stack version is still worth knowing - with multiple bracket types like `[` and `{`, the counter trick breaks down, but the stack solution barely changes.)

## Complexity

Time $O(n)$
Memory $O(n)$ (or $O(1)$ with the counter)
