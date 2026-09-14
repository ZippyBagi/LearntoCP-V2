> U ovoj lekciji proći ćemo kroz nekoliko osnovnih matematičkih ideja koje nam mogu pomoći da optimizujemo naša rešenja.

### Zbir brojeva od 1 do n

Recimo da imamo niz brojeva:

`1, 2, 3, ..., n-2, n-1, n`

i želimo da pronađemo njihov zbir.

Najintuitivniji pristup je da sabiramo svaki broj pojedinačno:

`1 + 2 + 3 + ... + n-2 + n-1 + n`

Međutim, ovaj pristup je prilično spor - potrebno nam je **n** operacija, odnosno vremenska složenost je **O(n)**.

Možemo mnogo bolje.

Pogledajmo brojeve od 1 do 100:

![[Sum of elements.jpg|Zbir 1 + 2 + 3 + ... + 98 + 99 + 100 sa ugnežđenim lukovima koji spajaju brojeve sa dva kraja, gde je svaki par označen sa 101]]

Primetićemo da svi brojevi formiraju parove čiji je zbir `101`.

Drugim rečima, imamo `50` parova sa zbirom `101`, pa je ukupan zbir:

`(100/2) * 101 = 5050`

Ako ovu ideju generalizujemo, dobijamo formulu:

**1 + 2 + 3 + ... + n-2 + n-1 + n =** `n * (n + 1) / 2`

Pošto ovu formulu računamo jednom operacijom, vremenska složenost je **O(1)**.

> Napomena:  
> Formula radi i kada je `n` neparan - srednji broj se jednostavno “upari” sam sa sobom.

### Zbir brojeva od x do n

Šta ako želimo da pronađemo zbir brojeva od 24 do 100 (uključujući oba broja)?

Postoje matematičke formule i za ovo, ali postoji jednostavniji i intuitivniji način.

Možemo izračunati:

- zbir brojeva od 1 do 100
- zbir brojeva od 1 do 23  (ne do 24, jer želimo da uključimo 24)

i zatim ih oduzeti.

Od 1 do 100: `(100/2) * 101 = 5050`

Od 1 do 23: `(23/2) * 24 = 276`

Od 24 do 100: `5050 - 276 = 4774`

Kada ovo pretvorimo u formulu, dobijamo:

`Zbir(od x do n) = Zbir(od 1 do n) - Zbir(od 1 do x-1)`

> Ovu ideju je bitno zapamtiti, jer se pojavljuje u dosta drugih tehnika i zadataka.