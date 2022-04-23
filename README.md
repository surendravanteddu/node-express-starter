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

#### Get User 

###### Bearer token is required to get user info

``GET - /user``

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
