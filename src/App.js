import { useState } from "react"

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value} 
    </button>
  )
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // If the square already has a value or we have a winner, return early
    if (squares[i] || calculateWinner(squares)) return

    // .slice() is used to create a shallow copy of an array
    const nextSquares = squares.slice()

    if (xIsNext) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O"
    }

    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = "Winner! Congrats to " + winner
  } else {
    status = "Next move belongs to " + (xIsNext ? "X" : "O")
  }

  const boardSize = 3
  // Creates an array that looks like [0, 1, 2] for boardSize = 3
  const indices = Array.from(Array(boardSize).keys())

  const rows = indices.map((rowIndex) => {
    // Construct columns for this row
    const cols = indices.map((colIndex) => {
      const squaresIndex = rowIndex * 3 + colIndex

      return (
        <Square key={squaresIndex} value={squares[squaresIndex]} onSquareClick={() => handleClick(squaresIndex)} />
      )
    })

    // Return the row with columns
    return (
      <div key={rowIndex} className="board-row">
        {cols}
      </div>
    )
  })

  return (
    <>
      <div className="status">{status}</div>
      {rows}
    </>
  )
}

export default function Game() {
  // We initialize it with the first set of moves—all null to start
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  // Within the arguments of the .map callback function, squares = current element, move = index within the array
  // The moves array will contain React elements (<li> elements)
  const moves = history.map((squares, move) => {
    let description
    if (move > 0) {
      description = 'Go to move #' + move
    } else {
      description = 'Go to game start'
    }

    return (
      <li key={move}>
        {move !== currentMove ? (
          <button onClick={() => jumpTo(move)}>{description}</button>
        ) : (
        <>{'You are at move #' + move}</>
        )}
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (const line of lines) {
    const [a, b, c] = line
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log('Winner! Congrats to ', squares[a])
      return squares[a]
    }
  }

  return null
}
