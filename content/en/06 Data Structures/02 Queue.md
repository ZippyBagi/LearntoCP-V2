>In this lesson we will learn about the stack's mirror twin - the Queue!

Last lesson we learned about the stack, where the last element in is the first one out.

A **queue** is the exact opposite - just like a line in front of a store: the first person to arrive is the first person served (**FIFO** - First In, First Out).

New elements enter at the **back**, and leave from the **front**.

	![[queue.png|A queue holding 3, 7, 5 and 9, with push entering at the back next to back() and pop leaving from the front next to front(), and two rows below showing that push order and pop order are identical]]

### The functions

C++ also gives us a ready-made `queue`:

| Function | What it does | Complexity |
| ---- | ---- | ---- |
| `push(x)` | adds `x` to the back | O(1) |
| `pop()` | removes the front element | O(1) |
| `front()` | returns the front element | O(1) |
| `back()` | returns the back element | O(1) |
| `empty()` | returns `true` if the queue is empty | O(1) |
| `size()` | returns the number of elements | O(1) |

Again, everything is **O(1)**.

Initialization: `queue<int> q`

Example:
~!
```c++
int main(){

    queue<int> q;

    q.push(3);
    q.push(7);
    q.push(5);

    cout<<q.front()<<'\n'; //3 came first

    q.pop(); //3 is served and leaves

    cout<<q.front()<<'\n'; //now 7 is at the front
    cout<<q.back()<<'\n'; //5 is at the back
    cout<<q.size();

    return 0;
}
```
Output:
`3`
`7`
`5`
`2`

>Note:
>Just like with the stack: `pop()` does not return the element, and `front()` / `pop()` on an empty queue crashes. Check `empty()` when in doubt!

### A small simulation

Queues shine whenever we process things **in the order they arrived**. Let's simulate the store line directly:

~!
```c++
int main(){

    queue<string> q;

    q.push("Ana");
    q.push("Marc");
    q.push("John");

    while(!q.empty()){ //serve until the line is empty

        cout<<q.front()<<" is served"<<'\n';
        q.pop();
    }

    return 0;
}
```
Output:
`Ana is served`
`Marc is served`
`John is served`

Whoever came first, got served first - the queue keeps the order for us automatically.

### Stack vs Queue

| | Stack | Queue |
| ---- | ---- | ---- |
| Order | LIFO (last in, first out) | FIFO (first in, first out) |
| Add | on top | at the back |
| Remove | from the top | from the front |
| Typical use | "undo", matching brackets, recursion | simulations, processing in arrival order |

>Note:
>The queue and the stack might not look impressive right now, but they become one of the most important data structures when we are talking about graphs, which we will talk about in future lessons.
