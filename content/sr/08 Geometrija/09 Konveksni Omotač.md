>U ovoj lekciji prestajemo da dobijamo gotov poligon i sami ga gradimo - najmanji koji obuhvata ceo skup tačaka.

### Šta je konveksni omotač

Zakucaj ekser u svaku tačku, razvuci gumicu oko svih njih i pusti je. Oblik u koji se gumica zategne je **konveksni omotač** - najmanji konveksan poligon koji sadrži sve tačke.

Iz te slike odmah slede dve stvari:

- tačka koja je strogo unutra nikada ne dodiruje gumicu
- ne dodiruje je ni tačka koja stoji na sredini neke njene prave stranice

Zato je omotač obično mnogo manji od ulaza, a ono što tražimo su samo njegova temena, redom obilaska.

	![[hull-rubber-band.png|Šest tačaka sa gumicom razvučenom oko njih, koja dodiruje samo četiri ugaone tačke, dok su (2,2) i (1,3) unutra a (2,0) leži na ravnoj stranici, pa se sve tri preskaču]]

### Grahamov algoritam

Ceo algoritam staje u tri koraka.

**1. Biramo pivot: najnižu tačku, a ako ih ima više na istoj visini, onda krajnje levu od njih.**

- Zašto je ona sigurno teme omotača? Povuci horizontalnu pravu kroz nju. Sve ostale tačke su na toj pravoj ili iznad nje, pa je pivot na rubu celog skupa, a ne zakopan u njegovoj sredini. Gumica mora da ga dodirne.

**2. Sortiramo sve ostale po uglu oko pivota.**

- Pošto je pivot najniža tačka, sve ostale su iznad njega (ili u istoj visini a desno od njega), pa se svi uglovi kreću od `0` do malo ispod `180` - ništa se ne prelama preko punog kruga i redosled je uvek jednoznačan. Ako dve tačke imaju isti ugao, prva ide ona bliža.

- Taj sortirani redosled je pravi razlog zašto algoritam radi. Obiđi gotov omotač suprotno od kazaljke na satu, počevši od pivota: svako teme stoji pod većim uglom nego prethodno, jer konveksan oblik ne može da se vraća unazad.

- Znači temena omotača **već** stoje u sortiranoj listi, tačno onim redom kojim ih želimo, a između njih su razbacane tačke koje nisu temena. Ne tražimo omotač - brišemo sve što omotač nije.

**3. Prolazimo kroz listu sa stekom.**

- Pre nego što dodamo sledeću tačku, pogledamo poslednje dve na steku. Ako one i nova tačka ne prave **skretanje ulevo**, srednja je udubljenje, pa je skidamo. Skidamo dok skretanje ne postane ulevo, pa tek onda dodajemo.

- Zašto je bezbedno izbaciti tu srednju tačku? Recimo da se stek završava sa `... A B`, a sledeća tačka je `C`. Sortiranje je stavilo `A` pre `B`, a `B` pre `C`, i skretanje u `B` ide na pogrešnu stranu. Zajedno, to znači da je `B` unutar trougla koji čine pivot, `A` i `C` - a sve tri te tačke su nam date. Gumica razvučena oko njih prelazi pravo preko `B` a da je ne dodirne. `B` nije teme omotača, i nijedna tačka koja stigne kasnije to ne može da promeni.

	![[graham-pop.png|Stek koji se završava sa A pa B, gde sledeća tačka C skreće na pogrešnu stranu, pa se B izbacuje, i dobijeni omotač sa desne strane u kome B leži strogo unutar trougla]]

Dakle, nikada ne izbacimo tačku koja pripada omotaču, a ono što ostane na steku skreće ulevo na svakom koraku - a to je tačno ono što konveksan lanac i jeste.

	![[graham-scan-steps.png|Tri faze Grahamovog algoritma: biranje najniže tačke za pivot, sortiranje ostalih tačaka po uglu oko njega, i obilazak kojim se gradi omotač]]

### Implementacija

Primeti da `orientation` opet radi sav posao: jednom unutar sortiranja, jednom unutar provere za skidanje. Nijedan ugao zapravo nikada ne izračunamo.

GrahamScan.cpp
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

long long dist2(v a, v b){

    long long dx = a.x - b.x, dy = a.y - b.y;

    return dx * dx + dy * dy;
}

v pivot; //svaki ugao u sortiranju meri se odavde

bool sort_function(v a, v b){

    char t = orientation(pivot, a, b);

    if(t == '='){ //isti ugao, pa bliža ide prva
        return dist2(pivot, a) < dist2(pivot, b);
    }

    return t == '+';
}

vector<v> convexHull(vector<v> p){

    int n = p.size();

    int piv = 0; //najniža, pa krajnje leva
    for(int i = 1; i < n; i++){
        if(p[i].y < p[piv].y || (p[i].y == p[piv].y && p[i].x < p[piv].x)){
            piv = i;
        }
    }
    swap(p[0], p[piv]);

    pivot = p[0];
    sort(p.begin() + 1, p.end(), sort_function);

    vector<v> hull;

    for(int i = 0; i < n; i++){
        while(hull.size() >= 2 && orientation(hull[hull.size() - 2], hull.back(), p[i]) != '+'){
            hull.pop_back();
        }

        hull.push_back(p[i]);
    }

    return hull;
}

int main(){

    vector<v> p = {{0, 0}, {4, 0}, {4, 4}, {0, 4}, {2, 2}, {2, 0}, {1, 3}};

    vector<v> hull = convexHull(p);

    cout<<hull.size()<<'\n';

    for(int i = 0; i < hull.size(); i++){
        cout<<hull[i].x<<" "<<hull[i].y<<'\n';
    }

    return 0;
}
```
Output:
`4`
`0 0`
`4 0`
`4 4`
`0 4`

Četiri temena, suprotno od kazaljke na satu. Tačke `(2, 2)` i `(1, 3)` su strogo unutra i nikada nisu preživele proveru skretanja. Tačka `(2, 0)` stoji tačno na sredini donje stranice: dodata je, pa skinuta čim je stigla `(4, 0)`, jer je skretanje tamo `=` a ne `+`.

### Složenost

Sortiranje je ceo trošak: **O(n log n)**.

Prolaz posle njega je **O(n)** - svaka tačka se dodaje tačno jednom i skida najviše jednom, pa se unutrašnja `while` petlja ukupno ne izvrši više od `n` puta, ma koliko na prvi pogled izgledala skupo.

>Napomena:
>Provera za skidanje je `!= '+'`, što izbacuje tačke koje leže tačno na stranici omotača - obično upravo ono što želimo. Ako zadatak traži svaku tačku na granici, skidaj samo na `'-'`.
