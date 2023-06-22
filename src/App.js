
import './App.css';
import JsonDisplayIntoTable from './components/ShowTable.js';
import Statistics from "./components/SearchTable";
import RoleFilter from "./components/RoleFilter";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <JsonDisplayIntoTable/>
          <RoleFilter/>
      </header>
    </div>
  );
}

export default App;
