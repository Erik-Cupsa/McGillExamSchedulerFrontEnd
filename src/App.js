import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Home />} />
          <Route path="teams" element={<Teams />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
