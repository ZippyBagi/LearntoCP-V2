
## Pristup

Brojanje unutar segmenta je uobičajena razlika dva prefiksna brojanja: sve do $r$, minus sve do $l-1$. Kad se cifre granice čitaju s leva na desno, od već ispisanog prefiksa su bitne samo dve stvari - koliko je cifara različitih od nule potrošio i da li je i dalje priljubljen uz granicu - pa $dp[pos][tight][cnt]$ broji načine da se ostatak popuni, a svaka grana koja dođe do četvrte cifre različite od nule ne doprinosi ničim. Oba brojanja uključuju $0$, koja je otmena jer nema nijednu cifru različitu od nule, ali se nalazi u oba zbira i u oduzimanju se potre.

**Pažnja:** tabela je vezana za cifre jedne određene granice, pa mora da se očisti između dva poziva. Ako se ne očisti, drugi poziv odgovara na prvo pitanje i razlika ispadne $0$.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

vector<vector<vector<long long>>> dp;

// how many ways to fill positions pos..end, given cnt non-zero digits used so far
// and whether we are still glued to the prefix of the bound
long long solve(string n, int pos, int tight, int cnt){

    if(cnt > 3){
        return 0;
    }

    if(pos == n.size()){
        return (cnt <= 3);
    }

    if(dp[pos][tight][cnt] != -1){
        return dp[pos][tight][cnt];
    }

    int limit = 9;
    if(tight){
        limit = n[pos] - '0';
    }

    long long ans = 0;

    for(int d=0;d<=limit;d++){
        ans += solve(n, pos+1, tight && d==limit, cnt + (d != 0));
    }

    dp[pos][tight][cnt] = ans;
    return ans;
}

int main(){

    cin.tie(0);
    iostream::sync_with_stdio(false);

    int t;
    cin>>t;

    while(t--){

        long long l, r;
        cin>>l>>r;

        dp = vector<vector<vector<long long>>>(30, vector<vector<long long>>(2, vector<long long>(30, -1)));
        long long left = solve(to_string(max(0LL, l-1)), 0, 1, 0);

        dp = vector<vector<vector<long long>>>(30, vector<vector<long long>>(2, vector<long long>(30, -1)));
        long long right = solve(to_string(r), 0, 1, 0);

        cout<<right - left<<'\n';
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(t \cdot D \cdot 10)$ po segmentu, gde je $D \le 19$ broj cifara.
Memorijska složenost je $O(D)$.
