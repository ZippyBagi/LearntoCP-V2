>U ovoj lekciji zatvaramo poglavlje jedinim oblikom koji nije sastavljen od pravih delova.

Krug nema temena čije bismo orijentacije računali, pa se ništa od mašinerije sa vektorskim proizvodom ne prenosi. Zamena je jednostavnija: kružnica je samo **skup svih tačaka na rastojanju `r` od centra**, a rastojanje merimo još od prve lekcije.

### Tačka i krug

Ostavi `r` onakvo kakvo je dato, a u poređenjima koristi `r * r` - isto pravilo kao `dist2`, iz istog razloga. Obe strane su nenegativne, pa kvadriranje ništa ne menja osim što nas drži u celim brojevima:

- `dist2(C, P) < r * r` => unutra
- `dist2(C, P) == r * r` => tačno na kružnici
- `dist2(C, P) > r * r` => napolju

PointCircle.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

struct v{

    long long x, y;
};

struct circle{

    v c;
    long long r;
};

v sub(v a, v b){

    return {a.x - b.x, a.y - b.y};
}

long long dot(v a, v b){

    return (a.x * b.x) + (a.y * b.y);
}

long long cross(v a, v b){

    return (a.x * b.y) - (a.y * b.x);
}

long long dist2(v a, v b){

    return dot(sub(a, b), sub(a, b));
}

int pointVsCircle(circle k, v p){ // 1 unutra, 0 na kružnici, -1 napolju

    long long d2 = dist2(k.c, p);
    long long r2 = k.r * k.r;

    if(d2 < r2){
        return 1;
    }

    if(d2 == r2){
        return 0;
    }

    return -1;
}

int main(){

    circle k = {{0, 0}, 5};

    cout<<pointVsCircle(k, {3, 3})<<'\n'; //unutra
    cout<<pointVsCircle(k, {3, 4})<<'\n'; //tačno na njoj
    cout<<pointVsCircle(k, {5, 5})<<'\n'; //napolju

    return 0;
}
```
Output:
`1`
`0`
`-1`

Svaka vrednost ovde je ceo broj, pa je "tačno na kružnici" pitanje na koje zaista možemo da odgovorimo. To je i poslednji put u ovoj lekciji da nam je ovako lako.

Svaki isečak koda odavde nadalje pretpostavlja da su ove funkcije već napisane iznad njega.

### Prava i krug

Sve odlučuje jedan broj: rastojanje po normali `d` od centra do prave.

| | Tačaka |
| ---- | ---- |
| `d > r` | 0, prava promašuje |
| `d = r` | 1, **tangenta** |
| `d < r` | 2 |

	![[line-circle-cases.png|Tri kruga sa pravom na različitim rastojanjima d od centra: d veće od r daje nula presečnih tačaka, d jednako r daje jednu, a d manje od r daje dve]]

Prethodna lekcija nam daje `d`, a mi ga samo poredimo sa `r`, pa kvadriramo obe strane i brojanje ostaje u celim brojevima:

$$(\vec{AB} \times \vec{AC})^2 \quad \text{u odnosu na} \quad r^2 \cdot |\vec{AB}|^2$$

Za same tačke realni brojevi se ne mogu izbeći, ali je konstrukcija kratka:

1. Spusti normalu iz centra na pravu. Mesto gde padne je **podnožje** - senka iz prethodne lekcije ga stavlja na $A + t \cdot \vec{AB}$ gde je $t = \frac{\vec{AB} \cdot \vec{AC}}{|\vec{AB}|^2}$.
2. Podnožje, centar i jedna presečna tačka čine pravougli trougao sa hipotenuzom `r` i jednom katetom `d`, pa je treća stranica $\sqrt{r^2 - d^2}$.
3. Zakorači toliko od podnožja na obe strane i tu su obe presečne tačke.

	![[line-circle-construction.png|Krug sa pravom koja ga seče, normala dužine d spuštena iz centra C do podnožja na pravoj, i pravougli trougao sa hipotenuzom r čija je druga kateta, koren iz r na kvadrat minus d na kvadrat, korak do svake presečne tačke]]

LineCircle.cpp
```c++
struct point{

    double x, y;
};

int lineCircle(circle k, v a, v b, vector<point> &out){ //vraća koliko ima tačaka

    v ab = sub(b, a);
    v ac = sub(k.c, a);

    long long ab2 = dot(ab, ab);
    long long cr = cross(ab, ac);

    long long lhs = cr * cr; //kvadrat rastojanja do prave, puta ab2
    long long rhs = k.r * k.r * ab2;

    out.clear();

    if(lhs > rhs){ //prava promašuje krug
        return 0;
    }

    double t = (double)dot(ab, ac) / ab2; //podnožje normale
    point foot = {a.x + t * ab.x, a.y + t * ab.y};

    if(lhs == rhs){ //tangenta, podnožje je ta jedina tačka
        out.push_back(foot);
        return 1;
    }

    double d2 = (double)lhs / ab2; //pravi kvadrat rastojanja
    double step = sqrt(((double)k.r * k.r - d2) / ab2); //koliko koračamo, u jedinicama ab

    out.push_back({foot.x - step * ab.x, foot.y - step * ab.y});
    out.push_back({foot.x + step * ab.x, foot.y + step * ab.y});

    return 2;
}

void print(vector<point> p){

    for(int i = 0; i < p.size(); i++){
        cout<<" ("<<p[i].x<<", "<<p[i].y<<")";
    }

    cout<<'\n';
}

int main(){

    cout<<fixed<<setprecision(2);

    circle k = {{0, 0}, 5};
    vector<point> p;

    cout<<lineCircle(k, {-10, 3}, {10, 3}, p); print(p); //preseca
    cout<<lineCircle(k, {-10, 5}, {10, 5}, p); print(p); //tangenta na vrhu
    cout<<lineCircle(k, {-10, 7}, {10, 7}, p); print(p); //promašuje

    return 0;
}
```
Output:
`2 (-4.00, 3.00) (4.00, 3.00)`
`1 (0.00, 5.00)`
`0`

Ovde je reč o **pravoj** kroz `A` i `B`, a ne o duži. Za duž prvo nađi tačke, pa onda svaku proveri testom sa senkom iz prethodne lekcije.

### Dva kruga

Opet sve odlučuje jedan broj: rastojanje `d` između centara, u odnosu na poluprečnike. Zamisli kako krugove polako razmičeš i svi slučajevi se pojavljuju redom:

| Slučaj | Tačaka |
| ---- | ---- |
| $d > r_1 + r_2$ | 0, previše daleko |
| $d = r_1 + r_2$ | 1, dodiruju se spolja |
| $\|r_1 - r_2\| < d < r_1 + r_2$ | 2 |
| $d = \|r_1 - r_2\|$ | 1, dodiruju se iznutra |
| $d < \|r_1 - r_2\|$ | 0, jedan je unutar drugog |
| $d = 0$ i $r_1 = r_2$ | isti krug, beskonačno mnogo |

	![[circle-circle-cases.png|Pet rasporeda dva kruga poređanih po rastojanju d između centara, sa 0, 1, 2, 1 i 0 presečnih tačaka kako krugovi prelaze iz potpuno razdvojenih u jedan unutar drugog]]

Kvadriranje vraća celu tabelu u cele brojeve - poredi $d^2$ sa $(r_1 + r_2)^2$ i $(r_1 - r_2)^2$, a apsolutna vrednost nestaje sama od sebe.

Konstrukcija ide isto kao kod prave. Dve tačke su simetrične u odnosu na pravu kroz centre, koju seku na rastojanju $a = \frac{d^2 + r_1^2 - r_2^2}{2d}$ od $C_1$, a Pitagora daje korak po normali $h = \sqrt{r_1^2 - a^2}$. Da bismo koračali normalno na $(x, y)$ koristimo $(-y, x)$ - isti vektor okrenut za četvrtinu kruga.

	![[circle-circle-construction.png|Dva kruga koja se seku, sa centrima C1 i C2, rastojanjem a mereno duž linije centara do zajedničke tetive, i polovinom tetive h normalnom na nju koja stiže do obe presečne tačke]]

CircleCircle.cpp
```c++
int circleCircle(circle k1, circle k2, vector<point> &out){ //-1 znači isti krug

    v dc = sub(k2.c, k1.c);
    long long d2 = dot(dc, dc);

    out.clear();

    if(d2 == 0){ //isti centar - ili je isti krug ili ničega nema
        return (k1.r == k2.r) ? -1 : 0;
    }

    long long sum = (k1.r + k2.r) * (k1.r + k2.r);
    long long dif = (k1.r - k2.r) * (k1.r - k2.r);

    if(d2 > sum || d2 < dif){
        return 0;
    }

    double d = sqrt((double)d2);
    double a = ((double)d2 + (double)k1.r * k1.r - (double)k2.r * k2.r) / (2 * d);

    point base = {k1.c.x + a * dc.x / d, k1.c.y + a * dc.y / d};

    if(d2 == sum || d2 == dif){ //tangenta, spolja ili iznutra
        out.push_back(base);
        return 1;
    }

    double h = sqrt((double)k1.r * k1.r - a * a);
    point step = {-h * dc.y / d, h * dc.x / d}; //normalno na pravu kroz centre

    out.push_back({base.x - step.x, base.y - step.y});
    out.push_back({base.x + step.x, base.y + step.y});

    return 2;
}

int main(){

    cout<<fixed<<setprecision(2);

    circle k = {{0, 0}, 5};
    vector<point> p;

    cout<<circleCircle(k, {{8, 0}, 5}, p); print(p); //preklapaju se
    cout<<circleCircle(k, {{10, 0}, 5}, p); print(p); //dodiruju se spolja
    cout<<circleCircle(k, {{20, 0}, 5}, p); print(p); //previše daleko
    cout<<circleCircle(k, {{1, 0}, 1}, p); print(p); //mali je unutar velikog
    cout<<circleCircle(k, {{0, 0}, 5}, p); print(p); //isti krug

    return 0;
}
```
Output:
`2 (4.00, -3.00) (4.00, 3.00)`
`1 (5.00, 0.00)`
`0`
`0`
`-1`

Na četvrtu liniju vredi se vratiti. Nula tačaka, a mali krug je ipak ceo unutar velikog - broj presečnih tačaka ne govori ništa o tome da li je jedan krug unutar drugog, a to je zaseban test: $d + r_2 \le r_1$.

### Zamka: tangenta

Svaka tabela u ovoj lekciji ima srednji red u kome su dve stvari tačno jednake, i upravo ti redovi ruše rešenja.

Ako je ulaz celobrojan, nema problema - `lhs == rhs` i `d2 == sum` porede cele brojeve. Ali čim krug dođe iz nekog računa umesto iz ulaza, tangenta koja je trebalo da padne na `d == r` stigne pomerena za $10^{-15}$, i odgovor tiho postane 0 ili 2 tačke umesto 1.

Zato, kada su realni brojevi neizbežni, poredi sa tolerancijom:

~!
```c++
const double EPS = 1e-9;

if(abs(d - r) < EPS){ //tretiramo kao tangentu
    ...
}
```

`EPS` je **tolerancija, a ne magičan broj**. `1e-9` je razumno oko 1, a beznadežno usko oko $10^9$, gde je `double` te cifre ionako već izgubio. `EPS` menja i sam odgovor: krugove koji se mimoiđu za $10^{-12}$ sada prijavljujemo kao da se dodiruju. Obično je baš to ono što zadatak i traži, ali je svakako odluka koju donosiš svesno.

>Napomena:
>Sa celobrojnim ulazom nemoj uvoditi realne brojeve samo da bi poredio. Svako pitanje o broju tačaka ovde je tačno u `long long`; jedino koordinate samih tačaka traže `sqrt`. Pazi ipak na `cr * cr` u `lineCircle` - samo `cr` stiže do $4 \cdot 10^{18}$, pa tačan test važi samo do koordinata od otprilike $10^4$.

I time se poglavlje zatvara. Orijentacija, presek duži, površina poligona, omotač, i sada krugovi - sve je izašlo iz dve operacije nad vektorima. Nauči skalarni i vektorski proizvod kako treba i ostalo je knjigovodstvo.
