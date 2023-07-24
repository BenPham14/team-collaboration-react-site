import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Tasks from './pages/tasks';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/tasks' element={<Tasks/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
