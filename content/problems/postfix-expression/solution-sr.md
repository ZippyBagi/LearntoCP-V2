
## Pristup

Čitaj izraz sleva nadesno i zapitaj se: kada sretnemo operator, gde su njegova dva operanda? To su dve **poslednje završene** vrednosti. "Najskorija prva" je tačno ono što daje **stek**, pa:

- cifra je gotova vrednost - stavi je na stek;
- operator skida dve vrednosti sa vrha steka, kombinuje ih i vraća rezultat nazad.

Svaki operator potroši dve vrednosti i proizvede jednu, pa se ispravan izraz završava sa tačno **jednom** vrednošću na steku - rezultatom.

Zašto ovo računa pravu stvar? Postfiksni izraz se čita tačno onim redosledom kojim su rezultati potrebni: dok operator stigne, oba njegova operanda - ma koliko komplikovana - već su sažeta u pojedinačne brojeve na steku.

**Pažnja:** vrh steka je **desni** operand (stavljen je poslednji), onaj ispod je levi. Za `+` i `*` redosled nije bitan, ali ih svejedno skidaj u imenovane promenljive - navika te spašava kada se pojave `-` ili `/`.

**Pažnja:** vrednosti dostižu $10^{18}$ - stek drži `long long`, ne `int`.

## Primer

Prvi izraz, `12+3*`:

| simbol | potez | stek posle |
|---|---|---|
| `1` | stavi $1$ | $1$ |
| `2` | stavi $2$ | $1, 2$ |
| `+` | $1 + 2 = 3$ | $3$ |
| `3` | stavi $3$ | $3, 3$ |
| `*` | $3 \cdot 3 = 9$ | **$9$** |

Ostaje jedna vrednost - $9$, vrednost izraza `(1+2)*3`.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        string s;
        cin>>s;

        stack<long long> st; // intermediate values can be large

        for(char c : s){
            if(c >= '0' && c <= '9'){
                st.push(c - '0'); // a number goes straight to the stack
            }else{
                long long b = st.top(); st.pop(); // the right operand was pushed last
                long long a = st.top(); st.pop();
                if(c == '+'){
                    st.push(a + b);
                }else{
                    st.push(a * b);
                }
            }
        }

        cout<<st.top()<<'\n'; // the value of the whole expression
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(L)$ gde je $L$ dužina izraza.
Memorijska složenost je $O(L)$.
