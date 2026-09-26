
## Pristup

Sva četiri kvadranta su istog oblika, pa hajde da odgovorimo na jedno pitanje - da li trougao ima unutrašnju tačku u kvadrantu $1$, onom sa $x > 0$ i $y > 0$ - a onda isti kod pustimo četiri puta sa obrnutim znacima.

Sečenje trougla duž dve ose pa merenje onoga što ostane radi, ali uvlači razlomke: temena odsečenog dela padaju usred osa, na koordinate koje nisu celi brojevi. Postoji način da se odgovori na pitanje ni sa čim osim sa `orientation` iz lekcije o linijama.

### Okreni pitanje

Pitaj kada trougao **promašuje** kvadrant umesto kada ga pogađa. Dva konveksna oblika bez zajedničke površine uvek mogu da se razdvoje pravom: trougao sa jedne strane, kvadrant sa druge. Oblik koji bi morao da se progura pored te prave da bi stigao na drugu stranu prosto ne može.

To bi bilo beskonačno mnogo pravih za probanje, da nema jedne stvari. Uzmi pravu koja razdvaja pa je pomeraj i okreći ka trouglu dokle god ide. Ona završi **priljubljena** uz jedan od dva oblika - leži duž jedne stranice trougla, ili duž jedne od osa. Dakle o svemu odlučuje pet pravih:

- $y$ osa,
- $x$ osa,
- i tri prave koje nose stranice trougla.

Ako nijedna od ovih pet ne razdvaja trougao od kvadranta, onda to ne radi nijedna, i kvadrant dobija `+`.

### Prvo ga obiđi suprotno od kazaljke

"Sa koje strane prave" je tačno ono na šta `orientation` odgovara, pa su poslednje tri prave već nadohvat ruke. Nezgodno je jedino to što odgovor za sam trougao zavisi od redosleda kojim su temena slučajno učitana: za jedan ulaz je trougao `+` od svoje stranice, a za ogledalski ulaz je `-`.

Reši to jednom, na početku:

~!
```cpp
if(orientation(p[0], p[1], p[2]) == '-') swap(p[1], p[2]);
```

Zamena dva temena crta isti trougao, samo obiđen na drugu stranu. Posle ovoga tri temena uvek idu suprotno od kazaljke na satu, a to znači da je trougao sa `+` strane **svake svoje stranice**. Odavde nadalje ništa ne mora da pamti sa koje je strane šta - samo pitamo "da li je ovo `+`?".

### Dve ose

Kvadrant $1$ ceo leži u $x \ge 0$. Znači $y$ osa ga razdvaja od trougla tačno onda kada trougao ceo leži u $x \le 0$ - to jest, kada sva tri temena imaju $x \le 0$. Sa $x$ osom je ista priča, samo po $y$.

Za ostale kvadrante se nejednakost obrne, pa zato kod svuda nosi sa sobom dva znaka $s_x$ i $s_y$ i piše proveru kao $s_x \cdot x_i \le 0$ za svako teme.

### Stranica trougla

Uzmi stranicu od `a` do `b`. Trougao je sa njene `+` strane, pa ova prava razdvaja to dvoje tačno onda kada **nijedna tačka kvadranta** nije `+`.

Kvadrant ima beskonačno mnogo tačaka, ali ne moramo da ih obilazimo. Do svake tačke kvadranta $1$ stiže se iz koordinatnog početka tako što se pređe neki put duž $x$ ose pa neki put duž $y$ ose, a `orientation` pokreće vektorski proizvod, koji se menja ravnomerno dok koračamo u utvrđenom smeru - nikada se ne prišunja iz `-` u `+` pa nazad. Zato tri pitanja rešavaju ceo kvadrant:

- gde je koordinatni početak,
- šta radi korak duž prvog puta,
- šta radi korak duž drugog puta.

Poslednja dva pitaju o **smerovima**, a `orientation` traži tačke. Napravi korak iz same tačke `a`: `a` leži na pravoj i ne doprinosi ničemu, pa `orientation(a, b, add(a, alongX))` meri korak i samo korak.

Ako nijedan od tri odgovora nije `+`, ceo kvadrant sedi sa druge strane te prave, i kvadrant otpada.

**Pažnja:** zato `orientation` računa svoj vektorski proizvod u tipu `long long`. Koordinata ide do $10^6$, pa razlika ide do $2 \cdot 10^6$, a vektorski proizvod do $8 \cdot 10^{12}$ - daleko preko `int`.

## Primer

Uzmi četvrti test primer, trougao $(0, 0)$, $(-3, 1)$, $(1, -3)$, kome jedno teme sedi tačno u koordinatnom početku. `orientation` tri temena je `+`, pa ona već idu suprotno od kazaljke i ništa se ne zamenjuje.

Pitaj sada za kvadrant $1$. Nijedna osa ne razdvaja - trougao ima teme sa $x > 0$ i teme sa $y > 0$ - pa probamo njegove stranice, a već prva, od $(0,0)$ do $(-3,1)$, rešava stvar:

| šta pitamo za kvadrant $1$ | `orientation` |
|---|---|
| gde je koordinatni početak | `=` |
| gde pada korak duž $x$ ose | `-` |
| gde pada korak duž $y$ ose | `-` |

Nijedan od njih nije `+`, pa svaka tačka kvadranta $1$ leži sa druge strane te prave, dok trougao leži sa ove. Kvadrant otpada.

Preostala tri kvadranta prežive svih pet pravih:

| kvadrant | odgovor |
|---|---|
| $1$ | `-`, razdvaja ga stranica od $(0,0)$ do $(-3,1)$ |
| $2$ | `+` |
| $3$ | `+` |
| $4$ | `+` |

U prva tri test primera nijedna stranica trougla nije ni potrebna - svaki `-` rešava sama osa, zato što ti trouglovi celi leže sa jedne njene strane.

## Kod

solution.cpp
```cpp
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

long long cross(v a, v b){

    return (a.x * b.y) - (a.y * b.x);
}

char orientation(v a, v b, v c){ // where is c, relative to the line ab

    long long prod = cross(sub(b, a), sub(c, a));

    if(prod > 0){
        return '+';
    }

    if(prod < 0){
        return '-';
    }

    return '=';
}

// does the triangle p, walked counter-clockwise, reach the quadrant with signs (sx, sy)?
bool reaches(v p[3], long long sx, long long sy){

    // the y axis: the quadrant is on the sx side of it, so it separates the two
    // when the whole triangle sits on the other side. then the same for the x axis
    if(sx * p[0].x <= 0 && sx * p[1].x <= 0 && sx * p[2].x <= 0) return false;
    if(sy * p[0].y <= 0 && sy * p[1].y <= 0 && sy * p[2].y <= 0) return false;

    v origin = {0, 0};
    v alongX = {sx, 0}, alongY = {0, sy}; // the two roads, walked away from the centre

    for(int i = 0; i < 3; i++){

        v a = p[i], b = p[(i + 1) % 3];

        // counter-clockwise, so the triangle is on the '+' side of its own side ab,
        // and this side separates the two when nothing of the quadrant is '+'
        if(orientation(a, b, origin) == '+') continue;
        if(orientation(a, b, add(a, alongX)) == '+') continue;
        if(orientation(a, b, add(a, alongY)) == '+') continue;

        return false;
    }

    return true;
}

int main(){

    iostream::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;

    while(t--){

        v p[3];
        for(int i = 0; i < 3; i++) cin >> p[i].x >> p[i].y;

        // walk the triangle counter-clockwise, so its inside is always the '+' side
        if(orientation(p[0], p[1], p[2]) == '-') swap(p[1], p[2]);

        cout << (reaches(p,  1,  1) ? '+' : '-')
             << (reaches(p, -1,  1) ? '+' : '-')
             << (reaches(p, -1, -1) ? '+' : '-')
             << (reaches(p,  1, -1) ? '+' : '-') << "\n";
    }

    return 0;
}
```

Primeti da se `=` računa kao razdvojeno, i da provere za ose koriste `<= 0` a ne `< 0`. To je ono što čini da dodirivanje ne računa. Trougao koji se samo naslanja na osu i dalje je njome razdvojen, a kvadrant koji stiže samo do prave neke stranice nikada ne uđe u trougao, pa oba ostaju `-`.

## Složenost

Vremenska složenost je $O(1)$ po test primeru - četiri kvadranta, po pet pravih
Memorijska složenost je $O(1)$
