>In this lesson we will learn how to count numbers with a given property, even when there are 10^18 of them - Digit DP!

Every dp so far had a state we could point at somewhere in the input. `dp[i]` was a position in an array, `dp[v]` was a node in a tree, `dp[mask]` was a set of jobs.

Here is a problem where the input is one single number:

>How many numbers between `1` and `10^18` do not contain the digit `7`?

A loop is out of the question. At a billion numbers per second, `10^18` of them take about thirty years.

But look at the input again. `10^18` written out has `19` digits. Everything the problem cares about lives inside those nineteen digits, not inside the `10^18` values.

So we stop counting upwards one value at a time, and start building a number one digit at a time.

### Counting without a bound

Lets start with something easier: How many strings of exactly `3` digits contain no `7`?

Each position has `9` allowed digits, and the positions do not affect each other, so the answer is `9 * 9 * 9 = 729`. No dp anywhere.

Now put a bound on it: how many numbers from `0` to `250` contain no `7`? Suddenly the positions do affect each other. If the first digit is `2`, the second one cannot be `9`. If the first digit is `1`, it can.

That single dependency is the entire difficulty of digit dp, and there is exactly one thing we need to remember to handle it.

### Being tight

Let's write our number left to right against `N = 250`, position by position.

The first digit can be `0`, `1` or `2`, because anything bigger already passes `250`.

- If we write `0` or `1`, the number is **already smaller** than `250`, no matter what comes after. The two remaining digits are completely free - `00` through `99`.
- If we write `2`, we are **still exactly matching** the beginning of `250`. The next digit is capped at `5`.

So at every position we are in one of two situations:

- **tight** - what we wrote so far is exactly the beginning of `N`, so this digit is capped at `N`'s digit
- **free** - what we wrote so far is already smaller, so this digit can be anything from `0` to `9`

	![[digit-dp-tight.png|The bound N equals 250 beside a tree of first digits, where writing 0 or 1 leaves tight at 0 and opens all ten options for the next position, while writing 2 keeps tight at 1 and caps the next position at 5, leaving only six]]

And here is the part that makes it cheap: **once we go free, we can never become tight again.** So the whole history of what we wrote collapses into one single yes/no flag.

### The state

`dp[pos][tight]` = how many valid ways there are to fill positions `pos` up to the end, given whether we are still tight.

`pos` goes up to `19`, and `tight` is `0` or `1`. That is `38` states, for a problem with `10^18` numbers in it.

>Note:
>Digit dp is almost always written top-down. The recursion walks the digits left to right on its own, and `tight` is exactly the kind of thing a recursive call passes down to its children. Bottom-up is, as always, possible but nobody writes it.

### Code

~!
```c++
string N;
long long memo[20][2];

long long countNumbers(int pos, int tight){

    if(pos == N.size()){ //we wrote down a whole number
        return 1;
    }

    if(memo[pos][tight] != -1){
        return memo[pos][tight];
    }

    int limit = 9;

    if(tight){ //still glued to N, so this digit is capped
        limit = N[pos]-'0';
    }

    long long res = 0;

    for(int d=0;d<=limit;d++){

        if(d == 7){ //the forbidden digit
            continue;
        }

        res += countNumbers(pos+1, tight && d==limit);
    }

    memo[pos][tight] = res;

    return res;
}
```
Output:
`208` - for `250` as input

Two lines carry the whole idea:

- `tight && d==limit` - we stay tight only if we were tight **and** we just wrote the largest digit we were allowed to. Write anything smaller and we are free from here on.

Time Complexity: **O(len * 10)**, where `len` is the number of digits
Space Complexity: **O(len)**

>Note:
>The counts get enormous fast. Here the answer can be about `1.5 * 10^17`, which an `int` cannot hold. Digit dp answers are `long long` by default, and the problem usually asks for the count modulo something.

### Ranges

Our function answers "how many in `[0, x]`", but problems ask for `[L, R]`.

That is the prefix sum trick again:

`answer(L, R) = solve(R) - solve(L-1)`

	![[digit-dp-ranges.png|Three bars over a number line from 0 to 250: solve of 250 covering the whole line and holding 208, solve of 99 covering the left part and holding 81, and the leftover stretch from 100 to 250 holding 127, with 208 minus 81 equals 127 underneath]]

### Adding a real state

The `no 7` rule was easy because a digit is allowed or not all on its own. Most problems are not like that:

>How many numbers between `1` and `N` have digits that add up to exactly `10`?

Now a digit is only good or bad depending on what came before it, so the running sum has to become part of the state:

`dp[pos][tight][sum]` = ways to finish, given the digits so far add up to `sum`

~!
```c++
string N;
int S = 10;
long long memo[20][2][200];

long long countNumbers(int pos, int tight, int sum){

    if(sum > S){ //we overshot, nothing below can save us
        return 0;
    }

    if(pos == N.size()){
        return sum == S;
    }

    if(memo[pos][tight][sum] != -1){
        return memo[pos][tight][sum];
    }

    int limit = 9;

    if(tight){
        limit = N[pos]-'0';
    }

    long long res = 0;

    for(int d=0;d<=limit;d++){
        res += countNumbers(pos+1, tight && d==limit, sum+d);
    }

    memo[pos][tight][sum] = res;

    return res;
}
```

The base case changed too. Reaching the end no longer means "we found one" - it means "we found one **if** the sum came out right", so we return `sum == S` instead of `1`.

The memo array is `200` wide because `19` digits of `9` add up to at most `171`. When in doubt, make that dimension a bit larger than you think you need. It costs nothing and a digit dp that reads past the end of its memo fails in ways that are very hard to look at.

Time Complexity: **O(len * S * 10)**
Space Complexity: **O(len * S)**

### Leading zeros

`to_string(250)` gives us three characters, so our dp builds strings of exactly three digits. The number `7` is therefore built as `007`, and the number `0` as `000`.

Sometimes this can break a problem, like for example:

>How many numbers between `1` and `100` have no two equal digits standing next to each other?

	![[digit-dp-leading-zeros.png|On the left the number 7 padded to 0 0 7, its two leading zeros struck out and bracketed, with a started row reading 0 0 1 underneath. On the right the number 1 padded to 0 0 1, where its two padding zeros trip the d equals prev check and the number is thrown away]]

The fix is a second flag, `started`, which is `0` while we are still writing padding and `1` from the first non-zero digit onwards. The rule only applies once we have actually started:

### Which states to use

The `tight` flag and the `started` flag are the same in every problem. The interesting dimension is always the third one, here are some examples of what it could be:

| What the problem asks about | Extra state |
| ---- | ---- |
| the digits add up to something | `sum` |
| the number is divisible by `k` | `value % k`, built as `(value*10 + d) % k` |
| neighbouring digits | `prev` |
| the digits never decrease | `prev` |
| which digits appear at all | a bitmask over the ten digits |
| how many times some digit appears | a counter |


The complexity is always the same shape: **number of states times 10**. Since `pos` is at most `19` and the two flags contribute `4`, whatever you put in the extra dimension is what decides whether the solution runs.

>Note:
>Some problems do not ask how many numbers have a property, but for the sum of all of them. The structure does not change - the function just returns a pair, the count and the sum, and merging two children means adding both fields. Getting the count right first is still the way to start.
	
The hard part of digit dp is never the code. Every solution in this lesson is the same twenty lines with a different third dimension. The hard part is deciding what the smallest piece of history is that the next digit actually needs - exactly like choosing states in Tree DP and Bitmask DP.
