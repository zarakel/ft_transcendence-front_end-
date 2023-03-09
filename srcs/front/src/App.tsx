import React, {FC, useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter, Route, RouteProps, Navigate } from "react-router-dom";
import { Switch } from "react-router";
import Home from './pages/Home';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Profil from './pages/Profil';
import Game from './pages/Game';
import MatchHistory from './pages/MatchHistory';
import ModifyPicture from './pages/ModifyProfilePicture';
  

const CheckConnected = () => {

	const String: string | null = localStorage.getItem("connected");
	const [checkString, setCheckString] = useState(false);
	if (String !== null && String === "yes")
		setCheckString(true);
	return checkString;
};

type PrivateRouteProps = RouteProps & {
	isAuthenticated: boolean;
  };
  
  const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, ...rest }) => {
	if (!isAuthenticated) {
	  return <Navigate to="/login" />;
	}
  
	return <Route {...rest} />;
  };

const App: FC = () => {

	


	return (

	<BrowserRouter>
    	<Switch>
			<Route element={<Login />} path="/" />
			<PrivateRoute element={<Home />} isAuthenticated={CheckConnected()} path="/home" />
			<PrivateRoute element={<Home />} isAuthenticated={CheckConnected()} path="/home/:id" />
			<Route element={<Chat />} path="/home/chat" />
			<Route element={<Profil />} path="/home/profil" />
			<Route element={<Game />} path="/game" />
			<Route element={<MatchHistory />} path="/home/profil/matchHistory" />
			<Route element={<ModifyPicture />} path="/home/profil/modify_picture" />
		</Switch>
    </BrowserRouter>
  );
};

export default App;