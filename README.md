# Vector Search Demo

## Prerequisites:

- MongoDB cluster with [```sample_mflix```](https://huggingface.co/datasets/MongoDB/embedded_movies/resolve/main/sample_mflix.embedded_movies.json) sample dataset loaded
- An OpenAI API key with available credits
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

python3 -m venv venv
source ./venv/bin/activate

pip install -r requirements.txt

fastapi dev app/app.py
```

## Frontend

```
cd frontend
npm install
npm start
```
