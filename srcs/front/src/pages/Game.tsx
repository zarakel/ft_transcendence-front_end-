//import useSocket from "../hooks/useSocket";
import { io } from "socket.io-client";
import { useState } from 'react';

const Game = () => {
	//const socket = useSocket("http://localhost:3000");
	let socket = io("http://localhost:3000");
	const [pseudo, setpseudo] = useState('');
	function join(){
		socket.on("connect", () => {
			console.log("connected");
			//setSocket(socket);
		})
		socket.emit("connect_msg", {sender :
			{id: socket.id ,username: pseudo}});
		console.log("join")
		socket.emit("message", {sender :
								{id: socket.id ,username: pseudo
								}, Roomtoken: "0", RoomType: "lobby", type: "join"})
	}
	return (<div><h1>test</h1>
			<canvas id="canvas"></canvas>
			<input id="pseudo" type="text" value={pseudo} onChange={(e)=> {setpseudo(e.target.value);}}/>
			<button onClick={join}>envoyer</button>
			</div>);
  };

  export default Game;