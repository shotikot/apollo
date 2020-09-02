import React from "react";
import { Toggle } from "../util_comps/Toggle";
import { NumInput } from "../util_comps/NumInput";
import "../../styles/panel.css";

export const Panel = ({
  autoBet,
  setAutoBet,
  autoOff,
  setAutoOff,
  info,
  setInfo,
  bet,
  timer,
  setBet,
  win,
  setWin,
  coeficient,
  balanceChange,
  balance
}) => {
  const onNumInputChange = (e, x) => {
    e.persist();
    let val;
    if(x==='.00'){
      val = x
    }else{
      val = Number(x)
    }
    setInfo(prevState => ({
      ...prevState,
      [e.target.name]: val.toFixed(2),
    }));
  };
  // To know if game was started
  const started = timer <= 0;
  // Off click handlers
  const onClick = () => {
    // If user has made bet and the game is alreay started
    if ((bet || autoBet) && started) {
      balanceChange(true, coeficient * info.autoBet)
      setWin(coeficient * info.autoBet);
      // If user has made bet and the game is not started
    } else if (!started && bet) {
      setBet(false);
      setAutoBet(false);
      // If user has made autobet and the game is started
    } else if (!started && autoBet) {
      setAutoBet(false);
      setBet(false);
    } else {
      setBet(true);
    }
  };
  const buttonText = () => {
    // If user has already won this round
    if (win) {
      return "ფსონის განთავსება";
    }
    // If user has made bet or has autoBet turned on
    else if (bet || autoBet) {
      // If current round is already started
      if (started) {
        return `განაღდება ${Number(coeficient * info.autoBet).toFixed(2)}₾`;
      } else {
        return `გაუქმება (${info.autoBet}₾)`;
      }
    }
    // If current round is not started yet, user has not made a bet and has autoBet turned off
    else if (!started && !bet && !autoBet) {
      return "ფსონის განთავსება";
    } else {
      return "ფსონის განთავსება";
    }
  };
  const disableHeler = () => {
    // Simply if user has already won in current round
    if(win){
      return true
    }
    // If user doesn't have enought money on balance
    if(info.autoBet > balance){
      return true
    }
    // If current round is started and user has made no bets
    else if(started && !bet && !autoBet){
      return true
    }
    // If curent round is started and user has made any kind of bet
    else if(started && bet){
      return false
    }else if(started && autoBet){
      return false
    }
  }
  return (
    <div className="panel-container">
      <div className="panel-dash">
        <div className="panel-part">
          <Toggle value={autoBet} onChange={setAutoBet} disabled={started}/>
          <NumInput
            symbol="₾"
            onChange={onNumInputChange}
            name="autoBet"
            label="ფსონი"
            value={info.autoBet}
            disabled={started}
          />
        </div>
        <div className="panel-part">
          <Toggle value={autoOff} onChange={setAutoOff} disabled={started}/>
          <NumInput
            symbol="x"
            onChange={onNumInputChange}
            name="autoOff"
            label="მოხსნა"
            value={info.autoOff}
            disabled={started}
          />
        </div>
      </div>
      <button
        className={`bet-btn ${
          bet || autoBet ? (started ? "bet" : "cancel") : ""
        }`}
        onClick={onClick}
        disabled={disableHeler()}
      >
        {buttonText()}
      </button>
    </div>
  );
};
