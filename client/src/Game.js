import React, { useEffect, useState } from "react";
// import { createTheme ,ThemeProvider,responsiveFontSizes} from '@mui/material/styles';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CustomSelect from "./Select";

const rann1 = Math.round(Math.random(0) * 100);
const rann2 = Math.round(Math.random(0) * 200);
const rann3 = Math.round(Math.random(0) * 400);

export default function App() {
  const [allgameArray, setAllgameArray] = useState([]);
  const [gameData, setGameData] = useState([]);
  const [SolveMode, setSolveMode] = useState(false);
  const [size, setSize] = useState("");
  const [mode, setMode] = useState("");
  const [restart, setrestart] = useState(false);
  const [renderBoard, setrenderBoard] = useState(false);

  const [SelectedAlgo, setSelectedAlgo] = useState("");

  const algorithmOptions = [
    "Backtracking",
    "Backtracking with forward checking",
    "Backtracking with arc consistency",
  ];

  const gridSizes = [
    "3 \u00D7 3",
    "4 \u00D7 4",
    "5 \u00D7 5",
    "6 \u00D7 6",
    "7 \u00D7 7",
    "8 \u00D7 8",
    "9 \u00D7 9",
  ];
  const modes = ["+", "+ -", "+ - \u00D7", "+ - \u00D7 \u00F7"];

  const handleSelectSize = (algo) => {
    setSize(algo);
  };

  const handleSelectMode = (algo) => {
    setMode(algo);
  };

  const handlerestart = () => {
    setSolveMode(false);
    setSize("");
    setMode("");
    setrestart(false);
    setrenderBoard(false);
    setSelectedAlgo("");
  };
  const handleSelectAlgo = (algo) => {
    setrestart(false);

    setSelectedAlgo(algo);
  };
  // const gameData = [
  //   [4, 1, 2, 3],
  //   [1, 2, 3, 4],
  //   [2, 3, 4, 1],
  //   [3, 4, 1, 2],
  // ];
  // const allgameArray = [
  //   [[0, 0], [0, 1], "4/"],
  //   [[0, 2], [0, 3], [1, 3], "9+"],
  //   [[1, 0], [2, 0], [3, 0], "6"],
  //   [[2, 1], [3, 1], [3, 2], "24"],
  //   [[1, 1], [1, 2], [2, 2], [2, 3], "12*"],
  //   [[3, 3], "2"],
  // ];
  const generateKenKen = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/generate", {
        method: "POST",
        // mode: "no-cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          size: Number(size[0]),
          mode,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        setAllgameArray(data);
        setrenderBoard(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const StartGame = () => {
    generateKenKen();
  };
  const solveKenKen = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/solve", {
        method: "POST",
        // mode: "no-cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          puzzle: allgameArray,
          algorithm: SelectedAlgo,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        setGameData(data);
        setSolveMode(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSolveCLicked = () => {
    solveKenKen();
    setrestart(true);
  };
  allgameArray.forEach((s) => {
    s[s.length - 1] = s.at(-1).replace("*", "\u00D7");
    s[s.length - 1] = s.at(-1).replace("/", "\u00F7");
  });

  // GHANDOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR
  // GHANDOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR
  // GHANDOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR
  // GHANDOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR
  // GHANDOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR

  const randGenerateSize = (size) => {
    const rows = new Array(size).fill(10);
    const generated = rows.map((r) => new Array(size).fill(10));
    return generated;
  };

  const gameArray = allgameArray.map((g) => g.slice(0, -1));

  const FindRowIndex = (x, y) =>
    gameArray.findIndex(
      (f) => f.findIndex((g) => g[0] === x && g[1] === y) !== -1
    );

  useEffect(() => {}, []);

  const hasNeigbour = ([row, col], group) => {
    const sameRow = group.filter((g) => g[0] === row);
    const sameCol = group.filter((g) => g[1] === col);

    let hasLeft =
      sameRow.length > 1
        ? sameRow.findIndex((s) => col === s[1] + 1) !== -1
          ? 0
          : 1
        : 1;
    let hasTop =
      sameCol.length > 1
        ? sameCol.findIndex((s) => row === s[0] + 1) !== -1
          ? 0
          : 1
        : 1;

    return [hasLeft, hasTop];
  };

  const DrawBorder = (rowIndex, colIndex) => {
    let top = 1,
      left = 1,
      renderSymbol = 0;

    // COMMMMMETN
    // COMMMMMETN
    // COMMMMMETN
    // COMMMMMETN
    // COMMMMMETN
    const groupIndex = FindRowIndex(rowIndex, colIndex);
    const groubbbb = gameArray[groupIndex];
    const sortedx = groubbbb.sort((a, b) => a[0] - b[0]);
    const sorted = sortedx.sort((a, b) => a[1] - b[1]);
    const [minRow, minCol] = sorted[0];
    if (rowIndex === minRow && colIndex === minCol)
      renderSymbol =
        allgameArray[groupIndex][allgameArray[groupIndex].length - 1];

    const result = hasNeigbour([rowIndex, colIndex], groubbbb);
    top = result[1];
    left = result[0];

    // COMMMMMETN
    // COMMMMMETN
    // COMMMMMETN
    // COMMMMMETN
    // COMMMMMETN

    return [top, left, renderSymbol];
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      {renderBoard ? (
        <div>
          <Box
            sx={{
              border: "2px solid #999",
              background: "#fff3",
              borderRadius: "4px",
              borderBottom: "8px solid #fff",
              borderRight: "8px solid #fff",
            }}
          >
            {randGenerateSize(Number(size[0])).map((row, rowIndex) => (
              <Grid key={rowIndex} container>
                {row.map((col, colIndex) => {
                  const [BT, BL, drawSympol] = DrawBorder(rowIndex, colIndex);
                  return (
                    <Grid
                      key={colIndex}
                      item
                      sx={{
                        display: "inline-flex",
                        width: "150px",
                        height: "150px",
                        border: "1px solid #fff4",
                        background: `rgb(
                                ${
                                  (rann1 / 1 +
                                    rann1 * FindRowIndex(rowIndex, colIndex)) %
                                  190
                                },
                                ${
                                  rann2 / 10 +
                                  ((rann2 * FindRowIndex(rowIndex, colIndex)) %
                                    100)
                                },
                                ${
                                  (rann3 / 1 +
                                    rann3 * FindRowIndex(rowIndex, colIndex)) %
                                  205
                                })`,
                        borderTop: "8px solid #fff",
                        borderTop: `${BT * 8}px solid #fff`,
                        borderLeft: `${BL * 8}px solid #fff`,

                        padding: "0px 20px 20px",
                        flexDirection: "column",
                        justifyContent: "space-around",
                      }}
                    >
                      {/* {FindRowIndex(rowIndex,colIndex)} */}
                      <Box
                        sx={{
                          fontWeight: "bold",
                          fontSize: "26px",
                          color: "#eee",
                        }}
                      >
                        {drawSympol ? drawSympol : null}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          fontSize: "46px",
                          fontWeight: "bold",
                        }}
                      >
                        {SolveMode ? gameData[rowIndex][colIndex] : null}
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            ))}
          </Box>

          <Box
            sx={{
              marginTop: "60px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <CustomSelect
              value={SelectedAlgo}
              handleSelect={handleSelectAlgo}
              options={algorithmOptions}
              title="Solving algorithm"
            />
            {/* <CustomSelect options={mode} title="Mode"/> */}
            {SelectedAlgo !== "" ? (
              <Button
                onClick={restart ? handlerestart : handleSolveCLicked}
                variant="contained"
                sx={{ padding: "14px 80px", fontSize: "20px" }}
              >
                {" "}
                {restart ? "Restart" : "Solve"}{" "}
              </Button>
            ) : null}
          </Box>
        </div>
      ) : (
        <Box sx={{ width: "600px" }}>
          <CustomSelect
            value={size}
            handleSelect={handleSelectSize}
            options={gridSizes}
            title="Grid size"
          />
          <CustomSelect
            value={mode}
            handleSelect={handleSelectMode}
            options={modes}
            title="Modes"
          />
          {size !== "" && mode !== "" ? (
            <Button
              fullWidth
              onClick={StartGame}
              variant="contained"
              sx={{ padding: "14px 80px", fontSize: "20px" }}
            >
              {" "}
              Generate{" "}
            </Button>
          ) : null}
        </Box>
      )}
    </Box>
  );
}
