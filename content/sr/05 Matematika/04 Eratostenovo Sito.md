>U ovoj lekciji naučićemo kako da pronađemo SVE proste brojeve do n, u skoro linearnom vremenu!

Već znamo kako da proverimo da li je jedan broj prost u **O(sqrt(n))**.

Ali šta ako zadatak pita za prostost **mnogo** brojeva? Provera svakog posebno daje **O(q * sqrt(n))**, što je često presporo.

Kad god nam treba odgovor na "da li je x prost?" mnogo puta, želimo da **unapred izračunamo** odgovore - baš kao što smo uradili sa Zbirom Prefiksa.

A za to nam treba **Eratostenovo Sito** (en. Sieve of Eratosthenes).
### Teorija

Ideja je prelepo jednostavna. Zapišemo sve brojeve od `2` do `n`, a zatim:

1. Uzmemo najmanji nedirnuti broj - on je **prost** (ništa manje ga nije precrtalo).
2. Precrtamo **sve njegove umnoške** - oni imaju delilac, pa sigurno nisu prosti.
3. Ponovimo.

Hajde da izvrtimo za `n = 30`:

- `2` je nedirnuto => prost. Precrtavamo `4, 6, 8, 10...`
- `3` je nedirnuto => prost. Precrtavamo `6, 9, 12, 15...`
- `4` je precrtano, preskačemo.
- `5` je nedirnuto => prost. Precrtavamo `10, 15, 20, 25, 30`
- ...

Šta god preživi precrtavanje - prost je: `2 3 5 7 11 13 17 19 23 29`

	![[sieve-of-eratosthenes.png|Eratostenovo sito nad brojevima od 2 do 30 u tri prolaza, precrtava umnoške dvojke, pa trojke, pa petice, i ostavlja proste brojeve 2 3 5 7 11 13 17 19 23 29]]

### Dve optimizacije

- Kada precrtavamo umnoške broja `i`, možemo krenuti od `i * i` umesto od `2 * i`. Zašto? Svaki manji umnožak broja `i` (npr. `3 * i`) ima činilac manji od `i`, pa ga je taj manji prost broj **već precrtao**.

- Upravo zbog toga, spoljna petlja treba da radi samo dok je `i * i <= n` - posle te tačke nema više ničeg novog za precrtavanje.

### Implementacija

"Precrtano" predstavljamo boolean vektorom:

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    int n = 30;

    vector<bool> is_prime(n+1, true); //sve kreće nedirnuto

    is_prime[0] = false;
    is_prime[1] = false; //seti se, 1 nije prost!

    for(int i = 2; i * i <= n; i++){

        if(is_prime[i]){ //i je nedirnut, znači prost je

            for(int j = i * i; j <= n; j += i){ //precrtavamo umnoške, krećući od i*i
                is_prime[j] = false;
            }
        }
    }

    for(int i = 2; i <= n; i++){

        if(is_prime[i]){
            cout<<i<<" ";
        }
    }

    return 0;
}
```
Output: `2 3 5 7 11 13 17 19 23 29`

I od ovog trenutka, svako pitanje "da li je x prost?" je jedno očitavanje: `is_prime[x]` - **O(1)**!

### Složenost

Na prvi pogled dve petlje izgledaju kao **O(n^2)**, ali izbroj šta zapravo radimo: za `2` precrtamo `n/2` brojeva, za `3` precrtamo `n/3`, za `5` samo `n/5`...

`n/2 + n/3 + n/5 + n/7 + ...`

Ovaj zbir raste neverovatno sporo - ukupno je **O(n log log n)**, što se u praksi skoro ne razlikuje od **O(n)**.

>Napomena:
>Sito ima istu slabost kao Sortiranje Prebrojavanjem - **memoriju**. Treba nam vektor veličine n, pa ovo radi samo za n do otprilike 10^7. Za jedan ogroman broj (npr. 10^18), koristi O(sqrt(n)) proveru iz lekcije o Prostim Brojevima.
