import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
