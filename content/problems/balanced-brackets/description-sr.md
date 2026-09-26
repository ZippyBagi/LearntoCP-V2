Svaki editor za kod ume trenutno da ti kaže da li se zagrade u programu poklapaju. Večeras si ti editor.

Dat je string sastavljen od karaktera `(` i `)`. Proveri da li su zagrade **balansirane** - svaku otvorenu zagradu zatvara tačno jedna zatvarajuća zagrada koja dolazi posle nje, i svaka zatvarajuća zagrada zatvara tačno jednu otvorenu zagradu pre nje.

Na primer, `(()())` je balansirano, dok `(()` nije (jedna zagrada nikada nije zatvorena), a `)(` nije (zatvarajuća se pojavila pre bilo koje otvorene).

## Ulaz

U prvom redu nalazi se jedan string $s$, sastavljen samo od karaktera `(` i `)`.

## Izlaz

Ispiši `YES` ako su zagrade balansirane, a `NO` u suprotnom.

## Primer

```Input
(()())
```

```Output
YES
```

Prvu zagradu zatvara poslednja, a dva para unutra zatvaraju jedan drugi.

## Ograničenja

$1 \le |s| \le 10^6$
