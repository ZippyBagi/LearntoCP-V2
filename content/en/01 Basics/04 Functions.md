>In this lesson we will learn what functions are and how to write our own.

### You already know a function

Since your very first program you have been writing one: `main`. A **function** is a named block of code - the name is how we run (**call**) it, and the block between `{}` is what runs. `main` is just the function the computer calls for us automatically.

The good news is that we can define our own functions, and call them whenever we want, as many times as we want.

### Why bother?

Two reasons:

- **No repeating code** - if the same 5 lines appear in 3 places, they should be one function called 3 times
- **Readability** - `max3(a, b, c)` says what it does; 6 lines of nested if statements need to be deciphered

### Anatomy of a function

A function is written just like `main`:

~!
```c++
int add(int a, int b){

	return a + b;
}
```

Piece by piece:

- `int` - the **return type**: what kind of value the function gives back when it finishes (same idea as data types)
- `add` - the **name**, we choose it just like a variable name
- `(int a, int b)` - the **parameters**: values the function receives when called. Here it receives two integers and names them `a` and `b`
- `return a + b;` - computes the result and **hands it back to whoever called the function**

Calling it looks like this: `add(2, 3)` - the value 2 becomes `a`, the value 3 becomes `b`, and the whole expression `add(2, 3)` becomes 5. Here is a full program using it:

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int add(int a, int b){ // our custom function

	return a + b;
}

int main(){

	cin.tie(0);
	ios_base::sync_with_stdio(false);

	int x, y;
	cin >> x >> y;

	cout << add(x, y); // we call the function and print what it returns

	return 0;
}
```
Input: `2 3`
Output: `5`

> Notice that the function is written **above** `main`. This is important: c++ reads the file from top to bottom, so a function must be defined before the place where it is called - otherwise the compiler doesn't know it exists yet.

### Functions that return nothing

Sometimes a function should just do something (usually print), and there is no value to give back. For that, the return type is `void`:

~!
```c++
void greet(string name){

	cout << "Hello, " << name << "!" << '\n'; // '\n' is a newline character, like pressing enter
}
```

We call it as a statement on its own - `greet("Billy");` - and since there is no value, there is no `return` needed.

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

void greet(string name){

	cout << "Hello, " << name << "!" << '\n';
}

int main(){

	cin.tie(0);
	ios_base::sync_with_stdio(false);

	greet("Alice");
	greet("Bob");
	greet("Charlie");

	return 0;
}
```
Output:
`Hello, Alice!`
`Hello, Bob!`
`Hello, Charlie!`
### Two things to remember

1. **Parameters are copies.** The function gets its own copy of every value passed in - changing `a` inside `add` does not touch the variable used in the call. (There is a way to change the original, but we'll get to it later.)

2. **return ends the function immediately.** The moment a `return` runs, the function is done - any code below it is skipped. This is often used to exit early:

~!
```c++
string sign(int x){

	if(x > 0) return "positive"; // if this runs, the function is over
	if(x < 0) return "negative";
	
	return "zero"; // we only get here if x is exactly 0
}
```
