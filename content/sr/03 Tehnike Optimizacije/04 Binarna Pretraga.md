> U ovoj lekciji naučićemo jednu od najbržih tehnika za proveru da li se neki element nalazi u nizu - Binarnu Pretragu (en. Binary Search)

Najlakši način da razumemo ovu tehniku je kroz jednu igru.

- Zamislite bilo koji broj od 1 do 1000 (nazovimo ga `k`), a ja imam pravo da postavim 10 pitanja i nakon toga garantovano znam koji ste broj zamislili.

Koja su to pitanja?

- Pitanja su oblika: "Da li je `k` veće od broja na sredini?"
Dakle, prvo pitanje bi bilo: `Da li je k veće od 500`

- Ako jeste, znamo da se `k` nalazi između 500 i 1000.
- Ako nije, znamo da je između 1 i 500.

Pretpostavimo da je `k = 625`, tada naš opseg postaje 500-1000.

- Sledeće pitanje je: `Da li je k veće od 750`

Sada se opseg smanjuje na 500-750, i tako dalje...

Nakon 10 pitanja garantovano znamo koji je broj `k`. Ali zašto?

### Zašto ovo funkcioniše?

Na početku postoji 1000 mogućih vrednosti za `k`.
Nakon svakog pitanja taj broj se prepolovi.

Ako pogledamo koliko mogućnosti ostaje nakon svakog koraka, dobijamo:

`1000, 500, 250, 125, 63, 32, 16, 8, 4, 2, 1`

Nakon 10 pitanja ostaje samo jedna moguća vrednost - i to je naš broj.

### Teorija

**Binarna Pretraga** funkcioniše na potpuno isti način.

U zadatku imamo niz `a`,  broj `k` koji tražimo i `n` elemenata u nizu

Ideja je da napravimo oko `log(n)` poređenja i proverimo da li smo pronašli `k`.

> Napomena:  
> Binarna Pretraga radi samo kada je niz sortiran!

Počinjemo sa dva pokazivača: `left = 0`  i `right = n-1`

Zatim:

- pronađemo sredinu: `middle = (left + right) / 2`

- proverimo da li je: `a[middle] == k`

Ako jeste - pronašli smo rešenje. Ako nije:

- proveravamo da li je: `k > a[middle]`

Ako jeste, nijedan broj manji od `a[middle]` ne može biti rešenje, pa bezbedno pomeramo: `left = middle + 1`

- zatim proveravamo: `k < a[middle]`

Po istoj logici, nijedan broj veći od `a[middle]` ne može biti rešenje, pa pomeramo: `right = middle - 1`

Ovaj proces ponavljamo dok:
- ne pronađemo `k`
- ili dok se pokazivači ne sretnu: `while(left <= right)`

Važno je primetiti da moramo uključiti i slučaj kada je `left == right`.

	![[binary-search.png|Četiri koraka binarne pretrage za brojem 12 u sortiranom nizu od deset elemenata, gde svaki red označava srednji element narandžastom bojom, siva odbačenu polovinu, i završava se pronađenim brojem 12 u zelenoj boji]]

### Implementacija

**Problem:** Dat je niz **a** od **n** elemenata. Postavlja se **q** pitanja, za svako pitanje unosi se jedan element i treba odgovoriti da li se taj element nalazi u nizu **a**. 

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    int n;
    cin>>n;

    vector<int> a(n);

    for(int i=0; i< n;i++){
        cin>>a[i];
    }

    sort(a.begin(), a.end()); //moramo sortirati niz!

    int q;
    cin>> q; //broj upita koje proveravamo

    while(q--){ //ova petlja će se izvršiti tačno q puta

        int k;
        cin>>k;

        int left = 0;
        int right = n-1;

        bool found_k = false;

        while(left <= right){

            int middle = (left + right) / 2;

            if(a[middle] == k){

                cout<<k<<" je u nizu!"<<'\n'; //pronašli smo rešenje
                found_k = true;
                break;

            }else if(k > a[middle]){

                left = middle + 1; //nijedna vrednost manja od a[middle] ne može biti rešenje

            }else if (k < a[middle]){

                right = middle - 1; //nijedna vrednost veća od a[middle] ne može biti rešenje
            }
        }
        
        if(found_k == false){ //proveravamo da li smo pronašli k ili su se pokazivači sreli
            cout<<k<<" nije u nizu!"<<'\n';
        }

    }

    return 0;
}
```

Input:

`6` - n  
`10 3 4 6 8 27` - naš niz  
`3` - q  
`10` - prvo k  
`45` - drugo k  
`2` - treće k  

Output:

`10 je u nizu!`  
`45 nije u nizu!`  
`2 nije u nizu!`

Vremenska složenost: **O(n log n + q log n)**, što možemo zapisati i kao: **O( (n+q) log n )**

> Napomena:  
> Ako proveravamo samo jednom da li se element nalazi u nizu, brute force pristup može biti brži - jer radi u **O(n)** i ne zahteva sortiranje.
>
> Međutim, kada imamo mnogo upita, brute force postaje **O(n*q)**, dok Binarna Pretraga ostaje mnogo efikasniji sa složenošću **O((n+q) log n)**.