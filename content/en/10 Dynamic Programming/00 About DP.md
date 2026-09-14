> In this lesson we will learn about one of the best optimization techniques: Dynamic Programming

The core of this technique is not doing redundant calculations, or in other words, saving already computed values, and using them to build new values that depend on them.

Lets look at a problem to demonstrate how it works:

>The Fibonacci numbers are a sequence where each number is the sum of the two preceding ones, starting from 0 and 1. The sequence goes: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34... Your job is to compute the $n$-th one.
 
There are 2 main approaches, both are valid and interchangeable, so which one you use comes to personal preference. (of course, for some problems, one might be easier than the other)
### Top down dp

The core idea here is to use recursion, along with an additional array which will store already computed values.

So to compute the $n$-th number, we need to sum $n-1$ and $n-2$.

Similarly, to get $n-1$, we need $n-2$ and $n-3$.

We can call these recursively, but in order to avoid calling $n-2$ twice(or more), as soon as we compute one number - lets say $n-2$, we will save it into `memo[n-2]`

This process is called **memoization!**

	![[dp-memoization.png|The recursion tree for f(5) with each subproblem computed once and the repeated branches f(3) and f(2) marked as memo hits instead of being expanded again]]

We also need to define the **termination case,** in our problem, that case will be $n=0$, and $n=1$, as they are already defined in the problem description

Code
~!
```c++

int solve(int n, vector<int>& memo){ //very important to pass the reference to memo, and not memo itself

	if(n == 0){
		return 0;
	}
	if(n == 1){
		return 1;
	}
	
	if(memo[n] != -1){ // if we have already computed this value
		return memo[n];
	}
	
	memo[n] = solve(n-1,memo) + solve(n-2,memo); //compute and save the value
	
	return memo[n];
}
```

We also define `memo` as: `vector<int> memo(n+1,-1)`

Time complexity: O(n)

### Bottom up dp

The other approach is to start with the smallest value, and then iteratively use it to build bigger values.

For this problem, we would define $dp[0] = 0$, and $dp[1] = 1$.

Then we would build $dp[2] = dp[0] + dp[1]$, etc...

Code
~!
```c++

int main(){

	int n;
	cin>>n;
	
	vector<int> dp(n+1);
	
	dp[0] = 0;
	dp[1] = 1;
	
	for(int i=2;i<=n;i++){
		dp[i] = dp[i-1] + dp[i-2];
	}
	
	cout<<dp[n];
}
```

Time Complexity: O(n);

### Verdict:

Whilst both approaches do have the same time complexity, bottom up is generally preferred as  the constant factors are smaller, and it is simpler to implement(it also doesn't need recursion which can be unreliable at times)

>Note:
>Whilst dp is a powerful concept, most dp problems are just a reskin of a few elementary ones, in the next few lessons, we will cover the elementary dp problems.