Uzmi broj $n$ i ispremeštaj mu cifre kako god hoćeš. Neki od brojeva koje tako možeš da sastaviš deljivi su sa $m$ - prebroj ih.

Da bi se brojao, broj $x$ mora da bude sastavljen **tačno** od cifara broja $n$, svaku onoliko puta koliko se javlja u $n$, ne sme da počinje nulom i mora da bude deljiv sa $m$. Isti broj se pritom broji samo jednom: od cifara broja $n = 223$ mogu se sastaviti $223$, $232$ i $322$ i ništa više, bez obzira na to kojim redom uzimamo njegove dve dvojke.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U svakoj od sledećih $t$ linija su dva cela broja $n$ i $m$.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji koliko različitih brojeva deljivih sa $m$, i to bez vodeće nule, može da se sastavi od cifara broja $n$.

## Primer

```Input
3
104 2
223 4
7067678 8
```

```Output
3
1
47
```

Od cifara broja $104$ mogu se sastaviti $104$, $140$, $401$ i $410$ - ostali rasporedi počinju nulom - a parni su svi osim $401$. Od cifara broja $223$ jedino je $232$ deljivo sa $4$. U trećem test primeru takvih brojeva ima $47$.

## Ograničenja

$1 \le t \le 5$
$1 \le n < 10^{18}$
$1 \le m \le 100$

---

*Zadatak je nastao po uzoru na [Roman and Numbers](https://codeforces.com/problemset/problem/401/D), zadatak 401D sa Codeforces Round 235, autora Mike Mirzayanov i tima Codeforces. Postavka je naša.*
