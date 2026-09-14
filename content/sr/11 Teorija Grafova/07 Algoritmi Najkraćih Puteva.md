>U ovoj lekciji upoznaćemo 2 veoma korisna algoritma za najkraće puteve - Belman-Ford i Flojd-Voršal

### Belman-Ford

Setimo se jednog jedinog ograničenja Dajkstrinog algoritma - **težine ne smeju da budu negativne**. Belman-Ford to rešava!

	![[bellman-ford-graph.png|Usmeren graf sa pet čvorova u kojem su grane B do C težine -3 i D do E težine -2 nacrtane crveno, a ispod su rastojanja od A: 0, 4, 1, 5 i 3]]

Pogledajmo prvo najkraći put između bilo koja dva čvora,

On može da ima najviše **n-1** granu! (Kada bi ih imao više, u njemu bi se našao nepotreban ciklus)

To znači da ćemo najkraći put sigurno naći ako sve čvorove uporedimo **n-1** put!

A kako ih poredimo?

Poređenje se svodi na proveru da li do nekog čvora možemo brže da stignemo iz nekog drugog: `if(dist[from] + w < dist[to])` -> popravljamo rastojanje

Ostaje još jedan slučaj o kojem moramo da vodimo računa, a to je kada najkraći put uopšte ne postoji: **ciklusi negativne težine**

	![[bellman-ford-negative-cycle.png|Ciklus A do B do C pa nazad do A sa težinama 2, -4 i -1, a pored njega niz koji pokazuje kako zbir pada 0, -3, -6, -9 i dalje ka minus beskonačno]]

Ovde najkraćeg puta nema - odlazak od `A` do `B` pa do `C` svaki put smanji dužinu za 3, a to možemo da ponavljamo beskonačno i tako dobijemo dužinu $-\infty$.

Belman-Ford ume to da prepozna - ako se rešenje ne nađe u `n-1` koraku, graf ima **ciklus negativne težine**
### Kod:

Bukvalno samo 2 for petlje:
~!
```c++
//pretpostavka je da je adj[i] oblika {from, to, weight}, a kod se lako prilagodi bilo kom drugom zapisu, ovaj je obično najjednostavniji
vector<int> bellmanFord(int n, vector<vector<int>>& adj) { 
    
	vector<int> dist(n, 1e8);
	dist[0] = 0;
  
	for (int i = 0; i < n; i++) {
	    
		for (vector<int> edge : adj) { 
		
			int from = edge[0];
			int to = edge[1];
			int w = edge[2];
			
			if (dist[from] != 1e8 && dist[from] + w < dist[to]) {
			    
                if(i == n - 1)
                    return {-1}; // ciklus negativne težine
               
                dist[to] = dist[from] + w;
            }
		}
	}

    return dist;
}
```
Vremenska složenost: O( V * E ) - gde je V broj čvorova, a E broj grana 

### Flojd-Voršal

Još jedan veoma koristan algoritam je Flojd-Voršal, koji nam u O($n^3$) daje najkraće puteve između svih parova čvorova.

	![[floyd-warshall-graph.png|Usmeren graf sa četiri čvora označena od 0 do 3, sa granama 0 do 1 težine 4, 0 do 2 težine 11, 1 do 2 težine 3, 1 do 3 težine 9, 2 do 0 težine 6 i 2 do 3 težine 2, koje su pored njega i nabrojane]]

Kao i kod Dajkstre, težine ne smeju da budu negativne!

Ideja je brute force koliko god može da bude, a kreće od dvodimenzione matrice suseda:

	![[floyd-warshall-matrix.png|Isti graf sa četiri čvora pored matrice 4 puta 4 koja na dijagonali ima 0, težinu svake grane u svojoj ćeliji i znak beskonačno svuda gde nema direktne grane]]

Ako od bilo kog čvora `A` do bilo kog drugog čvora `B` prolazimo kroz čvor `C`, onda, ako je `AB` optimalno, i `AC` i `CB` moraju da budu optimalni!

Hajde sada da svaki čvor redom uzmemo kao `C`, to jest da vidimo koliko drugih čvorova tekući čvor povezuje. (Radićemo to redom od 0 do n, čime nam je zagarantovano da je tekuće `C` u tom trenutku najbolje što može da bude)

Sada je dovoljna trostruka for petlja: za svaki mogući međučvor `C` probamo svaki čvor kao `A`, a za svaki od njih probamo svaki čvor kao `B`, pa ako nešto može da se popravi - popravimo ga.

Kada stignemo do `C == n`, zadatak je rešen.

	![[floyd-warshall-c0.png|Čvor 0 je označen kao međučvor, njegova vrsta i kolona su osenčene, a jedina popravljena ćelija pokazuje da rastojanje od 2 do 1 pada sa beskonačno na 10]]

	![[floyd-warshall-c1.png|Čvor 1 je označen kao međučvor, rastojanje od 0 do 2 pada sa 11 na 7, a rastojanje od 0 do 3 pada sa beskonačno na 13]]

	![[floyd-warshall-c2.png|Čvor 2 je označen kao međučvor, a popravljaju se još tri ćelije: 0 do 3 pada sa 13 na 9, 1 do 0 sa beskonačno na 9 i 1 do 3 sa 9 na 5]]

#### Kod:

~!
```c++
void floydWarshall(vector<vector<int>> &dist, int n) {

    int INF = 1e8;

    // za svaki međučvor
    for (int c = 0; c < n; c++) {

        // redom uzimamo svaki čvor kao početni
        for (int a = 0; a < n; a++) {

            // pa za taj početni redom uzimamo svaki čvor kao krajnji
            for (int b = 0; b < n; b++) {

                // najkraći put od a do b 
                if(dist[a][c] != INF && dist[c][b]!= INF ){
                
	                dist[a][b] = min(dist[a][b], dist[a][c] + dist[c][b]);
                }
                    
            }
        }
    }
}
```

Vremenska složenost: O($n^3$)

Isto bismo mogli da postignemo i tako što bismo Dajkstru pustili iz svakog čvora.

>Flojd-Voršal je bolji kada je graf gust (ima mnogo grana), a Dajkstra iz svakog čvora kada je graf redak. Ipak, zbog toga što se tako jednostavno piše, Flojd-Voršal se daleko češće koristi!

