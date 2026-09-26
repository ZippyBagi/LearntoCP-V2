Signal kreće sa jednog računara u mreži i širi se komunikacionim kanalima do svakog drugog računara do kog može da stigne, neposredno ili preko drugih računara. Svaki kanal je **jednosmeran** i signalu treba poznato vreme da ga pređe.

Svaki računar prosleđuje signal dalje čim ga primi, pa do svakog računara signal stiže onim putem kojim najranije može. Mreža je gotova kad signal primi i **poslednji** računar.

Napiši program koji određuje koliko je vremena potrebno da signal stigne do svih računara u mreži.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U prvoj liniji svakog test primera su dva cela broja $n$ i $m$ - broj računara i broj kanala.
U svakoj od sledećih $m$ linija su tri cela broja $u$, $v$ i $w$ - kanal koji vodi **od** računara $u$ **do** računara $v$, a signalu treba $w$ vremena da ga pređe. Taj kanal ne nosi signal od $v$ do $u$.
U poslednjoj liniji test primera je jedan ceo broj $s$ - računar sa kog signal kreće.

Računari su označeni brojevima od $1$ do $n$. Između istog para računara može postojati više kanala, a kanal može voditi i sa računara na samog sebe.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji vreme koje je signalu potrebno da stigne do svih računara, ili $-1$ ako do nekog računara uopšte ne može da stigne.

## Primer

```Input
3
5 7
1 2 7
1 3 3
1 5 6
2 1 2
3 5 2
4 2 3
5 4 1
1
3 1
1 2 5
1
1 1
1 1 4
1
```

```Output
7
-1
0
```

U prvom test primeru signal stiže do računara $3$ za $3$, a do računara $5$ za $5$ - put $1 \rightarrow 3 \rightarrow 5$ je bolji od direktnog kanala, koji košta $6$. Odatle se do računara $4$ stiže za $6$, a do računara $2$ za $7$, direktnim kanalom, jer bi put preko $3, 5, 4$ koštao $9$. Poslednji stiže u trenutku $7$.

U drugom test primeru do računara $3$ ne vodi ništa, pa je rešenje $-1$. U trećem signal kreće sa jedinog računara i već je tu, pa mu ne treba nimalo vremena.

## Ograničenja

$1 \le t \le 10$
$1 \le n \le 1000$
$1 \le m \le 10^5$
$1 \le u, v \le n$ i $1 \le s \le n$
$1 \le w \le 1000$
Zbir $n$ preko svih test primera ne prelazi $5000$, a zbir $m$ ne prelazi $2 \cdot 10^5$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [Kašnjenje signala](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka3/kasnjenje_signala), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
