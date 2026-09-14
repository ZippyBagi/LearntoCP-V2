>U ovoj lekciji naučićemo bržu, ali ograničeniju verziju segmentnih stabala - Fenvikova Stabla (en. Fenwick Trees, poznata i kao Binary Indexed Tree ili BIT)

Kao i segmentna stabla, Fenvikova stabla odgovaraju na **dinamičke upite nad opsegom**.

Razlikuju se u nekoliko stvari:

1. Fenvikova stabla su brža za konstantan faktor (i dalje su O(log n), ali su konstante manje)
2. Troše manje memorije - tačno O(n)
3. Kraća su za pisanje, ali teža za razumevanje
4. Ograničenija su. Sve što reši Fenvikovo stablo, reši i segmentno, ali obrnuto ne važi

### Glavno ograničenje

Zbog načina na koji rade (do toga stižemo za koji trenutak), Fenvikova stabla zahtevaju da operacija koju koristimo ima **inverz**.

Inverz imaju: **sabiranje** (inverz mu je oduzimanje), **oduzimanje** (inverz mu je sabiranje), **množenje** (inverz mu je deljenje)...

Inverz nemaju: **min**, **max**, **and**...

Zato Fenvikovo stablo ume da sabira, ali ne ume da nađe minimum na opsegu.

### Kako stablo radi

Fenvikovo stablo je teško zamisliti kao sliku, pa ćemo krenuti od pravila.

Stablo čuvamo kao običan niz veličine `n`.

Na poziciji `k` stoji zbir opsega `[f(k)+1, k]`.

A `f(k)` je broj koji dobijemo kada broju `k` obrišemo **najniži jedinični bit** (en. least significant bit).

Zvuči čudno, ali zamisli to kao pametniji Zbir Prefiksa. Umesto da svaka pozicija pokriva ceo prefiks, svaka pokriva samo jedan komad, a komadi su tako složeni da se od njih brzo sklopi bilo koji prefiks.

Za niz `a = {1, 2, 5, 3, -2, 8, -3}` Fenvikov zapis izgleda ovako:

	![[fenwick-segments.png|Niz 1 2 5 3 -2 8 -3 iznad Fenvikovog stabla 1 3 5 11 -2 6 -3, gde je ispod svake pozicije nacrtan opseg koji ona pokriva, pri čemu pozicije koje su stepen dvojke pokrivaju najduže komade]]

Vidimo da svaka pozicija pokriva po jedan komad niza.

Ključno zapažanje je sledeće. Ako saberemo komade

`[f(k)+1, k]`, pa `[f(f(k))+1, f(k)]`, pa tako dalje

sve dok `f(k)` ne postane 0, dobili smo tačno `[1, k]` - ceo prefiks.

	![[fenwick-prefix-walk.png|Računanje prefiksa do pozicije 7 u Fenvikovom stablu, gde se uzimaju pozicije 7, 6 i 4, a njihovi komadi se nadovezuju jedan na drugi i zajedno pokrivaju ceo opseg od 1 do 7]]

Zašto je to brzo? Svaki korak briše po jedan jedinični bit iz `k`, a broj `k` ih ima najviše O(log k). Dakle ceo prefiks sklopimo u O(log n) koraka.

A zbir na opsegu `[l,r]` dobijamo isto kao kod Zbira Prefiksa - oduzimanjem: `S(r) - S(l-1)`.

>Napomena:
>Fenvikova stabla se **uvek** indeksiraju od 1. Pozicija 0 nema najniži jedinični bit, pa bi nam se svaka petlja tu zaglavila.

### Izmena elemenata

Recimo da u nizu `a = {1, 2, 5, 3, -2, 8, -3}` želimo da `5` postane `11`.

Prvo računamo `delta` - za koliko se vrednost promenila: `delta = 11 - 5` => `+6`.

Sada moramo da prođemo kroz sve pozicije čiji komad pokriva našu poziciju (zovimo ih **roditelji**) i svakoj dodamo `delta`.

Ovde se vidi zašto nam treba inverz. Mi ne znamo šta sve stoji u zbiru na nekoj poziciji, pa ne možemo da ga izračunamo iznova - možemo samo da ga popravimo za razliku. Kod minimuma to ne bi radilo, jer od starog minimuma i razlike ne možeš dobiti novi.

Do roditelja se stiže tako što najniži jedinični bit **dodajemo** umesto da ga brišemo, sve dok ne izađemo iz niza.

	![[fenwick-update.png|Izmena treće pozicije u Fenvikovom stablu, gde se delta plus 6 dodaje poziciji 3 pa poziciji 4, dok sledeći skok na 8 izlazi iz niza pa se petlja zaustavlja]]

I ovde je koraka O(log n), iz istog razloga kao maločas.

### Pravljenje stabla

Stablo možemo napraviti u O(n), u dva prolaza.

Prvo prepišemo originalne elemente, s tim što ih pomerimo za jedno mesto jer brojimo od 1:

	![[fenwick-build-copy.png|Prvi korak gradnje, gde se elementi 1 2 5 3 -2 8 -3 prepisuju na pozicije od 1 do 7, dok pozicija 0 ostaje prazna]]

Zatim prođemo kroz pozicije redom i svaku dodamo njenom roditelju:

	![[fenwick-build-parents.png|Drugi korak gradnje, gde svaka pozicija svoju vrednost dodaje roditelju, pa se niz pretvara u 1 3 5 11 -2 6 -3]]

Pošto idemo sleva nadesno, kada stignemo do pozicije `i` ona je već primila sve što joj pripada, pa je bezbedno prosleđujemo dalje.

### Implementacija

Ostalo je samo da naučimo da računamo `f(k)`.

Najniži jedinični bit broja `k` izdvaja se izrazom `k & -k`, pa je:

`f(k) = k - (k & -k)`

Pogledajmo na primeru broja `5`, koji je binarno `0101`:

`-5` je binarno `1011`, pa je `0101 & 1011` = `0001`

`f(5) = 5 - 1 = 4`

Do roditelja se stiže isto tako lako, samo bit dodajemo umesto da ga oduzimamo:

`parent(k) = k + (k & -k)`

>Napomena:
>Razlog zašto `k & -k` izdvaja baš najniži jedinični bit leži u zapisu negativnih brojeva (dvojni komplement). Ako ti to nije očigledno, ne mori se - u praksi je dovoljno zapamtiti izraz.

### Kod:

Pravljenje stabla:
~!
```c++
//elements je 0-indeksiran niz, a je Fenvikovo stablo i indeksira se od 1
void createFenwick(vector<int>& a, const vector<int>& elements){

    int n = elements.size();
    a.assign(n + 1, 0); //postavlja veličinu niza a i upisuje nule na svako mesto

    //korak 1: prepisujemo elemente
    for(int i = 1; i <= n; i++){
        a[i] = elements[i-1];
    }

    //korak 2: gradimo Fenvikovu strukturu
    for(int i = 1; i <= n; i++){
        int parent = i + (i & -i);
        if(parent <= n){
            a[parent] += a[i];
        }
    }
}
```

Zbir prefiksa do pozicije `k`:
~!
```c++
int prefixSum(vector<int>& a, int k){

    int sum = 0;

    while(k > 0){
        sum += a[k];
        k -= k & -k; //brišemo najniži jedinični bit
    }

    return sum;
}
```

Izmena elementa. Pazi da je `pos` ovde indeksiran od 1, kao i celo stablo:
~!
```c++
//postavlja vrednost el na poziciju pos
void add(vector<int>& a, vector<int>& elements, int pos, int el){

    int n = a.size();

    int delta = el - elements[pos-1]; //za koliko se vrednost promenila
    elements[pos-1] = el;

    while(pos < n){
        a[pos] += delta;
        pos += pos & -pos; //prelazimo na roditelja
    }
}
```

Gradnja stabla nas košta **O(n)**, a svaki upit i svaka izmena **O(log n)**. Memorija je **O(n)**.

>Napomena:
>Primeti da uz Fenvikovo stablo moramo da čuvamo i originalni niz `elements`. Stablo pamti samo zbirove komada, pa iz njega ne možemo pročitati koliko je neki element bio pre izmene - a to nam treba da bismo izračunali `delta`.

Kao što vidiš, Fenvikovo stablo je znatno kraće za pisanje od segmentnog. Kada u zadatku treba samo zbir na opsegu uz izmene, ono je prvi izbor.
