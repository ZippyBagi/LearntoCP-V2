>In this lesson we will learn how to store an entire set inside a single number - bitmasks!

### What is a bitmask?

A **bitmask** is an ordinary integer that we read one bit at a time. Bit `i` answers one yes/no question: **is element `i` inside the set?** (Think of it as a lightweight version of `vector<bool>`)

Think of a row of light switches, one per element. The switch is up if the element is in, down if it is out. The whole row read from right to left is a binary number, and that number is the mask.


	![[bitmask-switches.png|Four light switches labelled Mila, Jovan, Marko and Ana, up for Mila and Ana and down for the other two, with the same row read underneath as the digits 1 0 0 1 and then as the number 9]]


With numbers there are `16` masks, from `0000` (all down) to `1111` (all up). The set of all four is the number `15`, and the empty set is the number `0`.

Nothing here is new. We already know how to read and write single bits from the [Bitwise Operations lesson](/Theory/Binary%20Numbers/Bitwise%20Operations) - a bitmask is just a new way of looking at a number we already knew how to manipulate.

### The operations

Everything we ever do to a mask comes down to these:

| Operation | Code | Complexity |
| ---- | ---- | ---- |
| is element `i` inside? | `(mask>>i)&1` | O(1) |
| add element `i` | `mask \|= (1<<i)` | O(1) |
| remove element `i` | `mask &= ~(1<<i)` | O(1) |
| flip element `i` | `mask ^= (1<<i)` | O(1) |
| the empty set | `0` | O(1) |
| the full set of `n` elements | `(1<<n)-1` | O(1) |
| how many elements are inside | `__builtin_popcount(mask)` | O(1) |
| the smallest element inside | `__builtin_ctz(mask)` | O(1) |

Here `n` is the number of elements, and it is small - more on that in a moment.

Every line is one or two machine instructions, which is the whole point of the structure. Adding an element to a `set<int>` costs O(log n), adding it to a mask costs nothing measurable.

Let's build a group and then read it back:
~!
```c++
int main(){

    vector<string> names = {"Ana", "Marko", "Jovan", "Mila"};

    int mask = 0;

    mask |= (1<<0); //Ana joins
    mask |= (1<<2); //Jovan joins
    mask |= (1<<3); //Mila joins

    mask &= ~(1<<2); //Jovan changes his mind

    cout<<mask<<'\n';

    for(int i=0;i<4;i++){
        if((mask>>i)&1){
            cout<<names[i]<<" ";
        }
    }

    return 0;
}
```
Output:
`9`
`Ana Mila `

The group `{Ana, Mila}` is the number `9`, because `9` is `1001` in binary. That number is now something we can put in an array, compare with `==`, or pass around as an `int`.

>Note:
>`__builtin_popcount` and `__builtin_ctz` are gcc functions, and they only take an `unsigned int`. For a 64-bit mask they are called `__builtin_popcountll` and `__builtin_ctzll`.

### Every subset with one loop

Here is the payoff that makes bitmasks worth learning.

Every subset of `n` elements is a mask, and every mask is a number between `0` and `2^n - 1`. So looping over all subsets is just looping over all numbers in that range:
~!
```c++
int main(){

    int n = 3;
    vector<int> a = {1, 2, 3};

    for(int mask=0;mask<(1<<n);mask++){

        cout<<"{ ";

        for(int i=0;i<n;i++){
            if((mask>>i)&1){
                cout<<a[i]<<" ";
            }
        }

        cout<<"}"<<'\n';
    }

    return 0;
}
```
Output:
`{ }`
`{ 1 }`
`{ 2 }`
`{ 1 2 }`
`{ 3 }`
`{ 1 3 }`
`{ 2 3 }`
`{ 1 2 3 }`

All eight subsets, with no recursion, no `push_back`, and nothing to undo on the way back up. The whole generator from the Recursion chapter collapsed into two `for` loops.

The order is different from the recursive version, because now the subsets come out sorted by their number. That is usually an advantage, and we will lean on it heavily in the next lesson.

>Note:
>`1<<n` is `2^n`, so `mask<(1<<n)` reads as "for every one of the `2^n` subsets". Writing `pow(2,n)` here is a mistake - `pow` returns a `double`, and comparing an `int` with a `double` in a loop condition is how people lose the last subset.


### Sets as numbers

Because a mask is a set, the bitwise operators turn into set operators:

| Set operation                                                  | Code           |
| -------------------------------------------------------------- | -------------- |
| union of A and B (all elements from A and all elements from B) | `a \| b`       |
| intersection of A and B (all elements both in A and in B)      | `a & b`        |
| everything in A that is not in B                               | `a & ~b`       |
| everything in exactly one of them                              | `a ^ b`        |
| is B contained in A?                                           | `(a & b) == b` |
| do they share nothing?                                         | `(a & b) == 0` |

	![[bitmask-set-ops.png|The masks a equals 1100 and b equals 1010 drawn as rows of filled and empty circles, with four results below them: a or b gives 1110 which is 14, a and b gives 1000 which is 8, a and not b gives 0100 which is 4, and a xor b gives 0110 which is 6]]

Let's check them:
~!
```c++
int main(){

    int a = 12; //1100
    int b = 10; //1010

    cout<<(a | b)<<'\n';
    cout<<(a & b)<<'\n';
    cout<<(a & ~b)<<'\n';
    cout<<(a ^ b)<<'\n';

    return 0;
}
```
Output:
`14`
`8`
`4`
`6`

`a` is `{2,3}` and `b` is `{1,3}`. Their union is `{1,2,3}` which is `1110`, or `14`. Their intersection is `{3}` which is `1000`, or `8`. Checking whether one set contains another, which would be a loop over a `vector`, is now a single `&` and a single `==`.

### Important Traps:

**The first is operator precedence.** In c++, `==` binds tighter than `&`. So this looks right and is not:
~!
```c++
int main(){

    int mask = 5; //0101

    if(mask & (1<<1) == 0){
        cout<<"element 1 is missing";
    }else{
        cout<<"element 1 is inside";
    }

    return 0;
}
```
Output: `element 1 is inside`

But `5` is `0101`, and bit `1` is clearly `0`. What the compiler read was `mask & ((1<<1) == 0)`, which is `mask & 0`, which is `0`, which is false - so we landed in the `else`.

The fix is to bracket the mask expression, or better, to always test a bit the same way:

`if(((mask>>1)&1) == 0)`

**The second is the type of the `1`.** A shift is done in the type of its left operand, and a plain `1` is an `int`:
~!
```c++
int main(){

    long long a = 1<<40;
    long long b = 1LL<<40;

    cout<<a<<'\n';
    cout<<b;

    return 0;
}
```
Output:
`0`
`1099511627776`

Assigning to a `long long` does not save us, because the shift already happened in 32 bits and threw everything away. Shifting an `int` by 40 is undefined behaviour, so the result is whatever the compiler feels like - here it simply produced `0`.

The rule is short: **the moment a mask can have more than 31 bits, every `1<<i` becomes `1LL<<i`.** Turn compiler warnings on and gcc will point at this one for you.

### Walking the submasks

Sometimes we do not want every subset of the whole set, but every subset of one particular mask. Splitting a group into two teams, for example: pick a submask, and the rest of the mask is the other team.

There is a well known one-liner for it:
~!
```c++
int main(){

    int mask = 13; //1101

    for(int sub=mask; sub>0; sub=(sub-1)&mask){
        cout<<sub<<" ";
    }

    return 0;
}
```
Output: `13 12 9 8 5 4 1 `

Subtracting one from `sub` turns its lowest set bit off and fills everything below it with ones. The `& mask` then wipes out the bits that were never allowed to be there in the first place, and what is left is the next smaller submask. Repeating that walks through all of them, from the mask itself down to `0`.

	![[bitmask-submask-walk.png|The submask walk of mask 1101 laid out in seven rows, each showing sub, then sub minus 1, then that value anded with the mask, which becomes the next sub, running 13, 12, 9, 8, 5, 4, 1 and stopping at 0]]

Running this loop for every mask does not cost **O(2^n * 2^n)** as it first looks. A mask with `k` bits has `2^k` submasks, and summing that over all masks gives **O(3^n)** - a big number, but a very different one.

>Note:
>Masks are very efficient, useful and easy to use(once you understand them). The tradeoff is that they can't be used very often. A `long long` bitmask can only store 64 elements!

In conclusion bitmasks are a must know technique that is both an optimization, and a building block for bitmask DP!

