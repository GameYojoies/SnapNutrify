<!-- @format -->

# API SnapNutrify

- [API SnapNutrify](#api-snapnutrify)
  - [Response Structure](#response-structure)
    - [Response Status Code](#response-status-code)
    - [Success Response](#success-response)
    - [Unauthorized Response](#unauthorized-response)
    - [Common Error Response](#common-error-response)
  - [API](#api)
  - [Authentication](#authentication)
    - [UserRegistration](#userregistration)
    - [Forgot-password](#forgot-password)
    - [UserLogin](#userlogin)
    - [Account/info](#accountinfo)
    - [GetAccount/info](#getaccountinfo)
    - [UpdateUserAccount](#updateuseraccount)
    - [DeleteUserAccount](#deleteuseraccount)
  - [Get Food Detail](#get-food-detail)
  - [Create Food](#create-food)
  - [Get Daily Meal Log](#get-daily-meal-log)
  - [Files](#files)
    - [Upload File](#upload-file)
    - [Get File](#get-file)

## Response Structure

### Response Status Code

- 200: [Success](#success-response)
- 401: [Unauthorized](#unauthorized-response)
- 417: [Common Error](#common-error-response)

### Success Response

```json
{
  "status": 200,
  "data": {
    "accessToken": "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5OTk5OTkiLCJpc3MiOiJ5b2pvam91cm5leSIsImV4cCI6MTcyMTc5MzE3OSwidHlwZSI6MCwiaWF0IjoxNzIxNzg5NTc5LCJqdGkiOiIwN2U1Mzc2OWQ1Nzc0NmY5OGM0NTk0YzE1MjE5NDZjMCJ9.QRP3uzdoCSiWAyHrlK_2QxrJx41JS7FblOxEXmrrC5fJJpuRFKa4aniMGYfcygUWcDJeop-pMquW2m3crg2qb1Prc_mTLP3-OTtkfxkjHOB5VeS9Dloji4qH42Ld3lDmGe4beqGSrAYNfFc9qC5PPGtxRQu6L3NPFQT_R5B4CYgl6vn2yHc1AUVBalhUzKhwMHOcXFHeEvxtBf8nm1ZaliZ8MvCiPcrFjOnd6-kug8DWuBOC0ybg7aGM-9PdMv3Evnj3iduYoQ4xR71NWlchpETOprRzbF99dth4xOzrQ_QFEjl4oVCt51AF6ANlo8HrQzFxxCVWsPHoGsngz1551Q",
    "refreshToken": "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5OTk5OTkiLCJpc3MiOiJ5b2pvam91cm5leSIsImV4cCI6MTcyMTg3NTk3OSwidHlwZSI6MSwiaWF0IjoxNzIxNzg5NTc5LCJqdGkiOiI1OTk2MGE4NzY5OWQ0ZjI1OGFjMTQ5Njk4Njg0ZjE5NyJ9.DdJT-_1lrJ-B3Z0Tj7zLuF-Now1LFB9dAU6FokvG9igrQ8HWvtkXqtbtj2lwfnmLMMKjy_wdCfx2BEXooSWFd_mXxWxicXBe3hj3NPLvD7Mqu036LLHZFEeB_l9b8ai41v-2N55MeDejI195PmLqMQvnQau8Hyvapn31fSDVA66B8beHs5G78pGwVhdYExWe48dhXSlTnpYuUWH38f0kfre0pdCLWPkbUe3vep6vQWYUQRisszgvuF2S7iXz3rzireWX1SYuuLqTKFShy9ZjZXk1zTqlwyX7WJSk_Pdvj-7hXlt-rnu0n-FkIGFz4dL7lRf0qcvLmIAOU4lGufMoYQ"
  },
  "total": null,
  "timestamp": "2024-07-24T02:52:59.841404900Z"
}
```

### Unauthorized Response

```json
{
  "status": 401,
  "error": "auth.unauthorized",
  "timestamp": "2024-07-24T02:48:56.850582800Z"
}
```

### Common Error Response

```json
{
  "status": 417,
  "error": "login.invalid",
  "timestamp": "2024-07-24T02:48:56.850582800Z"
}
```

## API

## Authentication

### UserRegistration

- request

```http request
POST /v1/auth/sign-up
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "phone": "string",
  "password": "string"
}
```
### Forgot-password

- request

```http request
POST /v1/auth/forgot-password
Content-Type: application/json

{
  "email": "string"
}

```

```
### Change-password

- request

```http request
POST /v1/auth/change-password
Content-Type: application/json
Authorization: Bearer <token>

{
  "oldPassword": "string",
  "newPassword": "string"
}

```

- response

```json
{
  "accessToken": "string",
  "refreshToken": "string"
}
```
### UserLogin
- request

```http request
POST /v1/auth/sign-in
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

### Account/info
- request

```http request
POST /v1/account/info
Content-Type: application/json
Authorization: Bearer {token}
```
```json

{
  "goalCalories": 1200,  
  "gender": "male",         
  "birthdate": "YYYY-MM-DD",      
  "height": 177,        
  "weight": 200        
}

```

### GetAccount/info

- request
```http request
GET /v1/account/info
Content-Type: application/json
Authorization: Bearer {token}
```
- response
```json

{
  "goalCalories": 1200,
  "gender": "male",
  "birthdate": "YYYY-MM-DD",
  "height": 177,
  "weight": 200
  "status": "boolean"
}
```
  
### UpdateUserAccount
- request

```http request
PUT /v1/account/{id}
Content-Type: application/json

{
  "email": "string",
  "phone": "string",
  "username": "string"
  "avatar":"string"
}
```

- response

### DeleteUserAccount
- request

```http request
DELETE /v1/account
Content-Type: application/json
Authorization: Bearer {token}
```

- response

## Get Food Detail
- request
```http request
POST /v1/food/
Content-Type: multipart/form-data
Authorization: Bearer {token}

file: file
```
- response
```json
{
  "itemName": "Som Tum (Green Papaya Salad)",
  "calories": 150,
  "fat": 5,
  "carbohydrates": 25,
  "protein": 3,
  "sugars": 10,
  "sodium": 500,
  "vitaminA": 100.00,
  "vitaminC": 100.00,
  "vitaminD": 100.00,
  "vitaminE": 100.00
}
```

## Create Food 
- request
```http request
POST /v1/food/
Content-Type: application/json
Authorization: Bearer {token}
```
- response
```json
{
  "type": "breakfast",
  // breakfast, lunch, dinner, snack
  "itemName": "Som Tum (Green Papaya Salad)",
  "calories": 150,
  "fat": 5,
  "carbohydrates": 25,
  "protein": 3,
  "sugars": 10,
  "sodium": 500,
  "vitaminA": 100.00,
  "vitaminC": 100.00,
  "vitaminD": 100.00,
  "vitaminE": 100.00
}
```
## Get Daily Meal Log
- request
```http request
GET /v1/food/Daily?date=2024-09-12
Content-Type: multipart/form-data
Authorization: Bearer {token}

file: file
```
- response
```json
[
  {
    "meals": [
      {
        "id": 1,
        "type": "breakfast",
        "itemName": "Som Tum (Green Papaya Salad)",
        "calories": 150,
        "fat": 5,
        "carbohydrates": 25,
        "protein": 3,
        "sugars": 10,
        "sodium": 500,
        "vitaminA": 100.00,
        "vitaminC": 100.00,
        "vitaminD": 100.00,
        "vitaminE": 100.00,
        "cdt": "2024-09-12T12:34:56Z"
      },
      {
        "id": 2,
        "type": "breakfast",
        "itemName": "Som Tum (Green Papaya Salad)",
        "calories": 150,
        "fat": 5,
        "carbohydrates": 25,
        "protein": 3,
        "sugars": 10,
        "sodium": 500,
        "vitaminA": 100.00,
        "vitaminC": 100.00,
        "vitaminD": 100.00,
        "vitaminE": 100.00,
        "cdt": "2024-09-12T12:34:56Z"
      },
      {
        "id": 3,
        "type": "breakfast",
        "itemName": "Som Tum (Green Papaya Salad)",
        "calories": 150,
        "fat": 5,
        "carbohydrates": 25,
        "protein": 3,
        "sugars": 10,
        "sodium": 500,
        "vitaminA": 100.00,
        "vitaminC": 100.00,
        "vitaminD": 100.00,
        "vitaminE": 100.00,
        "cdt": "2024-09-12T12:34:56Z"
      }
    ]
  },
  {
    "totals": {
      "date": "2024-09-12T12:34:56Z",
      "calories": 150,
      "fat": 5,
      "carbohydrates": 25,
      "protein": 3,
      "sugars": 10,
      "sodium": 500,
      "vitaminA": 100.00,
      "vitaminC": 100.00,
      "vitaminD": 100.00,
      "vitaminE": 100.00
    }
  }
]

```

## Files

### Upload File

- request

```http request
POST /v1/files/upload
Content-Type: multipart/form-data
Authorization: Bearer {token}

file: file
```
- response

```json
{
  "name": "619a90da420e40efb28460f4c3c93d20.png",
  "url": "http://192.168.1.99:888/v1/files/619a90da420e40efb28460f4c3c93d20.png",
  "type": "IMAGE",
  "format": "png",
  "size": 102058
}
```

- rules
  - max-size: `1MB`
  - supported-types: `jpg, png, webp`

- errors

| Error                   | Description             |
|-------------------------|-------------------------|
| file.empty              | File is empty           |
| file.type.not.supported | File type not supported |
| file.unknown            | File unknown error      |

- error response

```json
{
  "status": 417,
  "error": "file.type.not.supported",
  "timestamp": "2024-07-31T09:39:40.8357458"
}
```

### Get File

- request

```http request
GET /v1/files/{fileName}
```
