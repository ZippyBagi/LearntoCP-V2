> U ovoj lekciji upoznaćemo se sa posebnom vrstom sortiranja koja radi u vremenskoj složenosti **O(n + m)**!

Iako je ova tehnika veoma brza, postoji jedno važno ograničenje - radi samo kada sortiramo **relativno male nenegativne brojeve**  
(otprilike brojeve `<= 10^5` i `>= 0`).

Hajde da vidimo zašto.
### Teorija

Zamislimo da imamo niz:

`a = 4, 5, 6, 3, 1, 7, 3`

Glavna ideja je da svaki broj posmatramo kao **indeks**.

Napravimo pomoćni niz `b` i postavimo sve njegove vrednosti na `0`.

`b[i]` će čuvati koliko puta se vrednost `i` pojavljuje.

Zatim za svaki element iz niza `a` povećavamo `b[a[i]]` za jedan.

**i = 0 => a[i] = 4 => b[4] = 0 + 1 = 1**

**i = 1 => a[i] = 5 => b[5] = 0 + 1 = 1**

Kada ovo uradimo za sve elemente, niz `b` izgleda ovako:

![[Couning Sort.jpg|Tabela prebrojavanja kod counting sorta: red i sadrži indekse od 0 do 7, a red b broj pojavljivanja svake vrednosti, 0 1 0 2 1 1 1 1]]

Da bismo ispisali sortiran niz, samo prolazimo kroz `b` i ispisujemo `i`, tačno `b[i]` puta!

> Napomena:  
> Duplikati se automatski pravilno obrađuju, jer `b[i]` čuva koliko puta se element pojavio.

### Implementacija

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    vector<int> a = {4, 5, 6, 3, 1, 7,3};

    vector<int> b(100, 0); //biramo veličinu za koju znamo da je veća od najvećeg elementa u nizu

    for(int i=0;i<a.size();i++){
        b[a[i]]++;
    }

    for(int i =0;i<b.size();i++){

        for(int j=0; j<b[i];j++){ //ispisujemo i, b[i] puta
            cout<<i<<" ";
        }
    }

    return 0;
 }
```

Niz: `4 5 6 3 1 7 3`  
Output: `1 3 3 4 5 6 7`

Vremenska složenost: **O(m + n)**, gde je `m` maksimalna vrednost u nizu `a`.

> Važno je napomenuti da ako je `m` prevelik, možemo dobiti **MLE (Memory Limit Exceeded)** i program neće moći da se izvrši.  
> Zato ova tehnika funkcioniše samo kada su vrednosti relativno male.