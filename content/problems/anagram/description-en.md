Two phrases are **anagrams** if one can be turned into the other by rearranging its letters. Characters that are not letters - spaces and punctuation - are ignored completely.

Your task is to check, for each given pair of phrases, whether they are anagrams.

## Input

First line of input will be a single integer $t$ - the number of testcases.
Each testcase consists of two lines, one phrase per line. The phrases are made of lowercase English letters, spaces and punctuation marks (such as `. , ! ? ' -`).

## Output

For every testcase print `YES` if the two phrases are anagrams, and `NO` otherwise.

## Example

```Input
2
panta redovno zakasni
neopravdan izostanak
oni su skrsili vagu
suvisni kilogrami
```

```Output
YES
NO
```

In the first testcase both phrases use exactly the letters of "neopravdan izostanak". In the second the letter counts differ.

## Constraints

$1 \le t \le 100$
Each line has at most $10^5$ characters.

---

*This problem was adapted, with permission, from [Anagram](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/anagram), authored by Društvo matematičara Srbije and Fondacija Petlja.*
