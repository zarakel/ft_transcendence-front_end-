//import useSocket from "../hooks/useSocket";
import { io, Socket } from "socket.io-client";
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
	const useSocket = (url: string) => {
		const [socket, setSocket] = useState<Socket>();
		const [ready, setReady] = useState<boolean>(false);
		useEffect(() =>{
			let socket = io(url, { forceNew: true });
			socket.on("connect", () => {
				setSocket(socket);
				setReady(true);
			});

			return () => {
				socket.disconnect();
				setReady(false);
			}
		
		}, [url]);
		
		const join = () =>{
			if (socket) {
				socket.emit("connect_msg", {sender :
					{id: socket.id ,username: pseudo}});
				socket.emit("message", {sender :
									{id: socket.id ,username: pseudo
									}, Roomtoken: "0", RoomType: "lobby", type: "join"})
			setSearching(true);
			}
		};

		const emit = (type: string, data: any) => {
			if (socket)
				socket.emit(type, data);
		}
	
		const on = (name: string, callback: any) => {
			if (socket)
				return socket.on(name, callback)
		}

		return {current: socket, join, emit, on, ready}
	}
	
	const [searching, setSearching] = useState(false);
	const [Match, setMatch] = useState(false);
	const [pseudo, setpseudo] = useState('');
	const [position, setPosition] = useState('spec');
	const [size, setSize] = useState<any>({w: PONG_W, h: PONG_H});
	const [player1, setPlayer1] = useState<any>({});
	const [player2, setPlayer2] = useState<any>({});
	const [ball, setBall] = useState<any>({});

	const {id} = useParams();
	const socket = useSocket("http://localhost:3000");
	let navigate = useNavigate();

	useEffect(() => {
		let token = id;
		socket.on("lobby.match", (data: any) => {
			console.log(`game created ${data.token}`);
			navigate(`/home/${data.token}`)
			setPosition(data.pos);
			if (socket.current)
				socket.emit("message", {sender :
					{id: socket.current.id ,username: pseudo, pos: data.pos
				}, Roomtoken: data.token, RoomType: "game", type: "join"})
			setSearching(false);
			setMatch(true);
			setPlayer1({y: size.h / 2 - (size.h * 0.3) / 2})
			setPlayer2({y: size.h / 2 - (size.h * 0.3) / 2})
			setBall({x: PONG_W / 2, y: PONG_H / 2, r: 5});
		});

		socket.on("game.stop", (data: any) => {
			console.log(data.winner, data.expt);
			navigate(`/home`);
		})

		socket.on("game.move", (data: any) => {
			if (data.sender.pos === position) return ;
			if (data.sender.pos === "left"){setPlayer1({y: data.sender.y}); }
			if (data.sender.pos === "right"){setPlayer2({y: data.sender.y});}
		});

		return () => {
			if (socket.current)
				socket.emit("message", {sender :
					{id: socket.current.id ,username: pseudo, pos: position
				}, Roomtoken: token, RoomType: "game", type: "leave"});
		}
	}, [socket.ready]);
	
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
		if (canvaRect && socket.current){
			y = e.clientY - canvaRect.y;
			if (position === "left") setPlayer1({y: y});
			if (position === "right") setPlayer2({y: y});
			socket.emit("message", {type: "movePaddle", RoomType: "game", Roomtoken: id, sender :
				{id: socket.current.id ,username: pseudo, pos: position, y: y}})
		}
	}

	//-------------------------------------------------------------------------------------

	return (
		<div className={styles.game_screen}>
			{
				!searching && !Match &&
				<div className={styles.game_menu}>
					<img className={styles.game_img} src={logo} alt="" />
					<input id="pseudo" type="text" value={pseudo} onChange={(e)=> {setpseudo(e.target.value);}}/>
					<button className="flex mx-auto my-3 btn-primary" onClick={socket.join}> Partie Rapide </button>
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
		</div>
	);
  };

  export default Game;