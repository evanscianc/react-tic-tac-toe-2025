import { useState } from "react"
import Board from './Board.js'

export default function Game() {
  // We initialize it with the first set of moves—all null to start
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]
  // const ascendingMoves = 

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

  // how to implement challenge 3?
  // const description = moves[0] === 
  // const toggleMovesBtn = <button></button>

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        {/* {toggleMovesBtn} */}
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
