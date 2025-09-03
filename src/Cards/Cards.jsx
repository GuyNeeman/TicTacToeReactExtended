export default function Cards({setSquares, size}) {

    function getCard() {
        const card = Math.floor(Math.random() * 3) + 1;

        switch (card) {
            case 1:
                setSquares(prevSquares => prevSquares.slice(0, -size));
                break;
            case 2:
                setSquares(prev => prev.map((value, index) => index % 2 === 0 ? value : null));
                break;
        }
    }

    return (
        <button onClick={getCard}/>
    )
}