from copy import copy
import copy
import UtilsFns 

# Backtracking algorithm
def backtrackingSolution (puzzle,r,c,dimension):
    puzzleCopy = copy.deepcopy(puzzle)
    result = []

    if (UtilsFns.fullPuzzle(puzzleCopy)):
        return puzzleCopy

    for i in range(dimension):
        puzzleCopy[r][c] = i+1 
        if (UtilsFns.validSequence(puzzleCopy) and UtilsFns.validGrid(puzzleCopy,r,c)):
            if (c+1 == dimension):
                r+=1
                c=0 
                result = backtrackingSolution(puzzleCopy,r,c,dimension)
            else:
                result = backtrackingSolution(puzzleCopy,r,c+1,dimension)
            if result != -1:
                return result 
    return -1 


# Backtracking with forward checking algorithm
def backtrackingSolutionFC (puzzle,r,c,dimension,domains):
    puzzleCopy = copy.deepcopy(puzzle)
    result = []

    if (UtilsFns.fullPuzzle(puzzleCopy)):
        return puzzleCopy

    for domainElement in (domains[r][c]):
        ok = 1 
        domainsCopy = copy.deepcopy(domains)
        puzzleCopy[r][c] = domainElement
        domainsCopy = UtilsFns.updateDomains(domainsCopy,r,c,domainElement,dimension)

        for i in range (dimension):
            for j in range (dimension):
                if (len(domainsCopy[i][j])) == 0 and puzzleCopy[i][j] == 0:
                    ok = 0

        if (ok and UtilsFns.validSequence(puzzleCopy) and UtilsFns.validGrid(puzzleCopy,r,c)):
            if (c+1 == dimension):
                r+=1
                c=0 
                result = backtrackingSolutionFC(puzzleCopy,r,c,dimension,domainsCopy)
            else:
                result = backtrackingSolutionFC(puzzleCopy,r,c+1,dimension,domainsCopy)
            if result != -1:
                return result 

    return -1 

# backtracking with arc consistency algorithm
def backtrackingSolutionAC (puzzle,r,c,dimension,domains):
    puzzleCopy = copy.deepcopy(puzzle)
    result = []

    if (UtilsFns.fullPuzzle(puzzleCopy)):
        return puzzleCopy

    for domainElement in (domains[r][c]):
        ok = 1 
        domainsCopy = copy.deepcopy(domains)
        puzzleCopy[r][c] = domainElement
        domainsCopy = UtilsFns.updateDomains(domainsCopy,r,c,domainElement,dimension)
        domainsCopy = UtilsFns.checkandremoveInConsistency (domainsCopy,dimension,puzzleCopy)

        for i in range (dimension):
            for j in range (dimension):
                if (len(domainsCopy[i][j])) == 0 and puzzleCopy[i][j] == 0:
                    ok = 0

        if (ok and UtilsFns.validSequence(puzzleCopy) and UtilsFns.validGrid(puzzleCopy,r,c)):
            if (c+1 == dimension):
                r+=1
                c=0 
                result = backtrackingSolutionFC(puzzleCopy,r,c,dimension,domainsCopy)
            else:
                result = backtrackingSolutionFC(puzzleCopy,r,c+1,dimension,domainsCopy)
            if result != -1:
                return result 
    return -1 
