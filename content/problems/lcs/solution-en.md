
## Approach

We build a 2D table where $dp[i][j]$ stores the length of the longest common subsequence of the **first $i$ characters of $s_1$** and the **first $j$ characters of $s_2$**.

Note that the table is one element bigger on both axes: the row $dp[0][x]$ and the column $dp[x][0]$ represent an empty string, and are filled with 0s (an empty string and any other string have 0 common characters). These are our base cases.

Now we fill the rest of the table:

- If $s_1[i] == s_2[j]$, we found a matching character. It extends the best common subsequence of the two strings **without** these characters, so $dp[i][j] = dp[i-1][j-1] + 1$.
- Otherwise, at least one of the two characters can't be part of the common subsequence, so we take the better of the two options where we drop one of them: $dp[i][j] = max(dp[i-1][j], dp[i][j-1])$ (the field above, and the field to the left).

The answer is in the bottom right corner of the table: $dp[|s_1|][|s_2|]$, where $|s_1|$ means the length of $s_1$

## Example

For `abcde` and `ace`, the filled table looks like this (matching characters are bold):

|     |     |  a  |  c  |  e  |
| :-: | :-: | :-: | :-: | :-: |
|     |  0  |  0  |  0  |  0  |
|  a  |  0  | `1` |  1  |  1  |
|  b  |  0  |  1  |  1  |  1  |
|  c  |  0  |  1  | `2` |  2  |
|  d  |  0  |  1  |  2  |  2  |
|  e  |  0  |  1  |  2  | `3` |

Follow the bold values: each match adds $1$ to the field one step up-left of it. The $2$ at row `c`, column `c` is the $1$ from row `b`, column `a`, plus the new match. Every other field just copies the bigger of its upper and left neighbor. The answer is in the bottom right corner: $3$.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int lcs(string& s1, string& s2){

    int n = s1.size(), m = s2.size();

    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

    for(int i = 1; i <= n; i++){
        for(int j = 1; j <= m; j++){

            if(s1[i-1] == s2[j-1]){
                dp[i][j] = dp[i-1][j-1] + 1;
            }else{
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }

    return dp[n][m];
}

int main(){

    iostream::sync_with_stdio(false);
    cin.tie(0);

    string s1, s2;
    cin >> s1 >> s2;

    cout << lcs(s1, s2);
}
```

Note that inside the loops we index the strings with $i-1$ and $j-1$: index $i$ in the table means "the first $i$ characters", so the $i$-th character of the string itself is at position $i-1$.

## Complexity

Time $O(|s_1| * |s_2|)$, Memory $O(|s_1| * |s_2|)$
