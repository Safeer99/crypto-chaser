import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import { styled } from "@mui/material"

function App() {

  const App = styled("div")({
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  })

  return (
    <BrowserRouter>
      <App>
        <Header />
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route exact path='/coins/:id' element={<CoinPage />} />
        </Routes>
      </App>
    </BrowserRouter>
  );
}

export default App;
