
## Approach

The lamp lights everything in a range of length $2d$: from $d$ left of it to $d$ right of it. Turn the question around:

- a **set of houses** can be lit by one lamp exactly when the leftmost and the rightmost of them are at most $2d$ apart (put the lamp in the middle of that span);
- so we are looking for the largest group of houses that fits in a **window of length $2d$**.

The best group always consists of consecutive houses when they are sorted, so first **sort** the coordinates.

Now run two pointers over the sorted coordinates, both moving only forward:

- `right` extends the window with the next house;
- `left` shrinks it from the back while the window is too wide, that is while $x_{right} - x_{left} > 2d$.

After the shrinking step the window $[left, right]$ is valid again, so its size `right - left + 1` is a candidate for the answer. 

Each pointer only ever moves forward, at most $n$ steps each - so the scan is $O(n)$ after the $O(n \log n)$ sort. No window is missed: for every `right` we find the widest valid window ending there.

## Example

The first testcase sorted: $[-68, -11, -4, 13, 15, 29]$, window length $2d = 26$:

| $x_{right}$ | window starts at | size |
|---|---|---|
| $-68$ | $-68$ | $1$ |
| $-11$ | $-11$ | $1$ |
| $-4$ | $-11$ | $2$ |
| $13$ | $-11$ | $3$ |
| $15$ | $-11$ | **$4$** |
| $29$ | $13$ | $3$ |

Check the row of $15$: the window $[-11, 15]$ has span $26 \le 26$, four houses - the answer. One house later, at $29$, the span to $-11$ is $40$, so `left` jumps to $13$ and only three houses remain.

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

        int n, d;
        cin >> n >> d;

        vector<int> x(n); // coordinates within +-10^9, and 2*d up to 2*10^9, both fit in an int
        for(int i = 0; i < n; i++) cin >> x[i];

        sort(x.begin(), x.end());

        int best = 0, left = 0;

        for(int right = 0; right < n; right++) {
            while(x[right] - x[left] > 2 * d) left++; // shrink the window until it fits under one lamp
            best = max(best, right - left + 1);
        }

        cout << best << "\n";
    }

    return 0;
}
```

## Complexity

Time $O(n \log n)$
Memory $O(n)$
