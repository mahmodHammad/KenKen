from algorithms import *
from UtilsFns import *
from benchmark import tb

# ---------------- MAIN -----------------

dimension = 4
mode = 0
puzzle = generatePuzzle(dimension)


# Solution using 3 algorithms
"""-----------------------------------------------------"""
# generate cages without ops
# cages = generateCages (puzzle)
# cages after choosing ops for each cage
# cages = assignOpToCage(puzzle,cages,mode)


# generating empty puzzle to be solved
# emptyPuzzle =  [[0 for y in range(dimension)] for x in range(dimension)]
# domains = [[list(range(1,dimension+1)) for y in range(dimension)] for x in range(dimension)]

# solving the puzzle with backtracking algorithm 
# btSol = backtrackingSolution(emptyPuzzle,0,0,dimension)

# solving the puzzle with backtracking with forawrd checking algorithm 
# btSolFC = backtrackingSolutionFC(emptyPuzzle,0,0,dimension,domains)

# solving the puzzle with backtracking with arc consistency algorithm 
# btSolAC = backtrackingSolutionAC (emptyPuzzle,0,0,dimension,domains)

# for row in  (btSolAC):
    # print(row)


# testBench
"""-----------------------------------------------------"""
# testscount = 1000
# tb(testscount, dimension, mode)