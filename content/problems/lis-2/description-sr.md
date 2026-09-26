Za dati niz brojeva pronađi dužinu najdužeg podniza (elementi ne moraju biti jedan pored drugog) takvog da su brojevi **strogo rastući**.

Ovo je isti zadatak kao [Najduži rastući podniz](/sr/Problems/lis), samo što se traži samo dužina - ali je niz mnogo veći, pa $O(n^2)$ rešenje neće biti dovoljno brzo.

## Ulaz

U prvom redu nalazi se jedan broj $n$, dužina niza.
U narednom redu nalazi se $n$ brojeva $a_1, a_2, \dots, a_n$.

## Izlaz

Jedan broj - dužina najdužeg strogo rastućeg podniza.

## Primer

```Input
8
3 6 1 2 8 2 4 5
```

```Output
4
```

Najduži strogo rastući podniz je $1, 2, 4, 5$, dužine 4.

## Ograničenja

$1 \le n \le 10^5$
$1 \le a_i \le 10^9$
