At the magic fair, magicians keep walking into the main hall and walking back out of it. The strength of every magician is known, and two different magicians may well be equally strong.

From time to time the organizers want to hire someone for a trick, so they ask for the strength of the **weakest** magician currently in the hall, or for the strength of the **strongest** one. Write a program that answers those questions.

## Input

First line of input will be a single integer $t$ - the number of testcases.
First line of each testcase contains an integer $q$ - the number of events.
Each of the next $q$ lines contains one event, in one of four forms:

- `i x` - a magician of strength $x$ walked into the hall;
- `e x` - a magician of strength $x$ walked out of the hall;
- `m` - print the strength of the weakest magician in the hall;
- `M` - print the strength of the strongest magician in the hall.

An event `e x` appears only when a magician of strength $x$ really is in the hall, and it removes exactly **one** of them.

## Output

For every event `m` or `M`, in the order the events appear, print the requested strength on its own line. If the hall is empty at that moment, print `-` instead.

## Example

```Input
1
12
i 1
i 5
i 5
i 8
m
e 5
e 8
M
e 5
M
e 1
m
```

```Output
1
5
1
-
```

The hall first fills up with strengths $1, 5, 5, 8$, so the weakest is $1$. After one magician of strength $5$ and the one of strength $8$ leave, the hall holds $1$ and $5$ - note that the **other** magician of strength $5$ is still there, so the strongest is $5$. Once he leaves too only $1$ remains, and after he leaves the hall is empty.

## Constraints

$1 \le t \le 10$
$1 \le q \le 10^5$
the sum of $q$ over all testcases does not exceed $2 \cdot 10^5$
$1 \le x < 10^9$

---

*This problem was adapted, with permission, from [Najjači mađioničar](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/najjaci_madjionicar), authored by Društvo matematičara Srbije and Fondacija Petlja.*
