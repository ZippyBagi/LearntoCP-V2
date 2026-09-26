Building a car takes a whole list of jobs, and some of them depend on others - the axles have to go on before the wheels do. Your task is to find an order in which all $n$ jobs can be carried out without ever starting a job before something it depends on.

Jobs are numbered $0$ to $n-1$. Several orders are usually possible, so print the **lexicographically smallest** one: of all valid orders, the one whose first number is smallest, and among those the one whose second number is smallest, and so on.

## Input

First line of input will be a single integer $t$ - the number of testcases.
The first line of each testcase contains two integers $n$ and $m$ - the number of jobs and the number of dependencies.
Each of the next $m$ lines contains two integers $x$ and $y$, meaning that job $y$ has to be done **before** job $x$. Note the order: the job that comes **second** on the line is the one that has to happen **first**.

An order is guaranteed to exist.

## Output

For every testcase print a single line with all $n$ job numbers in the lexicographically smallest valid order, separated by one space.

## Example

```Input
1
6 6
3 1
3 2
4 2
4 5
1 0
0 5
```

```Output
2 5 0 1 3 4
```

Only jobs $2$ and $5$ have nothing before them, and $2$ is the smaller one, so it goes first. That releases nothing new, so $5$ follows, which frees both $0$ and $4$ - and $0$ is smaller. Job $4$ has to wait until $2$ and $5$ are both done, and job $3$ until $1$ and $2$ are.

## Constraints

$1 \le t \le 10$
$2 \le n \le 5 \cdot 10^4$
$1 \le m \le 10n$
$0 \le x, y \le n-1$ and $x \ne y$
The sum of $n$ over all testcases does not exceed $10^5$, and the sum of $m$ does not exceed $2 \cdot 10^5$

---

*This problem was adapted, with permission, from [Redosled poslova](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka3/redosled_poslova), authored by Društvo matematičara Srbije and Fondacija Petlja.*
