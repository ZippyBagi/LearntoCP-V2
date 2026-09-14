>In this lesson we will learn how to use custom structs for built in functions and data structures

Sometimes when solving problems, we want to define and create custom structures. This helps us write clearer and faster solutions.

But c++ doesn't know how to compare these custom structures - That is why we need **operator overloading**

### Structs

We have already met the `pair`, which glues two values together. A **struct** is the same idea without the limits: as many values as we want, each one with a real name.

We define it above `main()`, and from then on it behaves like any other type:
~!
```c++
struct contestant{

    string name;
    int points;
};

int main(){

    contestant a;
    a.name = "Ana";
    a.points = 250;

    contestant b = {"Marko", 300}; //shorter way

    cout<<a.name<<" "<<a.points<<'\n';
    cout<<b.name<<" "<<b.points;

    return 0;
}
```

Output:
`Ana 250`
`Marko 300`

The fields are reached with a dot, exactly like `.first` and `.second` on a pair. 
### What is overloading

When we write `a < b` for two `int`s, c++ knows what to do. When we write it for two `contestant`s, we get an error: `no match for 'operator<'`.

**Overloading** means giving an operator that already exists (`<`, `>`, `==`, `+`, ...) a meaning for a type we wrote ourselves.

It is worth doing because the whole standard library rests on one single operator - `<`. 

`sort` orders with it, `set` and `map` keep their elements sorted with it and `priority_queue` picks its top with it.

### How to do it

The operator is written as a function inside the struct:
~!
```c++
struct contestant{

    string name;
    int points;

    bool operator<(const contestant& other) const{

        return points > other.points; //more points goes first
    }
};
```

Two things are worth reading slowly:

- `operator<` is the name of the function. It is what runs when we write `a < b`.
- The left side of the `<` is the struct we are inside of, so its fields are simply `name` and `points`. The right side arrives as `other`, and we reach its fields with `other.name` and `other.points`.

Then comes the most important part: **`a < b` must return `true` when `a` is supposed to come before `b`**. It says nothing about being smaller.

For us, coming first means having more points, so `<` returns `points > other.points`.

A smart way to think about it is reading the operator as "comes before" instead of "is less than".

Now `sort` needs no compare function at all:
~!
```c++
struct contestant{

    string name;
    int points;

    bool operator<(const contestant& other) const{

        return points > other.points; //more points goes first
    }
};

int main(){

    vector<contestant> v = {{"Ana", 250}, {"Marko", 300}, {"Jovan", 180}};

    sort(v.begin(), v.end());

    for(int i=0;i<v.size();i++){
        cout<<v[i].name<<" "<<v[i].points<<'\n';
    }

    return 0;
}
```
Output:
`Marko 300`
`Ana 250`
`Jovan 180`

The vector came out ordered by points, from the winner down, and `sort` was called the same way we call it on a vector of numbers.

>When we want to use `greater<struct>`, we need to overload `>` as well 