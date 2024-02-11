import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Builder from './Pages/Builder';
import NavBar from './Components/NavBar';
import { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';

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
          <Route path={"/builder"} exact element={<Builder refresh={refresh} />} />
          <Route path={"/splits"} exact element={<Text>Splits</Text>} />
          <Route path={"/about"} exact element={<Text>About</Text>} />
          <Route path={"/exercises"} exact element={<Text>Exercises</Text>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
