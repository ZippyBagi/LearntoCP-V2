>U ovoj lekciji naučićemo kako da proverimo da li je tačka unutar poligona - jedino pitanje na koje čovek odgovori jednim pogledom, a računar ne ume.

Za **konveksan** poligon bismo skoro pogodili odgovor: tačka koja je unutra ostaje sa iste strane svake stranice, pa prva stranica koja je ostavi sa druge strane dokazuje da je napolju.

Većina poligona u zadacima nije konveksna, a jedno jedino udubljenje ruši tu ideju - tačka može da bude duboko unutar oblika i da i dalje bude sa pogrešne strane stranice koja pravi udubljenje.

Zato nam treba nešto što uopšte ne mari za oblik.

### Trik sa polupravom

Stani u tačku `T` i kreni pravo udesno, u beskonačnost. Prebroj koliko stranica pređeš.

Dovoljno daleko desno sigurno smo **van poligona**. Sada se vraćaj nazad ka `T`: svaka stranica preko koje pređeš je granica, a svaki prelazak granice te prebacuje sa jedne strane na drugu.

Znači, dovoljno je da brojimo:

- **neparan** broj preseka => `T` je unutra
- **paran** broj preseka => `T` je napolju

Udubljenja, šiljci, dugački uski hodnici - sve to radi, jer je svaka njihova ivica i dalje samo granica preko koje se prelazi.

	![[ray-casting-parity.png|Poligon sa udubljenjem i tri vodoravna zraka ispaljena iz različitih tačaka, sa 3, 3 i 0 preseka, pa neparan broj znači unutra a paran napolju]]

### Kada se stranica broji

Stranica od `A` do `B` je presečena kada važe dve stvari:

1. **Doseže preko visine tačke `T`** - jedan kraj iznad `T`, drugi ispod.
2. Presek je **desno** - stranice levo od `T` nisu naša briga.

Prvo je obično poređenje `y` koordinata. Drugo je pitanje sa koje strane, pa na njega odgovara `orientation`: za stranicu koja ide nagore presek je desno tačno kada je `T` levo od nje. Za stranicu koja ide nadole znak se okreće.

	![[ray-crossing-test.png|Tri mreže koje prikazuju kada se stranica broji za zrak iz T: ne broji se kada su oba kraja iznad zraka, ne broji se kada je presek iza T, a broji se kada stranica prelazi preko i presek je ispred]]

### Problem sa temenom

Evo jedine stvari koja ruši ovaj algoritam.

Kada poluprava prolazi tačno kroz teme, tu se sastaju dve stranice. Ako se obe broje, parnost je pomerena za jedan i odgovor se okrene.

Rešava se jednim jedinim znakom - proveru visine pišemo kao **strogo iznad** sa obe strane:

~!
```c++
(a.y > t.y) != (b.y > t.y)
```

Teme na visini tačke `T` nije iznad nje, pa obe njegove stranice sa te strane dobijaju `false`. Stranica čiji je drugi kraj iznad dobija `true != false` i broji se. Stranica koja ide nadole dobija `false != false` i ne broji se. Tačno jedan presek, što smo i hteli.

Isto pravilo usput rešava i vodoravne stranice: oba kraja su na istoj visini, pa se dve strane izraza `!=` uvek slažu i stranica se preskače.

	![[ray-corner-rule.png|Tri mreže u kojima zrak dodiruje teme poligona, sa 1 presekom kada jedna stranica ide gore a druga dole, 0 kada obe idu dole, i 2 kada obe idu gore, pa dodirnuto teme nikada ne menja parnost]]

>Napomena:
>`>` sa obe strane, nikako `>=` sa jedne. Deluje kao proizvoljan detalj, a u njemu je ceo dokaz ispravnosti - ako se pogreši, rešenje prolazi svaki test koji nacrtaš rukom, pa padne na onom sa ravnim vrhom.

### Implementacija

Ostaje još jedna stvar. Provera polupravom ne govori ništa pouzdano o tački koja stoji **na** stranici, pa stranice prvo proveravamo funkcijom `onSegment`, a šta granica znači prepuštamo zadatku.

Poligon je strelica iz lekcije o poligonima - kvadrat kome je gornja strana uvučena ka unutra do tačke `(2, 1)`.

PointInPolygon.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

struct v{

    long long x, y;
};

v sub(v a, v b){

    return {a.x - b.x, a.y - b.y};
}

long long cross(v a, v b){

    return (a.x * b.y) - (a.y * b.x);
}

char orientation(v a, v b, v c){

    long long prod = cross(sub(b, a), sub(c, a));

    if(prod > 0){
        return '+';
    }

    if(prod < 0){
        return '-';
    }

    return '=';
}

bool inBox(v a, v b, v p){

    return min(a.x, b.x) <= p.x && p.x <= max(a.x, b.x) &&
           min(a.y, b.y) <= p.y && p.y <= max(a.y, b.y);
}

bool onSegment(v a, v b, v p){

    return orientation(a, b, p) == '=' && inBox(a, b, p);
}

bool crossesToTheRight(v a, v b, v t){

    if((a.y > t.y) == (b.y > t.y)){ //stranica ne doseže preko visine tačke t
        return false;
    }

    char o = orientation(a, b, t);

    return (b.y > a.y) ? (o == '+') : (o == '-'); //da li je presek desno
}

int locate(vector<v> p, v t){ // 1 unutra, -1 napolju, 0 na granici

    int n = p.size();
    int crossings = 0;

    for(int i = 0; i < n; i++){
        int j = (i + 1) % n; //poslednja stranica se vraća na prvu tačku

        if(onSegment(p[i], p[j], t)){
            return 0;
        }

        if(crossesToTheRight(p[i], p[j], t)){
            crossings++;
        }
    }

    return (crossings % 2 == 1) ? 1 : -1;
}

int main(){

    vector<v> arrow = {{0, 0}, {4, 0}, {4, 4}, {2, 1}, {0, 4}};

    cout<<locate(arrow, {1, 1})<<'\n'; //unutra
    cout<<locate(arrow, {2, 2})<<'\n'; //u udubljenju
    cout<<locate(arrow, {5, 1})<<'\n'; //daleko napolju
    cout<<locate(arrow, {2, 0})<<'\n'; //na sredini donje stranice
    cout<<locate(arrow, {2, 1})<<'\n'; //baš udubljeno teme

    return 0;
}
```
Output:
`1`
`-1`
`-1`
`0`
`0`

Primeti da se smer obilaska nigde nije pojavio, pa ništa ne moramo da pripremamo unapred. Ovo je **O(n)** po tački.

### Konveksni poligoni, brže

**O(n)** po tački je sasvim u redu ako pitamo jednom. Ali kada zadatak zada jedan poligon pa pita za $10^5$ tačaka, više nije.

Konveksan poligon se deli na lepezu trouglova koji dele teme `p[0]`, a ti trouglovi stoje u redosledu po uglu. Sve što je poređano po uglu možemo da binarno pretražimo, pa:

1. Binarnom pretragom nađemo u koji trougao lepeze tačka pada.
2. Proverimo je jednim pozivom `orientation` u odnosu na naspramnu stranicu tog trougla.

Dve stvari moraju prvo da važe: temena su navedena suprotno od kazaljke na satu (znak iz formule pertle nam to kaže), i tačka je unutar isečka između prve i poslednje stranice koje polaze iz `p[0]`.

ConvexPointInPolygon.cpp
```c++
int locateConvex(vector<v> p, v t){ // p mora biti konveksan i suprotno od kazaljke

    int n = p.size();

    char first = orientation(p[0], p[1], t);
    char last = orientation(p[0], p[n - 1], t);

    if(first == '-' || last == '+'){ //van isečka kod p[0]
        return -1;
    }

    if(first == '='){ //na prvoj stranici, ako je unutar okvira
        return onSegment(p[0], p[1], t) ? 0 : -1;
    }

    if(last == '='){
        return onSegment(p[0], p[n - 1], t) ? 0 : -1;
    }

    int lo = 1, hi = n - 1; //tražimo trougao lepeze p[0] p[lo] p[lo+1]

    while(hi - lo > 1){
        int mid = (lo + hi) / 2;

        if(orientation(p[0], p[mid], t) != '-'){
            lo = mid;
        }
        else{
            hi = mid;
        }
    }

    char o = orientation(p[lo], p[lo + 1], t); //naspramna stranica tog trougla

    if(o == '='){
        return 0;
    }

    return (o == '+') ? 1 : -1;
}

int main(){

    vector<v> square = {{0, 0}, {4, 0}, {4, 4}, {0, 4}}; //suprotno od kazaljke

    cout<<locateConvex(square, {2, 2})<<'\n'; //unutra
    cout<<locateConvex(square, {5, 2})<<'\n'; //napolju
    cout<<locateConvex(square, {4, 2})<<'\n'; //na desnoj stranici
    cout<<locateConvex(square, {0, 0})<<'\n'; //samo teme pivota
    cout<<locateConvex(square, {2, 5})<<'\n'; //iznad poligona

    return 0;
}
```
Output:
`1`
`-1`
`0`
`0`
`-1`

**O(log n)** po tački, bez ikakve pripreme osim sređivanja smera obilaska.

>Napomena:
>Samo za konveksne poligone. Jedno jedino udubljenje uništava redosled po uglu od koga binarna pretraga zavisi, a jeftina verzija za opšti slučaj ne postoji.
