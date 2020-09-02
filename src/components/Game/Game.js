import React, { useState, useEffect } from "react";
import { Screen } from "./Screen";
import { Panel } from "../Panel/Panel";
import boomEffect from "../../assets/explosion.mp3";
import onGoingEffect from "../../assets/ongoing.mp3";
import "../../styles/game.css";

export const Game = ({ push, balance, balanceChange }) => {
  const boomSound = new Audio(boomEffect);
  const onGoingSound = new Audio(onGoingEffect);
  const [timer, setTimer] = useState(10);
  const [info, setInfo] = useState({ autoBet: 1.0, autoOff: 2.0 });
  const [coefficient, setCoefficient] = useState(1);
  const [boom, setBoom] = useState(false);
  const [autoBet, setAutoBet] = useState(false);
  const [autoOff, setAutoOff] = useState(false);
  const [bet, setBet] = useState(false);
  const [win, setWin] = useState(0);
  // Function to increase coefficient
  const increaseCoefficient = () => {
    onGoingSound.play();
    // In one out of 10 games, change will be increased
    let chanceFrom = Math.floor(Math.random() * 10 === 3) ? 150 : 35;
    let toAdd = 0;
    const game = () => {
      toAdd += 0.002;
      setCoefficient(prevState => prevState + toAdd);
      if (Math.floor(Math.random() * chanceFrom) === 3) {
        boomSound.play();
        onGoingSound.pause();
        setBoom(true);
        clearInterval(interval);
      }
      chanceFrom += Number.isInteger(coefficient / 10) ? coefficient / 10 : 0;
    };
    // Increase x in every 400 ms
    const interval = setInterval(game, 400);
  };
  // Function to start countdown before flight
  const startCountDown = timer => {
    setTimeout(() => {
      setTimer(prevState => prevState - 1);
    }, 1000);
  };
  // Listen to timer and start when needed
  useEffect(() => {
    if (timer > 0) {
      startCountDown(timer);
    } else {
      setCoefficient(1);
      increaseCoefficient();
    }
  }, [timer]);
  // Clear screen after explosion
  useEffect(() => {
    if (boom) {
      setWin(0);
      if (!autoBet) {
        setBet(false);
      }
      push(coefficient.toFixed(2));
      setTimeout(() => {
        setTimer(10);
        setBoom(false);
        setCoefficient(1);
      }, 3000);
    }
  }, [boom]);
  // Drop money automatically when autoOff is gte coefficient
  useEffect(() => {
    if (autoOff && coefficient >= info.autoOff && !win) {
      const winAmount = info.autoBet * info.autoOff;
      balanceChange(true, winAmount)
      setWin(winAmount);
    }
  }, [coefficient]);
  // Discount balance on bet
  useEffect(()=>{
    if(timer<=0 && bet){
      balanceChange(false, info.autoBet)
    }else if(timer<=0 && autoBet){
      balanceChange(false, info.autoBet)
    }
  },[bet, autoBet, timer])
  return (
    <div className="game-container">
      <Screen timer={timer} coefficient={coefficient} boom={boom} win={win} />
      <Panel
        autoBet={autoBet}
        setAutoBet={setAutoBet}
        autoOff={autoOff}
        info={info}
        setInfo={setInfo}
        setAutoOff={setAutoOff}
        bet={bet}
        setBet={setBet}
        timer={timer}
        setWin={setWin}
        win={win}
        coeficient={coefficient}
        balance={balance}
        balanceChange={balanceChange}
      />
    </div>
  );
};
