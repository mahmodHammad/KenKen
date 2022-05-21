import React, {useEffect,useState } from "react";
// import { createTheme ,ThemeProvider,responsiveFontSizes} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
 
 
export default function App() { 
    const gameData = [
        [4, 1, 2, 3],
        [1, 2, 3, 4],
        [2, 3, 4, 1],
        [3, 4, 1, 2]
    ]
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
    const FindRowIndex = (x,y)=>{
       const gameInn = gameArray.findIndex(gg=>gg.findIndex(g=>g[0] == x && g[1]==y)!==-1)
        console.log("gameIN",gameInn)
    }
    
useEffect(() => {
    FindRowIndex(1,2)
  }, []);

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
        borderRadius:"4px"
}}>
        {gameData.map((row,rowIndex)=><Grid container sx={{}}>
            {row.map((col,colIndex)=><Grid item xs={3} sx={{display:"inline-flex",
            width:"150px",height:"150px", border:"1px solid #999", 
            padding:"0px 20px 20px",  flexDirection: "column", justifyContent:"space-around"}}>
                    {/* {FindRowIndex(rowIndex,colIndex)} */}
                    <Box sx={{fontWeight:"bold",fontSize:"26px",color:"#eee"}}>
                        3+
                    </Box>
                    <Box sx={{  display:"flex",justifyContent:"center",fontSize:"46px",fontWeight:"bold" }}>
                        2
                    </Box>
                </Grid>
            )}
        </Grid>
        )}
    </Box>
</Box>
  );
}

