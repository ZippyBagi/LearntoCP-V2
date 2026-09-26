
## Approach

Read the rule of succession with graph words in place of family ones: go to the oldest child first, and when a person has no children left to visit, back up to his parent and take the next one. That is **DFS**, word for word. So the line of succession is the order a depth first search visits the tree, and a person's place is how many people the search had already stood on when it reached him.

Hand the counter out on the way **in**:

~!
```c++
rank_of[v] = counter;
counter++;
```

Children are visited in the order they were read, which the statement says is oldest first, so nothing needs sorting. The edges only point from parent to child, so there is no way back up and no `visited` array.

The vertices arrive as names, so a `map<string, int>` numbers each one the first time it is seen; the number handed out is `children.size()`, always the next free index. That lookup is $O(\log n)$, which is where the logarithm in the complexity comes from.

The king is not named either. He is the only person **never listed as somebody's child**, so set a flag on every child while reading and the one left without it is the root.

**Careful:** the king need not appear first and the pairs need not be grouped by parent. The only promise is that one parent's children keep their order among themselves - which is all we need, since pushing them as the lines are read survives any interleaving.

## Example

The search visits the family in this order, which is the line of succession itself:

| place | name | place | name |
|---|---|---|---|
| $0$ | Elisabeth | $10$ | Edward |
| $1$ | Charles | $11$ | James |
| $2$ | William | $12$ | Louise |
| $3$ | George | $13$ | Anne |
| $4$ | Charlotte | $14$ | Peter |
| $5$ | Louis | $15$ | Savannah |
| $6$ | Harry | $16$ | Isla |
| $7$ | Andrew | $17$ | Zara |
| $8$ | Beatrice | $18$ | Mia |
| $9$ | Eugenie | | |

Follow the dive. From Elisabeth the search takes Charles ($1$), from Charles it takes William ($2$), and from William his three children in the order they were listed - $3$, $4$, $5$. Only now is William finished, so the search backs up to Charles for Harry at $6$, and then all the way to Elisabeth for Andrew at $7$.

Check Louise at $12$. She is Edward's second child and Edward is at $10$, so his line is $10$, $11$, $12$ - behind every descendant of Charles and Andrew, but ahead of Anne's whole branch. A person's place depends on the entire family that comes before, not on his own depth.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

void dfs(int v, vector<vector<int>>& children, vector<int>& rank_of, int& counter) {

    rank_of[v] = counter;
    counter++;

    for(int i=0;i<children[v].size();i++) { // oldest child first, then all of his line
        dfs(children[v][i], children, rank_of, counter);
    }
}

int main() {
    iostream::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;

    while(t--) {

        int n;
        cin >> n;

        map<string, int> id;          // a name gets a number the first time we see it
        vector<vector<int>> children; // children[v], oldest first - the order they were read in
        vector<bool> isChild;

        for(int i=0;i<n-1;i++) {

            string a, b;
            cin >> a >> b;

            if(id.count(a) == 0) { id[a] = children.size(); children.push_back(vector<int>()); isChild.push_back(false); }
            if(id.count(b) == 0) { id[b] = children.size(); children.push_back(vector<int>()); isChild.push_back(false); }

            children[id[a]].push_back(id[b]);
            isChild[id[b]] = true; // b has a parent, so b is not the king
        }

        int root = 0;
        for(int v=0;v<n;v++) if(!isChild[v]) root = v; // the one nobody fathered

        vector<int> rank_of(n, 0); // rank_of[v] is v's place in the line of succession
        int counter = 0;

        dfs(root, children, rank_of, counter);

        int q;
        cin >> q;

        for(int i=0;i<q;i++) {

            string name;
            cin >> name;

            cout << name << " " << rank_of[id[name]] << "\n";
        }
    }

    return 0;
}
```

## Complexity

Time $O((n + q) \log n)$
Memory $O(n)$
