
## Approach

Nobody handed us an edge list, but "land squares you can walk between" is a graph: **every land square is a vertex, and two are joined when they sit next to each other up, down, left or right**. An island is a **connected component**, so this is the component count from the lesson, with a size to measure on the side.

There is no `adj` to build here, because the neighbours of a square are not stored anywhere - they are simply the four squares around it. For the square in row $row$ and column $col$ they are

$$(row-1, col), \quad (row+1, col), \quad (row, col-1), \quad (row, col+1)$$

so instead of looping over a neighbour list, the search just calls itself four times, once per direction. Diagonal neighbours are not on that list, which is the whole trap in the example.

### Stopping the search

Two things end a walk: water, and the edge of the photo. Putting both checks at the **top** of `dfs` is what keeps the four calls short - a call may then be made on absolutely any square, and it does nothing when there is nothing to do.

~!
```c++
if(row < 0 || row >= n || col < 0 || col >= m) return 0; // outside the photo
if(grid[row][col] != '#' || visited[row][col]) return 0; // water, or already counted
```

Checking the bounds **first** matters: `grid[row][col]` on a row of $-1$ is already a mistake, so the two lines cannot be swapped.

### Measuring the island

`dfs` returns how many squares it counted. On land that is one for the square we are standing on, plus whatever the four calls report back:

~!
```c++
int size = 1;                             // this square
size += dfs(row - 1, col, grid, visited); // up
```

and on water or on land already counted it is the $0$ from the checks above. That $0$ makes the sweep over the photo easy - call `dfs` everywhere, and any non-zero answer is an island nobody had reached yet:

~!
```c++
int size = dfs(row, col, grid, visited);

if(size > 0) {
    islands++;
    largest = max(largest, size);
}
```

**Careful:** set `visited[row][col] = true` **before** the four calls, not after. The square above us has us as its own neighbour below, so a search that marks late calls straight back into where it came from and never stops.
## Code

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

int dfs(int row, int col, vector<string>& grid, vector<vector<bool>>& visited) {

    int n = grid.size(), m = grid[0].size();

    if(row < 0 || row >= n || col < 0 || col >= m) return 0; // outside the photo
    if(grid[row][col] != '#' || visited[row][col]) return 0; // water, or already counted

    visited[row][col] = true; // before the calls, so they cannot come back here

    int size = 1; // this square

    size += dfs(row - 1, col, grid, visited); // up
    size += dfs(row + 1, col, grid, visited); // down
    size += dfs(row, col - 1, grid, visited); // left
    size += dfs(row, col + 1, grid, visited); // right

    return size;
}

int main() {
    iostream::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;

    while(t--) {

        int n, m;
        cin >> n >> m;

        vector<string> grid(n);
        for(int i=0;i<n;i++) cin >> grid[i];

        vector<vector<bool>> visited(n, vector<bool>(m, false));

        int islands = 0, largest = 0;

        for(int row=0;row<n;row++) {
            for(int col=0;col<m;col++) {

                int size = dfs(row, col, grid, visited); // 0 if water, or land we already counted

                if(size > 0) { // nobody had reached this island before
                    islands++;
                    largest = max(largest, size);
                }
            }
        }

        cout << islands << " " << largest << "\n";
    }

    return 0;
}
```

BFS finds the same components; the size then has to be counted as squares leave the queue instead of being handed back by the calls.

## Complexity

Time $O(n \cdot m)$
Memory $O(n \cdot m)$
