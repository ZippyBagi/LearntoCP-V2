
## Pristup

Stepen $a^n$ može da ima milijarde cifara - izračunati ga je nemoguće. Ali nama treba samo poslednjih $k$ cifara, a poslednjih $k$ cifara broja je tačno njegov ostatak po modulu $10^k$.

Ključna činjenica o ostacima: **uzimanje ostatka posle svakog množenja ništa ne menja**. Ako nas zanima samo rezultat po nekom fiksnom modulu, svaki međurezultat smemo da zamenimo njegovim ostatkom - poslednje cifre proizvoda zavise samo od poslednjih cifara činilaca.

Označimo taj modul sa $m = 10^k$. Zadatak tako postaje: izračunaj $a^n \bmod m$. Množenje $n$ puta je presporo za $n = 10^9$ - baš za to služi binarno stepenovanje iz lekcije. Ista petlja, uz jedan dodatak: `% m` posle svakog množenja.

Pošto je $m \le 10^9$, svaki proizvod je ispod $10^{18}$ - staje u `long long`.

**Pažnja:** rezultat je ostatak, ali izlaz su **cifre**: za $10^5 \bmod 1000 = 0$ ispravan izlaz je `000`, a ne `0`. Ispiši ostatak dopunjen vodećim nulama do tačno $k$ cifara.
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

        long long a, n, k;
        cin>>a>>n>>k;

        // zadržati poslednjih k cifara znači raditi po modulu m = 10^k
        long long m = 1;
        for(int i = 0; i < k; i++){
            m *= 10;
        }

        long long res = 1 % m;
        long long base = a % m;

        while(n > 0){
            if(n % 2 == 1){
                res = res * base % m; // proizvodi ostaju ispod 10^18, staju u long long
            }
            base = base * base % m;
            n /= 2;
        }

        // res je ostatak po modulu 10^k; ispiši ga kao tačno k cifara
        string s = to_string(res);
        for(int i = s.size(); i < k; i++){
            cout << '0'; // dopuni vodećim nulama
        }
        cout << s << '\n';
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(t \log n)$.
Memorijska složenost je $O(1)$.
