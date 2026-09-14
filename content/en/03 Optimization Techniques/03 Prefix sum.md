>In this lesson we will learn how to efficiently get the sum of any consecutive range of elements in an array!

Last lesson (Sum of numbers 1 to n) we learned how to get the sum of numbers from 1 to n.

But what if instead we wanted the sum of elements in an array?
### Sum of elements from 0 to n

This time, we don't know what the elements are, so the only solution is to go over each one and add them.

~!
```c++
int main(){

	vector<int> a = {6,7,10,3,-3,5};

    int n = a.size(); //the number of elements in a.

    int sum = 0;

    for(int i =0;i<n;i++){

        sum += a[i];
    }

    cout<<sum;

	return 0;
}
```
The elements are: `6 7 10 3 -3 5`
Output: `28`
Time complexity: **O(n)**

### Sum of elements from a to b

What if instead, we wanted to get the sum from any index **a** to any index **b**. And what if we wanted to do it many times, with many different values of **a** and **b**

Doing this by iterating through the elements for every query gives us the complexity **O(n * q)** (where q is the number of queries), which is rather large (generally around O(n^2), when q=n)

But luckily, there is a better way!

Remember the formula: 

`Sum(x to n) = Sum(0 to n) - Sum(0 to x-1)`

All we need now is a good way to get `Sum(0 to x)`. 

Pause for a second and try to think of a way to do this in **O(1)** 
(Hint: Look at the Sum of elements from 1 to n)

~!
```c++
int main(){

	vector<int> a = {6,7,10,3,-3,5};

    int n = a.size();

    int sum = 0;

    vector<int> sums(n); //helper vector

    for(int i =0;i<n;i++){
        sum += a[i];
        sums[i] = sum; // sums[i] stores the sum from 0 to i
    }

    for(int i = 0;i <n;i++){
        cout<<sums[i]<<" ";
    }

	return 0;
}
```
Elements:  `6 7 10 3 -3 5`
Output: `6 13 23 26 23 28`

The solution is to **Precompute all the sums in another vector!**

Now `sums[i]` stores the `Sum(0 to i)`

And getting `Sum(a to b)` becomes:

`Sum(a to b) = sums[b] - sums[a-1]`

	![[prefix-sum.png|An array a above its prefix sum array sums, with arrows showing each prefix accumulating, and the range sum from index 2 to 4 computed as sums[4] minus sums[1], 23 minus 13, equals 10]]

Keep in mind the case when `a == 0`, then we just want to know the sum from 0 to n

The full code would look something like this: 

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    cin.tie(0);
    ios_base::sync_with_stdio(false);

	int n;

	cin>>n;

	vector<int> values(n);

	for(int i = 0;i<n;i++){
        cin>>values[i];
	}

	vector<int> sums(n); // helper vector
	int sum = 0;
	for(int i =0; i<n; i++){
        sum += values[i];
        sums[i] = sum; // sums[i] stores the sum from 0 to i
	}

	int q; // number of queries
	cin>>q;

	for(int i=0;i<q;i++){

        int a;
        int b;
        cin>>a>>b; //we input the query

        if(a == 0){ //since a == 0, we just want to get the sum from 0 to b
        
            cout<<sums[b]<<'\n';
            continue; // skip the remaining code for this query, and immediately increase i
        
        }
        
        cout<<sums[b] - sums[a-1]<<'\n';
	}
}
```
Input: 
`6` - n
`6 7 10 3 -3 5` - our array
`4` - q
`0 5` 
`3 4`
`2 4`
`3 5`
Output:
`28` - from 0 to 5
`0` - from 3 to 4
`10` - from 2 to 4
`5` - from 3 to 5

Time complexity: **O(n + q)**

>This technique is called Prefix Sum! 