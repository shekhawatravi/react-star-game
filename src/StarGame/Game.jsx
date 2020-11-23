import React, {useEffect, useState} from 'react';

import GameHeader from './GameHeader';
import PlayNumber from './PlayNumber';
import StarDisplay from './StarDisplay';
import PlayAgain from './PlayAgain';
import Utils from './Utils';

const Game = (props) => {
    const [stars, setStars] = useState(Utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(Utils.range(1,9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);
    
    useEffect(() =>{
        if (secondsLeft > 0 && availableNums.length > 0){
            const timerId = setTimeout(() =>{
                setSecondsLeft(secondsLeft - 1);
            }, 1000);

            return () => clearTimeout(timerId);
        }
    });


    const candidatesAreWrong = Utils.sum(candidateNums) > stars;
    const gameIsDone = availableNums.length === 0;
    const gameIsLost = secondsLeft === 0;

    const gameStatus = availableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active'

    const resetGame = () =>{
        props.startNewGame();
    //     setStars(Utils.random(1, 9));
    //     setAvailableNums(Utils.range(1,9));
    //     setCandidateNums([]);
    }

    const numberStatus = (number) => {
        if(!availableNums.includes(number)){
            return 'used';
        }
        if (candidateNums.includes(number)){
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }
        return 'available';
    };

    const onNumberClick = (number, currentStatus) => {
        if (currentStatus === 'used' || gameStatus !==  'active'){
            return;
        }
        const newCandidateNums = currentStatus === 'available' 
            ? candidateNums.concat(number) 
            : candidateNums.filter(cn => cn !== number);
        if (Utils.sum(newCandidateNums) !== stars){
            setCandidateNums(newCandidateNums);
        } else {
            const newAvailableNums = availableNums.filter( 
                n => !newCandidateNums.includes(n)
            );
            // redraw stars from what is available
            setStars(Utils.randomSumIn(newAvailableNums, 9));
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
        }
    };

    return (
      <div className="game">
        <GameHeader />
        <div className="body">
          <div className="left">
            {gameStatus !== 'active' ? (
                <PlayAgain onClick={resetGame} gameStatus={gameStatus}/>
            ) : (
                <StarDisplay count={stars}/>
            ) }

          </div>
          <div className="right">
          {
              Utils.range(1, 9).map( (number, index) =>{
                  return(
                      <PlayNumber 
                        key={number} 
                        number={number}                         
                        status={numberStatus(number)}
                        onClick= {onNumberClick}
                      />
                  );
              } )
          }
          </div>
        </div>
        <div className="timer">Time Remaining(Seconds): {secondsLeft}</div>
      </div>
    );
  };


export default Game;