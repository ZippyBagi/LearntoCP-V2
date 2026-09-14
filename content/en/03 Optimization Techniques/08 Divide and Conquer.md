>In this lesson we will learn about a technique behind efficient Sorting - Divide and Conquer

The core of this technique is to split a large job, that takes a lot of time(lets say $n$), into $log(n)$ jobs  that take a lot less time.

We do that by splitting an array into half, repeatedly, until we have just one element left in each section. 

The question is now, can we merge these sections efficiently?

Lets look at an example to get a feel for it:

### Merge Sort

This is the most efficient sorting algorithm, and it works using divide and conquer. 

Lets start with an array `a = {4, 2, 1, 3, 4, 10}`

We first split it into sections: `{4}, {2}, {1}, {3}, {4}, {10}`

Now how do we merge these sections? 

Remember the problem [Merge Two Sorted Arrays](/Problems/merge-two-sorted-arrays), this is exactly that.  Compare each two sections, and do a $O(n + m)$ merge with two pointers.

Our sections become: `{2, 4}, {1, 3}, {4, 10}`

Then: `{1, 2, 3, 4}, {4, 10}`

And finally: `{1, 2, 3, 4, 4, 10}`

	![[merge-sort-tree.png|The array 4 2 1 3 4 10 split in half repeatedly down to single elements, then merged back up level by level until it is sorted as 1 2 3 4 4 10]]

### Implementation

The simplest way to implement any divide and conquer solution is with recursion (although as with any recursive algorithm, it can be implemented iteratively):

Solution.cpp
```c++
#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& arr, int left, int mid, int right){ // Helper function for merging two parts of the array
                         
    int n1 = mid - left + 1;
    int n2 = right - mid;

    vector<int> L(n1), R(n2); //Create temporatry arrays

	//Copy the data
    for (int i = 0; i < n1; i++){
        L[i] = arr[left + i];
    }
    for (int j = 0; j < n2; j++){
        R[j] = arr[mid + 1 + j];
	}
	
    int i = 0, j = 0;
    int k = left;

	//Do a standard merge 
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements of L, if there are any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    // Copy the remaining elements of R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

void mergeSort(vector<int>& arr, int left, int right){ // The main recursive func
    
    if (left >= right)
        return;

    int mid = left + (right - left) / 2; //We split the array into halves
    
    mergeSort(arr, left, mid); // The left half
    mergeSort(arr, mid + 1, right); // The right half
    
    merge(arr, left, mid, right); //We merge the halfs
}

int main(){
    
    vector<int> arr = {4, 2, 1, 3, 4, 10};
    int n = arr.size();

    mergeSort(arr, 0, n - 1);
    
    for (int i = 0; i < arr.size(); i++){
	    cout << arr[i] << " ";
    }
    
    return 0;
}
```
Output:
`1 2 3 4 4 10`

We half the array O(log n) times, and merging the halves costs us O(n)

	![[divide-conquer-cost.png|A bar of length n split into 2, then 4, then 8 pieces on successive levels, where every level still adds up to n, over log n levels in total]]

Time Complexity: $O(n * log(n))$