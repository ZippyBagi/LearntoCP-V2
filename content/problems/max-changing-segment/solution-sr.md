
## Pristup

Odgovor dobijen prolaskom kroz deonicu košta $O(n)$, pa $q$ pitanja košta $O(n \cdot q)$ - do $10^{10}$ koraka. Da bismo to rešili efikasno, koristimo segmentno stablo koje čuva maksimum:

- pri **gradnji**, čvor postaje maksimum svoje dece umesto njihovog zbira;
- pri **upitu**, `ans` uzima maksimum sebe i čvora umesto da ga sabere;
- pri **izmeni**, preračunati čvor opet uzima maksimum svoje dece.

**Pažnja:** početna vrednost u segmentnom stablu treba da bude `LLONG_MIN`

Gradnja košta $O(n)$, a posle toga svako pitanje i svaka prekalibracija koštaju $O(\log n)$.
## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

// the first power of two that is >= a
long long power_of_two(long long a){

    long long d = 1;

    while(d < a){
        d*=2;
    }

    return d;
}

vector<long long> create_segment_tree(vector<long long>& a){

    int n = power_of_two(a.size());

    vector<long long> s(2*n, LLONG_MIN); // LLONG_MIN is to max what 0 is to a sum

    for(int i =0; i<a.size();i++){ // copy the original elements
        s[n+i] = a[i];
    }

    for(int i = n-1; i>=1; i--){ // build the tree
        s[i] = max(s[i*2], s[i*2 + 1]);
    }

    return s;
}

long long query(vector<long long>& s, int l, int r){

    l+=s.size() / 2; // we must start from the leaves
    r+=s.size() / 2;

    long long ans = LLONG_MIN;

    while(l<=r){

        if (l % 2 == 1){ // check the leftmost one
            ans = max(ans, s[l]);
            l++;
        }
        if(r % 2 == 0){ // check the rightmost one
            ans = max(ans, s[r]);
            r--;
        }

        // move on to the next layer
        l/=2;
        r/=2;
    }

    return ans;
}

void replace_element(vector<long long>& s, long long el, int pos){

    int index = pos + s.size() / 2;

    s[index] = el;

    for (index /= 2; index >= 1; index /= 2){

        s[index] = max(s[2*index], s[2*index+1]); // recompute
    }
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        int n, q;
        cin>>n>>q;

        vector<long long> a(n);
        for(int i=0;i<n;i++){
            cin>>a[i];
        }

        vector<long long> s = create_segment_tree(a);

        while(q--){

            char type;
            cin>>type;

            if(type == 'a'){
                int l, r;
                cin>>l>>r;
                cout<<query(s, l, r)<<'\n';
            }else{
                int i;
                long long x;
                cin>>i>>x;
                replace_element(s, x, i);
            }
        }
    }
    return 0;
}
```
## Složenost

Vremenska složenost je $O(n + q \log n)$.
Memorijska složenost je $O(n)$.
