>In this lesson we will learn about the built in function for sorting an array in c++.

Sorting is one of the most basic things we need to do when solving a competitive programming problem. But writing an efficient sorting algorithm is not that easy, that is why we have the **built in functions**

Keep in mind that soring takes up **O(n log n)** time
### Calling the function 

Calling the function is easy, it is written as `sort(array.begin(), array.end(), compare_function)`.

- `array.begin()`, and `array.end()`, are pointers (more on them later), this just means that we want to sort the whole array.
- `compare_function` is optional, we can use a custom compare function if we want, or we can use `compare_function` to sort data types we write ourselves.

If `compare_function` is left empty, the array will be sorted in increasing order, from smallest element to the largest

Example:
~!
```c++
	vector<int> a = {10,-3,5,2,7};
	
	cout<<"Before: ";
	
	for(int i=0;i<a.size();i++){
		cout<<a[i]<<" ";
	}
	cout<<'\n'; //new line character
	
	sort(a.begin(), a.end()); //we sort the array
	
	cout<<"After: ";
	
	for(int i=0;i<a.size();i++){
		cout<<a[i]<<" ";
	}
	
	return 0;
```
Output:
`Before: 10 -3 5 2 7`
`After: -3 2 5 7 10`

### Using a custom sorting function

This is pretty simple as well, all we have to do is above `main()`  define a bool function with two arguments of the type we want to sort : `bool(type a, type b)`
- `type` is the data type.

When writing the compare function imagine `a` and `b` are elements next to each other:

The function needs to return:
- `true` if `a` is suppose to go to the right of `b`,
- `false` if `b` is suppose to go to the right of `a` (the way they currently are). 

Example, sorting is descending order (biggest to smallest): 

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

bool compare_function(int a, int b){

    if(a > b){ //ex: a=5, b=2, since a is bigger than b it is suppose to move to the right
        return true;
    }
    return false;
}

int main(){

    cin.tie(0);
    ios_base::sync_with_stdio(false);

    vector<int> a = {10,-3,5,2,7};

	cout<<"Before: ";

	for(int i=0;i<a.size();i++){
		cout<<a[i]<<" ";
	}
	cout<<'\n'; //new line character

	sort(a.begin(), a.end(), compare_function); //we sort the array

	cout<<"After: ";

	for(int i=0;i<a.size();i++){
		cout<<a[i]<<" ";
	}

	return 0;
}
```
Output:
`Before: 10 -3 5 2 7`
`After: 10 7 5 2 -3`

Complexity: **O(n log n)**