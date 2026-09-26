Take a number $n$ and shuffle its decimal digits into any order you like. Some of the numbers you can spell that way are divisible by $m$ - count them.

To be counted, a number $x$ must use **exactly** the digits of $n$, each as many times as $n$ has it, must not start with a zero, and must be divisible by $m$. Two shuffles that spell the **same** number count once: $n = 223$ can be shuffled into $223$, $232$ and $322$, and no others, however you swap its two identical twos.

## Input

First line of input will be a single integer $t$ - the number of testcases.
Each of the next $t$ lines contains two integers $n$ and $m$.

## Output

For every testcase print a single line with how many different numbers can be spelled from the digits of $n$ that have no leading zero and are divisible by $m$.

## Example

```Input
3
104 2
223 4
7067678 8
```

```Output
3
1
47
```

From $104$ the numbers without a leading zero are $104$, $140$, $401$ and $410$, and all but $401$ are even. From $223$ only $232$ is divisible by $4$. The third testcase has $47$ of them.

## Constraints

$1 \le t \le 5$
$1 \le n < 10^{18}$
$1 \le m \le 100$

---

*This problem is based on [Roman and Numbers](https://codeforces.com/problemset/problem/401/D), problem 401D from Codeforces Round 235, by Mike Mirzayanov and the Codeforces team. The statement here is our own.*
