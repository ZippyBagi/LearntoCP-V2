>So far our programs run from top to bottom, one line after another. This lesson introduces the tools that let a program **make decisions** (if statements) and **repeat things** (loops).

### Conditions:

1. If statements
These are the building blocks of our code. An if statement runs the code between its curly braces **only when its condition is true**. It is written as: `if(condition){}`, for example:
	~!
	```c++
	int main(){ 
		int a = 3;
		
		if(a > 3){
			cout<<"a is larger than 3";
		}
		return 0;
	}
	```
	Here the condition is `a > 3` ("is a larger than 3?"). Since `a` is exactly 3, the condition is false and the program prints nothing.

2. Else:
This block executes if our condition wasn't fulfilled: `if(condition){}else{}` 
	~!
	```c++
	int main(){ 
		int a;
		cin>>a;
		
		if(a > 3){
			cout<<"a is larger than 3";
		}else{
			cout<<"a is not larger than 3";
		}
		return 0;
	}
	```
3. We can combine them and create else if blocks: `if(condition){} else if(condition2){}`
	The conditions are checked from top to bottom, and only the **first** one that is true runs:
	~!
	```c++
	int main(){ 
		int a;
		cin>>a;
		
		if(a > 10){
			cout<<"a is larger than 10";
		}else if(a>5){
			cout<<"a is not larger than 10, but it is larger than 5";
		}else if(a > 2){
			cout<<"a is not larger than 5, but it is larger than 2";
		}else{
			cout<<"a is not larger than 2";
		}
		return 0;
	}
	```

### Comparison:

When writing conditions for `if` statements we need to use some comparator between two values (like the `>` in `if(a>2)`).
These are all the operators that exist: 
- `if (a > b)` - is **a** greater than **b**
- `if (a < b)` - is **a** less than **b**
- `if (a >= b)` - is **a** greater than or equal to **b**
- `if (a <= b)` - is **a** less than or equal to **b**
- `if (a == b)` - is **a** equal to **b**
- `if (a != b)` - is **a** not equal to **b**

> Watch out for the double equals: `a == b` **compares** two values, while a single `a = b` **assigns** the value of b into a. Mixing these up is one of the most common beginner bugs.

The not operator `!` can also be placed in front of other statements:
~!
```c++
int main(){ 
	int a;
	cin>>a;
	
	if(!(a > 3)){
		cout<<"a is not greater than 3";
	}
	return 0;
}
```

We can also just put variables, if they are of the boolean type (technically we can use this for any data type but it is considered bad practice): 
~!
```c++
int main(){ 
	bool a = true;
	
	if(a){
		cout<<"a is true";
	}
	return 0;
}
```

### Loops:

>Loops repeat the code inside them until a condition is met

We have 2 main loops in c++ `while()` and `for()` they are interchangeable. 
1. While loops:
They are written like `while(condition)`, while the condition is true, the loop will repeat itself

Example:
~!
```c++
int main(){ 
	int i = 0; //we initialize our own counter
	
	while(i < 10){ // while i is less than 10 the loop will repeat itself
		
		cout<<i<<" ";
		i++; //We have to increase the counter to avoid endless loops
	}
	return 0;
}
```
`Output: 0 1 2 3 4 5 6 7 8 9`

> The `i++` you see here is just a shorthand for `i = i + 1` - "increase i by one".

2. For loops:
They are written like `for(int i=0;i<n;i++)`
We have a few things to unpack here, so:
- `for()` - calls the loop
- `int i=0;` - declares a new integer i, and sets it value to 0
- `i < n;` - this is the most important part, this tells our loop for how long to run for, we can treat it as **while `i` is less than `n`**
- `i++` - This is what happens after every iteration of the loop, it adds 1 to the value of `i`

Example:
~!
```c++
int main(){ 
	for(int i=0; i<10;i++){
		cout<<i<<" ";
	}
}
```
`Output: 0 1 2 3 4 5 6 7 8 9`

Notice that the for loop does the exact same thing as the while loop above, just with the counter, the condition and the increase all packed into one line. That is why you will see for loops far more often in competitive programming.
