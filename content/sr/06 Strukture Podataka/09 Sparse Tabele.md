>U ovoj lekciji naučićemo da rešavamo statičke upite nad opsegom bez inverza u O(1) - stvari poput min, max i slično...


Već znamo šta su statički upiti nad opsegom - niz pitanja oblika `[l, r]`, gde nešto tražimo u nizu između `l` i `r`.

Najpoznatiji su Zbir Prefiksa, ali Zbir Prefiksa ne radi za min i max.

Tu na scenu stupaju Sparse Tabele (en. Sparse Tables)!

### Teorija

>Pre nego što počnemo, jedna stvar mora da se naglasi:
>Sparse tabele su korisne samo ako operaciji koju koristimo preklapanje ne smeta (en. overlap friendly), drugim rečima ako segment [1, 10] daje isti rezultat kao [1,6] zajedno sa [3,10]!

Kada znamo da je to ispunjeno, možemo da sagradimo tabelu i da odgovaramo na upite u O(1)! (ako nije ispunjeno, prosto uzmemo segmentno stablo).

A tabela će biti dvodimenzioni niz, gde `lookup[i][j]` čuva vrednost bloka od `2^j` elemenata koji počinje na poziciji `i`.

Možemo je zamisliti kao stepenice, gde je prvi nivo sam originalni niz, a svaki naredni ide po korak dalje odjednom:

	![[sparse-table-layers.png|Niz od 12 elemenata kao donji nivo, a iznad njega tri nivoa koji pokrivaju 2, 4 i 8 elemenata počev od indeksa 0, pri čemu je pored svakog isprekidanom linijom nacrtan blok koji počinje na indeksu 1]]

Kroz celu lekciju koristićemo ovaj niz od `12` elemenata: `5 2 9 7 1 8 3 6 4 10 2 7`

Isprekidani blokovi su podjednako važni kao i puni. Za razliku od segmentnog stabla, sparse tabela ima blok koji počinje na **svakom** indeksu, a ne samo na onima koji se lepo uklapaju. Zbog toga je tabela velika `n * log n`, i baš zbog toga upit i može da radi.

Ova struktura donekle liči na segmentna stabla (utoliko što idemo u koracima koji su stepeni dvojke)

#### Gradnja tabele

Uzmimo `max` za primer

Tabelu gradimo dinamičkim programiranjem, počev od prvog nivoa, a on je samo originalni niz.

	![[sparse-table-base.png|Sparse tabela nacrtana kao četiri reda, gde donji red j jednako 0 sadrži niz 5 2 9 7 1 8 3 6 4 10 2 7, dok su tri reda iznad njega još prazna, svaki kraći od onog ispod]]

Primeti da je svaki nivo kraći od onog ispod njega. Blok od `2^j` elemenata koji počinje na `i` postoji samo dok `i + 2^j` staje u niz, pa nivo `j` ima `n - 2^j + 1` polja.

`lookup[i][j]` pokriva segment `[i, i + 2^j - 1]`

Zato je svako polje maksimum polja tačno ispod njega i polja `2^(j-1)` mesta desno od njega:

`lookup[i][j] = max(lookup[i][j-1], lookup[i + 2^(j-1)][j-1])`

	![[sparse-table-step.png|Jedan korak gradnje, gde se lookup na 0 i lookup na 2 sa nivoa 1, koji drže 5 i 9, spajaju u lookup na 0 na nivou 2, koji postaje 9, pri čemu su dve polovine razmaknute za 2 na stepen 1]]

Ponavljamo dok se cela tabela ne popuni:

	![[sparse-table-full.png|Gotova tabela, gde nivo 0 drži niz, nivo 1 drži 5 9 9 7 8 8 6 6 10 10 7, nivo 2 drži 9 9 9 8 8 8 10 10 10, a nivo 3 drži 9 9 10 10 10]]

#### Upit za vrednost

Ovo je deo zbog kojeg operaciji koju koristimo preklapanje ne sme da smeta.

Prvo nađemo najveći stepen dvojke koji je manji ili jednak broju elemenata u datom opsegu. Nazovimo ga `k`, pa je dužina bloka `2^k`.

Onda su nam dovoljna dva bloka: jedan prislonjen uz levi kraj opsega, `lookup[l][k]`, i jedan prislonjen uz desni kraj, `lookup[r - 2^k + 1][k]`. Pošto je `2^k` više od polovine opsega, ta dva bloka se uvek sastanu, a najčešće se i preklope.

	![[sparse-table-query.png|Upit od 3 do 9 na koji odgovaraju dva bloka dužine 4, lookup na 3 koji drži 8 i lookup na 6 koji drži 10, koji se preklapaju na indeksu 6 i daju maksimum 10]]

Opseg `[3, 9]` ima `7` elemenata, pa je `k = 2` i oba bloka su dugačka `4`. Pokrivaju `[3, 6]` i `[6, 9]` i preklapaju se na indeksu `6` - a pošto `max`-u ne smeta da istu stvar čuje dvaput, odgovor je prosto `max(8, 10) = 10`.

Eto zašto dobijamo O(1)


#### Kod:


Gradnja ima dve petlje:

**Spoljašnja** petlja prolazi kroz nivoe, počev od `1`. Ona mora da bude spoljašnja, jer se nivo `j` u potpunosti gradi od nivoa `j-1` - kada krenemo na neki nivo, onaj ispod njega mora već biti gotov.

**Unutrašnja** petlja prolazi kroz početne pozicije unutar jednog nivoa. Ona staje na `i + 2^j <= n`, i baš to svaki nivo čini kraćim od prethodnog: čim bi blok izašao iz niza, nema više šta da se upiše.

Kod za gradnju:
~!
```c++
vector<vector<int>> buildSparseTable(vector<int> &arr) {

    int n = arr.size();

    int levels = 1;

    while((1<<levels) <= n){ //koliko puta možemo da udvostručimo a da i dalje stanemo u n
        levels++;
    }

    vector<vector<int>> lookup(n, vector<int>(levels, 0));

    for(int i=0;i<n;i++){ //nivo 0 je sam niz
        lookup[i][0] = arr[i];
    }

    for(int j=1;j<levels;j++){ //nivo po nivo, svaki pokriva dvaput više

        for(int i=0; i + (1<<j) <= n; i++){ //svaki početak čiji blok još staje u niz

            lookup[i][j] = max(lookup[i][j-1], lookup[i + (1<<(j-1))][j-1]);
        }
    }

    return lookup;
}
```

Upit ima jednu petlju, i ona je tu samo da nađe `k`. Broji koliko puta možemo da udvostručimo pre nego što pređemo dužinu opsega, a to je najviše `log n` koraka i dešava se jednom po upitu.

Kod za upit:
~!
```c++
long long power_of_two(long long a){ //najveće k za koje je 2^k <= a

    long long k = 0;

    while((1LL<<(k+1)) <= a){
        k++;
    }

    return k;
}

int query(int L, int R, vector<vector<int>> &lookup)  {

    int len = R - L + 1;

    int k = power_of_two(len); //oba bloka koja čitamo dugačka su 2^k

    return max(lookup[L][k], lookup[R - (1<<k) + 1][k]);
}
```

Sve zajedno, na našem nizu:
~!
```c++
int main(){

    vector<int> arr = {5, 2, 9, 7, 1, 8, 3, 6, 4, 10, 2, 7};

    vector<vector<int>> lookup = buildSparseTable(arr);

    cout<<query(3, 9, lookup)<<'\n';
    cout<<query(0, 4, lookup)<<'\n';
    cout<<query(6, 8, lookup)<<'\n';

    return 0;
}
```
Izlaz:
`10`
`9`
`6`

Gradnja popunjava `n * log n` polja, a svako od njih košta jedno poređenje, dok upit čita tačno dva polja, ma koliko opseg bio širok.

Gradnja: **O(n log n)**
Upit: **O(1)**
Memorija: **O(n log n)**

>Napomena:
>Sparse tabele se sagrade jednom i posle se ne menjaju. Operacija izmene ne postoji - u trenutku kada neki element može da se promeni, sve što je iznad njega sagrađeno postaje pogrešno, i tada ti umesto nje treba segmentno stablo.