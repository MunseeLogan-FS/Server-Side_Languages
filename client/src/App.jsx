import React from "react";
import MyNav from "./components/MyNav";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Create from "./pages/Create";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <main style={styles.app}>
      <Toaster />

      <MyNav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<Create />} />
      </Routes>
    </main>
  );
}

export default App;

const styles = {
  app: {
    backgroundColor: "#1A365D",
    minHeight: "100vh",
  },
};
