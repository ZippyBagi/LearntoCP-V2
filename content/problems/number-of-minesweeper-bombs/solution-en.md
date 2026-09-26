
## Approach

The solution is simple and straight-forward, for every field of the matrix, check every field surrounding it, and count how many bombs are there

After all 8 directions have been checked, the number of bombs for that field is the value of the counter

The only tricky part, is making sure not to go out-of-bounds. For example have to check if `i-1` exists before checking it.  
## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    iostream::sync_with_stdio(false);
    cin.tie(0);

    int m,n;
    cin>>m>>n;

    vector<vector<int>> a(m, vector<int>(n));

    for(int i =0;i<m;i++){
        for(int j = 0; j< n;j++){
            cin>>a[i][j];
        }
    }

    vector<vector<int>> ans(m, vector<int>(n));

    for(int i =0;i<m;i++){
        for(int j = 0; j< n;j++){

            int number_of_bombs = 0;

            if(i - 1 >= 0) number_of_bombs += a[i-1][j]; //left
            if(i + 1 < m) number_of_bombs += a[i+1][j]; //right
            if(j - 1 >= 0) number_of_bombs += a[i][j-1]; //down
            if(j + 1 < n) number_of_bombs += a[i][j+1]; //up

            if(i-1 >= 0 && j-1 >= 0) number_of_bombs += a[i-1][j-1]; //left-down
            if(i-1 >= 0 && j+1 < n) number_of_bombs += a[i-1][j+1]; //left-up
            if(i+1 < m && j-1 >= 0) number_of_bombs += a[i+1][j-1]; //right-down;
            if(i+1 < m && j+1 < n) number_of_bombs += a[i+1][j+1]; //right-up

            ans[i][j] = number_of_bombs;
        }
    }

    for(int i =0;i<m;i++){
        for(int j = 0; j< n;j++){
            cout<<ans[i][j]<<" ";
        }
        cout<<'\n';
    }
}
```

## Complexity

Time $O(n*m)$, Memory $O(n*m)$
