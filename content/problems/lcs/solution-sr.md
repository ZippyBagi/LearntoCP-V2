
## Pristup

Gradimo 2D tabelu u kojoj $dp[i][j]$ čuva dužinu najdužeg zajedničkog podniza **prvih $i$ karaktera stringa $s_1$** i **prvih $j$ karaktera stringa $s_2$**.

Primeti da je tabela veća za jedan element po obe ose: red $dp[0][x]$ i kolona $dp[x][0]$ predstavljaju prazan string i popunjavaju se nulama (prazan string i bilo koji drugi string imaju 0 zajedničkih karaktera). To su naši bazni slučajevi.

Ostatak tabele popunjavamo ovako:

- Ako je $s_1[i] == s_2[j]$, našli smo poklapanje. Ono produžava najbolji zajednički podniz dva stringa **bez** ovih karaktera, pa je $dp[i][j] = dp[i-1][j-1] + 1$.
- U suprotnom, bar jedan od ova dva karaktera ne može biti deo zajedničkog podniza, pa uzimamo bolju od dve opcije u kojima jedan od njih izbacujemo: $dp[i][j] = max(dp[i-1][j], dp[i][j-1])$ (polje iznad i polje levo).

Rešenje se nalazi u donjem desnom uglu tabele: $dp[|s_1|][|s_2|]$. Gde $|s_1|$ označava dužinu $s_1$

## Primer

Za `abcde` i `ace`, popunjena tabela izgleda ovako (karakteri koji se poklapaju su podebljani):

|  |  | a | c | e |
|:---:|:---:|:---:|:---:|:---:|
|  | 0 | 0 | 0 | 0 |
| a | 0 | **1** | 1 | 1 |
| b | 0 | 1 | 1 | 1 |
| c | 0 | 1 | **2** | 2 |
| d | 0 | 1 | 2 | 2 |
| e | 0 | 1 | 2 | **3** |

Prati podebljane vrednosti: svako poklapanje dodaje $1$ na polje jedan korak gore-levo od njega. Dvojka u redu `c`, koloni `c` je jedinica iz reda `b`, kolone `a`, plus novo poklapanje. Svako drugo polje samo kopira veći od svog gornjeg i levog suseda. Rešenje je u donjem desnom uglu: $3$.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int lcs(string& s1, string& s2){

    int n = s1.size(), m = s2.size();

    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

    for(int i = 1; i <= n; i++){
        for(int j = 1; j <= m; j++){

            if(s1[i-1] == s2[j-1]){
                dp[i][j] = dp[i-1][j-1] + 1;
            }else{
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }

    return dp[n][m];
}

int main(){

    iostream::sync_with_stdio(false);
    cin.tie(0);

    string s1, s2;
    cin >> s1 >> s2;

    cout << lcs(s1, s2);
}
```

Primeti da unutar petlji stringove indeksiramo sa $i-1$ i $j-1$: indeks $i$ u tabeli znači "prvih $i$ karaktera", pa se $i$-ti karakter samog stringa nalazi na poziciji $i-1$.

## Složenost

Vremenska složenost je $O(|s_1| * |s_2|)$, a memorijska složenost je $O(|s_1| * |s_2|)$.
