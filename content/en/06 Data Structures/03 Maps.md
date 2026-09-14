>In this lesson we will learn about a data structure used to efficiently link one value to another - maps (also known as dictionaries or heaps)

Imagine we are given `n` numbers and we have to count how many times each of them appears.

For small numbers we already know the trick from Counting Sort: make an array `cnt` and do `cnt[x]++`. But what if the numbers go up to $10^9$? An array of a billion elements does not fit in memory - even though at most `n` of its slots would ever be used.

What we need is something that stores **only the keys we actually saw**. That is exactly what a **map** does.

	![[map-vs-array.png|A vector of a billion slots with only two of them ever used, drawn above a map holding just the two keys 5 and 1000000000 that actually appeared]]

### Pairs

Before the map itself, we need one small tool: the **pair**. A `pair` glues two values into a single object:

Example:
~!
```c++
int main(){

    pair<string, int> p = {"Ana", 17};

    cout<<p.first<<'\n';  //the first value
    cout<<p.second<<'\n'; //the second value

    p.second = 18; //we can change them

    cout<<p.second;

    return 0;
}
```
Output:
`Ana`
`17`
`18`

The two values do not have to be of the same type, and we reach them with `.first` and `.second`. Pairs can be stored in vectors, compared and sorted (first by `.first`, and only then by `.second`) - but right now we need them for one reason: **a map is built out of pairs**.

### What is a map?

A **map** stores **key - value** pairs. The **key** is what we look something up by, and the **value** is what we get back.

Think of a real dictionary: the word is the key, the definition is the value.

The important part is that the key can be almost anything - a number as large as we want, a string, even a pair. A map does not reserve a slot for every possible key; it keeps only the ones we actually put in.

Initialization: `map<key_type, value_type> m`, for example `map<string, int> age`.

### The functions

| Function | What it does | Complexity |
| ---- | ---- | ---- |
| `m[k]` | the value stored under key `k` | O(log n) |
| `m[k] = v` | stores value `v` under key `k` | O(log n) |
| `count(k)` | returns `1` if key `k` exists, `0` if it does not | O(log n) |
| `erase(k)` | removes key `k` together with its value | O(log n) |
| `size()` | number of keys inside | O(1) |
| `empty()` | returns `true` if the map is empty | O(1) |
| `clear()` | removes everything | O(n) |

Here `n` is the number of keys currently in the map. Notice that nothing is O(1) any more - that log is the price we pay for keys that can be anything.

Example:
~!
```c++
int main(){

    map<string, int> age;

    age["Ana"] = 17;
    age["Marc"] = 20;

    age["Ana"]++; //Ana had a birthday

    cout<<age["Ana"]<<'\n';
    cout<<age.size()<<'\n';
    cout<<age.count("Marc")<<'\n';
    cout<<age.count("John");

    return 0;
}
```
Output:
`18`
`2`
`1`
`0`

### The default value trap

Notice that we wrote `age["Ana"]++` without ever setting `age["Ana"]` to `0` first. That works because a key which has never been used starts at the **default value** of its type - `0` for numbers, an empty string for strings.

Very convenient, but it hides a trap: **simply reading `m[k]` creates the key**.

	![[map-default-trap.png|Three states of a map showing that reading m[7] inserts key 7 with value 0 and grows size from 1 to 2, while m.count(7) answers the same question and leaves the map unchanged]]

Example:
~!
```c++
int main(){

    map<int, int> m;

    m[5] = 1;

    cout<<m.size()<<'\n';

    if(m[7] == 0){ //we only wanted to check!
        cout<<"7 is not here"<<'\n';
    }

    cout<<m.size(); //but 7 got created anyway

    return 0;
}
```
Output:
`1`
`7 is not here`
`2`

That extra key is not just untidy - it costs memory, and it can silently break a loop that goes through the map later. When we only want to check whether a key exists, we use `count(k)`, which never creates anything.

### Counting occurrences

With all of that, the problem from the beginning becomes three lines:

Example:
~!
```c++
int main(){

    vector<int> a = {1000000000, 5, 5, 1000000000, 5};

    map<int, int> cnt;

    for(int i=0;i<a.size();i++){
        cnt[a[i]]++;
    }

    cout<<cnt[5]<<'\n';
    cout<<cnt[1000000000];

    return 0;
}
```
Output:
`3`
`2`

The map holds exactly 2 keys, no matter how large the numbers themselves are. The memory we spend depends on **how many different values** appear, not on how big they are.

### Going through a map

A map keeps its keys **sorted** at all times. Walking through it gives us the keys in increasing order, and every step hands us one pair:

Example:
~!
```c++
int main(){

    map<string, int> cnt;

    cnt["banana"] = 2;
    cnt["apple"] = 5;
    cnt["cherry"] = 1;

    for(auto p : cnt){
        cout<<p.first<<" -> "<<p.second<<'\n';
    }

    return 0;
}
```
Output:
`apple -> 5`
`banana -> 2`
`cherry -> 1`

`auto` tells the compiler to work out the type on its own - here `p` is a pair of a string and an int. Note also that `p` is a **copy** of the pair, so changing it changes nothing inside the map. If we want to modify the values while walking, we write `for(auto &p : cnt)`.

### unordered_map

Keeping everything sorted is not free. When we do not care about the order, `unordered_map` does the same job using a **hash table**:

| | `map` | `unordered_map` |
| ---- | ---- | ---- |
| Order of keys | sorted | arbitrary |
| Lookup, insert, erase | O(log n) | O(1) on average |
| Keys it accepts | anything comparable with `<` | anything hashable (pairs do not work out of the box) |

The interface is identical, we only swap the name: `unordered_map<string, int> age`.

So `unordered_map` is faster on average... . The catch is that O(1) is only an **average**. In the worst case, when many keys land in the same bucket, it degrades all the way to O(n) per operation. On sites where other people write the tests, this is a well known way to break solutions - someone constructs an input in which the keys collide on purpose.

>Note:
>Rule of thumb: reach for `map` when you need the keys in order, or when the keys are pairs. Reach for `unordered_map` when you only need raw speed and nobody is writing tests against you. When in doubt, the honest O(log n) of `map` is the safer choice.