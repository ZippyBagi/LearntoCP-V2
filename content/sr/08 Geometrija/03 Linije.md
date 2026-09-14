>U ovoj lekciji konačno koristimo vektorski proizvod za nešto konkretno - i ispostavlja se da je skoro svako pitanje o linijama isto pitanje, samo drugačije postavljeno.
 
Pre nego što počnemo, jedna napomena o nazivima. **Prava** se pruža unedogled u oba smera. **Duž** je samo deo između dve tačke i tu se završava. I jedno i drugo čuvamo na isti način - kao dve tačke `A` i `B` - pa razlika postoji samo u našoj glavi: da li smemo da produžimo preko `A` i `B` ili ne. Većina zadataka govori o dužima, pa ćemo na ovu razliku paziti svaki put kada je bitna.

### Orijentacija

Uzmimo pravu kroz tačke `A` i `B`, i još jednu tačku `C`. Postoje tačno tri mogućnosti: `C` je levo od prave, desno od prave, ili tačno na njoj.

Da bismo saznali koja, napravimo vektore $\vec{AB}$ i $\vec{AC}$ i pogledamo znak izraza $\vec{AB} \times \vec{AC}$:

- **pozitivan** - da bismo od $\vec{AB}$ stigli do $\vec{AC}$ skrećemo suprotno od kazaljke na satu, znači `C` je levo
- **negativan** - skrećemo u smeru kazaljke na satu, znači `C` je desno
- **nula** - vektori su paralelni, znači `C` leži na pravoj `AB`

Levo i desno gledamo iz ugla nekoga ko stoji u `A` i gleda ka `B`. Ako zamenimo `A` i `B`, svi znaci se okreću, što ima smisla - čovek se okrenuo.

>Ne opterećuj se previše time šta je "levo" a šta "desno", jedino što je bitno je poređenje sa nulom - da li je proizvod >0 ili <0

	![[orientation-sign.png|Mreža sa duži AB produženom isprekidanom linijom, gde je poluravan iznad obojena plavo sa primerom vektorskog proizvoda +16, a poluravan ispod crveno sa -16, čime se tri znaka preslikavaju u tri moguća odgovora o orijentaciji]]

Ovo ćemo koristiti stalno, pa hajde da napišemo funkciju. Primeti da vraća karakter, a ne broj: sama vrednost vektorskog proizvoda nas ovde nikada ne zanima, samo njen znak.

Orientation.cpp
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

char orientation(v a, v b, v c){ // gde je c u odnosu na pravu ab

    long long prod = cross(sub(b, a), sub(c, a));

    if(prod > 0){
        return '+';
    }

    if(prod < 0){
        return '-';
    }

    return '=';
}

int main(){

    v a = {0, 0};
    v b = {4, 4};

    cout<<orientation(a, b, {0, 4})<<'\n'; //levo
    cout<<orientation(a, b, {4, 0})<<'\n'; //desno
    cout<<orientation(a, b, {2, 2})<<'\n'; //na pravoj

    return 0;
}
```
Output:
`+`
`-`
`=`

Svaki isečak koda odavde nadalje pretpostavlja da su ove funkcije već napisane iznad njega.
### Da li tačka pripada duži

Kada `orientation` vrati `=`, to znači da je `C` na **pravoj** `AB`, onoj beskonačnoj. Tačka `(6, 6)` jeste na pravoj kroz `(0,0)` i `(4,4)`, iako se nalazi daleko iza `B`.

Za duž nam treba još jedna provera: tačka mora da bude između `A` i `B`. Pošto već znamo da leži na pravoj, ne moramo ništa da smišljamo - dovoljno je da su njene koordinate unutar pravougaonika koji razapinju `A` i `B`.

	![[on-segment-two-checks.png|Tri mreže koje proveravaju da li tačka leži na duži AB: (2,2) je na pravoj i unutar pravougaonika pa prolazi, (6,6) je na pravoj ali izvan pravougaonika, a (1,3) je unutar pravougaonika ali van prave]]

OnSegment.cpp
```c++
bool inBox(v a, v b, v p){

    return min(a.x, b.x) <= p.x && p.x <= max(a.x, b.x) &&
           min(a.y, b.y) <= p.y && p.y <= max(a.y, b.y);
}

bool onSegment(v a, v b, v p){

    return orientation(a, b, p) == '=' && inBox(a, b, p);
}

int main(){

    v a = {0, 0};
    v b = {4, 4};

    cout<<onSegment(a, b, {2, 2})<<'\n'; //na pravoj i unutar pravougaonika
    cout<<onSegment(a, b, {6, 6})<<'\n'; //na pravoj, ali iza b
    cout<<onSegment(a, b, {1, 3})<<'\n'; //unutar pravougaonika, ali nije na pravoj

    return 0;
}
```
Output:
`1`
`0`
`0`
### Zamka: `=` nije strana

Pre ili kasnije poželećemo da uporedimo dve orijentacije. Najčešći slučaj je pitanje da li su `C` i `D` sa iste strane prave `AB` - ako su obe levo, obe orijentacije su `+`, ako su obe desno, obe su `-`, pa prosto uporedimo dva karaktera:

SameSide.cpp
```c++
bool sameSide(v a, v b, v c, v d){

    return orientation(a, b, c) == orientation(a, b, d);
}

int main(){

    v a = {0, 0};
    v b = {4, 4};

    cout<<sameSide(a, b, {0, 4}, {4, 0})<<'\n'; //svaka sa svoje strane
    cout<<sameSide(a, b, {1, 1}, {3, 3})<<'\n'; //obe leze NA pravoj

    return 0;
}
```
Output:
`0`
`1`

Prvi red je tačan. Drugi je zamka. Obe tačke leže na pravoj, pa oba poziva vrate `=`, karakteri se poklope, i funkcija javi da su sa iste strane - iako `=` uopšte nije strana.

Ovde ne postoji tačan odgovor koji možemo prosto da izaberemo, šta treba da se desi zavisi od zadatka.

Kad god u tekstu zadatka piše "strogo unutar" ili "bez dodirivanja", reč je upravo o slučaju `=`. Pročitaj to pažljivo i odluči šta `=` treba da znači **pre** nego što napišeš poređenje.