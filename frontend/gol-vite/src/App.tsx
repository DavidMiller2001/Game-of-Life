import { useState } from 'react';

function App() {
  const [rows, setRows] = useState(8);
  const [cols, setCols] = useState(8);

  const root = document.documentElement;
  root.style.setProperty('--col-number', `${cols}`);

  const tempGrid = Array.from({ length: rows }, () => new Array(cols).fill(0));

  const [grid, setGrid] = useState(tempGrid);

  return (
    <div className='bg-gray-800 flex items-center justify-center flex-col h-screen'>
      <h1 className='text-white text-5xl py-4'>Game of Life</h1>
      <main className='max-w-[1000px] w-full flex justify-between items-center'>
        <div id='grid-parent' className='flex-1/2'>
          {grid.map((row) =>
            row.map((cell, i) => <Cell key={i} status={cell} />)
          )}
        </div>
        <div className='h-full flex-1/2 p-8'>
          <form className='bg-gray-600 w-full h-full rounded-lg p-8 text-white'>
            <div className='flex gap-2'>
              <label htmlFor='cols'>Number of Columns</label>
              <input type='text' />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

function Cell(props: { status: number }) {
  const [isAlive, setIsAlive] = useState(props.status == 1);

  return (
    <div
      onClick={() => {
        setIsAlive(!isAlive);
      }}
      className={`bg-slate-600 border-1 aspect-square border-black ${
        isAlive && 'bg-white'
      }`}
    ></div>
  );
}

export default App;
