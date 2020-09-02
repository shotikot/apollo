import React from "react";
import "../../styles/numInput.css";

export const NumInput = ({
  label,
  value,
  onChange,
  disabled,
  symbol,
  name,
  ...rest
}) => {
  return (
    <div className="num-input-container">
      <span className="num-input-label">{label}</span>
      <div className="num-input">
        <input
          type="text"
          value={Number(value).toFixed(2).toString()}
          name={name}
          onChange={e => onChange(e, Number(e.target.value))}
          {...rest}
        />
        <span>{symbol}</span>
        <button onClick={e => onChange(e, Number(value) + 1)} name={name} disabled={disabled}>
          +
        </button>
        <button onClick={e => onChange(e, Number(value) - 1)} name={name} disabled={disabled}>
          -
        </button>
      </div>
    </div>
  );
};
