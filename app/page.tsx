/* eslint-disable */
"use client"
import { useState } from "react"

const code: Array<number> = [(Math.floor(Math.random() * 6) + 1), (Math.floor(Math.random() * 6) + 1), (Math.floor(Math.random() * 6) + 1), (Math.floor(Math.random() * 6) + 1)]
export default function Home() {
  const [gamestate, setGamestate] = useState<Array<Array<number>>>([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ])
  const [turn, setTurn] = useState<number>(0)
  const [result, setResult] = useState<number>(0)

  const updateGamestate = (rowIndex: number, cellIndex: number) => {
    setGamestate((prev) => {
      const newGamestate = [...prev]
      newGamestate[rowIndex] = [...newGamestate[rowIndex]]
      newGamestate[rowIndex][cellIndex] =
        (newGamestate[rowIndex][cellIndex] + 1) % 7
      return newGamestate
    })
  }

  const updateTurn = () => {
    const arraysEqual = (arr1: number[], arr2: number[]) => {
      return arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index])
    }
  
    setTurn((prevTurn) => {
      if (arraysEqual(gamestate[prevTurn], code)) {
        console.log("You won")
        setResult(()=>{return 1})
        return prevTurn
      }
  
      if (prevTurn >= 7) {
        console.log("You lost")
        setResult(()=>{return 2})
        return prevTurn
      }
  
      return prevTurn + 1
    })
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #374151 1px, transparent 1px),
            linear-gradient(to bottom, #374151 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          maskImage: "linear-gradient(to bottom, transparent, black)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black)",
          opacity: 0.1,
        }}
      />
      <div className="pt-6 pb-6 flex flex-col justify-center items-center">
      <p className="relative z-10 pb-2 text-3xl text-slate-100">MASTERMIND</p>
      <p className="relative z-10 text-xl text-slate-300">Click the boxes to play!</p>
      </div>
      <div className="relative z-10 p-8">
        <Grid
          gamestate={gamestate}
          turn={turn}
          code={code}
          ut={updateTurn}
          res={result}
          onUpdate={updateGamestate}
        />
        <End res={result} />
      </div>
    </div>
  )
}

const End: React.FC<any> = ({res}: any) => {
  if(res == 0){
    return <></>
  }
  if(res == 1){
    return <div className="absolute left-0 top-1/3 w-full h-1/4 bg-green-600 flex flex-col justify-center items-center z-10">
      <p className="relative z-10 mb-8 text-3xl text-slate-100">You Won</p>
      <button className="border-2 border-green-800 rounded-lg p-2 bg-green-700" onClick={() => window.location.reload()}>Replay</button>
    </div>
  }
  if(res == 2){
    return <div className="absolute left-0 top-1/3 w-full h-1/4 bg-red-700 flex flex-col justify-center items-center z-10">
      <p className="relative z-10 mb-8 text-3xl text-slate-100">You Lost</p>
      <button className="border-2 border-red-900 rounded-lg p-2 bg-red-800" onClick={() => window.location.reload()}>Replay</button>
    </div>
  }
}

const Row: React.FC<any> = ({ index, turn, gamestate, code, onUpdate, ut, res }: any) => {
  const map: Record<number, string> = {
    0: "transparent",
    1: "hsl(0, 100%, 60%)",
    2: "hsl(60, 100%, 60%)",
    3: "hsl(120, 100%, 60%)",
    4: "hsl(180, 100%, 60%)",
    5: "hsl(240, 100%, 60%)",
    6: "hsl(300, 100%, 60%)",
  }

  const check_box: any = (selected: any, code: any, index: any) => {
    if (selected == code[index]) {return "hsl(120, 50%, 55%)"}
    if (code.includes(selected)) {return "hsl(60, 50%, 55%)"}
    return "hsl(0, 0%, 70%)"
  }

  if (index == turn) {
    if(res != 0){
      return (
        <div className="grid grid-cols-4 gap-2 bg-slate-700 p-2">
          {[...Array(4)].map((_, jndex) => (
            <div
              key={jndex}
              className="w-16 h-16 border-2 border-slate-600 text-center rounded-lg flex justify-center items-center"
              style={{backgroundColor: map[gamestate[index][jndex]]}}
            >
              <div
                className="rounded-full border-4 border-slate-600 w-3/4 h-3/4"
                style={{backgroundColor: check_box(gamestate[index][jndex], code, jndex)}}
              />
            </div>
          ))}
        </div>
      )
    }
    return (
      <div className="flex flex-col">
        <div className="grid grid-cols-4 gap-2 bg-slate-700 p-2">
          {[0, 1, 2, 3].map((jndex) => (
            <div
              key={jndex}
              className="w-16 h-16 border-2 border-slate-600 text-center rounded-lg hover:cursor-pointer"
              style={{ backgroundColor: map[gamestate[index][jndex]] }}
              onClick={() => onUpdate(index, jndex)}
            />
          ))}
        </div>
        <button className="rounded bg-green-500" onClick={ut}>
          Check
        </button>
      </div>
    )
  }

  if (index <= turn) {
    return (
      <div className="grid grid-cols-4 gap-2 bg-slate-700 p-2">
        {[...Array(4)].map((_, jndex) => (
          <div
            key={jndex}
            className="w-16 h-16 border-2 border-slate-600 text-center rounded-lg flex justify-center items-center"
            style={{ backgroundColor: map[gamestate[index][jndex]] }}
          >
            <div
              className="rounded-full border-4 border-slate-600 w-3/4 h-3/4"
              style={{backgroundColor: check_box(gamestate[index][jndex], code, jndex)}}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-2 bg-slate-700 p-2 opacity-20">
      {[...Array(4)].map((_, jndex) => (
        <div
          key={jndex}
          className="w-16 h-16 border-2 border-slate-600 text-center rounded-lg"
          style={{ backgroundColor: map[gamestate[index][jndex]] }}
        ></div>
      ))}
    </div>
  )
}

const Grid: React.FC<any> = ({ gamestate, turn, code, onUpdate, ut, res }) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex-cols p-0.5 rounded">
        {gamestate.map((_:any, index: number) => (
          <Row
            key={index}
            index={index}
            turn={turn}
            gamestate={gamestate}
            ut={ut}
            res={res}
            code={code}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  )
}