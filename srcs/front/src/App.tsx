import {FC, useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Profil from './pages/Profil';
import Game from './pages/Game';
import MatchHistory from './pages/MatchHistory';

const App: FC = () => {

	const [logged, setLogged] = useState(false);

	const logIn = () => setLogged(true);
	const logOut = () => setLogged(false);

	const isLoggedIn = async () => {
		try
		{
			let request = await fetch("http://" + document.location.hostname + ":3000/logged_in",
			{
				method: "GET",
				headers:
				{
					"Content-Type":  "application/json",
					'cors': 'true',
					'Authorization': `Bearer ${localStorage.getItem("jwt_token")}`
				}
			});
			logIn();
		}
		catch (e)
		{
			logOut();
		}
	}

	useEffect(() => {
		isLoggedIn();
	}, [logged])


	return (

	<BrowserRouter>
      <Routes>
		<Route element={<Login />} path="/" />
		<Route element={logged ? <Home /> : <Navigate to='/'/>} path="/home" />
		<Route element={logged ? <Home /> : <Navigate to='/'/>} path="/home/:id" />
		<Route element={logged ? <Chat /> : <Navigate to='/'/>} path="/home/chat" />
		<Route element={logged ? <Profil /> : <Navigate to='/'/>} path="/home/profil" />
		<Route element={logged ? <Game /> : <Navigate to='/'/>} path="/game" />
		<Route element={logged ? <MatchHistory /> : <Navigate to='/'/>} path="/home/profil/matchHistory" />
      </Routes>
    </BrowserRouter>
  );
};
export default App;