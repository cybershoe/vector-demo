# Vector Search Demo

## Prerequisites:

- MongoDB cluster with ```mflix``` sample dataset loaded
- Python
- npm/npx

## Service API

1. Set environment variables:
```
OPENAI_API_KEY=<your OpenAI AI key>
MONGODB_URI=<your MongoDB connection string>
```


2. Run the backend API
```
cd service
fastapi dev app/app.py
```

## Frontend

```
cd frontend
npm install
npm start
```