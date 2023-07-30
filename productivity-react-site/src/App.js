import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Tasks from './pages/tasks';
import { AppContextProvider } from './context/AppContext';
import Chat from './pages/chat';

function App() {
  return (
    <AppContextProvider>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/tasks' element={<Tasks/>}/>
          <Route path='/chat' element={<Chat/>}/>
        </Routes>
      </HashRouter>
    </AppContextProvider>
  );
}

export default App;
