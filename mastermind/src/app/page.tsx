"use client"
let map: Record<number, string> = {0: "transparent", 1: "red", 2: "yellow", 3: "lime", 4: "cyan", 5: "magenta"}

const check_box: any = (selected: any, code: any, index: any) => {
  if(selected == code[index]){
    console.log("correct")
    return "green"
  }
  if(code.includes(selected)){
    return "yellow"
  }
  return "gray"
}

const check = () => {}

const Row: React.FC = ({index, turn, gamestate, code}: any) => {
  if (index == turn) {
    return (
      <div className="flex flex-col">
      <div className="grid grid-cols-4 gap-0.5 bg-slate-700 p-0.5">
        {[0,1,2,3].map((jndex) => (
          <div 
          key={jndex}
          className="w-16 h-16 border-2 border-slate-600 text-center rounded-lg hover:cursor-pointer"
          style={{ backgroundColor: map[gamestate[index][jndex]]}}
          onClick={()=>{const temp = gamestate[index][jndex] = (gamestate[index][jndex] + 1) % 6}}
          />
        ))
      }
        </div>
        <button className="rounded bg-green-500" onClick={check}>Check</button>
      </div>
        )
  }
  if (index <= turn) {
    return (
      <div className="grid grid-cols-4 gap-0.5 bg-slate-700 p-0.5">
        {[...Array(4)].map((_,jndex) => (
          <div 
          key={jndex}
            className="w-16 h-16 border-2 border-slate-600 text-center rounded-lg" 
            style={{ backgroundColor: map[gamestate[index][jndex]]}}
          >
            <div 
            className="rounded-full border-slate-700"
            style={{ backgroundColor: check_box(gamestate[index][jndex], code, jndex)}}
            />
          </div>
        )) 
        }
        </div>
        )
  }
  return (
  <div className="grid grid-cols-4 gap-0.5 bg-slate-700 p-0.5 opacity-20">
    {[...Array(4)].map((_,jndex) => (
      <div 
      key={jndex}
        className="w-16 h-16 border-2 border-slate-600 text-center rounded-lg"
        style={{ backgroundColor: map[gamestate[index][jndex]]}}
      ></div>
    )) 
    }
    </div>
    )
}

const Grid: React.FC = ({gamestate, turn, code} : any) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex-cols p-0.5 rounded">
        {gamestate.map((_, index : number) => (
          <Row key={index} index={index} turn={turn} gamestate={gamestate} code={code}/>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  let gamestate: Array<Array<number>> = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
  let turn: number = 2
  let code: Array<number> = [2,3,0,1]
  return (
    <div className="min-h-screen w-full bg-gray-900 relative">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #374151 1px, transparent 1px),
            linear-gradient(to bottom, #374151 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'linear-gradient(to bottom, transparent, black)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)',
          opacity: 0.2,
        }}
      />
      <p className="relative z-10 p-8 text-3xl text-slate-100">MASTERMIND</p>
      <div className="relative z-10 p-8">
        <Grid gamestate={gamestate} turn={turn} code={code}/>
      </div>
    </div>
  )
}
