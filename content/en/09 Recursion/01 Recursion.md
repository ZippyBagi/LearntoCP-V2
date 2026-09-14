>In this lesson we will learn a way to solve problems that relies on repeating the same operation multiple times

Imagine someone asked us to build a wall 100 bricks long.

Instead of building it all myself, I'll say: "I will place brick one, and someone else will do the remaining 99".

Now imagine everyone else did the same thing: "I will place brick 2, and someone else will do the remaining 98... 97... 96..."

This repeats until the final person places brick 100.

This idea is what recursion is all about, repeating the same instructions and passing the job forward!

In code we define recursion as:

>A function that calls itself multiple times.

For example

~!
```c++
void recursion(){
	cout<<"recursion ";
	recursion();
}
```
Output:
`recursion recursion recursion recursion recursion recursion recursion recursion recursion...`

As we can see, we created an infinite loop (or at least infinite until it crashes).

This is why a recursive function always needs a **base case (termination case)!**

In our example we can do: 

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

void recursion(int n){
	
	if(n == 0){ //this is our base case
		return;
	}
	
	cout<<"recursion ";
	recursion(n - 1);
}

int main(){
	recursion(3);
}
```
Output: 
`recursion recursion recursion`

### Passing variables

Recursion is just a function, so we can pass variables same as with any other function.

>One thing to keep in mind is that when we pass vectors, or any other data structure, always pass them with a reference `vector<int>& a` 

### Returning values

In practice using recursion to repeat a print statement is impractical. A much more common use-case is accumulating values. 

Lets say we want to compute `6!` (aka product of numbers from 1 to 6).

To compute `6!` we need `6 * 5!`, and to get it we need `5 * 4!` - This is where recursion comes in.

Lets next define a base case, `1!` is always just `1` so there is our base case.

Factorial.cpp
```c++
long long factorial(int n){

    if(n == 1){
        return 1;
    }

    return n * factorial(n-1);
}
```

Notice this is different from our first example - there, we printed **before** recursing, so the output happened **top-down**. Here, we multiply after the recursive call returns, so the actual work happens **bottom-up**, once we hit the base case and start unwinding.

	![[recursion-unwinding.png|Factorial of 6 as two columns: the calls descending from 6! down to 1! on the left, and the returned values climbing back from 1 up to 720 on the right, each multiplied on the way up]]

### The call stack

One more thing we need to understand is the order of function calls when we are working with recursion!

Treat each call to a function as an insertion to a stack (**LIFO**, last in first out).

	![[recursion-call-stack.png|The call stack for f(3) growing as calls are pushed down to the base case f(0), then shrinking again as each call returns]]

>Just like a stack can't store infinite elements, our program can't handle infinite function calls!

This is what is known as `stack overflow` - And it breaks our program when we have too many function calls (It actually breaks when we run out of stack memory in our program, and that memory gets filled up every time we call a function)

>At the end of the day, recursion is totally optional, and every recursive algorithm can be solved iteratively. It is just a matter of what is simpler to implement! A tradeoff we make is a little bit of speed and memory efficiency for much cleaner code and simpler solution!