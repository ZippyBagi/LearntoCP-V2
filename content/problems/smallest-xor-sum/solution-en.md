
## Approach

XOR works on each bit separately, so decide the key **one bit at a time**.

Setting bit $k$ of the key is worth it only when **both** $a$ and $b$ have that bit - then $x$ ^ $x = 0$ deletes it from both numbers and the position costs nothing. That is exactly the key $x = a \, \& \, b$.

What is left after those deletions are the positions where $a$ and $b$ differ, and those we always pay: whatever the key does there, exactly one of the two numbers keeps its $1$. That is the definition of XOR:

$$\min_{x} \left( (a \oplus x) + (b \oplus x) \right) = a \oplus b$$
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

        unsigned int a, b;
        cin>>a>>b;

        cout<<(a ^ b)<<'\n'; // only the bits where a and b differ survive, each paid once
    }
    return 0;
}
```

## Complexity

Time $O(t)$
Memory $O(1)$
