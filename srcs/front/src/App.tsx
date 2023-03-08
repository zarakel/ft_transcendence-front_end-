import {FC} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Profil from './pages/Profil';
import Game from './pages/Game';
import MatchHistory from './pages/MatchHistory';
import ModifyPicture from './pages/ModifyProfilePicture';


const App: FC = () => {

	return (

	<BrowserRouter>
      <Routes>
		<Route element={<Login />} path="/" />
		<Route element={<Home />} path="/home" />
		<Route element={<Home />} path="/home/:id" />
		<Route element={<Chat />} path="/home/chat" />
		<Route element={<Profil />} path="/home/profil" />
		<Route element={<Game />} path="/game" />
		<Route element={<MatchHistory />} path="/home/profil/matchHistory" />
		<Route element={<ModifyPicture />} path="/home/profil/modify_picture" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;