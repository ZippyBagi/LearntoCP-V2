A **binary tree** is a tree in which every node has at most two children, a left one and a right one. There are three usual orders in which its nodes can be visited, and each one is defined by where the root goes relative to the two subtrees:

- **preorder** - the root first, then the whole left subtree, then the whole right subtree;
- **inorder** - the left subtree first, then the root, then the right subtree;
- **postorder** - the left subtree first, then the right subtree, and the root last.

Inside a subtree the same rule applies again - a subtree is visited by its own rule, exactly as the whole tree is.

Every node of our tree is labelled with a **different** lowercase letter of the English alphabet, so each of the three traversals produces one string of letters. Given the preorder and the inorder strings of the same tree, print its postorder string.

## Input

First line of input will be a single integer $t$ - the number of testcases.
The first line of each testcase contains the **preorder** string of a tree.
The second line contains the **inorder** string of the same tree.

Both strings consist of the same set of distinct lowercase letters, listed in the two different orders. The two strings always describe one existing binary tree.

## Output

For every testcase print a single line with the **postorder** string of that tree.

## Example

```Input
1
abecfg
beafcg
```

```Output
ebfgca
```

The two strings describe this tree:

```
       a
      / \
     /   \
    b     c
     \   / \
      e f   g
```

Node `b` has no left child, only a right one. Reading the tree in preorder gives `a`, then the whole left subtree `be`, then the whole right subtree `cfg` - that is `abecfg`. Reading it in inorder gives `be`, then `a`, then `fcg` - that is `beafcg`. In postorder the root comes last, so the answer is `eb` + `fgc` + `a`, which is `ebfgca`.

## Constraints

$1 \le t \le 100$
$1 \le$ the length of each string $\le 26$
Both strings are made of the same distinct lowercase letters

---

*This problem was adapted, with permission, from [Treći obilazak](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/treci_obilazak), authored by Društvo matematičara Srbije and Fondacija Petlja.*
