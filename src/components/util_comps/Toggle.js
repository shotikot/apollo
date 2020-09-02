import React from "react";
import "../../styles/toggle.css";

export const Toggle = ({
  value,
  onChange,
  className = "",
  disabled,
  ...rest
}) => {
  return (
    <div
      className={`outside-toggle ${className} ${value ? "checked-toggle" : ""} ${disabled ? 'dis-toggle': ''}`}
      onClick={() => (disabled ? () => {} : onChange(!value))}
      {...rest}
    >
      <div className="inside-toggle"></div>
    </div>
  );
};
