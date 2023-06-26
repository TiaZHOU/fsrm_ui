import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import JsonDisplayIntoTable from './components/ShowTable.js';
import Statistics from "./components/SearchTable";
import RoleFilter from "./components/RoleFilter";
import { HashRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*<JsonDisplayIntoTable/>*/}
          <RoleFilter/>
      </header>
    </div>
  );
}

export default App;
