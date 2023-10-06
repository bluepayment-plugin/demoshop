<p align="center">
  <a href="https://autopay.pl/" target="blank" style="margin-right: 20px;"><img src="https://autopay.pl/storage/template/ap/images/logo_autopay.svg" width="220" alt="Autopay Logo" /></a>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Przykładowy backend do integracji z bramką płatniczą Autopay S.A.

## Opis
Backend przykładowego sklepu oparty na frameworku NestJS przeznaczony do integracji z testową bramką płatniczą Autopay S.A.

## Przygotowanie
- Krok nr 1: należy zainstalować środowisko Node.JS, dostępne pod adresem [Node.JS download](https://nodejs.org/en/download/).
- Krok nr 2: należy skopiować repozytorium do lokalnego katalogu
- Krok nr 3: w pliku app.controller.ts należy podmienić zapisane wartości serviceID, secretKey oraz separator, na wartości podane przez Autopay S.A. podczas rejestracji w systemie płatności.
```bash
// identyfikator klienta nadany przez Autopay S.A.
const serviceID = '000000';

// klucz współdzielony nadany przez Autopay S.A.
const secretKey = 'partner_secret_key';

// separator nadany przez Autopay S.A.
const separator = 'separator';
```

## Instalacja
Będąc w lokalnym katalogu z projektem, należy uruchomić polecenie:
```bash
$ npm install
```

## Uruchomienie lokalne
```bash
$ npm run start:dev
```
Na porcie 3000 localhostu uruchomi się API, oczekujące na requesty.

## Dostępne końcówki
### /api/buy
Request umożliwiający start transakcji w bramce płatniczej, zapisujący transakcję w bazie danych

Podstawowe informacje:
- type: POST
- contentType: application/json

Wartości wejściowe:
- pole email z przekazanym emailem klienta
- pole amount z kwotą zakupu zaokragloną do 2 miejsc po przecinku, oraz wartością większą od zera (kropka jako separator części dziesiętnych)
```json
{
  "email": "test@demo.com",
  "amount": 1.23
}
```

Wartości wyjściowe:
- pole data z adresem przekierowania do bramki lub null
- pole errors z błędami lub null
```json
{
  "data": {
    "redirectUrl": "https://pay-accept.bm.pl/payment?ServiceID=&OrderID=&Amount=&CustomerEmail=&Hash="
  },
  "errors": null
}
```
lub
```json
{
  "data": null,
  "errors": {
    "email": [
      "Pole wymagane"
    ],
    "amount": [
      "Pole wymagane"
    ]
  }
}
```

### /api/status
Request umożliwiający sprawdzenie aktualnie zapisanego stanu transakcji w bazie danych

Podstawowe informacje:
- type: POST
- contentType: application/json

Wartości wejściowe:
- pole orderId z unikalnym identyfikatorem transakcji
```json
{
  "orderId": "1"
}
```

Wartości wyjściowe:
- pole data z danymi transakcji
- pole errors z wartością null
```json
{
  "data": {
    "transaction": {
      "status": "PENDING",
      "orderId": "1"
    }
  },
  "errors": null
}
```

### /api/itn
Request wykorzystywany przez API bramki płatniczej do przekazania informacji o statusie transakcji

Podstawowe informacje:
- type: POST
- contentType: application/x-www-form-urlencoded

Wartości wejściowe:
- pole transactions z zakodowanym w base64 XML potwierdzającym status transakcji
```bash
transactions: PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pgo8dHJhbnNhY3Rpb25MaXN0PgogICAgPHNlcnZpY2VJRD48L3NlcnZpY2VJRD4KICAgIDx0cmFuc2FjdGlvbnM+CiAgICAgICAgPHRyYW5zYWN0aW9uPgogICAgICAgICAgICA8b3JkZXJJRD48L29yZGVySUQ+CiAgICAgICAgICAgIDxyZW1vdGVJRD48L3JlbW90ZUlEPgogICAgICAgICAgICA8YW1vdW50PjwvYW1vdW50PgogICAgICAgICAgICA8Y3VycmVuY3k+PC9jdXJyZW5jeT4KICAgICAgICAgICAgPHBheW1lbnREYXRlPjwvcGF5bWVudERhdGU+CiAgICAgICAgICAgIDxwYXltZW50U3RhdHVzPjwvcGF5bWVudFN0YXR1cz4KICAgICAgICAgICAgPHBheW1lbnRTdGF0dXNEZXRhaWxzPjwvcGF5bWVudFN0YXR1c0RldGFpbHM+CiAgICAgICAgPC90cmFuc2FjdGlvbj4KICAgIDwvdHJhbnNhY3Rpb25zPgogICAgPGhhc2g+PC9oYXNoPgo8L3RyYW5zYWN0aW9uTGlzdD4=
```

Wartości wyjściowe:
- XML z potwierdzeniem zwrotnym przyjęcia/odrzucenia statusu
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<confirmationList>
    <serviceID>000000</serviceID>
    <transactionsConfirmations>
        <transactionConfirmed>
            <orderID>1</orderID>
            <confirmation>CONFIRMED</confirmation>
        </transactionConfirmed>
    </transactionsConfirmations>
    <hash>secret_hash</hash>
</confirmationList>
```

## Uruchomienie produkcyjne
```bash
$ npm run build
$ npm run start:prod
```
Tak jak w przypadku uruchomienia lokalnego, uruchomienie produkcyjne stworzy API na porcie 3000. Należy pamiętać, aby dopuścić ruch na porcie 3000 lub przekierować ruch z portu głównego 80 na port 3000.

## Wsparcie techniczne
W przypadku problemów z uruchomieniem, prosimy o kontakt z naszym [Centrum Pomocy Autopay](https://autopay.pl/kontakt)
