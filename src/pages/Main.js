import React, { useState } from "react";
import { History } from "../components/History/History";
import { Game } from "../components/Game/Game";
import { Sidebar } from "../components/Sidebar/Sidebar";
import "../styles/main.css";

const Main = () => {
  const [balance, setBalance] = useState(100);
  const [history, setHistory] = useState([
    1.3,
    1.6,
    12.54,
    5.32,
    1.12,
    1.3,
    1.6,
    12.54,
    5.32,
    1.12,
    1.3,
    1.6,
    12.54,
    5.32,
    1.12,
    1.3,
    1.6,
    12.54,
    5.32,
    1.12,
  ]);
  // This function pushes new records to booming history
  const push = x => {
    setHistory(prevState => [x, ...prevState]);
  };
  // Function to manipulate balance
  const balanceChange = (add, amount) => {
    if (add) {
      setBalance(prevState => prevState + amount);
    } else {
      setBalance(prevState => prevState - amount);
    }
  };
  return (
    <div className="main-container">
      <History history={history} />
      <Game push={push} balance={balance} balanceChange={balanceChange} />
      <Sidebar balance={balance} />
    </div>
  );
};

export default Main;
