import { useState } from 'react';

function App() {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);

  const root = document.documentElement;
  root.style.setProperty('--col-number', `${cols}`);

  const tempGrid = Array.from({ length: rows }, () => new Array(cols).fill(0));

  const [grid, setGrid] = useState(tempGrid);

  return (
    <main className='h-screen flex bg-gray-800 justify-center items-center'>
      <div id='grid-parent'>
        {grid.map((row) =>
          row.map((cell, i) => <Cell key={i} status={cell} />)
        )}
      </div>
    </main>
  );
}

function Cell(props: { status: number }) {
  const [isAlive, setIsAlive] = useState(props.status == 1);

  return (
    <div
      onClick={() => {
        setIsAlive(!isAlive);
      }}
      className={`bg-slate-600 h-[50px] w-[50px] border-1 border-black ${
        isAlive && 'bg-white'
      }`}
    ></div>
  );
}

export default App;
