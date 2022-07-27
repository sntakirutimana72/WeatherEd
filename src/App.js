import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CityStat from './components/CityStat';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/city/state=:state&city=:city&lon=:lon&lat=:lat"
          element={<CityStat />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
