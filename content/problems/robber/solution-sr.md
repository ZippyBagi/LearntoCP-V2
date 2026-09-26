
## Pristup

Za svaku kuću imamo dve mogućnosti: da je opljačkamo ili da je preskočimo.

- Ako je opljačkamo, dobijamo njen novac, ali ne smemo da opljačkamo prethodnu kuću.
- Ako je preskočimo, najbolje što možemo je najbolji rezultat zaključno sa prethodnom kućom.

Da bismo ovo efikasno izračunali, koristimo niz $dp[i]$ koji čuva najveću količinu novca koju možemo ukrasti iz **prvih $i$ kuća**. Gornji izbor se direktno prevodi u formulu:

$$dp[i] = max(a[i-1] + dp[i-2],\ dp[i-1])$$

Prva opcija je "opljačkaj kuću $i$" (njen novac plus najbolji rezultat uz preskakanje suseda), a druga je "preskoči kuću $i$".

Bazni slučajevi su $dp[0] = 0$ (nema kuća) i $dp[1] = a[0]$ (samo jedna kuća, pljačkamo je). Rešenje je $dp[n]$.

**Pažnja:** pošto $n$ ide do $2 \cdot 10^5$, a vrednosti do $10^9$, rezultat može dostići oko $10^{14}$, što ne staje u `int` - moramo koristiti `long long`.

## Primer

Za kuće iz postavke, $2\ 7\ 9\ 3\ 1$:

| razmotrene kuće | 0 | 1 | 2 | 3 | 4 | 5 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| nova kuća | - | 2 | 7 | 9 | 3 | 1 |
| $dp_i$ | 0 | 2 | 7 | 11 | 11 | 12 |

Proveri dva polja: za kuću sa $9$, pljačkanje daje $9 + dp[1] = 11$, a preskakanje daje $7$, pa je $dp[3] = 11$. Za kuću sa $3$, pljačkanje daje $3 + dp[2] = 10$, a preskakanje $11$ - ovde je preskakanje bolje, pa $dp[4]$ ostaje $11$.

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

    vector<long long> dp(n + 1, 0);

    dp[0] = 0;
    dp[1] = a[0];

    for(int i = 2; i <= n; i++){
        // maksimum između pljačkanja kuće i (uz preskakanje suseda)
        // i preskakanja kuće i
        dp[i] = max(a[i-1] + dp[i-2], dp[i-1]);
    }

    cout << dp[n];
}
```

## Bonus: O(1) memorije

Primeti da nam za računanje $dp[i]$ trebaju samo prethodne **dve** vrednosti. Zato umesto celog niza možemo čuvati samo dve promenljive i ažurirati ih u toku prolaska:
~!
```cpp
long long secondLast = 0, last = a[0];

for(int i = 1; i < n; i++){
    long long res = max(a[i] + secondLast, last);
    secondLast = last;
    last = res;
}

// rezultat je u promenljivoj `last`
```

Ovo je čest trik: kad god DP formula gleda samo fiksan broj koraka unazad, memorija se može smanjiti na ovaj način.

## Složenost

Vremenska složenost je $O(n)$, a memorijska $O(n)$ (ili $O(1)$ uz optimizaciju).
