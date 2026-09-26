
## Approach

The **cross product** tells us exactly what the question asks.

For a house $P$ we build the two vectors that start at $A$:

$$\vec{AB} = (B_x - A_x,\; B_y - A_y) \qquad \vec{AP} = (P_x - A_x,\; P_y - A_y)$$

and look only at the **sign** of

$$\vec{AB} \times \vec{AP} = (B_x - A_x)(P_y - A_y) - (B_y - A_y)(P_x - A_x)$$

- **positive** - going from $\vec{AB}$ to $\vec{AP}$ we turn counter-clockwise, so $P$ is on the left bank;
- **negative** - we turn clockwise, so $P$ is on the right bank;
- **zero** - the two vectors are parallel, so $P$ lies on the river itself.


**Careful:** the product must be computed in `long long`. 

## Example

The first testcase, with the river $A = (0,0)$, $B = (4,4)$, so $\vec{AB} = (4, 4)$:

| house $P$ | $\vec{AP}$ | $\vec{AB} \times \vec{AP}$ | bank |
|---|---|---|---|
| $(0, 4)$ | $(0, 4)$ | $16$ | left |
| $(1, 4)$ | $(1, 4)$ | $12$ | left |
| $(4, 0)$ | $(4, 0)$ | $-16$ | right |
| $(2, 2)$ | $(2, 2)$ | $\mathbf{0}$ | **on the river** |
| $(5, 1)$ | $(5, 1)$ | $-16$ | right |
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

        int n;
        cin >> n;

        long long ax, ay, bx, by;
        cin >> ax >> ay >> bx >> by;

        int cntLeft = 0, cntRight = 0, cntOn = 0;

        for(int i = 0; i < n; i++) {

            long long x, y;
            cin >> x >> y;

            // cross product of AB and AP - only its sign matters
            long long prod = (bx - ax) * (y - ay) - (by - ay) * (x - ax);

            if(prod > 0) cntLeft++;
            else if(prod < 0) cntRight++;
            else cntOn++;
        }

        cout << cntLeft << " " << cntRight << " " << cntOn << "\n";
    }

    return 0;
}
```

The houses are never stored - each one is read, classified and thrown away.

## Complexity

Time $O(n)$ per testcase
Memory $O(1)$
