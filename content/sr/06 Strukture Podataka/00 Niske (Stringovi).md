>U ovoj lekciji ćemo se ozbiljno pozabaviti niskama (stringovima) - kako rade ispod haube i koje nam alate C++ daje za njih!

Koristimo `string` još od prve lekcije, ali samo za čitanje i ispisivanje teksta. Niske služe za još dosta toga

Najbolje je zamisliti ih ovako: **niska (string) je samo vektor karaktera**. Skoro sve što znaš o vektorima važi direktno.
### Osnove

~!
```c++
int main(){

    string a = "learn";
    string b = "cp";

    string c = a + " to " + b; //spajanje pomoću +

    cout<<c<<'\n';
    cout<<c.size()<<'\n'; //dužina, baš kao kod vektora
    cout<<c[0]<<'\n'; //indeksiranje, baš kao kod vektora

    c[0] = 'L'; //možemo i da menjamo pojedinačne karaktere

    cout<<c<<'\n';
    cout<<c.substr(6, 2); //2 karaktera, počevši od indeksa 6

    return 0;
}
```
Output:
`learn to cp`
`11`
`l`
`Learn to cp`
`to`

Jedina nova stvar je `substr(start, length)` - vraća deo niske u složenosti **O(dužina_niske)**.

>Napomena:
>`cin>>s` čita jednu reč (staje kod prvog razmaka). Za čitanje cele linije, sa razmacima, koristi `getline(cin, s)`.

### Karakteri su brojevi

Računar zapravo ne ume da čuva "karaktere" - on čuva samo brojeve. Zato su se programeri davno dogovorili oko tabele koja svakom karakteru dodeljuje broj (kod). Ta tabela se zove **ASCII**, i kada u kodu napišemo `'4'`, računar zapravo vidi njen ASCII kod - broj `52`.

Važan deo je kako su kodovi dodeljeni. Na primer, cifre od `0` do `9` su dobile kodove od `48` do `57` - stoje **jedna pored druge, po redu**:

![[ascii-table-sr.png|Tabela sa dva reda koja spaja karaktere '0' do '9' sa njihovim uzastopnim ASCII kodovima od 48 do 57]]

I to omogućava klasičan trik:

`s[i] - '0'`

Pošto kodovi stoje po redu, oduzimanje poništava pomeraj: `'4' - '0'` je zapravo `52 - 48 = 4`. Dobijamo pravi broj koji cifra predstavlja!

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

A radi i u suprotnom smeru - `'0' + i` pretvara broj nazad u karakter cifre: `char c = '0' + 7;` nam daje `'7'`.

>Napomena:
>Isti trik radi i za slova - i `a` do `z` stoje jedno pored drugog u ASCII tabeli (kodovi od `97` do `122`), pa `s[i] - 'a'` pretvara malo slovo u broj od `0` do `25`.

### Poređenje i sortiranje

Niske se porede **leksikografski** - kao u rečniku. Karakter po karakter, i prva razlika odlučuje. Svi uobičajeni operatori rade: `==`, `<`, `>`.

To znači da niske možemo da sortiramo pomoću `sort()` bez ikakvog dodatnog posla - pa čak i da sortiramo karaktere **unutar** jedne niske:

~!
```c++
int main(){

    vector<string> words = {"banana", "apple", "cherry", "app"};

    sort(words.begin(), words.end()); //rečnički redosled

    for(int i=0;i<words.size();i++){
        cout<<words[i]<<'\n';
    }

    string s = "cba";
    sort(s.begin(), s.end()); //niska je vektor karaktera

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

Primeti da `app` dolazi pre `apple` - kada je jedna niska prefiks druge, kraća se smatra manjom.

>Napomena:
>Poređenje dve niske je **O(n)**, a ne O(1)! Izgleda kao jedan nevini `==`, ali ispod haube prolazi kroz karaktere. Lako se zaboravi pri proceni složenosti.