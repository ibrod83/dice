import Dice from './Dice';
import './style.css';
import React from 'react'

export const DiceContainer: React.FunctionComponent<{dice1:number,dice2:number}> = ({dice1,dice2})=> {
    return (
        < div className='dice-container'>
           <Dice number={dice1}></Dice>
           <Dice number={dice2}></Dice>
        </div>
    );
}

export default DiceContainer;