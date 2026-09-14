>U ovoj lekciji učimo osnove geometrije u računarstvu. (i sve će biti u 2D-u, što je lepo)

Pre nego što počnemo, podsetimo se jedne teoreme koju već znamo:
### Pitagorina teorema

Ako imamo pravougli trougao sa stranicama `a`, `b` i `c`, gde je `c` najduža stranica (hipotenuza), nju dobijamo formulom:

$$c^2 = a^2 + b^2$$

### Predstavljanje tačaka i pravih

Skoro svaki geometrijski zadatak koji ćemo dobiti pripada analitičkoj geometriji, pa hajde da se upoznamo sa njom.

Sve što dobijemo biće predstavljeno tačkama (parom od dve koordinate).

U kodu ih možemo čuvati kao `pair<int,int> point`

Ili kao strukturu:
~!
```c++
struct point{
	long long x;
	long long y;
};

int main(){
	point a;
	a.x = 1;
	a.y = 2;
}
```

Treba da znamo i kako se predstavlja prava (par od dve tačke):
~!
```c++
struct line{
	point x;
	point y;
};
```
### Rastojanje između dve tačke

Rastojanje između dve tačke (`A` i `B`) izvodi se direktno iz Pitagorine teoreme.

Zamisli trougao između te dve tačke, gde je rastojanje `dist` hipotenuza.
Njihovo horizontalno rastojanje je $|A_x - B_x|$
A vertikalno je $|A_y - B_y|$

Da bismo dobili `dist`, koristimo:

$$dist = \sqrt{(A_x-B_x)^2 + (A_y-B_y)^2}$$
Primeti da nam apsolutna vrednost nije potrebna, jer oba izraza kvadriramo!

	![[distance-triangle.png|Tačke A (1,2) i B (4,6) na mreži obrazuju pravougli trougao sa horizontalnom katetom 3 i vertikalnom 4, pa je rastojanje koren iz 25, odnosno 5]]

### Implementacija

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

struct point{

    long long x, y;
};

long long dist2(point a, point b){ // kvadrat rastojanja - ostaje ceo broj!

    long long dx = a.x - b.x;
    long long dy = a.y - b.y;

    return dx * dx + dy * dy;
}

double dist(point a, point b){

    return sqrt((double)dist2(a, b));
}

int main(){

    point a = {1, 2};
    point b = {4, 6};

    cout<<"Kvadrat rastojanja: "<<dist2(a, b)<<'\n';
    cout<<"Rastojanje: "<<dist(a, b);

    return 0;
}
```
Output:
`Kvadrat rastojanja: 25`
`Rastojanje: 5`

Primeti dve stvari: koordinate su `long long`, a ne `int`, i napisali smo posebnu funkciju `dist2` koja nikada ne dira `sqrt`. Oba izbora su namerna, a sledeći deo objašnjava zašto.

### Nekoliko reči o preciznosti

**1. Ostani u celim brojevima što duže možeš.**
Ako su ulazne koordinate celi brojevi, onda su i njihove razlike, zbirovi i proizvodi celi brojevi. Svaki račun urađen u `long long` tipu je **tačan**. Onog trenutka kada pozovemo `sqrt`, gubimo tu tačnost.

**2. Pazi na overflow.**
Koordinate u zadacima često idu do $10^9$. Kada to kvadriramo, dobijamo $4 \cdot 10^{18}$, što jedva staje u `long long` (granica je oko $9.2 \cdot 10^{18}$). Zato smo gore koristili `long long` - `int` koordinate su klasična zamka.

**3. Izbegavaj `sqrt` kad god možeš.**
Vrlo često nam ne treba stvarno rastojanje, već samo poređenje: koja tačka je bliža, da li je ovo rastojanje veće od onog, da li su dva rastojanja jednaka. Pošto rastojanja nikada nisu negativna, važi:

$$dist(A, B) < dist(C, D) \iff dist^2(A, B) < dist^2(C, D)$$

Znači, možemo da poredimo `dist2` umesto `dist` i tako sve ostaje tačno i brzo. Isti trik radi i za pitanje "da li je rastojanje najviše `r`": poredimo $dist^2 \le r^2$ umesto $dist \le r$.

>Savet:
>Ako rešenje treba da se ispiše kao realan broj, sam kontroliši ispis sa `cout<<fixed<<setprecision(6)<<ans;` - inače `cout` ispisuje samo 6 značajnih cifara, pa se veliki rezultati iskvare.

### Rezime

| Pojam | Formula | Napomena |
| ---- | ---- | ---- |
| Tačka | $(x, y)$ | mesto |
| Prava | dve tačke | |
| Rastojanje `A` do `B` | $\sqrt{(A_x-B_x)^2 + (A_y-B_y)^2}$ | poredi kvadrate kad god možeš |

To je sve što nam treba da opišemo gde se stvari nalaze.
