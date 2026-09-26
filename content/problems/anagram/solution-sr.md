
## Pristup

Dve fraze su anagrami tačno kada koriste **svako slovo isti broj puta**. Redosled nikada nije bitan - pa umesto da isprobavamo premeštanja, prosto brojimo.

Ovo je [Učestalost Slova](/sr/Problems/letter-frequency) dva puta: napravi po jedan niz od $26$ brojača za svaku frazu, preskačući svaki karakter koji nije malo slovo, i uporedi dva niza. Jednaki brojevi - anagrami. Bilo koja razlika - nisu.

(Alternativa iz iste porodice ideja: izbaci ne-slova, sortiraj obe niske i uporedi ih. Ista presuda, ali sortiranje košta $O(L \log L)$, a brojanje je jedan prolaz.)

**Pažnja:** fraze sadrže razmake, pa bi `cin>>` pročitao samo jednu reč - koristi `getline`. A posle čitanja broja $t$ pomoću `cin>>`, njegov novi red je i dalje u baferu, pa bi prvi `getline` vratio praznu nisku. Jedan `cin.ignore()` posle čitanja $t$ to rešava.

## Primer

Drugi test primer: "oni su skrsili vagu" naspram "suvisni kilogrami". Izbroj nekoliko slova:

| slovo | prva fraza | druga fraza |
|---|---|---|
| `i` | $3$ | $4$ |
| `s` | $3$ | $2$ |
| `g` | $1$ | $1$ |

Brojevi za `i` i za `s` se razlikuju - odmah `NO`, ma kako ostatak izgledao. U prvom test primeru sva $26$ brojača se poklapaju, pa `YES`.

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
    cin.ignore(); // skip the newline left behind after reading the number

    while(t--){

        string s1, s2;
        getline(cin, s1); // the lines contain spaces, so cin>> would not work
        getline(cin, s2);

        vector<int> cnt1(26, 0), cnt2(26, 0);

        for(char c : s1){
            if(c >= 'a' && c <= 'z'){ // everything that is not a letter is ignored
                cnt1[c - 'a']++;
            }
        }
        for(char c : s2){
            if(c >= 'a' && c <= 'z'){
                cnt2[c - 'a']++;
            }
        }

        if(cnt1 == cnt2){
            cout<<"YES"<<'\n';
        }else{
            cout<<"NO"<<'\n';
        }
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(L)$ gde je $L$ ukupna dužina fraza.
Memorijska složenost je $O(L)$.
