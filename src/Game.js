import React, {useEffect,useState } from "react";
// import { createTheme ,ThemeProvider,responsiveFontSizes} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
 
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
// const gameArray = [
// [[0, 0], [0, 1], '4.0/'],
// [[0, 2], [0, 3], [1, 3], '9+'],
// [[1, 0], [2, 0], [3, 0], '6'],
// [[1, 1], [2, 1], [3, 1], [3, 2], '24'],
// [[1, 2], [2, 2], [2, 3], '12*'],
// [[3, 3], '2']] 
const gameArray = [
    [[0, 0], [0, 1]],
    [[0, 2], [0, 3], [1, 3]],
    [[1, 0], [2, 0], [3, 0]],
    [[1, 1], [2, 1], [3, 1], [3, 2]],
    [[1, 2], [2, 2], [2, 3]],
    [[3, 3]]
] 
/* 

*/
    const FindRowIndex = (x,y)=>gameArray.findIndex(f=>f.findIndex(g=>g[0]===x && g[1]===y)!==-1)
    

useEffect(() => {
    // const test = [[1,2],[1,0],[1,3]] 
    // // [1,2]

    //         let counter=0
    //         test.forEach(s=>{
    //             if(s[0] == 1){
    //                 console.log("YSS",counter)
    //                 console.log("s",s)
                    
    //                 counter++
    //             }
    //         })
    // FindRowIndex(1,2)
  }, []);

  const DrawBorder = (rowIndex, colIndex)=>{
    let top = 1 , left=1
    const groupIndex = FindRowIndex(rowIndex,colIndex)
    const groubbbb = gameArray[groupIndex]
    const sortedx = groubbbb.sort((a,b)=>a[0]-b[0])
    const sorted = sortedx.sort((a,b)=>a[1]-b[1])
    const [minRow, minCol] = sorted[0]
    const [maxRow, maxCol] = sorted[sorted.length-1]
    //  sorted.forEach(s=>{

    //  })

    // (1,3)
    const test = [[1,2],[1,0],[1,3]] 
    // [1,2]

            let counter=0
            sorted.forEach(s=>{
                if(s[0] == rowIndex){ 
                    counter++
                }
            })
            let fuck=0
            sorted.forEach(s=>{
                if(s[1] == colIndex){ 
                    fuck++
                }
            })
         
    // console.log("Lonn",lonely) 
    // const onlyrows = sorted.map((s,index)=>{
    //     const f =  sorted.filter(filteredS=>{
    //         if(filteredS[1] ==sorted[index][1]){
    //             console.log(filteredS,sorted[index])
    //         }
    //         return filteredS[1] ==sorted[index][1]
    //     })
    //     return []
    //     // console.log("FFa7aF",f)

    // })
   const ff  =  [
        [
           [0,2],
           [0,3]
        ],[
            [1,3]
        ]
    ]
    if( colIndex>minCol){
        left=0
    }
    if( counter==1){
        left=1
    }
    if(rowIndex>minRow){
        top=0
    }
    if(fuck ==1){
        top=1
    }
    return [top,left]
  }
  return (
<Box sx={{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"100vh",
    flexDirection:"row", 
}}>
    <Box sx={{
        border:"2px solid #999",
        background:"#fff3",
        borderRadius:"4px",
        borderBottom:"8px solid #fff",
        borderRight:"8px solid #fff",


}}>
        {gameData.map((row,rowIndex)=><Grid container sx={{}}>
                    {row.map((col,colIndex)=>{
                        const [BT ,BL] = DrawBorder(rowIndex, colIndex)
                        return(<Grid item sx={{display:"inline-flex",
                            width:"150px",height:"150px", border:"1px solid #999", 
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
                                3+
                            </Box>
                            <Box sx={{  display:"flex",justifyContent:"center",fontSize:"46px",fontWeight:"bold" }}>
                                2
                            </Box>
                         </Grid>)}
            )}
        </Grid>
        )}
    </Box>
</Box>
  );
}

