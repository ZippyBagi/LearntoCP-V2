> U ovoj lekciji naučićemo kako da efikasno pronalazimo zbir bilo kog uzastopnog segmenta elemenata u nizu!

U prethodnoj lekciji (Zbir brojeva od 1 do n) naučili smo kako da pronađemo zbir brojeva od 1 do n.

Ali šta ako umesto toga želimo da nađemo zbir elemenata u nizu?

### Zbir elemenata od 0 do n

Ovog puta ne znamo unapred koje su vrednosti elemenata, pa je jedino rešenje da prođemo kroz niz i saberemo sve elemente.

~!
```c++
int main(){

	vector<int> a = {6,7,10,3,-3,5};

    int n = a.size(); //broj elemenata u nizu

    int sum = 0;

    for(int i =0;i<n;i++){

        sum += a[i];
    }

    cout<<sum;

	return 0;
}
```

Elementi su: `6 7 10 3 -3 5`  
Output: `28`  
Vremenska složenost: **O(n)**

### Zbir elemenata od a do b

Šta ako želimo da pronađemo zbir elemenata od indeksa **a** do indeksa **b**? I još važnije - šta ako ovo želimo da ovo uradimo mnogo puta, za različite vrednosti `a` i `b`?

Ako za svaki upit prolazimo kroz niz, dobijamo složenost **O(n * q)**  (gde je `q` broj upita), što je prilično sporo. 
U praksi je to često približno **O(n^2)** kada je `q = n`.

Srećom, postoji mnogo bolje rešenje.

Setimo se formule:

`Zbir(od x do n) = Zbir(od 0 do n) - Zbir(od 0 do x-1)`

Sada nam samo treba brz način da pronađemo `Zbir(od 0 do x)`.

Stanite na trenutak i pokušajte da smislite kako bismo ovo mogli da uradimo u **O(1)** vremenu.  
(Hint: pogledajte prethodnu lekciju o zbiru brojeva od 1 do n)

~!
```c++
int main(){

	vector<int> a = {6,7,10,3,-3,5};

    int n = a.size();

    int sum = 0;

    vector<int> sums(n); //pomoćni vektor

    for(int i =0;i<n;i++){
        sum += a[i];
        sums[i] = sum; // sums[i] čuva zbir od 0 do i
    }

    for(int i = 0;i <n;i++){
        cout<<sums[i]<<" ";
    }

	return 0;
}
```

Elementi: `6 7 10 3 -3 5`  
Output: `6 13 23 26 23 28`

Rešenje je da unapred izračunamo sve prefiksne zbirove i sačuvamo ih u posebnom vektoru!

Sada `sums[i]` predstavlja: `Zbir(od 0 do i)`

Pa pronalaženje zbira od `a` do `b` postaje:

`Zbir(od a do b) = sums[b] - sums[a-1]`

	![[prefix-sum.png|Niz a iznad svog niza prefiksnih zbirova sums, sa strelicama koje pokazuju kako se zbirovi nagomilavaju, i zbir opsega od indeksa 2 do 4 izračunat kao sums[4] minus sums[1], 23 minus 13, jednako 10]]

Treba obratiti pažnju na slučaj kada je `a == 0`, jer tada samo želimo zbir od `0` do `b`.

Kompletno rešenje izgleda ovako:

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    cin.tie(0);
    ios_base::sync_with_stdio(false);

	int n;

	cin>>n;

	vector<int> values(n);

	for(int i = 0;i<n;i++){
        cin>>values[i];
	}

	vector<int> sums(n); // pomoćni vektor
	int sum = 0;
	
	for(int i =0; i<n; i++){
        sum += values[i];
        sums[i] = sum; // sums[i] čuva zbir od 0 do i
	}

	int q; // broj upita
	cin>>q;

	for(int i=0;i<q;i++){

        int a;
        int b;
        cin>>a>>b; //unosimo upit

        if(a == 0){ //ako je a == 0, želimo zbir od 0 do b
        
            cout<<sums[b]<<'\n';
            continue; //preskačemo ostatak koda i prelazimo na sledeći upit
        
        }
        
        cout<<sums[b] - sums[a-1]<<'\n';
	}
}
```

Input:  
`6` - n  
`6 7 10 3 -3 5` - naš niz  
`4` - q  
`0 5`  
`3 4`  
`2 4`  
`3 5`
Output:
`28` - od 0 do 5  
`0` - od 3 do 4  
`10` - od 2 do 4  
`5` - od 3 do 5

Vremenska složenost: **O(n + q)**

> Ova tehnika naziva se Zbir Prefiksa (en. Prefix Sum)!