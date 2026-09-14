> U ovoj lekciji naučićemo kako da čuvamo mnogo vrednosti odjednom - prvo ideju **niza (array)**, a zatim glavnu array-like strukturu podataka u c++-u — vektore ( vector )

### Nizovi (Arrays)

Do sada je jedna promenljiva držala jednu vrednost. Ali šta ako nam problem da 100 brojeva sa kojima treba da radimo? Pravljenje `a1, a2, a3, ...` sve do `a100` očigledno nije rešenje.

Rešenje je **niz** (na engleskom **array**) - red kutija pod jednim imenom. Svaka kutija drži jednu vrednost istog tipa podataka, a kutije su numerisane tako da možemo pokazati na bilo koju od njih:

	![[array.png|Niz a nacrtan kao pet spojenih kutija sa vrednostima 6, 2, 7, 8 i 1, označenih ispod sa a[0] do a[4]]]

Broj kutije se zove **indeks**, i o njemu treba zapamtiti dve stvari:
- Indeksiranje **počinje od 0** - prvi element niza `a` je `a[0]`, drugi je `a[1]`, i tako dalje
- Pristup elementu preko indeksa je trenutan bez obzira koliko je niz veliki - niz nikada ne mora da ga "traži"

Dakle, umesto 100 promenljivih, napravimo jedan niz sa 100 kutija, i `a[57]` nam daje 58-mi broj. Ostaje još samo da vidimo kako ovo izgleda u c++-u.

### Vektori

Vektori su nizovi promenljive veličine, što znači da tokom izvršavanja programa možemo dinamički menjati njihov broj elemenata, a i dalje pristupati elementima u **O(1)** vremenskoj složenosti.
Takođe možemo dodavati i uklanjati elemente sa kraja vektora.

Deklarišu se ovako: `vector<tip_podatka> ime_vektora(n, početna_vrednost)`

- `tip_podatka` i `ime_vektora` su prilično jasni sami po sebi
- `n` i `početna_vrednost` nisu obavezni, ali ako ih navedemo, vektor će na početku sadržati `n` elemenata i svaki od njih će imati vrednost `početna_vrednost`
- Ako navedemo samo `n`, bez podrazumevane vrednosti, vektor će biti popunjen “nultim” vrednostima u zavisnosti od tipa podataka (`0`, `""`, itd.)

i-tom elementu vektora pristupamo pomoću `a[i]`, gde je `a` ime našeg vektora.

Primer:

~!
```c++
int main(){

    int n = 3;

    vector<int> a(n); //inicijalizujemo vektor a veličine n

    for(int i =0;i<n;i++){ //primetite da brojanje počinje od 0
    
        cin>>a[i]; //unosimo i-ti element
    }

    cout<<"Treći element vektora je "<<a[2]; //treći element ima indeks a[2]

    return 0;
}
```

`Input: 6 7 8`  
`Output: Treći element vektora je 8`

Iako indeksiranje kreće od 0, ništa nas ne sprečava da ignorišemo `a[0]` i koristimo `a[1]` kao prvi element.

U tom slučaju moramo malo izmeniti kod:

~!
```c++
int main(){

    int n = 3;

    vector<int> a(n+1); //ako brojimo od 1, potrebano nam je n+1 elemenata

    for(int i =1;i<=n;i++){ //primetite uslov i<=n
    
        cin>>a[i]; //unosimo i-ti element
    }

    cout<<"Treći element vektora je "<<a[3]; //sada je treći element a[3]

    return 0;
}
```

`Input: 6 7 8`  
`Output: Treći element vektora je 8`

### Funkcije za rad sa vektorima

Vektori imaju veliki broj ugrađenih funkcija koje olakšavaju rad sa njima.

Možemo koristiti funkcije za dodavanje elemenata, uklanjanje elemenata i još mnogo toga.

Najvažnije funkcije su (pretpostavljamo da je `a` tipa `vector<int>`):

- `a.push_back(x);`  - dodaje element `x` na kraj vektora  ako imamo `[1,2,3]` i pozovemo `a.push_back(4)`, vektor postaje `[1,2,3,4]`
- `a.pop_back();`  - uklanja poslednji element vektora tako da vektor `[1,2,3]` postaje `[1,2]`

- `a.size()` - vraća veličinu (dužinu) vektora

Primer:

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std; 

void stampaj_vektor(vector<int> a){ // Ovo je naša proizvoljna funkcija, kao što smo naučili u lekciji Funkcije
	
	for(int i=0;i<a.size();i++){ //primetite a.size()
	
        cout<<a[i]<<" "; //ovde ispisujemo elemente vektora
    
    }
    cout<<'\n'; //newline karakter, isto kao Enter na tastaturi
}

int main(){

    cin.tie(0);
    ios_base::sync_with_stdio(false);

    int n = 3;

    vector<int> a(n);
    
    stampaj_vektor(a); // Pozivamo našu proizvoljnu funkciju

    a[0] = 1;
    a[1] = 2;
    a[2] = 3;

    a.push_back(4);
    a.push_back(5);

    stampaj_vektor(a); // Pozivamo našu proizvoljnu funkciju

    a.pop_back();

    stampaj_vektor(a); // Ponovo pozivamo našu proizvoljnu funkciju

    return 0;
}
```

Output:  
`1 2 3`  
`1 2 3 4 5`  
`1 2 3 4`