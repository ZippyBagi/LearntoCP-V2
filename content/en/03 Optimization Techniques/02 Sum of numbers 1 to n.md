>In this lesson we will cover some basic math knowledge that will help us optimize our solutions

### Sum of numbers from 1 to n:

let's say we have an array of numbers:
 
`1, 2, 3, ..., n-2, n-1, n`

And we want to find their sum.

The intuitive approach is to add each number individually, so essentially:

`1 + 2 + 3 + ... + n-2 + n-1 + n`

But this is rather slow, it takes us **n** operations to do it this way, so **O(n)**

We can do better, let's look at numbers 1 to 100
	![[Sum of elements.jpg|The sum 1 + 2 + 3 + ... + 98 + 99 + 100 with nested arcs joining the numbers from the two ends, each pair labelled 101]]
Notice how all of them form pairs that sum to 101

In other words, there are `50` pairs of `101`, so our sum is: 

 `(100/2) * 101 = 5050`

Applying this idea generally gives us the formula:

**1 + 2 + 3 + ... + n-2 + n-1 + n =** `n * (n + 1) / 2`

Since this is a single operation, the time complexity is **O(1)**

Note: This also works when n is odd - the middle number simply pairs with itself.
### Sum of numbers from x to n

What if we, instead wanted to get the sum from 24 to 100 (inclusive)?

While there are math formulas that do this, a simpler and more intuitive solution exists:

We can get the **sum from 1 to 100**, and the **sum from 1 to 23 (without 24, because we want to include it)**, and **subtract them!**

 1 to 100 = **(100/2) * 101 = 5050**
 1 to 23 = **(23/2) * 24 = 276**
 24 to 100 = **5050 - 276 = 4774**

And once we write the formula it becomes: 

`Sum(x to n) = Sum(1 to n) - Sum(1 to x-1)`

>This idea is important to keep in mind as it appears in many other problems and techniques