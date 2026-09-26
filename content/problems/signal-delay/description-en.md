A signal starts at one computer in a network and spreads through communication channels to every other computer it can reach, directly or through other computers. Each channel is **one-way** and takes a known amount of time to carry the signal across.

Every computer forwards the signal onward the moment it receives it, so a computer receives the signal along whichever route reaches it soonest. The network is done once the **last** computer has received it.

Write a program that finds how long it takes for the signal to reach every computer in the network.

## Input

First line of input will be a single integer $t$ - the number of testcases.
The first line of each testcase contains two integers $n$ and $m$ - the number of computers and the number of channels.
Each of the next $m$ lines contains three integers $u$, $v$ and $w$ - a channel leading **from** computer $u$ **to** computer $v$, which the signal needs $w$ time to cross. It does not carry the signal from $v$ to $u$.
The last line of the testcase contains a single integer $s$ - the computer the signal starts from.

Computers are numbered $1$ to $n$. There may be several channels between the same pair of computers, and a channel may lead from a computer back to itself.

## Output

For every testcase print a single line with the time the signal needs to reach every computer, or $-1$ if some computer cannot receive it at all.

## Example

```Input
3
5 7
1 2 7
1 3 3
1 5 6
2 1 2
3 5 2
4 2 3
5 4 1
1
3 1
1 2 5
1
1 1
1 1 4
1
```

```Output
7
-1
0
```

In the first testcase the signal reaches computer $3$ in $3$, and computer $5$ in $5$ - going $1 \rightarrow 3 \rightarrow 5$ beats the direct channel, which costs $6$. From there computer $4$ is reached in $6$, and computer $2$ in $7$ by the direct channel, since the route through $3, 5, 4$ would cost $9$. The last arrival is at time $7$.

In the second testcase nothing leads to computer $3$, so the answer is $-1$. In the third the signal starts at the only computer and is already there, so it takes no time at all.

## Constraints

$1 \le t \le 10$
$1 \le n \le 1000$
$1 \le m \le 10^5$
$1 \le u, v \le n$ and $1 \le s \le n$
$1 \le w \le 1000$
The sum of $n$ over all testcases does not exceed $5000$, and the sum of $m$ does not exceed $2 \cdot 10^5$

---

*This problem was adapted, with permission, from [Kašnjenje signala](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka3/kasnjenje_signala), authored by Društvo matematičara Srbije and Fondacija Petlja.*
