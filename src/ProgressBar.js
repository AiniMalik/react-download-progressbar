import React from "react";
import "./App.css";

const Progress_bar = ({ bgcolor, progress, height }) => {
  const Parentdiv = {
    height: height,
    width: "80%",
    backgroundColor: "whitesmoke",
    borderRadius: 40,
    margin: 50,
  };

  const Childdiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: "right",
  };

  const progresstext = {
    paddingRight: 5,
    color: "white",
    fontWeight: 500,
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}></div>
      <span style={progresstext}>{`${progress}%`}</span>
    </div>
  );
};

export default Progress_bar;
