> In this lesson we will learn about numeral systems, and about Binary Numbers!

Numbers we use in everyday life look like this:

`1, 5, 12, 136, 123, etc...`

In order to express these numbers we use a **numeral system**.

But what even is a numeral system?
## Numeral Systems

A numeral system is just a way of writing down a number.

We all know that `123` is one hundred and twenty three, because we have `1` on the position of hundreds, `2` in the position of tens, and `3` in the position of ones.

When we see the number we are essentially doing this in our heads:

`123 = 100 * 1 + 10 * 2 + 1 * 3`

Notice how **1, 10 and 100 are powers of ten**, that is because we are working in the **decimal system**, or the **system with base 10**.

Similarly, `123` would mean eighty three in a system with base 8. Since:

`8^2 * 1 + 8^1 * 2 + 8^0 * 3 = 83`

>Note:
>Leading zeroes do not change the value of a number, no matter the numeral system: `0083` is just `83`
## Binary System

One of the most used numeral systems is the binary system (system with **base 2**). In this system every number is represented using only the digits `0` and `1`

When it comes to competitive programming, it is needed to both solve problems and understand important concepts. It is also important as computers store information using this system!

We should be comfortable converting both decimal numbers into binary, and binary into decimal numbers.

#### Binary to decimal: 

`1001 1101` in binary is:

`128 * 1 + 64 * 0 + 32 * 0 + 16 * 1 + 8 * 1 + 4 * 1 + 2 * 0 + 1 * 1`
`= 128 + 16 + 8 + 4 + 1`
`= 157`

	![[binary-place-value.png|The binary number 1001 1101 with each of the eight positions labelled by its power of two, the positions holding a 1 highlighted, and their values 128 + 16 + 8 + 4 + 1 summing to 157]]

#### Decimal to binary: 

To convert to binary, simply subtract the largest possible power of 2, then keep going to smaller powers of 2, and if they "fit", subtract them and write `1`, and if they don't write `0`.

Let's look at an example of `121`:

| Power of 2 | Fits? | Bit | Current Number |
| ---------- | ----- | --- | -------------- |
| 128        | No    | 0   | 121            |
| 64         | Yes   | 1   | 121 - 64 = 57  |
| 32         | Yes   | 1   | 57 - 32 = 25   |
| 16         | Yes   | 1   | 25 - 16 = 9    |
| 8          | Yes   | 1   | 9 - 8 = 1      |
| 4          | No    | 0   | 1              |
| 2          | No    | 0   | 1              |
| 1          | Yes   | 1   | 1 - 1 = 0      |
Result: `0111 1001`, same as `111 1001`

Another common way to convert a decimal number into binary is by repeatedly dividing by `2` and recording the remainder.

Example:

|Division|Quotient|Remainder|
|---|---|---|
|121 ÷ 2|60|1|
|60 ÷ 2|30|0|
|30 ÷ 2|15|0|
|15 ÷ 2|7|1|
|7 ÷ 2|3|1|
|3 ÷ 2|1|1|
|1 ÷ 2|0|1|
To obtain the binary representation, read the remainders **from the bottom to the top**: `111 1001`

Feel free to use whichever method seems easier

>Note:
>Binary numbers are usually written in clusters of 4, that is only done for human readability. Both `0111 1001` and `01111001` mean the same thing. 

### Operations with binary numbers

All standard operations (addition, subtraction, multiplication, division) are the same as with decimal numbers.

`101` + `011` = `1000`
`101` - `011` = `010`
`101` * `011` = `1111`
`101` / `011` = `1`

There are tricks and algorithms for doing these operations, but the simplest way to do them is just to convert to the decimal system, do the calculation and then convert back to binary
