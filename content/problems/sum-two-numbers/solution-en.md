Read the two integers, add them, and print the result.
## Approach

Read `a` and `b` from standard input, compute `a + b` in a 32-bit integer, and write it to standard output.

No need to use long long, as $10^9+10^9 < 2^{31}-1$ (32-bit int max)
## Code

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b;
    return 0;
}
```

## Complexity

Time $O(1)$, memory $O(1)$.
