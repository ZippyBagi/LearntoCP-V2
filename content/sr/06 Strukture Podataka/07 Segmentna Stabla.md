>U ovoj lekciji naučićemo strukturu koja odgovara na dinamičke upite nad opsegom u O(log n) - Segmentna Stabla (en. Segment Trees)

Šta su uopšte **dinamički upiti nad opsegom?**

Setimo se Zbira Prefiksa. Tamo smo za svaki upit tražili zbir elemenata između `[l,r]` - to su **upiti nad opsegom**.

**Dinamički upiti** su isto to, samo što se elementi niza **mogu menjati** između dva upita.

I tu nam Zbir Prefiksa više ne pomaže. Čim promenimo jedan element, svi prefiksi posle njega postaju pogrešni, pa moramo da ih računamo iznova. To je O(n) po svakoj izmeni, i ako izmena ima puno, vraćamo se na brute force.

Treba nam struktura kojoj su i upit i izmena jeftini.

### Segmentna stabla

Da bismo razumeli kako rade, prvo treba da ih zamislimo.

Uzmimo niz `a = {1, 2, 5, 3, -2, 8, -3, 6}` veličine `n` (zasad neka `n` bude stepen dvojke).

1. Sve elemente niza stavimo na dno stabla - oni su naši **listovi**.

2. Svaka dva susedna lista spojimo u jedan čvor koji pokriva 2 elementa.

3. Svaka dva takva čvora spojimo u čvor koji pokriva 4 elementa.

4. Ponavljamo dok ne dobijemo jedan jedini čvor koji pokriva svih `n` elemenata - **koren**.

To je segmentno stablo!

	![[segment-tree-shape.png|Niz od osam elemenata poređan kao listovi na dnu stabla, gde se svaka dva susedna čvora spajaju u čvor iznad, kroz tri nivoa, sve do jednog korena koji pokriva ceo niz]]

Sada dolazi glavni deo. Umesto da čvor samo pokriva svoje elemente, neka u sebi **čuva njihov zbir**.

Drugim rečima, kada se dva čvora spoje, novi čvor pamti zbir ta dva.

	![[segment-tree-sums.png|Isto stablo nad nizom 1 2 5 3 -2 8 -3 6, gde svaki čvor sadrži zbir svoje dece: nivo iznad listova ima 3 8 6 3, zatim 11 i 9, a koren 20]]

>Napomena:
>Elemente niza brojimo od 0, kao i uvek, ali čvorove stabla od 1. Videćemo uskoro zašto nam to mnogo olakšava posao.

### Kako ih koristimo?

Recimo da nas zanima zbir na opsegu `[0,6]`.

Krećemo od `ans = 0`.

Primeti da su zbirovi `[0,1]`, `[2,3]` i `[4,5]` već izračunati u čvorovima iznad listova. Jedini element koji nema svog para je `[6]`, pa njega moramo uzeti ovde, pre nego što se popnemo na sledeći nivo: `ans += -3`

	![[segment-tree-query-1.png|Prvi korak upita nad opsegom od 0 do 6, gde je usamljeni list sa vrednošću -3 obojen jer nema par sa kojim bi se popeo na sledeći nivo]]

Na sledećem nivou, `[0,3]` se dalje spaja u čvor iznad, a `[4,5]` ostaje sam, pa i njega dodajemo: `ans += 6`

	![[segment-tree-query-2.png|Drugi korak istog upita, na nivou iznad, gde čvor koji pokriva opseg od 4 do 5 sa vrednošću 6 ostaje bez para i ulazi u odgovor]]

Na kraju nam je ostao samo čvor `[0,3]`, pa dodajemo i njega: `ans += 11`

	![[segment-tree-query-3.png|Poslednji korak upita, gde uzimamo čvor koji pokriva opseg od 0 do 3 sa vrednošću 11, čime zbir dostiže 14]]

Konačan odgovor je `14`, a do njega smo došli u samo 3 koraka.

Umesto da prolazimo kroz ceo opseg, mi se u svakom koraku popnemo za jedan nivo. Nivoa ima O(log n), i to je cela tajna.

### Izmena elemenata

Izmena je isto tako brza.

Recimo da želimo da postavimo `a[7]` na `9`.

Promenili smo jedan list, a pogrešni su sada svi čvorovi iznad njega - i niko više. Njih ima tačno O(log n), pa ih samo preračunamo, jedan po jedan, idući od lista ka korenu.

	![[segment-tree-update.png|Putanja od izmenjenog lista sa vrednošću 9 do korena, gde su preračunati samo čvorovi na toj putanji, dok ostatak stabla ostaje netaknut]]

Eto, stablo je ažurirano u 3 koraka.

>Napomena:
>Ništa u ovoj priči ne zavisi od toga što sabiramo. Isti postupak radi za proizvod, minimum, maksimum, xor, and... bilo koju operaciju kod koje rezultat dva dela možeš spojiti u rezultat celine.

### Implementacija

U kodu stablo nećemo čuvati kao graf. Umesto toga ćemo ga spljoštiti u jedan običan niz `s` veličine `2*n`.

U tom nizu listovi zauzimaju indekse `[n, 2*n-1]`, prethodnih `n/2` mesta je nivo iznad njih, pa prethodnih `n/4` sledeći nivo, i tako sve do korena koji sedi na `s[1]`. Mesto `s[0]` ostaje prazno.

	![[segment-tree-flat-array.png|Segmentno stablo spljošteno u niz duzine 16, gde je koren na indeksu 1, sledeci nivo na indeksima 2 i 3, zatim 4 do 7, a listovi na indeksima 8 do 15]]

Element sa pozicije `p` u nizu `a` nalazi se na `s[n + p]`.

Ako `n` nije stepen dvojke, uzmemo prvi stepen dvojke koji je `>= a.size()`. Višak listova ostaje na nuli i ne kvari zbir.

Sada se vidi zašto čvorove brojimo od 1. Ako smo u čvoru `i`:

- do roditelja se stiže sa `i/2`
- do LEVOG deteta sa `2*i`
- do DESNOG deteta sa `2*i+1`

Odatle sledi i jedna sitnica koja nam je uskoro potrebna: čvor sa **neparnim** indeksom je uvek desno dete, a čvor sa **parnim** indeksom uvek levo.

### Kod:

Proći ćemo kroz kod blok po blok.

Ova pomoćna funkcija nalazi prvi stepen dvojke koji nije manji od `a`:
~!
```c++
long long power_of_two(long long a){

    long long d = 1;

    while(d < a){
        d *= 2;
    }

    return d;
}
```

Ovaj blok pravi segmentno stablo.

Prvo prepišemo elemente u listove, a zatim gradimo stablo unazad, od `n-1` do korena. Kada dođemo do čvora `i`, njegova deca su već izračunata, pa je on samo njihov zbir:
~!
```c++
vector<long long> create_segment_tree(vector<long long>& a){

    int n = power_of_two(a.size());

    vector<long long> s(2*n, 0);

    for(int i = 0; i < a.size(); i++){ //prepisujemo originalne elemente u listove
        s[n+i] = a[i];
    }

    for(int i = n-1; i >= 1; i--){ //gradimo stablo
        s[i] = s[2*i] + s[2*i+1];
    }

    return s;
}
```

Ovaj blok odgovara na upit nad opsegom.

Idemo nivo po nivo i u svakom koraku pokupimo one čvorove koji nemaju para iznad sebe.

Zato nam služi `l % 2 == 1`. Ako je levi kraj neparan, on je desno dete, znači levo od njega nema para pa se ne može popeti na sledeći nivo - moramo ga uzeti odmah.

Ista logika važi i za `r % 2 == 0`. Ako je desni kraj paran, on je levo dete, nema suseda sa desne strane, pa i njega uzimamo odmah.

Kada smo to sredili, penjemo se na sledeći nivo sa `l /= 2` i `r /= 2`:
~!
```c++
long long query(vector<long long>& s, int l, int r){

    l += s.size() / 2; //krećemo od listova
    r += s.size() / 2;

    long long ans = 0;

    while(l <= r){

        if(l % 2 == 1){ //levi kraj nema para
            ans += s[l];
            l++;
        }
        if(r % 2 == 0){ //desni kraj nema para
            ans += s[r];
            r--;
        }

        //prelazimo na sledeći nivo
        l /= 2;
        r /= 2;
    }

    return ans;
}
```

I na kraju, izmena elementa.

Upišemo novu vrednost u list, pa se penjemo ka korenu i usput preračunavamo svaki čvor, potpuno isto kao kada smo gradili stablo:
~!
```c++
void replace_element(vector<long long>& s, long long el, int pos){

    int index = pos + s.size() / 2;

    s[index] = el;

    for(index /= 2; index >= 1; index /= 2){

        s[index] = s[2*index] + s[2*index+1]; //preračunavamo
    }
}
```

Gradnja stabla nas košta **O(n)**, a svaki upit i svaka izmena **O(log n)**.

>Napomena:
>Ako ti u zadatku treba druga operacija, menjaš samo znak `+` na tri mesta - pri gradnji, u upitu i pri izmeni. Pazi samo na početnu vrednost: za zbir je `0`, ali za minimum mora biti nešto veliko, a za proizvod `1`.
