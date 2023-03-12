from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from llama_index import GPTSimpleVectorIndex
from langchain.agents import Tool
from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain import OpenAI
from langchain.agents import initialize_agent
import json

load_dotenv()

index = GPTSimpleVectorIndex.load_from_disk("./index.json")

app = FastAPI()

tools = [
    Tool(
        name="GPT Index",
        func=lambda q: str(index.query(
            "Translate this command to json: " + q)),
        description=f"useful when you need to translate user jumping or redirecting command to json format, the json object properties are 'command' in string and 'path' in string. The input to this tool should be a command in english, you should always return command as json format to user",
        return_direct=True,
    )
]

memory = ConversationBufferMemory(memory_key="chat_history")
llm = OpenAI(temperature=0, model_name="gpt-3.5-turbo")
agent_chain = initialize_agent(
    tools, llm, agent="conversational-react-description", memory=memory)


class Query(BaseModel):
    query: str


@app.post("/api/query")
async def post_query(req: Query):
    resp = agent_chain.run(input=req.query)
    print(resp)
    try:
        command = json.JSONDecoder().decode(resp)
        print(command)
        return command
    except:
        return {"CODE": "FAILED"}
