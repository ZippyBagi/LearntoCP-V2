
## Pristup

Sav posao obave dve činjenice, po jedna iz svake niske.

**KLD nam odaje koren.** Po definiciji počinje njime - dakle prvo slovo KLD niske je koren celog stabla.

**LKD nam odaje gde se stablo deli.** U njemu ide levo podstablo, pa koren, pa desno podstablo. Znači, čim znamo koje je slovo koren, nađemo ga u LKD niski i sve pre njega je tačno levo podstablo, a sve posle njega tačno desno.

U primeru je koren `a`, pa se LKD niska `beafcg` lomi na `be` | `a` | `fcg`. Sada znamo da levo podstablo ima $2$ čvora a desno $3$, iako im oblik još ne znamo.

Taj broj je dovoljan da presečemo i KLD nisku. Iza korena idu KLD slova levog podstabla - tačno $2$, dakle `be` - pa onda KLD desnog podstabla, `cfg`.

Znači, jedan korak bez ijednog poređenja pretvara zadatak u dva manja zadatka iste vrste, svaki sa svojim parom niski. To je podeli pa vladaj, a rekurzija glasi:

$$LDK(stablo) = LDK(levo) + LDK(desno) + koren$$

Izlaz iz rekurzije je prazno podstablo, koje doprinosi praznom niskom. Ništa drugo nam ne treba - posebno, stablo nigde ne gradimo.

**Pažnja:** rekurzija radi nad **odsečcima** dve niske, a ne nad njihovim kopijama, pa joj trebaju tri podatka: gde odsečak počinje u KLD, gde počinje u LKD i koliko je dugačak. Najlakše je pogrešiti kod početaka desnog podstabla - u KLD ono kreće $1 + leftSize$ iza korena, a u LKD odmah iza pozicije korena.

**Pažnja:** koren tražimo pomoću `find` po **celoj** LKD niski, a ne samo po tekućem odsečku. To je bezbedno samo zato što se svako slovo u stablu javlja jednom - a to postavka garantuje. Da se slova ponavljaju, pretraga bi morala da se ograniči na odsečak.

## Primer

Nad `abecfg` / `beafcg` ide ovako:

| KLD odsečak | LKD odsečak | koren | levo podstablo | desno podstablo |
|---|---|---|---|---|
| `abecfg` | `beafcg` | `a` | `be` / `be` | `cfg` / `fcg` |
| `be` | `be` | `b` | prazno | `e` / `e` |
| `cfg` | `fcg` | `c` | `f` / `f` | `g` / `g` |

Sad se odgovori čitaju unazad iz rekurzije, od najdubljeg. Čvor `b` nema levo dete a desno mu je `e`, pa je njegov LDK `` + `e` + `b` = `eb`. Čvor `c` daje `f` + `g` + `c` = `fgc`. A koren ih spaja, sa sobom na kraju: `eb` + `fgc` + `a` = `ebfgca`.

Pogledaj drugi red da vidiš zašto ovo uopšte radi: `b` stoji na samom početku svog LKD odsečka `be`, što znači da mu levo nema ničega, što znači da nema levo dete. Oblik stabla se nigde ne pamti - iščitava se iz pozicije svakog korena unutar njegovog LKD odsečka.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

string pre, in;

// postorder of the subtree whose preorder starts at pre[preStart] and whose
// inorder is in[inStart .. inStart + n - 1]
string postorder(int preStart, int inStart, int n){

    if(n == 0){
        return ""; // empty subtree
    }

    char root = pre[preStart];
    int m = in.find(root); // every letter is different, so one search over the whole string is safe

    int leftSize = m - inStart;          // everything before the root in the inorder segment
    int rightSize = n - leftSize - 1;    // ... and everything after it

    return postorder(preStart + 1, inStart, leftSize)           // left subtree
         + postorder(preStart + 1 + leftSize, m + 1, rightSize) // right subtree
         + root;                                                // root last
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){
        cin>>pre>>in;
        cout<<postorder(0, 0, pre.size())<<'\n';
    }
    return 0;
}
```

## Složenost

U najgorem slučaju vremenska složenost je $O(n^2)$ - `find` prolazi kroz nisku, a delovi se lepe jedan na drugi - ali je $n \le 26$, pa to ovde ništa ne znači.
Memorijska složenost je $O(n)$, zbog rekurzije.
