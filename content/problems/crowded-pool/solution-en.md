
## Approach

Checking every moment is impossible - time goes up to $10^9$. But the number of people at the pool only changes at $2n$ special moments: when someone **arrives** or **leaves**. Between two neighboring events nothing moves, so it is enough to watch the crowd size at the events.

Turn every visitor into two **events**: $(a, +1)$ for the arrival and $(b, -1)$ for the departure. Sort all events by time and sweep through them, keeping a running counter:

- $+1$ - one person more at the pool;
- $-1$ - one person less.

The answer is the largest value the counter ever reaches.

One detail decides correctness: **what happens when events share a moment?** A visitor leaving at time $x$ is no longer there, but one arriving at $x$ already is - so at equal times, departures must be processed **before** arrivals, otherwise the two would be counted as overlapping. Sorting pairs handles this for free: $(x, -1)$ sorts before $(x, +1)$, because pairs compare by the second value when the first ones are equal.

**Careful:** if you sort arrivals before departures instead, the example intervals $[1, 2)$ and $[2, 5)$ would wrongly count as meeting at moment $2$. That is exactly what the note about the half-open periods means.

-g> This technique is important to remember, as it becomes really useful later!
## Example

The events of the statement example, sorted - the counter as the sweep passes them:

| time | events | counter |
|---|---|---|
| $1$ | $+1$, $+1$ | $2$ |
| $2$ | $-1$, $+1$ | $2$ |
| $3$ | $+1$ | $3$ |
| $4$ | $+1$, $+1$ | **$5$** |
| $5$ | $-1$, $-1$ | $3$ |
| $6$ | $-1$, $-1$, $+1$ | $2$ |
| $7$ | $-1$, $+1$ | $2$ |
| $8$ | $-1$, $-1$ | $0$ |

Look at moment $2$: the visitor with $[1, 2)$ leaves before the one with $[2, 5)$ enters, so the counter dips to $1$ and comes back to $2$. The peak is $5$, at moment $4$ - the answer.

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

        int n;
        cin>>n;

        vector<pair<int,int>> events; // (time, +1) is an arrival, (time, -1) a departure

        for(int i=0;i<n;i++){
            int a, b;
            cin>>a>>b;
            events.push_back({a, +1});
            events.push_back({b, -1});
        }

        sort(events.begin(), events.end()); // equal times: -1 sorts before +1, departures go first

        int cur = 0, best = 0;

        for(auto e : events){
            cur += e.second; // one person more or less at the pool
            best = max(best, cur);
        }

        cout<<best<<'\n';
    }
    return 0;
}
```

## Complexity

Time $O(n \log n)$
Memory $O(n)$
