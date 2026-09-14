>In this lesson we will learn about dynamic programming on trees!

The main idea is the same as normal dynamic programming, **use already computed values to compute future values!**

And these problems can also be solved either top-down or bottom-up.

The only difference is that tree dp problems are done on graphs(more specifically trees), and we need to be a little more creative in how we store the values.

### Example

Lets look at an adaptation of the classic robber problem: 

#### Problem: 

> Given a tree `T` of `N` nodes, where each node `i` has `C[i]` coins attached with it. You have to choose a subset of nodes such that no two adjacent nodes(i.e. nodes connected directly by an edge) are chosen and sum of coins attached with nodes in chosen subset is maximum.

	![[tree-dp-robber.png|A ten node tree rooted at 0 with the coin values 0, 1, 11, 7, 3, 4, 8, 9, 5 and 0 written in its circles, where the best subset with no two chosen nodes adjacent is 1, 5, 6, 7 and 8, worth 1 plus 4 plus 8 plus 9 plus 5 equals 27]]

A tree is an undirected graph, so it doesn't naturally have parents and children. For Tree DP, we usually choose an arbitrary node as the root. This gives every other node a parent and lets us think about the tree as a hierarchy of subtrees(lets for now say its `0`)

Now, lets look at our options:

- We can either take `i`, we MUST skip it's children, but we CAN include it's grandchildren
- Or we can skip `i`, then we CAN take it's children

We can now create a 2D dp array,

`dp[i][0]` - will mean we skip this node
`dp[i][1]` - will mean we take this node

This means that `dp[i][0]`, will be the sum of optimal choices for the children without i, and `dp[i][1]` will be the sum of optimal if we skip the children(this info is stored in `dp[child][0]`, aka when we don't take the child)

`dp[i][0]` = $\sum_{child=0}^{children.size()} max(dp[child][0],dp[child][1])$

`dp[i][1]` = $a[i] + \sum_{child=0}^{children.size()} dp[child][0])$ 

The final solution is `max(dp[0][0], dp[0][1]`, if we rooted our tree at `0`!

### Code:

Note that, even though we use recursion, this is still a bottom up solution, just with DFS!
~!
```c++
vector<int> adj[N]; //list of neighbours for the nodes

//functions as defined above
int dp[N][2];

vector<int> C = {0,1,11,7,3,4,8,9,5,0}; //The values of the nodes

void dfs(int V, int pV){

    int sum1=0, sum2=0;

    for(auto v: adj[V]){ //v-index of the child and V-index of the current node.
    
        if(v == pV) continue; //if the current node is the same as the node we came from, since the current node is in the childrens neighbours.
    
        dfs(v, V); //we recursivly call dfs for the children.
        
        sum1 += dp[v][0];  //we add the value if we skip the children
        
        sum2 += max(dp[v][0], dp[v][1]); // we add the OPTIMAL value of the children(we already calculated whether to include them or not)
    }

    dp[V][1] = C[V] + sum1; //for leaf nodes with no children will be just their value
    dp[V][0] = sum2; // the value of the children
}
```
Time Complexity: **O(n)** - every node is visited only once!

>As we can see, TreeDP is very similar to normal DP, but the problems require a little bit more thinking, and a little harder data structures. The most important part is choosing the right states!

The best way to get good at tree DP, is to get really comfortable with normal DP and Graphs!