>U ovoj lekciji prestajemo da postavljamo pitanja sa odgovorom da ili ne i počinjemo da tražimo brojeve - koliko daleko, i tačno gde.

Sve do sada bio je znak: sa koje strane, da li se seku, da li je unutra. Zato je sve ostalo u celim brojevima i sve je bilo tačno.

Rastojanja i tačke preseka su **mere**, a mere ispadaju razlomci. Ovde konačno napuštamo cele brojeve

### Senka

Skalarni proizvod je do sada imao jedan posao: da nam kaže kada su dva vektora normalna. Ali on ume mnogo više od toga.

Uperi svetlo pravo nadole na vektor $\vec{u}$ i drži $\vec{w}$ iznad njega. Senka koju $\vec{w}$ baca na $\vec{u}$ zove se njegova **projekcija**, i počinje od početka vektora $\vec{u}$.

Već i sam znak skalarnog proizvoda govori nam gde senka pada:

- `dot(u, w) > 0` => senka pada **unapred**, u smeru u kome $\vec{u}$ pokazuje
- `dot(u, w) < 0` => pada **unazad**, iza početka vektora $\vec{u}$
- `dot(u, w) = 0` => senke nema, slučaj sa normalnim vektorima koji smo već znali

	![[projection-shadow.png|Tri mreže koje prikazuju projekciju vektora w na u kao senku duž u: usmerenu unapred kada je skalarni proizvod pozitivan, unazad kada je negativan, i bez senke kada je nula]]
### Rastojanje do prave

Već znamo dva načina da zapišemo površinu trougla `ABP`:

- preko vektorskog proizvoda: $\frac{|\vec{AB} \times \vec{AP}|}{2}$
- onako kako smo učili u školi: $\frac{osnovica \cdot visina}{2}$

Uzmi `AB` za osnovicu i visina je tačno rastojanje po normali koje tražimo. Jedna površina, dva izraza, dakle:

$$dist(P, AB) = \frac{|\vec{AB} \times \vec{AP}|}{|\vec{AB}|}$$

Apsolutna vrednost je tu zato što vektorski proizvod ima znak, a rastojanje nema.

	![[point-line-distance.png|Trougao ABP na mreži sa visinom d spuštenom iz P na AB, i površina zapisana na dva načina, kao vektorski proizvod podeljen sa 2 i kao osnovica puta visina podeljeno sa 2, pa je d vektorski proizvod podeljen dužinom AB]]

### Rastojanje do duži

Duž se negde završava, pa je normala odgovor samo ponekad - najbliža tačka može da bude i `A` ili `B`. Senka nam kaže koji je od tri slučaja:

- `dot(AB, AP) <= 0` => senka pada iza `A`, pa je `A` najbliža
- `dot(AB, BP) >= 0` => doseže preko `B`, pa je `B` najbliža
- inače => normala pada na duž

	![[segment-distance-three-cases.png|Tri slučaja za rastojanje tačke P do duži AB: normala pada na duž, najbliža tačka je kraj B, ili je najbliža tačka kraj A]]

Obe provere su celobrojni skalarni proizvodi, pa se pri biranju slučaja ne gubi preciznost. Jedini realan broj u celoj funkciji je rastojanje koje vraćamo.

Distance.cpp
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

long long dot(v a, v b){

    return (a.x * b.x) + (a.y * b.y);
}

double len(v a){

    return sqrt((double)(a.x * a.x + a.y * a.y));
}

double distToLine(v a, v b, v p){

    return abs((double)cross(sub(b, a), sub(p, a))) / len(sub(b, a));
}

double distToSegment(v a, v b, v p){

    if(dot(sub(b, a), sub(p, a)) <= 0){ //senka pada iza a
        return len(sub(p, a));
    }

    if(dot(sub(b, a), sub(p, b)) >= 0){ //senka doseže preko b
        return len(sub(p, b));
    }

    return distToLine(a, b, p); //normala pada na duž
}

int main(){

    cout<<fixed<<setprecision(4);

    v a = {0, 0};
    v b = {4, 0};

    cout<<distToLine(a, b, {1, 3})<<" "<<distToSegment(a, b, {1, 3})<<'\n';
    cout<<distToLine(a, b, {6, 3})<<" "<<distToSegment(a, b, {6, 3})<<'\n';
    cout<<distToLine(a, b, {-3, 4})<<" "<<distToSegment(a, b, {-3, 4})<<'\n';
    cout<<distToLine(a, b, {2, 0})<<" "<<distToSegment(a, b, {2, 0})<<'\n';

    return 0;
}
```
Output:
`3.0000 3.0000`
`3.0000 3.6056`
`4.0000 5.0000`
`0.0000 0.0000`

U srednje dve linije se dve funkcije razilaze: `(6, 3)` je iza kraja, pa je najbliža tačka `B`, a `(-3, 4)` je iza početka, pa je to `A`.

### Gde se seku dve prave

Opiši prvu pravu kao šetnju koja kreće iz `A`:

$$P = A + t \cdot \vec{AB}$$

pa nas `t = 0` stavlja u `A`, `t = 1` u `B`, a `t = 0.5` tačno na sredinu. Naći tačku preseka znači naći jedan broj, `t`:

$$t = \frac{\vec{AC} \times \vec{CD}}{\vec{AB} \times \vec{CD}}$$

I brojilac i imenilac su celobrojni vektorski proizvodi, a deljenje je jedno jedino, na samom kraju. To je najbolje što smo mogli - odgovor zaista može da bude razlomak.

Imenilac nas usput upozorava kada ne treba deliti. On je nula tačno kada su dva smera paralelna:

- nije nula => prave se seku u tačno jednoj tački
- nula, a `C` nije na pravoj `AB` => paralelne su, nikada se ne seku
- nula, a `C` jeste na pravoj `AB` => ista prava napisana dvaput

LineIntersection.cpp
```c++
struct point{

    double x, y;
};

int lineIntersection(v a, v b, v c, v d, point &out){ //1 jedna tačka, 0 paralelne, -1 ista prava

    v ab = sub(b, a);
    v cd = sub(d, c);

    long long den = cross(ab, cd);

    if(den == 0){
        return (cross(ab, sub(c, a)) == 0) ? -1 : 0;
    }

    double t = (double)cross(sub(c, a), cd) / den;

    out = {a.x + t * ab.x, a.y + t * ab.y};

    return 1;
}

int main(){

    cout<<fixed<<setprecision(2);

    v a = {0, 0};
    v b = {4, 4};

    point p;

    cout<<lineIntersection(a, b, {0, 4}, {4, 0}, p)<<" "<<p.x<<" "<<p.y<<'\n';
    cout<<lineIntersection(a, b, {0, 10}, {10, 0}, p)<<" "<<p.x<<" "<<p.y<<'\n';
    cout<<lineIntersection(a, b, {1, 0}, {5, 4}, p)<<'\n';
    cout<<lineIntersection(a, b, {2, 2}, {6, 6}, p)<<'\n';

    return 0;
}
```
Output:
`1 2.00 2.00`
`1 5.00 5.00`
`0`
`-1`

I u prve dve linije dobijamo po jednu tačku preseka, a razlika je bitna: `(2, 2)` je na sredini duži `AB`, dok je `(5, 5)` daleko iza `B`. Ova funkcija govori o **pravama**, a prave se nigde ne završavaju.

>Napomena:
>Postoji i drugi način da se prava zapiše, $ax + by + c = 0$, gde je $a = A_y - B_y$, $b = B_x - A_x$ i $c = A_x B_y - A_y B_x$. Kada tačku ubacimo u levu stranu, ispada tačno onaj vektorski proizvod iz orijentacije, samo sa delovima koji zavise od prave izračunatim jednom unapred. Korisno kada se jedna prava proverava sa jako mnogo tačaka.

### Kako ostati tačan

Kada `double` jednom prođe kroz deljenje, prestaje da bude ceo broj, i svako poređenje posle toga je nagađanje. Dve navike to sprečavaju.

**Ne računaj tačku kada pitanje nije o tački.**

"Da li je presek unutar duži `AB`" znači samo $0 \le t \le 1$, a `t` je razlomak dva cela broja koja već imamo:

~!
```c++
long long num = cross(sub(c, a), cd);
long long den = cross(ab, cd);

if(den < 0){ //držimo imenilac pozitivnim da se poređenje ne okrene
    num = -num;
    den = -den;
}

bool insideAB = (0 <= num && num <= den);
```

**Ne vadi koren samo da bi uporedio dva rastojanja.**

Za jednu istu pravu $|\vec{AB}|$ je isti pozitivan broj u oba slučaja, pa poređenje samo vrednosti $|\vec{AB} \times \vec{AP}|$ daje isti redosled. Za različite prave tačno poređenje traži četvrte stepene koordinata, koji prekorače `long long` mnogo pre nego što koordinate stignu do $10^9$ - tu je `double` sigurniji izbor.

>Pravilo ispod svega ovoga: znaci su tačni, mere nisu. Guraj deljenje što bliže konačnom odgovoru.
