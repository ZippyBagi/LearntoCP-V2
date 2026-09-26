
## Approach

Two phrases are anagrams exactly when they use **every letter the same number of times**. The order never matters - so instead of trying rearrangements, just count.

This is [Letter Frequency](/en/Problems/letter-frequency) twice: build one array of $26$ counters for each phrase, skipping every character that is not a lowercase letter, and compare the two arrays. Equal counts - anagrams. Any difference - not.

(An alternative from the same idea family: strip the non-letters, sort both strings and compare them. Same verdict, but sorting costs $O(L \log L)$ while counting is one pass.)

**Careful:** the phrases contain spaces, so `cin>>` would read a single word - use `getline`. And after reading the number $t$ with `cin>>`, its newline is still in the buffer, so the first `getline` would return an empty string. One `cin.ignore()` after reading $t$ fixes it.

## Example

The second testcase: "oni su skrsili vagu" against "suvisni kilogrami". Count a few letters:

| letter | first phrase | second phrase |
|---|---|---|
| `i` | $3$ | $4$ |
| `s` | $3$ | $2$ |
| `g` | $1$ | $1$ |

The counts for `i` and `s` differ - `NO` immediately, no matter how the rest looks. In the first testcase all $26$ counters match, so `YES`.

## Code

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

## Complexity

Time $O(L)$ where $L$ is the total length of the phrases
Memory $O(L)$
