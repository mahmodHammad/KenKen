from copy import deepcopy
from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
# from GeneratePuzzle import generatePuzzle, generateCages, assignOpToCage, backtrackingSolution, backtrackingSolutionFC, backtrackingSolutionAC
from logic import *

class GenerateBody(BaseModel):
    size: int
    mode: str

class SolveBody(BaseModel):
    size: int
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
    puzzle = generatePuzzle(body.size)
    cages = generateCages(puzzle)
    cages = assignOpToCage(puzzle,cages,int(body.mode))
    for row in cages:
        for j in range(len(row)-1):
            row[j] = list(row[j])
    res = jsonable_encoder(cages)
    return JSONResponse(content=res)

@app.post("/solve", status_code=200)
async def solve(body: SolveBody):
    domains = [[list(range(1,int(body.size)+1)) for y in range(int(body.size))] for x in range(int(body.size))]
    emptyPuzzle =  [[0 for y in range(int(body.size))] for x in range(int(body.size))]
    if (body.algorithm == "Backtracking"):
        data = backtrackingSolution(emptyPuzzle,0,0,int(body.size))
    elif (body.algorithm == "Backtracking with forward checking"):
        data = backtrackingSolutionFC(emptyPuzzle,0,0,int(body.size),domains)
    elif (body.algorithm == "Backtracking with arc consistency"):
        data = backtrackingSolutionAC (emptyPuzzle,0,0,int(body.size),domains)
    res = jsonable_encoder(data)
    return JSONResponse(content=res)
