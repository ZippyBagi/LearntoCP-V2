
## Approach

Two facts do all the work, one from each string.

**Preorder tells us the root.** It starts with it, by definition - so the very first letter of the preorder string is the root of the whole tree.

**Inorder tells us where the tree splits.** It lists the left subtree, then the root, then the right subtree. So once we know which letter the root is, we can find it in the inorder string, and everything before it is exactly the left subtree, everything after it exactly the right subtree.

In the example the root is `a`, and the inorder string `beafcg` breaks into `be` | `a` | `fcg`. We now know the left subtree has $2$ nodes and the right one has $3$, without knowing their shape yet.

That count is enough to cut the preorder string as well. After the root come the preorder letters of the left subtree - exactly $2$ of them, `be` - and then the preorder of the right subtree, `cfg`.

So one comparison-free step turns one problem into two smaller ones of the same kind, each with its own pair of strings. That is divide and conquer, and the recursion is:

$$postorder(tree) = postorder(left) + postorder(right) + root$$

The base case is an empty subtree, which contributes the empty string. Nothing else is needed - in particular we never build the tree.

**Careful:** the recursion works on **segments** of the two strings, not on copies, so it needs three arguments: where the segment starts in preorder, where it starts in inorder, and how long it is. Getting the right subtree's starting positions right is the fiddly part - in preorder it starts $1 + leftSize$ after the root, and in inorder it starts one past the root's position.

**Careful:** we search for the root with `find` over the **whole** inorder string, not just the current segment. That is only safe because every letter appears once in the entire tree - which the statement guarantees. If letters could repeat, the search would have to be limited to the segment.

## Example

Running it on `abecfg` / `beafcg`:

| preorder segment | inorder segment | root | left subtree | right subtree |
|---|---|---|---|---|
| `abecfg` | `beafcg` | `a` | `be` / `be` | `cfg` / `fcg` |
| `be` | `be` | `b` | empty | `e` / `e` |
| `cfg` | `fcg` | `c` | `f` / `f` | `g` / `g` |

Now read the answers back out of the recursion, deepest first. Node `b` has no left child and `e` on the right, so its postorder is `` + `e` + `b` = `eb`. Node `c` gives `f` + `g` + `c` = `fgc`. And the root glues them with itself last: `eb` + `fgc` + `a` = `ebfgca`.

Look at the second row for the reason this works at all: `b` sits at the start of its own inorder segment `be`, which means nothing is to its left, which means it has no left child. The shape of the tree is never stored anywhere - it is read off the position of each root inside its inorder segment.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

string pre, in;

// postorder of the subtree whose preorder starts at pre[preStart] and whose
// inorder is in[inStart .. inStart + n - 1]
string postorder(int preStart, int inStart, int n){

    if(n == 0){
        return ""; // empty subtree
    }

    char root = pre[preStart];
    int m = in.find(root); // every letter is different, so one search over the whole string is safe

    int leftSize = m - inStart;          // everything before the root in the inorder segment
    int rightSize = n - leftSize - 1;    // ... and everything after it

    return postorder(preStart + 1, inStart, leftSize)           // left subtree
         + postorder(preStart + 1 + leftSize, m + 1, rightSize) // right subtree
         + root;                                                // root last
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){
        cin>>pre>>in;
        cout<<postorder(0, 0, pre.size())<<'\n';
    }
    return 0;
}
```

## Complexity

Time $O(n^2)$ in the worst case - `find` scans the string and the pieces get glued together - but $n \le 26$, so this is nothing
Memory $O(n)$ for the recursion
