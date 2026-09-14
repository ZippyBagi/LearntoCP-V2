> In this lesson we will be learning about pointers, and why they are useful!

### What are pointers? 

When looking at our program, everything we write is stored somewhere in memory. Every variable during runtime is present somewhere.

Pointers tell us **where that somewhere is!**

They are declared with: `int* pointer = &variable`

The `*` tells us that we are creating **a pointer to an int**!

The `&` means the memory address of a variable! 

> `.begin()` and `.end()` are also pointers that point to a start or end of an array. 
### Pointers and references

C++ gives us two ways to work with a variable itself instead of a copy of it:

A **pointer** `int* p = &a` is a variable that stores an address. We can point it somewhere else later, and we write `*p` to reach the value.

A **reference** `int& r = a` is simply a second name for a variable that already exists. It is attached once and then used exactly like a normal `int`, with no `*`.

Both let us reach the original variable, but references are much easier to write, so those are the ones we will use the most.
### How to use them?

In order to get the value of a variable we are pointing at we need to print `*pointer`, which returns the value the pointer is pointing to.

Example.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int a = 3;

    int* pointer = &a;

    cout<<pointer<<'\n';

    cout<<*pointer;

    return 0;
}
```
Output:
`0x61ff08` <- The memory address
`3` <- The value of a

### Why are they useful?

We have many uses for pointers, but the ones I would like to highlight are:

#### Changing values in function

So far, when we had a function, it could only return one thing. But what if we need to change the variables we pass to the function?

That is where references come in, we write:  `void name_of_the_function(int& a, int& b){}`

Now if we change the value of `a` or `b` inside of the function, the values change in main as well. (We are no longer passing a copy, but the variable itself)

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

void zero_out(int& a){
	a = 0;
}

int main(){

	int a = 3;
	cout<<a<<'\n';
	
	zero_out(a);
	
	cout<<a<<'\n';
}
```
Output:
`3`
`0`

#### Passing vectors without copying them

There is a second reason to use `&`, and it matters even when we do not want to change anything.

When we write `void solve(vector<int> a)`, the whole vector gets **copied** into the function. For $n = 10^6$ that is a million elements copied on every single call, which is more than enough to get a TLE.

Writing `void solve(vector<int>& a)` passes the original vector instead, so nothing is copied and the call costs **O(1)**.

If the function should not change the vector, we add `const`:

`void solve(const vector<int>& a){}`

Now it is still free to pass, but the compiler will stop us if we accidentally modify it.

>Rule of thumb: pass `int`, `char` and other small types normally, and pass `vector`, `string` and other big types by reference.

### Understanding functions

Going back to a previous lesson, the binary search functions, we wrote this:

"The interesting thing is that it doesn't return an index, it returns a **pointer** (the same kind of thing as `a.begin()`). To turn it into an index, we subtract the beginning of the array:

`int i = lower_bound(a.begin(), a.end(), k) - a.begin();`

Think of it like street numbers, the pointer is a house's address. `a.begin()` is where the street starts, so their difference is the house number."

Now we know what is going on.

And we also know that we can access the value by writing : `int value = *lower_bound(a.begin(), a.end(), k)`

> Pointers and References are useful tools that appear everywhere in c++. Understanding them is an important step in getting better at competitive programming.