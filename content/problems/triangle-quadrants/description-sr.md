Grad je isplaniran kao mreža. Dva glavna puta ukrštaju se u centru grada, a na mapi je centar koordinatni početak, jedan put ide duž $x$ ose, a drugi duž $y$ ose.

Ta dva puta seku mapu na četiri **kvadranta**, označena brojevima od $1$ do $4$ suprotno od smera kazaljke na satu: kvadrant $1$ je sve ono gde je $x > 0$ i $y > 0$, kvadrant $2$ je $x < 0$ i $y > 0$, kvadrant $3$ je $x < 0$ i $y < 0$, a kvadrant $4$ je $x > 0$ i $y < 0$. Tačka koja leži na putu ne pripada nijednom kvadrantu.

Na mapi je nacrtan trougao. Tvoj zadatak je da za svaki od četiri kvadranta odrediš da li trougao ima **unutrašnju tačku** u njemu - tačku strogo unutar trougla, a ne onu koja leži na stranici ili u temenu.

## Ulaz

U prvoj liniji ulaza je jedan ceo broj $t$ - broj test primera.
U svakoj od sledećih $t$ linija je šest celih brojeva $x_1$, $y_1$, $x_2$, $y_2$, $x_3$, $y_3$ - tri temena trougla. Tri temena nikada ne leže na jednoj pravoj, pa trougao uvek ima pozitivnu površinu.

## Izlaz

Za svaki test primer ispiši u posebnoj liniji četiri karaktera. $k$-ti karakter je `+` ako trougao ima unutrašnju tačku u kvadrantu $k$, a `-` ako nema.

## Primer

```Input
4
1 2 2 5 5 -10
-1 -1 1 5 5 1
-10 20 -5 15 -10 15
0 0 -3 1 1 -3
```

```Output
+--+
++++
-+--
-+++
```

Prvi trougao ceo leži u $x \ge 0$, pa kvadranti $2$ i $3$ otpadaju, a proteže se od $y = 5$ naniže do $y = -10$, pa ima unutrašnjih tačaka sa obe strane $x$ ose. Treći trougao ceo leži u $x \le 0$ i ceo u $y \ge 0$, pa je jedino kvadrant $2$ moguć. Četvrti trougao ima teme tačno u koordinatnom početku i dopire do tri kvadranta, ali **ne** i do kvadranta $1$ - ima unutrašnjih tačaka sa $x < 0$ i unutrašnjih tačaka sa $y < 0$, a nijednu sa istovremeno $x > 0$ i $y > 0$.

## Ograničenja

$1 \le t \le 10^4$
$-10^6 \le x_i, y_i \le 10^6$

---

*Zadatak je, uz dozvolu, preuzet iz zadatka [U kojim kvadrantima je trougao](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka3/u_kojim_kvadrantima_je_trougao), čiji su autori Društvo matematičara Srbije i Fondacija Petlja.*
