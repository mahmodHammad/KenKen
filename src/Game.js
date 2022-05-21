import React, {useEffect,useState } from "react";
// import { createTheme ,ThemeProvider,responsiveFontSizes} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
 
 const rann1 =Math.round(Math.random(0)*100)
 const rann2 =Math.round(Math.random(0)*200)
 const rann3 =Math.round(Math.random(0)*400) 

export default function App() { 
    const gameData = [
        [4, 1, 2, 3],
        [1, 2, 3, 4],
        [2, 3, 4, 1],
        [3, 4, 1, 2],
    ]
    // const gameData = [
    //     [4, 1, 2, 3,4, 1, 2, 3,4, 1],
    //     [4, 1, 2, 3,4, 1, 2, 3,4, 1],
    //     [4, 1, 2, 3,4, 1, 2, 3,4, 1],
    //     [4, 1, 2, 3,4, 1, 2, 3,4, 1],
    //     [4, 1, 2, 3,4, 1, 2, 3,4, 1],
    //     [4, 1, 2, 3,4, 1, 2, 3,4, 1],
    //     [4, 1, 2, 3,4, 1, 2, 3,4, 1],
    //     [4, 1, 2, 3,4, 1, 2, 3,4, 1],
    //     [4, 1, 2, 3,4, 1, 2, 3,4, 1], 
    // ]
const allgameArray = [
[[0, 0], [0, 1], '4/'],
[[0, 2], [0, 3], [1, 3], '9+'],
[[1, 0], [2, 0], [3, 0], '6'],
[ [2, 1], [3, 1], [3, 2], '24'],
[[1, 1],[1, 2], [2, 2], [2, 3], '12*'],
[[3, 3], '2']] 

const randGenerateSize  = (size)=>{
    const rows = new Array(size).fill(10)
    const generated = rows.map(r=>  new Array(size).fill(10))
    console.log("generated",generated)
}
const gameArray = allgameArray.map(g=>{
    // const newRow = g.map(item=>{
    //     return item.slice(0,-1)
    // })
   const newRow =  g.slice(0,-1)
    return newRow
})
console.log("gameArray",gameArray)
// const gameArray = [
//     [[0, 0], [0, 1],[1, 1],[1, 2]],
//     [[0, 2], [0, 3], [1, 3]],
//     [[1, 0], [2, 0], [3, 0]],
//     [  [3, 1], [3, 2]],
//     [ [2, 1],[2, 2], [2, 3]],
//     [[3, 3]]
// ] 

// Do we have top or left neignbour (if yes don't drow)
 

    const FindRowIndex = (x,y)=>gameArray.findIndex(f=>f.findIndex(g=>g[0]===x && g[1]===y)!==-1)
    

useEffect(() => {
    randGenerateSize(5)
    // const t = [ [2, 1],[2, 2], [2, 3]]
    // hasNeigbour([2,2],t)
    
  }, []);

  const hasNeigbour = (item,group)=>{
    //   const gtest = [[0, 0], [1, 0],[0, 1],[1, 1],[1, 2]]
    const [row,col] = item
    const sameRow = group.filter(g=>(g[0]==row ))
    const sameCol = group.filter(g=>(g[1]==col ))

    console.log("S",sameRow)
    console.log("col",col)
    let hasLeft , hasTop
    if(sameRow.length>1){
          hasLeft =  sameRow.findIndex(s=>{
            // console.log( col,s[1])
            // console.log(col==s[1]-1 , col==s[1]+1)
           
            return col==s[1]+1
          }) !==-1 ? 0 : 1
    }else{
        console.log("items",item )
        hasLeft = 1
    }
    if(sameCol.length>1){
        hasTop = sameCol.findIndex(s=>row==s[0]+1)!==-1 ? 0 : 1
    }else{
        hasTop = 1
    } 
    console.log(hasTop,hasLeft)
   return [hasLeft,hasTop]
  }

 
  const DrawBorder = (rowIndex, colIndex)=>{

    let top = 1 , left=1, renderSymbol = 0
    const groupIndex = FindRowIndex(rowIndex,colIndex)
    const groubbbb = gameArray[groupIndex]
    const sortedx = groubbbb.sort((a,b)=>a[0]-b[0])
    const sorted = sortedx.sort((a,b)=>a[1]-b[1])
    const [minRow, minCol] = sorted[0] 
    if(rowIndex === minRow && colIndex ===minCol){
        renderSymbol= allgameArray[groupIndex][allgameArray[groupIndex].length-1]
 
    }
    const result = hasNeigbour([rowIndex,colIndex],groubbbb)
    top = result[1]
    left= result[0]
    
    return [top,left,renderSymbol]
  }

  return (
<Box sx={{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"100vh",
    flexDirection:"column", 
}}>

    <Box sx={{marginBottom:"60px", background:"#ffffff06",padding:"10px 20px",borderRadius:"6px"}}>
        <Typography variant="h3">
            The last fucken project
        </Typography>
    </Box>
    <Box sx={{
        border:"2px solid #999",
        background:"#fff3",
        borderRadius:"4px",
        borderBottom:"8px solid #fff",
        borderRight:"8px solid #fff",


}}>
        {gameData.map((row,rowIndex)=><Grid key={rowIndex} container >
                    {row.map((col,colIndex)=>{
                        const [BT ,BL,drawSympol] = DrawBorder(rowIndex, colIndex)
                        return(<Grid key={colIndex} item sx={{display:"inline-flex",
                            width:"150px",height:"150px", border:"1px solid #fff4", 
                            background:`rgb(
                            ${(rann1/1+rann1*FindRowIndex(rowIndex,colIndex))%190},
                            ${rann2/10+((rann2 *FindRowIndex(rowIndex,colIndex)))%100},
                            ${(rann3/1+rann3 *FindRowIndex(rowIndex,colIndex))%205})`,
                            borderTop:"8px solid #fff",
                            borderTop:`${ BT*8}px solid #fff`, 
                            borderLeft:`${ BL*8}px solid #fff`,
                            
                            padding:"0px 20px 20px",  flexDirection: "column", justifyContent:"space-around"}}>
                            {/* {FindRowIndex(rowIndex,colIndex)} */}
                            <Box sx={{fontWeight:"bold",fontSize:"26px",color:"#eee"}}>
                               {drawSympol? drawSympol :null} 
                            </Box>
                            <Box sx={{  display:"flex",justifyContent:"center",fontSize:"46px",fontWeight:"bold" }}>
                                {gameData[rowIndex][colIndex]}
                            </Box>
                         </Grid>)}
            )}
        </Grid>
        )}
    </Box>

    <Box sx={{marginTop:"60px"}}>
        <Button variant="contained" sx={{padding:"3px 80px",fontSize:"20px"}} > Solve </Button>
    </Box>

</Box>
  );
}

