>U ovoj lekciji upoznaćemo se sa ugrađenim funkcijama binarne pretrage

Iako je veoma važno razumeti kako algoritam binarne pretrage radi, kada nam treba njegova najosnovnija verzija, i brže i pametnije je koristiti ugrađene funkcije

Postoje tri takve funkcije, i baš kao `sort()`, primaju opseg `a.begin(), a.end()` i rade samo kada je niz **sortiran**.
### binary_search

Kod: `binary_search(a.begin(), a.end(), k)` 

Ova verzija vraća `true` ako `k` postoji u nizu, `false` u suprotnom.

### lower_bound

Ovo je funkcija koju ćeš najviše koristiti.

Kod: `lower_bound(a.begin(), a.end(), k)` 

Ova verzija pronalazi **prvi element koji je >= k**.

Zanimljivo je to što ne vraća indeks, već **pokazivač** (istu vrstu stvari kao `a.begin()`). Da bismo ga pretvorili u indeks, oduzimamo početak niza:

`int i = lower_bound(a.begin(), a.end(), k) - a.begin();`

Zamisli to kao kućne brojeve, pokazivač je adresa kuće. `a.begin()` je početak ulice, pa je njihova razlika kućni broj.

### upper_bound

Kod: `upper_bound(a.begin(), a.end(), k)` 

Skoro je ista kao i lower_bound, ali pronalazi prvi element koji je **strogo veći od k** ( >k ).

Evo primera kako rade za vrednost `3` u nizu ispod, `lower_bound` pokazuje na **početak** trojki, a `upper_bound` na mesto odmah **posle njihovog kraja**.
 
| indeks   | 0   | 1           | 2     | 3           | 4   | 5   |
| -------- | --- | ----------- | ----- | ----------- | --- | --- |
| vrednost | 1   | **3**       | **3** | 5           | 8   | 10  |
|          |     | lower_bound |       | upper_bound |     |     |

	![[lower-upper-bound.png|Sortiran niz 1 3 3 5 8 10 sa lower_bound na indeksu 1 gde blok trojki počinje i upper_bound na indeksu 3 odmah iza njegovog kraja, pa je njihova razlika 2 broj pojavljivanja trojke]]

To nam otkriva koristan trik - broj pojavljivanja vrednosti `k` je prosto `upper_bound - lower_bound` (veličina tog bloka)!

Sve tri funkcije rade u vremenskoj složenosti **O(log n)** po pozivu.
### Elementi kojih nema u nizu?

Kada nijedan element ne zadovoljava uslov, obe funkcije vraćaju `a.end()` - jednu poziciju **iza poslednjeg elementa**. Tako da je indeks koji dobijemo jednak `a.size()`.

>Uvek proveri ovaj slučaj pre nego što iskoristiš rezultat kao indeks. `if(i == a.size())` znači "nije pronađeno", a čitanje `a[i]` će izazvati grešku!

### Za kraj

Većina zadataka koji koriste binarnu pretragu u rešenju će ili zahtevati posebnu funkciju (kao što smo radili u ranijoj lekciji), ili će zahtevati `lower_bound()` za pronalaženje određenog indeksa. Zato je važno poznavati je.
