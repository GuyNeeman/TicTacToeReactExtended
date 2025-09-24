import '../App.css';

export default function IntroScreen({ setGameon }) {
    return (
        <div className="intro">
            <h1>Hello Player! Welcome!</h1>
            <p>You start with 2 cards. Your goal is to get 4 in a row.</p>
            <p>On your turn, you can either place a piece on the board or use/draw a card.</p>
            <p>The cards hold special powers. You'll have to discover them yourself!</p>
            <p>Good luck!</p>

            <p>-</p>
            <p>Made by Guy Neeman</p>

            <button onClick={() => setGameon(true)}>Start Game</button>
        </div>
    );
}