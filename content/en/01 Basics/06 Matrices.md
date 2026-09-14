>In this lecture we will talk about matrices - or vectors of vectors

### Theory

Matrices are 2D arrays, we can think of them as grids, where each field stores a value. 

A matrix is labeled AxB, depending on its size, where A and B are numbers

So a 3x3 matrix would look like: 
	![[matrix.png|A 3 by 3 square matrix in brackets holding the rows 6 2 7, 8 1 5 and 3 4 2]]
It is comprised of rows and columns.

If we look at the example the rows they are: `[6, 2, 7]`, `[8, 1, 5]`, `[3, 4, 2]`
We can also look at the columns and they are: `[6, 8, 3]`, `[2, 1, 4]`, `[7, 5, 2]`
### Implementation

A matrix with **n** rows and **m** columns is written like : `vector<vector<data_type>> name_of_the_matrix(n, vector<data_type>(m, default_value));`

Lets unpack this: 
- `vector<vector<data_type>>` - is how we declare the matrix
- `name_of_the_matrix` - is the name of the matrix
- `n` - is the number of rows our matrix will have
- `vector<data_type>(m, default_value)` - is what each row will look like - a vector with `m` elements (one for each column)

We can also access the element in row **i** and column **j** with: `a[i][j]`
Just like vectors, matrices are 0 indexed by default, this means that the value in the second row and third column is in `a[1][2]`

Example code which shows the i and j values of each field:

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    cin.tie(0);
    ios_base::sync_with_stdio(false);

    int n = 3;
    int m = 4;

    vector<vector<string>> a(n, vector<string>(m)); //We initialize the matrix

    for(int i=0;i<n;i++){ //this means for each row
        for(int j=0;j<m;j++){ //this means for each column in the row
        
            a[i][j] = "(" + to_string(i) + ", " + to_string(j) + ")"; //to_string turns our counter which is an integer into a string, the rest is just formatting
        
        }
    }

    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            cout<<a[i][j]<<" ";
        }
        cout<<'\n'; // new line character(like enter)
    }

    return 0;
}
```
Output:
`(0, 0) (0, 1) (0, 2) (0, 3)`
`(1, 0) (1, 1) (1, 2) (1, 3)`
`(2, 0) (2, 1) (2, 2) (2, 3)`
