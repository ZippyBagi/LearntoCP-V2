> U ovoj lekciji upoznaćemo se sa brojevnim sistemima, kao i sa binarnim brojevima!

Brojevi koje koristimo u svakodnevnom životu izgledaju ovako:

`1, 5, 12, 136, 123, itd...`

Da bismo zapisali ove brojeve, koristimo **brojevne sisteme**.

Ali šta je zapravo brojevni sistem?

## Brojevni sistemi

Brojevni sistem je način na koji zapisujemo brojeve.

Svi znamo da broj `123` predstavlja sto dvadeset tri, zato što se cifra `1` nalazi na mestu stotina, `2` na mestu desetica, a `3` na mestu jedinica.

Kada vidimo ovaj broj, u glavi radimo sledeće:

`123 = 100 * 1 + 10 * 2 + 1 * 3`

Primetite da su **1, 10 i 100 stepeni broja 10**. To je zato što koristimo **dekadni sistem**, odnosno **brojevni sistem sa osnovom 10**.

Na sličan način, broj `123` bi u sistemu sa osnovom 8 predstavljao broj osamdeset tri, jer važi:

`8^2 * 1 + 8^1 * 2 + 8^0 * 3 = 83`

> Napomena:
> Vodeće nule ne menjaju vrednost broja, bez obzira na brojevni sistem. Na primer, `0083` predstavlja isto što i `83`.

#### Binarni sistem

Jedan od najčešće korišćenih brojevnih sistema je binarni sistem (sistem sa **osnovom 2**). U ovom sistemu svaki broj se zapisuje koristeći samo cifre `0` i `1`.

U takmičarskom programiranju, razumevanje binarnih brojeva je veoma važno - koriste se kako u rešavanju zadataka, tako i za razumevanje mnogih važnih koncepata. Takođe, računari upravo na ovaj način čuvaju informacije!

Zato bi trebalo da umemo da pretvaramo brojeve iz dekadnog sistema u binarni, ali i obrnuto.

#### Pretvaranje iz binarnog u dekadni sistem

Broj `1001 1101` u binarnom sistemu predstavlja:

`128 * 1 + 64 * 0 + 32 * 0 + 16 * 1 + 8 * 1 + 4 * 1 + 2 * 0 + 1 * 1`

`= 128 + 16 + 8 + 4 + 1`

`= 157`

	![[binary-place-value.png|Binarni broj 1001 1101 gde je svaka od osam pozicija označena svojim stepenom dvojke, pozicije sa jedinicom su istaknute, a njihove vrednosti 128 + 16 + 8 + 4 + 1 daju zbir 157]]

### Pretvaranje iz dekadnog u binarni sistem

Da bismo broj pretvorili u binarni zapis, možemo krenuti od najvećeg stepena broja 2 koji može da "stane" u naš broj.

Ako može, oduzimamo ga i zapisujemo `1`. Ako ne može, zapisujemo `0`. Zatim nastavljamo sa sledećim manjim stepenom broja 2.

Pogledajmo primer za broj `121`:

| Stepen broja 2 | Staje? | Bit | Trenutni broj |
| -------------- | ------- | --- | -------------- |
| 128            | Ne      | 0   | 121            |
| 64             | Da      | 1   | 121 - 64 = 57  |
| 32             | Da      | 1   | 57 - 32 = 25   |
| 16             | Da      | 1   | 25 - 16 = 9    |
| 8              | Da      | 1   | 9 - 8 = 1      |
| 4              | Ne      | 0   | 1              |
| 2              | Ne      | 0   | 1              |
| 1              | Da      | 1   | 1 - 1 = 0      |
Rezultat je: `0111 1001`, odnosno `111 1001`.

Još jedan čest način za pretvaranje dekadnog broja u binarni jeste uzastopno deljenje sa brojem `2` i čuvanje ostataka.

Primer:

| Deljenje | Količnik | Ostatak |
| --------- | -------- | -------- |
| 121 ÷ 2   | 60       | 1        |
| 60 ÷ 2    | 30       | 0        |
| 30 ÷ 2    | 15       | 0        |
| 15 ÷ 2    | 7        | 1        |
| 7 ÷ 2     | 3        | 1        |
| 3 ÷ 2     | 1        | 1        |
| 1 ÷ 2     | 0        | 1        |
Da bismo dobili binarni zapis, ostatke čitamo **odozdo nagore**: `111 1001`

Koristite metodu koja vam deluje jednostavnije.

> Napomena:
> Binarni brojevi se često pišu grupisani po 4 bita, isključivo radi preglednosti. Zapisi `0111 1001` i `01111001` predstavljaju potpuno isti broj.

### Operacije nad binarnim brojevima

Sve standardne operacije (sabiranje, oduzimanje, množenje i deljenje) funkcionišu na isti način kao i u dekadnom sistemu.

`101` + `011` = `1000`  
`101` - `011` = `010`  
`101` * `011` = `1111`  
`101` / `011` = `1`

Postoje različiti trikovi i algoritmi koji omogućavaju efikasno izvršavanje ovih operacija direktno nad binarnim brojevima.

Ipak, najjednostavniji način da ih razumemo jeste da binarne brojeve prvo pretvorimo u dekadne, izvršimo željenu operaciju, a zatim rezultat ponovo pretvorimo u binarni zapis.