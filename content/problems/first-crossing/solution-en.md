
## Approach

#### Idea

The question is asked **after every single one**, and the grid only ever gains cells - nothing is ever taken away.

Re-running a search each time works but pays for the whole grid over and over: $m$ searches of $O(n^2)$ each, which at $n = 200$ is $1.6 \cdot 10^9$ steps. And it throws away everything it learned the moment it finishes.

Connectivity that only grows is exactly what union find is for. Treat each cell as a value, and when a one is written, unite it with whichever of its four neighbours already hold a one. Every write costs a handful of $O(\alpha)$ operations, and nothing is ever recomputed.

#### The two extra values

That leaves the actual question: is **some** top-row cell in the same set as **some** bottom-row cell? Checked directly that is $n^2$ pairs to compare after every write, which would undo everything we just saved.

The trick is to give the structure two values that are not cells at all - call them the **sky** and the **ground**. Every time a one lands in the top row we unite it with the sky, and every time one lands in the bottom row we unite it with the ground.

Now the whole question collapses to a single comparison:

~!
```cpp
same(SKY, GROUND)
```

If the sky and the ground share a root, some top cell reaches some bottom cell, because the only way those two values ever met was through a chain of neighbouring ones.

So the structure holds $n^2 + 2$ values, and the answer is the first step at which that one check turns true.

#### Edge cases

**A grid of one cell.** With $n = 1$ the single cell is in the top row *and* the bottom row, so it unites with both the sky and the ground and the answer is $1$. Writing the two `if`s separately - not as `if / else` - is what makes this fall out on its own.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int n; // values in the structure: one per cell, plus the sky and the ground
vector<int> parent;
vector<int> sz;
int components;

void createSets(){

    for(int i=0;i<n;i++){
        parent[i] = i; //everybody is their own root
        sz[i] = 1;
    }
}

int find(int x){

    if(parent[x] == x){ //x is a root, so x is the name of its set
        return x;
    }

    parent[x] = find(parent[x]); //path compression

    return parent[x];
}

void unite(int a, int b){

    a = find(a);
    b = find(b);

    if(a == b){ //already together, nothing to do
        return;
    }

    if(sz[a] < sz[b]){ //the smaller tree goes under the bigger one
        swap(a, b);
    }

    parent[b] = a;
    sz[a] += sz[b];

    components--;
}

bool same(int a, int b){
    return find(a) == find(b);
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        int side, m;
        cin>>side>>m;

        int SKY = side*side;        // one extra value joined to the whole top row
        int GROUND = side*side + 1; // and one joined to the whole bottom row

        n = side*side + 2;
        parent = vector<int>(n);
        sz = vector<int>(n);
        components = n;
        createSets();

        vector<char> one(side*side, 0); // which cells already hold a 1

        int dr[4] = {-1, 1, 0, 0};
        int dc[4] = {0, 0, -1, 1};

        int answer = -1;

        for(int step=1;step<=m;step++){

            int r, c;
            cin>>r>>c;

            int id = r*side + c;

            one[id] = 1;

            if(r == 0){
                unite(id, SKY);
            }
            if(r == side-1){
                unite(id, GROUND);
            }

            for(int d=0;d<4;d++){
                int nr = r + dr[d];
                int nc = c + dc[d];
                if(nr < 0 || nr >= side || nc < 0 || nc >= side){
                    continue;
                }
                if(one[nr*side + nc]){
                    unite(id, nr*side + nc);
                }
            }

            if(answer == -1 && same(SKY, GROUND)){
                answer = step;
            }
        }

        cout<<answer<<'\n';
    }
    return 0;
}
```

## Complexity

Time $O(m \cdot \alpha(n^2))$, which is $O(m)$ in practice
Memory $O(n^2)$
