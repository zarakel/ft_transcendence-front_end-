import {FC} from 'react';
import './App.css';
import OAuthPopup from './components/OAuthPopup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Profil from './pages/Profil';
import MatchHistory from './pages/MatchHistory';


const App: FC = () => {

	return (

	<BrowserRouter>
      <Routes>
        <Route element={<OAuthPopup />} path="/callback" />
		<Route element={<Login />} path="/" />
		<Route element={<Home />} path="/Home" />
		<Route element={<Chat />} path="/Home/Chat" />
		<Route element={<Profil />} path="/Home/Profil" />
		<Route element={<MatchHistory />} path="/Home/Profil/MatchHistory" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;