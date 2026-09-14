> U ovoj grupi lekcija bavićemo se kombinatorikom - naučićemo kako da razmišljamo o zadacima u kojima nešto prebrojavamo, raspoređujemo ili kombinujemo.

Krenućemo od najjednostavnijeg pravila - pravila sabiranja.

Ono kaže:

> Ako se prvi zadatak može uraditi na `m` načina, a drugi na `n` načina, i pri tome se ta dva zadatka ne mogu uraditi istovremeno, onda postoji `m + n` načina da izaberemo jedan od njih.

### Primer

Neko je odlučio da danas ode u kupovinu, i to samo u jedan objekat - ili u severnom ili u južnom delu grada. Ako ode na sever, bira između tržnog centra, prodavnice nameštaja i zlatare (3 mogućnosti). Ako ode na jug, bira između prodavnice odeće i prodavnice obuće (2 mogućnosti). U koliko različitih objekata može da završi?

Pošto ne može da bude na oba mesta u isto vreme, mogućnosti se prosto sabiraju: $3 + 2 = 5$

### Zašto je ovo bitno

Na prvi pogled ovo pravilo deluje očigledno, čak i suvišno. Ipak, ono je temelj skoro svakog zadatka u kome nešto prebrojavamo, i vredi ga imati na umu.

U kontekstu takmičarskog programiranja, o njemu razmišljamo ovako:

> Tražimo broj rešenja nekog zadatka. Podelimo zadatak na slučajeve koji se međusobno ne preklapaju, izbrojimo rešenja za svaki slučaj posebno, i na kraju te brojeve saberemo. (X1 + X2 + X3 + ...)

Ključni uslov je da se slučajevi ne preklapaju. Ako se preklapaju, neka rešenja bismo izbrojali više puta - a kako se to rešava, videćemo u lekciji o principu uključenja i isključenja.

### Oznaka za zbir

Ovo je i dobra prilika da uvedemo **oznaku za zbir**.

Kada u matematici imamo:

$$x_1 + x_2 + x_3 + x_4 + ... + x_n$$

isto to možemo zapisati kao:

$$\sum_{i=1}^{n} x_i$$

Ova dva zapisa znače **potpuno istu stvar** - drugi je samo kraći za pisanje.

$$x_1 + x_2 + x_3 + x_4 + ... + x_n = \sum_{i=1}^{n} x_i$$

Slovo ispod znaka, u ovom slučaju `i`, je brojač. On kreće od vrednosti napisane ispod znaka i ide do vrednosti napisane iznad njega, uključujući i nju. Za svaku vrednost brojača uzimamo izraz koji stoji desno od znaka, i sve te izraze saberemo.

Ako ti je lakše, možeš da ga zamisliš kao `for` petlju:

~!
```cpp
long long zbir = 0;
for (int i = 1; i <= n; i++) {
    zbir += x[i];
}
```
