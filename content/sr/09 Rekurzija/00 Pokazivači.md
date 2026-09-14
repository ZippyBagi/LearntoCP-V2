> U ovoj lekciji upoznaćemo se sa pokazivačima i videćemo zašto su nam korisni!

### Šta su pokazivači?

Sve što napišemo u programu negde se čuva u memoriji. Svaka promenljiva, dok se program izvršava, ima svoje mesto.

Pokazivači nam govore **gde je to mesto!**

Deklarišemo ih ovako: `int* pokazivac = &promenljiva`

Zvezdica `*` govori da pravimo **pokazivač na int**!

Znak `&` znači memorijsku adresu promenljive!

> `.begin()` i `.end()` su takođe pokazivači, samo što pokazuju na početak i kraj niza.
### Pokazivači i reference

C++ nam daje dva načina da radimo sa samom promenljivom umesto sa njenom kopijom:

**Pokazivač** `int* p = &a` je promenljiva koja čuva adresu. Možemo ga kasnije usmeriti na nešto drugo, a do vrednosti dolazimo preko `*p`.

**Referenca** `int& r = a` je samo drugo ime za promenljivu koja već postoji. Vezuje se jednom i posle toga se koristi kao običan `int`, bez `*`.

Oba nam daju pristup originalu, ali su reference mnogo jednostavnije za pisanje, pa ćemo njih najviše koristiti.
### Kako ih koristimo?

Da bismo dobili vrednost promenljive na koju pokazujemo, ispisujemo `*pokazivac` - to nam vraća vrednost na koju pokazivač pokazuje.

Example.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int a = 3;

    int* pokazivac = &a;

    cout<<pokazivac<<'\n';

    cout<<*pokazivac;

    return 0;
}
```
Output:
`0x61ff08` <- Memorijska adresa
`3` <- Vrednost promenljive a

### Zašto su korisni?

Primena ima mnogo, ali izdvojićemo one najvažnije:

#### Menjanje vrednosti u funkciji

Do sada je funkcija mogla da vrati samo jednu stvar. Ali šta ako treba da promenimo promenljive koje smo joj prosledili?

Tu nam pomažu reference, pišemo:  `void ime_funkcije(int& a, int& b){}`

Sada, ako promenimo vrednost `a` ili `b` unutar funkcije, one se menjaju i u `main`-u. (Više ne prosleđujemo kopiju, već samu promenljivu)

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

void ponisti(int& a){
	a = 0;
}

int main(){

	int a = 3;
	cout<<a<<'\n';
	
	ponisti(a);
	
	cout<<a<<'\n';
}
```
Output:
`3`
`0`

#### Prosleđivanje vektora bez kopiranja

Postoji još jedan razlog da koristimo `&`, i važan je čak i kada ništa ne želimo da menjamo.

Kada napišemo `void resi(vector<int> a)`, ceo vektor se **kopira** u funkciju. Za $n = 10^6$ to je milion elemenata kopiranih pri svakom pozivu, što je sasvim dovoljno da dobijemo TLE.

Ako napišemo `void resi(vector<int>& a)`, prosleđujemo original, ništa se ne kopira i poziv nas košta **O(1)**.

Ako funkcija ne treba da menja vektor, dodajemo `const`:

`void resi(const vector<int>& a){}`

Prosleđivanje je i dalje besplatno, ali će nas kompajler zaustaviti ako slučajno pokušamo da ga izmenimo.

> Pravilo: `int`, `char` i ostale male tipove prosleđujemo normalno, a `vector`, `string` i ostale velike tipove prosleđujemo po referenci.

### Razumevanje funkcija

Vratimo se na lekciju o funkcijama binarne pretrage, gde smo napisali:

"Zanimljivo je to što ne vraća indeks, već **pokazivač** (istu vrstu stvari kao `a.begin()`). Da bismo ga pretvorili u indeks, oduzimamo početak niza:

`int i = lower_bound(a.begin(), a.end(), k) - a.begin();`

Zamisli to kao kućne brojeve, pokazivač je adresa kuće. `a.begin()` je početak ulice, pa je njihova razlika kućni broj."

Sada nam je jasno šta se tu dešava.

A znamo i da do same vrednosti možemo doći ovako: `int vrednost = *lower_bound(a.begin(), a.end(), k)`

> Pokazivači i reference su korisni alati koji se u c++-u pojavljuju na svakom koraku. Njihovo razumevanje je važan korak ka napretku u takmičarskom programiranju.
