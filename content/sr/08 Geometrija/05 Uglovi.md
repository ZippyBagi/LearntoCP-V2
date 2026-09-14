>U ovoj lekciji prestajemo da pitamo sa koje strane prave je nešto i pitamo za sam ugao.

### Dva načina da se zapiše isti ugao

Skalarni proizvod u sebi krije ugao:

$$\vec{a} \cdot \vec{b} = |\vec{a}| \, |\vec{b}| \cos\theta$$

a vektorski proizvod krije isti taj ugao, samo preko sinusa:

$$\vec{a} \times \vec{b} = |\vec{a}| \, |\vec{b}| \sin\theta$$

Podelimo drugi prvim i obe dužine se skrate, ostaje $\tan\theta$. Za razmotavanje toga služi baš `atan2`, a pošto prima dva dela odvojeno, pogađa i kvadrant:

$$\theta = \text{atan2}(\vec{a} \times \vec{b}, \; \vec{a} \cdot \vec{b})$$

Rezultat je u intervalu $(-\pi, \pi]$ i ima **znak** - pozitivan je kada je `b` suprotno od kazaljke na satu u odnosu na `a`, po istom pravilu koje nam je dala orijentacija.
Da bismo ga pretvorili u stepene, množimo ga sa: `180.0 / acos(-1.0);`

	![[atan2-two-legs.png|Vektori a i b sa uglom theta između njih sa leve strane, precrtani sa desne kao pravougli trougao čija je horizontalna kateta skalarni proizvod 9 a vertikalna vektorski proizvod 9, što daje ugao theta od 45 stepeni]]

### Implementacija

Prostije rečeno, imamo funkciju koja nam, kada joj damo vektorski i skalarni proizvod, vraća ugao.

Angles.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

struct v{

    long long x, y;
};

long long cross(v a, v b){

    return (a.x * b.y) - (a.y * b.x);
}

long long dot(v a, v b){

    return (a.x * b.x) + (a.y * b.y);
}

double angle(v a, v b){ //ugao sa znakom od a do b, u stepenima

    return atan2((double)cross(a, b), (double)dot(a, b)) * 180.0 / acos(-1.0);
}

int main(){

    cout<<fixed<<setprecision(1);

    cout<<angle({1, 0}, {0, 1})<<'\n';
    cout<<angle({1, 0}, {-1, 0})<<'\n';
    cout<<angle({0, 1}, {1, 0})<<'\n';
    cout<<angle({3, 0}, {3, 3})<<'\n';

    return 0;
}
```
Output:
`90.0`
`180.0`
`-90.0`
`45.0`

>Ovo je prvo mesto u poglavlju gde izlazimo iz celih brojeva. Kada zadatak pita samo koji je od dva ugla veći, vektorski proizvod na to odgovara tačno - za `atan2` posegni kada je sam ugao deo odgovora.
