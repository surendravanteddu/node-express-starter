### How to run

Create .env file in the root directory and copy/paste content from example.env into .env 

```sh
yarn install && yarn start:dev 
```

### Authentication

``POST - /login``

#### Request body
```
     { 
       username: "admin",
       password: "password"
     }
```
#### Response body

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjUwNzUxMDY0LCJleHAiOjE2NTA4Mzc0NjR9.eYA5ywFIIEpSoFY0Mb99W9Ibb7nfWnYyoXXoOs5UYCE"
}
```

### Get User 

###### Bearer token is required to get user info

``GET - /users``

###### Headers
``` 
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjUwNzUxMDY0LCJleHAiOjE2NTA4Mzc0NjR9.eYA5ywFIIEpSoFY0Mb99W9Ibb7nfWnYyoXXoOs5UYCE 
```

#### Response body

```
{
    "firstname": "Ron",
    "lastname": "J",
    "email": "ron.j@miviewis.com"
}
```

### Get Contacts 

###### Bearer token is not required to get contacts list

``GET - /contacts?pageNo=1&pageSize=2``

Default pageSize is 25 and pageNo is 1.
Total records count is 1000

#### Response body

```
[
    {
        "id": 1,
        "name": "Lena Cannon",
        "dob": "1971-12-04T05:06:23.580Z",
        "ssn": "268-22-4430",
        "phone": "3283453077",
        "address": "665 Menta Turnpike",
        "city": "Ducobzo",
        "zip": "63689",
        "state": "Mississippi",
        "avatar": "//www.gravatar.com/avatar/512bb7c0278ff136dfcbd12d1220c707",
        "company": "Chiquita Brands International Inc.",
        "email": "okpagut@vu.tl",
        "role": "Lead Meteorologist"
    },
    {
        "id": 2,
        "name": "Ora Rios",
        "dob": "1972-07-02T16:27:39.055Z",
        "ssn": "995-64-6976",
        "phone": "2173517494",
        "address": "677 Vegob Trail",
        "city": "Semlaece",
        "zip": "81447",
        "state": "Florida",
        "avatar": "//www.gravatar.com/avatar/56005c4d2f587738ea1187d70b06d394",
        "company": "Atmel Corporation",
        "email": "viudsu@tohoca.lu",
        "role": "Junior Portfolio Manager"
    }
]
```
