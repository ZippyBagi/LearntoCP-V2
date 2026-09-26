Lopov je provalio u magacin noseći ranac koji može da izdrži najviše $W$ kilograma. U magacinu se nalazi $n$ predmeta, svaki sa svojom težinom i vrednošću. Svaki predmet može se uzeti **najviše jednom**, a predmeti se ne mogu deliti.

Odredi najveću ukupnu vrednost predmeta koje lopov može da iznese, tako da njihova ukupna težina ne pređe $W$.

## Ulaz

U prvom redu nalaze se dva broja: $n$ i $W$, broj predmeta i kapacitet ranca.
U narednih $n$ redova nalaze se po dva broja: $w_i$ i $v_i$, težina i vrednost $i$-tog predmeta.

## Izlaz

Jedan broj - najveća ukupna vrednost koja staje u ranac.

## Primer

```Input
4 5
4 1
5 2
1 3
3 4
```

```Output
7
```

Lopov uzima treći i četvrti predmet: ukupna težina $1 + 3 = 4 \le 5$, ukupna vrednost $3 + 4 = 7$.

## Ograničenja

$1 \le n \le 100$
$1 \le W \le 10^4$
$1 \le w_i \le W$
$1 \le v_i \le 10^6$
