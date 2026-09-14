>U ovoj lekciji učimo kako da prebrojimo brojeve sa nekim svojstvom, čak i kada ih ima `10^18` - DP nad brojevima!

Svaki dp do sada imao je stanje koje smo mogli da pokažemo prstom negde u ulazu. `dp[i]` je bio položaj u nizu, `dp[v]` čvor u stablu, `dp[maska]` skup poslova.

Evo zadatka u kome je ulaz jedan jedini broj:

>Koliko brojeva između `1` i `10^18` ne sadrži cifru `7`?

Petlja ne dolazi u obzir. I da obradimo milijardu brojeva u sekundi, za `10^18` njih bi nam trebalo tridesetak godina.

Ali pogledaj ulaz još jednom. Ispisan, `10^18` ima `19` cifara. Sve što je zadatku bitno krije se u tih devetnaest cifara, a ne u `10^18` vrednosti.

Zato prestajemo da brojimo naviše, vrednost po vrednost, i počinjemo da gradimo broj - cifru po cifru.

### Brojanje bez granice

Krenimo od nečeg lakšeg: koliko niski od tačno `3` cifre ne sadrži `7`?

Na svakom mestu imamo `9` dozvoljenih cifara, a mesta ne utiču jedno na drugo, pa je odgovor `9 * 9 * 9 = 729`. Nigde nikakvog dp-a.

Sada dodajmo granicu: koliko brojeva od `0` do `250` ne sadrži `7`? Odjednom mesta itekako utiču jedno na drugo. Ako je prva cifra `2`, druga ne sme biti `9`. Ako je prva cifra `1`, sme.

Ta jedna jedina zavisnost je cela težina ovog dp-a, a da bismo je rešili, dovoljno je da pamtimo tačno jednu stvar.

### Na granici

Hajde da naš broj pišemo sleva nadesno, mesto po mesto, i da ga usput poredimo sa `N = 250`.

Prva cifra može biti `0`, `1` ili `2`, jer sve veće od toga već prelazi `250`.

- Ako upišemo `0` ili `1`, broj je **već manji** od `250`, šta god da dođe posle. Preostale dve cifre su potpuno slobodne - od `00` do `99`.
- Ako upišemo `2`, i dalje se **tačno poklapamo** sa početkom broja `250`. Sledeća cifra ne sme preko `5`.

Dakle, na svakom mestu smo u jednoj od dve situacije:

- **na granici** (en. tight) - ono što smo do sada napisali je tačno početak broja `N`, pa ova cifra ne sme preko odgovarajuće cifre iz `N`
- **slobodni** - ono što smo napisali je već manje, pa ova cifra može biti bilo koja, od `0` do `9`

	![[digit-dp-tight.png|Granica N jednaka 250 pored stabla prvih cifara, gde upisivanje nule ili jedinice spušta naGranici na 0 i otvara svih deset mogućnosti za sledeće mesto, dok upisivanje dvojke zadržava naGranici na 1 i ograničava sledeće mesto na 5, pa ostaje samo šest mogućnosti]]

A evo zašto je sve ovo jeftino: **kada jednom postanemo slobodni, nazad na granicu ne možemo nikada.** Zato se cela istorija onoga što smo napisali sabija u jedno jedino da/ne.

### Stanje

`dp[poz][naGranici]` = na koliko načina možemo da popunimo mesta od `poz` do kraja, ako znamo da li smo još uvek na granici.

`poz` ide do `19`, a `naGranici` je `0` ili `1`. To je `38` stanja, za zadatak u kome se krije `10^18` brojeva.

>Napomena:
>DP nad brojevima se skoro uvek piše odozgo nadole. Rekurzija i sama ide sleva nadesno kroz cifre, a `naGranici` je baš ono što jedan poziv prosleđuje svojoj deci. Odozdo nagore je, kao i uvek, moguće, ali to niko ne piše.

### Kod

~!
```c++
string N;
long long memo[20][2];

long long prebroj(int poz, int naGranici){

    if(poz == N.size()){ //ispisali smo ceo broj
        return 1;
    }

    if(memo[poz][naGranici] != -1){
        return memo[poz][naGranici];
    }

    int granica = 9;

    if(naGranici){ //još smo zalepljeni za N, pa je ova cifra ograničena
        granica = N[poz]-'0';
    }

    long long rez = 0;

    for(int c=0;c<=granica;c++){

        if(c == 7){ //zabranjena cifra
            continue;
        }

        rez += prebroj(poz+1, naGranici && c==granica);
    }

    memo[poz][naGranici] = rez;

    return rez;
}
```
Izlaz:
`208` - za ulaz `250`

Jedna linija nosi celu ideju:

- `naGranici && c==granica` - na granici ostajemo samo ako smo već bili na njoj **i** ako smo upravo upisali najveću cifru koju smo smeli. Upišemo li bilo šta manje, od tog trenutka smo slobodni.

Vremenska složenost: **O(len * 10)**, gde je `len` broj cifara
Prostorna složenost: **O(len)**

>Napomena:
>Rezultati vrlo brzo postanu ogromni. Ovde odgovor može biti oko `1.5 * 10^17`, a to `int` ne može da primi. U dp-u nad brojevima rezultat je podrazumevano `long long`, a zadatak najčešće i traži odgovor po modulu nečega.

### Opsezi

Naša funkcija odgovara na pitanje "koliko ih ima u `[0, x]`", a zadaci traže `[L, R]`.

To je opet trik sa zbirom prefiksa. Ako sa `f(x)` označimo koliko brojeva iz `[0, x]` zadovoljava uslov, onda je:

`resenje(L, R) = f(R) - f(L-1)`

	![[digit-dp-ranges.png|Tri trake iznad brojevne prave od 0 do 250: f od 250 pokriva celu pravu i drži 208, f od 99 pokriva levi deo i drži 81, a preostali deo od 100 do 250 drži 127, sa 208 minus 81 jednako 127 ispisanim ispod]]

### Dodavanje pravog stanja

Pravilo `bez sedmice` bilo je lako zato što je cifra dozvoljena ili nije, sasvim nezavisno od ostalih. Većina zadataka nije takva:

>Koliko brojeva između `1` i `N` ima cifre čiji je zbir tačno `10`?

Sada cifra postaje dobra ili loša tek u odnosu na ono što je bilo pre nje, pa tekući zbir mora da uđe u stanje:

`dp[poz][naGranici][zbir]` = na koliko načina možemo da dovršimo broj, ako cifre do sada daju zbir `zbir`

~!
```c++
string N;
int S = 10;
long long memo[20][2][200];

long long prebroj(int poz, int naGranici, int zbir){

    if(zbir > S){ //premašili smo, ništa ispod ne može da nas spase
        return 0;
    }

    if(poz == N.size()){
        return zbir == S;
    }

    if(memo[poz][naGranici][zbir] != -1){
        return memo[poz][naGranici][zbir];
    }

    int granica = 9;

    if(naGranici){
        granica = N[poz]-'0';
    }

    long long rez = 0;

    for(int c=0;c<=granica;c++){
        rez += prebroj(poz+1, naGranici && c==granica, zbir+c);
    }

    memo[poz][naGranici][zbir] = rez;

    return rez;
}
```

Promenio se i izlaz iz rekurzije. Dolazak do kraja više ne znači "našli smo jedan", nego "našli smo jedan **ako** je zbir ispao kakav treba", pa vraćamo `zbir == S` umesto `1`.

Niz `memo` je širok `200` zato što `19` devetki daje najviše `171`. Kada nisi siguran, neka ta dimenzija bude malo veća nego što misliš da treba. Ne košta ništa, a dp koji čita van svog `memo` niza pada na način koji je vrlo neprijatno gledati.

Vremenska složenost: **O(len * S * 10)**
Prostorna složenost: **O(len * S)**

### Vodeće nule

`to_string(250)` daje tri karaktera, pa naš dp gradi niske od tačno tri cifre. Broj `7` se zato gradi kao `007`, a broj `0` kao `000`.

Ponekad to ume da pokvari zadatak, na primer:

>Koliko brojeva između `1` i `100` nema dve iste cifre jednu do druge?

	![[digit-dp-leading-zeros.png|Sa leve strane broj 7 dopunjen do 0 0 7, sa dve vodeće nule precrtane i obuhvaćene zagradom, i redom poceo koji ispod glasi 0 0 1. Sa desne strane broj 1 dopunjen do 0 0 1, gde njegove dve nule za popunu obaraju proveru c jednako pret, pa broj biva odbačen]]

Rešenje je druga promenljiva, `poceo`, koja je `0` dok još upisujemo nule za popunu, a `1` od prve cifre različite od nule pa nadalje. Pravilo važi tek kada smo zaista počeli:

### Koja stanja da koristiš

Promenljive `naGranici` i `poceo` iste su u svakom zadatku. Zanimljiva je uvek treća dimenzija, a evo nekoliko primera šta ona može da bude:

| Šta zadatak traži | Dodatno stanje |
| ---- | ---- |
| cifre daju neki zbir | `zbir` |
| broj je deljiv sa `k` | `vrednost % k`, koji se gradi kao `(vrednost*10 + c) % k` |
| susedne cifre | `pret` |
| cifre nikada ne opadaju | `pret` |
| koje se cifre uopšte pojavljuju | bitmaska nad deset cifara |
| koliko puta se neka cifra pojavljuje | brojač |


Složenost je uvek istog oblika: **broj stanja puta 10**. Pošto `poz` ide najviše do `19`, a dve pomenute promenljive daju `4`, ono što staviš u dodatnu dimenziju odlučuje da li rešenje prolazi.

>Napomena:
>Neki zadaci ne pitaju koliko brojeva ima neko svojstvo, nego traže zbir svih takvih brojeva. Struktura ostaje ista - funkcija samo vraća par, brojač i zbir, a spajanje dva deteta znači da se saberu oba polja. I dalje je najpametnije prvo dovesti brojanje u red.

Najteži deo dp-a nad brojevima nikada nije kod. Svako rešenje u ovoj lekciji je istih dvadesetak linija sa drugačijom trećom dimenzijom. Teško je pogoditi koji je najmanji deo istorije koji sledećoj cifri zaista treba - baš kao i kod izbora stanja u DP-u nad stablima i DP-u nad bitmaskama.
