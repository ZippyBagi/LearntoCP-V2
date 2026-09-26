
## Pristup

### Nalaženje dužine

Prvo primećujemo da bilo koji element sam za sebe čini podniz dužine $1$.

Zatim definišemo $dp[i]$ kao dužinu najdužeg rastućeg podniza koji **počinje** na poziciji $i$. Sa elementa $i$ možemo skočiti na bilo koji **kasniji** element koji je **veći**, i nastaviti odatle - dakle najbolje što možemo je da uzmemo skok sa najdužim nastavkom:

$$dp[i] = 1 + max(dp[j]) \quad \text{za sve } j > i \text{ gde je } a[j] > a[i]$$

Ako takav element ne postoji, $dp[i] = 1$ (podniz se ovde završava). Pošto svaki $dp[i]$ zavisi samo od vrednosti **desno** od sebe, niz računamo zdesna nalevo.

Za naš primer to daje:

| $a_i$ | 3 | 6 | 1 | 2 | 8 | 2 | 4 | 5 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| $dp_i$ | 3 | 2 | 4 | 3 | 1 | 3 | 2 | 1 |

Proveri nekoliko vrednosti ručno: element $1$ ima $dp = 4$ jer tu počinje $1, 2, 4, 5$, a element $6$ ima $dp = 2$ jer je jedino veće posle njega $8$.

Dužina LIS-a je najveća vrednost u tabeli: $k = 4$.

(Češće ćeš videti simetričnu definiciju, "LIS koji se **završava** na poziciji $i$", koja se računa sleva nadesno - obe su podjednako ispravne. Mi koristimo ovu zato što ona čini rekonstrukciju ispod veoma prirodnom.)

### Rekonstrukcija leksikografski najmanjeg LIS-a

Tabela $dp$ je kao mapa: element sa $dp[i] = 4$ je mesto sa koga još 4 elementa mogu da se izaberu, a posle njega nam treba element sa $dp = 3$, pa $dp = 2$, i tako dalje. Zato rešenje gradimo sleva nadesno, i u svakom koraku kandidati su elementi koji dolaze **posle** prethodno izabranog, **veći** su od njega i imaju **odgovarajuću $dp$ vrednost**. Među kandidatima uvek biramo najmanji - to je upravo ono što znači "leksikografski najmanji".

Za naš primer:

| Tražimo | Kandidati | Biramo |
|:---:|:---:|:---:|
| $dp = 4$ | $1$ | $1$ |
| $dp = 3$, posle $1$, veći od $1$ | $2, 2$ | $2$ (prvi od njih) |
| $dp = 2$, posle tog $2$, veći od $2$ | $4$ | $4$ |
| $dp = 1$, posle $4$, veći od $4$ | $5$ | $5$ |

Rešenje je $1\ 2\ 4\ 5$.

Zašto je biranje najmanjeg uvek bezbedno? Zato što je sama $dp$ vrednost **garancija**: $dp[i] = 3$ znači da rastući nastavak od 3 elementa zaista postoji odatle, pa nikada ne možemo da se zaglavimo.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    iostream::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;

    vector<long long> a(n);
    for(int i = 0; i < n; i++){
        cin >> a[i];
    }

    // dp[i] = dužina najdužeg strogo rastućeg podniza koji počinje na poziciji i
    vector<int> dp(n, 1);

    for(int i = n - 1; i >= 0; i--){
        for(int j = i + 1; j < n; j++){
            if(a[j] > a[i]){
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
    }

    int k = *max_element(dp.begin(), dp.end()); // zgodna c++ funkcija, može se zameniti for petljom

    cout << k << '\n';

    // pohlepna rekonstrukcija leksikografski najmanjeg LIS-a
    int pos = -1;               // indeks prethodno izabranog elementa
    long long last = LLONG_MIN; // vrednost prethodno izabranog elementa

    for(int need = k; need >= 1; need--){

        int best = -1;

        for(int i = pos + 1; i < n; i++){
            if(dp[i] == need && a[i] > last){
                if(best == -1 || a[i] < a[best]){
                    best = i;
                }
            }
        }

        cout << a[best] << " ";

        pos = best;
        last = a[best];
    }
}
```

## Složenost

Vremenska složenost je $O(n^2)$
Memorijska složenost je $O(n)$

Za veće ulaze postoji brži, $O(n \log n)$ način da se nađe dužina LIS-a - pogledaj zadatak [Najduži rastući podniz II](/sr/Problems/lis-2).
