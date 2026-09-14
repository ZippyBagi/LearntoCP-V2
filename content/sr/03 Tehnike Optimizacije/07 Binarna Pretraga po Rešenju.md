>U ovoj lekciji naučićemo tehniku koja pronalazi najbolju moguću vrednost u O(log n) - Binarnu Pretragu po Rešenju (en. Binary Search by Answer)

Binarna Pretraga po Rešenju veoma liči na običnu binarnu pretragu.

Prva razlika je u tome što se ne zaustavljamo čim pronađemo rešenje. Zapamtimo ga, pa nastavimo da tražimo bolje.

Druga razlika je u tome što ne pretražujemo niz. Umesto niza, sami određujemo **dve vrednosti**:

- `low` - najmanja vrednost koja bi mogla biti rešenje
- `high` - najveća vrednost koja bi mogla biti rešenje

Nad tim opsegom pokrećemo binarnu pretragu, i u svakom koraku proveravamo da li nam ta vrednost rešava zadatak.

### Pseudo kod:

```c++
bool check(int mid){ //ova funkcija proverava da li trenutni broj rešava zadatak

}

int main(){

    int low = 1; //najmanja vrednost koja bi mogla biti rešenje
    int high = 100000; //najveća vrednost koja bi mogla biti rešenje

    int ans = -1; //na početku pretpostavljamo da rešenja nema

    while(low <= high){

        int mid = (low + high) / 2;

        if(check(mid)){ //ako je uslov zadovoljen

            ans = mid; //zapamtimo rešenje
            high = mid - 1; //pa probamo da nađemo bolje

        }else{
            low = mid + 1; //nije rešenje, probamo dalje
        }
    }

    cout<<ans<<'\n';

}
```

Vremenska složenost: **O(log `high` * T)**, gde je T složenost funkcije `check()`.

### Kada ovo radi?

Važno je razumeti da se ova tehnika ne može primeniti na svaki zadatak.

Radi samo kada rešenja izgledaju ovako:

`NE NE NE NE NE DA DA DA DA`

Drugim rečima, ako jedna vrednost zadovoljava uslov, moraju ga zadovoljavati i sve manje (ili sve veće, u zavisnosti od zadatka).

Nama je onda potrebna granica - poslednje `NE` i prvo `DA`.

	![[monotone-predicate.png|Dva reda rezultata funkcije check nad vrednostima od 1 do 12: prvi se sa false na true prelama tačno jednom, kod 8, što je rešenje, dok se drugi prelama više puta pa granica ne postoji]]

