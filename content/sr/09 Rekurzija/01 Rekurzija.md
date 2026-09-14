>U ovoj lekciji naučićemo način rešavanja problema koji se oslanja na ponavljanje iste operacije više puta.

Zamisli da neko od nas traži da sazidamo zid dug 100 cigli.

Umesto da ga zidamo sami do kraja, reći ćemo: "Ja ću postaviti prvu ciglu, a neko drugi neka odradi preostalih 99".

Sada zamisli da svi ostali urade istu stvar: "Ja ću postaviti ciglu 2, a neko drugi neka odradi preostalih 98... 97... 96..."

Ovo se ponavlja sve dok poslednji čovek ne postavi ciglu 100.

Upravo u tome je poenta rekurzije - ponavljamo ista uputstva i prosleđujemo posao dalje!

U kodu rekurziju definišemo kao:

>Funkciju koja poziva samu sebe.

Na primer:

~!
```c++
void rekurzija(){
	cout<<"rekurzija ";
	rekurzija();
}
```
Output:
`rekurzija rekurzija rekurzija rekurzija rekurzija rekurzija rekurzija rekurzija...`

Kao što vidimo, napravili smo beskonačnu petlju (ili barem beskonačnu dok se program ne sruši).

Zbog toga rekurzivna funkcija uvek mora da ima **izlazni slučaj (bazni slučaj)!**

U našem primeru to možemo uraditi ovako:

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

void rekurzija(int n){

	if(n == 0){ //ovo je naš bazni slučaj
		return;
	}

	cout<<"rekurzija ";
	rekurzija(n - 1);
}

int main(){
	rekurzija(3);
}
```
Output:
`rekurzija rekurzija rekurzija`

### Prosleđivanje promenljivih

Rekurzija je samo funkcija, pa promenljive prosleđujemo isto kao i kod bilo koje druge funkcije.

>Jednu stvar treba imati na umu: kada prosleđujemo vektore, ili bilo koju drugu strukturu podataka, uvek ih prosleđujemo po referenci `vector<int>& a`

### Vraćanje vrednosti

U praksi je korišćenje rekurzije za ponavljanje ispisa nepraktično. Mnogo češći slučaj je sakupljanje vrednosti.

Recimo da želimo da izračunamo `6!` (proizvod brojeva od 1 do 6).

Da bismo dobili `6!`, potrebno nam je `6 * 5!`, a da bismo dobili to, potrebno nam je `5 * 4!` - tu na scenu stupa rekurzija.

Zatim definišimo bazni slučaj: `1!` je uvek samo `1`, i to je naš bazni slučaj.

Factorial.cpp
```c++
long long faktorijel(int n){

    if(n == 1){
        return 1;
    }

    return n * faktorijel(n-1);
}
```

Primeti da se ovo razlikuje od prvog primera - tamo smo ispisivali **pre** rekurzivnog poziva, pa se izlaz dešavao **od vrha ka dnu**. Ovde množimo tek nakon što se rekurzivni poziv vrati, pa se pravi posao dešava **od dna ka vrhu**, onda kada stignemo do baznog slučaja i krenemo da se vraćamo unazad.

	![[recursion-unwinding.png|Faktorijel broja 6 u dve kolone: pozivi se spuštaju od 6! do 1! sa leve strane, a vraćene vrednosti se penju nazad od 1 do 720 sa desne, uz množenje na svakom koraku nagore]]

### Stek pozivi

Još jedna stvar koju moramo da razumemo jeste redosled poziva funkcija kada radimo sa rekurzijom!

Svaki poziv funkcije posmatraj kao ubacivanje na stek (**LIFO**, poslednji ušao - prvi izlazi).

	![[recursion-call-stack.png|Stek poziva za f(3) raste dok se pozivi dodaju sve do baznog slučaja f(0), pa se ponovo smanjuje kako se svaki poziv vraća]]

>Isto kao što stek ne može da čuva beskonačno mnogo elemenata, tako ni naš program ne može da izdrži beskonačno mnogo poziva funkcija!

To je ono što se zove `stack overflow` - i ruši nam program kada imamo previše poziva funkcija (zapravo puca kada ostanemo bez stek memorije u programu, a ta memorija se popunjava svaki put kada pozovemo funkciju).

>Na kraju krajeva, rekurzija je potpuno opciona, i svaki rekurzivni algoritam može da se reši i iterativno. Sve je stvar toga šta je jednostavnije napisati! Nagodba koju pravimo jeste malo brzine i memorijske efikasnosti za mnogo čistiji kod i jednostavnije rešenje!
