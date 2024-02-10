import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Builder from './Pages/Builder';
import NavBar from './Components/NavBar';

function App() {
  return (
    <div className="App h-full w-full">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path={"/builder"} exact element={<Builder />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
