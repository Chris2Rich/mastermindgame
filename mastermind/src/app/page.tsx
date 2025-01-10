"use client"
let map: Record<number, string> = {0: "transparent", 1: "red", 2: "yellow", 3: "lime", 4: "cyan", 5: "magenta"}

const Grid: React.FC = ({gamestate} : any) => {
  const get_clickable = (index: number) : boolean =>{return (Math.floor(index / 4) == gamestate.splice(-1)[0] && gamestate[index] != 0)}
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="grid grid-cols-4 gap-0.5 bg-slate-700 p-0.5 rounded">
        {[...Array(40)].map((_,index) => (
          <div 
          key={index}
            className="w-16 h-16 border-2 border-slate-600 text-center" 
            style={{ backgroundColor: map[gamestate[index]], cursor: (():string|undefined => {if(get_clickable(index)){return "pointer"} else{return undefined}})()}}

            onClick={()=>{gamestate[index]++}}
          ><p className="text-3xl">{index % 4}</p></div>
        ))}
      </div>
    </div>
  );
};

const ColorPicker: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-full mt-8">
      <div className="grid grid-cols-5 gap-0.5 bg-slate-700 p-0.5 rounded">
        {[1,2,3,4,5].map((index) => (
          <div 
            key={index} 
            className="w-16 h-16 border-2 border-slate-600 hover:cursor-pointer" 
            style={{ backgroundColor: map[index] || 'transparent' }}
          />
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  let gamestate: Array<number> = [...Array(40)].concat([0])
  gamestate[3] = 1
  gamestate[10] = 5
  gamestate[21] = 4
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
        <Grid gamestate={gamestate}/>
        <ColorPicker />
      </div>
    </div>
  );
}
