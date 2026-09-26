
## Approach

We need a counter for every letter - and there are only $26$ of them, so a vector of $26$ counters covers the whole alphabet.

The bridge between letters and counters is the trick from the Strings lesson: `s[i] - 'a'` turns a lowercase letter into a number from $0$ to $25$. So the counter for letter `s[i]` lives at index `s[i] - 'a'`:

- Go through the word once, and for every character do `count[s[i] - 'a']++`.
- Then go through the $26$ counters **in order** - index order *is* alphabetical order, so the required sorting comes for free.
- To print the letter itself, convert the index back: `char c = 'a' + i`.

**Careful:** only letters that actually appear are printed - skip every counter that is still $0$.

**Careful:** the format is exactly `letter: count` - a colon and a space between them.

## Example

The counters for `banana` (indices with count $0$ omitted):

| letter | index (`letter - 'a'`) | count |
|:---:|:---:|:---:|
| `a` | 0 | 3 |
| `b` | 1 | 1 |
| `n` | 13 | 2 |

Reading the counters from index $0$ to $25$ visits `a`, then `b`, then `n` - alphabetical order, exactly what the output asks for.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    iostream::sync_with_stdio(false);
    cin.tie(0);

    string s;
    cin >> s;

    vector<int> count(26, 0); // one counter per letter

    for(int i = 0; i < s.size(); i++){
        count[s[i] - 'a']++; // 'b' - 'a' = 1, so 'b' is counted at index 1
    }

    for(int i = 0; i < 26; i++){

        if(count[i] > 0){ // only letters that appear

            char c = 'a' + i; // back from index to letter
            cout << c << ": " << count[i] << '\n';
        }
    }

    return 0;
}
```

## Complexity

Time $O(n)$
Memory $O(1)$ (the $26$ counters don't grow with the input)
