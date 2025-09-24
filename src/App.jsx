import './App.css';
import TicTacToe from "./tictactoe.jsx";
import React, { useState, useEffect } from "react";
import Cards from "./Cards/Cards.jsx";
import IntroScreen from "./Comp/IntroScreen.jsx";

// --- The New Card Deck ---
// Storing cards as objects makes them much easier to manage.
const cardDeck = [
    {
        id: 1,
        name: "Row Obliterator",
        description: "Removes all pieces from a random row.",
        effect: (squares, size) => {
            const rowToRemove = Math.floor(Math.random() * size);
            const start = rowToRemove * size;
            const end = start + size;
            return squares.map((sq, i) => (i >= start && i < end ? null : sq));
        },
    },
    {
        id: 2,
        name: "Chaos Clear",
        description: "Clears every second square on the board.",
        effect: (squares) => {
            return squares.map((val, index) => (index % 2 !== 0 ? null : val));
        },
    },
    {
        id: 3,
        name: "Center Bomb",
        description: "Clears a 3x3 area in the middle of the board.",
        effect: (squares, size) => {
            const center = Math.floor((size * size) / 2);
            let nextSquares = squares.slice();
            for (let r = -1; r <= 1; r++) {
                for (let c = -1; c <= 1; c++) {
                    const targetIndex = center + (r * size) + c;
                    if (targetIndex >= 0 && targetIndex < squares.length) {
                        nextSquares[targetIndex] = null;
                    }
                }
            }
            return nextSquares;
        },
    },
    {
        id: 4,
        name: "Column Wipe",
        description: "Removes all pieces from a random column.",
        effect: (squares, size) => {
            const colToRemove = Math.floor(Math.random() * size);
            return squares.map((sq, i) => (i % size === colToRemove ? null : sq));
        },
    },
    {
        id: 5,
        name: "Place Blocker",
        description: "Permanently place an unplayable 'B' on a random empty square.",
        effect: (squares) => {
            const emptySquares = squares
                .map((sq, i) => (sq === null ? i : null))
                .filter(i => i !== null);

            if (emptySquares.length > 0) {
                const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
                const nextSquares = squares.slice();
                nextSquares[randomIndex] = 'B'; // 'B' for Blocker
                return nextSquares;
            }
            return squares; // No change if no empty squares
        },
    },
    {
        id: 6,
        name: "Double Turn",
        description: "Play this card to get an extra turn immediately.",
        effect: (squares) => squares,
        endsTurn: false,
    },
];

const getRandomCard = () => cardDeck[Math.floor(Math.random() * cardDeck.length)];

function App() {
    const size = 5;
    const boxes = size * size;
    const [squares, setSquares] = useState(Array(boxes).fill(null));
    const [turn, setTurn] = useState("X");
    const [winner, setWinner] = useState(null);
    const [playerHands, setPlayerHands] = useState({X: [], O: []});
    const [selectedCard, setSelectedCard] = useState(null);
    const [gameon, setGameon] = useState(false)

    useEffect(() => {
        setPlayerHands({
            X: [getRandomCard(), getRandomCard()],
            O: [getRandomCard(), getRandomCard()],
        });
    }, []);

    function calculateWinner(sq) {
        const winLength = size - 1;
        const lines = [];
        for (let r = 0; r < size; r++) {
            lines.push(Array.from({length: size}, (_, c) => r * size + c));
        }
        for (let c = 0; c < size; c++) {
            lines.push(Array.from({length: size}, (_, r) => r * size + c));
        }
        const diag1 = [], diag2 = [];
        for (let i = 0; i < size; i++) {
            diag1.push(i * size + i);
            diag2.push(i * size + (size - 1 - i));
        }
        lines.push(diag1, diag2);

        for (let line of lines) {
            for (let start = 0; start <= line.length - winLength; start++) {
                const segment = line.slice(start, start + winLength);
                const first = sq[segment[0]];
                // Make sure the winner is 'X' or 'O', not a blocker
                if (first && (first === 'X' || first === 'O') && segment.every(idx => sq[idx] === first)) {
                    return first;
                }
            }
        }
        return null;
    }

    function handleSquareClick(i) {
        // A player cannot place a mark if a card is selected
        if (squares[i] || winner || selectedCard) return;

        const nextSquares = squares.slice();
        nextSquares[i] = turn;
        updateGameState(nextSquares);
    }

    // A player draws a new card, which ends their turn.
    function handleDrawCard() {
        if (winner) return;

        setPlayerHands(prevHands => ({
            ...prevHands,
            [turn]: [...prevHands[turn], getRandomCard()],
        }));

        // Drawing a card costs a turn
        setTurn(turn === "X" ? "O" : "X");
    }

    // A player selects a card from their hand to preview it
    function handleSelectCard(card) {
        if (winner) return;
        setSelectedCard(card);
    }

    function handleApplyCard() {
        if (!selectedCard) return;

        // Apply the card's effect function
        const nextSquares = selectedCard.effect(squares, size);

        // Remove the card from the player's hand
        setPlayerHands(prev => ({
            ...prev,
            [turn]: prev[turn].filter(card => card.id !== selectedCard.id)
        }));

        setSelectedCard(null);

        // The "Double Turn" card has a special property to skip ending the turn
        if (selectedCard.endsTurn === false) {
            updateGameState(nextSquares, false); // false = don't switch turn
        } else {
            updateGameState(nextSquares); // switch turn by default
        }
    }

    // Central function to update board state and check for winner
    function updateGameState(nextSquares, switchTurn = true) {
        setSquares(nextSquares);
        const newWinner = calculateWinner(nextSquares);
        if (newWinner) {
            setWinner(newWinner);
        } else if (switchTurn) {
            setTurn(turn === "X" ? "O" : "X");
        }
    }

    function handleReset() {
        setSquares(Array(boxes).fill(null));
        setWinner(null);
        setTurn("X");
        setSelectedCard(null);
        setPlayerHands({
            X: [getRandomCard(), getRandomCard()],
            O: [getRandomCard(), getRandomCard()],
        });
    }

    return (
        <>
            {!gameon ? (
                <IntroScreen setGameon={setGameon} />
            ) : (
                <div className="app-container">
                    <div className="side-panel">
                        <div className="cards-container">
                            <button className="reset" onClick={handleReset}>Reset Game</button>
                        </div>
                    </div>

                    <TicTacToe
                        squares={squares}
                        size={size}
                        onSquareClick={handleSquareClick}
                        winner={winner}
                        turn={turn}
                        onReset={handleReset}
                    />

                    <div className="side-panel">
                        <Cards
                            hand={playerHands[turn]}
                            turn={turn}
                            winner={winner}
                            selectedCard={selectedCard}
                            onDraw={handleDrawCard}
                            onSelectCard={handleSelectCard}
                            onApplyCard={handleApplyCard}
                            onCancel={() => setSelectedCard(null)}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default App;