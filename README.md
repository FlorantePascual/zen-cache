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

### API

Connect via http on port 3000 at endpoint api/

### Fetch

GET localhost:3000/api/{key}

### Create/Update

POST localhost:3000/api

```javascript
body: {
  key: string;
  payload: any;
}
```

### Remove

DELETE localhost:3000/api/{key}


# About the design

## Configuration

### Cache Configuration Parameters
```javascript
    cacheConfig = {
      capacity, // max number of cached entries (default=5)
      ttl,      // time to live (default 1 hour) for periodic memory cleanup
    };
```

- change the defaults in data.service.ts line 12
- override defaults in cache.service.ts constructor

### Cached Entries

- each cached entry is represented by a key in a hash table
- cached entries' data value can contain a JSON object or primitives
- entries have expiry (1 hour default)
- LRU logic enforced

## Questions

- Author - [Florante Pascual](https://www.florante-pascual.com)

