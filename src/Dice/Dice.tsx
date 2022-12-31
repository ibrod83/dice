import React from 'react';
import './style.css';

interface DiceProps {
    number: number
}
const Dice: React.FunctionComponent<DiceProps> = (props) => {

    const renderDice = (number:number)=>{
        switch (number) {
            case 1:
                return <div className="dice face-1">
                <span className="dot">
                </span>
            </div>
            case 2:
                return <div className="dice face-2">
                <span className="dot">
                </span>
                <span className="dot">
                </span>
            </div>
            case 3:
                return <div className="dice face-3">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
            case 4:
                return <div className="face-4 dice">
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
            case 5:
                return <div className="face-5 dice">

                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>

                <div className="column">
                    <span className="dot"></span>
                </div>

                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>

            </div>
            case 6:
                return <div className="face-6 dice">
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>

            </div>
            default:
                return null;
        }
    }

    return (
        renderDice(props.number)
    );
}

export default Dice;
