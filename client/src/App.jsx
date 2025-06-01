import { useState } from "react";
import API from "./API.js";

import "./App.css";

function App() {
  const handleSearch = async (e) => {
    const data = await API.fetchHeroes();
    console.log("this is data", data.data.data);
  };
  return (
    <>
      <h1>get super heroes</h1>
      <div>
        <button onClick={handleSearch}>click me</button>
      </div>
    </>
  );
}

export default App;
