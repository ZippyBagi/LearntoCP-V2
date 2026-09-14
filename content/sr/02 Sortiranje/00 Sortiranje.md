> U ovoj lekciji naučićemo kako funkcioniše ugrađena funkcija za sortiranje nizova u c++-u.

Sortiranje je jedna od najosnovnijih operacija u takmičarskom programiranju.  
Veoma često ćemo morati da sortiramo podatke pre nego što krenemo sa rešavanjem problema.

Međutim, napisati efikasan algoritam za sortiranje nije baš jednostavno, zbog čega koristimo ugrađene funkcije koje c++ već nudi.

Važno je zapamtiti da sortiranje ima vremensku složenost **O(n log n)**.
### Pozivanje funkcije

Pozivanje funkcije za sortiranje je veoma jednostavno: `sort(array.begin(), array.end(), compare_function);`
- `array.begin()` i `array.end()` su pokazivači (više o njima kasnije).  Ovo samo znači da želimo da sortiramo ceo niz.
- `compare_function` je opcioni argument. Možemo proslediti našu funkciju za poređenje ako želimo poseban način sortiranja, ili ako sortiramo sopstvene tipove podataka.

Ako `compare_function` izostavimo, niz će biti sortiran rastuće (tj. neopadajuće) - od najmanjeg elementa ka najvećem.

Primer:

~!
```c++
	vector<int> a = {10,-3,5,2,7};
	
	cout<<"Pre: ";
	
	for(int i=0;i<a.size();i++){
		cout<<a[i]<<" ";
	}
	cout<<'\n'; //newline karakter
	
	sort(a.begin(), a.end()); //sortiramo niz
	
	cout<<"Posle: ";
	
	for(int i=0;i<a.size();i++){
		cout<<a[i]<<" ";
	}
	
	return 0;
```

Output:

`Pre: 10 -3 5 2 7`  
`Posle: -3 2 5 7 10`

### Korišćenje sopstvene funkcije za sortiranje

I ovo je prilično jednostavno. Sve što treba da uradimo jeste da iznad `main()` funkcije definišemo `bool` funkciju sa dva argumenta tipa koji želimo da sortiramo: `bool(type a, type b)`
- `type` predstavlja tip podataka.

Kada pišemo funkciju poređenja, zamislimo da su `a` i `b` dva susedna elementa.

Funkcija treba da vrati:
- `true` ako `a` treba da ide pre `b` (a i b menjaju mesta)
- `false` ako `a` treba da ostane ispred `b`

Primer - sortiranje opadajuće (od najvećeg ka najmanjem):

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

bool compare_function(int a, int b){

    if(a > b){ //primer: a=5, b=2, pošto je a veće od b, želimo da bude pre njega
        return true;
    }
    return false;
}

int main(){

    cin.tie(0);
    ios_base::sync_with_stdio(false);

    vector<int> a = {10,-3,5,2,7};

	cout<<"Pre: ";

	for(int i=0;i<a.size();i++){
		cout<<a[i]<<" ";
	}
	cout<<'\n'; //newline karakter

	sort(a.begin(), a.end(), compare_function); //sortiramo niz

	cout<<"Posle: ";

	for(int i=0;i<a.size();i++){
		cout<<a[i]<<" ";
	}

	return 0;
}
```

Output:

`Pre: 10 -3 5 2 7`  
`Posle: 10 7 5 2 -3`

Vremenska složenost: **O(n log n)**