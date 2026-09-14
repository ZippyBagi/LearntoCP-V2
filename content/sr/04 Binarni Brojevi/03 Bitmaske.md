>U ovoj lekciji učimo kako ceo skup da spakujemo u jedan jedini broj - bitmaske!

### Šta je bitmaska?

**Bitmaska** je običan ceo broj koji čitamo bit po bit. Bit `i` odgovara na jedno pitanje sa da/ne: **da li je element `i` u skupu?** (Zamisli je kao laganu verziju `vector<bool>`-a.)

Zamisli red prekidača za svetlo, po jedan za svaki element. Prekidač je gore ako je element unutra, dole ako nije. Ceo red pročitan zdesna nalevo je binarni broj, i taj broj je naša maska.


	![[bitmask-switches.png|Četiri prekidača za svetlo označena sa Mila, Jovan, Marko i Ana, podignuti za Milu i Anu a spušteni za ostala dva, sa istim tim redom pročitanim ispod kao cifre 1 0 0 1 pa kao broj 9]]


Sa četiri elementa postoji `16` maski, od `0000` (svi dole) do `1111` (svi gore). Skup svih četiri je broj `15`, a prazan skup je broj `0`.

Ovde nema ničeg novog. Već znamo da čitamo i upisujemo pojedinačne bitove iz lekcije [Operacije nad Bitovima](/sr/Theory/Binarni%20Brojevi/Operacije%20nad%20Bitovima) - bitmaska je samo novi način da pogledamo broj kojim ionako već umemo da baratamo.

### Operacije

Sve što ikada radimo sa maskom svodi se na ovo:

| Operacija | Kod | Složenost |
| ---- | ---- | ---- |
| da li je element `i` unutra? | `(maska>>i)&1` | O(1) |
| dodaj element `i` | `maska \|= (1<<i)` | O(1) |
| izbaci element `i` | `maska &= ~(1<<i)` | O(1) |
| obrni element `i` | `maska ^= (1<<i)` | O(1) |
| prazan skup | `0` | O(1) |
| pun skup od `n` elemenata | `(1<<n)-1` | O(1) |
| koliko elemenata je unutra | `__builtin_popcount(maska)` | O(1) |
| najmanji element unutra | `__builtin_ctz(maska)` | O(1) |

Ovde je `n` broj elemenata, i on je mali - o tome za koji trenutak.

Svaka linija je jedna ili dve mašinske instrukcije, i u tome je cela poenta ove strukture. Dodavanje elementa u `set<int>` košta O(log n), a dodavanje u masku ne košta ništa merljivo.

Hajde da sastavimo društvo, pa da ga pročitamo nazad:
~!
```c++
int main(){

    vector<string> imena = {"Ana", "Marko", "Jovan", "Mila"};

    int maska = 0;

    maska |= (1<<0); //Ana ulazi

    maska |= (1<<2); //Jovan ulazi

    maska |= (1<<3); //Mila ulazi

    maska &= ~(1<<2); //Jovan se predomislio

    cout<<maska<<'\n';

    for(int i=0;i<4;i++){
        if((maska>>i)&1){
            cout<<imena[i]<<" ";
        }
    }

    return 0;
}
```
Izlaz:
`9`
`Ana Mila `

Društvo `{Ana, Mila}` je broj `9`, zato što je `9` u binarnom `1001`. Taj broj sada možemo da stavimo u niz, poredimo sa `==` ili prosleđujemo unaokolo kao običan `int`.

>Napomena:
>`__builtin_popcount` i `__builtin_ctz` su gcc funkcije i primaju samo `unsigned int`. Za 64-bitnu masku zovu se `__builtin_popcountll` i `__builtin_ctzll`.

### Svi podskupovi u jednoj petlji

Evo nagrade zbog koje se bitmaske i uče.

Svaki podskup od `n` elemenata je jedna maska, a svaka maska je broj između `0` i `2^n - 1`. Prolazak kroz sve podskupove je zato prosto prolazak kroz sve brojeve iz tog opsega:
~!
```c++
int main(){

    int n = 3;
    vector<int> a = {1, 2, 3};

    for(int maska=0;maska<(1<<n);maska++){

        cout<<"{ ";

        for(int i=0;i<n;i++){
            if((maska>>i)&1){
                cout<<a[i]<<" ";
            }
        }

        cout<<"}"<<'\n';
    }

    return 0;
}
```
Izlaz:
`{ }`
`{ 1 }`
`{ 2 }`
`{ 1 2 }`
`{ 3 }`
`{ 1 3 }`
`{ 2 3 }`
`{ 1 2 3 }`

Svih osam podskupova, bez rekurzije, bez `push_back`-a i bez ičega što treba poništavati na povratku. Ceo generator iz poglavlja o rekurziji sveo se na dve `for` petlje.

Redosled je drugačiji nego u rekurzivnoj verziji, jer sada podskupovi izlaze poređani po svom broju. To je najčešće prednost, i u sledećoj lekciji ćemo se dobro osloniti na nju.

>Napomena:
>`1<<n` je `2^n`, pa se `maska<(1<<n)` čita kao "za svaki od `2^n` podskupova". Pisati `pow(2,n)` ovde je greška - `pow` vraća `double`, a poređenje `int`-a sa `double`-om u uslovu petlje je način na koji se gubi poslednji podskup.


### Skupovi kao brojevi

Pošto je maska zapravo skup, operatori nad bitovima postaju operatori nad skupovima:

| Operacija nad skupovima                                     | Kod            |
| ------------------------------------------------------------ | -------------- |
| unija A i B (svi elementi iz A i svi elementi iz B)          | `a \| b`       |
| presek A i B (elementi koji su i u A i u B)                  | `a & b`        |
| sve iz A što nije u B                                        | `a & ~b`       |
| sve što je u tačno jednom od njih                            | `a ^ b`        |
| da li je B sadržan u A?                                      | `(a & b) == b` |
| da li nemaju nijedan zajednički element?                     | `(a & b) == 0` |

	![[bitmask-set-ops.png|Maske a jednako 1100 i b jednako 1010 nacrtane kao redovi punih i praznih krugova, sa četiri rezultata ispod njih: a ili b daje 1110 što je 14, a i b daje 1000 što je 8, a i ne b daje 0100 što je 4, a a xor b daje 0110 što je 6]]

Hajde da ih proverimo:
~!
```c++
int main(){

    int a = 12; //1100
    int b = 10; //1010

    cout<<(a | b)<<'\n';
    cout<<(a & b)<<'\n';
    cout<<(a & ~b)<<'\n';
    cout<<(a ^ b)<<'\n';

    return 0;
}
```
Izlaz:
`14`
`8`
`4`
`6`

`a` je `{2,3}`, a `b` je `{1,3}`. Njihova unija je `{1,2,3}`, odnosno `1110`, odnosno `14`. Presek je `{3}`, odnosno `1000`, odnosno `8`. Provera da li jedan skup sadrži drugi, koja bi inače bila petlja kroz `vector`, sada je jedno `&` i jedno `==`.

### Važne zamke:

**Prva je prioritet operatora.** U C++-u `==` vezuje jače od `&`. Zato ovo izgleda ispravno, a nije:
~!
```c++
int main(){

    int maska = 5; //0101

    if(maska & (1<<1) == 0){
        cout<<"element 1 nedostaje";
    }else{
        cout<<"element 1 je unutra";
    }

    return 0;
}
```
Izlaz: `element 1 je unutra`

Ali `5` je `0101`, a bit `1` je očigledno `0`. Ono što je kompajler pročitao je `maska & ((1<<1) == 0)`, što je `maska & 0`, što je `0`, što je netačno - pa smo završili u `else` grani.

Rešenje je da izraz sa maskom stavimo u zagrade, ili još bolje, da bit uvek proveravamo na isti način:

`if(((maska>>1)&1) == 0)`

**Druga je tip jedinice.** Pomeranje se izvršava u tipu levog operanda, a obična `1` je `int`:
~!
```c++
int main(){

    long long a = 1<<40;
    long long b = 1LL<<40;

    cout<<a<<'\n';
    cout<<b;

    return 0;
}
```
Izlaz:
`0`
`1099511627776`

Dodela u `long long` nas ne spasava, jer se pomeranje već dogodilo u 32 bita i sve pobacalo. Pomeranje `int`-a za 40 mesta je nedefinisano ponašanje, pa je rezultat ono što se kompajleru prohte - ovde je prosto ispalo `0`.

Pravilo je kratko: **čim maska može da ima više od 31 bita, svako `1<<i` postaje `1LL<<i`.** Uključi upozorenja kompajlera i gcc će ti sam pokazati na ovu grešku.

### Šetnja kroz podmaske

Ponekad nam ne trebaju svi podskupovi celog skupa, nego svi podskupovi jedne određene maske. Na primer, kada delimo društvo u dve ekipe: izaberemo podmasku, a ostatak maske je druga ekipa.

Za to postoji poznata petlja u jednom redu:
~!
```c++
int main(){

    int maska = 13; //1101

    for(int pod=maska; pod>0; pod=(pod-1)&maska){
        cout<<pod<<" ";
    }

    return 0;
}
```
Izlaz: `13 12 9 8 5 4 1 `

Oduzimanje jedinice od `pod` gasi njegov najniži upaljen bit i pali sve bitove ispod njega. `& maska` onda briše bitove koji tu ionako nisu smeli da se nađu, a ono što ostane je sledeća manja podmaska. Ponavljanjem toga prolazimo kroz sve njih, od same maske pa naniže do `0`.

	![[bitmask-submask-walk.png|Šetnja kroz podmaske maske 1101 u sedam redova, gde svaki pokazuje pod, zatim pod minus 1, pa tu vrednost u konjunkciji sa maskom, što postaje sledeći pod, redom 13, 12, 9, 8, 5, 4, 1 i zaustavlja se na 0]]

Pokretanje ove petlje za svaku masku ne košta **O(2^n * 2^n)**, kako na prvi pogled izgleda. Maska sa `k` upaljenih bitova ima `2^k` podmaski, a kada se to sabere po svim maskama dobija se **O(3^n)** - veliki broj, ali sasvim drugačiji.

>Napomena:
>Maske su veoma efikasne, korisne i lake za upotrebu (kada ih jednom razumeš). Cena je to što ne mogu često da se primene. U `long long` bitmasku staje samo 64 elementa!

Za kraj, bitmaske su tehnika koja se prosto mora znati - i kao optimizacija, i kao osnova za DP nad bitmaskama!
