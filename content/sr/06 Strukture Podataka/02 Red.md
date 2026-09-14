>U ovoj lekciji upoznaćemo se sa strukturon sličnom steku - sa Redom!

U prošloj lekciji smo naučili o steku, gde poslednji element koji uđe prvi izlazi.

**Red** (en. queue) je potpuna suprotnost - baš kao red ispred prodavnice: ko prvi dođe, prvi bude uslužen (**FIFO** - First In, First Out).

Novi elementi ulaze **pozadi**, a izlaze **spreda**.

	![[queue.png|Red sa elementima 3, 7, 5 i 9, gde push ulazi pozadi kod back() a pop izlazi spreda kod front(), dok dva reda ispod pokazuju da je redosled ulaska isti kao redosled izlaska]]

### Funkcije

C++ nam takođe daje gotov `queue`:

| Funkcija | Šta radi | Složenost |
| ---- | ---- | ---- |
| `push(x)` | dodaje `x` na kraj | O(1) |
| `pop()` | uklanja element sa početka | O(1) |
| `front()` | vraća element sa početka | O(1) |
| `back()` | vraća element sa kraja | O(1) |
| `empty()` | vraća `true` ako je red prazan | O(1) |
| `size()` | vraća broj elemenata | O(1) |

Opet, sve je **O(1)**.

Inicijalizacija: `queue<int> q`

Primer:
~!
```c++
int main(){

    queue<int> q;

    q.push(3);
    q.push(7);
    q.push(5);

    cout<<q.front()<<'\n'; //3 je došao prvi

    q.pop(); //3 je uslužen i odlazi

    cout<<q.front()<<'\n'; //sada je 7 na početku
    cout<<q.back()<<'\n'; //5 je na kraju
    cout<<q.size();

    return 0;
}
```
Output:
`3`
`7`
`5`
`2`

>Napomena:
>Isto kao kod steka: `pop()` ne vraća element, a `front()` / `pop()` nad praznim redom dovodi do greške. Proveri `empty()` kada nisi siguran!

### Mala simulacija

Redovi blistaju kad god obrađujemo stvari **redosledom kojim su stigle**. Hajde da direktno simuliramo red u prodavnici:

~!
```c++
int main(){

    queue<string> q;

    q.push("Ana");
    q.push("Marko");
    q.push("Jovan");

    while(!q.empty()){ //uslužujemo dok se red ne isprazni

        cout<<"Na redu je: "<<q.front()<<'\n';
        q.pop();
    }

    return 0;
}
```
Output:
`Na redu je: Ana`
`Na redu je: Marko`
`Na redu je: Jovan`

Ko je prvi došao, prvi je i uslužen - red automatski čuva redosled umesto nas.

### Stek vs Red

|                  | Stek                                  | Red                                     |
| ---------------- | ------------------------------------- | --------------------------------------- |
| Redosled         | LIFO (poslednji ušao, prvi izašao)    | FIFO (prvi ušao, prvi izašao)           |
| Dodavanje        | na vrh                                | na kraj                                 |
| Uklanjanje       | sa vrha                               | sa početka                              |
| Tipična upotreba | "undo", uparivanje zagrada, rekurzija | simulacije, obrada po redosledu dolaska |

>Napomena:
>Red i stek možda trenutno ne deluju impresivno, ali postaju jedne od najvažnijih struktura podataka kada pričamo o grafovima, o kojima će biti reči u budućim lekcijama.
