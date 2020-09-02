import React from "react";
import "../../styles/sidebar.css";

export const Sidebar = ({ balance }) => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h3>ბალანსი: {balance.toFixed(2)}₾</h3>
      </div>
    </div>
  );
};
