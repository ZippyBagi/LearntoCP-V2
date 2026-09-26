
## Pristup

Za svaki predmet postoje dve mogućnosti:

- **Uzmi predmet** - ako njegova težina staje u preostali kapacitet, dobijamo njegovu vrednost, ali gubimo $w_i$ kapaciteta.
- **Preskoči predmet** - prelazimo na sledeći, zadržavajući isti kapacitet.

Između podproblema menjaju se dve stvari: koje predmete smo razmotrili (od $0$ do $n$) i koliko kapaciteta imamo (od $0$ do $W$). Zato pravimo 2D niz $dp$ dimenzija $(n+1) \times (W+1)$, gde $dp[i][j]$ čuva najveću vrednost koju možemo dobiti **koristeći prvih $i$ predmeta sa kapacitetom ranca $j$**.

Bazni slučajevi su poznata polja: $dp[0][j] = 0$ (nema predmeta, nema vrednosti) i $dp[i][0] = 0$ (nema kapaciteta). Preostala polja slede iz dve mogućnosti:

$$dp[i][j] = max(dp[i-1][j],\ dp[i-1][j - w_i] + v_i)$$

gde je druga opcija dozvoljena samo ako je $w_i \le j$. Rešenje je $dp[n][W]$.

### Primer

Za predmete iz postavke ($W = 5$), svaki red dodaje još jedan predmet $(w_i, v_i)$ u razmatranje:

|  | $j=0$ | $j=1$ | $j=2$ | $j=3$ | $j=4$ | $j=5$ |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| bez predmeta | 0 | 0 | 0 | 0 | 0 | 0 |
| + predmet $(4, 1)$ | 0 | 0 | 0 | 0 | 1 | 1 |
| + predmet $(5, 2)$ | 0 | 0 | 0 | 0 | 1 | 2 |
| + predmet $(1, 3)$ | 0 | 3 | 3 | 3 | 3 | 4 |
| + predmet $(3, 4)$ | 0 | 3 | 3 | 4 | 7 | 7 |

Proveri poslednji red za $j = 4$: preskakanje predmeta $(3, 4)$ zadržava $3$ iz reda iznad, dok uzimanje daje njegovu vrednost $4$ plus red iznad na kapacitetu $4 - 3 = 1$, što je $4 + 3 = 7$. Uzimanje pobeđuje. Rešenje je u donjem desnom uglu: $7$.

### Memorijska optimizacija

Primeti da red $i$ zavisi samo od reda $i-1$. Zato umesto cele tabele možemo čuvati jedan 1D niz veličine $W+1$, gde nakon obrade prvih $i$ predmeta $dp[j]$ čuva najbolju vrednost za kapacitet $j$.

Postoji jedna zamka: pri ažuriranju predmetom $i$, po $j$ moramo ići **od $W$ naniže**. Tako $dp[j - w_i]$ i dalje čuva vrednost iz prethodnog reda (bez predmeta $i$) - da idemo naviše, mogli bismo isti predmet uzeti dva puta.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    iostream::sync_with_stdio(false);
    cin.tie(0);

    int n, W;
    cin >> n >> W;

    vector<int> wt(n);
    vector<long long> val(n);

    for(int i = 0; i < n; i++){
        cin >> wt[i] >> val[i];
    }

    // dp[j] = najveća vrednost ostvariva sa kapacitetom j,
    //         koristeći do sada obrađene predmete
    vector<long long> dp(W + 1, 0);

    for(int i = 0; i < n; i++){

        // idemo od pozadi, tako da dp[j - wt[i]] i dalje čuva
        // rezultat bez trenutnog predmeta
        for(int j = W; j >= wt[i]; j--){
            dp[j] = max(dp[j], dp[j - wt[i]] + val[i]);
        }
    }

    cout << dp[W];
}
```

## Složenost

Vremenska složenost je $O(n*W)$, a memorijska $O(W)$ (ili $O(n*W)$ sa punom 2D tabelom).

Primeti da složenost zavisi od **vrednosti** $W$, a ne samo od broja predmeta - to se naziva *pseudo-polinomijalna* složenost i razlog je zašto ograničenja u knapsack zadacima uvek drže $W$ relativno malim.
