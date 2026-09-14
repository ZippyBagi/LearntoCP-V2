>U ovoj lekciji naučićemo šta su prosti brojevi i kako da proverimo da li je broj prost!

Broj je **prost** ako je deljiv samo sa `1` i samim sobom.

Prvih nekoliko prostih brojeva: `2, 3, 5, 7, 11, 13, 17...`

>`1` **nije** prost broj! 

Hajde da vidimo kako se proverava da li je broj prost
### Brute force provera

Najjednostavniji način je da probamo svaki broj od `2` do `n-1`, i ako bilo koji od njih deli `n`, broj nije prost.

~!
```c++
	bool is_prime = true;

	for(long long i = 2; i < n; i++){
		if(n % i == 0){
			is_prime = false;
		}
	}
```

Ovo radi, ali je složenost **O(n)**. A to je presporo.

Možemo mnogo bolje.
### Delioci dolaze u parovima

Ključno zapažanje: ako `d` deli `n`, onda i `n / d` deli `n`.

Na primer, za `n = 36`:

`1 * 36`
`2 * 18`
`3 * 12`
`4 * 9`
`6 * 6`

Svaki delilac veći od `6` je uparen sa deliocem manjim od `6`. A `6` je tačno `sqrt(36)`.

Drugim rečima: **ako n ima bilo koji delilac, ima i jedan koji je <= sqrt(n)**

	![[divisor-pairs.png|Delioci broja 36 poređani od 1 do 36, sa lukovima koji spajaju svaki mali delilac sa njegovim velikim parom, 1 sa 36, 2 sa 18, 3 sa 12 i 4 sa 9, i sastaju se kod korena 6 u sredini]]

Zato umesto da proveravamo sve do `n`, dovoljno je proveriti do `sqrt(n)`. 
### Implementacija

Umesto da pišemo `i <= sqrt(n)` (funkcija `sqrt` radi sa decimalnim brojevima, što može dovesti do grešaka u preciznosti), isti uslov zapisujemo kao `i * i <= n`:

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    long long n;
    cin>>n;

    if(n < 2){ //0 i 1 nisu prosti
        cout<<n<<" nije prost";
        return 0;
    }

    for(long long i = 2; i * i <= n; i++){

        if(n % i == 0){ //našli smo delilac, n nije prost

            cout<<n<<" nije prost";
            return 0;
        }
    }

    cout<<n<<" je prost";

    return 0;
}
```
Input: `97`
Output: `97 je prost`

Input: `91`
Output: `91 nije prost` (91 = 7 * 13)

Vremenska složenost: **O(sqrt(n))**

Za `n = 10^18`, to je oko `10^9` operacija umesto `10^18` - ogromna razlika.

>Napomena:
>I `i` mora biti `long long`! Da je `i` bio `int`, `i * i` bi se prepunio (overflow) za veliko `n`, i petlja bi se pokvarila!
