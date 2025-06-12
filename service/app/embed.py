from openai import OpenAI
from logging import getLogger
from os import getenv

log = getLogger('uvicorn')

client = OpenAI(api_key=getenv('OPENAI_API_KEY'))
model = getenv('OPENAI_MODEL', 'text-embedding-ada-002')



def embedString(text: str) -> list[float]:

    try:
        res = client.embeddings.create(
            input = text,
            model = model
        )

        log.info(f'Usage: prompt tokens = {res.usage.prompt_tokens}, total tokens = {res.usage.total_tokens}')

        return res.data[0].embedding
    
    except:
        return []