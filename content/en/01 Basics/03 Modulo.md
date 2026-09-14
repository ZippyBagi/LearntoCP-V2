>In this lesson we will learn about division, and how to find the remainder after dividing by an integer number.

When solving problems we often need to check if two numbers are divisible. The simplest way to check is by using **Modulo**

### What is modulo? 

Modulo is a mathematical operations that tells us the remainder after dividing two whole numbers, in math it is written as `a mod b`, but in c++ we use `a % b`
Let's look at some examples:

`5 % 2 = 1`
`100 % 10 = 0`
`9 % 7 = 2`

>Two numbers are divisible if their modulo equals 0!

If we look at multiple sequential numbers we begin to see a pattern:

`3 % 3 = 0`
`4 % 3 = 1`
`6 % 3 = 0`
`7 % 3 = 1`

As we can see the result repeats, we can also see that when dividing by **n** the remainders are:

**0, 1, 2, 3, ..., n-2, n-1**

Or in other words: **numbers from 0 to n-1**
### Implementation

Implementing modulo is really simple, just type `a % b`, and we get the result
~!
```c++
int main(){

	int a = 5;
	int b = 3;
	
	cout<< a % b;

	return 0;
}
```
Output: `2`

We can also check if two numbers are divisible by using: `if(a % b == 0)`

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

	cin.tie(0);
	ios_base::sync_with_stdio(false);
	
	int a,b;
	
	cin>>a>>b;
	
	if(a % b ==0){
		cout<<"The numbers are divisible";
	}else{
		cout<<"The numbers are NOT divisible";
	}
	
	return 0;
}
```
Input: `100 3`
Output: `The numbers are NOT divisible`

Input: `100 5`
Output: `The numbers are divisible`

### Rules of modulo

In many problems the answer is a huge number, so the statement asks us to print it **modulo** some number (usually `1000000007`). Instead of computing the giant number first and taking the remainder at the end (which would overflow), we take the remainder after every single operation.

This works because of the following rules:

**Addition**
`(a + b) % m = (a % m + b % m) % m`

**Subtraction**
`(a - b) % m = (a % m - b % m + m) % m`

**Multiplication**
`(a * b) % m = ((a % m) * (b % m)) % m`

**Exponentiation**
`(a^b) % m = ((a % m)^b) % m`