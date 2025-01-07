const gamestate: Array<number> = [...Array(40)]
gamestate[3] = 1
gamestate[10] = 5


const map: Record<number, string> = {0: "transparent", 1: "red", 2: "yellow", 3: "lime", 4: "cyan", 5: "magenta"}

const Grid: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="grid grid-cols-4 gap-0.5 bg-slate-700 p-0.5 rounded">
        {[...Array(40)].map((_, index) => (
          <div 
            key={index} 
            className="w-16 h-16 border-2 border-slate-600" 
            style={{ backgroundColor: map[gamestate[index]] || 'transparent' }}
          />
        ))}
      </div>
    </div>
  );
};

const ColorPicker: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="grid grid-cols-1 gap-0.5 bg-slate-700 p-0.5 rounded">
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
      <div className="relative z-10 p-8">
        <Grid />
        <ColorPicker />
      </div>
    </div>
  );
}
