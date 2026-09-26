A TV channel is airing a movie marathon tonight. The schedule lists $n$ movies, and for each movie the time it starts and the time it ends. You want to watch as many movies as possible, but only **whole** movies - no skipping parts, no watching two at once.

The moment one movie ends, you are free to start another one (a movie that starts exactly when the previous one ends is fine).

Formally, given $n$ intervals, find the largest number of them that can be chosen so that no two chosen intervals overlap.

## Input

First line of input will be a single number $n$, the number of movies.
In the next $n$ lines will be two numbers $a_i$ and $b_i$, the start and end time of each movie.

## Output

A single number - the largest number of whole movies you can watch.

## Example

```Input
4
1 3
2 5
4 7
6 9
```

```Output
2
```

You watch the movie $1 \rightarrow 3$, skip $2 \rightarrow 5$ (it already started while you were watching), watch $4 \rightarrow 7$, and skip $6 \rightarrow 9$. Two movies.

## Constraints

$1 \le n \le 2 \cdot 10^5$
$0 \le a_i < b_i \le 10^9$
