A king once won a throne and started a royal line. He has a great many descendants, and every one of them would like to know where he stands in the queue for the crown.

The rule of succession is this. The king is followed by his **oldest son**, then by that son's own oldest child, and so on down. When a descendant has no children, the next in line is his **next oldest brother**, followed by that brother's descendants, and so on.

Your task is to answer, for a number of family members, what place in the line of succession each one holds. The king himself holds place $0$.

## Input

First line of input will be a single integer $t$ - the number of testcases.
First line of each testcase contains a single integer $n$ - the total number of people in the family tree, the king included.
In the next $n - 1$ lines will be two names, `parent child`. The children of one parent are listed **oldest first**, but the lines describing them need not stand one below the other, and the king need not appear first.
The next line contains a single integer $q$ - the number of questions, and in the next $q$ lines will be one name each.

Names consist of English letters only and are distinct - no two people share a name.

## Output

For every question print a single line with the name and the place that person holds in the line of succession, separated by a space.

## Example

```Input
1
19
Elisabeth Charles
Elisabeth Andrew
Elisabeth Edward
Elisabeth Anne
Charles William
William George
Charles Harry
William Charlotte
William Louis
Anne Peter
Anne Zara
Edward James
Andrew Beatrice
Andrew Eugenie
Edward Louise
Peter Savannah
Peter Isla
Zara Mia
7
Harry
Charles
Charlotte
Louise
James
Isla
Andrew
```

```Output
Harry 6
Charles 1
Charlotte 4
Louise 12
James 11
Isla 16
Andrew 7
```

Elisabeth is the head of the family, since she is the only person who is never named as somebody's child. Her oldest son Charles takes place $1$, and his whole line - William, then William's three children, then Harry - is settled before her second son Andrew is reached at place $7$.

## Constraints

$1 \le t \le 1000$
$2 \le n \le 5 \cdot 10^4$
$1 \le q \le 5 \cdot 10^4$
every name is between $1$ and $20$ English letters
the $n - 1$ lines describe a family tree, so every person except the king is named as a child exactly once
every name asked about appears in the family tree
the sum of $n$ over all testcases does not exceed $10^5$
the sum of $q$ over all testcases does not exceed $10^5$

---

*This problem was adapted, with permission, from [Prestolonaslednici](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka3/prestolonaslednici), authored by Društvo matematičara Srbije and Fondacija Petlja.*
