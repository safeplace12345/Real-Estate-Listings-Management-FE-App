import { useEffect } from 'react';
import { HashRouter as Router, Route, Link, Routes } from 'react-router-dom'
import './App.css';
import { RootState } from "./services/@redux";

import Home from './views/home';
import Login from './views/Login';
import Favorites from './views/Favorites';
import { useSelector, useDispatch } from 'react-redux'
import { logOutAction, loginAction } from './services/@redux/userReducer';

function App() {
  const rootUserName = useSelector((state: RootState) => state.user.name)
  const dispatch = useDispatch()

  const persistUserData = () => {
    const userData = localStorage.getItem("userData")
    if (userData) {
      const parsed = JSON.parse(userData)
      dispatch(loginAction(parsed))
    }
  }

  const clearUserData = () => {
    if(rootUserName) {
      localStorage.removeItem("userData")
      dispatch(logOutAction())
    }
  }

  useEffect(() => {
    persistUserData()
  }, [])

  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/home">Home</Link>
          <Link to="/" onClick={clearUserData}>{rootUserName ? "LogOut" : "Login"}</Link>
          <Link to="/fav">Favorites</Link>
          <h5>Welcome {rootUserName}</h5>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/fav" element={<Favorites />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
