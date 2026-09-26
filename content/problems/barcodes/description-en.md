A store sells many kinds of products and their barcodes are known, given as a **sorted** list. A manufacturer delivers a list of barcodes of its own products, in no particular order. Your task is to determine how many of the manufacturer's products are already sold in the store.

## Input

The first line contains a single integer $t$ - the number of testcases.

- The first line of each testcase contains two integers $n$ and $q$ - the number of products in the store and the number of the manufacturer's products.
- The next line contains $n$ integers in **increasing order** - the barcodes of the products in the store.
- The next line contains $q$ integers - the barcodes of the manufacturer's products.

## Output

For every testcase print a single line with the number of the manufacturer's barcodes that appear on the store's list.

## Example

```Input
1
5 5
1 3 5 6 7
2 3 4 5 8
```

```Output
2
```

Of the manufacturer's barcodes, only $3$ and $5$ appear on the store's list.

## Constraints

$1 \le t \le 1000$
$1 \le n, q \le 2 \cdot 10^5$
$1 \le a_i \le 10^9$
Both the sum of $n$ and the sum of $q$ over all testcases are at most $2 \cdot 10^5$.

---

*This problem was adapted, with permission, from [Provera bar-kodova](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/binarna_pretraga), authored by Društvo matematičara Srbije and Fondacija Petlja.*
