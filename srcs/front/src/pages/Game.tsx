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
	const [match, setMatch] = useState(false);
	const [pseudo, setpseudo] = useState('');
	const [start, setStart] = useState(false);
	const [position, setPosition] = useState('spec');
	const [size, setSize] = useState<any>({w: PONG_W, h: PONG_H});
	const [player1, setPlayer1] = useState<any>({});
	const [player2, setPlayer2] = useState<any>({});
	const [ball, setBall] = useState<any>({});

	const {id} = useParams();
	const socket = useSocket("http://localhost:3000");
	const navigate = useNavigate();

	socket.on("lobby.match", (data: any) => {
		if (data.sender.username == pseudo){
			console.log(`game created ${data.token} ${data.sender.pos}`);
			if (socket.current)
				socket.emit("message", {sender :
					{id: socket.current.id ,username: pseudo, pos: data.sender.pos
				}, Roomtoken: data.token, RoomType: "game", type: "join"});
			setSearching(false);
			setMatch(true);
			setPosition(data.sender.pos);
			setPlayer1({y: size.h / 2 - (size.h * 0.3) / 2})
			setPlayer2({y: size.h / 2 - (size.h * 0.3) / 2})
			setBall({x: PONG_W / 2, y: PONG_H / 2, r: 5});
		}
	});

	useEffect(() => {
		let token = id;

		let checkUsername = localStorage.getItem("username")
		if ( checkUsername !== null)
			setpseudo(checkUsername);

		socket.on("game.join", (data: any) => {
			if (data.sender.username === pseudo){
			 	navigate(`/home/${data.token}`);
			}
		});
	
		socket.on("game.move", (data: any) => {
			if (data.sender.pos === position) return ;
			if (data.sender.pos === "left"){setPlayer1({y: data.sender.y});}
			if (data.sender.pos === "right"){setPlayer2({y: data.sender.y});}
		});

		return () => {
			if (socket.current){
				console.log("passe in return");
				socket.emit("message", {sender :
					{id: socket.current.id ,username: pseudo, pos: position
				}, Roomtoken: token, RoomType: "game", type: "leave"});
				navigate('/home');
			}
		}
	}, [match]);

	//----------------------------canva------------------------------------------

	const drawPlayers = (context: CanvasRenderingContext2D) => {
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
		drawPlayers(context);
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
		<div className="flex border border-white  rounded-lg m-auto w-4/6 h-4/6 justify-center">
			{
				!searching && !match &&
				<div className=" flex flex-col m-auto space-y-20 ">
					<img className="my-20 mx-auto scale-150" src={logo} alt="" />
					<button className="mx-auto btn-primary" onClick={socket.join}> Partie Rapide </button>
				</div>
			}
			{
				searching && !match && 
					<div className=" flex flex-col m-auto space-y-20 ">
						<img className="my-20 mx-auto " src={logo} alt="" />
						<h1 className="text-xl text-white font-semibold"> SEARCHING...</h1>
					</div>
			}
			{
				!searching && match && 
				<div className="w-1/2">
					<canvas className="w-full h-full" ref={canvasRef.canvasRef} onMouseMove={handleMove} width={PONG_W} height={PONG_H}/>
				</div>
			}
		</div>
	);
  };

  export default Game;