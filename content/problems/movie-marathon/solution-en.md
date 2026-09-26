
## Approach

The greedy choice: always watch the movie that **ends earliest**. It frees us up soonest, and any other first choice ends later - so everything that fits after it also fits after ours. The swap can never make the answer worse.

(Choices like "the one that starts first" or "the shortest one" fail - a movie $0 \rightarrow 100$ starts first but blocks the whole night, try to find a counterexample for "the shortest one" yourself.)

The algorithm:

1. Sort the movies by **end time**.
2. Keep `current_time` - the moment we become free.
3. Take every movie whose start is `>= current_time`, and move `current_time` to its end.

**Careful:** a movie may start exactly when the previous one ends, so the condition is `>=`, not `>`.

To sort by end time we store each movie as a `pair<int,int>` - a handy type holding two values, accessed with `.first` and `.second`. Pairs are compared by `.first` (and by `.second` only on ties), so putting the **end time first** makes `sort()` do exactly what we need.

## Example

The statement movies, sorted by end time:

| movie | starts after we are free? | decision | current_time after |
|:---:|:---:|:---:|:---:|
| $1 \rightarrow 3$ | $1 \ge 0$, yes | **watch** | 3 |
| $2 \rightarrow 5$ | $2 \ge 3$, no | skip | 3 |
| $4 \rightarrow 7$ | $4 \ge 3$, yes | **watch** | 7 |
| $6 \rightarrow 9$ | $6 \ge 7$, no | skip | 7 |

Two movies watched - the answer is $2$.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    iostream::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;

    vector<pair<int,int>> movies(n);

    for(int i = 0; i < n; i++){

        int start, end;
        cin >> start >> end;

        movies[i] = {end, start}; // end goes first, so sorting sorts by end time
    }

    sort(movies.begin(), movies.end());

    int count = 0;
    int current_time = 0;

    for(int i = 0; i < n; i++){

        if(movies[i].second >= current_time){ // the movie starts after we are free

            count++;
            current_time = movies[i].first; // we are busy until it ends
        }
    }

    cout << count;
}
```

## Complexity

Time $O(n \log n)$
Memory $O(n)$
