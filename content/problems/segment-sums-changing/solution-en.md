
## Approach

Summing a stretch by hand costs $O(n)$, so $m$ questions cost $O(n \cdot m)$ - up to $10^{10}$ steps. Plain prefix sums do not help either, because a single change would force a rebuild. This is a Fenwick tree straight out of the lesson, with no changes at all:

- `createFenwick` builds it in $O(n)$;
- `prefixSum(a, k)` gives the sum of the first $k$ elements, so the sum of $[l, r]$ is `prefixSum(a, r+1) - prefixSum(a, l)`;
- `add` overwrites one position in $O(\log n)$.

**Careful:** the tree is 1-indexed and the positions in the input are 0-indexed, so every index gets a $+1$ on the way in. A stretch $[l, r]$ becomes `prefixSum(r+1) - prefixSum(l)` - the second term is `prefixSum(l-1+1)`, the prefix that stops just before $l$.

Everything fits in an `int`: at most $10^5$ elements of at most $10$ give $10^6$.

## Code

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

## Complexity

Time $O(n + m \log n)$
Memory $O(n)$
