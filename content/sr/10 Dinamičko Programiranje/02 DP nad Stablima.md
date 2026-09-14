>U ovoj lekciji učimo dinamičko programiranje nad stablima!

Ideja je potpuno ista kao kod običnog dinamičkog programiranja, **već izračunate vrednosti koristimo da izračunamo nove!**

I ovde postoje oba pristupa, i odozgo naniže i odozdo naviše.

Jedina razlika je u tome što se ovakvi zadaci rade nad grafovima (tačnije nad stablima), pa moramo da budemo malo maštovitiji u tome kako čuvamo vrednosti.

### Primer

Pogledajmo verziju klasičnog Problema Lopova, prilagođenu stablu:

#### Zadatak:

> Dato je stablo `T` sa `N` čvorova, gde svaki čvor `i` nosi `C[i]` novčića. Treba izabrati podskup čvorova takav da nikoja dva izabrana čvora nisu susedna (tj. povezana granom), a da zbir novčića u izabranom podskupu bude što veći.

	![[tree-dp-robber.png|Stablo sa deset čvorova korenovano u 0, sa novčićima 0, 1, 11, 7, 3, 4, 8, 9, 5 i 0 upisanim u krugove, gde je najbolji podskup bez dva susedna čvora 1, 5, 6, 7 i 8, vredan 1 plus 4 plus 8 plus 9 plus 5 jednako 27]]

Stablo je neusmeren graf, pa u njemu ne postoje roditelji i deca sami od sebe. Kod DP-a nad stablima zato biramo jedan čvor po volji i proglašavamo ga korenom. Time svaki drugi čvor dobija roditelja, a celo stablo možemo da posmatramo kao hijerarhiju podstabala. (Neka koren za sada bude `0`.)

Pogledajmo sada šta nam stoji na raspolaganju u čvoru `i`:

- Možemo da uzmemo `i`, ali onda MORAMO da preskočimo njegovu decu - unuke, međutim, SMEMO da uzmemo
- Ili možemo da preskočimo `i`, i tada SMEMO da uzmemo njegovu decu

Sada možemo da napravimo dvodimenzionalni dp niz:

`dp[i][0]` - preskačemo ovaj čvor
`dp[i][1]` - uzimamo ovaj čvor

To znači da je `dp[i][0]` zbir najboljih izbora za decu, bez samog `i`, dok je `dp[i][1]` vrednost čvora uvećana za zbir koji dobijamo kada decu preskačemo (a taj podatak već stoji u `dp[dete][0]`, dakle u slučaju kada dete ne uzimamo).

`dp[i][0]` = $\sum_{dete=0}^{deca.size()} max(dp[dete][0],dp[dete][1])$

`dp[i][1]` = $C[i] + \sum_{dete=0}^{deca.size()} dp[dete][0]$

Konačno rešenje je `max(dp[0][0], dp[0][1])`, ako smo stablo korenovali u `0`!

### Kod:

Primetimo da je ovo, iako koristimo rekurziju, i dalje rešenje odozdo naviše - samo sprovedeno kroz DFS!
~!
```c++
vector<int> susedi[N]; //spisak suseda za svaki čvor

//dp niz kao što smo ga gore definisali
int dp[N][2];

vector<int> C = {0,1,11,7,3,4,8,9,5,0}; //vrednosti čvorova

void dfs(int v, int p){

    int zbir1=0, zbir2=0;

    for(auto dete: susedi[v]){ //dete je indeks deteta, a v indeks trenutnog čvora

        if(dete == p) continue; //preskačemo čvor iz koga smo došli, pošto se i on nalazi među susedima

        dfs(dete, v); //rekurzivno pozivamo dfs za decu

        zbir1 += dp[dete][0];  //dodajemo vrednost za slučaj kada dete preskačemo

        zbir2 += max(dp[dete][0], dp[dete][1]); //dodajemo NAJBOLJU vrednost deteta (već smo izračunali da li se isplati uzeti ga)
    }

    dp[v][1] = C[v] + zbir1; //za listove, koji nemaju decu, ovo je prosto njihova vrednost
    dp[v][0] = zbir2; //vrednost dobijena od dece
}
```
Vremenska složenost: **O(n)** - svaki čvor obilazimo tačno jednom!

>Kao što vidimo, DP nad stablima je vrlo blizak običnom DP-u, samo zadaci traže malo više razmišljanja i malo teže strukture podataka. Najvažnije od svega je izabrati prava stanja!

Najbolji način da se izveštiš u DP-u nad stablima jeste da se prvo dobro odomaćiš u običnom DP-u i u grafovima!
