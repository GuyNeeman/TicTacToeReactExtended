import Square from "./Comp/square.jsx";
import React, { useState } from "react";

export default function TicTacToe({squares, setSquares, size, boxes}) {

    const [turn, setTurn] = useState("X");
    const [winner, setWinner] = useState(null);

    function calculateWinner(sq) {
        const winLength = size - 1;
        const lines = [];

        // Rows
        for (let r = 0; r < size; r++) {
            const row = [];
            for (let c = 0; c < size; c++) {
                row.push(r * size + c);
            }
            lines.push(row);
        }

        // Cols
        for (let c = 0; c < size; c++) {
            const col = [];
            for (let r = 0; r < size; r++) {
                col.push(r * size + c);
            }
            lines.push(col);
        }

        // Diagonal (top-left → bottom-right)
        const diag1 = [];
        for (let i = 0; i < size; i++) {
            diag1.push(i * size + i);
        }
        lines.push(diag1);

        // Diagonal (top-right → bottom-left)
        const diag2 = [];
        for (let i = 0; i < size; i++) {
            diag2.push(i * size + (size - 1 - i));
        }
        lines.push(diag2);

        for (let line of lines) {
            for (let start = 0; start <= line.length - winLength; start++) {
                const segment = line.slice(start, start + winLength);
                const first = sq[segment[0]];
                if (first && segment.every(idx => sq[idx] === first)) {
                    return first;
                }
            }
        }
        return null;
    }

    function handleClick(i) {
        if (squares[i] || winner) return;

        const nextSquares = squares.slice();
        nextSquares[i] = turn;
        setSquares(nextSquares);

        const win = calculateWinner(nextSquares);
        if (win) {
            setWinner(win);
        } else {
            setTurn(turn === "X" ? "O" : "X");
        }
    }

    function Reset() {
        setSquares(Array(boxes).fill(null));
        setWinner(null);
        setTurn("X");
    }

    return (
        <div className="game">
            <h1>Tic Tac Toe </h1>

            <div
                className="grid"
                style={{
                    display: "grid",
                    gap: "5px",
                    gridTemplateColumns: `repeat(${size}, 100px)`,
                    gridTemplateRows: `repeat(${size}, 100px)`
                }}
            >
                {squares.map((value, i) => (
                    <Square
                        key={i}
                        onSquareClick={() => handleClick(i)}
                        value={value}
                    />
                ))}
            </div>

            <div className="status">
                {winner ? `Winner: ${winner}` : `Turn: ${turn}`}
            </div>

            <button className="reset" onClick={Reset}>
                Reset Game
            </button>
        </div>
    );
}
