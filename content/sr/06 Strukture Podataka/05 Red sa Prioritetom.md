>U ovoj lekciji upoznaćemo posebnu vrstu reda, onu koja svoje elemente uvek drži sortirano - Red sa prioritetom (en. priority queue)!

Običan red uslužuje ljude onim redom kojim su stigli, a red sa prioritetom radi nešto drugo.

Zamisli čekaonicu u bolnici. Prvi ulazi onaj kome je najhitnije, bez obzira na to ko je prvi došao. Novi pacijenti stalno pristižu, a posle svakog od njih odgovor na pitanje ko je sledeći može da se promeni.

Sa alatima koje do sada znamo ovo je skupo. Ako sve pacijente držimo u vektoru, do najhitnijeg dolazimo tako što svaki put prođemo kroz ceo vektor, dakle u O(n). Ako vektor sortiramo, svaki novi pacijent nas tera da sortiramo ponovo.

Za to nam služi **red sa prioritetom**. To je red iz koga prvi izlazi najveći element.

Inicijalizacija: `priority_queue<int> pq`

### Funkcije

| Funkcija  | Šta radi                       | Složenost |
| --------- | ------------------------------ | --------- |
| `push(x)` | dodaje `x`                     | O(log n)  |
| `top()`   | vraća najveći element          | O(1)      |
| `pop()`   | briše najveći element          | O(log n)  |
| `size()`  | broj elemenata                 | O(1)      |
| `empty()` | vraća `true` ako je red prazan | O(1)      |

Ovde je `n` broj elemenata koji se trenutno nalaze u redu.

Primeti da nema `front()` ni `back()`. Red sa prioritetom ima samo jedan element koji nas zanima - najveći.

Primer:
~!
```c++
int main(){

    priority_queue<int> pq;

    pq.push(3);
    pq.push(9);
    pq.push(5);

    cout<<pq.top()<<'\n'; //9 je najveći

    pq.pop(); //9 izlazi

    cout<<pq.top()<<'\n';
    cout<<pq.size();

    return 0;
}
```
Output:
`9`
`5`
`2`

Brojeve smo ubacili redom 3, 9, 5, a red nam je prvo vratio 9. Redosled dolaska ovde ne znači ništa, važna je samo vrednost.

### Pražnjenje reda

Ako uzimamo element sa vrha sve dok red ne ostane prazan, dobićemo sve elemente u opadajućem redosledu:

Primer:
~!
```c++
int main(){

    priority_queue<int> pq;

    pq.push(4);
    pq.push(1);
    pq.push(7);
    pq.push(1);

    while(!pq.empty()){

        cout<<pq.top()<<'\n';
        pq.pop();
    }

    return 0;
}
```
Output:
`7`
`4`
`1`
`1`

### Najmanji element na vrhu

Podrazumevano se na vrhu nalazi najveći element. Vrlo često nam treba obrnuto, pa to u C++-u kažemo već pri deklaraciji:

Primer:
~!
```c++
int main(){

    priority_queue<int, vector<int>, greater<int>> pq;

    pq.push(4);
    pq.push(1);
    pq.push(7);

    cout<<pq.top()<<'\n'; //sada je na vrhu najmanji

    pq.pop();

    cout<<pq.top();

    return 0;
}
```
Output:
`1`
`4`

Deklaracija izgleda ovako:

`priority_queue<int, vector<int>, greater<int>> pq`

- `vector<int>` je struktura u kojoj red čuva svoje elemente i uvek se piše tako.
- `greater<int>` je poređenje koje red koristi i to je jedini deo koji smo zaista promenili. (Da smo tu napisali `less<int>`, dobili bismo podrazumevano ponašanje)
### Zašto ne bismo samo sortirali?

Sve što smo do sada uradili moglo je i jednim pozivom funkcije `sort` na početku. Red sa prioritetom postaje neophodan onda kada se **novi elementi pojavljuju dok već obrađujemo stare**.

Evo klasičnog primera. Imamo nekoliko konopaca i želimo da ih sve spojimo u jedan. Spajanje dva konopca košta koliko je zbir njihovih dužina, a rezultat je novi, duži konopac koji ponovo može da se spaja. Zanima nas najmanja ukupna cena, a do nje dolazimo tako što uvek spajamo dva najkraća konopca koja trenutno imamo:

Primer:
~!
```c++
int main(){

    priority_queue<int, vector<int>, greater<int>> pq;

    pq.push(4);
    pq.push(3);
    pq.push(2);
    pq.push(6);

    int cena = 0;

    while(pq.size() > 1){

        int a = pq.top();
        pq.pop();
        int b = pq.top();
        pq.pop();

        cena += a + b;
        pq.push(a + b); //novi konopac se vraća u red
    }

    cout<<cena;

    return 0;
}
```
Output:
`29`

Krećemo od 2 i 3, što košta 5 i ostavlja nam konopac dužine 5. Sada su dva najkraća 4 i 5, pa zatim 6 i 9. Sortiran niz ovo ne može da isprati, jer konopac dužine 5 nije ni postojao u trenutku sortiranja. Red sa prioritetom ga sam stavlja na pravo mesto, u O(log n).

	![[priority-queue-ropes.png|Problem spajanja konopaca kroz četiri koraka, gde se svaki put uzimaju dva najkraća konopca iz reda sa prioritetom i njihov zbir vraća nazad, uz oznaku new za novonastale dužine, sa ukupnom cenom 29]]

>Napomena:
>`top()` i `pop()` nad praznim redom su nedefinisano ponašanje, isto kao `front()` nad praznim običnim redom. U petlji poput `while(pq.size() > 1)` je lako izbaciti jedan element viška - kada nisi siguran, proveri `empty()`.
