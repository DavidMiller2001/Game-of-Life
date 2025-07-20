import { useState } from 'react';
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from './components/ui/sidebar';
import AppSidebar from './components/custom-components/AppSidebar';

function App() {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);

  const root = document.documentElement;
  root.style.setProperty('--col-number', `${cols}`);

  const tempGrid = Array.from({ length: rows }, () => new Array(cols).fill(0));

  const [grid, setGrid] = useState(tempGrid);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className='bg-gray-800 flex items-center w-full justify-center flex-col min-h-screen'>
        <div className='flex items-center'>
          <h1 className='text-white text-5xl p-4'>Game of Life</h1>
          <SidebarTrigger className='text-white' />
          <SettingsButton />
        </div>
        <main className='max-w-[1024px] w-full flex flex-col justify-center items-center'>
          <div className='w-[50%] ' id='grid-parent'>
            {grid.map((row) =>
              row.map((cell, i) => <Cell key={i} status={cell} />)
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

function Cell(props: { status: number }) {
  const [isAlive, setIsAlive] = useState(props.status == 1);

  return (
    <div
      onClick={() => {
        setIsAlive(!isAlive);
      }}
      className={`bg-slate-600 border-1 h-full w-full aspect-square border-black ${
        isAlive && 'bg-white'
      }`}
    />
  );
}

function SettingsButton() {
  const { toggleSidebar } = useSidebar();
  return <button onClick={toggleSidebar}>Settings</button>;
}

export default App;
