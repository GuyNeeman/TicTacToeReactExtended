import React from 'react';

export default function Cards({ hand, turn, winner, selectedCard, onDraw, onSelectCard, onApplyCard, onCancel }) {

    return (
        <div className="cards-container">
            <h2>Player {turn}'s Turn</h2>

            {/* Show the selected card's details and actions */}
            {selectedCard ? (
                <div className="card-display">
                    <h3>{selectedCard.name}</h3>
                    <p>{selectedCard.description}</p>
                    <button className="apply-btn" onClick={onApplyCard} disabled={!!winner}>
                        Apply Effect
                    </button>
                    <button className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            ) : (
                <>
                    {/* Show the draw button and the player's hand */}
                    <div className="card-action">
                        <p>Choose an action:</p>
                        <button onClick={onDraw} disabled={!!winner}>
                            Draw a Card (Ends Turn)
                        </button>
                    </div>

                    <div className="hand-display">
                        <h3>Your Hand:</h3>
                        {hand.length > 0 ? (
                            hand.map((card, index) => (
                                <button key={index} className="card-in-hand" onClick={() => onSelectCard(card)}>
                                    {card.name}
                                </button>
                            ))
                        ) : (
                            <p><i>No cards in hand.</i></p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}