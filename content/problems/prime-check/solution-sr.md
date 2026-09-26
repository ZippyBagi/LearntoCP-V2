
## Pristup

Ovo je provera iz lekcije o prostim brojevima. Isprobavanje svakog delioca od $2$ do $n - 1$ košta do $10^9$ koraka po broju - sa $1000$ brojeva, daleko presporo.

Spašava nas zapažanje iz lekcije: **ako $n$ ima bilo koji delilac, ima i jedan koji je najviše $\sqrt{n}$** - delioci idu u parovima $d \cdot (n / d) = n$, a manji iz svakog para je najviše $\sqrt{n}$. Zato je dovoljno isprobati delioce do $\sqrt{n}$ - najviše oko $31623$ njih za $n \le 10^9$.

Čim se nađe jedan delilac, odgovor je poznat - izađi iz petlje.

**Pažnja:** granicu piši kao `i * i <= n`, ne kao `i <= sqrt(n)` - `sqrt` radi sa decimalnim brojevima i može da omane za sitnicu baš u pogrešnom trenutku. Ovde je $n \le 10^9$, pa `i * i` ostaje ispod $10^9$ i običan `int` ga drži bez problema (granica int-a je oko $2.1 \cdot 10^9$).

$1$ nije prost - reši ga pre nego što petlja i počne.

## Primer

Za $17$ petlja isprobava $i = 2, 3, 4$ (zaustavlja je $5 \cdot 5 = 25 > 17$), ne nalazi ništa i ispisuje `YES`.

Za $903543481$ petlja se penje sve do $i = 30059$ - i tu pogađa, jer je $903543481 = 30059^2$. Ovo je tačno vrsta broja zbog koje granica $\sqrt{n}$ postoji: njegovi jedini delioci osim $1$ i njega samog su na samoj granici.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        int n;
        cin>>n;

        bool prime = true;
        if(n < 2) prime = false;

        for(int i=2;i*i<=n;i++){
            if(n % i == 0){ // found a divisor, n is not prime
                prime = false;
                break;
            }
        }

        if(prime){
            cout<<"YES"<<'\n';
        }else{
            cout<<"NO"<<'\n';
        }
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(t \sqrt{n})$.
Memorijska složenost je $O(1)$.
