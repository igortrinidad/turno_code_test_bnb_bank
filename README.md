# Turno code test BNB  Bank

### Getting started - Welcome to my BNB Bank

This application shows a small portion of my habilities to create modern web applications using Vue3 (Nuxt.js) and Laravel.

### /frontend
Inside this directory lies a conventional Nuxt.js (Vue3) application, showcasing the frontend aspect of the project. All designs are custom made components using TailwindCSS.

### /server
Contained within this folder is a freshly minted Laravel 11x application. I've meticulously restructured the folder layout to adhere to the Domain-Driven Design (DDD) pattern. Navigate through the 'modules' folder to discover tailored resources catering to distinct user types and functionalities.

### /docker
If you're like me and prefer to run backend resources (databases, api's and so on) on Docker, this folder has everything you gonna need to startup your application as quickly as possible for your development environemnt.

To the application work fully properly, you need to provide an AWS S3 bucket info:

``` SHELL
#.env
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION="us-east-1"
AWS_BUCKET=
```

In order to the frontend upload works, you need to define the CORS settings on your AWS S3 bucket:

```json
[
    {
        "AllowedHeaders": [
            "Authorization",
            "Content-Range",
            "Accept",
            "Content-Type",
            "Origin",
            "Range"
        ],
        "AllowedMethods": [
            "GET",
            "HEAD",
            "POST",
            "PUT"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [
            "Content-Length",
            "Access-Control-Allow-Origin",
            "Content-Type",
            "Access-Control-Expose-Headers",
            "ETag"
        ],
        "MaxAgeSeconds": 3000
    }
]
```

***

### Features Checklist

Build a simplified banking system

The system has 2 types of users

1. [x] a customer

2. [x] an admin


customer user stories: 

- [x] a user can create a new account with username and password

- [x] a user starts with 0 balance

- [x] a user can deposit more money to his account by uploading a picture of a check and entering the amount of the check. if the check is approved by an admin, the money is added to the bank account.

- [x] to buy something, the user enters the amount and description; a user can only buy something if she has enough money to cover the cost.

- [x] a user can see a list of balance changes including time and description.


admin user stories:

- [x] an admin account is already created with a hard coded username and password.

- [x] an admin can see a list of pending check deposit pictures with amount and picture and click to approve or deny the deposit.

Simplifying Assumptions 

* [x] an admin can’t be also a customer

Submit app url and repo url to augusto@turnoverbnb.com