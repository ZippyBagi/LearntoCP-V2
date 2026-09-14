>U ovoj lekciji upoznaćemo našu prvu pravu strukturu podataka - Stek!

Zamisli gomilu tanjira. Sa njom možeš da uradiš samo dve stvari:

- staviš novi tanjir **na vrh**
- uzmeš tanjir **sa vrha**

Ne možeš da izvučeš tanjir iz sredine a da se sve ne sruši. To je cela ideja **steka** (en. stack): poslednji element koji je ušao - prvi izlazi (**LIFO** - Last In, First Out).

	![[stack.png|Stek kroz pet koraka dodavanja i jedno uklanjanje, gde se svaki element stavlja na vrh prethodnih, a top() uvek pokazuje na poslednji dodati element]]

### Funkcije

C++ nam daje gotov `stack`, sa sledećim operacijama:

| Funkcija | Šta radi | Složenost |
| ---- | ---- | ---- |
| `push(x)` | stavlja `x` na vrh | O(1) |
| `pop()` | uklanja element sa vrha | O(1) |
| `top()` | vraća element sa vrha (bez uklanjanja) | O(1) |
| `empty()` | vraća `true` ako je stek prazan | O(1) |
| `size()` | vraća broj elemenata | O(1) |

Sve je **O(1)** - upravo to čini stekove toliko korisnim.

Inicijalizacija: `stack<int> st`

Primer:
~!
```c++
int main(){

    stack<int> st;

    st.push(3);
    st.push(7);
    st.push(5);

    cout<<st.top()<<'\n'; //5 je na vrhu

    st.pop(); //5 odlazi

    cout<<st.top()<<'\n'; //sada je 7 na vrhu
    cout<<st.size();

    return 0;
}
```
Output:
`5`
`7`
`2`

>Napomena:
>`pop()` **ne vraća** uklonjeni element, a pozivanje `top()` ili `pop()` nad praznim stekom ruši program. Uvek prvo proveri `empty()` kada nisi siguran!

>Napomena:
>Stek je pravi alat kad god je **najskorija** stvar ona kojom prvo moramo da se pozabavimo. Zapamti to, pojavljivaće se iznova i iznova.
