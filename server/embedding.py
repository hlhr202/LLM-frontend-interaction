from dotenv import load_dotenv
from pathlib import Path
from llama_index import download_loader, GPTSimpleVectorIndex

load_dotenv()

JSONReader = download_loader("JSONReader")

loader = JSONReader()
documents = loader.load_data(Path('./commands.json'))

index = GPTSimpleVectorIndex(documents)
index.save_to_disk("./index.json")