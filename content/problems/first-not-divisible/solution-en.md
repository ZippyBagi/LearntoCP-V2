
## Approach

Scanning the whole array for every divisor costs $O(n \cdot q)$ - too slow. The guarantee is the key: for every divisor the array looks like

$$\underbrace{yes, yes, \ldots, yes}_{divisible}, \underbrace{no, no, \ldots, no}_{not \ divisible}$$

so the whole answer is one number - **the position of the border**.

Finding a border in such a yes-no array is a job for binary search, just a slightly different one than searching for a value: instead of comparing the middle element with a target, we ask the middle element a yes-no question.

Keep two borders, `left` and `right`, with the meaning: the first "no" is at a position in $[left, right]$. Start with $left = 0$ and $right = n$ - the value $n$ covers the case where **every** element is divisible and a first "no" does not exist.

Look at the middle position:

- if $a_{middle}$ **is** divisible, the border is strictly to the right of it: $left = middle + 1$;
- if it is **not**, the first "no" is at $middle$ or before it: $right = middle$.

When the two borders meet, `left` is the position of the first element that is not divisible - which is exactly the **number of divisible elements**.

**Careful:** the elements are up to $10^{18}$ and do not fit in an `int` - read them into `long long`. The divisors too.

## Example

The divisor $10$ on the array from the statement ($n = 13$):

`a = 210 2310 390 30 510 66 6 138 46 106 59 17 23`

| $left$ | $right$ | $middle$ | $a_{middle}$ | divisible? | new borders |
|---|---|---|---|---|---|
| $0$ | $13$ | $6$ | $6$ | no | $right = 6$ |
| $0$ | $6$ | $3$ | $30$ | **yes** | $left = 4$ |
| $4$ | $6$ | $5$ | $66$ | no | $right = 5$ |
| $4$ | $5$ | $4$ | $510$ | **yes** | $left = 5$ |

Now $left = right = 5$: the first element not divisible by $10$ is at position $5$, so $5$ elements are divisible - the first answer. Four questions instead of thirteen.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    iostream::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;

    while(t--) {

        int n, q;
        cin >> n >> q;

        vector<long long> a(n); // the values can be up to 10^18, they do not fit in an int
        for(int i = 0; i < n; i++) cin >> a[i];

        while(q--) {

            long long d;
            cin >> d;

            // find the first position where the element is not divisible by d
            int left = 0, right = n; // right = n: maybe every element is divisible

            while(left < right) {
                int middle = (left + right) / 2;
                if(a[middle] % d == 0) left = middle + 1; // the border is right of middle
                else right = middle;                      // middle is not divisible, the border is at middle or left of it
            }

            cout << left << "\n"; // left = number of divisible elements
        }
    }

    return 0;
}
```

## Complexity

Time $O(q \log n)$
Memory $O(n)$
