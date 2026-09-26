
## Pristup

Sabiranje deonice napamet košta $O(n)$, pa $m$ pitanja košta $O(n \cdot m)$ - do $10^{10}$ koraka. Ni obične prefiksne sume ne pomažu, jer bi jedna izmena naterala ponovnu izgradnju. Ovo je Fenvikovo stablo pravo iz lekcije, bez ijedne izmene:

- `createFenwick` ga gradi u $O(n)$;
- `prefixSum(a, k)` daje zbir prvih $k$ elemenata, pa je zbir deonice $[l, r]$ jednak `prefixSum(a, r+1) - prefixSum(a, l)`;
- `add` prepisuje jednu poziciju u $O(\log n)$.

**Pažnja:** stablo je indeksirano od $1$, a pozicije sa ulaza od $0$, pa svaki indeks na ulasku dobija $+1$. Deonica $[l, r]$ postaje `prefixSum(r+1) - prefixSum(l)` - drugi član je `prefixSum(l-1+1)`, prefiks koji staje tačno pre $l$.

Sve staje u `int`: najviše $10^5$ elemenata od najviše $10$ daje $10^6$.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

//assuming elements is a 0-indexed array
void createFenwick(vector<int>& a, const vector<int>& elements) {

    int n = elements.size();
    a = vector<int>(n + 1, 0); // a fresh tree for every testcase

    // Step 1: copy elements
    for (int i = 1; i <= n; i++) {
        a[i] = elements[i - 1];
    }

    // Step 2: build Fenwick structure
    for (int i = 1; i <= n; i++) {
        int parent = i + (i & -i);
        if (parent <= n) {
            a[parent] += a[i];
        }
    }
}

int prefixSum(vector<int>& a, int k) {
    int sum = 0;

    while(k>0){
        sum += a[k];
        k -= k & -k;
    }
    return sum;
}

//Puts element el, on index pos
void add(vector<int>& a, vector<int>& elements,int pos, int el){

    int n = a.size();

    int delta = el - elements[pos-1]; //by how much the value changed
    elements[pos-1] = el;

    while(pos < n){
        a[pos] += delta;
        pos += pos & -pos;
    }
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        int n, m;
        cin>>n>>m;

        vector<int> elements(n);
        for(int i=0;i<n;i++){
            cin>>elements[i];
        }

        vector<int> a;
        createFenwick(a, elements);

        while(m--){

            char type;
            cin>>type;

            if(type == 'q'){
                int l, r;
                cin>>l>>r;
                cout<<prefixSum(a, r+1) - prefixSum(a, l)<<'\n'; // sum of [l, r]
            }else{
                int i, v;
                cin>>i>>v;
                add(a, elements, i+1, v); // the tree is 1-indexed
            }
        }
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(n + m \log n)$.
Memorijska složenost je $O(n)$.
