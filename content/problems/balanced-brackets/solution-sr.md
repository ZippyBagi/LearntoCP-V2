
## Pristup

Ključno pitanje: kada naiđemo na `)`, koju `(` ona zatvara?

Mora da zatvori **najskoriju** zagradu koja je još uvek nezatvorena. A šablon "najskorija stvar prva" je tačno ono čemu stek služi - najskorija nezatvorena `(` uvek sedi na vrhu.

Dakle, prolazimo kroz string jednom:

- Kada vidimo `(` - stavljamo je na stek, čeka svoj par.
- Kada vidimo `)` - skidamo vrh steka, ta zagrada je sada zatvorena.

Postoje tačno dva načina da nešto pođe po zlu:

- Moramo da skinemo sa **praznog** steka - ova `)` nema koga da zatvori. Odgovor je odmah `NO`.
- Stek **nije prazan na kraju** - neka `(` nikada nije zatvorena. Takođe `NO`.

Ako se nijedno ne desi, svaka zagrada je našla svoj par - `YES`.

**Pažnja:** provera da su brojevi `(` i `)` jednaki nije dovoljna - `)(` ima po jednu od svake, a nije balansirano. *Redosled* je bitan, i baš zato se provera praznog steka mora desiti tokom prolaska, a ne posle njega.

## Primer

String iz zadatka, `(()())`, karakter po karakter (prikazana je veličina steka):

| karakter | akcija | veličina steka posle |
|:---:|:---:|:---:|
| `(` | push | 1 |
| `(` | push | 2 |
| `)` | pop | 1 |
| `(` | push | 2 |
| `)` | pop | 1 |
| `)` | pop | 0 |

Nikada nismo skidali sa praznog steka, a stek se završava prazan - `YES`.

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

    stack<char> st;

    for(int i = 0; i < s.size(); i++){

        if(s[i] == '('){

            st.push(s[i]); // otvorena zagrada, čeka svoj par

        }else{

            if(st.empty()){ // zatvarajuća, a nema koga da zatvori
                cout << "NO";
                return 0;
            }
            st.pop();
        }
    }

    if(st.empty()){
        cout << "YES";
    }else{ // neke zagrade nikada nisu zatvorene
        cout << "NO";
    }

    return 0;
}
```

## Bonus: O(1) memorije

Primeti da nikada ne gledamo *šta* je na steku, već samo da li je prazan - svi elementi su ionako `(`. Zato ceo stek može da se zameni jednim brojačem: `+1` na `(`, `-1` na `)`. Ako brojač ikada ode u minus - `NO`; ako se ne završi na nuli - `NO`; inače `YES`.

(Verzija sa stekom i dalje vredi znati - sa više vrsta zagrada, poput `[` i `{`, trik sa brojačem se raspada, a rešenje sa stekom se jedva menja.)

## Složenost

Vremenska složenost je $O(n)$
Memorijska složenost je $O(n)$ (ili $O(1)$ sa brojačem)
