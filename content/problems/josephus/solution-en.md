
## Approach

The circle is the only tricky part - and a **queue** dissolves it. Put the students $0, 1, \ldots, n-1$ in a queue, front of the queue = the student the counting is currently at. Then one round of counting is:

- the first $m - 1$ students survive the count - each one is moved from the front to the **back** of the queue (that is the "circle": after you are counted, you wait for the next lap);
- the $m$-th student is removed for good.

Repeat until a single student remains - the front of the queue is the answer.

Each round costs $m$ queue operations and removes one student, so a whole game is $O(n \cdot m)$ operations - with the given limits, at most around $2.5 \cdot 10^7$, comfortably fast.

(There is also a famous $O(n)$ formula for this problem - the Josephus recurrence - but the queue simulation is the point here: it turns "sitting in a circle" into two lines of code.)

## Example

The first testcase, $n = 8$, $m = 3$ - the queue after every elimination:

| eliminated | queue (front first) |
|---|---|
| - | $0\ 1\ 2\ 3\ 4\ 5\ 6\ 7$ |
| $2$ | $3\ 4\ 5\ 6\ 7\ 0\ 1$ |
| $5$ | $6\ 7\ 0\ 1\ 3\ 4$ |
| $0$ | $1\ 3\ 4\ 6\ 7$ |
| $4$ | $6\ 7\ 1\ 3$ |
| $1$ | $3\ 6\ 7$ |
| $7$ | $3\ 6$ |
| $3$ | **$6$** |

Follow the first round: $0$ and $1$ are counted and go to the back, $2$ is counted out. The last student standing is $6$ - the answer.

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

        int n, m;
        cin>>n>>m;

        queue<int> q;
        for(int i=0;i<n;i++){
            q.push(i); // the students sit in a circle, 0 is first in line
        }

        while(q.size() > 1){
            for(int i=0;i<m-1;i++){ // the first m-1 students survive this round
                q.push(q.front());  // and move to the back of the line
                q.pop();
            }
            q.pop(); // the m-th student leaves the game
        }

        cout<<q.front()<<'\n';
    }
    return 0;
}
```

## Complexity

Time $O(n \cdot m)$
Memory $O(n)$
