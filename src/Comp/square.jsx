export default function Square({ value, onSquareClick}) {
    const className = `square ${value === 'B' ? 'blocker' : ''}`;

    return (
        <button className={className} onClick={onSquareClick}>
            {value}
        </button>
    );
}