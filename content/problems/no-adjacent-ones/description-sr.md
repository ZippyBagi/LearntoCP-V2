Hodnik hotela ima $n$ soba u nizu. Svaka soba je ili prazna ili zauzeta, a menadžer ima jedno pravilo: dve zauzete sobe nikada ne smeju biti jedna do druge.

Upiši $0$ za praznu sobu i $1$ za zauzetu, i svaki dozvoljeni raspored hodnika postaje niz od $n$ cifara u kome nikoje dve jedinice ne stoje jedna pored druge.

Ispiši sve takve nizove.

Rasporedi moraju izaći u rastućem redosledu, ako svaki niz čitamo kao broj - dakle skroz prazan hodnik je prvi, a raspored sa zauzetim sobama najviše ka početku je poslednji.

## Ulaz

U jedinom redu ulaza nalazi se ceo broj $n$ - broj soba.

## Izlaz

Ispiši svaki dozvoljeni raspored u zasebnom redu, kao $n$ cifara razdvojenih jednim razmakom, u redosledu opisanom iznad.

## Primer

```Input
4
```

```Output
0 0 0 0
0 0 0 1
0 0 1 0
0 1 0 0
0 1 0 1
1 0 0 0
1 0 0 1
1 0 1 0
```

Za $n = 4$ postoji osam rasporeda. Nizovi poput `0 1 1 0` i `1 1 0 0` nedostaju jer stavljaju dve zauzete sobe jednu pored druge.

## Ograničenja

$1 \le n \le 20$
