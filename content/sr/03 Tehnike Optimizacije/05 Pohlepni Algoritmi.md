>U ovoj lekciji naučićemo vrstu algoritama izgrađenu na jednoj prostoj ideji: uvek uzmi ono što trenutno izgleda najbolje!

Algoritam je **pohlepan** (en. greedy) ako u svakom koraku pravi izbor koji izgleda najbolje **u tom trenutku**, i nikada se ne vraća da se predomisli.

Kada pohlepni algoritam radi, to je obično najjednostavnije i najbrže moguće rešenje. Problem je što ne radi uvek, pa moramo biti oprezni kada ga koristimo.
### Pohlepni koji radi

>Treba da platimo sumu od **k** dinara novčićima od 100, 50, 20, 10, 5, 2 i 1 dinar. Koji je najmanji broj novčića koji možemo iskoristiti?

Pohlepni instinkt: uvek uzmi **najveći novčić koji još uvek staje**.

Za `k = 231`: uzmemo `100` (ostaje 131), uzmemo `100` (ostaje 31), uzmemo `20` (ostaje 11), uzmemo `10` (ostaje 1), uzmemo `1` (ostaje 0).

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    vector<int> coins = {100, 50, 20, 10, 5, 2, 1};

    int k = 231;
    int count = 0;

    for(int i=0;i<coins.size();i++){

        while(k >= coins[i]){ //uzimamo najveći novčić dok god staje
            k -= coins[i];
            count++;
        }
    }

    cout<<count;

    return 0;
}
```
Output: `5`

Za ove vrednosti novčića, pohlepni pristup uvek daje minimum.
### Pohlepni koji ne radi

Promeni novčiće u `{4, 3, 1}` i neka je `k = 6`.

- Pohlepni: uzima `4` (ostaje 2), pa `1`, pa `1` => **3 novčića**
- Optimalno: `3 + 3` => **2 novčića**

	![[greedy-fails.png|Kontraprimer za pohlepni algoritam sa novčićima 4, 3 i 1 i ciljem 6: pohlepni uzima 4 pa 1 pa 1, ukupno tri novčića, dok je najbolje rešenje 3 plus 3, samo dva novčića]]

Da li ovaj algoritam radi ili ne zavisi u potpunosti od vrednosti novčića. Postoji zanimljiva matematika iza toga zašto se ovo dešava, ali to prevazilazi okvire ove lekcije.

>Uvek detaljno treba proveriti da li pohlepna strategija radi pre nego što je implementirana.
