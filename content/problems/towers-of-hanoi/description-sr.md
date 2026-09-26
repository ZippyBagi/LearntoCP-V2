Data su tri štapa, označena brojevima $1$, $2$ i $3$. Na prvom se nalazi $n$ diskova različitih veličina, poređanih po veličini: disk veličine $n$ je na dnu, na njemu je disk veličine $n-1$, i tako redom sve do diska veličine $1$ na samom vrhu. Preostala dva štapa su prazna.

Tvoj zadatak je da ceo toranj premestiš sa štapa $1$ na štap $3$ uz što **manje premeštanja**. Postoje dva pravila:

- jedno premeštanje uzima **najgornji** disk sa nekog štapa i stavlja ga na vrh drugog štapa;
- disk se nikada ne sme staviti na **manji** disk.

Napiši program koji ispisuje premeštanja.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U svakoj od sledećih $t$ linija je po jedan ceo broj $n$ - broj diskova na prvom štapu.

## Izlaz

Za svaki test primer ispiši po jednu liniju za svako premeštanje: redni broj štapa sa čijeg se vrha disk uzima i redni broj štapa na čiji se vrh stavlja, razdvojene jednim razmakom. Premeštanja test primera se nižu jedno za drugim, bez ičega između.

## Primer

```Input
2
3
2
```

```Output
1 3
1 2
3 2
1 3
2 1
2 3
1 3
1 2
1 3
2 3
```

Prvih sedam linija rešava $n = 3$: najmanji disk ide na štap $3$, srednji na štap $2$, pa mu se najmanji pridružuje, čime se oslobađa najveći disk da pređe na štap $3$ - a dva diska koja čekaju na štapu $2$ ga prate u još tri poteza. Poslednje tri linije rešavaju $n = 2$.

## Ograničenja

$1 \le t \le 8$
$1 \le n \le 16$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Hanojske kule](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/hanojske_kule), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
