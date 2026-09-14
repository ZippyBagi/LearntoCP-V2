>In the previous lesson we counted choices that excluded each other - the person picked one part of town, so we added. Now we look at the opposite situation: choices that both happen, one after another.

This lesson will be focusing on the multiplication principle.

It states:

> If one task can be done in `m` ways, and for every one of those ways a second task can be done in `n` ways, then there are `m * n` ways to do both tasks.

### Example:

A restaurant offers a lunch deal: you pick one main dish and one dessert. There are 4 main dishes and 3 desserts. How many different lunches can you order?

Let's put every possible lunch in a table. Each row is a main dish, each column is a dessert:

|              | Cake       | Ice cream       | Fruit       |
| ------------ | ---------- | --------------- | ----------- |
| **Pasta**    | Pasta+Cake | Pasta+Ice cream | Pasta+Fruit |
| **Steak**    | Steak+Cake | Steak+Ice cream | Steak+Fruit |
| **Salad**    | Salad+Cake | Salad+Ice cream | Salad+Fruit |
| **Soup**     | Soup+Cake  | Soup+Ice cream  | Soup+Fruit  |

Every lunch you could order appears in this table exactly once. The table has 4 rows and 3 columns, so it has $4 * 3 = 12$ cells, which means there are 12 different lunches.

We can also get there using the previous lesson. Look at the table row by row. If you order pasta, there are 3 lunches you could end up with. Same for steak, for salad, and for soup. These four groups don't overlap, so by the addition principle the total is

$$3 + 3 + 3 + 3 = 12$$

That is exactly what $4 * 3$ means. The multiplication principle is just the addition principle applied to `m` equally sized groups.

### When it applies

Look again at the wording: for **every** one of the `m` ways, the second task has `n` ways. In the table, that means every row has to be equally long. If some row were shorter, the table would have holes in it and counting cells as `rows * columns` would overcount.

Say the restaurant refuses to serve cake with steak. Then the steak row has only 2 lunches instead of 3, the total is $3 + 2 + 3 + 3 = 11$, and $4 * 3$ is simply the wrong answer.

Note that the rows don't have to contain the same options, only the same **number** of options. If steak came with a different dessert menu that still had 3 items on it, $4 * 3 = 12$ would still be correct.

### More than two choices

Now the restaurant adds a drink to the deal - 2 options. How many lunches are there?

We already know there are 12 main-and-dessert pairs, and each of them can be combined with either drink. So we apply the same principle again, this time to 12 and 2:

$$12 * 2 = (4 * 3) * 2 = 24$$

Nothing stops us from repeating this. If a choice is made of `k` steps, and step `i` can be done in `n_i` ways regardless of the earlier steps, the number of outcomes is

$$n_1 * n_2 * ... * n_k$$

### In competitive programming

Most counting problems are not about lunches, but the shape of the reasoning is the same. The useful move is to look for a sequence of slots you have to fill in.

**How many strings of length 4 can you build from the letters `a`, `b`, `c`?**

A string of length 4 is 4 slots to fill. The first slot has 3 options. Whatever you put there, the second slot still has all 3 options, and the same goes for the third and the fourth. Four steps, 3 ways each:

$$3 * 3 * 3 * 3 = 3^4 = 81$$

**How many passwords of length 6 are there, if the first character must be a letter and the rest may be a letter or a digit?**

The slots don't all have to look the same. The first one has 26 options, and each of the remaining five has $26 + 10 = 36$ options. Six steps again, just with different counts:

$$26 * 36 * 36 * 36 * 36 * 36 = 26 * 36^5$$

Once you have worked through examples like these, the general rule is easy to state:

> When we build an outcome by making several decisions in a row, and no decision changes how many options the later ones have, we count the options for each decision separately and multiply them.

### The product symbol

Just like the sum has a shorthand, so does the product.

When we have

$$x_1 * x_2 * x_3 * x_4 * ... * x_n$$

we can write it down as:

$$\prod_{i=1}^{n} x_i$$

It reads exactly like the sum symbol, except the terms are multiplied instead of added.

$$x_1 * x_2 * x_3 * x_4 * ... * x_n = \prod_{i=1}^{n} x_i$$

As a loop:

~!
```cpp
long long product = 1;
for (int i = 1; i <= n; i++) {
    product *= x[i];
}
```

One thing to keep in mind: products grow much faster than sums. A sum of `n` numbers up to `10^9` fits comfortably in a `long long`, but a product of just a few of them does not. This is why counting problems so often ask for the answer modulo some number.
