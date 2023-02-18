//import useSocket from "../hooks/useSocket";
import { io } from "socket.io-client";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from "../balle blanche.svg"

const Game = () => {
	const style = {color: "white"}
	//const socket = useSocket("http://localhost:3000");
	let socket = io("http://localhost:3000");
	const [searching, setSearching] = useState(false);
	const [Match, setMatch] = useState(false);
	let navigate = useNavigate();
	const [pseudo, setpseudo] = useState('');

	socket.on("lobby.match", (data: any) => {
		console.log(`game created ${data.token}`);
		navigate(`/home/${data.token}`)
		setSearching(false);
		setMatch(true);
	});
	function join(){
		socket.on("connect", () => {
			console.log("connected");
			//setSocket(socket);
		})
		socket.emit("connect_msg", {sender :
			{id: socket.id ,username: pseudo}});
		socket.emit("message", {sender :
								{id: socket.id ,username: pseudo
								}, Roomtoken: "0", RoomType: "lobby", type: "join"})
		setSearching(true);
	}

	return (
	<div className=" content-center box-border border border-white flex flex-col m-auto w-4/6 h-4/6 rounded-lg justify-center">
		{!searching && !Match &&
		<div className=" content-center flex flex-col m-auto w-4/6 h-4/6 rounded-lg justify-center">
		<img src={logo} className=" my-20 mx-auto w-1/3 scale-75 " alt="" />
			<input id="pseudo" type="text" value={pseudo} onChange={(e)=> {setpseudo(e.target.value);}}/>
			<button className=" flex mx-auto btn-primary" onClick={join}> Partie Rapide </button>
		</div>
		}
		{searching && !Match && <div className="justify-center content-center"><h1 style={style}>SEARCHING</h1></div>}
		{!searching && Match && <div className="justify-center content-center"><h1 style={style}>STARTING</h1></div>}
	</div>);
  };

  export default Game;