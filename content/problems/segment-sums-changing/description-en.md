You are given an array of $n$ integers, and then a list of $m$ operations to carry out on it, in order. Each operation is one of two kinds: it either changes a single element, or asks for the sum of a stretch of consecutive elements.

Write a program that prints the answer to every question, using the array as it stands at that moment.

## Input

First line of input will be a single integer $t$ - the number of testcases.
The first line of each testcase contains two integers $n$ and $m$ - the length of the array and the number of operations.
The second line contains $n$ integers $a_0, a_1, \dots, a_{n-1}$.
Each of the next $m$ lines contains one operation, in one of two forms:

- `s i v` - **set** the element at position $i$ to $v$;
- `q l r` - **query** the sum of the elements at positions $l, l+1, \dots, r$.

Positions are counted **from $0$**, so $i$, $l$ and $r$ are all between $0$ and $n-1$.

## Output

For every `q` operation, in the order the operations appear, print on its own line the sum of that stretch.

## Example

```Input
1
5 5
1 2 3 4 5
q 0 4
q 2 3
s 2 5
s 3 6
q 0 4
```

```Output
15
7
19
```

The array starts as $1, 2, 3, 4, 5$, so the whole array sums to $15$ and positions $2$ to $3$ sum to $3 + 4 = 7$. After the two changes the array is $1, 2, 5, 6, 5$, which sums to $19$.

## Constraints

$1 \le t \le 10$
$1 \le n \le 10^5$
$1 \le m \le 10^5$
$0 \le a_i \le 10$ and $0 \le v \le 10$
$0 \le i \le n-1$ and $0 \le l \le r \le n-1$
The sum of $n$ over all testcases does not exceed $2 \cdot 10^5$, and so does the sum of $m$

---

*This problem was adapted, with permission, from [Sume segmenata promenljivog niza](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka3/sume_segmenata_promenljivog_niza1), authored by Društvo matematičara Srbije and Fondacija Petlja.*
