//import useSocket from "../hooks/useSocket";
import { io } from "socket.io-client";
import { useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import logo from "../balle blanche.svg";
import styles from "../styles/game.module.scss";
import useCanvas from "../hooks/useCanvas";

export const PONG_W: number = 600;
export const PONG_H: number = 400;
export const PLAYER_W: number = 10;
export const PLAYER_H: number = PONG_H * 0.3;


const Game = () => {
	//const socket = useSocket("http://localhost:3000");
	let socket = io("http://localhost:3000");
	const [searching, setSearching] = useState(false);
	const [Match, setMatch] = useState(false);
	const [pseudo, setpseudo] = useState('');
	const [position, setPosition] = useState('spec');
	const [size, setSize] = useState<any>({w: PONG_W, h: PONG_H});
	const [player1, setPlayer1] = useState<any>({});
	const [player2, setPlayer2] = useState<any>({});
	const [ball, setBall] = useState<any>({});

	const {id} = useParams();
	let navigate = useNavigate();

	socket.on("lobby.match", (data: any) => {
		console.log(`game created ${data.token}`);
		navigate(`/home/${data.token}`)
		setSearching(false);
		setMatch(true);
		setPosition(data.pos);
		setPlayer1({y: size.h / 2 - (size.h * 0.3) / 2})
		setPlayer2({y: size.h / 2 - (size.h * 0.3) / 2})
		setBall({x: PONG_W / 2, y: PONG_H / 2, r: 5});
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

	//----------------------------canva------------------------------------------

	const drawPlayer = (context: CanvasRenderingContext2D) => {
		context.fillStyle = 'white';
		//player1 left
		context.fillRect(0, player1.y, PLAYER_W, PLAYER_H);
		//player2 right
		context.fillRect(size.w - PLAYER_W, player2.y,
			PLAYER_W, PLAYER_H);
	};
	
	const drawBall = (context: CanvasRenderingContext2D) => {
		context.beginPath();
		context.fillStyle = 'white';
		context.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2, false);
		context.fill();
	};

	const drawPlayerAndBall = (context: CanvasRenderingContext2D) => {
		//console.log("passe");
		drawPlayer(context);
		drawBall(context);
	};

	const resize = () => {
		let canvas = canvasRef.canvasRef.current;
		if (canvas)
			setSize({w: canvas.clientWidth, h: canvas.clientHeight});
	};
	const update = () => {};
	
	const canvasRef = useCanvas(size, update, drawPlayerAndBall, resize);

	const handleMove = (e: any) => {
		let canvas = e.target;
		let canvaRect = canvas.getBoundingClientRect()
		let y = 0;
		if (canvaRect)
			y = e.clientY - canvaRect.y;
		//console.log("move", position, pseudo, id, y);
		socket.emit("message", {type: "movePaddle", RoomType: "game", Roomtoken: id, sender :
			{id: socket.id ,username: pseudo, pos: position, y: y}})
	}
	
	socket.on("game.move", (data: any) => {
		if (data.sender.pos == "left"){setPlayer1({y: data.sender.y})}
		if (data.sender.pos == "right"){setPlayer2({y: data.sender.y})}
		//canvasRef.updatePlayer(data.y, data.pos)
	});

	//-------------------------------------------------------------------------------------

	return (
		//className={styles.game_screen}
	<div className={styles.game_screen}>
		{
			!searching && !Match &&
			<div className={styles.game_menu}>
				<img className={styles.game_img} src={logo} alt="" />
				<input id="pseudo" type="text" value={pseudo} onChange={(e)=> {setpseudo(e.target.value);}}/>
				<button className="flex mx-auto my-3 btn-primary" onClick={join}> Partie Rapide </button>
			</div>
		}
		{
			searching && !Match && 
				<div className={styles.game_loading}>
					<img src={logo} className={styles.game_img} alt="" />
					<h1 className={styles.game_msg}>SEARCHING...</h1>
				</div>
		}
		{
			!searching && Match && 
			<div className={styles.game}>
				<canvas className={styles.game_canvas} ref={canvasRef.canvasRef} onMouseMove={handleMove} width={PONG_W} height={PONG_H}/>
			</div>
		}
	</div>);
  };

  export default Game;