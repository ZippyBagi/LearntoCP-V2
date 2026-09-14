>In this lesson we will learn about an optimization technique that finds the optimal value in O(log n) time - Binary Search by Answer

Binary Search by answer is very similar to binary search. 

The difference is that when we find a solution that works, we keep searching hoping to find a better one.

Another difference is that instead of looking through an array, we define **2 values**:

- `high` - The highest possible value that could be the answer
- `low` - The lowest possible value that could be the answer

Then we run binary search on those values, and at each step, check if that number works as a solution.

### Pseuso code:

```c++

bool check(){ // this function will check if the current number solves the problem
	
}

int main(){

	int low = 1; //the lowest possible value that could be the solution
	int high = 100000 //the highest possible value that could be the solution
	
	int ans = -1; //we assume there is no solution at first
	
	while(low <= high){
		
		int mid = (low + high) / 2;
		
		if(check(mid)){ // If we satify the condition
		
			ans = mid; // Found the solution
			high = mid-1; // Lets try to find a better one
			
		}else{
			low = mid + 1; // No solution, lets try again
		}
	}
	
	cout<<ans<<'\n';

}
```

Time Complexity: O(log `high` * T), where T is the time complexity the `check()` function

### When does it work:

It is important to understand that this technique won't work on every problem.

It only works when solutions look like this:

`NO NO NO NO NO YES YES YES YES`

In other words, if one value works, all values smaller(or larger, depending on the problem), should work too. 

We want to find the point of the last(or first) `YES`

	![[monotone-predicate.png|Two rows of check results over the values 1 to 12: the first flips from false to true exactly once at 8, which is the answer, while the second flips back and forth many times so no single boundary exists]]

