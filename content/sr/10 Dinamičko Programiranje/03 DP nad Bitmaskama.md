>U ovoj lekciji učimo šta se dešava kada dp stanje prestane da bude broj i postane skup - DP nad bitmaskama!

Svaki dp koji smo do sada napisali imao je stanje koje smo mogli da izbrojimo na prste. `dp[i]` je bio `i`-ti Fibonačijev broj, `dp[i][w]` najbolje što možemo da izvučemo iz prvih `i` predmeta uz preostali kapacitet `w`, a `dp[v][0]` i `dp[v][1]` dva izbora u čvoru `v`.

Neki zadaci nikako neće da stanu u taj kalup. Pogledaj ovaj:

>Imamo `n` radnika i `n` poslova. Ako radnik `i` radi posao `j`, to košta `cena[i][j]`. Svaki radnik dobija tačno jedan posao, i svaki posao ide tačno jednom radniku. Ukupnu cenu treba svesti na najmanju moguću.

Kako ovde izgleda delimično rešenje? Podelili smo nekoliko poslova i spremamo se da dodelimo sledeći. Da bismo dobro odlučili, uopšte nam ne treba podatak o tome **koji** radnik je dobio **koji** posao - dovoljno je da znamo **koji poslovi su već razdeljeni**.

A to je skup. Nije indeks, nije brojač. Skup.

Već znamo da skup zapišemo kao broj, pa je `dp[maska]` opet samo običan niz.

### Stanje

Neka `maska` bude skup poslova koji su već dodeljeni.

Sada dolazi zapažanje zbog koga cela stvar radi: ako u `maska` ima `k` poslova, onda je tačno `k` radnika već zbrinuto, pa je sledeći na redu upravo radnik `k`. A `k` je `__builtin_popcount(maska)`.

Druga dimenzija nam nikada nije ni trebala. Maska nam sama govori dokle smo stigli.

`dp[maska]` = najjeftiniji način da poslove iz `maska` razdelimo radnicima od `0` do `k-1`

Rešenje je `dp[(1<<n)-1]`, stanje u kome je svaki posao podeljen.

	![[bitmask-dp-assignment-sr.png|Tabela cena tri sa tri za radnike R0 do R2 i poslove P0 do P2 sa vrednostima 9 2 7, 6 4 3 i 5 8 1, pored rešetke od osam maski od 000 na dnu do 111 na vrhu, gde je najjeftiniji put 000 do 010 do 011 do 111 istaknut, a koraci su označeni sa 2, 6 i 1, što ukupno daje 9]]

### Prelaz

Dok stojimo u `dp[maska]`, gledamo radnika `k` i probamo svaki posao koji je još slobodan:

`dp[maska | (1<<posao)] = min(dp[maska | (1<<posao)], dp[maska] + cena[k][posao])`

Ovo je **guranje** (push): umesto da se pitamo odakle je trenutno stanje došlo, uzimamo vrednost koju već imamo i guramo je unapred u svako stanje do koga može da stigne.

Petlja kroz maske može da ide prosto rastuće, i to nije slučajnost. Paljenje bita uvek povećava broj, pa je `maska | (1<<posao)` uvek veće od `maska`. Dok stignemo do neke maske, sve što je moglo da je popravi već je obrađeno.

### Kod

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int n = 3;

int cena[3][3] = {
    {9, 2, 7},
    {6, 4, 3},
    {5, 8, 1}
};

int main(){

    vector<int> dp(1<<n, 1e9); //1e9 nam služi kao beskonačnost

    dp[0] = 0; //ništa još nije podeljeno, pa ništa nije ni plaćeno

    for(int maska=0;maska<(1<<n);maska++){

        int radnik = __builtin_popcount(maska); //sledeći radnik koji je bez posla

        if(radnik == n){ //svi su već zauzeti
            continue;
        }

        for(int posao=0;posao<n;posao++){

            if((maska>>posao)&1){ //ovaj posao je već dodeljen
                continue;
            }

            int sledeca = maska | (1<<posao);

            dp[sledeca] = min(dp[sledeca], dp[maska] + cena[radnik][posao]);
        }
    }

    cout<<dp[(1<<n)-1];

    return 0;
}
```
Izlaz: `9`

Najjeftiniji raspored je `R0` na `P1` za `2`, `R1` na `P0` za `6` i `R2` na `P2` za `1`.

Vremenska složenost: **O(2^n * n)**
Prostorna složenost: **O(2^n)**

Uporedi to sa probanjem svakog rasporeda redom. Ima ih `n!`, a za `n = 20` to je oko `2 * 10^18` - broj do koga nijedan računar nikada neće izbrojati. Dp radi `2^20 * 20`, što je oko `2 * 10^7`, i završava se istog trena.

Razlog za tu razliku je uobičajen kod dp-a. Dva različita redosleda deljenja ista tri posla vode u isti skup, a od tog trenutka su im budućnosti identične. Permutacija to zaboravlja, a maska pamti.

### Trgovački putnik

Drugi klasik, i onaj koji zadaci najčešće prerušavaju:

>Imamo `n` gradova i rastojanje između svakog para. Krećemo iz grada `0`, obilazimo svaki grad tačno jednom i vraćamo se u `0`. Nađi najkraću takvu turu.

	![[bitmask-dp-tsp.png|Četiri grada 0, 1, 2 i 3 nacrtana kao pravougaonik sa svih šest puteva označenih, gde tura 0 do 1 do 3 do 2 pa nazad do 0 ide spoljašnjom ivicom i košta 10 plus 25 plus 30 plus 15 jednako 80, dok dve dijagonale ostaju neiskorišćene]]

Ovde maska sama nije dovoljna. To što znamo koje smo gradove obišli ne govori nam koliko košta sledeći put, jer to zavisi od toga **gde se trenutno nalazimo**. Zato stanje dobija drugu dimenziju:

`dp[maska][v]` = najkraća ruta koja kreće iz `0`, obilazi tačno gradove iz `maska` i završava se u gradu `v`

Početno stanje je `dp[1][0] = 0` - obišli smo samo grad `0`, u njemu smo i nismo prešli nijedan kilometar.

Iz `dp[maska][v]` vozimo do bilo kog grada `ka` koji još nije u `maska`:

`dp[maska | (1<<ka)][ka] = min(..., dp[maska][v] + d[v][ka])`

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int n = 4;

int d[4][4] = {
    {0, 10, 15, 20},
    {10, 0, 35, 25},
    {15, 35, 0, 30},
    {20, 25, 30, 0}
};

int main(){

    vector<vector<int>> dp(1<<n, vector<int>(n, 1e9));

    dp[1][0] = 0; //obišli smo samo grad 0 i u njemu se nalazimo

    for(int maska=1;maska<(1<<n);maska++){

        for(int v=0;v<n;v++){

            if(dp[maska][v]==1e9){ //ovde nikako ne možemo biti sa ovakvim obiđenim skupom
                continue;
            }

            for(int ka=0;ka<n;ka++){

                if((maska>>ka)&1){ //tamo smo već bili
                    continue;
                }

                int sledeca = maska | (1<<ka);

                dp[sledeca][ka] = min(dp[sledeca][ka], dp[maska][v] + d[v][ka]);
            }
        }
    }

    int pun = (1<<n)-1;
    int najbolje = 1e9;

    for(int v=1;v<n;v++){
        najbolje = min(najbolje, dp[pun][v] + d[v][0]); //put kući
    }

    cout<<najbolje;

    return 0;
}
```
Izlaz: `80`

Ruta je `0 -> 1 -> 3 -> 2 -> 0`, i košta `10 + 25 + 30 + 15`.

Vremenska složenost: **O(2^n * n^2)**
Prostorna složenost: **O(2^n * n)**

Dve linije zaslužuju drugi pogled.

`if(dp[maska][v]==1e9) continue;` nije optimizacija, nego uslov ispravnosti. Većina parova `(maska, v)` je nemoguća - na primer, da smo u gradu `2`, a da `2` nije u obiđenom skupu - a guranje unapred iz beskonačnosti upisalo bi `1e9 + nešto` u neko stvarno stanje i tiho ga zatrovalo.

Poslednja petlja kreće od `v=1`, a ne od `v=0`. Tražimo poslednji grad pre povratka kući, a to ne može biti onaj iz koga smo krenuli.

>Napomena:
>`d[v][0]` na kraju je jedino mesto na kome se ruta zatvara u krug. Ako zadatak traži samo da sve obiđemo i stanemo gde stignemo, taj sabirak se briše i uzima se običan minimum po `dp[pun][v]`.

### Pazi na memoriju

Vremensku složenost svi proveravaju. Memorija je ono na čemu se pada.

`dp[1<<20]` tipa `int` je oko milion brojeva, dakle `4 MB`. To je sasvim u redu.

`dp[1<<20][20]` je dvadeset miliona brojeva, dakle `80 MB`. To je preko ograničenja na većini sistema za ocenjivanje.

Dakle, druga dimenzija ne množi samo vreme izvršavanja, nego i memoriju. Uz dimenziju maske, pravilo je `n <= 20` za `dp[maska]`, a sigurnije `n <= 18` za `dp[maska][v]`.

| dp niz | Memorija za n = 20 |
| ---- | ---- |
| `dp[1<<n]` tipa `int` | ~4 MB |
| `dp[1<<n]` tipa `long long` | ~8 MB |
| `dp[1<<n][n]` tipa `int` | ~80 MB |

Ako `long long` dp nad `dp[maska][v]` ne staje, prvo proveri da li vrednostima uopšte treba `long long`, pre nego što posegneš za trikovima. Najčešće im ne treba.

### Kada je prelaz podmaska

Postoji i treći oblik koji vredi prepoznati - onaj u kome stanje ne dodaje jedan element, nego celu grupu odjednom.

>Podeli `n` ljudi u ekipe. Ekipa koju čine tačno ljudi iz `grupa` košta `w[grupa]`. Nađi najjeftiniju podelu.

Ovde je `dp[maska]` = najjeftiniji način da ljude iz `maska` podelimo u ekipe, a prelaz uzima jednu celu podmasku maske `maska` kao sledeću ekipu:
~!
```c++
dp[0] = 0;

for(int maska=1;maska<(1<<n);maska++){

    for(int pod=maska; pod>0; pod=(pod-1)&maska){

        int ostatak = maska ^ pod; //svi iz maska koji nisu u ovoj ekipi

        dp[maska] = min(dp[maska], dp[ostatak] + w[pod]);
    }
}
```

To je šetnja kroz podmaske iz lekcije o bitmaskama, a njeno pokretanje za svaku masku košta **O(3^n)**. Za `n = 20` to je oko `3.5 * 10^9`, što je presporo, ali za `n = 15` je `1.4 * 10^7` i sasvim udobno.

>Napomena:
>Čest trik je da se jedna osoba fiksira: gledamo samo one podmaske koje sadrže najniži upaljen bit maske `maska`. Svaka podela se tada generiše jednom umesto dvaput, i dobar deo suvišnog posla nestaje.

### Kako da prepoznaš ovakve zadatke

Tri znaka, i obično se pojavljuju zajedno:

- `n` je sumnjivo malo. `n <= 20`, ponekad `n <= 24`. Nijedan zadatak ne postavlja tako nisko ograničenje slučajno.
- Rešenje zavisi od toga **koje** stvari su iskorišćene, a ne samo **koliko** ih je. Da je brojač dovoljan, koristili bismo brojač.
- Gruba sila je `n!` ili "probaj svaki način da ih podeliš".

Kada su sva tri prisutna, zapiši skup kao masku i zapitaj se šta niz `dp[maska]` treba da znači. Izbor tog značenja je ceo zadatak, potpuno isto kao kod DP-a nad stablima - kod posle toga su uvek iste dve ugnežđene petlje.
