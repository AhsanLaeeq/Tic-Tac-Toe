import React, { useState } from 'react';
import './TicTacToe.css';
import circle from "../../assets/circle.png"; // Correct path
import cross from "../../assets/cross.png";  // Correct path

const icons = {
  cross,
  circle,
};

const TicTacToe = () => {
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(""); // To store winner ("X" or "O")
  const [tie, setTie] = useState(false); // To store if the game ends in a tie

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return the winner ("X" or "O")
      }
    }
    return null; // No winner yet
  };

  const checkTie = (board) => {
    // If all cells are filled and no winner, it's a tie
    return board.every(cell => cell !== "") && !winner;
  };

  const toggle = (num) => {
    if (lock || data[num]) {
      return; // Prevent action if game is locked or square is already filled
    }

    let newBoard = [...data];
    if (count % 2 === 0) {
      newBoard[num] = "circle"; // Set "circle" for the player
    } else {
      newBoard[num] = "cross"; // Set "cross" for the player
    }

    setData(newBoard); // Update the board state
    setCount(count + 1); // Increment the turn counter

    const winner = checkWinner(newBoard);
    if (winner) {
      setWinner(winner); // Set the winner
      setLock(true); // Lock the game
    }

    if (checkTie(newBoard)) {
      setTie(true); // Set tie if no winner and all cells are filled
      setLock(true); // Lock the game
    }
  };

  const resetGame = () => {
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    setLock(false);
    setWinner(""); // Reset winner
    setTie(false); // Reset tie
  };

  return (
    <div className="container">
      <h1 className="title">
        Tic Tac Toe
        {winner && <span> - Winner: {winner}</span>}
        {tie && !winner && <span> - It's a Tie!</span>}
      </h1>

      <div className="board">
        <div className="row1">
          {data.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="boxes"
              onClick={() => toggle(index)}
              style={{ pointerEvents: lock ? "none" : "auto" }} // Disable clicks after win/tie
            >
              {item && <img src={icons[item]} alt={item} />} {/* Show icon based on item */}
            </div>
          ))}
        </div>
        <div className="row2">
          {data.slice(3, 6).map((item, index) => (
            <div
              key={index + 3}
              className="boxes"
              onClick={() => toggle(index + 3)}
              style={{ pointerEvents: lock ? "none" : "auto" }} // Disable clicks after win/tie
            >
              {item && <img src={icons[item]} alt={item} />} {/* Show icon based on item */}
            </div>
          ))}
        </div>
        <div className="row3">
          {data.slice(6, 9).map((item, index) => (
            <div
              key={index + 6}
              className="boxes"
              onClick={() => toggle(index + 6)}
              style={{ pointerEvents: lock ? "none" : "auto" }} // Disable clicks after win/tie
            >
              {item && <img src={icons[item]} alt={item} />} {/* Show icon based on item */}
            </div>
          ))}
        </div>
      </div>

      <button className="reset" onClick={resetGame}>Reset</button>
    </div>
  );
};

export default TicTacToe;
