
## Approach

Counting inside a segment is the usual difference of two prefix counts: everything up to $r$, minus everything up to $l-1$. 

Reading the digits of the bound left to right, the only things that matter about the prefix already written are how many non-zero digits it spent and whether it is still glued to the bound - so $dp[pos][tight][cnt]$ counts the ways to fill the rest, and any branch that reaches a fourth non-zero digit contributes nothing. Both counts include $0$, which is classy for having no non-zero digits at all, but it sits in both totals and cancels in the subtraction.

**Careful:** the table is built around the digits of one particular bound, so it must be cleared between the two calls. Reusing it answers the first question twice and the difference comes out $0$.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

vector<vector<vector<long long>>> dp;

// how many ways to fill positions pos..end, given cnt non-zero digits used so far
// and whether we are still glued to the prefix of the bound
long long solve(string n, int pos, int tight, int cnt){

    if(cnt > 3){
        return 0;
    }

    if(pos == n.size()){
        return (cnt <= 3);
    }

    if(dp[pos][tight][cnt] != -1){
        return dp[pos][tight][cnt];
    }

    int limit = 9;
    if(tight){
        limit = n[pos] - '0';
    }

    long long ans = 0;

    for(int d=0;d<=limit;d++){
        ans += solve(n, pos+1, tight && d==limit, cnt + (d != 0));
    }

    dp[pos][tight][cnt] = ans;
    return ans;
}

int main(){

    cin.tie(0);
    iostream::sync_with_stdio(false);

    int t;
    cin>>t;

    while(t--){

        long long l, r;
        cin>>l>>r;

        dp = vector<vector<vector<long long>>>(30, vector<vector<long long>>(2, vector<long long>(30, -1)));
        long long left = solve(to_string(max(0LL, l-1)), 0, 1, 0);

        dp = vector<vector<vector<long long>>>(30, vector<vector<long long>>(2, vector<long long>(30, -1)));
        long long right = solve(to_string(r), 0, 1, 0);

        cout<<right - left<<'\n';
    }
    return 0;
}
```

## Complexity

Time $O(t \cdot D \cdot 10)$ per segment, where $D \le 19$ is the number of digits
Memory $O(D)$
