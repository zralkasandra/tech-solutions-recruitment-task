# Zadanie rekrutacyjne dla firmy Tech Solutions

## Treść zadania

Pewna firma telekomunikacyjna odezwała się z prośbą o stworzenie kalkulatora cen dla ich usług. Celem zadania jest zbudowanie widoku aplikacji, który pozwoli na sprawdzenie ceny usług, które klient chciałby zamówić.

Wymagania:
Cena powinna być wyliczana w momencie, gdy użytkownik doda na listę wybrane usługi i wybierze rok, w którym miałyby one obowiązywać. Kalkulator powinien mieć deklarację cennika dla lat 2023, 2024, 2025, umożliwić klientowi jego modyfikację, dodanie kolejnych lat i usług.
Lista usług:

- Internet,
- Telewizja,
- Abonament telefoniczny,
- Dekoder 4K

Ceny usług mogą być inne w zależności od wybranego roku. Obecnie o cenach wiemy, że:

- Internet kosztuje 39zł w 2023, 49zł w 2024 i 59zł w 2025,
- Telewizja kosztuje 49zł w 2023, 49zł w 2024 i 59zł w 2025,
- Pakiet „Internet + telewizja” kosztuje mniej – 79zł w 2023, 89zł w 2024, 99zł w 2025,
- Pakiet „Internet + Abonament telefoniczny” w każdym roku kosztuje 64zł,
- Abonament telefoniczny kosztuje 29zł,
- Dekoder 4K kosztuje 29zł, a w pakiecie „Internet + telewizja” jest dostępny za darmo.

Nie ma sensu, aby klient mógł zamówić „Dekoder 4K” bez zamawiania telewizji. Zadbaj o to, żeby program wyliczał najbardziej korzystne rozwiązanie dla klienta. Żadna zniżka nie aplikuje się dwa razy. Widok aplikacji ma umożliwiać wybór usługi z listy, możliwość dodania ich na listę i obliczać cenę finalną wybranych usług. Aplikację wykonaj przy użyciu technologii React.

## Dodatkowe założenia:

- administrator nie może dodawać kolejnych pakietów - brak wymagania w treści zadania,
- każdą usługę można dodać do kalkulatora tylko raz - jeżeli zniżka aplikuje się tylko raz, bardziej opłaca się klientowi złożyć 2 zamówienia, niż dodawać kilka takich samych produktów do koszyka,
- usługi mogą być w danych latach niedostępne (ustawienie ceny -1 w formularzu),
- brak trwałego zapisu danych (nawet w LocalStorage) - wprowadzone dane usuwane po odświeżeniu strony,
- pakiety są zawsze korzystniejsze niż suma cen pojedynczych usług - jest dodana na to walidacja, więc w obliczaniu wartości koszyka nie ma uwzględnionego innego scenariusza,
- otestowany został tylko kalkulator cen (koszyk i jego funkcje pomocnicze)

## Uruchomienie rozwiązania

W folderze projektu wykonaj komendę:

### `npm install`

a następnie:

### `npm start`

Aplikacja będzie dostępna w przeglądarce pod: [http://localhost:3000](http://localhost:3000)

## Uruchomienie testów

W folderze projektu wykonaj komendę:

### `npm test`
