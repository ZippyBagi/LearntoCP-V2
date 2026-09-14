>U ovoj lekciji naučićemo kako da izračunamo najveći zajednički delilac i najmanji zajednički sadržalac dva broja - u logaritamskom vremenu!

Prvo dve definicije:

- **NZD** (Najveći Zajednički Delilac, en. GCD - Greatest Common Divisor) brojeva `a` i `b` je najveći broj koji deli **oba**.
- **NZS** (Najmanji Zajednički Sadržalac, en. LCM - Least Common Multiple) brojeva `a` i `b` je najmanji broj koji je deljiv **sa oba**.

Primer: za `a = 12` i `b = 18`:

- Delioci broja `12`: `1, 2, 3, 4, 6, 12`
- Delioci broja `18`: `1, 2, 3, 6, 9, 18`

Najveći zajednički je `6`, dakle `NZD(12, 18) = 6`. A najmanji broj koji i 12 i 18 dele je `36`, dakle `NZS(12, 18) = 36`.

	![[gcd-lcm.png|Delioci brojeva 12 i 18 u dva reda sa istaknutim zajedničkim deliocima 1, 2, 3 i 6, gde je najveći među njima 6 obojen zeleno, što daje NZD 6 i NZS 36]]

Upoređivanje spiskova delilaca radi, ali njihovo pronalaženje traje **O(sqrt(n))**. Postoji mnogo elegantniji način, otkriven pre više od 2000 godina.
### Euklidov algoritam

Ceo algoritam je jedno zapažanje:

`NZD(a, b) = NZD(b, a % b)`

Svaki broj koji deli i `a` i `b`, deli i `a % b` (ostatak je samo `a` minus `b` nekoliko puta). Znači, par `(b, a % b)` ima **potpuno iste zajedničke delioce** kao par `(a, b)` - uključujući i najveći.

Ovo ponavljamo dok `b` ne postane `0`, i tada je odgovor prosto `a` (svaki broj deli 0, pa je NZD(a, 0) = a).

Pogledajmo `NZD(12, 18)`:

| korak | a | b | a % b |
| ---- | ---- | ---- | ---- |
| 1 | 12 | 18 | 12 |
| 2 | 18 | 12 | 6 |
| 3 | 12 | 6 | 0 |
| 4 | 6 | 0 | - |

`b` je stiglo do `0`, dakle `NZD(12, 18) = 6`. 

(Primeti kako je prvi korak samo zamenio brojeve - algoritam sam ispravlja redosled!)

### A šta sa NZS?

NZS je veoma jednostavan, zahvaljujući ovoj formuli:

$$a * b = NZD(a, b) * NZS(a, b)$$

Dakle:

$$NZS(a, b) = \frac{a*b}{NZD(a, b)}$$
### Implementacija

Kada implementiramo NZS, želimo da ga zapišemo kao $NZS(a,b) = a/nzd(a,b) * b$, ovo je potpuno isto kao formula iznad, ali ne rizikuje overflow

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

long long nzd(long long a, long long b){

    while(b != 0){

        long long r = a % b;
        a = b;
        b = r;
    }

    return a;
}

long long nzs(long long a, long long b){

	return a / nzd(a,b) * b; // Prvo delimo, pa množimo

}

int main(){

    long long a = 12;
    long long b = 18;

    long long g = nzd(a, b);
    long long l = nzs(a,b);

    cout<<"NZD: "<<g<<'\n';
    cout<<"NZS: "<<l;

    return 0;
}
```
Output:
`NZD: 6`
`NZS: 36`

Vremenska složenost: **O(log(min(a, b)))**

Može se dokazati da se brojevi smanje bar duplo na svaka dva koraka - odatle dolazi logaritam.

>Napomena:
>C++ ovo već ima ugrađeno: `__gcd(a, b)` radi odmah, a od C++17 postoje i `gcd(a, b)` i `lcm(a, b)`. Slobodno ih koristi, ali imaj u vidu da neki judge sistemi možda ne prihvataju C++ 17 (npr. Petlja)
