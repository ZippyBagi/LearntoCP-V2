U igri "Minesweeper" postoje skrivene bombe na polju, a zadatak igrača je da ih pronađe. Igraču se prikazuje tabla sa brojevima, gde svaki broj predstavlja koliko se bombi nalazi oko tog polja (susedna polja posmatraju se u svih 8 smerova). Tvoj zadatak je da započneš programiranje ove igre tako što ćeš napisati program koji određuje te brojeve za dati raspored bombi.

## Ulaz

U prvom redu nalaze se dva broja: $m$ i $n$, dimenzije polja.
U narednih $m$ redova nalazi se po $n$ brojeva, koji su ili 1 (bomba postoji) ili 0 (bomba ne postoji).

## Izlaz

Matrica dimenzija $m \times n$, gde svako polje predstavlja broj bombi koje ga okružuju.

## Primer

```Input
3 4
0 1 0 1
1 0 1 0
0 1 0 0
```

```Output
2 2 3 1
2 4 3 2
2 2 2 1
```

## Ograničenja

$3 \le m, n \le 100$