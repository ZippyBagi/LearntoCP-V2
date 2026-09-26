
## Pristup

Ne traži se broj nizova niti jedan dovitljiv niz - traže se svi. Znači, algoritam mora da prošeta kroz sve njih, a jedino pitanje je kako da šeta a da nikada ne napravi zabranjen niz.

Popunjavaj hodnik **sobu po sobu**, sleva nadesno. Kada stojiš na poziciji $i$, a pozicije od $0$ do $i-1$ su već odlučene, postoje samo dve stvari koje možeš da upišeš:

- $0$ je uvek u redu - prazna soba nikada ne može da prekrši pravilo
- $1$ je u redu samo ako na poziciji $i-1$ stoji $0$ (a pozicija $0$ je uvek u redu, jer pre nje nema ničega)

Upiši jednu od njih, prepusti ostatak hodnika rekurziji, a kada se stigne do pozicije $n$ niz je gotov - ispiši ga. To je celo rešenje: jedan bazni slučaj i poziv koji manji posao prosleđuje dalje.

Primeti da se pravilo proverava u trenutku upisivanja cifre, a ne na kraju. U granu koja bi prekršila pravilo se uopšte i ne ulazi, pa nikada ne gradimo niz da bismo ga posle bacili.

## Redosled

Traženi redosled dobijamo besplatno. Na svakoj poziciji probamo $0$ **pre** $1$, pa se od dva niza koja se prvi put razlikuju na poziciji $i$ prvi ispisuje onaj koji tu ima $0$ - a to je tačno rastući redosled.
## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int n;
int a[25];

void generate(int i){

    if(i == n){                     // niz je kompletan
        for(int j = 0; j < n; j++){
            if(j) cout<<' ';
            cout<<a[j];
        }
        cout<<'\n';
        return;
    }

    a[i] = 0;                       // nula nikada ne krši pravilo
    generate(i + 1);

    if(i == 0 || a[i - 1] == 0){    // jedinica samo kada je soba pre nje prazna
        a[i] = 1;
        generate(i + 1);
        a[i] = 0;                   // vrati unazad, da pozivalac vidi niz kakav ga je i ostavio
    }
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    cin>>n;

    generate(0);

    return 0;
}
```

Niz `a` je jedan jedini zajednički bafer u koji rekurzija upisuje i za sobom čisti, i zato ništa ne mora da se kopira na putu naniže.

## Složenost

Vremenska složenost je $O(n \cdot F_{n+2})$, što je veličina izlaza.
Memorijska složenost je $O(n)$ zbog niza i steka poziva.
