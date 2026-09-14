>U ovoj lekciji učimo o vektorima - objektu od kog je zapravo sagrađen skoro svaki geometrijski zadatak (ne mešati sa strukturom podataka).

### Šta je vektor

Vektor je **strelica**: ima pravac, smer i dužinu, ali **nema** fiksni položaj. Zapisujemo ga kao par brojeva, $\vec{v} = (x, y)$, što čitamo kao "pomeri se `x` udesno i `y` nagore".

Znači, tačka i vektor se čuvaju na potpuno isti način - kao dva broja. Razlika je samo u tome kako o njima razmišljamo:

- tačka je **mesto** (gde se nešto nalazi)
- vektor je **pomeraj** (kako da stignemo negde)

Dve strelice iste dužine i istog smera su **isti vektor**, bez obzira gde ih nacrtamo. To znači ono "nema fiksni položaj", i baš zato su vektori toliko zgodni: možemo ih slobodno pomerati tamo gde nam trebaju u računu.

	![[vector-no-position.png|Isti vektor (3,2) nacrtan kao četiri odvojene strelice koje kreću iz različitih tačaka na mreži, sve iste dužine i istog smera, pa su sve četiri isti vektor]]

### Od tačaka do vektora

Vektor koji nas vodi od tačke `A` do tačke `B` je prosto razlika njihovih koordinata:

$$\vec{AB} = (B_x - A_x,\; B_y - A_y)$$

Ovo je najčešće korišćena operacija u geometrijskim zadacima. Skoro svaki zadatak počinje tako što tačke iz ulaza pretvorimo u vektore - i od tog trenutka radimo isključivo sa vektorima.

Na primer, za `A = (1, 2)` i `B = (4, 6)`:

$$\vec{AB} = (4 - 1,\; 6 - 2) = (3, 4)$$

Što nam govori upravo ono što očekujemo: da bismo od `A` stigli do `B`, idemo 3 udesno i 4 nagore.

Pazi na redosled: $\vec{BA}$ nije isto što i $\vec{AB}$, to je potpuno suprotna strelica, $\vec{BA} = -\vec{AB}$. Oduzimanje u pogrešnom redosledu je jedna od najčešćih grešaka u geometrijskom kodu.

	![[vector-from-points.png|Tačke A (1,2) i B (4,6) spojene sa dve suprotne strelice, AB jednako (3,4) dobijeno kao B minus A, i BA jednako (-3,-4), što pokazuje da je BA suprotno od AB]]

### Operacije nad vektorima

Postoje tri osnovne stvari koje možemo da radimo sa vektorima:

**Sabiranje** - izvršavanje jednog pomeraja pa zatim drugog:

$$\vec{u} + \vec{v} = (u_x + v_x,\; u_y + v_y)$$

**Oduzimanje** - pomeraj od vrha vektora $\vec{v}$ do vrha vektora $\vec{u}$:

$$\vec{p} - \vec{v} = (p_x - v_x,\; p_y - v_y)$$

**Množenje skalarom** - istezanje strelice brojem `k`. Pravac ostaje isti, a dužina se množi sa `k`; negativno `k` okreće strelicu na suprotnu stranu:

$$k \cdot \vec{v} = (k \cdot v_x,\; k \cdot v_y)$$

	![[vector-operations.png|Tri mreže koje prikazuju sabiranje vektora nadovezivanjem, oduzimanje kao strelicu od vrha v do vrha u, i množenje skalarom gde negativan činilac okreće strelicu na suprotnu stranu]]

### Dužina vektora

Vektor ima **dužinu** (intenzitet), a to je ista ona formula za rastojanje iz prethodne lekcije:

$$|\vec{v}| = \sqrt{v_x^2 + v_y^2}$$
### Implementacija

U C++-u sve ovo možemo napisati kao nekoliko malih funkcija pored naše strukture.

Vector.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

struct v{

    long long x, y;
};

v add(v a, v b){

    return {a.x + b.x, a.y + b.y};
}

v sub(v a, v b){

    return {a.x - b.x, a.y - b.y};
}

v scale(v a, long long k){

    return {a.x * k, a.y * k};
}

long long len2(v a){ // kvadrat duzine - ostaje ceo broj!

    return a.x * a.x + a.y * a.y;
}

double len(v a){

    return sqrt((double)len2(a));
}

double dist(v a, v b){

    return len(sub(b, a));
}

int main(){

    v a = {1, 2};
    v b = {4, 6};

    v ab = sub(b, a); // vektor od a do b

    cout<<"Vektor AB: ("<<ab.x<<", "<<ab.y<<")\n";
    cout<<"Duzina: "<<len(ab)<<'\n';
    cout<<"Rastojanje od a do b: "<<dist(a, b);

    return 0;
}
```
Output:
`Vektor AB: (3, 4)`
`Duzina: 5`
`Rastojanje od a do b: 5`
### Rezime

| Operacija | Formula | Napomena |
| ---- | ---- | ---- |
| Vektor `A` do `B` | $(B_x - A_x,\; B_y - A_y)$ | oduzmi početnu tačku |
| Sabiranje | $(u_x + v_x,\; u_y + v_y)$ | jedan pomeraj pa drugi |
| Oduzimanje | $(u_x - v_x,\; u_y - v_y)$ | pazi na redosled |
| Množenje skalarom | $(k \cdot v_x,\; k \cdot v_y)$ | negativno `k` okreće smer |
| Dužina | $\sqrt{v_x^2 + v_y^2}$ | ista formula kao rastojanje |

>Vektori su glavni alat kojim rešavamo geometrijske zadatke, a u narednim lekcijama ćemo videti kako da ih iskoristimo!
