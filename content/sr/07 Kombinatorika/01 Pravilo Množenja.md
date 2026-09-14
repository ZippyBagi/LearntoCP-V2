> U prošloj lekciji brojali smo izbore koji se međusobno isključuju - osoba je birala jedan deo grada, pa smo sabirali. Sada gledamo suprotnu situaciju: izbore koji se oba dešavaju, jedan za drugim.

Ova lekcija se bavi pravilom množenja.

Ono kaže:

> Ako se prvi zadatak može uraditi na `m` načina, i ako za svaki od tih načina drugi zadatak može da se uradi na `n` načina, onda postoji `m * n` načina da uradimo oba zadatka.

### Primer

Restoran nudi dnevni meni: biraš jedno glavno jelo i jedan desert. Glavnih jela ima 4, a deserata 3. Koliko različitih ručkova možeš da naručiš?

Hajde da sve moguće ručkove upišemo u tabelu. Svaki red je jedno glavno jelo, a svaka kolona jedan desert:

|                | Torta            | Sladoled            | Voće            |
| -------------- | ---------------- | ------------------- | --------------- |
| **Pasta**      | Pasta+Torta      | Pasta+Sladoled      | Pasta+Voće      |
| **Biftek**     | Biftek+Torta     | Biftek+Sladoled     | Biftek+Voće     |
| **Salata**     | Salata+Torta     | Salata+Sladoled     | Salata+Voće     |
| **Supa**       | Supa+Torta       | Supa+Sladoled       | Supa+Voće       |

Svaki ručak koji možeš da naručiš pojavljuje se u ovoj tabeli tačno jednom. Tabela ima 4 reda i 3 kolone, dakle $4 * 3 = 12$ polja, što znači da postoji 12 različitih ručkova.

Do istog broja možemo da dođemo i pomoću prošle lekcije. Pogledaj tabelu red po red. Ako naručiš pastu, možeš da završiš sa 3 različita ručka. Isto važi i za biftek, salatu i supu. Te četiri grupe se ne preklapaju, pa je po pravilu sabiranja ukupan broj

$$3 + 3 + 3 + 3 = 12$$

A to je tačno ono što $4 * 3$ i znači. Pravilo množenja je zapravo pravilo sabiranja primenjeno na `m` jednako velikih grupa.

### Kada pravilo važi

Pogledaj ponovo formulaciju: za **svaki** od `m` načina, drugi zadatak ima `n` načina. U tabeli to znači da svaki red mora da bude jednako dugačak. Kada bi neki red bio kraći, tabela bi imala rupe, pa bi računanje polja kao `redovi * kolone` dalo previše.

Recimo da restoran odbija da služi tortu uz biftek. Tada red sa biftekom ima samo 2 ručka umesto 3, ukupno ih je $3 + 2 + 3 + 3 = 11$, i $4 * 3$ je prosto pogrešan odgovor.

Primeti da redovi ne moraju da sadrže iste mogućnosti, već samo isti **broj** mogućnosti. Kada bi uz biftek išao potpuno drugačiji spisak deserata, ali i dalje sa 3 stavke, $4 * 3 = 12$ bi ostalo tačno.

### Više od dva izbora

Restoran sada u meni dodaje i piće - 2 mogućnosti. Koliko sada ima ručkova?

Već znamo da ima 12 parova glavnog jela i deserta, a svaki od njih možemo da spojimo sa bilo kojim od 2 pića. Znači primenjujemo isto pravilo još jednom, sada na 12 i 2:

$$12 * 2 = (4 * 3) * 2 = 24$$

Ništa nas ne sprečava da ovo ponavljamo. Ako se izbor sastoji od `k` koraka, i korak `i` može da se uradi na `n_i` načina bez obzira na prethodne korake, broj ishoda je

$$n_1 * n_2 * ... * n_k$$

### U takmičarskom programiranju

Zadaci sa prebrojavanjem retko govore o ručkovima, ali je oblik razmišljanja isti. Trik je u tome da u zadatku prepoznaš niz praznih mesta koja treba popuniti.

**Koliko stringova dužine 4 možemo da napravimo od slova `a`, `b`, `c`?**

String dužine 4 su 4 mesta koja treba popuniti. Za prvo mesto imamo 3 mogućnosti. Šta god da tu upišemo, drugo mesto i dalje ima sve 3 mogućnosti, a isto važi i za treće i za četvrto. Četiri koraka, po 3 načina:

$$3 * 3 * 3 * 3 = 3^4 = 81$$

**Koliko ima lozinki dužine 6, ako prvi karakter mora da bude slovo, a ostali smeju da budu slovo ili cifra?**

Mesta ne moraju sva da izgledaju isto. Prvo ima 26 mogućnosti, a svako od preostalih pet ima $26 + 10 = 36$ mogućnosti. Opet šest koraka, samo sa različitim brojevima:

$$26 * 36 * 36 * 36 * 36 * 36 = 26 * 36^5$$

Kada prođeš kroz ovakve primere, opšte pravilo je lako izreći:

> Kada ishod gradimo tako što donosimo nekoliko odluka zaredom, i nijedna odluka ne menja koliko mogućnosti imaju one kasnije, prebrojimo mogućnosti za svaku odluku posebno i pomnožimo ih.

### Oznaka za proizvod

Kao što zbir ima svoju skraćenu oznaku, ima je i proizvod.

Kada imamo

$$x_1 * x_2 * x_3 * x_4 * ... * x_n$$

to možemo zapisati kao:

$$\prod_{i=1}^{n} x_i$$

Čita se potpuno isto kao oznaka za zbir, samo se članovi množe umesto da se sabiraju.

$$x_1 * x_2 * x_3 * x_4 * ... * x_n = \prod_{i=1}^{n} x_i$$

Kao petlja:

~!
```cpp
long long proizvod = 1;
for (int i = 1; i <= n; i++) {
    proizvod *= x[i];
}
```

Jedna stvar koju vredi zapamtiti: proizvodi rastu mnogo brže od zbirova. Zbir `n` brojeva do `10^9` bez problema staje u `long long`, ali proizvod svega nekoliko takvih brojeva ne staje. Zbog toga se u zadacima sa prebrojavanjem odgovor tako često traži po modulu nekog broja.
