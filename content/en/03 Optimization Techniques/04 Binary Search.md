>In this lesson we will learn about one of the fastest ways to find if an element is inside of an array - Binary Search

The best way to think about this technique is with a game:

- Imagine any number from 1 to 1000 (let's call it `k`), then I get to ask 10 questions, and after those questions I am guaranteed to know your number.

What are the questions? 

- They are: Is k larger than the value in the middle?
So the first question would be `is k larger than 500`

- If it is we know that `k` is between 500-1000, if its not then we know it is between 1-500

Let's assume that `k = 625`, so now our range becomes 500-1000

- The second question is: `is k larger than 750`

Now the range is from 500-750, and so on...

After the 10 questions, we are guaranteed to know `k`. But why?

### Why?

At the beginning, there are 1000 possible values that `k` could be
After each question we are halving that number.

If we put them next to each other the possible values are: 

`1000, 500, 250, 125, 63, 32, 16, 8, 4, 2, 1`

So after the 10 questions, we see that there is only one possible value that `k` could be.

### Theory

**Binary Search** works in the same way. 

When solving a problem we have an array `a`, target number `k` and `n` elements

We are going to make log(n) comparisons, and then check if we found `k` or not.

>Note:
>Binary Search only works when the array is sorted!

We start with two pointers: `left = 0` and `right = n-1`

Then:

- we find the middle: `middle = (left + right) / 2`

- we check if: `a[middle] == k`

If it is - we have found our solution. If it isn't:

- we check if: `k > a[middle]`

If it is, no value smaller than `a[middle]` can be `k`, so we can safely move: `left = middle + 1`

- then we check if: `k < a[middle]`

Using the same logic, no value larger than `a[middle]` can be `k`, so we move: `right = middle - 1`

We repeat this process until:
- we find `k`
- or until the pointers meet: `while(left <= right)`

It is important to note that we must also include the case when `left == right`.

	![[binary-search.png|Four steps of binary search for 12 in a sorted ten element array, each row highlighting the middle element in orange, greying out the discarded half, and ending with 12 found in green]]

### Implementation

**Problem:** We are given an array **a** of **n** elements and are asked **q** questions. For each question, input one element and check if it exists inside of **a**

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    int n;
    cin>>n;

    vector<int> a(n);

    for(int i=0; i< n;i++){
        cin>>a[i];
    }

    sort(a.begin(), a.end()); //we have to sort a!

    int q;
    cin>> q; // The number of questions we are going to ask

    while(q--){ //this loop will run exactly q times.

        int k;
        cin>>k;

        int left = 0;
        int right = n-1;

        bool found_k = false;

        while(left <= right){

            int middle = (left + right) / 2;

            if(a[middle] == k){

                cout<<k<<" is inside of the array!"<<'\n'; // We found our solution
                found_k = true;
                break;

            }else if(k > a[middle]){

                left = middle + 1; // No value smaller than a[middle] can be the solution

            }else if (k < a[middle]){

                right = middle - 1; // No value larger than a[middle] can be the solution
            }
        }
        
        if(found_k == false){ // we have to check whether we found k,or if the pointers met
            cout<<k<<" is not inside of the array!"<<'\n';
        }

    }

    return 0;
}
```
Input:
`6` - n
`10 3 4 6 8 27` - our array
`3` - q
`10` - first k
`45` - second k
`2` - third k
Output:
`10 is inside of the array!`
`45 is not inside of the array!`
`2 is not inside of the array!`

Time complexity: **O(n log n + q log n)** which is just **O( (n+q) log n)**

>Note:
>It is faster to do a brute force check when we are checking once O(n) vs having to sort the array for binary search. But when we have to check multiple times, brute force becomes O(n*q), and binary search stays O( (n+q) log n)