>This lesson will focus on learning what time complexity is, and how to think about it when solving problems

A common issue in competitive programming is having a completely correct solution that still fails - with the verdict **TLE (Time Limit Exceeded)**.

This happens because judges don't only check that the answer is right, they also give every problem a **time limit** (usually around 1 second). if your solution needs more than that, being correct won't save it.

A modern computer can do roughly **10^8 (100 million) basic operations per second**.

>Time complexity describes the relationship between input size and how the runtime of an algorithm grows.

### The O( ) notation

We write time complexity using the **O( )** notation (read "big O") - inside the parentheses we put, roughly, **how the number of operations grows** with the input size **n**. So `O(n)` means "about n operations", and `O(n^2)` means "about n·n operations".

Exact constants are ignored - doing 2n or n+10 operations is still just `O(n)`. This might seem sloppy, but it is the whole point: when n is 1 000 000, the difference between n and 2n is nothing compared to the difference between n and n².

One more symbol you'll meet is `log n` - unlike in maths, in programming `log` means logarithm with base `2`, or the number of times you can cut **n** in half before reaching 1.

### Counting operations

So how do we find the complexity of our code? Treat every simple line (an assignment, a comparison, an arithmetic operation, reading one value) as **one operation**, and count.

Code with no loops does a fixed handful of operations no matter what we feed it - that is `O(1)`:

~!
```c++
int main(){

	int a, b;
	cin >> a >> b;

	cout << a + b; // a couple of operations, whether the numbers are small or huge

	return 0;
}
```

**Loops are where the counting starts.** A loop multiplies everything inside it by the number of times it runs. One loop over n elements - about n operations, `O(n)`:

~!
```c++
for(int i = 0; i < n; i++){

	sum = sum + a[i]; // one operation, done n times
}
```

And when loops are **nested**, the multiplication happens again - the inner loop runs fully for every step of the outer one. Here is a full program that counts its own operations:

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

	cin.tie(0);
	ios_base::sync_with_stdio(false);

	int n;
	cin >> n;

	int sum = 0;
	for(int i = 0; i < n; i++){ // the outer loop runs n times
		for(int j = 0; j < n; j++){ // the inner loop runs n times for EACH i

			sum++; // so this line runs n * n times
		}
	}

	cout << sum;

	return 0;
}
```
Input: `5`
Output: `25`

The program literally prints n·n - the number of times the innermost line ran. This code is `O(n^2)`.

>When estimating complexity we only care about the parts that repeat, not the constants around them. Seen through "complexity glasses", the program above is just:

~!
```c++
int main(){
	for(int i = 0; i < n; i++){
		for(int j = 0; j < n; j++){
		}
	}
}
```

In these examples the complexity was easy to see, but often it won't be - that's fine, because an exact count is **never necessary**. A good, thought-out guess is always sufficient.

### The common classes

Most of the time our code lands in one of these categories, from fastest to slowest:

- `O(1)` - runs at the same speed no matter the input size
- `O(log n)` - barely grows at all (log of a million is ~20)
- `O(n)` - scales linearly with the input size
- `O(n log n)` - linear times "almost free" - barely worse than `O(n)`
- `O(n^2)` - quadratic scaling, only survives small inputs or generous time limits
- `O(n!), O(n^n), O(2^n)` - exponential (or worse) - only for tiny inputs

![[big-o.jpg|A Big-O complexity chart plotting operations against input size, with bands shaded from green for O(1) and O(log n) through yellow for O(n), orange for O(n log n), and red for O(n^2), O(2^n) and O(n!)]]

For most problems `O(n log n)` is the target.

### How fast is fast enough?

Before writing any code, look at two things in the problem statement:

1. The **time limit**
2. The **maximum input size** (the constraints, e.g. "n ≤ 100 000")

Then take the worst case n, plug it into your guessed complexity, and compare against the **10^8 operations per second** rule of thumb.

Let's say the time limit is 1 second and the constraints say n can be up to 100 000 (10^5):

- An `O(n^2)` idea needs 10^5 · 10^5 = **10^10 operations** - about 100 seconds. Hopeless, don't even write it.
- An `O(n log n)` idea needs about 10^5 · 17 ≈ **2 · 10^6 operations** - a few milliseconds. Go for it.

Doing this five-second calculation before coding will save you from writing solutions that were doomed from the start. As a cheat sheet, for a typical 1 second limit:

- n ≤ 20 - `O(2^n)` is fine
- n ≤ 500 - `O(n^3)` is fine
- n ≤ 5 000 - `O(n^2)` is fine
- n ≤ 1 000 000 - `O(n log n)` is fine
- n larger than that - you need `O(n)`, or better

>As you solve more and more problems, you'll be able to gauge what complexity works for what problem even without doing the math!
