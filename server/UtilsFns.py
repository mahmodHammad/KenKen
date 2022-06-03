from copy import copy
from random import randint,shuffle
import copy

cageDict = {}

def validSequence(puzzle):
    valid = 1 
    for i in range (len(puzzle)):
        for j in range (len(puzzle)):
            curr_row = puzzle[i]
            curr_col = [row[j] for row in puzzle]
            if (puzzle[i][j] and (curr_row.count(puzzle[i][j]) > 1 or curr_col.count(puzzle[i][j]) > 1)):
                valid = 0 
                return 0 
    return 1 

def validGrid (puzzle , r , c ):
    cage = cageDict[(r,c)]
    val = 0 
    op = ''
    visited = 0
    if (len(cage) == 2 ):
        val = int(cage[-1])
        return  puzzle[r][c] == val 
    else:
        val = int (cage[-1][:-1])
        op = cage[-1][-1]
        cage = cage[:-1]

    for cell in cage:
        if (puzzle[cell[0]][cell[1]] != 0 ):
            visited += 1

    if (op == '+'):
        temp = 0
        for cell in cage:
            temp += puzzle[cell[0]][cell[1]]
        if ((temp < val and visited < len(cage)) or (temp ==val and visited == len(cage))):
            return True

    if (op == '-'):
        num1 = puzzle[cage[0][0]][cage[0][1]]
        num2 = puzzle[cage[1][0]][cage[1][1]]
        if ( num1 == 0 or num2 == 0 or abs(num1-num2) == val):
            return True

    if (op == '*'):
        temp = 1
        for cell in cage:
            temp *= puzzle[cell[0]][cell[1]]
        if ((temp < val and visited < len(cage)) or (temp == val and visited == len(cage))):
            return True

    if (op == '/'):
        mx =  max(puzzle[cage[0][0]][cage[0][1]],puzzle[cage[1][0]][cage[1][1]])
        mn = min(puzzle[cage[0][0]][cage[0][1]] , puzzle[cage[1][0]][cage[1][1]])
        if (mn != 0  and (mx/mn) == val):
            return True
        if (mn == 0 and visited<len(cage)):
            return True
        

    return False

def shiftLeftRotate (arr):
    return arr[-1:] + arr[:-1]  

def generatePuzzle (dimension):
    puzzle =  [[0 for y in range(dimension)] for x in range(dimension)]
    row = [] 
    for i in range (dimension):
        row.append(i+1)

    for i in range (dimension):
        puzzle[i] = row
        row = shiftLeftRotate(row)
    
    if (dimension < 7):
        for i in range (dimension) :
            shuffle(puzzle)
    return puzzle 

def valid (visited, i , j , L , H):
    return 0<= i and i < L and 0<=j and j< H and not visited[i][j]

def generateCages (puzzle) :
    visited =  [[0 for y in range(len(puzzle))] for x in range(len(puzzle))]
    cages = []
    for i in range (len(puzzle)):
        for j in range (len(puzzle)):
            if(not visited[i][j]) :
                cage = []
                cageSize = randint(1,4)
                cage.append((i,j))
                # print("cage size: ",cageSize)
                cageSize -= 1
                visited[i][j] = 1
                dir = [[-1,0],[0,-1],[1,0],[0,1]]

                new_row = i 
                new_col =  j
                while cageSize>0: 
                    randDir = randint(0,3)
                    # checking if the cageSize more than available cells then break 
                    count = 0
                    for pair in dir :
                        if (not valid(visited, new_row+pair[0] , new_col+pair[1] , len(puzzle) , len(puzzle))):
                            count+=1
                    if (count == 4):
                        # print("count: ",count)
                        break 
                    new_row += dir[randDir][0]
                    new_col += dir[randDir][1]
                        
                    if (valid(visited, new_row , new_col , len(puzzle) , len(puzzle))):
                        visited[new_row][new_col] = 1 
                        cage.append((new_row,new_col))
                        cageSize -= 1
                    else :
                        new_row -= dir[randDir][0]
                        new_col -= dir[randDir][1]
                cages.append(cage)

    
    for cage in cages:
        for cell in cage:
            cageDict[cell] = cage
    return cages
                
# mode 0 --> +
#      1 --> + , - 
#      2 --> + , - , * 
#      3 --> + , - , * , /
def assignOpToCage (puzzle,cages,mode):
    ops = ['+','-','*','/']
    for cage in cages :
        # [[1, 3], [2, 3], [3, 3]]
        if (len(cage) == 1):
            cage.append(str(puzzle[cage[0][0]][cage[0][1]]))
            continue 

        op = ops[randint(0,mode)]
        if (len(cage) != 2 and  op == '-'):
            op = '+'
        elif (len(cage) != 2 and  op == '/'):
            op = '*'
        val =  1 if (op == '*' or op == '/') else 0 
        if (op == '/'):
            mx =  max(puzzle[cage[0][0]][cage[0][1]],puzzle[cage[1][0]][cage[1][1]])
            mn = min(puzzle[cage[0][0]][cage[0][1]] , puzzle[cage[1][0]][cage[1][1]])
            if (mx % mn == 0):
                val =  int(mx/mn)
            else :
                op = '*'

        for cell in cage :
            # [1,3]
            if (op == '+'):
                val += puzzle[cell[0]][cell[1]]
            elif (op == '-'):
                val -= puzzle[cell[0]][cell[1]]
            elif (op == '*'):
                val *= puzzle[cell[0]][cell[1]]
            val = abs(val)
        cage.append(str(val)+ str(op))
    return cages

def fullPuzzle(puzzle):
    for row in (puzzle):
        for cell in (row):
            if (cell == 0):
                return 0 
    return 1


# Backtracking algorithm
def backtrackingSolution (puzzle,r,c,dimension):
    puzzleCopy = copy.deepcopy(puzzle)
    result = []

    # if (puzzle[1] == [4,3,2,0]):
    #     g = 10
    if (fullPuzzle(puzzleCopy)):
        return puzzleCopy

    for i in range(dimension):
        puzzleCopy[r][c] = i+1 
        if (validSequence(puzzleCopy) and validGrid(puzzleCopy,r,c)):
            if (c+1 == dimension):
                r+=1
                c=0 
                result = backtrackingSolution(puzzleCopy,r,c,dimension)
            else:
                result = backtrackingSolution(puzzleCopy,r,c+1,dimension)
            if result != -1:
                return result 
    return -1 
'''-----------------------------------------------------------------'''
# update domains for FC algorithm
def updateDomains (domains , r , c ,test , dimension):
    for i in range(dimension):
        if (domains[r][i].count(test)):
            domains[r][i].remove(test) 
        if (domains[i][c].count(test)):
            domains[i][c].remove(test)
    return domains

# check consistency
def checkandremoveInConsistency (domains,dimension,puzzle):
    changed = 1
    while(changed):
        changed = 0
        for i in range (dimension):
            for j in range (dimension):
                if len(domains[i][j]) == 1 and puzzle[i][j] == 0:
                    temp = domains[i][j][0]
                    tempDomain = copy.deepcopy(domains)
                    domains = updateDomains (domains , i , j ,temp , dimension)
                    domains[i][j].append(temp) 
                    if (tempDomain != domains):
                        changed = 1
    return domains

    #    A                               B
    # [1,2,3] ----- A+B+C = 8 ----- [1,2,3]
    #                 |
    #                 |
    #                 |
    #                 C
    #              [1,2,3]
    #                   x
    #             1     2     3
    #           1 2 3 1 2 3 1 2 3
    #     123 123 123 123 123 123 123 123



