> U ovoj lekciji upoznaćemo se sa jednom od najosnovnijih, ali i veoma efikasnih optimizacionih tehnika - tehnikom dva pokazivača (two pointers)

Iako se zove “two pointers”, ova tehnika nema veze sa tipom podataka `pointer`  
(o njima ćemo pričati u nekoj drugoj lekciji).

Suština ove tehnike je poseban način prolaska kroz niz, koji nam omogućava da izbegnemo poređenje svakog elementa sa svakim drugim elementom.

Da bismo bolje razumeli kako funkcioniše, pogledajmo jedan problem.
### Problem

> Dat je broj **k** i sortiran niz celih brojeva.  Potrebno je pronaći dva elementa čiji je zbir jednak `k` i ispisati ih.  Ako takvi elementi ne postoje, ispisati `-1`.

### Brute force rešenje

Brute force pristup je prilično jednostavan - koristimo dve ugnježdene for petlje.

Ideja je sledeća:

> Za svaki element niza proveravamo da li zajedno sa nekim drugim elementom daje zbir `k`.

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    cin.tie(0);
    ios_base::sync_with_stdio(false);

    int n,k;

    cin>>k;
    cin>>n;

    vector<int> a(n);

    for(int i=0;i<n;i++){
        cin>>a[i];
    }

    for(int i=0;i<n;i++){
        for(int j=i+1;j<n;j++){
            if(a[i] + a[j] == k){
                cout<<a[i]<<" "<<a[j];
                return 0;
            }
        }
    }

    cout<<-1;

    return 0;
}
```

Vremenska složenost ovog rešenja je **O(n^2)**, ali možemo bolje.

### Two pointers tehnika

Umesto da poredimo svaki element sa svakim drugim elementom, možemo prolaziti kroz niz na mnogo pametniji način.

1. Postavimo jedan pokazivač na početak niza:  `int left = 0;`
2. Drugi pokazivač postavimo na kraj niza:   `int right = n-1;`
3. Zatim proveravamo da li važi: `a[left] + a[right] == k`
   Ako važi - pronašli smo rešenje.

4. Ako zbir nije jednak `k`, proveravamo da li je: `a[left] + a[right] > k`

   Ako jeste, nema potrebe da dalje proveravamo element `a[right]`.

   Pošto je niz sortiran, `a[left]` predstavlja najmanji broj koji trenutno posmatramo. Ako je čak i sa njim zbir prevelik, onda će svaki element desno od `left` dati još veći zbir. Zato možemo bezbedno pomeriti desni pokazivač ulevo: `right = right - 1;`

5. Sledeći slučaj je: `a[left] + a[right] < k` 

   Sada je problem obrnut - zbir je premali.

   Pošto je `a[right]` najveći broj koji trenutno koristimo, nijedan drugi element zajedno sa `a[left]` neće dati dovoljno veliki zbir.

   Zato pomeramo levi pokazivač udesno: `left = left + 1;`

6. Ovaj proces ponavljamo sve dok:
   - ne pronađemo rešenje
   - ili dok se pokazivači ne sretnu `while(left < right)`

	![[two-pointers.png|Četiri koraka tehnike dva pokazivača u potrazi za parom sa zbirom 16 u sortiranom nizu: left kreće od 2 a right od 13, i svaki korak pomera onaj pokazivač koji poređenje isključuje, sve dok se ne nađe 5 plus 11]]

Kada ovu ideju pretvorimo u kod dobijamo: 

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    cin.tie(0);
    ios_base::sync_with_stdio(false);

    int n,k;

    cin>>k;
    cin>>n;

    vector<int> a(n);

    for(int i=0;i<n;i++){
        cin>>a[i];
    }

    int left = 0;
    int right = n-1;

    while(left < right){

        if(a[left] + a[right] == k){
        
            cout<<a[left]<<" "<<a[right];
            return 0;
        
        }else if(a[left] + a[right] > k){
        
		    right = right - 1;

        }else if(a[left] + a[right] < k){
        
            left = left + 1;
        }

    }

    cout<<-1;

    return 0;
}
```

Vremenska složenost ovog rešenja je **O(n)**.

> Napomena:  
> Da niz nije sortiran, brute force rešenje bi i dalje radilo u **O(n^2)**, dok bi two pointers pristup prvo morao da sortira niz, što dodaje još **O(n log n)** složenost zbog sortiranja.