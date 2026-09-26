Za dati niz brojeva pronađi najduži podniz (elementi ne moraju biti jedan pored drugog) takav da su brojevi **strogo rastući**.

Pošto može postojati više takvih podnizova iste (najveće) dužine, ispiši **leksikografski najmanji**.

Niz $x$ je leksikografski manji od niza $y$ iste dužine ako na prvoj poziciji na kojoj se razlikuju $x$ ima manji element.

## Ulaz

U prvom redu nalazi se jedan broj $n$, dužina niza.
U narednom redu nalazi se $n$ brojeva $a_1, a_2, \dots, a_n$.

## Izlaz

U prvom redu jedan broj $k$ - dužina najdužeg strogo rastućeg podniza.
U drugom redu $k$ brojeva - leksikografski najmanji najduži strogo rastući podniz.

## Primer

```Input
8
3 6 1 2 8 2 4 5
```

```Output
4
1 2 4 5
```

Najduži strogo rastući podniz ima 4 elementa, a jedini te dužine je $1, 2, 4, 5$.

## Ograničenja

$1 \le n \le 1000$ 
$1 \le a_i \le 10^9$
