## Description

[ZenCache](https://github.com/FlorantePascual/zen-cache) assigment - simulates Redis In-memory Cache

- Uses NestJS framework
- Written in TypeScript
- Node 14.15.1

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Using the app

# API

Connect via http on port 3000 at endpoint api/

# Fetch

GET localhost:3000/api/:key

# Create/Update

POST localhost:3000/api/

body: {
  key: string;
  payload: any;
}

# Remove

DELETE localhost:3000/api/:key


## Questions

- Author - [Florante Pascual](https://www.florante-pascual.com)

