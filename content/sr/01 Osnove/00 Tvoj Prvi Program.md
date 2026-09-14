> Ova lekcija pretpostavlja da **nikada niste napisali ni jednu liniju C++ koda**.

### Šta mi ovde uopšte radimo?

U takmičarskom programiranju, svaki zadatak prati isti obrazac:

1. Program **učitava** neki unos (obično brojeve ili tekst)
2. **Izračunava** nešto
3. **Ispisuje** rezultat

Programi su kratki, tako da nam ne treba većina stvari koje "pravi" razvoj softvera podrazumeva. Potreban nam je samo mali skup alata, a ova lekcija uvodi one prve.

### Najmanji mogući program

Svakom C++ programu je potrebna početna tačka - mesto odakle računar počinje da izvršava kod. Ta početna tačka je funkcija koja se zove `main`:

~!
```c++
int main(){

}
```

Ovo je ceo jedan program. Trenutno ne radi ništa, ali se sastoji iz: 

- `main` - ime funkcije. Računar uvek traži funkciju sa tačno ovim imenom i tu počinje.
- `(){}` - zagrade i vitičaste zagrade. Sve **između vitičastih zagrada `{}`** je kod koji će se izvršiti.
- `int` - ovo govori da će `main` vratiti (**return**) ceo broj kada završi. Po konvenciji, taj broj govori operativnom sistemu kako se program završio.

### return 0

Pošto smo obećali da `main` vraća ceo broj, dobra je praksa da ga zaista i vratimo. Vraćanje `0` znači "sve je prošlo u redu":

~!
```c++
int main(){

	return 0;
}
```

> `return 0` je veoma važan u takmičarskom programiranju: **neki online judge sistemi će odbiti vaše rešenje bez njega, čak i ako je tačno**. Neka vam postane navika da ga uvek pišete kao poslednju liniju `main` funkcije.

### Ispisivanje

Prazan program je dosadan, hajde da ga nateramo da nas pozdravi. Za ispisivanje teksta koristimo `cout`.

~!
```c++
cout << "Zdravo!";
```

Strelice `<<` pokazuju ka `cout`-tu - to se može zamisliti kao "pošalji `"Zdravo!"` na izlaz konzole".

Ali postoji jedna caka: `cout` ne postoji sam od sebe. On živi unutar **standardne biblioteke** - velike kolekcije gotovih alata koja dolazi uz C++. Da bismo ga koristili, moramo dodati dve linije **iznad** naše `main` funkcije:

- `#include <bits/stdc++.h>` - ovo **uključuje** standardnu biblioteku u naš program.
- `using namespace std;` - Svaka funkcija u standardnoj biblioteci nosi oznaku `std` (standard) i normalno bi se pozivali kao `std::cout`. Ova linija nam dozvoljava da izostavimo oznaku i pišemo samo `cout`.

Kada sve to spojimo, dobijamo naš prvi pravi program:

Solution.cpp
```c++
#include <bits/stdc++.h> // uključujemo standardnu biblioteku

using namespace std; // omogućava nam da pišemo cout umesto std::cout

int main(){

	cout << "Zdravo!"; // ispisujemo Zdravo! u konzolu

	return 0; // govorimo judge sistemu da je sve prošlo u redu
}
```
Output: `Zdravo!`

### Ovo je šablon

Ovih nekoliko linija je kostur svakog rešenja koje ćete ikada poslati:

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

	// logika ide ovde

	return 0;
}
```

> Ne brinite ako vam `#include` i `namespace` i dalje deluju pomalo kao magične reči. Za sada je potpuno u redu da ih tretirate kao "one dve linije na vrhu" - detalji iza njih će imati više smisla kako budete pisali više programa.
