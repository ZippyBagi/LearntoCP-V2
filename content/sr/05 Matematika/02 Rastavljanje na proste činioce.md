>U ovoj lekciji naučićemo kako da rastavimo bilo koji broj na njegove proste činioce

Svaki ceo broj veći od `1` može da se zapiše kao **proizvod prostih brojeva**, i to na tačno jedan način.

Na primer:

`84 = 2 * 2 * 3 * 7`
`97 = 97` (već je prost)
`360 = 2 * 2 * 2 * 3 * 3 * 5`

	![[prime-factor-tree.png|Stablo činilaca koje razlaže 360 korak po korak, deljenjem sa 2 tri puta pa sa 3 dva puta, i ostavlja rastavljanje 2 puta 2 puta 2 puta 3 puta 3 puta 5]]

Ovo se zove **rastavljanje na proste činioce** (en. prime factorization), i toliko je fundamentalno da su matematičari ovo pravilo nazvali Osnovna teorema aritmetike.
### Teorija

Da bismo pronašli činioce, sve što treba da radimo je da uzastopno delimo brojeve

Prolazimo kroz kandidate `d = 2, 3, 4...` i za svaki:

- Dok god `d` deli `n` - ispišemo `d` i podelimo `n` sa `d`

Time što odmah delimo `n`, obezbeđujemo da se svaki prost broj ispiše **onoliko puta koliko se pojavljuje** u faktorizaciji.

Ovaj jednostavni algoritam ispisuje samo proste brojeve, zato što je svaki složeni broj već ispisan kao proizvod manjih prostih.

Npr: `18 = 2 * 3 * 3` 

`6` deli 18, ali se ne pojavljuje, jer je već tu u obliku `2 * 3`

### Još jedan trik

Baš kao kod provere prostosti iz prošle lekcije, dovoljno je probati `d` samo do `sqrt(n)`.

To je zato što broj `n` može imati **najviše jedan** prost činilac veći od `sqrt(n)` (dva takva pomnožena bi već bila veća od `n`).

Zato nakon što se petlja završi, ako je `n` i dalje veće od `1` - ono što je ostalo upravo **jeste** taj jedan veliki prost činilac, i ispisujemo ga direktno.

### Implementacija

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    long long n;
    cin>>n;

    for(long long d = 2; d * d <= n; d++){

        while(n % d == 0){ //dok god d deli n

            cout<<d<<" ";
            n = n / d;
        }
    }

    if(n > 1){ //ono što je ostalo je prost činilac veći od sqrt(n)
        cout<<n;
    }

    return 0;
}
```
Input: `84`
Output: `2 2 3 7`

Input: `97`
Output: `97`

Input: `360`
Output: `2 2 2 3 3 5`

Vremenska složenost: **O(sqrt(n))**

>Napomena:
>Probaj da izbaciš `if(n > 1)` proveru i faktorizuješ `97`. Program ne ispisuje ništa! Petlja nikada ne nađe delilac jer je 97 prost, pa nas upravo ta poslednja provera spašava.
