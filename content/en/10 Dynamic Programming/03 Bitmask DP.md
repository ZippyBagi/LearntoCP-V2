>In this lesson we will learn what happens when a dp state stops being a number and becomes a set - Bitmask DP!

Every dp we have written so far had a state we could count on our fingers. `dp[i]` was the `i`-th Fibonacci number, `dp[i][w]` was the best we could do with the first `i` items and `w` capacity left, `dp[v][0]` and `dp[v][1]` were the two choices at node `v`.

Some problems refuse to fit into that. Look at this one:

>There are `n` workers and `n` jobs. Worker `i` doing job `j` costs `cost[i][j]`. Every worker gets exactly one job, and every job goes to exactly one worker. Make the total cost as small as possible.

What does a partial solution look like here? We handed out a few jobs and we are about to hand out the next one. To decide well, we do not need to know **which** worker got **which** job - we only need to know **which jobs are already gone**.

And that is a set. Not an index, not a counter. A set.

We already know how to write a set as a number, so `dp[mask]` is just an array again.

### The state

Let `mask` be the set of jobs that are already assigned.

Here comes the observation that makes the whole thing work: if `mask` holds `k` jobs, then exactly `k` workers have been served, so the next worker to assign is worker `k`. And `k` is `__builtin_popcount(mask)`.

We never needed a second dimension. The mask already tells us how far along we are.

`dp[mask]` = the cheapest way to give away exactly the jobs in `mask`, to workers `0` through `k-1`

The answer is `dp[(1<<n)-1]`, the state where every job is gone.

	![[bitmask-dp-assignment-en.png|A three by three cost table for workers W0 to W2 and jobs J0 to J2 holding 9 2 7, 6 4 3 and 5 8 1, beside the lattice of the eight masks from 000 at the bottom to 111 at the top, with the cheapest path 000 to 010 to 011 to 111 highlighted and its steps labelled 2, 6 and 1, adding up to 9]]

### The transition

Standing at `dp[mask]`, we look at worker `k` and try every job that is still free:

`dp[mask | (1<<job)] = min(dp[mask | (1<<job)], dp[mask] + cost[k][job])`

This is a **push**: instead of asking where the current state came from, we take the value we already have and push it forward into every state it can reach.

The loop over masks can go in plain increasing order, and that is not a coincidence. Adding a bit always makes a number larger, so `mask | (1<<job)` is always greater than `mask`. By the time we arrive at a mask, everything that could improve it has already been processed.

### Code

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int n = 3;

int cost[3][3] = {
    {9, 2, 7},
    {6, 4, 3},
    {5, 8, 1}
};

int main(){

    vector<int> dp(1<<n, 1e9); //1e9 stands in for infinity

    dp[0] = 0; //nothing given out yet, nothing paid yet

    for(int mask=0;mask<(1<<n);mask++){

        int worker = __builtin_popcount(mask); //the next worker without a job

        if(worker == n){ //everybody is already busy
            continue;
        }

        for(int job=0;job<n;job++){

            if((mask>>job)&1){ //this job is taken
                continue;
            }

            int next = mask | (1<<job);

            dp[next] = min(dp[next], dp[mask] + cost[worker][job]);
        }
    }

    cout<<dp[(1<<n)-1];

    return 0;
}
```
Output: `9`

The cheapest plan is `W0` on `J1` for `2`, `W1` on `J0` for `6` and `W2` on `J2` for `1`.

Time Complexity: **O(2^n * n)**
Space Complexity: **O(2^n)**

Compare that with trying every assignment by hand. There are `n!` of them, and at `n = 20` that is about `2 * 10^18` - a number no computer will ever finish counting to. The dp does `2^20 * 20`, which is about `2 * 10^7`, and finishes instantly.

The reason for the gap is the usual dp reason. Two different orders of handing out the same three jobs lead to the same set, and from that point on their futures are identical. The permutation forgets that; the mask remembers it.

### The travelling salesman

The other classic, and the one problems most often disguise:

>We have `n` cities and the distance between every pair of them. Starting from city `0`, visit every city exactly once and come back to `0`. Find the shortest such route.

	![[bitmask-dp-tsp.png|Four cities 0, 1, 2 and 3 drawn as a rectangle with all six roads labelled, where the tour 0 to 1 to 3 to 2 and back to 0 runs around the outside and costs 10 plus 25 plus 30 plus 15 equals 80, leaving the two diagonals unused]]

Here the mask alone is not enough. Knowing which cities we have seen does not tell us the price of the next road, because that depends on **where we are standing right now**. So the state grows a second dimension:

`dp[mask][v]` = the shortest route that starts at `0`, visits exactly the cities in `mask`, and ends standing in city `v`

The starting state is `dp[1][0] = 0` - only city `0` is visited, and we are in it, having driven nothing.

From `dp[mask][v]` we drive to any city `to` that is not in `mask` yet:

`dp[mask | (1<<to)][to] = min(..., dp[mask][v] + d[v][to])`

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int n = 4;

int d[4][4] = {
    {0, 10, 15, 20},
    {10, 0, 35, 25},
    {15, 35, 0, 30},
    {20, 25, 30, 0}
};

int main(){

    vector<vector<int>> dp(1<<n, vector<int>(n, 1e9));

    dp[1][0] = 0; //only city 0 is visited, and we are standing in it

    for(int mask=1;mask<(1<<n);mask++){

        for(int v=0;v<n;v++){

            if(dp[mask][v]==1e9){ //we can never be here with this set visited
                continue;
            }

            for(int to=0;to<n;to++){

                if((mask>>to)&1){ //already been there
                    continue;
                }

                int next = mask | (1<<to);

                dp[next][to] = min(dp[next][to], dp[mask][v] + d[v][to]);
            }
        }
    }

    int full = (1<<n)-1;
    int best = 1e9;

    for(int v=1;v<n;v++){
        best = min(best, dp[full][v] + d[v][0]); //the road home
    }

    cout<<best;

    return 0;
}
```
Output: `80`

The route is `0 -> 1 -> 3 -> 2 -> 0`, costing `10 + 25 + 30 + 15`.

Time Complexity: **O(2^n * n^2)**
Space Complexity: **O(2^n * n)**

Two lines deserve a second look.

The `if(dp[mask][v]==1e9) continue;` is not an optimisation, it is correctness. Most `(mask, v)` pairs are impossible - being in city `2` when `2` is not in the visited set, for instance - and pushing forward from infinity would write `1e9 + something` into a real state and quietly poison it.

The final loop starts at `v=1`, not `v=0`. We need the last city before coming home, and that city cannot be the one we started from.

>Note:
>The `d[v][0]` at the end is the only place the route closes into a circle. If the problem only asks us to visit everything and stop wherever we end up, delete that term and take the plain minimum over `dp[full][v]`.

### Watch the memory

The time complexity is what people check. The memory is what gets them.

`dp[1<<20]` of `int` is about a million numbers, so `4 MB`. Fine.

`dp[1<<20][20]` is twenty million numbers, so `80 MB`. That is why it's important to check the memory constraints.

So a second dimension does not just multiply the running time, it multiplies the memory too. With a mask dimension, `n <= 20` is the rule for `dp[mask]`, and `n <= 18` is the safer rule for `dp[mask][v]`. 

| dp array | Memory at n = 20 |
| ---- | ---- |
| `dp[1<<n]` of `int` | ~4 MB |
| `dp[1<<n]` of `long long` | ~8 MB |
| `dp[1<<n][n]` of `int` | ~80 MB |

If a `long long` dp over `dp[mask][v]` does not fit, check whether the values actually need one before reaching for tricks. They usually do not.

### When the transition is a submask

There is a third shape worth recognising, the one where a state does not add a single element but a whole group at once.

>Split `n` people into teams. A team of exactly the people in `group` costs `w[group]`. Find the cheapest way to split everybody up.

Here `dp[mask]` = the cheapest way to split the people in `mask` into teams, and the transition takes one whole submask of `mask` as the next team:
~!
```c++
dp[0] = 0;

for(int mask=1;mask<(1<<n);mask++){

    for(int sub=mask; sub>0; sub=(sub-1)&mask){

        int rest = mask ^ sub; //everybody in mask who is not on this team

        dp[mask] = min(dp[mask], dp[rest] + w[sub]);
    }
}
```

That is the submask walk from the Bitmasks lesson, and running it for every mask costs **O(3^n)**. At `n = 20` that is about `3.5 * 10^9`, which is too slow, but at `n = 15` it is `1.4 * 10^7` and perfectly comfortable.

>Note:
>A common trick pins one person down: only consider submasks that contain the lowest set bit of `mask`. Every split is then generated once instead of twice, and a lot of duplicate work disappears.

### How to spot these problems

Three signs, and they usually show up together:

- `n` is suspiciously small. `n <= 20`, sometimes `n <= 24`. No problem sets a bound that low by accident.
- The answer depends on **which** things were used, not just **how many**. If a counter were enough, we would use a counter.
- The brute force is `n!` or "try every way of splitting them up".

When all three are present, write down the set as a mask and ask what the array `dp[mask]` should mean. Choosing that meaning is the entire problem, exactly like in Tree DP - the code afterwards is always the same two nested loops.
