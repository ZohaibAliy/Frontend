
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Table from './Components/Table';
import Form from './Components/Form';


function App() {
  return (
    <>
    <Navbar/>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<Table/>} />
        <Route path="/Form" element={<Form/>} />

        <Route path="/contact" element={<Table/>} />
      </Routes>
  </Router>
    </>
  );
}




export default App;
