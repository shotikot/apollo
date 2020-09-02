import React from "react";

export const HistoryItem = ({ x }) => (
  <div className={`history-item ${x >= 1.5 ? "green" : "red"}`}>
    <span>{x}</span>
  </div>
);
