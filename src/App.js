import "./styles.css";
import React, { useState } from "react";
const CROSS = "CROSS";
const CIRCLE = "CIRCLE";
const EMPTY = "EMPTY";

function TicTacToe() {
  //=========== OVeral state of the game ==========

  const [state, setState] = React.useState({
    player: CIRCLE,
    positions: [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY]
  });

  let winner="";

  function updateState(position) {
    let turn = state.player === CIRCLE ? CROSS : CIRCLE;
    let cur_positions = state.positions;
    cur_positions[position] = turn;

    setState({ player: turn, positions: cur_positions });

  }
  
  winner = DetectWinner(state.positions);

  function DetectWinner(p) {

    if (p[0] === p[1] && p[0] === p[2]) return p[0];
    if (p[3] === p[4] && p[3] === p[5]) return p[3];
    if (p[6] === p[7] && p[6] === p[8]) return p[6];
    //verticals
    if (p[0] === p[3] && p[0] === p[6]) return p[0];
    if (p[1] === p[4] && p[1] === p[7]) return p[1];
    if (p[2] === p[5] && p[0] === p[8]) return p[2];
    //diagonals 
    if (p[0] === p[4] && p[0] === p[8]) return p[0];
    if (p[2] === p[4] && p[2] === p[6]) return p[2];
    //arrow function: var => return value ;
    if (p.every(position => position !== EMPTY)) return "TIE";
}



  //=============================================
  return (
    <div>
    <div className="grid">
      <Square position={0} value={state.positions[0]} turn={updateState} />
      <Square position={1} value={state.positions[1]} turn={updateState} />
      <Square position={2} value={state.positions[2]} turn={updateState} />
      <Square position={3} value={state.positions[3]} turn={updateState} />
      <Square position={4} value={state.positions[4]} turn={updateState} />
      <Square position={5} value={state.positions[5]} turn={updateState} />
      <Square position={6} value={state.positions[6]} turn={updateState} />
      <Square position={7} value={state.positions[7]} turn={updateState} />
      <Square position={8} value={state.positions[8]} turn={updateState} />
    </div>
    <Result winner={winner}/>
    </div>
  );
}

function Square(props) {
  function updateSquare() {
    if (props.value === EMPTY) {
      props.turn(props.position);
    }
  }
  //props.position
  return (
    <div className="square" onClick={updateSquare}>
      {props.value === CROSS && <Cross />}
      {props.value === CIRCLE && <Circle />}
    </div>
  );
}

function Circle() {
  return (
    <svg viewBox="-50 -50 100 100">
      <circle cx="0" cy="0" r="40" />
    </svg>
  );
}

function Cross() {
  return (
    <svg viewBox="-50 -50 100 100" className="cross">
      <line x1="-40" y1="-40" x2="40" y2="40" />
      <line x1="40" y1="-40" x2="-40" y2="40" />
    </svg>
  );
}

function Result(props) {
  return <p className="result">
  Result: 
  {props.winner === CIRCLE && " Circle wins"}
  {props.winner === CROSS && " Cross wins"}
  {props.winner === "TIE" && " It is a tie"}

  </p>;
}


export default function App() {
  return (
    <div className="App">
      <TicTacToe />
    </div>
  );
}
