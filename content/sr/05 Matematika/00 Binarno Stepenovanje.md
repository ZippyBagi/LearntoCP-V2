
### Binarno Stepenovanje  ( Brzo Stepenovanje )

Želimo da efikasno izračunamo `a^b`.

Intuitivno rešenje je da to zapišemo kao:

`a * a * a * a...` - b puta

Što nam daje složenost **O(b)**, ali postoji bolji način.

Pogledajmo primer, `3^10`, uz pomoć matematike možemo ga prepisati kao:

**3^10 = (3^5)^2**
**3^5 = 3 * 3^4**
Ponovo ponavljamo isti postupak: **3^4 = (3^2)^2**
I **3^2 = 3*3**

Pogledajmo sada celu jednačinu:

**(3 * ( 3 * 3 )^2 )^2**

Ako izbrojimo operacije, dobijamo `5`, u poređenju sa `10` koliko bi trebalo da smo množili trojkom 10 puta

	![[binary-exponentiation.png|Binarno stepenovanje svodi 3^10 u pet koraka, gde svaki red prepolovi paran izložilac kvadriranjem osnove ili izdvoji jedan činilac kada je izložilac neparan, i stiže do 59049 sa pet množenja umesto deset]]

Što je `b` veće, više vremena štedimo na ovaj način.

Za opšti slučaj, algoritam izgleda ovako ( ans = 1 na početku ):

- Ako je `b` parno, onda `a = a*a` i `b = b/2`
- Ako je `b` neparno, onda `ans = ans * a`, i `b = b-1`
- Ponavljamo dok ne bude `b<=0`

Kod izgleda ovako:

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    long long a = 3; //long long je kao int, ali čuva veće brojeve
    long long b = 10;

    long long ans = 1;

    while(b > 0){

        if(b % 2 == 0){ // ovo nam govori da li je b parno
            a = a*a;
            b = b/2;
        }else{
            ans = ans * a;
            b = b-1;
        }
    }

    cout<<ans;

	return 0;
}
```
Output: `59049`

Složenost ovog algoritma je **O(log b)**
