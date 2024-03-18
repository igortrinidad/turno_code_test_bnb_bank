build a simplified banking system

the system has 2 types of users

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


***
Simplifying Assumptions 

* [x] an admin can’t be also a customer

Submit app url and repo url to augusto@turnoverbnb.com


### Env

To the application work fully properly, you need to provide an AWS S3 bucket info:

``` SHELL
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