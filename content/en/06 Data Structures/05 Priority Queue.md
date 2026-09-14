>In this lesson we will learn about a special type of queue that always keeps its elements sorted - the Priority Queue!

A normal queue serves people in the order they arrived. That is fair, but it is not always what we want.

Think of a hospital waiting room. Whoever is in the worst shape goes in first, no matter who walked through the door first. New patients keep arriving, and after every single one the answer to "who goes next?" can change.

With the tools we have so far this gets expensive. If we keep everyone in a vector, finding the most urgent patient means scanning the whole vector every time - O(n) per question. If we sort the vector instead, every new patient forces us to sort again.

The **priority queue** solves exactly this. It is a queue where the largest element is always the one that leaves first.

Initialization: `priority_queue<int> pq`

### The functions

| Function | What it does | Complexity |
| ---- | ---- | ---- |
| `push(x)` | adds `x` | O(log n) |
| `top()` | returns the largest element | O(1) |
| `pop()` | removes the largest element | O(log n) |
| `size()` | number of elements | O(1) |
| `empty()` | returns `true` if the queue is empty | O(1) |

Here `n` is the number of elements currently inside.

Notice that there is no `front()` and no `back()`. The priority queue has only one element we care about - the largest one.

Example:
~!
```c++
int main(){

    priority_queue<int> pq;

    pq.push(3);
    pq.push(9);
    pq.push(5);

    cout<<pq.top()<<'\n'; //9 is the largest

    pq.pop(); //9 leaves

    cout<<pq.top()<<'\n';
    cout<<pq.size();

    return 0;
}
```
Output:
`9`
`5`
`2`

We pushed the numbers in the order 3, 9, 5, and the queue handed back 9 first. The order of arrival does not matter at all - only the value does.

### Emptying it out

If we keep taking the top element until nothing is left, we get every element in decreasing order:

Example:
~!
```c++
int main(){

    priority_queue<int> pq;

    pq.push(4);
    pq.push(1);
    pq.push(7);
    pq.push(1);

    while(!pq.empty()){

        cout<<pq.top()<<'\n';
        pq.pop();
    }

    return 0;
}
```
Output:
`7`
`4`
`1`
`1`

### The smallest on top

By default the largest element is on top. Very often we want the opposite, so C++ lets us say so when we declare the queue:

Example:
~!
```c++
int main(){

    priority_queue<int, vector<int>, greater<int>> pq;

    pq.push(4);
    pq.push(1);
    pq.push(7);

    cout<<pq.top()<<'\n'; //now the smallest is on top

    pq.pop();

    cout<<pq.top();

    return 0;
}
```
Output:
`1`
`4`

That declaration is long, so it is worth reading it once slowly:

`priority_queue<int, vector<int>, greater<int>> pq`

- `vector<int>` is the container the queue stores its elements in, and it is always written like that.
- `greater<int>` is the comparison it uses, and that is the part we actually changed. (Writing `less<int>` there would give us the default behavior back)
### Why not just sort?

Everything so far could have been done with a single `sort` at the start. The priority queue earns its place when **new elements appear while we are already processing**.

Here is the classic example. We have several ropes and we want to tie them all into one. Tying two ropes costs the sum of their lengths, and the result is a new, longer rope that can be tied again. We want the cheapest total cost, and the way to get it is to always tie the two shortest ropes we currently have:

Example:
~!
```c++
int main(){

    priority_queue<int, vector<int>, greater<int>> pq;

    pq.push(4);
    pq.push(3);
    pq.push(2);
    pq.push(6);

    int cost = 0;

    while(pq.size() > 1){

        int a = pq.top();
        pq.pop();
        int b = pq.top();
        pq.pop();

        cost += a + b;
        pq.push(a + b); //the new rope goes back in
    }

    cout<<cost;

    return 0;
}
```
Output:
`29`

We start with 2 and 3, which cost 5 and leave us with a rope of length 5. Now the two shortest are 4 and 5, then 6 and 9. A sorted array cannot follow this, because the rope of length 5 did not exist when we sorted. The priority queue puts it in the right place for us, in O(log n).

	![[priority-queue-ropes.png|The rope joining problem over four steps, each taking the two shortest ropes from the priority queue and pushing their sum back, with newly created lengths marked new, for a total cost of 29]]

>Note:
>`top()` and `pop()` on an empty priority queue are undefined behaviour, exactly like `front()` on an empty queue. In a loop like `while(pq.size() > 1)` it is easy to pop one element too many - check `empty()` when in doubt.
