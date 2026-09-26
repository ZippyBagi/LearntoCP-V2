Lopov planira da pljačka kuće duž jedne ulice. U svakoj kući nalazi se određena količina novca. Jedino što ga sprečava da opljačka sve kuće jeste to što su njihovi sigurnosni sistemi povezani: ako se iste noći opljačkaju dve **susedne** kuće, alarm će se automatski uključiti.

Napiši program koji određuje najveću količinu novca koju lopov može da ukrade a da ne aktivira alarm. Formalno, odredi najveći zbir podniza datog niza koji ne sadrži dva susedna elementa.

## Ulaz

U prvom redu nalazi se jedan broj $n$, broj kuća.
U narednom redu nalazi se $n$ brojeva $a_1, a_2, \dots, a_n$, količina novca u svakoj kući.

## Izlaz

Jedan broj - najveća količina novca koja može da se ukrade.

## Primer

```Input
5
2 7 9 3 1
```

```Output
12
```

Lopov pljačka kuće sa $2$, $9$ i $1$ ($2 + 9 + 1 = 12$). Nikoje dve od njih nisu susedne.

## Ograničenja

$1 \le n \le 2 \cdot 10^5$
$0 \le a_i \le 10^9$
