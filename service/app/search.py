from pymongo import AsyncMongoClient
from os import getenv
from logging import getLogger
from bson import json_util, ObjectId

log = getLogger('uvicorn')

uri = getenv('MONGODB_URI')
client = AsyncMongoClient(uri,
                     tls=True,
                     tlsCertificateKeyFile=getenv('MONGODB_PEM', './keys/mongo.pem'))
db = client[getenv('DB_NAME', 'sample_mflix')]
collection = db[getenv('COLLECTION_NAME', 'embedded_movies')]

def genAggregation(vector: list[float]) -> list:
    return  [
        {
            '$vectorSearch': {
                'index': 'plotVector', 
                'path': 'plot_embedding', 
                'queryVector': vector, 
                'numCandidates': 150, 
                'limit': 10, 
                'quantization': 'scalar'
            }
        }, {
            '$project': { 
                'id': { "$toString": '$_id' },
                '_id': 0,
                'plot': 1, 
                'title': 1, 
                'score': {
                    '$meta': 'vectorSearchScore'
                }
            }
        }
    ]

async def searchVector(vector: list[float]) -> list:
    cursor = await collection.aggregate(genAggregation(vector))
    results = await cursor.to_list()
    return results

async def searchMovie(id: str) -> dict:
    log.info(f'Searching for movie with id: {id}')
    cursor = collection.find({'_id': ObjectId(id)}, {'_id': 0, 'plot_embedding': 0})
    results = await cursor.to_list()
    if len(results) == 0:
        return {}
    return results[0]