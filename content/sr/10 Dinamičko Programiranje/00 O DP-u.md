> U ovoj lekciji naučićemo jednu od najmoćnijih tehnika optimizacije: dinamičko programiranje (DP).

Suština ove tehnike je izbegavanje suvišnih izračunavanja, odnosno čuvanje već izračunatih vrednosti i njihovo korišćenje za računanje novih vrednosti koje od njih zavise.

Pogledajmo jedan primer kako bismo videli kako ovo funkcioniše:

>Fibonačijev niz brojeva je niz u kome je svaki broj jednak zbiru prethodna dva, počevši od 0 i 1. Niz izgleda ovako: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34... Tvoj zadatak je da izračunaš $n$-ti član ovog niza.

Postoje dva glavna pristupa. Oba su potpuno ispravna i mogu se koristiti jedan umesto drugo. (Naravno, kod nekih zadataka jedan pristup može biti jednostavniji od drugog.)

### Odozgo naniže (Top down DP)

Osnovna ideja ovog pristupa je korišćenje rekurzije zajedno sa dodatnim nizom u kome ćemo čuvati već izračunate vrednosti.

Da bismo izračunali $n$-ti član, potrebno je da saberemo $n-1$ i $n-2$.

Na isti način, za izračunavanje $n-1$ potrebni su nam $n-2$ i $n-3$.

Mogli bismo jednostavno rekurzivno da pozivamo ove funkcije, ali kako bismo izbegli da isti član (na primer $n-2$) računamo više puta, čim ga prvi put izračunamo sačuvaćemo ga u `memo[n-2]`.

Ovaj postupak naziva se **memoizacija!**

	![[dp-memoization.png|Stablo rekurzije za f(5) gde se svaki podproblem računa jednom, a ponovljene grane f(3) i f(2) su označene kao pogoci u memo tabeli umesto da se ponovo razvijaju]]

Takođe moramo definisati **bazne slučajeve**. U ovom zadatku to su $n=0$ i $n=1$, pošto su njihove vrednosti već zadate u opisu problema.

Kod

~!
```c++

int solve(int n, vector<int>& memo){ // veoma je važno proslediti referencu na memo, a ne njegovu kopiju

	if(n == 0){
		return 0;
	}
	if(n == 1){
		return 1;
	}
	
	if(memo[n] != -1){ // ako smo ovu vrednost već izračunali
		return memo[n];
	}
	
	memo[n] = solve(n-1,memo) + solve(n-2,memo); // izračunaj i sačuvaj vrednost
	
	return memo[n];
}
```

`memo` definišemo ovako: `vector<int> memo(n+1,-1)`

Vremenska složenost: O(n)

### Odozdo naviše (Bottom up DP)

Drugi pristup je da krenemo od najmanjih vrednosti i zatim ih iterativno koristimo za izgradnju većih.

Za ovaj problem postavljamo $dp[0] = 0$ i $dp[1] = 1$.

Zatim računamo $dp[2] = dp[0] + dp[1]$, pa dalje redom...

Kod

~!
```c++

int main(){

	int n;
	cin>>n;
	
	vector<int> dp(n+1);
	
	dp[0] = 0;
	dp[1] = 1;
	
	for(int i=2;i<=n;i++){
		dp[i] = dp[i-1] + dp[i-2];
	}
	
	cout<<dp[n];
}
```

Vremenska složenost: O(n)
### Zaključak

Iako oba pristupa imaju istu vremensku složenost, bottom-up se uglavnom preferira zato što ima manje konstantne faktore i jednostavniji je za implementaciju. Takođe ne koristi rekurziju, koja ponekad može biti nepouzdana.

>Napomena:
>Iako je dinamičko programiranje veoma moćna tehnika, većina DP zadataka zapravo predstavlja varijacije nekoliko osnovnih tipova problema. U narednim lekcijama obradićemo upravo te osnovne DP probleme.