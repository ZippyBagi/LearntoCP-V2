>In this lesson we will learn about a whole family of algorithms built on one simple idea: always take what looks best right now!

An algorithm is **greedy** if at every step it makes the choice that looks best **at that moment**, without ever going back to change its mind.

When a greedy works, it is usually the simplest and fastest solution possible. The problem is that it doesn't always work, so we need to be careful when we use it.
### A greedy that works

>We need to pay **k** dollars using coins of 100, 50, 20, 10, 5, 2 and 1 dollars. What is the smallest number of coins we can use?

The greedy instinct: always take the **biggest coin that still fits**.

For `k = 231`: take `100` (131 left), take `100` (31 left), take `20` (11 left), take `10` (1 left), take `1` (0 left).

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    vector<int> coins = {100, 50, 20, 10, 5, 2, 1};

    int k = 231;
    int count = 0;

    for(int i=0;i<coins.size();i++){

        while(k >= coins[i]){ //take the biggest coin as long as it fits
            k -= coins[i];
            count++;
        }
    }

    cout<<count;

    return 0;
}
```
Output: `5`

For these coin values, the greedy always gives the minimum.
### A greedy that fails

Change the coins to `{4, 3, 1}` and let `k = 6`.

- Greedy: takes `4` (2 left), then `1`, then `1` => **3 coins**
- Optimal: `3 + 3` => **2 coins**

	![[greedy-fails.png|A counterexample for the greedy coin algorithm with coins 4, 3 and 1 and target 6: greedy takes 4 then 1 then 1 for three coins, while the best answer is 3 plus 3 for two coins]]

Whether this algorithm works or not depends entirely on the values of the coins. There is some interesting math as to why this happens, but that is beyond the scope of this lecture.

>The thing to remember is to always thoroughly check if the greedy strategy works before implementing it.
