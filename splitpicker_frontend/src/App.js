import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Builder from './Pages/Builder';
import NavBar from './Components/NavBar';
import { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';
import About from './Pages/About';
import Exercises from './Pages/Exercises';
import Landing from './Pages/Landing';

function App() {
  const [refresh, setRefresh] = useState(false);

  const refreshApp = () => {
    console.log("refreshing app");
    setRefresh(!refresh);
  }

  useEffect(() => {
    console.log("Refreshed...")
  }, [refresh])

  return (
    <div className="App h-full w-full">
      <BrowserRouter>
        <NavBar refreshApp={refreshApp} />
        <Routes>

          <Route path={"/"} exact element={<Landing />} />
          <Route path={"/builder"} exact element={<Builder refresh={refresh} />} />
          <Route path={"/splits"} exact element={<Text fontSize='4xl' className='mt-10'>COMMUNITY SPLITSCOMING SOON.</Text>} />
          <Route path={"/about"} exact element={<About />} />
          <Route path={"/exercises"} exact element={<Exercises />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
