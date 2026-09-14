>In this lesson we will learn about one of the most basic, yet efficient optimization techniques :  the two-pointer technique

Despite being called two pointers, this has nothing to do with the data type called "pointer" (more on them in another lesson).

This technique is essentially a unique way to traverse arrays that would usually require comparing every element with every other element. 

In order to demonstrate how it works, let's look at a problem:
### Problem
>Given a number **k** and a sorted array of integers, if there exist two elements whose sum equals k, print them; otherwise, print "-1".

### Brute force solution

The brute force solution is pretty simple, two nested for loops. 
Essentially: "For every element of the array, check if that element and another element add up to k"

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    cin.tie(0);
    ios_base::sync_with_stdio(false);

    int n,k;

    cin>>k;
    cin>>n;

    vector<int> a(n);

    for(int i=0;i<n;i++){
        cin>>a[i];
    }

    for(int i=0;i<n;i++){
        for(int j=i+1;j<n;j++){
            if(a[i] + a[j] == k){
                cout<<a[i]<<" "<<a[j];
                return 0;
            }
        }
    }

    cout<<-1;

    return 0;
}
```

The time complexity of this solution is **O(n^2)**, but we can do better  

### Two pointers 

Instead of comparing every element with every other element, we can traverse the array in a much smarter way.

1. Place one pointer at the beginning of the array:  `int left = 0;`
    
2. Place the second pointer at the end of the array:  `int right = n - 1;`
    
3. Then check whether:  `a[left] + a[right] == k`
    If this condition is true - we found the solution.
    
4. If the sum is not equal to `k`, we check whether:  `a[left] + a[right] > k`
    
    If this is true, there is no need to continue checking the element `a[right]`.
    
    Since the array is sorted, `a[left]` is currently the smallest number we are considering. If even with that smallest number the sum is already too large, then every element to the right of `left` will produce an even larger sum.
    
    That is why we can safely move the right pointer to the left:  `right = right - 1;`
    
5. The next case is:  `a[left] + a[right] < k`
    
    Now the problem is the opposite - the sum is too small.
    
    Since `a[right]` is the largest number we are currently using, no other element together with `a[left]` can produce a large enough sum.
    
    Therefore, we move the left pointer to the right:  `left = left + 1;`
    
6. We repeat this process until:
    
    - we find the solution
    - or the pointers meet:  `while(left < right)`

	![[two-pointers.png|Four steps of the two pointers technique searching a sorted array for a pair summing to 16: left starts at 2 and right at 13, and each step moves whichever pointer the comparison rules out until 5 plus 11 is found]]

When we translate this idea into code, we get:

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    cin.tie(0);
    ios_base::sync_with_stdio(false);

    int n,k;

    cin>>k;
    cin>>n;

    vector<int> a(n);

    for(int i=0;i<n;i++){
        cin>>a[i];
    }

    int left = 0;
    int right = n-1;

    while(left < right){

        if(a[left] + a[right] == k){
        
            cout<<a[left]<<" "<<a[right];
            return 0;
        
        }else if(a[left] + a[right] > k){
        
		    right = right - 1;

        }else if(a[left] + a[right] < k){
        
            left = left + 1;
        }

    }

    cout<<-1;

    return 0;
}
```
The time complexity of this solution is **O(n)**.

>Note: If the array weren't sorted, the bure force solution would remain **O(n^2)**, but the 2 pointer one would have to account for sorting which is **O(n log n)**