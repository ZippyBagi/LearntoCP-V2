
## Pristup

Prozor od $d$ transakcija klizi korak po korak: jedna transakcija ulazi spreda, jedna izlazi otpozadi, a između nam treba njegova medijana. Ponovno sortiranje prozora za svaku transakciju je $O(n d \log d)$ i daleko presporo, pa nam treba kontejner koji ostaje sortiran dok se menja - i koji čuva duplikate, jer dve transakcije lako mogu imati isti iznos.

To je **multiset**. Prozor živi u `multiset<int> win`, a klizanje košta jedan `insert` i jedan `erase`, oba $O(\log d)$.

Ali multiset ne može da se indeksira - ne postoji `win[d / 2]`, a hodanje do sredine od `begin()` svaki put bi koštalo $O(d)$ i poništilo sve što smo dobili. Zato, umesto da sredinu tražimo iznova i iznova, mi **držimo pokazivač na njoj**.

### Pokazivač na sredini

Neka je `mid` pokazivač na element **ranga $d / 2$** u prozoru (brojano od $0$). Za neparno $d$ to je sam središnji element; za parno $d$ to je gornji od dva središnja, pa je donji odmah do njega, na `prev(mid)`.

Prozor se menja sa tačno dve operacije po koraku, a svaka pomera rang pokazivača `mid` za najviše jedan:

- **Ubacivanje vrednosti manje od `*mid`** gura element na koji `mid` pokazuje jedno mesto udesno, pa mu rang postaje $d / 2 + 1$. Korak `mid--` nas vraća na rang $d / 2$. Vrednost veća od `*mid` pada iza njega i ne menja ništa. (I **jednaka** vrednost pada iza njega, jer `insert` novi element smešta posle onih koji su mu jednaki - zato je provera `<`, a ne `<=`.)
- **Brisanje vrednosti koja nije veća od `*mid`** povlači sve od `mid` nadalje jedno mesto ulevo, pa korak `mid++` radimo **pre** brisanja i posle njega smo na rangu $d / 2$.

To što prvo ubacujemo pa tek onda brišemo znači da multiset nakratko drži $d + 1$ element, i to je u redu - pokazivač je ispravan i pre i posle tog para operacija.

**Pažnja:** briši preko `win.lower_bound(x)`, a ne `win.find(x)`. Kada ima duplikata, `lower_bound` vraća **prvu** kopiju vrednosti $x$, koja posle gornjeg `mid++` uvek stoji strogo pre `mid` - pa element koji brišemo nikada nije onaj na koji `mid` pokazuje, i pokazivač preživi. `find` može da vrati bilo koju kopiju, uključujući baš tu, a njeno brisanje ostavlja `mid` da visi.

### Kako se otarasiti razlomka

Medijana može da bude nešto kao $3.5$, a poređenje $x \ge 2m$ preko tipa `double` doziva probleme sa zaokruživanjem. Ali sa `mid` u ruci, $2m$ je ceo broj u oba slučaja:

$$2m = \begin{cases} 2 \cdot (*mid) & d \text{ neparno} \\ *prev(mid) + *mid & d \text{ parno} \end{cases}$$

Tako celo poređenje ostaje u tipu `int`. Udvostručiti medijanu umesto prepoloviti zbir - to je trik koji vredi zapamtiti.

## Primer

Stanje kod svake proverene transakcije iz primera u postavci, uz $d = 3$:

| transakcija | prozor pre nje | `*mid` | $2m$ | upozorenje | ukupno |
|-------------|----------------|--------|------|------------|--------|
| $4$ | $\{2, 3, 5\}$ | $3$ | $6$ | ne | $0$ |
| $3$ | $\{3, 4, 5\}$ | $4$ | $8$ | ne | $0$ |
| $6$ | $\{3, 3, 4\}$ | $3$ | $6$ | **da** | $1$ |
| $2$ | $\{3, 4, 6\}$ | $4$ | $8$ | ne | $1$ |
| $9$ | $\{2, 3, 6\}$ | $3$ | $6$ | **da** | $2$ |

Prozori su prikazani sortirano, jer ih multiset tako i drži. $d = 3$ je neparno, pa `mid` stoji na rangu $1$ - na sredini - i $2m$ je prosto dvostruko toliko. Prve tri transakcije se nikada ne proveravaju, pa je odgovor $2$.

Prati četvrti red u peti da vidiš kako se pokazivač pomera. Transakcija $2$ se ubacuje i manja je od `*mid` $= 4$, pa `mid--` sleti na $3$. Transakcija koja izlazi iz prozora je $4$, koja **nije** manja ili jednaka novom `*mid` $= 3$, pa `mid` ostaje gde jeste i $4$ se briše. Ostaje $\{2, 3, 6\}$ sa `mid` na $3$ - tačno peti red.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    iostream::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;

    while(t--) {

        int n, d;
        cin >> n >> d;

        vector<int> a(n);
        for(int i = 0; i < n; i++) cin >> a[i];

        multiset<int> win(a.begin(), a.begin() + d);   // the first d transactions
        auto mid = next(win.begin(), d / 2);           // the element of rank d/2

        int warnings = 0;

        for(int i = d; i < n; i++) {

            int twiceMedian;
            if(d % 2 == 1) twiceMedian = 2 * (*mid);
            else twiceMedian = *prev(mid) + *mid;

            if(a[i] >= twiceMedian) warnings++;

            win.insert(a[i]);
            if(a[i] < *mid) mid--;          // everything from mid on moved one place right
            if(a[i - d] <= *mid) mid++;     // everything from mid on is about to move left
            win.erase(win.lower_bound(a[i - d])); // the first copy, so it is never mid itself
        }

        cout << warnings << "\n";
    }

    return 0;
}
```

`next(it, k)` vraća pokazivač `k` koraka posle `it`, a `prev(it)` onaj jedan korak pre njega - `next(win.begin(), d / 2)` je jedino mesto gde plaćamo $O(d)$, i dešava se jednom po test primeru.

## Složenost

Vremenska složenost je $O(n \log d)$.
Memorijska složenost je $O(d)$.
