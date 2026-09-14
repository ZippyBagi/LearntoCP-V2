> This lesson assumes you have **never written a line of C++ before**.

### What are we even doing?

In competitive programming, every task follows the same pattern:

1. The program **reads** some input (usually numbers or text)
2. It **computes** something
3. It **prints** the answer

The programs are short, so we don't need most of what "real" software development involves. We just need a small set of tools, and this lesson introduces the very first ones.

### The smallest possible program

Every C++ program needs a starting point - a place where the computer begins executing your code. That starting point is a function called `main`:

~!
```c++
int main(){

}
```

This is a whole program that runs, it does nothing, but it runs. Let's break down the parts:

- `main` - the name of the function. The computer always looks for a function with exactly this name and starts there.
- `(){}` - the parentheses and curly braces. Everything **between the curly braces `{}`** is the code that will run.
- `int` - this says that `main` will give back (**return**) an integer when it finishes. By convention, that number tells the operating system how the program ended.

### return 0

Since we promised that `main` returns an integer, it is good practice to actually return one. Returning `0` means "everything went fine":

~!
```c++
int main(){

	return 0;
}
```

> `return 0` is really important in competitive programming: **some online judges will reject your solution without it, even if it is correct**. Make it a habit to always write it as the last line of `main`.

### Printing something

An empty program is boring, let's make it say hello. To print text, we use `cout`.

~!
```c++
cout << "Hello!";
```

The `<<` arrows point into `cout` - you can think of it as "send `"Hello!"` to the console output".

But there is a catch: `cout` doesn't exist on its own. It lives inside the **standard library** - a big collection of ready-made tools that comes with C++. To use it, we have to add two lines **above** our `main` function:

- `#include <bits/stdc++.h>` - this **includes** the standard library into our program. Think of it as bringing the toolbox to the desk.
- `using namespace std;` - the tools in the toolbox have the label `std` (standard) on them, and would normally be called like `std::cout`. This line lets us drop the label and just write `cout`.

Putting all of that together, we get your first real program:

Solution.cpp
```c++
#include <bits/stdc++.h> // bring in the standard library

using namespace std; // let us write cout instead of std::cout

int main(){

	cout << "Hello!"; // print Hello! to the console

	return 0; // tell the judge everything went fine
}
```
Output: `Hello!`

### This is your template

Those few lines are the skeleton of **every solution you will ever submit**:

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

	// your logic goes here

	return 0;
}
```

> Don't worry if `#include` and `namespace` still feel a bit like magic words. For now it is completely fine to treat them as "the two lines at the top" - the details behind them will make more sense as you write more programs.
