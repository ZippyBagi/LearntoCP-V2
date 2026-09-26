A bank wants to warn its customers about suspicious activity on their accounts. Every time a transaction arrives, the bank looks at the **median** $m$ of the $d$ transactions **immediately before** it, and if the new transaction is **at least twice** as large as $m$, a warning is sent.

The median of a list of numbers is the value in the middle once the list is sorted. If the list has an even number of values, there is no single middle one, so the median is the arithmetic mean of the **two** middle values - for example the median of $2, 3, 3, 4, 5, 6$ is $(3 + 4) / 2 = 3.5$.

The first $d$ transactions do not have $d$ transactions before them, so they never trigger a warning. Given the list of transactions, count how many warnings the bank sends.

## Input

First line of input will be a single integer $t$ - the number of testcases.
First line of each testcase contains two integers $n$ and $d$ - the number of transactions and how many previous transactions the bank looks at.
Second line of each testcase contains $n$ integers $a_1, a_2, \dots, a_n$ - the amounts of the transactions, in the order they happened.

## Output

For every testcase print a single line with the number of warnings the bank sends.

## Example

```Input
1
8 3
2 5 3 4 3 6 2 9
```

```Output
2
```

The warnings are sent for $6$ (the three transactions before it are $3, 4, 3$ with median $3$, and $6 \ge 2 \cdot 3$) and for $9$ (the three before it are $3, 6, 2$, again with median $3$). The transaction $5$ is not flagged even though it is large - only one transaction happened before it, not $3$.

## Constraints

$1 \le t \le 10$
$2 \le n \le 10^5$
$1 \le d \le n$
the sum of $n$ over all testcases does not exceed $2 \cdot 10^5$
$1 \le a_i \le 10^9$

---

*This problem was adapted, with permission, from [Sumnjive transakcije](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/sumnjive_transakcije), authored by Društvo matematičara Srbije and Fondacija Petlja.*
