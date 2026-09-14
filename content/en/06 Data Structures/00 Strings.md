>In this lesson we will take a proper look at strings - how they work under the hood, and the tools C++ gives us for them!

We have been using `string` since the very first lesson, but only to read and print text. Time to see what it can really do.

The most useful mental model: **a string is just a vector of characters**. Almost everything you know about vectors applies directly.
### The basics

~!
```c++
int main(){

    string a = "learn";
    string b = "cp";

    string c = a + " to " + b; //concatenation with +

    cout<<c<<'\n';
    cout<<c.size()<<'\n'; //length, just like a vector
    cout<<c[0]<<'\n'; //indexing, just like a vector

    c[0] = 'L'; //we can also change individual characters

    cout<<c<<'\n';
    cout<<c.substr(6, 2); //2 characters, starting from index 6

    return 0;
}
```
Output:
`learn to cp`
`11`
`l`
`Learn to cp`
`to`

The only newcomer here is `substr(start, length)` - it returns a piece of the string. Careful, it is not free: copying out a piece takes **O(length)**.

>Note:
>`cin>>s` reads a single word (it stops at the first space). To read a whole line, spaces included, use `getline(cin, s)`.

### Characters are numbers

A computer can't actually store "characters" - it only stores numbers. So a long time ago, programmers agreed on a table that assigns a number (a code) to every character. That table is called **ASCII**, and when we write `'4'` in code, the computer really sees its ASCII code - the number `52`.

The important part is how the codes were assigned. For example the digits `0` to `9` got the codes `48` to `57` - they sit **next to each other, in order**:

![[ascii-table-en.png|A two row table pairing the characters '0' through '9' with their consecutive ASCII codes 48 through 57]]

And that enables a classic trick:

`s[i] - '0'`

Since the codes sit in order, subtracting them cancels out the offset: `'4' - '0'` is really `52 - 48 = 4`. We get the actual number the digit represents!

~!
```c++
int main(){

	string s = "42";

	cout<<s[0] - '0'<<'\n'; //'4' - '0'
	cout<<s[1] - '0'; //'2' - '0'

	return 0;
}
```
Output:
`4`
`2`

And it works the other way around too - `'0' + i` turns a number back into a digit character: `char c = '0' + 7;` gives us `'7'`.

>Note:
>The same trick works for letters - `a` to `z` also sit next to each other in the ASCII table (codes `97` to `122`), so `s[i] - 'a'` converts a lowercase letter into a number from `0` to `25`. That lets letters be used as **indices**, exactly like in Counting Sort.

### Comparing and sorting

Strings are compared **lexicographically** - dictionary order. Character by character, and the first difference decides. All the usual operators work: `==`, `<`, `>`.

This means we can `sort()` strings out of the box - and even sort the characters **inside** a string:

~!
```c++
int main(){

    vector<string> words = {"banana", "apple", "cherry", "app"};

    sort(words.begin(), words.end()); //dictionary order

    for(int i=0;i<words.size();i++){
        cout<<words[i]<<'\n';
    }

    string s = "cba";
    sort(s.begin(), s.end()); //a string is a vector of characters, remember?

    cout<<s;

    return 0;
}
```
Output:
`app`
`apple`
`banana`
`cherry`
`abc`

Notice `app` comes before `apple` - when one string is a prefix of another, the shorter one is considered smaller.

>Note:
>Comparing two strings is **O(n)**, not O(1)! It looks like a single innocent `==`, but under the hood it walks through the characters. Easy to forget when estimating complexity.