import Square from "./Comp/square.jsx";

export default function TicTacToe({ squares, size, onSquareClick, winner, turn, onReset }) {
    return (
        <div className="game">
            <h1>Tic Tac Toe</h1>

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
                        onSquareClick={() => onSquareClick(i)}
                        value={value}
                    />
                ))}
            </div>

            <div className="status">
                {winner ? `Winner: ${winner}` : `Turn: ${turn}`}
            </div>
        </div>
    );
}