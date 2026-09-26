The statistics bureau wants to publish an honest number for the average salary. The arithmetic mean turns out to be a bad choice - a handful of people with enormous salaries pull it far above what an ordinary person earns. So they switched to the **median**: line all the salaries up in non-decreasing order and take the one in the middle. If the number of salaries is even, there is no single middle one, so the median is the arithmetic mean of the **two** middle values.

For example, the median of $1, 2, 4, 7, 9$ is $4$, and the median of $1, 2, 4, 5, 7, 9$ is $4.5$.

Salaries keep arriving one by one, and at any moment the bureau may ask for the median of everything reported so far. Write a program that answers every such question.

## Input

First line of input will be a single integer $t$ - the number of testcases.
First line of each testcase contains an integer $q$ - the number of operations.
Each of the next $q$ lines contains one operation, in one of two forms:

- `d x` - a new salary $x$ is reported;
- `m` - print the median of all salaries reported so far in this testcase.

The first operation of every testcase is guaranteed to be of the form `d x`.

## Output

For every operation `m`, in the order the operations appear, print on its own line the median at that moment, rounded to **one decimal**.

## Example

```Input
1
6
d 5
d 7
d 6
m
d 8
m
```

```Output
6.0
6.5
```

At the first question the reported salaries are $5, 7, 6$, which sorted give $5, 6, 7$ - the middle one is $6$. At the second question they are $5, 6, 7, 8$, so the median is the mean of the two middle values, $(6 + 7) / 2 = 6.5$.

## Constraints

$1 \le t \le 10$
$1 \le q \le 10^5$
the sum of $q$ over all testcases does not exceed $2 \cdot 10^5$
$1 \le x \le 10^9$

---

*This problem was adapted, with permission, from [Ažuriranje medijane](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/azuriranje_medijane), authored by Društvo matematičara Srbije and Fondacija Petlja.*
