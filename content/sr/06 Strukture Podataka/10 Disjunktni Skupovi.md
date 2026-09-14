>U ovoj lekciji upoznaćemo iznenađujuće korisnu strukturu podataka - Disjunktne Skupove (en. Union Find, poznato i kao Disjoint Set Union ili DSU)

Zamisli da imamo **više disjunktnih skupova** i gomilu vrednosti, pa hoćemo da znamo kojem skupu koja vrednost pripada, a hoćemo i da dodajemo nove vrednosti. I da spajamo skupove.

Očigledno rešenje je `vector<set<int>>`, po jedan `set` za svaku grupu. Radi, ali može mnogo bolje.

Klasičan zadatak izgleda ovako:

>Imamo `n` gradova i nijedan put. Putevi se grade jedan po jedan. Posle svakog novog puta reci koliko je zasebnih putnih mreža ostalo.

Već znamo da povezane komponente brojimo pomoću DFS-a, u O(n + m). Ali pitanje se postavlja posle **svakog pojedinačnog puta**, a ponovno pokretanje DFS-a svaki put pretvara linearan algoritam u kvadratni.

Union Find odgovara posle svakog puta, i to u vremenu koje je praktično konstantno.

### Teorija

Caka je u tome što skupove uopšte i ne čuvamo.

Umesto toga, svaka vrednost pokazuje na jednu drugu vrednost - na svog **roditelja**. Ako pratimo te pokazivače naviše, uvek završimo na vrednosti koja pokazuje sama na sebe, a ona je **koren**.

Koren je ime skupa. Dve vrednosti su u istom skupu tačno onda kada stižu do istog korena.

![[union-find-forest.png|Vrednosti od 0 do 7 kao šuma od četiri stabla, gde 1 i 2 pokazuju naviše na koren 0, a 3 pokazuje na 2, dok 6 pokazuje na koren 5, a 4 i 7 stoje sami, pri čemu svaki koren ima malu petlju nazad ka sebi]]

Znači, cela struktura je šuma - po jedno stablo za svaki skup - a da bismo je sačuvali, dovoljan nam je jedan jedini niz, `parent`.

Zamisli grupni čet u kojem svako pamti ko ga je dodao. Da bi saznao u kojem si četu, pitaš "ko je tebe dodao?" sve dok ne stigneš do onoga ko ga je i napravio. Njegovo ime je ime četa.

#### Find

`find(x)` šeta od `x` naviše kroz roditelje dok ne udari u koren, i vraća ga.

#### Union

`unite(a, b)` nađe koren od `a`, nađe koren od `b` i natera jedan da pokazuje na drugi.

	![[union-find-unite.png|Dva odvojena stabla, jedno sa 0 i 1 i drugo sa 2 i 3, pa ista slika nakon spajanja, gde koren 2 sada pokazuje naviše na koren 0, a dva stabla su postala jedno]]

Ako se oba korena vrate ista, vrednosti su već bile zajedno i nema šta da se radi.

To je cela struktura podataka. Jedan niz i dve funkcije od po pet redova.

### Kako je ubrzati

Ovako napisanu, lako je i usporiti.

Pozovi `unite(0,1)`, pa `unite(1,2)`, pa `unite(2,3)` i tako dalje. Svako spajanje kači jedan koren ispod drugog, pa je posle `n` spajanja šuma jedan jedini lanac dužine `n`. Sada svaki `find` mora da prošeta ceo taj lanac.

Postoje dve popravke, svaka je po jedan red, i tek zajedno čine Union Find vrednim korišćenja.

#### Sažimanje putanje

Kada `find(x)` stigne do korena, on već zna odgovor za **svaki čvor kroz koji je usput prošao**. Zato ih sve, pre nego što vrati rezultat, prevežemo direktno na koren.

	![[union-find-path-compression.png|Lanac od četiri čvora sa obojenom putanjom kojom prolazi find od 3, a pored njega isti ti čvorovi nakon sažimanja putanje, gde 1, 2 i 3 pokazuju direktno na 0]]

Sledeći `find` nad bilo kojim od tih čvorova staje posle jednog koraka. Šetnju koju smo upravo platili više nikada ne plaćamo.

#### Spajanje po veličini

Kada spajamo, mi biramo koji koren ide ispod kojeg. Uvek stavljamo **manje** stablo ispod većeg.

Čvor postaje jedan nivo dublji samo kada je njegovo stablo manja polovina spajanja, a to znači da je stablo u koje upada bar dvaput veće od onoga iz kojeg je došao. Udvostručavanje može da se desi najviše log n puta, pa dubina nikada ne pređe O(log n) - i to pre nego što se sažimanje putanje uopšte umeša.

Uz obe popravke, `find` i `unite` koštaju **O(α(n))**, gde je α inverzna Akermanova funkcija. Ona raste tako sporo da je za svako `n` koje staje u računar najviše `4`. Slobodno je gledaj kao O(1) i u praksi nećeš pogrešiti.

>Napomena:
>Naići ćeš i na **spajanje po rangu**, koje poredi visine stabala umesto njihovih veličina. Obe varijante daju istu složenost, ali spajanje po veličini ima bonus - `sz[find(x)]` nam kaže koliko elemenata ima u skupu vrednosti `x`, a to se u zadacima traži iznenađujuće često.
### Kod:

Proći ćemo kroz njega blok po blok:

Priprema. Svaka vrednost kreće sama, pa je sama sebi koren, a njen skup ima tačno jedan element. `components` broji koliko skupova trenutno ima:
~!
```c++
int n = 8;
vector<int> parent(n);
vector<int> sz(n);
int components = n;

void createSets(){

    for(int i=0;i<n;i++){
        parent[i] = i; //svako je sam sebi koren
        sz[i] = 1;
    }
}
```

`find`:
Dodela se dešava na **povratku** iz rekurzije, pa kada se najspoljašnjiji poziv vrati, svaki čvor sa putanje pokazuje na koren:
~!
```c++
int find(int x){

    if(parent[x] == x){ //x je koren, pa je x i ime svog skupa
        return x;
    }

    parent[x] = find(parent[x]); //sažimanje putanje

    return parent[x];
}
```

`unite` je mesto na kojem živi spajanje po veličini. Primeti da prvo što ono uradi jeste da pozove `find` nad oba argumenta - stižu nam dve vrednosti, a ono što zaista spajamo jesu njihovi koreni:
~!
```c++
void unite(int a, int b){

    a = find(a);
    b = find(b);

    if(a == b){ //već su zajedno, nema šta da se radi
        return;
    }

    if(sz[a] < sz[b]){ //manje stablo ide ispod većeg
        swap(a, b);
    }

    parent[b] = a;
    sz[a] += sz[b];

    components--;
}
```

I jedna mala pomoćna funkcija koju ćemo stalno koristiti:
~!
```c++
bool same(int a, int b){
    return find(a) == find(b);
}
```

Pravljenje: **O(n)**
find i unite: **O(α(n))** - u praksi O(1)
Memorija: **O(n)**

>Poređenje se radi isključivo ovako, i nikako drugačije: `find(a) == find(b)`!
### Gde ga koristimo

- Povezane komponente koje samo rastu, kao u zadatku sa putevima s početka lekcije.
- Provera da li bi nova grana zatvorila ciklus - ako su joj oba kraja već u istom skupu, zatvorila bi ga.
- Kruskalov algoritam za minimalna razapinjuća stabla, a to je red iznad pušten u petlju. Upoznaćemo ga kasnije.
- Grupisanje po bilo čemu što se ponaša kao "ovo dvoje je isto": isti tim, ista boja, isti region table.

>Napomena:
>Union Find ume da spaja, ali nikada ne ume da razdvaja. Kada dva skupa postanu jedan, nijedna operacija ih više ne rastavlja. Ako zadatak grane **izbacuje** umesto da ih dodaje, uobičajen trik je da se prvo pročita ceo ulaz, pa da se upiti obrade unazad - izbacivanje pročitano unatraške je prosto dodavanje.
