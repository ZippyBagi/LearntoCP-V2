>In this lesson we will learn about an improved version of Counting Sort

Last lesson we learned Counting Sort, which is very fast, but breaks down when the values are large (larger than 10^5).

Radix Sort fixes exactly that. The values can be as big as we want, because we never treat the whole number as an index - only **one digit at a time**.

Since a digit is always between `0` and `9`, we can use Counting Sort!
### Theory

The idea is to sort the array multiple times, once for each digit:

1. Sort all the numbers by their **ones digit**
2. Then sort them by their **tens digit**
3. Then by the **hundreds digit**, and so on...

We repeat this until we run out of digits (the number of digits of the largest element).

The only rule we must follow: when two numbers have the same digit, they must **keep the order they were in** (this is called a **stable** sort).

Example: `a = 170, 45, 75, 90, 802, 24, 2, 66`

| Pass | Sorting by | Array after the pass |
| ---- | ---- | ---- |
| 1 | ones | `170, 90, 802, 2, 24, 45, 75, 66` |
| 2 | tens | `802, 2, 24, 45, 66, 170, 75, 90` |
| 3 | hundreds | `2, 24, 45, 66, 75, 90, 170, 802` |

When comparing numbers with different amounts of digits, we can simply add leading zeros to the smaller number: (ex. `2` and `802`, we can write `002`)

Check the second pass: `802` and `2` both have `0` in the tens place, so they come first, and they stayed in the same order as after pass 1.

### Sorting by one digit

In order to sort the array digit by digit, we use **buckets**

We make 10 buckets, one for each digit `0-9`. Then:

- we go through the array, and drop each number into the bucket of its current digit

So when sorting by the ones digit, `45` goes into bucket `5`, and `170` goes into bucket `0`.

- then we go through the buckets in order, from `0` to `9`, and put the numbers back into the array

Numbers from a smaller bucket come first, so the array is now sorted by that digit. And since the buckets are filled from left to right, and emptied from left to right, numbers with the same digit **keep their order** - this keeps the order stable

	![[radix-buckets.png|One pass of radix sort by the ones digit: the array 170 45 75 90 802 24 2 66 is dropped into ten buckets by last digit and read back out in bucket order, with 802 and 2 both landing in bucket 2 and keeping their original relative order]]

To extract the digit, we use a helper variable `place`, which is `1` for ones, `10` for tens, `100` for hundreds...

`digit = (a[i] / place) % 10`

- dividing by `place` cuts off everything to the right of our digit
- `% 10` cuts off everything to the left of it

For example, for `802` when sorting by tens: `802 / 10 = 80`, then `80 % 10 = 0` - the tens digit is `0`.

We keep going until we run out of digits in the maximum element, aka while `mx / place > 0`
### Code

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    vector<int> a = {170, 45, 75, 90, 802, 24, 2, 66};

    int mx = a[0]; // mx will store the maximum element
    
    for(int i=0;i<a.size();i++){
	    mx = max(mx,a[i]);
    }

    for(long long place = 1; mx / place > 0; place *= 10){ //place is 1, 10, 100...

        vector<vector<int>> buckets(10); //one bucket for each digit 0-9

        for(int i=0;i<a.size();i++){

            int digit = (a[i] / place) % 10; //the digit at the current place
            buckets[digit].push_back(a[i]);
        }

        int idx = 0;

        for(int d=0;d<10;d++){ //put the elements back, bucket by bucket

            for(int i=0;i<buckets[d].size();i++){
                a[idx] = buckets[d][i];
                idx++;
            }
        }
    }

    for(int i=0;i<a.size();i++){
        cout<<a[i]<<" ";
    }

    return 0;
}
```
The array: `170 45 75 90 802 24 2 66`
Output: `2 24 45 66 75 90 170 802`

Time complexity: **O(d * n), where d is the number of digits of the largest element** 

>Note:
	While radix sort can be really fast, it's also very situational, it can only be used for numbers, and more importantly when numbers are large `d` can exceed `log n`.
