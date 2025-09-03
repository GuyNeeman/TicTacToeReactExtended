import './App.css'
import TicTacToe from "./tictactoe.jsx";
import {useState} from "react";
import Square from "./Comp/square.jsx";
import Cards from "./Cards/Cards.jsx";

function App() {
    const size = 5;
    const boxes = size * size;
    const [squares, setSquares] = useState(Array(boxes).fill(null));
  return (
    <>
      <TicTacToe squares={squares} setSquares={setSquares} size={size} boxes={boxes}/>
        <Cards squares={squares} setSquares={setSquares} size={size}/>
    </>
  )
}

export default App
