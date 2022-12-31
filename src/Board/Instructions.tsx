import './style.css';

const Instructions = () => {
    return (
        <div className="instructions">
            <h2>Instructions</h2>
            <p>
                The game has 2 players, playing in rounds.
                In each turn, a player rolls 2 dices as many times as he wishes.
                Each result will get added to his round’s score.
                But if the player rolls a double six all his round’s score gets lost.
                After that, its the next player’s turn.
            </p>
            <p>
                A player can choose to ‘Hold’, which means that his round’s score
                gets added to his global score. After that, its the next players turn.
                The first player to reach 100 points wins.
            </p>
            <p>
                Pressing "new game" will reset the score. Pressing reset will also reset the win counter of each player.
            </p>
        </div>
    );
}

export default Instructions;