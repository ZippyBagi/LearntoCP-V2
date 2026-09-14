> U ovoj lekciji naučićemo kako da rastavimo broj na proste činioce u O(log n) uz malo pripreme

Kada želimo da rastavimo veliki broj brojeva, neefikasno je raditi to jedan po jedan u O(sqrt(n)).

Umesto toga, napravićemo posebnu vrstu Sita u O(max(n)) koje će drastično ubrzati stvari.

### Priprema

Ideja je jednostavna - za svaki broj čuvamo njegov **najmanji prost delilac**!

Slično kao kod običnog Sita. Napravimo niz `sieve` veličine `n` gde je `sieve[i] = i`, a zatim:

1. Uzmemo najmanji broj gde je `sieve[i] = i` - on je **prost**.
2. Za **sve njegove umnoške**, ako još nisu menjani (ako je `sieve[j] == j`), postavimo `sieve[j] = i` - njihov najmanji prost delilac je `i`.
3. Ponovimo.

Gde god je `sieve[i] == i`, taj broj je prost.

Evo gotovog sita za prvih `50` brojeva. Svaka ćelija prikazuje broj i **najmanji prost činilac** koji je za njega sačuvan. Prosti brojevi su uokvirene ćelije, gde je `sieve[i] == i`:

	![[smallest-prime-factor.png|Mreža brojeva od 1 do 50, gde je svaka ćelija označena svojim najmanjim prostim činiocem i obojena prema tome da li je taj činilac 2, 3, 5 ili 7, dok su prosti brojevi uokvirene ćelije kod kojih je činilac sam broj]]

### Rastavljanje na činioce

Sada svaki broj `x` možemo rastaviti tako što ga uzastopno delimo sa `sieve[x]`, pamteći čime smo ga podelili.

Ponavljamo ovaj postupak `while(x > 1)`

Na primer `36`:

| x   | sieve[x] | prosti činioci | Novo x |
| --- | -------- | -------------- | ------ |
| 36  | 2        | 2              | 18     |
| 18  | 2        | 2,2            | 9      |
| 9   | 3        | 2,2,3          | 3      |
| 3   | 3        | 2,2,3,3        | 1      |

### Kod

Sito gradimo **jednom** u globalni niz, pa ga zatim koristimo za koliko god upita želimo. `create_sieve` popunjava `sieve[x]` najmanjim prostim deliocem broja `x`, a `factorize` čita taj niz da rastavi bilo koje `x`:

Solution.cpp
```c++
#include <bits/stdc++.h>
using namespace std;

const int N = 1000000; // gradimo sito do N
vector<int> sieve(N + 1); // sieve[x] = najmanji prost delilac broja x

void create_sieve(){
    for(int i = 1; i <= N; i++){
        sieve[i] = i; // pocetak: pretpostavimo da je x sam sebi najmanji delilac
    }
    
    for(int i = 2; i * i <= N; i++){
        if(sieve[i] == i){ // i nikad nije diran -> i je prost
        
            for(int j = i * i; j <= N; j += i){
            
                if(sieve[j] == j){ // j jos nije diran
                    sieve[j] = i; // i je najmanji prost delilac broja j
                }
            }
        }
    }
}

vector<int> factorize(int x){
    vector<int> primes;
    
    while(x > 1){
    
        int p = sieve[x]; // najmanji prost delilac broja x
        
        while(x % p == 0){ // izvlacimo svaku kopiju broja p
            primes.push_back(p);
            x /= p;
        }
    }
    
    return primes;
}

int main(){
    create_sieve(); // priprema koja se radi jednom

    int x = 36;
    vector<int> factors = factorize(x); // koristimo sito za bilo koje x

    cout << x << " = ";
    for(int i = 0; i < factors.size(); i++){
    
        cout << factors[i];
        
        if(i + 1 < factors.size()) cout << " * ";
    }
    
    cout << "\n";
    
    return 0;
}
```
Output: `36 = 2 * 2 * 3 * 3`

Vremenska složenost:

`create_sieve` - O(N log log N) što je otprilike O(N), a N je najveći element
`factorize` - svaki poziv je O(log x)
