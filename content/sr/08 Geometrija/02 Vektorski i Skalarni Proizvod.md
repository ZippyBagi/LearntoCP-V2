>U ovoj lekciji učimo kako da množimo vektore - i zašto je to zaista korisno

### Skalarni proizvod

Skalarni proizvod je prvi način na koji možemo da pomnožimo vektore. Piše se kao $\vec{A} \cdot \vec{B}$

Računa se ovako:  $$\vec{A} \cdot \vec{B} = \vec{A}_x * \vec{B}_x + \vec{A}_y * \vec{B}_y$$
Koristan je zato što nam govori da li su dva vektora **normalna jedan na drugi**.

#### Normalni vektori

Normalni vektori su vektori koji zaklapaju **ugao od 90°**

Ako je skalarni proizvod 2 vektora `0`, onda su oni normalni jedan na drugi.

	![[dot-product-normal.png|Tri mreže sa vektorima A i B pod oštrim, pravim i tupim uglom, gde je skalarni proizvod redom 9, tačno nula, i minus 8]]

#### Implementacija
Pretpostavimo da su svi vektori implementirani ovako: 
~!
```c++
struct v{
	long long x;
	long long y;
};
```

Skalarni proizvod je:
~!
```c++
int dot_product(v a, v b){
    return (a.x * b.x) + (a.y * b.y);
}
```

### Vektorski proizvod

Drugi, i korisniji način množenja je vektorski proizvod.

Pomoću njega možemo da izračunamo da li je poligon konveksan ili nije, da li su dva vektora paralelna, da li se dva vektora seku, i tako dalje..

Vektorski proizvod za dva 2D vektora svodi se na računanje determinante njihovih koordinata. Piše se kao $A \times B$

Što znači:

$$\vec{A} \times \vec{B} = \vec{A}_x * \vec{B}_y - \vec{A}_y * \vec{B}_x$$
Znak vektorskog proizvoda nam govori gde se dva vektora nalaze jedan u odnosu na drugi.

#### Čitanje vektorskog proizvoda

Zamisli da vektori seku krug.

Kada izračunamo vektorski proizvod $\vec{A} \times \vec{B}$, ako je proizvod **pozitivan**, onda se po krugu, da bismo stigli od $\vec{A}$ do $\vec{B}$, krećemo suprotno od kazaljke na satu.

Ako je proizvod **negativan**, da bismo stigli od $\vec{A}$ do $\vec{B}$, krećemo se u smeru kazaljke na satu.

Ako je proizvod `0`, onda su $\vec{A}$ i $\vec{B}$ **paralelni**!

	![[cross-product-circle.png|Tri mreže sa vektorima A i B na krugu, gde je vektorski proizvod 10 za skretanje suprotno smeru kazaljke, minus 7 za skretanje u smeru kazaljke, i nula kada su vektori paralelni]]

#### Površina trougla

Znak nije jedino što nam vektorski proizvod daje. Korisna je i sama njegova vrednost.

Uzmi $\vec{AB}$ i $\vec{AC}$, dva vektora koja polaze iz iste tačke `A`, i dopuni ih do paralelograma. Apsolutna vrednost vektorskog proizvoda je tačno površina tog paralelograma.

Taj paralelogram su dva ista trougla `ABC`, pa površinu prepolovimo:

$$P_{ABC} = \frac{|\vec{AB} \times \vec{AC}|}{2}$$

Proverimo to na trouglu čiju površinu znamo i bez ovoga. Neka je `A = (0, 0)`, `B = (4, 0)` i `C = (0, 3)`:

- $\vec{AB} = (4, 0)$ i $\vec{AC} = (0, 3)$
- $\vec{AB} \times \vec{AC} = 4 \cdot 3 - 0 \cdot 0 = 12$
- pa je površina `12 / 2 = 6`

A to je pravougli trougao sa katetama `4` i `3`, čiju površinu već znamo: $\frac{4 \cdot 3}{2} = 6$.

Primeti da nam vektorski proizvod daje **dvostruku** površinu, a ta dvostruka vrednost je uvek ceo broj. Zato površine možemo da računamo tačno u tipu `long long` i da delimo sa 2 tek na samom kraju - trik koji ćemo u narednim lekcijama stalno koristiti.

>Napomena:
>Bez apsolutne vrednosti površina ima **znak**, baš kao i ranije: pozitivna je kada je `C` levo od `AB`, a negativna kada je desno. Jedan broj, dva odgovora.

#### Implementacija

```c++
int cross_product(v a, v b){

    return (a.x * b.y) - (a.y * b.x);
}
```
