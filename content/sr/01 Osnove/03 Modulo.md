> U ovoj lekciji naučićemo kako funkcioniše deljenje, kao i kako da pronađemo ostatak pri deljenju celih brojeva.

Prilikom rešavanja zadataka često moramo da proverimo da li je jedan broj deljiv drugim. Najjednostavniji način da to uradimo jeste korišćenjem **modulo** operacije.

### Šta je modulo?

Modulo je matematička operacija koja nam govori koliki je ostatak nakon deljenja dva cela broja.  
U matematici se zapisuje kao `a mod b`, dok se u c++-u piše kao `a % b`.

Pogledajmo nekoliko primera:

`5 % 2 = 1`  
`100 % 10 = 0`  
`9 % 7 = 2`

> Dva broja su deljiva ako je njihov modulo jednak 0!

Ako pogledamo više uzastopnih brojeva, možemo primetiti sledeće:

`3 % 3 = 0`  
`4 % 3 = 1`  
`6 % 3 = 0`  
`7 % 3 = 1`

Kao što možemo videti, rezultati počinju da se ponavljaju.  
Takođe možemo primetiti da su pri deljenju brojem **n** mogući ostaci:

**0, 1, 2, 3, ..., n-2, n-1**

Drugim rečima: **brojevi od 0 do n-1**

### Implementacija

Korišćenje modulo operacije u c++-u je veoma jednostavno, dovoljno je napisati `a % b` i dobićemo ostatak pri deljenju.

~!
```c++
int main(){

	int a = 5;
	int b = 3;
	
	cout<< a % b;

	return 0;
}
```

Output: `2`

Takođe možemo proveriti da li je jedan broj deljiv drugim pomoću uslova: `if(a % b == 0)`

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

	cin.tie(0);
	ios_base::sync_with_stdio(false);
	
	int a,b;
	
	cin>>a>>b;
	
	if(a % b ==0){
		cout<<"Brojevi JESU deljivi";
	}else{
		cout<<"Brojevi NISU deljivi";
	}
	
	return 0;
}
```

Input: `100 3`  
Output: `Brojevi NISU deljivi`

Input: `100 5`  
Output: `Brojevi JESU deljivi`

### Pravila modulo operacije

U mnogim zadacima rešenje je ogroman broj, pa se u postavci traži da ispišemo rezultat **po modulu** nekog broja (najčešće `1000000007`). Umesto da prvo izračunamo ogroman broj pa tek na kraju uzmemo ostatak (što bi izazvalo prekoračenje), uzimamo ostatak posle svake operacije.

To radi zbog sledećih pravila:

**Sabiranje**
`(a + b) % m = (a % m + b % m) % m`

**Oduzimanje**
`(a - b) % m = (a % m - b % m + m) % m`

**Množenje**
`(a * b) % m = ((a % m) * (b % m)) % m`

**Stepenovanje**
`(a^b) % m = ((a % m)^b) % m`