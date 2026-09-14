> In the previous lesson we built the template every solution starts from. Now we fill in the middle: how to **store values** and how to **read input and print output**.

As a reminder, this is where we left off:

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

	// our logic goes here

	return 0;
}
```

### Variables

Before a program can compute anything, it needs somewhere to keep its values. That's what a **variable** is - a named box that holds one value:

~!
```c++
int main(){

	int a = 13; // a box named "a" that holds the whole number 13

	return 0;
}
```

Reading it left to right: `int` says what kind of value the box holds (a whole number), `a` is the name we chose, and `= 13` puts the value 13 inside. We can also create the box first and fill it later:

~!
```c++
int main(){

	int a;  // create the box (it holds garbage for now)
	a = 13; // put 13 inside

	return 0;
}
```

### Data types

The `int` above is a **data type** - it tells C++ what kind of value the variable stores. These are the basic ones you should know:

- **int** - for standard integer numbers (32 bit, roughly up to ±2 billion)
- **long long** - for large integer numbers (64 bit) - you'll need this surprisingly often in competitive programming
- **char** - for a single character (for example `'a'`)
- **string** - for text (for example `"hello"`)
- **double** - for decimal numbers (you may also see **float**, but `double` is more precise and is what you should use)
- **bool** - for booleans (they can either be `true` or `false`)

There are of course many more with specific purposes, but we will get to them later. For now: whole numbers go in an `int`, big whole numbers in a `long long`, text in a `string`.

### Input/Output

>When solving a problem, most of the time there will be a **"Standard Input/Output"** or **"Standard I/O"** tag inside of the problem. This means the program takes information from the console and writes its answer back to the console.

You already know half of this - `cout` from the previous lesson prints to the console. Its twin for reading is `cin` (**c**onsole **in**put).

#### Reading with cin

For input we write `cin >> a`:
- `cin >>` means we want to read something from the console
- `a` is the variable the value gets stored into

Note how the arrows point in the direction the data flows: **out of** `cin`, **into** `a`.

~!
```c++
int main(){

	int a;    // first we create the variable
	cin >> a; // then we read a value from the console into it

	return 0;
}
```

We can also read multiple values at once: `cin >> a >> b;` - this reads the first number into `a` and the second into `b`.

#### Printing with cout

For output we write `cout << a` - this prints the **value** stored in `a`. And we can chain text and values together with more `<<` arrows:

~!
```c++
int main(){

	int a = 13;

	cout << "The value of a is: " << a << "!";

	return 0;
}
```
Output: `The value of a is: 13!`

#### Putting it together

Here is a full program that reads a number and echoes it back:

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

	int a;
	cin >> a;

	cout << "The value of a is: " << a << "!";

	return 0;
}
```
Input: `92`
Output: `The value of a is: 92!`
### Making cin/cout faster

One thing worth knowing about `cin` and `cout` is that by default they can be **slow**. For the problems you'll solve at the start this makes no difference at all, but on problems with huge inputs a correct solution can fail just because its input/output was too slow.

The fix is to add these two lines at the beginning of `main`:
	`cin.tie(0);`
	`ios_base::sync_with_stdio(false);`

So a "full speed" solution looks like this:

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

	cin.tie(0);
	ios_base::sync_with_stdio(false);

	int a;
	cin >> a;

	cout << "The value of a is: " << a << "!";

	return 0;
}
```

>These two lines can look confusing, and you don't need to understand how they work yet - but **make writing them a habit**. Start every solution that uses `cin` and `cout` with them, and slow input/output will simply never be the reason a solution fails. You will see them in most lectures on this site for exactly that reason.

Learn more about them here: https://stackoverflow.com/questions/31162367/significance-of-ios-basesync-with-stdiofalse-cin-tienull

### scanf() and printf()

> `cin`/`cout` with the two speed-up lines is all you need - this older style is here mainly so you **recognize it in other people's code**, where you will run into it constantly.

Before `cin` and `cout`, C++ inherited a pair of functions from the C language: `scanf()` for input and `printf()` for output.

For input we use `scanf("%d", &a)`:
- `scanf()` calls the input function
- `%d` means we want to read an **integer** (every data type has its own code)
- `&a` means the value should be stored **into a**

~!
```c++
int main(){

	int a;
	scanf("%d", &a);

	return 0;
}
```

For output it is very similar - `printf("%d", a)`, and we can put text around the `%d`:

~!
```c++
int main(){

	int a = 13;

	printf("The value of a is %d!", a);

	return 0;
}
```
Output: `The value of a is 13!`

(Note that when printing we pass **`a`** and **NOT `&a`**.)

Here are the codes for the common data types:
- **int** - `%d`
- **long long** - `%lld`
- **char** - `%c`
- **string** - `%s`
- **double** - `%lf`
