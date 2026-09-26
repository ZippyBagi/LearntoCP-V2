
## Approach

Trying all $n!$ orders is out of the question, so we look for a greedy rule: some ordering of the numbers that is guaranteed to be the best.

The natural guesses fail fast. Sorting numerically puts $3$ before $32$, but $332 > 323$. Sorting as words does the same thing ("3" < "32" alphabetically). The example is built to break both.

The right question is local: **when should $x$ come before $y$?** If they were the only two numbers, the result would be either $xy$ or $yx$ (as digit strings) - so $x$ should come first exactly when

$$xy < yx$$

Sort with that comparison and every neighboring pair is in its best order. And if no swap of neighbors can improve the result, no rearrangement can - any reordering can be reached by neighbor swaps, none of which helps.

**Careful:** the result has up to a million digits - there is no number type that holds it. Work with **strings** the whole way: read the numbers as strings, compare `x + y < y + x` with string concatenation, print the sorted pieces one after another.

(One subtlety this rule handles for free: comparing $xy$ with $yx$ always compares strings of **equal length**, so string comparison and numeric comparison agree - which is exactly why plain alphabetical sorting of $x$ and $y$ themselves was not good enough.)

## Example

The first testcase - the comparator's verdicts while sorting:

| pair | as $xy$ / $yx$ | order |
|---|---|---|
| $3$ vs $32$ | $332$ vs $323$ | $32$ first |
| $11$ vs $12$ | $1112$ vs $1211$ | $11$ first |
| $3$ vs $987$ | $3987$ vs $9873$ | $3$ first |

The full sorted order is $11, 12, 32, 3, 987$, and reading it off gives `1112323987` - the answer. The second testcase is the equal-prefix trap: the rule compares `91919919191` ($91919$ first) with `91919191919` ($919191$ first), the second is smaller, so $919191$ takes the front spot.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

bool cmp(const string &x, const string &y){
    return x + y < y + x; // x goes before y exactly when the number xy is smaller than yx
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        int n;
        cin>>n;

        vector<string> a(n); // the numbers are kept as strings
        for(int i=0;i<n;i++){
            cin>>a[i];
        }

        sort(a.begin(), a.end(), cmp);

        for(int i=0;i<n;i++){
            cout<<a[i]; // the result is one long number, printed piece by piece
        }
        cout<<'\n';
    }
    return 0;
}
```

## Complexity

Time $O(n \log n \cdot d)$ where $d$ is the number of digits per element
Memory $O(n \cdot d)$
