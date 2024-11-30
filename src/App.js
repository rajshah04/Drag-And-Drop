import React from 'react';
import './App.css';
import DragNDrop from './components/DragNDrop';

function App() {
  return (
    <div className="nature-bg flex items-start justify-center">
      <div className="bg-opacity-50">
        <h1 className="text-4xl font-bold my-4 p-1 text-center bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">
          Drag And Drop Images
        </h1>
        <DragNDrop />
      </div>
    </div>
  );
}

export default App;
