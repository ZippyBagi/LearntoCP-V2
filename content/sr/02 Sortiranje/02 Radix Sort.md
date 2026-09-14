>U ovoj lekciji upoznaćemo se sa poboljšanom verzijom Sortiranja Prebrojavanjem

U prošloj lekciji smo naučili Sortiranje Prebrojavanjem, koje je veoma brzo, ali prestaje da radi kada su vrednosti velike (veće od 10^5).

Radix Sort rešava upravo taj problem. Vrednosti mogu biti koliko god velike želimo, jer nikada ne koristimo ceo broj kao indeks - već samo **jednu cifru u jednom trenutku**.

Pošto je cifra uvek između `0` i `9`, možemo koristiti Sortiranje Prebrojavanjem!
### Teorija

Ideja je da sortiramo niz više puta, jednom za svaku cifru:

1. Sortiramo sve brojeve po **cifri jedinica**
2. Zatim ih sortiramo po **cifri desetica**
3. Pa po **cifri stotina**, i tako dalje...

Ponavljamo dok ne potrošimo sve cifre (broj cifara najvećeg elementa).

Jedino pravilo kog se moramo držati: kada dva broja imaju istu cifru, moraju **zadržati redosled u kom su bili** (ovo se zove **stabilno** sortiranje).

Primer: `a = 170, 45, 75, 90, 802, 24, 2, 66`

| Prolaz | Sortiramo po | Niz nakon prolaza |
| ---- | ---- | ---- |
| 1 | jedinicama | `170, 90, 802, 2, 24, 45, 75, 66` |
| 2 | deseticama | `802, 2, 24, 45, 66, 170, 75, 90` |
| 3 | stotinama | `2, 24, 45, 66, 75, 90, 170, 802` |

Kada poredimo brojeve sa različitim brojem cifara, manjem broju jednostavno dodamo vodeće nule: (npr. `2` i `802`, možemo pisati `002`)

Proveri drugi prolaz: `802` i `2` oba imaju `0` na mestu desetica, pa dolaze prvi, i ostali su u istom redosledu kao posle prvog prolaza.

### Sortiranje po jednoj cifri

Da bismo sortirali niz cifru po cifru, koristimo **kofice (buckets)**

Napravimo 10 kofica, po jednu za svaku cifru `0-9`. Zatim:

- prolazimo kroz niz, i ubacujemo svaki broj u koficu njegove trenutne cifre

Dakle, kada sortiramo po cifri jedinica, `45` ide u koficu `5`, a `170` u koficu `0`.

- zatim prolazimo kroz kofice redom, od `0` do `9`, i vraćamo brojeve nazad u niz

Brojevi iz manje kofice dolaze prvi, pa je niz sada sortiran po toj cifri. A pošto kofice punimo sleva nadesno, i praznimo sleva nadesno, brojevi sa istom cifrom **zadržavaju svoj redosled** - ovo čuva stabilnost sortiranja

	![[radix-buckets.png|Jedan prolaz radix sorta po cifri jedinica: niz 170 45 75 90 802 24 2 66 se raspoređuje u deset kofica po poslednjoj cifri i čita nazad redom, pri čemu 802 i 2 završavaju u istoj kofici 2 i zadržavaju svoj prvobitni redosled]]

Da bismo izvukli cifru, koristimo pomoćnu promenljivu `place`, koja je `1` za jedinice, `10` za desetice, `100` za stotine...

`digit = (a[i] / place) % 10`

- deljenje sa `place` odseca sve desno od naše cifre
- `% 10` odseca sve levo od nje

Na primer, za `802` kada sortiramo po deseticama: `802 / 10 = 80`, zatim `80 % 10 = 0` - cifra desetica je `0`.

Nastavljamo dok ne potrošimo cifre najvećeg elementa, tj. dok god je `mx / place > 0`
### Kod

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    vector<int> a = {170, 45, 75, 90, 802, 24, 2, 66};

    int mx = a[0]; // mx će čuvati najveći element
    
    for(int i=0;i<a.size();i++){
	    mx = max(mx,a[i]);
    }

    for(long long place = 1; mx / place > 0; place *= 10){ //place je 1, 10, 100...

        vector<vector<int>> buckets(10); //jedna kofica za svaku cifru 0-9

        for(int i=0;i<a.size();i++){

            int digit = (a[i] / place) % 10; //cifra na trenutnoj poziciji
            buckets[digit].push_back(a[i]);
        }

        int idx = 0;

        for(int d=0;d<10;d++){ //vraćamo elemente nazad, koficu po koficu

            for(int i=0;i<buckets[d].size();i++){
                a[idx] = buckets[d][i];
                idx++;
            }
        }
    }

    for(int i=0;i<a.size();i++){
        cout<<a[i]<<" ";
    }

    return 0;
}
```
Niz: `170 45 75 90 802 24 2 66`
Output: `2 24 45 66 75 90 170 802`

Vremenska složenost: **O(d * n), gde je d broj cifara najvećeg elementa**

>Napomena:
	Iako radix sort može biti zaista brz, koristan je samo u određenim situacijama - može da sortira samo brojeve, i još važnije, kada su brojevi veliki, `d` može biti veće nego `log n`.
