>U ovoj lekciji naučićemo šta su funkcije i kako da pišemo sopstvene.

### Već znate jednu funkciju

Od prvoe lekcije pišete jednu: `main`. **Funkcija** je imenovani blok koda - ime je način na koji je pokrećemo (**pozivamo**), a blok između `{}` je ono što se izvršava. `main` je samo funkcija koju računar poziva za nas automatski.

Možemo definisati sopstvene funkcije, i pozivati ih kad god želimo, koliko god puta želimo.

### Zašto?

Dva razloga:

- **Bez ponavljanja koda** - ako se istih 5 linija pojavljuje na 3 mesta, treba da budu jedna funkcija pozvana 3 puta
- **Čitljivost** - `max3(a, b, c)` govori šta radi; 6 linija ugnježdenih if naredbi mora da se dešifruje

### Anatomija funkcije

Funkcija se piše baš kao `main`:

~!
```c++
int add(int a, int b){

	return a + b;
}
```

Deo po deo:

- `int` - **povratni tip**: koju vrstu vrednosti funkcija vraća kada završi (ista ideja kao tipovi podataka)
- `add` - **ime**, biramo ga kao i ime promenljive
- `(int a, int b)` - **parametri**: vrednosti koje funkcija prima pri pozivu. Ovde prima dva cela broja i naziva ih `a` i `b`
- `return a + b;` - izračunava rezultat i **vraća ga onome ko je funkciju pozvao**

Poziv izgleda ovako: `add(2, 3)` - vrednost 2 postaje `a`, vrednost 3 postaje `b`, a ceo izraz `add(2, 3)` postaje 5. Evo kompletnog programa koji je koristi:

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int add(int a, int b){ // naša sopstvena funkcija

	return a + b;
}

int main(){

	cin.tie(0);
	ios_base::sync_with_stdio(false);

	int x, y;
	cin >> x >> y;

	cout << add(x, y); // pozivamo funkciju i ispisujemo šta vraća

	return 0;
}
```
Input: `2 3`
Output: `5`

> Primetite da je funkcija napisana **iznad** `main`-a. Ovo je važno: c++ čita fajl od vrha ka dnu, pa funkcija mora biti definisana pre mesta gde se poziva - inače kompajler još ne zna da ona postoji.

### Funkcije koje ne vraćaju ništa

Ponekad funkcija treba samo da uradi nešto (obično da štampa), i ne postoji vrednost koju bi vratila. Za to, povratni tip je `void`:

~!
```c++
void greet(string name){

	cout << "Zdravo, " << name << "!" << '\n'; // '\n' je karakter za novi red, kao pritisak entera
}
```

Pozivamo je kao samostalnu naredbu - `greet("Joca");` - i pošto nema vrednosti, nije potreban `return`.

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

void greet(string name){

	cout << "Zdravo, " << name << "!" << '\n';
}

int main(){

	cin.tie(0);
	ios_base::sync_with_stdio(false);

	greet("Ana");
	greet("Marko");
	greet("Jovana");

	return 0;
}
```
Output:
`Zdravo, Ana!`
`Zdravo, Marko!`
`Zdravo, Jovana!`
### Dve stvari koje treba zapamtiti

1. **Parametri su kopije.** Funkcija dobija sopstvenu kopiju svake prosleđene vrednosti - menjanje `a` unutar `add` ne dira promenljivu korišćenu u pozivu. (Postoji način da se promeni original, ali doći ćemo do toga kasnije.)

2. **return odmah završava funkciju.** Onog trenutka kada se `return` izvrši, funkcija je gotova - sav kod ispod se preskače. Ovo se često koristi za rani izlazak:

~!
```c++
string sign(int x){

	if(x > 0) return "pozitivan"; // ako se ovo izvrši, funkcija je gotova
	if(x < 0) return "negativan";
	
	return "nula"; // ovde stižemo samo ako je x tačno 0
}
```
