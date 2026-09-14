>U ovoj lekciji ćemo naučiti operacije koje direktno utiču na bitove nekog broja!

Kao što već znamo, celi brojevi u programima predstavljeni su nizom `0` i `1`, najčešće u 32-bitnom ili 64-bitnom obliku.

Postoje operacije koje rade upravo sa tim bitovima i menjaju ih na različite načine.

Kada radite sa bitwise operacijama, najbolje je koristiti **unsigned integer** tipove!

### Bitwise Not (`~`)

Operator bitwise not jednostavno obrće sve bitove nekog broja.

Na primer:

Ako imamo `a = 1001`
Onda je `~a = 0110`

Kod:
~!
```c++
int main(){

    unsigned int a =1;

	cout<<a<<'\n';
	cout<<~a;
}
```
Izlaz:
`1`
`4294967294`

Pošto je: `1 = 0000 0000 0000 0000 0000 0000 0000 0001`
A :`4294967294 = 1111 1111 1111 1111 1111 1111 1111 1110`

### Bitwise Shift (`>>`, `<<`)

Bitwise shift pomera sve bitove nekog broja ulevo ili udesno. Možemo da odredimo za koliko mesta će se bitovi pomeriti.

Primer:

`a = 0011`
`a << 2 = 1100`

Ili:

`a = 0111`
`a >> 1 = 0011`

Ako neki bitovi izađu van opsega (out of bounds), praktično se brišu. Njihovo mesto popunjavaju nule, bilo sa leve ili sa desne strane.

Kod:
```c++
int main(){

    unsigned int a =1;
    unsigned int b = a<<3;

	cout<<a<<'\n';
	cout<<b;
}
```
Izlaz:
`1`
`8`

Pošto je: `1 = 0000 0000 0000 0000 0000 0000 0000 0001`

A: `8 = 0000 0000 0000 0000 0000 0000 0000 1000`

>Zanimljiva stvar kod shift operacija je to što pomoću njih veoma lako možemo dobiti stepene broja 2, jer je `2^x` isto što i `1 << x`.
>
>To je zato što radimo u binarnom sistemu, a pomeranje ulevo za jednu poziciju množi broj sa 2 (pod uslovom da ima dovoljno mesta da rezultat stane u dati tip podatka).

### Bitwise AND (`&`)

Bitwise and (ne treba ga mešati sa logičkim operatorom `&&`) radi sa dva broja i za svaki bit izvršava sledeću operaciju:

- Uporedi `i-ti` bit prvog broja sa `i-tim` bitom drugog broja
- Ako su oba bita `1`, rezultat je `1`, u suprotnom je `0`

Primer:

`a = 1001`
`b = 1110`

`a & b = 1000`

>To znači da `&` može da služi kao maska, tako što propušta samo određene bitove. Ovo je veoma važna osobina koju treba zapamtiti.

Kod:
```c++
int main(){

    unsigned int a =12;
    unsigned int b = 6;

    unsigned int c = a & b;

	cout<<c;
}
```
Izlaz: `4`

Pošto je:

`a = 12 = 0000 0000 0000 0000 0000 0000 0000 1100`
`b = 6 = 0000 0000 0000 0000 0000 0000 0000 0110`

`c = a & b = 0000 0000 0000 0000 0000 0000 0000 0100 = 4`

>Još jedna korisna stvar je da za unsigned brojeve važi: `a & b <= min(a, b)`

### Bitwise OR (`|`)

Bitwise or (ne treba ga mešati sa logičkim operatorom `||`) takođe radi sa dva broja i za svaki bit radi sledeće:

- Uporedi `i-ti` bit prvog broja sa `i-tim` bitom drugog broja
- Ako su oba bita `0`, rezultat je `0`, u svim ostalim slučajevima rezultat je `1`

Primer:

`a = 1001`
`b = 1110`

`a | b = 1111`

~!
```c++
int main(){

    unsigned int a =12;
    unsigned int b = 6;

    unsigned int c = a | b;

	cout<<c;
}
```
Izlaz: `14`

Pošto je:

`a = 12 = 0000 0000 0000 0000 0000 0000 0000 1100`
`b = 6 = 0000 0000 0000 0000 0000 0000 0000 0110`

`c = a | b = 0000 0000 0000 0000 0000 0000 0000 1110 = 14`

### Bitwise XOR (`^`)

Bitwise xor je veoma zanimljiva operacija. Radi sa dva broja i za svaki bit radi sledeće:

- Uporedi `i-ti` bit prvog broja sa `i-tim` bitom drugog broja
- Ako su bitovi različiti, rezultat je `1`, u suprotnom je `0`

Primer:

`a = 1001`
`b = 1110`

`a ^ b = 0111`

Kod:
~!
```c++
int main(){

    unsigned int a =12;
    unsigned int b = 6;

    unsigned int c = a ^ b;

	cout<<c;
}
```
Izlaz: `10`

Pošto je:

`a = 12 = 0000 0000 0000 0000 0000 0000 0000 1100`
`b = 6 = 0000 0000 0000 0000 0000 0000 0000 0110`

`c = a ^ b = 0000 0000 0000 0000 0000 0000 0000 1010 = 10`

>XOR ima mnogo zanimljivih osobina. Jedna od najvažnijih je da pomoću njega možemo da povratimo jedan operand ako znamo drugi operand i rezultat XOR operacije.
>
>Ako važi: `c = a ^ b`
>onda važi i: `a = c ^ b`
>i: `b = c ^ a`

Još neke korisne osobine su:

`x ^ x = 0` (Ako XOR-ujemo broj sam sa sobom, dobijamo `0`.)

I:

`x ^ 0 = x` (Ako XOR-ujemo broj sa `0`, dobijamo isti taj broj.)

	![[bitwise-ops.png|Četiri bitovske operacije primenjene na a = 1001 i b = 1110 kolonu po kolonu: AND daje 1000, OR daje 1111, XOR daje 0111, a NOT nad a daje 0110]]

### Napomena:

Možemo koristiti i skraćeni zapis sa operatorom dodele:

`a &= b;` isto što i `a = a & b;`
`a |= b;` isto što i `a = a | b;`
`a ^= b;` isto što i `a = a ^ b;`
`a <<= n;` isto što i `a = a << n;`
`a >>= n;` isto što i `a = a >> n;`