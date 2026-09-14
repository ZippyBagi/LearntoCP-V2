> U prethodnoj lekciji smo napravili šablon od kog počinje svako rešenje. Sada popunjavamo sredinu: kako da **čuvamo vrednosti** i kako da **učitavamo unos i ispisujemo izlaz**.

Podsetnik, ovde smo stali:

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

	// naša logika ide ovde

	return 0;
}
```

### Promenljive

Pre nego što program može bilo šta da izračuna, potrebno mu je mesto gde će čuvati vrednosti. To je **promenljiva** - kutija sa imenom koja drži jednu vrednost:

~!
```c++
int main(){

	int a = 13; // kutija sa imenom "a" koja drži ceo broj 13

	return 0;
}
```

Čitajući sleva nadesno: `int` govori koju vrstu vrednosti kutija drži (ceo broj), `a` je ime koje smo izabrali, a `= 13` stavlja vrednost 13 unutra. Možemo i prvo napraviti kutiju pa je napuniti kasnije:

~!
```c++
int main(){

	int a;  // pravimo kutiju (za sada drži nasumičnu vrednost)
	a = 13; // stavljamo 13 unutra

	return 0;
}
```

### Tipovi podataka

`int` iznad je **tip podataka** - govori C++-u koju vrstu vrednosti promenljiva čuva. Ovo su osnovni tipovi koje treba da znate:

- **int** - za standardne cele brojeve (32 bit, otprilike do ±2 milijarde)
- **long long** - za velike cele brojeve (64 bit) - biće često potrebno u takmičarskom programiranju
- **char** - za jedan karakter (na primer `'a'`)
- **string** - za tekst (na primer `"zdravo"`)
- **double** - za decimalne brojeve (videćete i **float**, ali je `double` precizniji i njega treba koristiti)
- **bool** - za boolean vrednosti (mogu biti ili `true` ili `false`)

Naravno, postoji još mnogo tipova sa specifičnim svrhama, ali doći ćemo do njih kasnije. Za sada: celi brojevi idu u `int`, veliki celi brojevi u `long long`, tekst u `string`.

### Unos/Izlaz

> Kada rešavate problem, većinu vremena će postojati oznaka **"Standard Input/Output"** ili **"Standard I/O"** unutar problema. Ovo znači da program uzima informacije iz konzole i ispisuje odgovor nazad u konzolu.

#### Učitavanje pomoću cin

Za unos pišemo `cin >> a`:
- `cin >>` znači da želimo da pročitamo nešto iz konzole
- `a` je promenljiva u koju se vrednost smešta

Primetite da strelice pokazuju u smeru u kom podaci putuju: **iz** `cin`, **u** `a`.

~!
```c++
int main(){

	int a;    // prvo pravimo promenljivu
	cin >> a; // zatim čitamo vrednost iz konzole u nju

	return 0;
}
```

Možemo učitati i više vrednosti odjednom: `cin >> a >> b;` - ovo čita prvi broj u `a`, a drugi u `b`.

#### Ispisivanje pomoću cout

Za izlaz pišemo `cout << a` - ovo ispisuje **vrednost** koja se nalazi u `a`. Možemo i da nadovezujemo tekst i vrednosti dodatnim `<<` strelicama:

~!
```c++
int main(){

	int a = 13;

	cout << "Vrednost a je: " << a << "!";

	return 0;
}
```
Output: `Vrednost a je: 13!`

#### Sve zajedno

Evo kompletnog programa koji učita broj i vrati ga nazad:

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

	int a;
	cin >> a;

	cout << "Vrednost a je: " << a << "!";

	return 0;
}
```
Input: `92`
Output: `Vrednost a je: 92!`
### Ubrzavanje cin/cout

Vredi znati da `cin` i `cout` podrazumevano mogu biti **spori**. Za probleme koje ćete rešavati na početku ovo ne pravi apsolutno nikakvu razliku, ali kod problema sa ogromnim unosom tačno rešenje može pasti samo zato što mu je unos/izlaz bio prespor.

Rešenje je da dodamo ove dve linije na početak `main` funkcije:
	`cin.tie(0);`
	`ios_base::sync_with_stdio(false);`

Tako da rešenje "pune brzine" izgleda ovako:

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

	cin.tie(0);
	ios_base::sync_with_stdio(false);

	int a;
	cin >> a;

	cout << "Vrednost a je: " << a << "!";

	return 0;
}
```

> Ove dve linije mogu izgledati zbunjujuće i još ne morate razumeti kako rade - ali **neka vam pisanje njih postane navika**. Počnite svako rešenje koje koristi `cin` i `cout` sa njima, i spor unos/izlaz jednostavno nikada neće biti razlog zašto rešenje pada. Upravo zato ćete ih viđati u većini lekcija na ovom sajtu.

Saznajte više o njima ovde: [https://stackoverflow.com/questions/31162367/significance-of-ios-basesync-with-stdiofalse-cin-tienull](https://stackoverflow.com/questions/31162367/significance-of-ios-basesync-with-stdiofalse-cin-tienull)

### scanf() i printf()

> `cin`/`cout` sa one dve linije za ubrzanje je sve što vam treba - ovaj stariji stil je ovde uglavnom da biste ga **prepoznali u tuđem kodu**, gde ćete na njega stalno nailaziti.

Pre `cin` i `cout`, C++ je nasledio par funkcija iz programskog jezika C: `scanf()` za unos i `printf()` za izlaz.

Za unos koristimo `scanf("%d", &a)`:
- `scanf()` poziva funkciju za unos
- `%d` znači da želimo da pročitamo **ceo broj** (svaki tip podataka ima svoj kod)
- `&a` znači da vrednost treba da se smesti **u a**

~!
```c++
int main(){

	int a;
	scanf("%d", &a);

	return 0;
}
```

Za izlaz je veoma slično - `printf("%d", a)`, i možemo staviti tekst oko `%d`:

~!
```c++
int main(){

	int a = 13;

	printf("Vrednost a je %d!", a);

	return 0;
}
```
Output: `Vrednost a je 13!`

(Primetite da pri ispisivanju prosleđujemo **`a`** a **NE `&a`**.)

Evo kodova za najčešće tipove podataka:
- **int** - `%d`
- **long long** - `%lld`
- **char** - `%c`
- **string** - `%s`
- **double** - `%lf`
