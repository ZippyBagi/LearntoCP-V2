
## Approach

Read the expression left to right and ask: when we meet an operator, where are its two operands? They are the two **most recently completed** values. "Most recent first" is exactly what a **stack** gives us, so:

- a digit is a finished value - push it on the stack;
- an operator takes the top two values off the stack, combines them, and pushes the result back.

Every operator consumes two values and produces one, so a valid expression ends with exactly **one** value on the stack - the answer.

Why does this compute the right thing? A postfix expression is read in exactly the order in which the results are needed: by the time an operator arrives, both of its operands - however complicated - have already been folded into single numbers on the stack.

**Careful:** the top of the stack is the **right** operand (it was pushed last), the one below is the left. For `+` and `*` the order does not matter, but pop them into named variables anyway - the habit saves you when `-` or `/` show up.

**Careful:** the values reach $10^{18}$ - the stack holds `long long`, not `int`.

## Example

The first expression, `12+3*`:

| symbol | action | stack after |
|---|---|---|
| `1` | push $1$ | $1$ |
| `2` | push $2$ | $1, 2$ |
| `+` | $1 + 2 = 3$ | $3$ |
| `3` | push $3$ | $3, 3$ |
| `*` | $3 \cdot 3 = 9$ | **$9$** |

One value remains - $9$, the value of `(1+2)*3`.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        string s;
        cin>>s;

        stack<long long> st; // intermediate values can be large

        for(char c : s){
            if(c >= '0' && c <= '9'){
                st.push(c - '0'); // a number goes straight to the stack
            }else{
                long long b = st.top(); st.pop(); // the right operand was pushed last
                long long a = st.top(); st.pop();
                if(c == '+'){
                    st.push(a + b);
                }else{
                    st.push(a * b);
                }
            }
        }

        cout<<st.top()<<'\n'; // the value of the whole expression
    }
    return 0;
}
```

## Complexity

Time $O(L)$ where $L$ is the length of the expression
Memory $O(L)$
