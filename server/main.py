from typing import List
from copy import deepcopy
from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
unmanipulatedList = None
class GenerateBody(BaseModel):
    size: int
    mode: str

class SolveBody(BaseModel):
    puzzle: List
    algorithm: str

app = FastAPI()
origin=["http://127.0.0.1:8000", "http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
    expose_headers=['*']
)
@app.post("/generate", status_code=200)
async def generate(body: GenerateBody):
    data = [[(0, 0), (0, 1), "4/"],
            [(0, 2), (0, 3), (1, 3), "9+"],
            [(1, 0), (2, 0), (3, 0), "6"],
            [(2, 1), (3, 1), (3, 2), "24"],
            [(1, 1), (1, 2), (2, 2), (2, 3), "12*"],
            [(3, 3), "2"]]
    global unmanipulatedList 
    unmanipulatedList = deepcopy(data)
    for row in data:
        for j in range(len(row)-1):
            row[j] = list(row[j])
    res = jsonable_encoder(data)
    return JSONResponse(content=res)

@app.post("/solve", status_code=200)
async def solve(body: SolveBody):
    data = [[4, 1, 2, 3],
            [1, 2, 3, 4],
            [2, 3, 4, 1],
            [3, 4, 1, 2],
           ]
    res = jsonable_encoder(data)
    return JSONResponse(content=res)
