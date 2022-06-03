import time
from algorithms import *
from UtilsFns import *

def tb(boardsNo, dimension, mode):

    bt_time = 0
    btFC_time = 0
    btAC_time = 0

    for x in range(boardsNo):
        cageDict = {}

        puzzle = generatePuzzle(dimension)
        cages = generateCages (puzzle)
        cages = assignOpToCage(puzzle,cages,mode)
        emptyPuzzle =  [[0 for y in range(dimension)] for x in range(dimension)]
        domains = [[list(range(1,dimension+1)) for y in range(dimension)] for x in range(dimension)]

        start = time.time()

        # solving the puzzle with backtracking algorithm 
        btSol = backtrackingSolution(emptyPuzzle,0,0,dimension)

        end = time.time()

        bt_time = bt_time + ( end - start )

        start = time.time()

        # solving the puzzle with backtracking with forawrd checking algorithm 
        btSolFC = backtrackingSolutionFC(emptyPuzzle,0,0,dimension,domains)

        end = time.time()

        btFC_time = btFC_time + ( end - start )

        start = time.time()

        # solving the puzzle with backtracking with arc consistency algorithm 
        btSolAC = backtrackingSolutionAC (emptyPuzzle,0,0,dimension,domains)

        end = time.time()

        btAC_time = btAC_time + ( end - start )


    print("Average time solving {x} boards using BackTracking: ".format(x=boardsNo),bt_time / boardsNo)
    print("Average time solving {x} boards using BackTracking with forawrd checking: ".format(x=boardsNo),btFC_time / boardsNo)
    print("Average time solving {x} boards using BackTracking with arc consistency: ".format(x=boardsNo),btAC_time / boardsNo)