>The addition principle had one strict condition: the groups we counted were not allowed to overlap. This lesson is about what to do when they do overlap.

### Cardinality

First, a word for the thing we keep counting.

The **cardinality** of a set is the number of elements in it. For a set `A` we write it as `|A|`, and sometimes as `n(A)`.

So if $A = \{2, 4, 6, 8\}$ then $|A| = 4$. Nothing more to it - it is just the size of the set.

### Two sets

Suppose we have two sets, `A` and `B`, and we want the size of their union - the number of elements that are in `A`, in `B`, or in both.

The obvious guess is $|A| + |B|$, and it is wrong whenever the sets share elements. An element sitting in both sets gets counted once when we count `A`, and once again when we count `B`. It ends up counted twice, but it should be counted once.

Every element that gets double counted is exactly an element of $A \cap B$, so we subtract that group once to repair the damage:

$$|A \cup B| = |A| + |B| - |A \cap B|$$

	![[inclusion-exclusion-two-sets.png|A two circle Venn diagram with |A| = 5 and |B| = 4 and two elements in the overlap counted by both, so the union is 5 plus 4 minus 2, which is 7]]

That is the whole idea of the principle. Add too much, then take back what you overcounted.

### Three sets

With three sets the same repair is not quite enough, and this is where it gets interesting.

Start with $|A_1| + |A_2| + |A_3|$ and ask how many times each element has been counted:

- an element in exactly 1 set is counted 1 time
- an element in exactly 2 sets is counted 2 times
- an element in all 3 sets is counted 3 times

So we subtract the pairwise intersections, just like before. An element in exactly 2 sets belongs to exactly one pair, so it loses 1 and ends at 1 - correct. But an element in all 3 sets belongs to all 3 pairs, so it loses 3 and ends at $3 - 3 = 0$. Now it isn't counted at all.

To fix that we add the triple intersection back:

$$|A_1 \cup A_2 \cup A_3| = (|A_1| + |A_2| + |A_3|) - (|A_1 \cap A_2| + |A_1 \cap A_3| + |A_2 \cap A_3|) + |A_1 \cap A_2 \cap A_3|$$

Every element is now counted exactly once:

	![[inclusion-exclusion-three-sets.png|A three circle Venn diagram with each region chipped by how many sets it belongs to, and a table below showing that adding singles, subtracting pairs and adding the triple counts every element exactly once]]

The signs alternate because each round of correction overshoots, and the next one pulls it back.

### The general rule

The pattern doesn't stop at three sets. However many you have, it always goes the same way:

> Add the sizes of all the sets. Subtract the intersections of every pair. Add back the intersections of every triple. Subtract the intersections of every group of four. Keep alternating until the groups are as large as the number of sets you have.

That is the whole principle, and the name describes it - we keep including and excluding until every element has been counted exactly once.

| Group size | What we do with it |
| ---------- | ------------------ |
| 1 set      | add                |
| 2 sets     | subtract           |
| 3 sets     | add                |
| 4 sets     | subtract           |

Odd sized groups get added, even sized groups get subtracted.

It is worth noticing how much work this is. Every possible group of sets appears somewhere in the sum, and from the previous lesson we know how many of those there are. With 3 sets we get 7 terms, which we happily wrote out by hand. With 20 sets we would get over a million.

### When every group has the same size

Listing every intersection separately is only necessary when they actually differ. Very often they don't, and then there is a shortcut.

Ana, Bob and Cara leave their coats at a restaurant, and on the way out each of them grabs one at random. In how many of the possible outcomes does at least one person end up with their own coat?

An outcome is the whole handout - who walked away with which coat. Our three sets are the outcomes where Ana got her own coat, where Bob got his, and where Cara got hers.

To count the outcomes in "Ana got her own coat", we pin Ana's coat down and let the rest happen however it likes. The set demands nothing of Bob and Cara, so their two coats can go either way:

`Ana: her own, Bob: his own, Cara: her own`
`Ana: her own, Bob: Cara's, Cara: Bob's`

So each of the three single sets has size 2.

Pin down two people instead, say Ana and Bob, and the last coat has nowhere to go but to Cara. Nothing is left to choose, so every pair of sets holds exactly 1 outcome - and so does all three together.

Notice that none of this depended on **which** people we picked, only on **how many**. So we don't need to write out the intersections one by one. 

All we need to know is how many groups are left to pick when we fix 1, when we fix 2, and when we fix all 3.



$$3 * 2 - 3 * 1 + 1 * 1 = 4$$

So in 4 of the 6 possible outcomes somebody gets their own coat back, and in the remaining 2 nobody does.

> When all the intersections of the same size are equal, you only need two numbers per level: how big that shared intersection is, and how many groups of that size there are.

This shortcut is known as the symmetric version of the principle. It turns a sum with a huge number of terms into one with just a few.

### In competitive programming

**How many integers from 1 to 100 are divisible by 2, 3 or 5?**

We have three sets here: the multiples of 2, the multiples of 3 and the multiples of 5. Counting multiples of `d` up to `N` is easy - integer division `N / d` gives the answer. The intersections are just as easy, because being divisible by both 2 and 3 is the same thing as being divisible by 6.

Following the rule, we add the single sets, subtract the pairs, and add the triple:

$$(50 + 33 + 20) - (16 + 10 + 6) + 3 = 74$$

The sets here have different sizes, so the shortcut from the previous section doesn't apply and we work through the groups one by one.

When the sets are known in advance, the code is just the formula typed out. Every group becomes one division, and the group size decides the sign:

~!
```cpp
long long countDivisible(long long N) {
    long long total = 0;

    total += N / 2 + N / 3 + N / 5;     // the single sets
    total -= N / 6 + N / 10 + N / 15;   // the pairs
    total += N / 30;                    // all three

    return total;
}
```

The number we divide by is the smallest one divisible by everything in the group - 2 and 3 give us 6, and all three give us 30.

Writing the terms out by hand is fine for a few sets, but the number of groups doubles with every set we add. Once the sets come from the input and we don't know how many there will be, we need a way to generate the groups instead of typing them, and that is a technique for a later lesson.

>Inclusion-exclusion is what the addition principle becomes once the cases are allowed to overlap. If you ever catch yourself adding up cases and worrying that something got counted twice, this is the tool for it.
