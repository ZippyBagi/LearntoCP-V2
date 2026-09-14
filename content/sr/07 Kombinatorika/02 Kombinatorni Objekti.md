> Do sada smo brojali ručno, odluku po odluku. Neka pitanja se u prebrojavanju javljaju toliko često da su dobila svoja imena i gotove formule. U ovoj lekciji upoznajemo četiri takva pojma: permutacije, varijacije, kombinacije i podskupove.

Sve što sledi izvodi se iz pravila množenja, tako da ne uvodimo ništa novo - samo isti posao odradimo jednom i zapamtimo rezultat.

### Faktorijel

Pre samih objekata, potrebna nam je jedna oznaka.

**Faktorijel** prirodnog broja `n`, koji pišemo `n!` i čitamo "en faktorijel", je proizvod svih brojeva od 1 do `n`:

$$n! = 1 * 2 * 3 * ... * (n - 1) * n$$

Znači `4!` je $1 * 2 * 3 * 4 = 24$, a `6!` je $1 * 2 * 3 * 4 * 5 * 6 = 720$.

Postoji jedan poseban slučaj koji vredi zapamtiti: **0! = 1**. Deluje čudno, ali to je jedina vrednost sa kojom formule iz nastavka lekcije rade kako treba, a ima i smisla sama po sebi - postoji tačno jedan način da ne rasporedimo ništa.

Korisno je primetiti da svaki faktorijel u sebi sadrži prethodni:

$$n! = n * (n - 1)!$$

Zbog toga se lako računa petljom:

~!
```cpp
long long faktorijel(int n) {
    long long rezultat = 1;
    for (int i = 2; i <= n; i++) {
        rezultat *= i;
    }
    return rezultat;
}
```

Faktorijeli rastu izuzetno brzo:

| n   | n!                        |
| --- | ------------------------- |
| 1   | 1                         |
| 5   | 120                       |
| 10  | 3 628 800                 |
| 15  | 1 307 674 368 000         |
| 20  | 2 432 902 008 176 640 000 |

`20!` je najveći faktorijel koji još uvek staje u `long long`. `21!` se preliva. U praksi to znači da će zadatak, kad god traži prebrojavanje čiji odgovor uključuje faktorijele, skoro uvek tražiti rezultat po modulu nekog broja.

### Permutacije

**Permutacija** je raspored elemenata nekog skupa u neki redosled. Dve permutacije koje sadrže iste elemente u različitom redosledu su različite permutacije.

Uzmimo slova `A`, `B`, `C`. Svi načini da ih poređamo su:

`ABC`, `ACB`, `BAC`, `BCA`, `CAB`, `CBA`

Ima ih šest. Da vidimo zašto, popunjavajući tri mesta sleva nadesno:

- na prvo mesto može bilo koje od 3 slova
- kada je ono zauzeto, na drugo mesto može bilo koje od preostala 2 slova
- na trećem mestu mora da završi 1 slovo koje je ostalo

Po pravilu množenja to je $3 * 2 * 1 = 6$, a to je upravo `3!`.

Isto razmišljanje radi za bilo koje `n`, pa važi:

> Skup od `n` različitih elemenata može da se poređa na `n!` različitih načina.

### Varijacije

Ponekad ne raspoređujemo sve - uzimamo samo `k` elemenata od njih `n` i njih poređamo. To se zove **varijacija**, ili `k`-permutacija.

Na trci je 5 takmičara, a nas zanima koliko različitih postolja je moguće - ko osvaja zlato, srebro i bronzu. Preostala dva takmičara se uopšte ne pojavljuju na postolju.

Popunjavamo tri mesta na postolju jedno po jedno:

- zlato: 5 mogućnosti
- srebro: 4 mogućnosti, jer pobednik više nije na raspolaganju
- bronza: 3 mogućnosti

$$5 * 4 * 3 = 60$$

Primeti da je proizvod $5 * 4 * 3$ zapravo `5!` kome je odsečen rep $2 * 1$, a taj rep je `2!`, faktorijel takmičara koje nismo rasporedili. Deljenjem njime uklanjamo tačno te činioce:

$$\frac{5!}{2!} = \frac{120}{2} = 60$$

Kao formula:

$$V(n, k) = \frac{n!}{(n-k)!}$$
Permutacije su poseban slučaj u kome ostataka nema, $k = n$. Tada je $\frac{n!}{0!} = n!$, i tu se vidi zašto nam je `0! = 1` bilo potrebno.

### Kombinacije

Sada isto pitanje, ali redosled prestaje da bude bitan.

Iz grupe od 5 ljudi biramo tim od 3 člana. Tim je grupa - Ana, Bojan i Ceca su isti tim bez obzira kojim ih redom nabrojimo.

To je jedina razlika, i ona nam tačno govori šta treba da ispravimo. Varijacija svaki tim posmatra kao više različitih rezultata, po jedan za svaki redosled kojim su njegovi članovi mogli da budu izabrani. Zato taj redosled delimo.

Krećemo od broja varijacija za n i k `V(n,k)`, i prosto podelimo sve ponovljene redoslede.

A već znamo na koliko načina može da se poređa `k` elemenata - (to je prosto broj permutacija od `k`!)

$$\frac{V(n,k)}{k!} = \frac{n!}{k! * (n-k)!}$$

	![[combinations-from-variations.png|Šest rasporeda elemenata A, B i C se deljenjem sa 3 faktorijel svode na jedan isti tim A B C, čime V(5,3) = 60 podeljeno sa 3! daje C(5,3) = 10]]

### En nad ka

Biranje grupe od `k` elemenata iz njih `n` je toliko često pitanje da izraz odozgo ima svoju oznaku:

$$\binom{n}{k} = \frac{n!}{k! * (n-k)!}$$

Čita se "en nad ka", a to je baš ono što i opisuje - broj načina da se izabere `k` elemenata iz njih `n`. Sretaćeš i zapis $C(n, k)$.

Kad god zadatak pita na koliko načina možemo da izaberemo neku grupu, a premeštanje elemenata unutar te grupe ne daje ništa novo, odgovor je `n nad k`. Prepoznati to je najveći deo posla.

Vredi znati dve osobine.

$$\binom{n}{k} = \binom{n}{n-k}$$

Svaki put kada biraš koje elemente uzimaš, istovremeno biraš i koje ostavljaš. To je isti čin gledan sa dve strane, pa mora da ima isti broj ishoda. Izabrati 3 osobe za tim od njih 5 je isto što i izabrati 2 koje ostaju napolju. I formula se slaže - `k!` i `(n-k)!` stoje na istom mestu, pa njihova zamena ništa ne menja.

$$\binom{n}{0} = \binom{n}{n} = 1$$

Postoji jedan način da ne uzmemo ništa, i jedan način da uzmemo sve.

### Podskupovi

Na kraju, izbacimo i zahtev za veličinom. **Podskup** je bilo koji izbor elemenata iz skupa - bilo koje veličine, bez obzira na redosled.

Skup `{A, B, C}` ima ove podskupove:

`{}`, `{A}`, `{B}`, `{C}`, `{A,B}`, `{A,C}`, `{B,C}`, `{A,B,C}`

Ima ih osam, uključujući i prazan skup i ceo skup - oba se računaju kao podskupovi.

Da bismo ih prebrojali, prolazimo kroz elemente jedan po jedan i za svaki odlučujemo da li ulazi. To je `n` nezavisnih odluka da/ne, pa po pravilu množenja imamo:

$$2 * 2 * ... * 2 = 2^n$$

	![[subsets-decisions.png|Binarno stablo odluka nad tri elementa A, B i C, gde svaki nivo odgovara na pitanje unutra ili napolju, a osam listova su osam podskupova, svaki označen binarnim brojem koji te odluke ispisuju]]

> Skup od `n` elemenata ima $2^n$ podskupova.

O podskupovima možemo da razmišljamo i kao o načinima da dobijemo novi skup, tako što iz originalnog skupa obrišemo neke elemente (moguće i 0 njih).

### Rezime

	![[combinatoric-objects.png|Četiri polja koja porede permutacije, varijacije, kombinacije i podskupove elemenata A B C D, gde svako navodi da li je redosled bitan, koliko elemenata se uzima, formulu za prebrojavanje i konačan broj]]

Kada naiđeš na zadatak sa prebrojavanjem, dva pitanja te obično odvedu do pravog reda: **da li je redosled bitan**, i **da li je veličina fiksirana**.

> Nemoj da učiš ove formule napamet, nego ih zaista razumi i nauči da ih izvedeš u hodu. Posmatraj ih kao načine razmišljanja, a ne kao formule!
