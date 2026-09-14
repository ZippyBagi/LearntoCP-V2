> U ovoj lekciji naučićemo kako se brojevi zapravo čuvaju unutar programskih jezika!

### Brojevi u c++-u

U c++-u, ako imamo ceo broj poput `int a = 178`, on se u memoriji čuva kao binarni broj, odnosno: `1011 0010`, Međutim, postoji još jedna važna stvar koju treba uzeti u obzir!

Ovaj broj se zapravo čuva ovako: `0000 0000 0000 0000 0000 0000 1011 0010`

To je jer je `int` **32-bitni** tip podataka.
To znači da će svaki broj tipa `int` uvek biti predstavljen pomoću tačno **32 bita**, pri čemu svaki bit može imati vrednost `0` ili `1`.

Pošto prvi bit određuje znak broja (+ ili -), a moramo da ostavimo prostor i za broj 0, najveći broj koji možemo da sačuvamo je: **2^31 - 1 = 2147483647**

### Šta se dešava kada broj ne može da stane u 32 bita?

Šta će se dogoditi ako pokušamo da sačuvamo broj koji je veći od maksimalne vrednosti tipa `int`?

Na primer, broj: `2^31 = 2147483648`

Pogledajmo sledeći primer:

~!
```c++
int main(){

	int a = 2147483647;

	int b = a + 1;

	cout<<a<<'\n';
	cout<<b;
}
```

Output:
`2147483647`  
`-2147483648`

Minus ovde nije greška! Evo šta se zapravo dogodilo:

Imali smo: `a = 0111 1111 1111 1111 1111 1111 1111 1111`

Kada na njega dodamo `1`, dobijamo: `b = 1000 0000 0000 0000 0000 0000 0000 0000`

Pošto prvi bit predstavlja znak broja, ova binarna reprezentacija odgovara broju: `-2147483648`

Drugim rečima, naši brojevi su napravili puni krug!

`a` je bio **najveći pozitivan broj** koji možemo da sačuvamo u tipu `int`, a `b` je postao **najmanji negativan broj** koji taj tip može da predstavi.

> Ova pojava naziva se **integer overflow** i treba je izbegavati kad god je to moguće!

#### Kako čuvati brojeve veće od 2^31?

Ako želimo da radimo sa većim brojevima (što je veoma često u takmičarskom programiranju), potrebno je da koristimo veći celobrojni tip podataka - `long long`.

`long long` je **64-bitni** tip podataka.

Zbog toga, najveći broj koji možemo da sačuvamo iznosi: **2^63 - 1**

> Napomena:
> Pošto `long long` zauzima duplo više memorije od `int` tipa, trebalo bi ga koristiti samo kada je zaista potreban.

U praksi, `long long` je uglavnom dovoljan.

Međutim, ako nam zatrebaju još veći brojevi, moraćemo da ih čuvamo kao `string` vrednosti i sami implementiramo operacije nad njima (više o tome u nekoj od narednih lekcija).