Gradski urbanista pregleda gomilu predloga za nove puteve. Svaki predlog je prava deonica puta između dve tačke, i pre nego što se bilo šta izgradi treba da zna koji parovi puteva bi naleteli jedan na drugi.

Dato ti je $t$ parova duži. Za svaki par odredi da li te dve duži imaju **bar jednu zajedničku tačku**. Dovoljna je i jedna jedina zajednička tačka - nije bitno da li se duži uredno ukrštaju, samo dodiruju u kraju, ili leže jedna preko druge celom jednom deonicom.

## Ulaz

U prvoj liniji je jedan ceo broj $t$ - broj test primera.

U svakoj od narednih $t$ linija je osam celih brojeva $A_x$, $A_y$, $B_x$, $B_y$, $C_x$, $C_y$, $D_x$, $D_y$ - prva duž ide od $A$ do $B$, a druga od $C$ do $D$.

## Izlaz

Za svaki test primer ispiši `YES` ako duži imaju zajedničku tačku, a `NO` ako nemaju.

## Primer

```Input
5
0 0 4 4 0 4 4 0
0 0 4 4 0 10 10 0
0 0 4 4 4 4 8 0
0 0 4 4 2 2 6 6
0 0 4 4 1 0 5 4
```

```Output
YES
NO
YES
YES
NO
```

Prvi par se ukršta po sredini, u tački $(2, 2)$. U drugom paru se dve beskonačne prave jesu presekle, ali same duži se završavaju mnogo pre toga. Treći par se dodiruje u jednoj jedinoj tački $(4, 4)$, četvrti par leži na istoj pravoj i preklapa se između $(2, 2)$ i $(4, 4)$, a peti par je paralelan.

## Ograničenja

$1 \le t \le 10^4$
$-10^9 \le A_x, A_y, B_x, B_y, C_x, C_y, D_x, D_y \le 10^9$
$A \ne B$ i $C \ne D$
