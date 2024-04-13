import React from "react";
import "./Hamburger.css"
const Hamburger = ({onClick}) => {
  return (
    <div>
      <input id="checkbox" type="checkbox" onClick={onClick}/>
      <label className="toggle" htmlFor="checkbox">
        <div id="bar1" className="bars"></div>
        <div id="bar2" className="bars"></div>
        <div id="bar3" className="bars"></div>
      </label>
    </div>
  );
};

export default Hamburger;
