import React from 'react';
import { Player as I_Player } from './types';

import './style.css';

interface PlayerProps {
    player:I_Player
}
const Player: React.FunctionComponent<PlayerProps> = ({player}) => {
    const {isWinner,isActive,name,overallScore,currentRoundScore,numWins} = player
    const playerStyle = () => ({ background: isActive ? '#ECF1F7' : undefined })


    return (
        <div className="player" style={playerStyle()}>
          <h3 className='player__name'>{isWinner ? 'Winner!' : name}{isActive ? <span className="player__indicator">&#9679;</span> :null} </h3>
          <p className='player__numWins'>Number of wins: {numWins}</p>
          <p className="player__score">
            {overallScore}
          </p>
          <div className="player__current">
            <div className="player__current-content">
              <p className='player__current-title'>Current</p>
              <p className='player__current-dice'> {currentRoundScore}</p>
            </div>

          </div>
        </div>
    );
}

export default Player;
