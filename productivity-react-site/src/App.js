import './App.css';
import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Auth } from './components/auth';
import { AppContextProvider } from './context/AppContext';
import Home from './pages/home';
import Tasks from './pages/tasks';
import Chat from './pages/chat';
import Users from './pages/users';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token")); // returns false

  if (!isAuth) {
    return (
      <Auth setIsAuth={setIsAuth}/> // pass setIsAuth so that isAuth is set to true when token is set
    );
  }

  return (
    <AppContextProvider>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/tasks' element={<Tasks/>}/>
          <Route path='/chat' element={<Chat/>}/>
          <Route path='/users' element={<Users/>}/>
        </Routes>
      </HashRouter>
    </AppContextProvider>
  );
}

export default App;
