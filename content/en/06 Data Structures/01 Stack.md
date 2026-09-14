>In this lesson we will learn about our first real data structure - the Stack!

Imagine a stack of plates. You can only do two things with it:

- put a new plate **on top**
- take the plate **from the top**

You can't pull a plate from the middle without everything crashing down. That is the entire idea of a **stack**: the last element that came in is the first one to come out (**LIFO** - Last In, First Out).

	![[stack.png|A stack across five steps of pushes and one pop, with each element added on top of the previous ones and top() always pointing at the most recently pushed value]]

### The functions

C++ gives us a ready-made `stack`, with these operations:

| Function | What it does | Complexity |
| ---- | ---- | ---- |
| `push(x)` | puts `x` on top | O(1) |
| `pop()` | removes the top element | O(1) |
| `top()` | returns the top element (without removing it) | O(1) |
| `empty()` | returns `true` if the stack is empty | O(1) |
| `size()` | returns the number of elements | O(1) |

Everything is **O(1)** - that is what makes stacks so useful.

Initialization: `stack<int> st`

Example:
~!
```c++
int main(){

    stack<int> st;

    st.push(3);
    st.push(7);
    st.push(5);

    cout<<st.top()<<'\n'; //5 is on top

    st.pop(); //5 leaves

    cout<<st.top()<<'\n'; //now 7 is on top
    cout<<st.size();

    return 0;
}
```
Output:
`5`
`7`
`2`

>Note:
>`pop()` does **not** return the removed element, and calling `top()` or `pop()` on an empty stack crashes the program. Always check `empty()` first when you are not sure!

>Note:
>A stack is the right tool whenever the **most recent** thing is the first one we need to deal with. Keep that in mind, it will come up again and again.