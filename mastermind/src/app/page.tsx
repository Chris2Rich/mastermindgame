"use client"
let map: Record<number, string> = {0: "transparent", 1: "red", 2: "yellow", 3: "lime", 4: "cyan", 5: "magenta"}

const Row: React.FC = ({index, turn}: any) => {
  if (index == turn) {
    return (
      <div className="flex-rows gap-1">
      <div className="grid grid-cols-5 gap-0.5 bg-slate-700 p-0.5">
        {[...Array(4)].map((_,index) => (
          <div 
          key={index}
            className="w-16 h-16 border-2 border-slate-600 text-center rounded-lg" 
          ><p className="text-3xl">{index % 4}</p></div>
        )) 
        }
        </div>
        <button className="rounded bg-green-500">Check</button>
        </div>
        )
  }
  if (index <= turn) {
    return (
      <div className="grid grid-cols-4 gap-0.5 bg-slate-700 p-0.5">
        {[...Array(4)].map((_,index) => (
          <div 
          key={index}
            className="w-16 h-16 border-2 border-slate-600 text-center rounded-lg" 
          ><p className="text-3xl">{index % 4}</p></div>
        )) 
        }
        </div>
        )
  }
  return (
  <div className="grid grid-cols-4 gap-0.5 bg-slate-700 p-0.5 opacity-20">
    {[...Array(4)].map((_,index) => (
      <div 
      key={index}
        className="w-16 h-16 border-2 border-slate-600 text-center rounded-lg" 
      ></div>
    )) 
    }
    </div>
    )
}

const Grid: React.FC = ({gamestate, turn} : any) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex-cols p-0.5 rounded">
        {gamestate.map((_, index : number) => (
          <Row index={index} turn={turn}/>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  let gamestate: Array<Array<number>> = [[...Array(4)],[...Array(4)],[...Array(4)],[...Array(4)],[...Array(4)],[...Array(4)],[...Array(4)],[...Array(4)]]
  let turn: number = 2
  let code: Array<number> = [0,0,0,0]
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
        <Grid gamestate={gamestate} turn={turn}/>
      </div>
    </div>
  )
}
