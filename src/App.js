import logo from './logo.svg';
import './App.css';
import JsonDisplayIntoTable from './components/ShowTable.js';
import SearchTable from "./components/SearchTable";
import Statistics from "./components/SearchTable";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <JsonDisplayIntoTable/>
        <Statistics/>
      </header>
    </div>
  );
}

export default App;
