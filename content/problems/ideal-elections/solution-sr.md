
## Pristup

Izbori su idealni kada je najmanji zajednički sadržalac glasova jednak njihovom proizvodu. Hajde da vidimo šta to zapravo znači za brojeve.

Počni od samo dva glasa, $a$ i $b$. Postoji dobro poznati identitet koji povezuje njihov nzs sa njihovim proizvodom:

$$nzs(a, b) = \frac{a \cdot b}{nzd(a, b)}$$

Dakle $nzs(a, b)$ je jednak $a \cdot b$ samo kada je $nzd(a, b) = 1$. Isto mora da važi za **svaki** par odjednom, pa su u idealnim izborima svaka dva izabrana glasa **uzajamno prosta** - njihov nzd je $1$.

Dva broja su uzajamno prosta tačno kada nemaju zajednički prost činilac. Znači ceo uslov je zapravo priča o prostim brojevima: **svaki prost broj sme da se pojavi u najviše jednom izabranom glasu**. Ako su dva glasača izabrala brojeve deljive sa $3$, izbori su već pokvareni.

### Brojanje prost po prost

Ovo je deo koji problem čini lakim. Pošto se prost broj nikad ne deli, svaki prost broj možemo da rešimo potpuno zasebno.

Zamisli svakog glasača $i$ kao **korpu** koja drži njegov broj $a_i$. Fiksiraj jedan prost broj $q$ i pitaj: na koliko načina $q$ može da se rasporedi po celom nizu?

Samo jedan glasač ikada sme da uzme $q$. Glasač može da ga uzme ako $q$ deli njegov broj - a bira čak i koliko: ako je broj deljiv sa $q$ jednom, taj glasač može da glasa $q$; ako je deljiv sa $q$ dvaput, može da glasa $q$ ili $q^2$; i tako dalje. Dakle glasač čiji broj sadrži $q$ kao činilac **$k$ puta** daje nam **$k$** različitih načina da ga iskoristi.

Saberi te brojeve preko svih korpi i dobio si sve opcije "jedan glasač uzima $q$". Zatim dodaj još jednu opciju za **niko ne uzima $q$**. To je ceo broj:

$$\text{Načini}(q) = 1 + (\text{koliko se puta } q \text{ pojavljuje kao činilac u svim brojevima})$$

Na primer, ako brojevi među sobom sadrže tri činioca $2$, ima $1 + 3 = 4$ načina da se izađe na kraj sa prostim brojem $2$.

### Spajanje prostih brojeva

Sada poslednji korak. Odluka za prost broj $2$ nema veze sa odlukom za prost broj $3$: jedan glas može istovremeno da nosi činilac $2$ i činilac $3$ bez konflikta, a pravilo "najviše jedan glasač" proverava se posebno za svaki prost broj. Prosti brojevi su **potpuno nezavisni**.

Kada se nezavisni izbori nadovezuju, njih množimo. (Ako ima $4$ načina da se smesti prost broj $2$ i $2$ načina da se smesti prost broj $3$, onda se svaki od $4$ uparuje sa svakim od $2$, što daje $4 \cdot 2 = 8$ kombinacija - to je **princip množenja** u kombinatorici.) Zato je ukupan broj idealnih nizova prosto proizvod broja načina preko svih prostih brojeva:

$$\text{odgovor} = \prod_{q \text{ prost}} \text{Načini}(q) \pmod{10^9 + 7}$$

Da bismo dobili svaki $\text{Načini}(q)$, faktorišemo svaki broj i za svaki prost broj brojimo koliko se puta ukupno pojavljuje. Brza faktorizacija dolazi iz **sita najmanjeg prostog činioca**: `sieve[x]` čuva najmanji prost broj koji deli $x$, pa svaki broj raspolučujemo tako što ga uzastopno delimo sa `sieve[x]`.

**Pažnja:** proizvod ide preko mnogo prostih brojeva i skoro odmah prepuni `int`, pa drži tekući odgovor u `long long` i uzimaj ga po modulu $10^9 + 7$ posle svakog množenja.

-g> Ovaj zadatak koristi tehnike iz lekcija [Modifikovano Sito](/sr/Theory/Matematika/Modifikovano%20Sito) i [Pravilo Množenja](/sr/Theory/Kombinatorika/Pravilo Množenja).
## Primer

Uzmimo prvi test primer, $a = [2, 3, 1, 4]$. Jedinica nema proste činioce, pa su bitni samo $2$ i $3$:

| prost $q$ | gde se pojavljuje | ukupno puta | $\text{Načini}(q)$ |
|:---:|:---:|:---:|:---:|
| $2$ | u $2$ (jednom), u $4$ (dvaput) | $3$ | $4$ |
| $3$ | u $3$ (jednom) | $1$ | $2$ |

Prost broj $2$ pojavljuje se ukupno tri puta (jednom u broju $2$, dvaput u $4 = 2^2$), pa ima $1 + 3 = 4$ načina da se rasporedi. Prost broj $3$ pojavljuje se jednom, što daje $2$ načina. Množenjem nezavisnih prostih brojeva: $4 \cdot 2 = 8$, baš očekivani odgovor.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

const int maxN = 500000+10;
const int mod = 1e9 + 7;

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    vector<int> sieve(maxN);

    for(int i=1;i<sieve.size();i++){
        sieve[i] = i;
    }

    for(int i = 2;i*i<=maxN;i++){
        if(sieve[i] == i){                  // i je prost
            for(int j=i*i;j<maxN;j+=i){
                if(sieve[j] == j){          // prvi prost koji stigne do j je njegov najmanji
                    sieve[j] = i;
                }
            }
        }
    }

    vector<int> a(maxN,0);                   // a[q] = koliko se puta prost q pojavio

    while(t--){

        int n;
        cin>>n;

        vector<int> primes;                  // koje proste brojeve smo dotakli u ovom testu

        int x;
        for(int i=0;i<n;i++){
            cin>>x;
            while(x > 1){
                int p = sieve[x];            // najmanji prost cinilac broja x

                while(x % p == 0){
                    if(a[p] == 0){
                        primes.push_back(p);
                    }
                    a[p]++;                  // jos jedno pojavljivanje ovog prostog broja
                    x /= p;
                }
            }
        }

        long long ans = 1;

        for(const auto& x : primes){
            ans = (ans * (1+a[x])) % mod;    // pomnozi sa Nacini(q) = 1 + broj
            a[x] = 0;                        // resetuj za sledeci test
        }

        cout<<ans<<'\n';
    }
    return 0;
}
```

Resetujemo samo one proste brojeve koje smo zaista koristili (čuvane u `primes`), pa čišćenje brojača ne košta ništa dodatno - nikada ne prolazimo kroz ceo niz `a` između testova.

## Složenost

Neka je $A = 5 \cdot 10^5$ najveće moguće $a_i$.
Vremenska složenost je $O(A \log \log A + (\sum n)\log A)$.
Memorijska složenost je $O(A)$.

Sito se gradi jednom; posle toga se svaki broj faktoriše u oko $\log a_i$ koraka.