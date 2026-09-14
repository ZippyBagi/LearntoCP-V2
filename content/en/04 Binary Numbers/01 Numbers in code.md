> In this lesson we will learn how numbers function inside of programming languages!


### Numbers in c++

In c++ if we look at an integer `int a = 178`, it is stored as a binary number, so : `1011 0010`, but there is another thing to consider!

It is actually stored as: `0000 0000 0000 0000 0000 0000 1011 0010`

That is because `int` is a **32-bit** data structure.
That means that every number stored will have exactly 32 bits, which are either `0` or `1`

Since the first bit determines the sign(+, or -), and we have to account for the number 0, the largest number we can store is **2^31 - 1**, or **2147483647**

### Integers larger than 32 bits?

What happens when we try to store a number that can't fit into 32 bits?

For example `2^31 = 2147483648`?

Let's see: 
~!
```c++
int main(){

	int a = 2147483647;

	int b = a + 1;

	cout<<a<<'\n';
	cout<<b;
}
```
Output:
`2147483647`
`-2147483648`

The minus is not a typo! Here is what happened:

We had `a = 0111 1111 1111 1111 1111 1111 1111 1111`

When we add one to it, we get `b = 1000 0000 0000 0000 0000 0000 0000 0000`
Since the first bit stores the sign, this is `-2147483648`

Our numbers just went in a circle! `a` was the **largest positive number** we can store, and `b` became the **smallest negative number** we can store.

>This phenomenon is called integer overflow! It should be avoided at all costs!
#### How to store numbers >2^31?

If we want to store larger numbers (which is common in competitive programming), we need to use a larger integer type : `long long`, which is a **64-bit** data structure, 

So the largest number we can store is 2^63-1

>Note:
>Since `long long` is twice the size of `int`, it takes up twice as much space, so only use it when you need it!

Long long is enough for 99% of cases, but if we need to store even bigger numbers, then we have to store them as strings, and implement operations with them manually (more on this later)