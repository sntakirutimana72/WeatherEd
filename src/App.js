import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CityStat from './components/CityStat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/city/name=:name&lat=:lat&lon=:lon"
          element={<CityStat />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
