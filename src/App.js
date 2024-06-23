import React from "react";
import DataDisplay from "./components/DataDisplay";
import "./darkMode.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Farcaster Cabal Tracker</h1>
      </header>
      <main>
        <DataDisplay />
      </main>
    </div>
  );
};

export default App;
