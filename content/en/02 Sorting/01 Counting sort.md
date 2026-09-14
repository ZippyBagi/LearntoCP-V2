>In this lesson we will learn about a special type of sorting that works in O(n + m) time!

While it is true that this technique is very fast, it only works when we are sorting **relatively small non negative values** (Numbers <= 10^5 and >= 0) 

Let's see why.
### Theory

Imagine we have an array:

`a = 4, 5, 6, 3, 1, 7, 3`

The key idea is to treat each one of these numbers **as an index**

Lets make a helper array, `b`, and lets set all the values of `b` to `0`

`b[i]` will store how many times, each value `i` has appeard

Then for every value of `a`, we increase `b[a[i]]` by one.
 
 **i = 0 => a[i] = 4 => b[4] = 0 + 1 = 1**

**i = 1 => a[i] = 5 => b[5] = 0 + 1 = 1**

After doing this for all values `b` looks like:
	![[Couning Sort.jpg|A counting sort tally table: row i holds the indices 0 to 7, and row b holds the count of each value, 0 1 0 2 1 1 1 1]]

To print the sorted array we just go through `b` and print `i`, `b[i]` times!

>Note: duplicate values are also handled, because b[i] stores the number of times an element has appeared

### Implementation

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    vector<int> a = {4, 5, 6, 3, 1, 7,3};

    vector<int> b(100, 0); //we choose a size that we know is larger than the biggest element in a

    for(int i=0;i<a.size();i++){
        b[a[i]]++;
    }

    for(int i =0;i<b.size();i++){

        for(int j=0; j<b[i];j++){ //we print i, b[i] times
            cout<<i<<" ";
        }
    }

    return 0;
 }
```
The array: `4 5 6 3 1 7 3`
Output: `1 3 3 4 5 6 7`

Time complexity: **O(m + n), where m is the maximum value in a**

>One thing to note is that if m is too large, we will run into MLE (Memory Limit Exceeded), and our program won't run, that is why m has to be small for this technique to work