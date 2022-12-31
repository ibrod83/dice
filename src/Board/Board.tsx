import { useEffect, useState } from 'react';
import './style.css';
import DiceContainer from '../Dice/DiceContainer';
import IconButton from '../shraredComponents/IconButton';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { RxReset } from 'react-icons/rx';
import { FiRefreshCw } from 'react-icons/fi'
import { BsDownload } from 'react-icons/bs'
import { Player as I_Player } from '../Player/types';
import { defaultBoard, getRandomInt } from './utils';
import Player from '../Player/Player'

const jsonFromPersistence = localStorage.getItem('diceGamePersistence')

function Board() {
  const [players, setPlayers] = useState<Array<I_Player>>(defaultBoard.players)//Rely on an array of players, in order to hypothetically support more than two players
  const [goalScore, setGoalScore] = useState(100)
  const [dice1, setCurrentDice1] = useState<number | null>(null)
  const [dice2, setCurrentDice2] = useState<number | null>(null)

  //Create the state from persistence
  useEffect(() => {
    if (jsonFromPersistence) {
      const { players, dice1, dice2, goalScore } = JSON.parse(jsonFromPersistence)
      setPlayers(players)
      setGoalScore(goalScore)
      setCurrentDice1(dice1)
      setCurrentDice2(dice2)
    }
  }, [jsonFromPersistence])

  //Persist any change to the state
  useEffect(() => {
    localStorage.setItem('diceGamePersistence', JSON.stringify({ players, goalScore, dice1, dice2 }))
  }, [players, goalScore, dice1, dice2])

  const currentPlayer = players.find(p => p.isActive === true) as I_Player

  const currentPlayerIndex = players.indexOf(currentPlayer as I_Player)

  const hasEnded = currentPlayer.isWinner === true

  const iconColor = 'var(--first-color)'

  const modifyPlayerByIndex = (index: number, newPlayerObject: Partial<I_Player>) => {
    setPlayers((players) => {
      return players.map((p, i) => {
        if (i === index) {
          return {
            ...p,
            ...newPlayerObject
          }
        }
        return p
      })
    })
  }

  //Moves to the next player in the array, or goes back to the first(relevant for more than two players)
  const switchToNextPlayer = () => {
    modifyPlayerByIndex(currentPlayerIndex, { isActive: false })
    const nextPlayerIndex = players[currentPlayerIndex + 1] ? currentPlayerIndex + 1 : 0
    modifyPlayerByIndex(nextPlayerIndex, { isActive: true })

  }

  const hold = () => {
    const newScore = currentPlayer.overallScore + currentPlayer.currentRoundScore;
    if (newScore >= goalScore) {
      return modifyPlayerByIndex(currentPlayerIndex, { currentRoundScore: 0, overallScore: newScore, isWinner: true, numWins: currentPlayer.numWins + 1 })
    }
    modifyPlayerByIndex(currentPlayerIndex, { currentRoundScore: 0, overallScore: newScore })
    switchToNextPlayer()
  }

  const performStep = () => {
    const dice1 = getRandomInt(1, 6)
    const dice2 = getRandomInt(1, 6)
    setCurrentDice1(dice1)
    setCurrentDice2(dice2)

    const currentRoundScore = currentPlayer.currentRoundScore

    if (dice1 === 6 && dice2 === 6) {
      modifyPlayerByIndex(currentPlayerIndex, { currentRoundScore: 0 })
      switchToNextPlayer()
    } else {
      modifyPlayerByIndex(currentPlayerIndex, { currentRoundScore: currentRoundScore + dice1 + dice2 })
    }
  }

  const newGame = () => {
    setPlayers((currentPlayers) => {
      return defaultBoard.players.map((p, i) => {
        return {
          ...p,
          numWins: currentPlayers[i].numWins//Maintain the number of wins of each player
        }
      })
    })
    setCurrentDice1(null)
    setCurrentDice2(null)
  }

  const reset = () => {
    setPlayers(defaultBoard.players)
    setCurrentDice1(null)
    setCurrentDice2(null)
    setGoalScore(defaultBoard.goalScore)

  }



  return (
    <>
    <div className="board">
      <div className="board__reset">
        <IconButton className='board__reset-button' onClick={reset} icon={<RxReset color={iconColor} />}>Reset All</IconButton>
        <IconButton onClick={newGame} icon={<AiOutlinePlusCircle color={iconColor} />}>New game</IconButton>
      </div>
      <div className="board__players">
        <Player player={players[0]}></Player>
        <Player player={players[1]}></Player>
      </div>
      <div className="board__dices">

        {dice1 && dice2 ? <DiceContainer dice1={dice1} dice2={dice2}></DiceContainer> : null}
      </div>

      <div className="board__controls">
        <IconButton disabled={hasEnded} onClick={() => { performStep() }} icon={<FiRefreshCw color={iconColor} />}>Roll Dice</IconButton>
        <IconButton disabled={hasEnded} onClick={hold} icon={<BsDownload color={iconColor} />}> Hold</IconButton>
        <input min={1} onChange={(e) => { setGoalScore(parseInt(e.target.value)) }} value={goalScore} type="number" className='board__controls-input' placeholder='Final Score' />
      </div>
      
    </div>
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
    </>
    
  );
}

export default Board;
