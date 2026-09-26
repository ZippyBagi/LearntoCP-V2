Za dva data stringa odredi dužinu njihovog najdužeg zajedničkog podniza.

**Podniz** je niz karaktera koji se dobija brisanjem nula ili više karaktera iz stringa, bez menjanja redosleda preostalih karaktera (karakteri ne moraju biti jedan pored drugog). **Zajednički podniz** dva stringa je podniz koji se pojavljuje u oba.

## Ulaz

U prvom redu nalazi se string $s_1$.
U drugom redu nalazi se string $s_2$.

## Izlaz

Jedan broj - dužina najdužeg zajedničkog podniza stringova $s_1$ i $s_2$.

## Primer

```Input
abcde
ace
```

```Output
3
```

Najduži zajednički podniz je `ace`, dužine 3.

## Ograničenja

$1 \le |s_1|, |s_2| \le 1000$

Oba stringa se sastoje od malih slova engleske abecede.
