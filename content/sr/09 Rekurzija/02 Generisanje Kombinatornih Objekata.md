>U ovoj lekciji naučićemo kako da nateramo računar da ispiše svaki podskup, niz, permutaciju i kombinaciju - a ne samo da ih prebroji.

U poglavlju o kombinatorici naučili smo da ih prebrojimo. `2^n` podskupova, `n!` permutacija, `n nad k` kombinacija.

Ali formula nam daje broj, a ne i same objekte. Neki zadaci traže baš objekte: da ispišemo svaki raspored, ili da svaki isprobamo pa zapamtimo najbolji.

Kada je dužina unapred poznata, snašli bismo se ugnežđenim petljama - tri petlje daju svaki niz dužine 3. Problem nastaje čim dužina stigne iz ulaza, jer ne možemo da napišemo `k` ugnežđenih petlji ako ne znamo koliko je `k`.

Rekurzija to može. Svaki poziv je jedan nivo ugnežđivanja više, a dubina se određuje dok program radi.

### Mesto po mesto

Svaki generator u ovoj lekciji gradi objekat **sleva nadesno**, mesto po mesto:

~!
```c++
void generisi(int mesto){

    if(mesto == duzina){ //objekat je gotov
        ispisi();
        return;
    }

    for(svaka mogućnost dozvoljena na ovom mestu){

        upiši mogućnost na mesto
        generisi(mesto + 1);
        poništi mogućnost
    }
}
```

Posmatraj to kao drvo. Svaki nivo rekurzije je jedno mesto, svaki prolaz kroz petlju je jedna grana, a svaki list je jedan gotov objekat.

Između četiri objekta menja se samo jedna stvar: **koje mogućnosti su dozvoljene na jednom mestu**. Sve ostalo ostaje tačno ovako kako je gore napisano.

### Podskupovi

Podskup je `n` nezavisnih odluka da/ne - za svaki element odlučujemo da li ga uzimamo. Zato "mesto `i`" ovde znači "odluka o elementu `i`", i postoje samo dve mogućnosti.

Elemente koje smo uzeli čuvamo u vektoru `izabrani`.

Subsets.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int n = 3;
vector<int> izabrani; //podskup koji trenutno gradimo

void podskupovi(int i){

    if(i == n){ //odlučili smo o svakom elementu

        cout<<"{ ";
        for(int j=0;j<izabrani.size();j++){
            cout<<izabrani[j]<<" ";
        }
        cout<<"}"<<'\n';

        return;
    }

    podskupovi(i+1); //ostavljamo element i+1 napolju

    izabrani.push_back(i+1); //uzimamo element i+1
    podskupovi(i+1);
    izabrani.pop_back(); //poništavamo, da pozivalac zatekne izabrani kakvog ga je ostavio
}

int main(){

    podskupovi(0);

    return 0;
}
```
Output:
`{ }`
`{ 3 }`
`{ 2 }`
`{ 2 3 }`
`{ 1 }`
`{ 1 3 }`
`{ 1 2 }`
`{ 1 2 3 }`

Osam podskupova, a to je onih $2^n$ koje smo prebrojali u kombinatorici - samo što ih sada zaista imamo, a ne samo njihov broj.

Ono `izabrani.pop_back()` nije ukras. `izabrani` je **jedan jedini vektor koji dele svi pozivi**, pa poziv koji nešto doda a vrati se bez brisanja ostavlja pozivaocu vektor koji ovaj više ne prepoznaje. Obriši tu liniju i izlaz postaje ovakav:

`{ }`, `{ 3 }`, `{ 3 2 }`, `{ 3 2 3 }`, `{ 3 2 3 1 }`, ...

	![[backtracking-undo.png|Četiri ispisa iz pretrage sa vraćanjem, upoređena sa pop_back i bez njega: sa njim zajednički vektor sadrži samo trenutnu granu, a bez njega element koji je ostavio poziv koji se vratio kvari svaki naredni ispis]]

Pravilo je jednostavno: šta god poziv upiše pre rekurzije, to i obriše posle rekurzije. To se zove **pretraga sa vraćanjem** (en. backtracking) - spustimo se niz granu, a na povratku ostavljamo sve tačno onako kako smo i zatekli.

### Nizovi

Dozvolimo sada više od dve mogućnosti. Želimo svaki niz dužine `k` sastavljen od vrednosti `1` do `n`, uz ponavljanja - zamisli svaki mogući PIN kod od `k` cifara.

Na svakom mestu je dozvoljena svaka vrednost, pa petlja nema nikakav uslov.

Sequences.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int n = 3; //biramo vrednosti od 1 do n
int k = 2; //niz je dug k
vector<int> a(k);

void nizovi(int mesto){

    if(mesto == k){

        for(int i=0;i<k;i++){
            cout<<a[i]<<" ";
        }
        cout<<'\n';

        return;
    }

    for(int v=1;v<=n;v++){ //svaka vrednost staje na svako mesto
        a[mesto] = v;
        nizovi(mesto+1);
    }
}

int main(){

    nizovi(0);

    return 0;
}
```
Output:
`1 1`
`1 2`
`1 3`
`2 1`
`2 2`
`2 3`
`3 1`
`3 2`
`3 3`

Devet nizova, a to je $n^k = 3^2$.

Ovde ništa ne poništavamo, jer `a[mesto] = v` prepisuje mesto već u sledećem prolazu kroz petlju - poništavamo samo kada upis nešto zaista dodaje. Primeti i da je izlaz ispao sortiran, iako ništa nismo sortirali: na svakom mestu vrednosti probamo redom od najmanje, pa se manji objekat uvek ispiše prvi.

### Permutacije

Permutacija koristi svaku vrednost tačno jednom. Pravilo zato postaje: na ovom mestu smemo da probamo svaku vrednost koja **već nije postavljena levo od nas**. To pratimo nizom `zauzet`.

Permutations.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int n = 3;
vector<int> a(n);
vector<bool> zauzet(n+1, false); //zauzet[v] nam govori da li je v već postavljen

void permutacije(int mesto){

    if(mesto == n){

        for(int i=0;i<n;i++){
            cout<<a[i]<<" ";
        }
        cout<<'\n';

        return;
    }

    for(int v=1;v<=n;v++){

        if(zauzet[v]){ //v već stoji negde levo
            continue;
        }

        zauzet[v] = true;
        a[mesto] = v;
        permutacije(mesto+1);
        zauzet[v] = false; //poništavamo
    }
}

int main(){

    permutacije(0);

    return 0;
}
```
Output:
`1 2 3`
`1 3 2`
`2 1 3`
`2 3 1`
`3 1 2`
`3 2 1`

Ima ih šest, a to je `3!`.

U `zauzet[v]` upisujemo `true` pre poziva, pa to moramo da poništimo kada se vratimo. Zaboravi tu jednu liniju i prva grana će označiti sve vrednosti kao zauzete, a program će ispisati samo jednu permutaciju.

### Kombinacije

Kombinacija je grupa od `k` elemenata kod koje redosled nije bitan. `1 3` i `3 1` su ista grupa, a nju želimo da ispišemo samo jednom.

Mogli bismo da napravimo svaki raspored pa da izbacimo one koje smo već videli. Mnogo je bolje da ih nikada i ne napravimo: **grupu uvek ispisujemo u rastućem redosledu**. Tada svaka grupa može da se zapiše na tačno jedan način, pa je dobijamo tačno jednom.

Da bismo to postigli, mesto sme da uzme samo vrednosti veće od one pre njega. Tu donju granicu prosleđujemo kao drugi parametar.

Combinations.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int n = 3;
int k = 2;
vector<int> a(k);

void kombinacije(int mesto, int start){

    if(mesto == k){

        for(int i=0;i<k;i++){
            cout<<a[i]<<" ";
        }
        cout<<'\n';

        return;
    }

    for(int v=start;v<=n;v++){ //nikada ne gledamo unazad
        a[mesto] = v;
        kombinacije(mesto+1, v+1); //sledeće mesto mora da ide više
    }
}

int main(){

    kombinacije(0, 1);

    return 0;
}
```
Output:
`1 2`
`1 3`
`2 3`

Tri grupe, a to je $\binom{3}{2}$ - šest permutacija odozgo, podeljeno sa `2!` redosleda koje smo odbili da ponavljamo.

Parametar `start` radi isti posao kao niz `zauzet`, samo jeftinije. Pošto uvek idemo unapred, "još nije iskorišćeno" i "veće od prethodnog" ovde znače isto.

>Napomena:
>Ovaj kod i dalje ulazi u grane koje ne mogu da se završe - ako krenemo od `3`, za drugo mesto ne ostaje ništa. Pri ovako malom `n` to ništa ne košta, ali ispravka je jedan uslov: zaustavi petlju na `v <= n - (k - mesto) + 1`, pa mesto nikada neće uzeti vrednost posle koje ostaje premalo elemenata.

### Isti algoritam četiri puta

	![[generating-one-skeleton.png|Istih devet grana dužine dva prikazano tri puta, svaki put filtrirano drugim pravilom: sve vrednosti zadržavaju 9, samo neiskorišćene zadržavaju 6, a samo vrednosti veće od prethodne zadržavaju 3]]

| Objekat | Šta probamo na jednom mestu | Koliko ih ima |
| ---- | ---- | ---- |
| Podskupovi | uzmi ovaj element, ili nemoj | $2^n$ |
| Nizovi | svaku vrednost od `1` do `n` | $n^k$ |
| Permutacije | svaku vrednost koja još nije iskorišćena | $n!$ |
| Kombinacije | svaku vrednost veću od prethodne | $\binom{n}{k}$ |

>Bazni slučaj, petlja i vraćanje se nikada nisu menjali. Menjao se samo uslov unutar petlje.
### Koliko veliko sme da bude n?

Ovi algoritmi prave svaki objekat, pa nikada ne mogu da budu brži od broja objekata. Ispis jednog objekta dužine `n` košta O(n), pa dobijamo:

| Objekat | Složenost |
| ---- | ---- |
| Podskupovi | **O(n * 2^n)** |
| Nizovi | **O(k * n^k)** |
| Permutacije | **O(n * n!)** |
| Kombinacije | **O(k * C(n, k))** |

Ovi brojevi rastu neverovatno brzo. `2^20` je oko milion i sasvim je u redu, `2^30` je milijarda i nije. `10!` je oko 3.6 miliona, a `11!` je 40 miliona.

Znači, generisanje podskupova radi otprilike do `n = 20`, a generisanje permutacija otprilike do `n = 10`. 

>Ako su ograničenja veća, zadatak ne traži da bilo šta generišeš - traži prebrojavanje, pohlepni algoritam ili dinamičko programiranje.
