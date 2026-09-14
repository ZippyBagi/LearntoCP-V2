>So far we counted by hand, one decision at a time. Certain counting questions come up so often that they have names and ready-made formulas. This lesson introduces four of them: permutations, variations, combinations and subsets.

Everything here follows from the multiplication principle, so nothing new is being assumed - we are just doing the same work once and remembering the result.

### Factorial

Before the objects themselves, we need one piece of notation.

The **factorial** of a positive integer `n`, written `n!` and read "n factorial", is the product of all integers from 1 to `n`:

$$n! = 1 * 2 * 3 * ... * (n - 1) * n$$

So `4!` is $1 * 2 * 3 * 4 = 24$, and `6!` is $1 * 2 * 3 * 4 * 5 * 6 = 720$.

There is one special case worth memorising: **0! = 1**. This looks strange, but it is the only value that keeps the formulas later in this lesson working, and it makes sense on its own - there is exactly one way to arrange nothing.

A useful property is that each factorial contains the previous one:

$$n! = n * (n - 1)!$$

That is what makes it easy to compute in a loop:

~!
```cpp
long long factorial(int n) {
    long long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
```

Factorials get large very quickly:

| n   | n!                    |
| --- | --------------------- |
| 1   | 1                     |
| 5   | 120                   |
| 10  | 3 628 800             |
| 15  | 1 307 674 368 000     |
| 20  | 2 432 902 008 176 640 000 |

`20!` is the largest factorial that still fits in a `long long`. `21!` overflows. In practice this means that whenever a problem asks you to count something and the answer involves factorials, it will almost always ask for the result modulo some number.

### Permutations

A **permutation** is an arrangement of a set of items in some order. Two permutations that contain the same items in a different order are different permutations.

Take the letters `A`, `B`, `C`. All the ways to arrange them are:

`ABC`, `ACB`, `BAC`, `BCA`, `CAB`, `CBA`

Six of them. Let's see why, by filling the three positions from left to right:

- the first position can hold any of the 3 letters
- once it is taken, the second position can hold any of the 2 remaining letters
- the third position has to hold the 1 letter that is left

By the multiplication principle that is $3 * 2 * 1 = 6$, which is exactly `3!`.

The same argument works for any `n`, so:

> A set of `n` distinct items can be arranged in `n!` different orders.

### Variations

Sometimes we don't arrange everything - we take only `k` items out of `n` and put those in order. This is called a **variation**, or a `k`-permutation.

Five runners are in a race, and we want to know how many different podiums are possible - who takes gold, silver and bronze. The remaining two runners don't appear on the podium at all.

Filling the three podium places one at a time:

- gold: 5 choices
- silver: 4 choices, since the gold medalist is no longer available
- bronze: 3 choices

$$5 * 4 * 3 = 60$$

Notice that the product $5 * 4 * 3$ is `5!` with the tail $2 * 1$ cut off, and that tail is `2!`, the factorial of the runners we didn't place. Dividing by it removes exactly those factors:

$$\frac{5!}{2!} = \frac{120}{2} = 60$$

As a formula:

$$V(n, k) = \frac{n!}{(n-k)!}$$
Permutations are the special case where nothing is left over, $k = n$. Then $\frac{n!}{0!} = n!$, which is where `0! = 1` earns its keep.

### Combinations

Now the same question, but order stops mattering.

Out of 5 people we want to pick a team of 3. A team is a group - Ana, Bob and Cara are the same team no matter what order we name them in.

That is the only difference, and it tells us exactly what to fix. A variation treats each team as many different results, one for every order its members could have been picked in. So we divide that away.

We start with the number of variations for n and k `V(n,k)`, and simply divide all the repeated orderings.

And we already know how many ways there are to arrange `k` elements - (that is just the number of  permutations of `k`!)

$$\frac{V(n,k)}{k!} = \frac{n!}{k! * (n-k)!}$$

	![[combinations-from-variations.png|The six orderings of A, B and C collapsing through a division by 3 factorial into the single team A B C, illustrating that V(5,3) = 60 divided by 3! gives C(5,3) = 10]]

### N choose K

Picking a group of `k` things out of `n` is such a common question that the expression above has its own symbol:

$$\binom{n}{k} = \frac{n!}{k! * (n-k)!}$$

It is read "n choose k", which is exactly what it describes - the number of ways to choose `k` things out of `n`. You will also see it written as $C(n, k)$.

Whenever a problem asks how many ways there are to pick a group, and shuffling the group doesn't produce anything new, the answer is `n choose k`. Recognising that is most of the work.

Two properties are worth knowing.

$$\binom{n}{k} = \binom{n}{n-k}$$

Every time you choose which items to take, you are also choosing which ones to leave. Those are the same act seen from opposite sides, so they have to have the same count. Picking 3 people for a team out of 5 is picking the 2 who stay out. The formula agrees - `k!` and `(n-k)!` sit in the same place, so swapping them changes nothing.

$$\binom{n}{0} = \binom{n}{n} = 1$$

There is one way to take nothing, and one way to take everything.

### Subsets

Finally, let's drop the size requirement entirely. A **subset** is any selection of elements from a set - any size, order irrelevant.

The set `{A, B, C}` has these subsets:

`{}`, `{A}`, `{B}`, `{C}`, `{A,B}`, `{A,C}`, `{B,C}`, `{A,B,C}`

Eight of them, including the empty set and the full set - both count as subsets.

To count them, go through the elements one by one and decide for each whether it goes in. That is `n` independent yes/no decisions, so by the multiplication principle:

$$2 * 2 * ... * 2 = 2^n$$

	![[subsets-decisions.png|A binary decision tree over three elements A, B and C, where each level answers in or out and the eight leaves are the eight subsets, each labelled with the binary number its decisions spell]]

> A set of `n` elements has $2^n$ subsets.

We can also think of subsets as ways to get a new set, by deleting some elements (possibly 0) from the original set.

### Summary

	![[combinatoric-objects.png|Four panels comparing permutations, variations, combinations and subsets of the items A B C D, each giving whether order matters, how many items are taken, the counting formula, and the resulting count]]

When you meet a counting problem, these two questions usually point you at the right row: **does order matter**, and **is the size fixed**.

>Don't memorize these formulas, instead truly understand them and learn how to derive them on the spot. Think of them as ways of thinking, not as formulas!