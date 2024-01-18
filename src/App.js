import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from "./components/Layout";
import React from 'react';
import Home from "./components/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
