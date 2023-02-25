//import useSocket from "../hooks/useSocket";
import useCanvas from "../hooks/useCanvas";
import { io } from "socket.io-client";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from "../balle blanche.svg";
import styles from "../styles/game.module.scss";
import { useParams } from 'react-router-dom';

const Game = () => {
	//const socket = useSocket("http://localhost:3000");
	let socket = io("http://localhost:3000");
	const [searching, setSearching] = useState(false);
	const [Match, setMatch] = useState(false);
	const [pseudo, setpseudo] = useState('');
	const [position, setPosition] = useState('spec');

	const {id} = useParams();
	let navigate = useNavigate();

	socket.on("lobby.match", (data: any) => {
		console.log(`game created ${data.token}`);
		navigate(`/home/${data.token}`)
		setSearching(false);
		setMatch(true);
		setPosition(data.pos);
	});

	//temp
	function join(){
		socket.emit("connect_msg", {sender :
			{id: socket.id ,username: pseudo}});
		socket.emit("message", {sender :
								{id: socket.id ,username: pseudo
								}, Roomtoken: "0", RoomType: "lobby", type: "join"})
		setSearching(true);
	}

	//play
	const canvasRef = useCanvas();

	const handleMove = (e: any) => {
		let canvas = e.target;
		let canvaRect = canvas.getBoundingClientRect()
		let y = 0;
		if (canvaRect)
			y = e.clientY - canvaRect.y;
		console.log("move", position, pseudo, id, y);
		socket.emit("message", {type: "movePaddle", RoomType: "game", Roomtoken: id, sender :
			{id: socket.id ,username: pseudo, pos: position, y: y}})
	}

	socket.on("game.move", (data: any) => {
		console.log(data);
		canvasRef.updatePlayer(data.y, data.pos)
	});

	return (
	<div className={styles.game_screen}>
		{!searching && !Match &&
		<div className={styles.game_menu}>
		<img src={logo} className={styles.game_img} alt="" />
			<input id="pseudo" type="text" value={pseudo} onChange={(e)=> {setpseudo(e.target.value);}}/>
			<button className="flex mx-auto my-3 btn-primary" onClick={join}> Partie Rapide </button>
		</div>
		}
		{searching && !Match && <div className={styles.game_loading}>
			<h1 className={styles.game_msg}>SEARCHING</h1>
			</div>}
		{!searching && Match && <div className={styles.game}>
			<canvas ref={canvasRef} onMouseMove={handleMove}/>
			</div>}
	</div>);
  };

  export default Game;