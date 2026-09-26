
## Approach

The obvious plan - list every group of cities and throw away the ones that do not hang together - dies immediately. One city joined to $999$ others already has a $139$ digit number of districts of at most $100$ cities. We have to count them without ever writing one down, which is what the modulus in the output is telling us.

Root the tree at city $1$, the way the lesson does. Now every district has a **topmost city**: the one closest to the root. There is exactly one, because two cities of the district with nothing above them could not be joined inside the district. So if we count, for every city $v$, the districts whose topmost city is $v$, every district is counted once and nothing is counted twice.

A district with topmost city $v$ lies entirely inside the subtree of $v$ and contains $v$. That is our state:

$cnt[v][j]$ - the number of districts of **exactly $j$ cities** that lie inside the subtree of $v$ and contain $v$.

A leaf has one such district, itself: $cnt[v][1] = 1$.

### Adding one child at a time

Take the children of $v$ one by one. Suppose we have already handled some of them, and $cnt[v][a]$ counts the districts of $a$ cities built from $v$ and those children. A new child $c$ leaves two choices, and they cannot be mixed:

- **Take nothing from $c$.** The district stops at $v$ on that side. It still has its $a$ cities, so it stays a district of size $a$.
- **Take a piece of $c$'s subtree that contains $c$ itself.** It has to contain $c$: the only road from $v$ into that subtree runs to $c$, so a piece that left $c$ out would not touch $v$ and the district would fall apart. There are $cnt[c][b]$ such pieces of $b$ cities.

**The second choice is where $a + b$ comes from.** The district we had holds $a$ cities - city $v$ and cities from the children we have already folded in. The piece from $c$ holds $b$ cities, and every one of them lives in $c$'s subtree, so no city is in both halves. Glue them together and the result has exactly $a + b$ cities. Any of the $cnt[v][a]$ old districts can take any of the $cnt[c][b]$ pieces, so that pair of sizes produces $cnt[v][a] \cdot cnt[c][b]$ new districts of size $a + b$:

$$new[a] = new[a] + cnt[v][a]$$
$$new[a+b] = new[a+b] + cnt[v][a] \cdot cnt[c][b]$$

The first line runs once for every size $a$ we hold, the second once for every pair of sizes - which is exactly the double loop in the code, `nxt[a] += cnt[a]` and `nxt[a+b] += cnt[a] * sub[b]`.

To see it land, take city $1$ in the example below, at the moment city $2$ is folded in and city $3$ is not. We hold $1$ district of $2$ cities ($\{1,2\}$) and $2$ of $3$ cities ($\{1,2,4\}$ and $\{1,2,5\}$), and city $3$ offers one piece of $1$ city. Then $new[3]$ collects $2$ from the first line - the two three-city districts that simply ignore city $3$ - and $1 \cdot 1$ from the second, with $a = 2$ and $b = 1$: $\{1,2\}$ glued to $\{3\}$. That is the last row of the table below, $[1, 1, 2]$ going in and $[1, 2, 3]$ coming out.

Once all the children are folded in, add $cnt[v][1] + cnt[v][2] + \dots + cnt[v][K]$ to the answer and hand $cnt[v]$ back to the parent.

### Cutting the rows off at $K$

Count the multiplications. A merge at $v$ pairs every size on the left with every size on the right, and over the whole tree those pairs are exactly the pairs of cities - each pair is multiplied together once, at their topmost common city and nowhere else. Left alone that is $\frac{n(n-1)}{2}$ multiplications, or $O(n^2)$.

But a district may never hold more than $K$ cities, so every entry above $K$ is dead weight, and the fix is one $\min$: cut each `cnt` row off at $\min(\text{subtree size}, K)$. Now neither side of a merge is longer than $K$, and the same pair-counting argument gives $O(n \cdot K)$.

Both fit inside the limits here - $n$ only reaches $1000$ - so this is not the difference between passing and failing today. It is the difference between code that stays fast on a tree a hundred times larger and code that does not, and it costs one extra $\min$.

**Careful:** `cnt[a]` and `sub[b]` are both already reduced, so each is below $10^9 + 7$ - but their product reaches $10^{18}$, which an `int` cannot hold. Multiply in `long long` and reduce immediately afterwards.

## Example

The first testcase, with $K = 3$, rooted at city $1$:

```
    1
   / \
  2   3
 / \
4   5
```

Write a city's row as $[cnt[v][1], cnt[v][2], cnt[v][3]]$. Children are finished before their parents, so the leaves and the merges come in this order:

| at | folding in | so far | child's row | after | what the $a + b$ line built |
| ---- | ---- | ---- | ---- | ---- | ---- |
| $4$ | - | - | - | $[1, 0, 0]$ | nothing yet - a leaf starts as $\{4\}$ |
| $5$ | - | - | - | $[1, 0, 0]$ | the same, $\{5\}$ |
| $2$ | city $4$ | $[1, 0, 0]$ | $[1, 0, 0]$ | $[1, 1, 0]$ | $\{2,4\}$, from $a = 1$ and $b = 1$ |
| $2$ | city $5$ | $[1, 1, 0]$ | $[1, 0, 0]$ | $[1, 2, 1]$ | $\{2,5\}$ from $a = 1$, and $\{2,4,5\}$ from $a = 2$ |
| $3$ | - | - | - | $[1, 0, 0]$ | another leaf, $\{3\}$ |
| $1$ | city $2$ | $[1, 0, 0]$ | $[1, 2, 1]$ | $[1, 1, 2]$ | $\{1,2\}$ from $b = 1$, then $\{1,2,4\}$ and $\{1,2,5\}$ from $b = 2$ |
| $1$ | city $3$ | $[1, 1, 2]$ | $[1, 0, 0]$ | $[1, 2, 3]$ | $\{1,3\}$, and $\{1,2,3\}$ from $a = 2$ |

The last column lists only what gluing produced. Everything in the **so far** column survives on top of it, because that is exactly what the other line copies over - the districts that ignore the new child. City $2$ keeps $\{2,4\}$ through its second merge that way, and city $1$'s last row keeps both three-city districts it walked in with.

Look closely at the merge where city $1$ folds in city $2$. The child's row offers a three-city district as well, $\{2,4,5\}$, but taking it would mean $a = 1$ together with $b = 3$, and $4$ cities is past $K$ - so it never enters the row. That is the cap from the section above, doing its work on a tree of five cities.

A finished row goes straight into the answer: cities $3$, $4$ and $5$ give $1$ each, city $2$ gives $1 + 2 + 1 = 4$, and city $1$ gives $1 + 2 + 3 = 6$. Altogether $1 + 1 + 1 + 4 + 6 = 13$, which is the expected output.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

const int MOD = 1e9 + 7;

int n, k;
vector<vector<int>> adj;
long long answer;

void addEdge(int u, int v){
    adj[u].push_back(v);
    adj[v].push_back(u);
}

//returns cnt, where cnt[j] is the number of districts of exactly j cities that
//lie inside the subtree of v and contain v itself
vector<long long> dfs(int v, int p){

    vector<long long> cnt(2, 0);
    cnt[1] = 1; //the district that is only v

    for(int i=0;i<adj[v].size();i++){

        int to = adj[v][i];

        if(to == p){ //the only edge leading back is the one we came from
            continue;
        }

        vector<long long> sub = dfs(to, v);

        int lim = min((int)(cnt.size() + sub.size() - 2), k); //nothing above k is ever needed
        vector<long long> nxt(lim + 1, 0);

        for(int a=1;a<cnt.size();a++){

            nxt[a] = (nxt[a] + cnt[a]) % MOD; //take nothing from this child

            for(int b=1;b<sub.size() && a + b <= lim;b++){
                nxt[a+b] = (nxt[a+b] + cnt[a] * sub[b]) % MOD; //glue the two pieces together
            }
        }

        cnt = nxt;
    }

    for(int j=1;j<cnt.size();j++){
        answer = (answer + cnt[j]) % MOD; //every district is counted at its topmost city
    }

    return cnt;
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        cin>>n>>k;

        adj = vector<vector<int>>(n + 1); // a fresh tree for every testcase

        for(int i=0;i<n-1;i++){
            int u, v;
            cin>>u>>v;
            addEdge(u, v);
        }

        answer = 0;
        dfs(1, 0); //root the tree at city 1

        cout<<answer<<'\n';
    }
    return 0;
}
```

## Complexity

Time $O(n \cdot K)$
Memory $O(n \cdot K)$

The memory bound is the recursion: every level of the tree holds one row of at most $K + 1$ numbers, and a tree can be a path. At the limits that is $10^5$ numbers, comfortably inside the limit.
