import React, { useState } from "react";
import { HistoryItem } from "./HistoryItem";
import "../../styles/history.css";

export const History = ({ history }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div className="history-button" onClick={() => setExpanded(!expanded)}>
        ისტორია
      </div>
      <div className={`history-list ${expanded ? "list-expanded" : ""}`}>
        {history.map((item, i) => {
          return <HistoryItem key={i} x={item} />;
        })}
      </div>
    </div>
  );
};
