# ApiTree Public Web

> Project in React/Next.js for public

## Docker

Build:

```
docker build -t gcr.io/apitree-175506/apitree-public:0.1.0-alpha.1 .
```

Run:

```
docker run --env-file .env -p 8080:8080 -d gcr.io/apitree-175506/apitree-public:0.1.0-alpha.1
```

Push:

```
docker push gcr.io/apitree-175506/apitree-public:0.1.0-alpha.1
```
