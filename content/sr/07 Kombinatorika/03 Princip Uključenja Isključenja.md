> Pravilo sabiranja imalo je jedan strog uslov: grupe koje brojimo nisu smele da se preklapaju. Ova lekcija se bavi time šta radimo kada se ipak preklapaju.

### Kardinalnost

Prvo, jedna reč za ono što stalno prebrojavamo.

**Kardinalnost** skupa je broj elemenata u njemu. Za skup `A` pišemo je kao `|A|`, a ponekad i kao `n(A)`.

Znači, ako je $A = \{2, 4, 6, 8\}$ onda je $|A| = 4$. Ništa više od toga - to je prosto veličina skupa.

### Dva skupa

Recimo da imamo dva skupa, `A` i `B`, i želimo veličinu njihove unije - broj elemenata koji se nalaze u `A`, u `B`, ili u oba.

Prva pomisao je $|A| + |B|$, i ona je pogrešna kad god skupovi dele elemente. Element koji se nalazi u oba skupa biva izbrojan jednom dok brojimo `A`, pa još jednom dok brojimo `B`. Na kraju je izbrojan dvaput, a trebalo je jednom.

Svaki element koji je duplo izbrojan je tačno element skupa $A \cap B$, pa tu grupu oduzmemo jednom i time popravimo štetu:

$$|A \cup B| = |A| + |B| - |A \cap B|$$

	![[inclusion-exclusion-two-sets.png|Venov dijagram sa dva kruga gde je |A| = 5 i |B| = 4, a dva elementa u preseku su izbrojana dvaput, pa je unija 5 plus 4 minus 2, odnosno 7]]

To je cela ideja ovog principa. Dodaj previše, pa vrati nazad ono što si preračunao.

### Tri skupa

Kod tri skupa ista popravka više nije dovoljna, i tu stvar postaje zanimljiva.

Krenimo od $|A_1| + |A_2| + |A_3|$ i zapitajmo se koliko puta je svaki element izbrojan:

- element koji je u tačno 1 skupu izbrojan je 1 put
- element koji je u tačno 2 skupa izbrojan je 2 puta
- element koji je u sva 3 skupa izbrojan je 3 puta

Zato oduzimamo preseke parova, isto kao malopre. Element koji je u tačno 2 skupa pripada tačno jednom paru, pa gubi 1 i završava na 1 - tačno. Ali element koji je u sva 3 skupa pripada svim trima parovima, pa gubi 3 i završava na $3 - 3 = 0$. Sada uopšte nije izbrojan.

Da bismo to ispravili, vraćamo presek sva tri skupa:

$$|A_1 \cup A_2 \cup A_3| = (|A_1| + |A_2| + |A_3|) - (|A_1 \cap A_2| + |A_1 \cap A_3| + |A_2 \cap A_3|) + |A_1 \cap A_2 \cap A_3|$$

Sada je svaki element izbrojan tačno jednom:

	![[inclusion-exclusion-three-sets.png|Venov dijagram sa tri kruga gde je svaka oblast označena brojem skupova kojima pripada, i tabela ispod koja pokazuje da sabiranje pojedinačnih, oduzimanje parova i dodavanje trojke izbroji svaki element tačno jednom]]

Znaci se smenjuju zato što svaki krug popravke premaši cilj, a sledeći ga vrati nazad.

### Opšte pravilo

Šablon se ne zaustavlja na tri skupa. Koliko god da ih imamo, uvek ide isto:

> Saberi veličine svih skupova. Oduzmi preseke svakog para. Vrati preseke svake trojke. Oduzmi preseke svake četvorke. Nastavi da smenjuješ znak sve dok grupe ne postanu velike koliko i broj skupova koje imaš.

To je ceo princip, a ime ga i opisuje - uključujemo i isključujemo sve dok svaki element ne bude izbrojan tačno jednom.

| Veličina grupe | Šta radimo sa njom |
| -------------- | ------------------ |
| 1 skup         | dodajemo           |
| 2 skupa        | oduzimamo          |
| 3 skupa        | dodajemo           |
| 4 skupa        | oduzimamo          |

Grupe neparne veličine se dodaju, a grupe parne veličine se oduzimaju.

Vredi primetiti koliko je ovo posla. Svaka moguća grupa skupova pojavljuje se negde u toj sumi, a iz prošle lekcije znamo koliko ih ima. Sa 3 skupa dobijamo 7 članova, koje smo bez problema ispisali ručno. Sa 20 skupova dobili bismo preko milion.

### Kada sve grupe imaju istu veličinu

Nabrajanje svakog preseka posebno je potrebno samo kada se oni zaista razlikuju. Vrlo često se ne razlikuju, i tada postoji prečica.

Ana, Bojan i Ceca ostave kapute u restoranu, a na izlasku svako od njih uzme jedan nasumično. U koliko od mogućih ishoda bar jedna osoba dobije svoj kaput?

Ishod je cela podela - ko je sa kojim kaputom otišao. Naša tri skupa su ishodi u kojima je Ana dobila svoj kaput, u kojima je Bojan dobio svoj, i u kojima je Ceca dobila svoj.

Da bismo prebrojali ishode u skupu "Ana je dobila svoj kaput", zakucamo Anin kaput, a ostatku pustimo da se odigra kako god hoće. Skup od Bojana i Cece ne traži ništa, pa njihova dva kaputa mogu i ovako i onako:

`Ana: svoj, Bojan: svoj, Ceca: svoj`
`Ana: svoj, Bojan: Cecin, Ceca: Bojanov`

Znači svaki od tri pojedinačna skupa ima veličinu 2.

Zakucaj umesto toga dve osobe, recimo Anu i Bojana, i poslednji kaput nema gde drugde nego kod Cece. Nema više šta da se bira, pa svaki par skupova sadrži tačno 1 ishod - a isto važi i za sva tri zajedno.

Primeti da ništa od ovoga nije zavisilo od toga **koje** osobe smo izabrali, već samo od toga **koliko** njih. Zato ne moramo da ispisujemo preseke jedan po jedan.

Dovoljno je da znamo koliko grupa ostaje za biranje kada zakucamo 1, kada zakucamo 2, i kada zakucamo sve 3.

$$3 * 2 - 3 * 1 + 1 * 1 = 4$$

Znači da u 4 od 6 mogućih ishoda neko dobije svoj kaput, a u preostala 2 niko.

> Kada su svi preseci iste veličine međusobno jednaki, potrebna su ti samo dva broja po nivou: kolika je ta zajednička veličina preseka, i koliko ima grupa te veličine.

Ova prečica je poznata kao simetrična verzija principa. Ona sumu sa ogromnim brojem članova pretvara u sumu sa svega nekoliko.

### U takmičarskom programiranju

**Koliko brojeva od 1 do 100 je deljivo sa 2, 3 ili 5?**

Ovde imamo tri skupa: umnoške broja 2, umnoške broja 3 i umnoške broja 5. Brojanje umnožaka broja `d` do `N` je lako - celobrojno deljenje `N / d` daje odgovor. Preseci su jednako laki, jer je biti deljiv i sa 2 i sa 3 isto što i biti deljiv sa 6.

Prateći pravilo, sabiramo pojedinačne skupove, oduzimamo parove, pa dodajemo trojku:

$$(50 + 33 + 20) - (16 + 10 + 6) + 3 = 74$$

Skupovi ovde imaju različite veličine, pa prečica iz prošlog odeljka ne važi, i grupe obrađujemo jednu po jednu.

Kada su skupovi unapred poznati, kod je prosto ispisana formula. Svaka grupa postaje jedno deljenje, a veličina grupe određuje znak:

~!
```cpp
long long prebrojDeljive(long long N) {
    long long ukupno = 0;

    ukupno += N / 2 + N / 3 + N / 5;     // pojedinačni skupovi
    ukupno -= N / 6 + N / 10 + N / 15;   // parovi
    ukupno += N / 30;                    // sva tri

    return ukupno;
}
```

Broj kojim delimo je najmanji broj deljiv svime iz te grupe - 2 i 3 nam daju 6, a sva tri nam daju 30.

Ispisivanje članova ručno je sasvim u redu za nekoliko skupova, ali se broj grupa udvostručuje sa svakim novim skupom. Kada skupovi dođu iz ulaza, pa ne znamo unapred koliko će ih biti, potreban nam je način da grupe generišemo umesto da ih kucamo, a to je tehnika za neku od narednih lekcija.

> Princip uključenja i isključenja je ono u šta se pravilo sabiranja pretvara kada slučajevi smeju da se preklapaju. Ako se ikada uhvatiš kako sabiraš slučajeve i brineš da je nešto izbrojano dvaput, ovo je alat za to.
