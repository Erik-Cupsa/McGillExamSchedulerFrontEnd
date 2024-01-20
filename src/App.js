import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from "./components/Layout";
import React from 'react';
import Home from "./components/Home";
import Search from './components/Search';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
