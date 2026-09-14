>U ovoj lekciji naučićemo tehniku na kojoj počiva efikasno sortiranje - Podeli, pa Vladaj (en. Divide and Conquer)

Suština ove tehnike je da veliki posao, koji nam oduzima puno vremena (recimo O(n)), razbijemo na O(log n) mnogo manjih poslova.

To radimo tako što niz delimo na pola, pa svaku polovinu opet na pola, sve dok u svakom delu ne ostane po jedan element.

Sada se postavlja pravo pitanje - umemo li da te delove spojimo nazad, a da nas to ne košta previše?

Pogledajmo primer:

### Merge Sort

Merge Sort je jedan od najefikasnijih algoritama za sortiranje, i radi upravo po ovom principu.

Krenimo od niza `a = {4, 2, 1, 3, 4, 10}`

Prvo ga izdelimo do kraja: `{4}, {2}, {1}, {3}, {4}, {10}`

Kako sada spajamo ove delove?

Setimo se zadatka [Objedinjavanje sortiranih nizova](/sr/Problems/merge-two-sorted-arrays) - ovo je bukvalno on. Uzimamo delove dva po dva i spajamo ih pomoću dva pokazivača, u **O(n + m)**.

Naši delovi postaju: `{2, 4}, {1, 3}, {4, 10}`

Zatim: `{1, 2, 3, 4}, {4, 10}`

I na kraju: `{1, 2, 3, 4, 4, 10}`

	![[merge-sort-tree.png|Niz 4 2 1 3 4 10 se uzastopno deli na pola sve do pojedinačnih elemenata, pa se nivo po nivo spaja nazad dok ne bude sortiran kao 1 2 3 4 4 10]]

Ključno je to što u svakom spajanju oba dela **već jesu sortirana**, pa nam je dovoljan jedan prolaz kroz njih.

### Implementacija

Podeli, pa vladaj se najlakše piše pomoću rekurzije (kao i svaki rekurzivni algoritam, može se napisati i iterativno, ali nema potrebe):

Solution.cpp
```c++
#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& arr, int left, int mid, int right){ //pomoćna funkcija koja spaja dva dela niza

    int n1 = mid - left + 1;
    int n2 = right - mid;

    vector<int> L(n1), R(n2); //pravimo privremene nizove

    //prepisujemo elemente
    for(int i = 0; i < n1; i++){
        L[i] = arr[left + i];
    }
    for(int j = 0; j < n2; j++){
        R[j] = arr[mid + 1 + j];
    }

    int i = 0, j = 0;
    int k = left;

    //obično spajanje sa dva pokazivača
    while(i < n1 && j < n2){
        if(L[i] <= R[j]){
            arr[k] = L[i];
            i++;
        }
        else{
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    //prepisujemo ono što je ostalo u L
    while(i < n1){
        arr[k] = L[i];
        i++;
        k++;
    }

    //prepisujemo ono što je ostalo u R
    while(j < n2){
        arr[k] = R[j];
        j++;
        k++;
    }
}

void mergeSort(vector<int>& arr, int left, int right){ //glavna rekurzivna funkcija

    if(left >= right)
        return;

    int mid = left + (right - left) / 2; //delimo niz na pola

    mergeSort(arr, left, mid); //leva polovina
    mergeSort(arr, mid + 1, right); //desna polovina

    merge(arr, left, mid, right); //spajamo polovine
}

int main(){

    vector<int> arr = {4, 2, 1, 3, 4, 10};
    int n = arr.size();

    mergeSort(arr, 0, n - 1);

    for(int i = 0; i < arr.size(); i++){
        cout<<arr[i]<<" ";
    }

    return 0;
}
```
Output:
`1 2 3 4 4 10`

Niz delimo na pola O(log n) puta, a svaki nivo deljenja nas košta O(n) da spojimo nazad.

	![[divide-conquer-cost.png|Traka dužine n se deli na 2, pa na 4, pa na 8 delova po nivoima, gde svaki nivo i dalje ukupno iznosi n, kroz log n nivoa]]

Vremenska složenost: **O(n log n)**
