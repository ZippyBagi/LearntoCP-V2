
## Approach

For every barcode of the manufacturer we have to answer one question: **is it on the store's list?** A linear scan costs $O(n)$ per barcode, so $O(n \cdot q)$ in total - up to $4 \cdot 10^{10}$ comparisons.

But the store's list is **already sorted**, and searching a sorted array is the job of binary search.

For each of the $q$ barcodes run the search from the binary search lesson:

- compare the barcode with the middle element;
- throw away the half that cannot contain it;
- repeat until the element is found or the borders cross.

Every search costs $O(\log n)$ - for $n = 2 \cdot 10^5$ that is $18$ comparisons instead of $200000$.

Count the searches that end with **found**.
## Code

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    iostream::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;

    while(t--) {

        int n, q;
        cin >> n >> q;

        vector<int> a(n);
        for(int i = 0; i < n; i++) cin >> a[i]; // already sorted

        int cnt = 0;

        while(q--) {

            int k;
            cin >> k;

            int left = 0, right = n - 1;
            bool found = false;

            while(left <= right) {
                int middle = (left + right) / 2;
                if(a[middle] == k) {
                    found = true;
                    break;
                } else if(k > a[middle]) left = middle + 1; // no value left of middle can be k
                else right = middle - 1;                    // no value right of middle can be k
            }

            if(found) cnt++;
        }

        cout << cnt << "\n";
    }

    return 0;
}
```

## Complexity

Time $O(q \log n)$
Memory $O(n)$
