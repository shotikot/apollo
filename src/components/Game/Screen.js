import React from "react";
import boomPic from "../../assets/explosion.svg";
import ship from "../../assets/spaceship.svg";

export const Screen = ({ coefficient, boom, timer, win }) => {
  return (
    <div
      className={`screen-container ${
        timer <= 0 && !boom ? "screen-animated" : ""
      }`}
    >
      <div className={`ship-container ${timer <= 0 ? "off" : "landing"}`}>
        {" "}
        <img
          src={boom ? boomPic : ship}
          alt="space ship"
          className="spaceship-img"
        />
        {timer > 0 ? (
          <>
            <h4 className="green">{timer}</h4>
            <div className="outside-loading">
              <div
                className="loading-rail"
                style={{ width: `${100 - timer * 10}%` }}
              ></div>
            </div>
          </>
        ) : null}
        {timer <= 0 ? (
          <h2 className={boom ? "red" : "green"}>{coefficient.toFixed(2)}x</h2>
        ) : null}
      </div>
      {win ? <h2 className="green top-center">{win.toFixed(2)}₾</h2> : null}
    </div>
  );
};
