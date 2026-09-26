
## Pristup

Treba nam brojač za svako slovo - a njih ima samo $26$, pa vektor od $26$ brojača pokriva celu abecedu.

Most između slova i brojača je trik iz lekcije o Niskama: `s[i] - 'a'` pretvara malo slovo u broj od $0$ do $25$. Dakle, brojač za slovo `s[i]` živi na indeksu `s[i] - 'a'`:

- Prođemo kroz reč jednom, i za svaki karakter uradimo `count[s[i] - 'a']++`.
- Zatim prođemo kroz $26$ brojača **redom** - redosled indeksa *jeste* abecedni redosled, pa traženo sortiranje dobijamo besplatno.
- Da bismo ispisali samo slovo, pretvorimo indeks nazad: `char c = 'a' + i`.

**Pažnja:** ispisuju se samo slova koja se zaista pojavljuju - preskačemo svaki brojač koji je ostao na $0$.

**Pažnja:** format je tačno `slovo: broj` - dvotačka i razmak između njih.

## Primer

Brojači za reč `banana` (indeksi sa brojem $0$ su izostavljeni):

| slovo | indeks (`slovo - 'a'`) | broj |
|:---:|:---:|:---:|
| `a` | 0 | 3 |
| `b` | 1 | 1 |
| `n` | 13 | 2 |

Čitanje brojača od indeksa $0$ do $25$ obilazi `a`, pa `b`, pa `n` - abecedni redosled, tačno ono što izlaz traži.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    iostream::sync_with_stdio(false);
    cin.tie(0);

    string s;
    cin >> s;

    vector<int> count(26, 0); // po jedan brojač za svako slovo

    for(int i = 0; i < s.size(); i++){
        count[s[i] - 'a']++; // 'b' - 'a' = 1, pa se 'b' broji na indeksu 1
    }

    for(int i = 0; i < 26; i++){

        if(count[i] > 0){ // samo slova koja se pojavljuju

            char c = 'a' + i; // nazad, od indeksa do slova
            cout << c << ": " << count[i] << '\n';
        }
    }

    return 0;
}
```

## Složenost

Vremenska složenost je $O(n)$
Memorijska složenost je $O(1)$ (26 brojača ne raste sa ulazom)
