>U ovoj lekciji naučićemo kako da napravimo sopstvene strukture i kako da ih ugrađene funkcije i strukture podataka prihvate

Ponekad nam u zadatku treba da više vrednosti spojimo u jednu celinu. Rešenje tada bude i jasnije i brže.

Problem je što C++ ne zna kako da uporedi nešto što smo sami napravili. Zbog toga nam treba **preopterećivanje operatora** (en. operator overloading).

### Strukture

Već znamo za par (en. pair), koji spaja dve vrednosti. **Struktura** (en. struct) je ista ideja, samo bez ograničenja: koliko god vrednosti želimo i svaka sa svojim imenom.

Definišemo je iznad `main()`, a posle toga se ponaša kao bilo koji drugi tip:
~!
```c++
struct takmicar{

    string ime;
    int poeni;
};

int main(){

    takmicar a;
    a.ime = "Ana";
    a.poeni = 250;

    takmicar b = {"Marko", 300}; //kraći zapis

    cout<<a.ime<<" "<<a.poeni<<'\n';
    cout<<b.ime<<" "<<b.poeni;

    return 0;
}
```

Output:
`Ana 250`
`Marko 300`

Do polja dolazimo tačkom, isto kao do `.first` i `.second` kod para. 
### Šta je preopterećivanje

Kada napišemo `a < b` za dva broja tipa `int`, C++ zna šta treba da uradi. Kada isto to napišemo za dva takmičara, dobijamo grešku: `no match for 'operator<'`.

**Preopterećivanje** znači da operatoru koji već postoji (`<`, `>`, `==`, `+`, ...) damo značenje i za tip koji smo sami napisali.

Isplati se zato što cela standardna biblioteka počiva na jednom jedinom operatoru - na `<`. 

Njime `sort` uređuje elemente, njime `set` i `map` drže svoje elemente sortirano i njime `priority_queue` bira ko je na vrhu.

### Kako se to radi

Operator pišemo kao funkciju unutar strukture:
~!
```c++
struct takmicar{

    string ime;
    int poeni;

    bool operator<(const takmicar& drugi) const{

        return poeni > drugi.poeni; //ko ima više poena ide prvi
    }
};
```

Dve stvari vredi pročitati polako:

- `operator<` je ime funkcije. Ona se poziva kada napišemo `a < b`.
- Sa leve strane znaka `<` je struktura u kojoj se nalazimo, pa se njena polja zovu prosto `ime` i `poeni`. Desna strana nam stiže kao `drugi`, a do njenih polja dolazimo sa `drugi.ime` i `drugi.poeni`.

A sada ono najvažnije: **`a < b` treba da vrati `true` onda kada `a` ide ispred `b`**. Nigde se ne pominje ko je manji.

Kod nas ići prvi znači imati više poena, pa `<` vraća `poeni > drugi.poeni`.

Najlakše ćeš ga zapamtiti ako ga čitaš kao "ide ispred", a ne kao "manje je od".

Sada funkciji `sort` ne treba nikakva pomoćna funkcija:
~!
```c++
struct takmicar{

    string ime;
    int poeni;

    bool operator<(const takmicar& drugi) const{

        return poeni > drugi.poeni; //ko ima više poena ide prvi
    }
};

int main(){

    vector<takmicar> v = {{"Ana", 250}, {"Marko", 300}, {"Jovan", 180}};

    sort(v.begin(), v.end());

    for(int i=0;i<v.size();i++){
        cout<<v[i].ime<<" "<<v[i].poeni<<'\n';
    }

    return 0;
}
```
Output:
`Marko 300`
`Ana 250`
`Jovan 180`

Vektor je uređen po poenima, od pobednika naniže, a `sort` smo pozvali isto kao nad vektorom brojeva.


>Kada želimo da koristimo `greater<struct>`, moramo da preopteretimo i `>`