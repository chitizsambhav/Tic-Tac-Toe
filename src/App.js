import { useState } from 'react';
import  Footer from './footer';

export function Square({value, onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

export function GameRefresh({onClick}){
  return <button className="btn btn-custom"  onClick={onClick}>Restart Game</button>
}

function Strike({ strikeClass }) {
  return <div className={`strike ${strikeClass}`}></div>;
}

export function Board({isXNext, squares, onPlay, onRefresh, onWinning ,strikeClass}){


  
  function handleclick(i){
    if (calculateWinner(squares) || squares[i]){
      return
    }

    const nextSquare = squares.slice()
    if(isXNext){
      nextSquare[i] = 'X'
    }
    else{
      nextSquare[i] = 'O'
    }
    onPlay(nextSquare)
    onWinning(nextSquare)
  }


  let winner = calculateWinner(squares)
  let status
  if (winner){
    status = 'Winner is: ' + winner[0]
  }
  else{
    let findNull = squares.filter((square)=>{
      return square===null
    })
    if (findNull.length===0){
      status = 'Match Tied!!!'
    }
    else{
      status = 'Next Player: ' + (isXNext ? 'X' : 'O')
    }
  }

  return (
    <>
    <div className="d-flex justify-content-center py-4"><h1>Tic-Tac-Toe</h1></div>
    <div className="status text-center">{status}</div>
    <div className="container">
      <div className="row">
        <div className="col d-flex justify-content-center">
        <Square value={squares[0]} onSquareClick={()=>{handleclick(0)}}/>
        <Square value={squares[1]} onSquareClick={()=>{handleclick(1)}}/>
        <Square value={squares[2]} onSquareClick={()=>{handleclick(2)}}/>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-center">
      <Square value={squares[3]} onSquareClick={()=>{handleclick(3)}}/>
      <Square value={squares[4]} onSquareClick={()=>{handleclick(4)}}/>
      <Square value={squares[5]} onSquareClick={()=>{handleclick(5)}}/>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-center">
        <Square value={squares[6]} onSquareClick={()=>{handleclick(6)}}/>
        <Square value={squares[7]} onSquareClick={()=>{handleclick(7)}}/>
        <Square value={squares[8]} onSquareClick={()=>{handleclick(8)}}/>
        </div>
      </div>
      <div className="d-flex justify-content-center flex-wrap">
      <Strike strikeClass={strikeClass}/>
      </div>
      
    </div>
    
    
    <div className="status text-center">
      <GameRefresh onClick={onRefresh} />
    </div>
    </>
  );
}

export default function Game(){
  const [isXNext, setXNext] = useState(true)
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const currentSquares = history[currentMove]
  const [strikeClass, setStrikeClass] = useState(null)
  
  function handlePlay(nextSquare){
    const currentMoveHistory = [...history.slice(0,currentMove+1), nextSquare]
    setHistory(currentMoveHistory)
    setCurrentMove(currentMoveHistory.length-1)
    setXNext(!isXNext)
  }

  function handleRefresh(){
    setHistory([Array(9).fill(null)])
    setXNext(true)
    setCurrentMove(0)
    setStrikeClass(null)
  }

  function jumpTo(move){
    setCurrentMove(move)
    setXNext(move%2===0)
    handleWinning(history[move])
  }

  function handleWinning(squares){
    let winner = calculateWinner(squares)
    if (winner !== null){
      setStrikeClass(winner[1])
    }
    else{
      setStrikeClass(null) 
    }
  }

  const moves = history.map((squares,move)=>{
    let description
    if (move>0){
     description = 'Go to move # ' + move
    }
    else{
      description = 'Go to the start of the game'
    }
    return(
      <li key={move}>
        <button className="btn btn-custom my-1 btn-sm"onClick={()=>jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return(
    <div className="container">
   
        <Board isXNext={isXNext} squares={currentSquares} onPlay={handlePlay} onRefresh={handleRefresh} onWinning={handleWinning} strikeClass={strikeClass}/>
        <div className="p-3 ml-3 text-decoration-underline"><h2>Game History</h2></div>
        <ol>{moves}</ol>
        <Footer/>
      </div>
        
      
  )   
}



export function calculateWinner(sqaures){
  const list = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
 for (let index = 0; index < list.length; index++) {
    let [a,b,c] = list[index]
    let strikeClass
    if (sqaures[a] && sqaures[a]===sqaures[b] && sqaures[a]===sqaures[c]){
      if (index === 0){
        strikeClass = 'strike-row-1'
      }
      else if (index ===1){
        strikeClass = 'strike-row-2'
      }
      else if (index ===2){
        strikeClass = 'strike-row-3'
      }
      else if (index ===3){
        strikeClass = 'strike-column-1'
      }
      else if (index ===4){
        strikeClass = 'strike-column-2'
      }
      else if (index ===5){
        strikeClass = 'strike-column-3'
      }
      else if (index ===6){
        strikeClass = 'strike-diagonal-1'
      }
      else{
        strikeClass = 'strike-diagonal-2'
      }
      return [sqaures[a],strikeClass]
    }
  }
  return null
}



