> U ovoj lekciji fokusiraćemo se na razumevanje vremenske složenosti i kako da razmišljamo o njoj prilikom rešavanja problema.

Jedan od najčešćih problema u takmičarskom programiranju jeste situacija kada imamo potpuno tačno rešenje, ali ono ipak ne prolazi - sa presudom **TLE (Time Limit Exceeded)**.

Ovo se dešava zato što judge sistemi ne proveravaju samo da li je odgovor tačan, već svaki problem ima i **vremenski limit** (obično oko 1 sekunde). Ako vašem rešenju treba više od toga, tačnost ga neće spasiti.

Moderan računar može da izvrši otprilike **10^8 (100 miliona) osnovnih operacija u sekundi**.

> Vremenska složenost opisuje kako vreme izvršavanja algoritma raste u odnosu na veličinu ulaza.

### O( ) notacija

Vremensku složenost zapisujemo pomoću **O( )** notacije (čita se "veliko O") - unutar zagrada stavljamo, otprilike, **kako broj operacija raste** sa veličinom ulaza **n**. Dakle `O(n)` znači "oko n operacija", a `O(n^2)` znači "oko n·n operacija".

Tačne konstante se ignorišu - 2n ili n+10 operacija je i dalje samo `O(n)`. Ovo možda deluje neprecizno, ali je u tome cela poenta: kada je n jednako 1 000 000, razlika između n i 2n je ništa u poređenju sa razlikom između n i n².

Još jedan simbol koji ćete sretati je `log n` - za razliku od matematike, u programiranju `log` označava logaritam sa osnovom `2`, odnosno broj puta koliko možemo prepoloviti **n** pre nego što stignemo do 1.

### Brojanje operacija

Da bismo pronašli vremensku složenost našeg koda treba da posmatramo svaku jednostavnu liniju (dodelu, poređenje, aritmetičku operaciju, učitavanje jedne vrednosti) kao **jednu operaciju**, i brojimo.

Kod bez petlji izvršava fiksnu količinu operacija bez obzira šta mu damo - to je `O(1)`:

~!
```c++
int main(){

	int a, b;
	cin >> a >> b;

	cout << a + b; // par operacija, bili brojevi mali ili ogromni

	return 0;
}
```

**Kod petlji počinje pravo brojanje.** Petlja množi sve unutar sebe brojem svojih ponavljanja. Jedna petlja kroz n elemenata - oko n operacija, `O(n)`:

~!
```c++
for(int i = 0; i < n; i++){

	sum = sum + a[i]; // jedna operacija, izvršena n puta
}
```

A kada su petlje **ugnježdene**, množenje se dešava ponovo - unutrašnja petlja se izvršava cela za svaki korak spoljašnje. Evo kompletnog programa koji broji sopstvene operacije:

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

	cin.tie(0);
	ios_base::sync_with_stdio(false);

	int n;
	cin >> n;

	int sum = 0;
	for(int i = 0; i < n; i++){ // spoljašnja petlja se izvršava n puta
		for(int j = 0; j < n; j++){ // unutrašnja petlja se izvršava n puta za SVAKO i

			sum++; // pa se ova linija izvršava n * n puta
		}
	}

	cout << sum;

	return 0;
}
```
Input: `5`
Output: `25`

Program bukvalno ispisuje n·n - broj puta koliko se najdublja linija izvršila. Ovaj kod je `O(n^2)`.

> Kada procenjujemo složenost, zanimaju nas samo delovi koji se ponavljaju, ne i konstante oko njih. Tako da ako razmatramo samo složenost, program iznad je zapravo samo:

~!
```c++
int main(){
	for(int i = 0; i < n; i++){
		for(int j = 0; j < n; j++){
		}
	}
}
```

U ovim primerima složenost je bila laka za uočiti, ali često neće biti - to je u redu, jer tačan broj operacija **nikada nije neophodan**. Dobra, promišljena procena je uvek dovoljna.

### Uobičajene kategorije

Većina našeg koda upada u jednu od ovih kategorija, od najbrže ka najsporijoj:

- `O(1)` - radi istom brzinom bez obzira na veličinu ulaza
- `O(log n)` - jedva uopšte raste (log od milion je ~20)
- `O(n)` - raste linearno sa veličinom ulaza
- `O(n log n)` - linearno puta "skoro besplatno" - jedva sporije od `O(n)`
- `O(n^2)` - kvadratni rast, preživljava samo male ulaze ili velikodušne vremenske limite
- `O(n!), O(n^n), O(2^n)` - eksponencijalne (ili gore) - samo za sićušne ulaze

![[big-o.jpg|Grafik složenosti sa brojem operacija u odnosu na veličinu ulaza, obojen od zelene za O(1) i O(log n), preko žute za O(n) i narandžaste za O(n log n), do crvene za O(n^2), O(2^n) i O(n!)]]

Za većinu problema `O(n log n)` je cilj.

### Koliko brzo je dovoljno brzo?

Pre nego što napišete ijednu liniju koda, pogledajte dve stvari u tekstu zadatka:

1. **vremenski limit**
2. **najveću moguću veličinu ulaza** (ograničenja, npr. "n ≤ 100 000")

Zatim uzmite najgori slučaj za n, ubacite ga u procenjenu složenost, i uporedite sa pravilom od **10^8 operacija u sekundi**.

Recimo da je vremenski limit 1 sekunda, a ograničenja kažu da n može biti do 100 000 (10^5):

- Ideji sa `O(n^2)` treba 10^5 · 10^5 = **10^10 operacija** - oko 100 sekundi. Beznadežno, nemojte je ni pisati.
- Ideji sa `O(n log n)` treba oko 10^5 · 17 ≈ **2 · 10^6 operacija** - par milisekundi. Samo napred.

Ova računica od pet sekundi pre kucanja spasiće vas od pisanja rešenja koja su bila osuđena na propast od starta. Kao podsetnik, za tipičan limit od 1 sekunde:

- n ≤ 20 - `O(2^n)` prolazi
- n ≤ 500 - `O(n^3)` prolazi
- n ≤ 5 000 - `O(n^2)` prolazi
- n ≤ 1 000 000 - `O(n log n)` prolazi
- n veće od toga - potrebno vam je `O(n)`, ili bolje

> Kako budete rešavali sve više zadataka, vremenom ćete moći da procenite koja složenost prolazi za koji problem čak i bez računanja!
