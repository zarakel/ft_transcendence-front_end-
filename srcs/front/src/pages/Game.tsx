import { useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import logo from "../balle blanche.svg";
import styles from "../styles/game.module.scss";
import useCanvas from "../hooks/useCanvas";
import useSocket from "../hooks/useSocket";
import useUser from "../hooks/useUser";

export const PONG_W: number = 600;
export const PONG_H: number = 400;
export const PLAYER_W: number = 10;
export const PLAYER_H: number = PONG_H * 0.3;


const Game = () => {
	const socket = useSocket("http://localhost:3000/");
	const user = useUser();
	const [searching, setSearching] = useState(false);
	const [match, setMatch] = useState(false);
	const [token, setToken] = useState("");
	const [start, setStart] = useState(false);
	const [position, setPosition] = useState('spec');
	const [size, setSize] = useState<any>({w: PONG_W, h: PONG_H});
	const [player1, setPlayer1] = useState<any>({y: PONG_H / 2 - (PONG_H * 0.3) / 2});
	const [player2, setPlayer2] = useState<any>({y: PONG_H / 2 - (PONG_H * 0.3) / 2});
	const [ball, setBall] = useState<any>({x: PONG_W / 2, y: PONG_H / 2, r: 5});

	const {id} = useParams();
	const navigate = useNavigate();

	socket.on("lobby.match", (data: any) => {
		console.log(`game created ${data.token} ${data.sender.pos}`);
		navigate(`/home/${data.token}`);
		setToken(data.token);
	});

	useEffect(() => {
		let token = id;

		/*let checkUsername = localStorage.getItem("username")
		if ( checkUsername !== null)
			setpseudo(checkUsername);*/

		socket.on("game.join", (data: any) => {
			setPosition(data.sender.pos);
			setSearching(false);
			setMatch(true);
		});

		socket.on("game.start", (data: any) => {
			setStart(true);
		});
	
		socket.on("game.move", (data: any) => {
			console.log("pos", position, data.sender.pos);
			if (data.sender.pos === "spec") return ;
			if (data.sender.pos === "left"){setPlayer1({y: data.sender.y});}
			if (data.sender.pos === "right"){setPlayer2({y: data.sender.y});}
		});

		return () => {
			/*if (socket.ready){
				socket.emit("message", {sender :
					{id: user.id ,username: user.username, pos: position
				}, Roomtoken: token, RoomType: "game", type: "leave"});
				navigate('/home');
				setSearching(false);
				setMatch(false);
			}*/
		}
	}, [id]);

	const join = () =>{
		socket.emit("message", {sender :
							{id: user.id ,username: user.username
							}, Roomtoken: "0", RoomType: "lobby", type: "join"})
		setSearching(true);
	}

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
		drawPlayers(context);
		drawBall(context);
	};

	const resize = () => {
		let canvas = canvasRef.canvasRef.current;
		if (canvas)
			setSize({w: canvas.clientWidth, h: canvas.clientHeight});
	};
	
	const canvasRef = useCanvas(size, drawPlayerAndBall, resize);

	const handleMove = (e: any) => {
		let canvas = e.target;
		let canvaRect = canvas.getBoundingClientRect()
		let y = 0;
		if (canvaRect && socket.ready){
			y = e.clientY - canvaRect.y;
			if (position === "left") setPlayer1({y: y});
			if (position === "right") setPlayer2({y: y});
			socket.emit("message", {type: "movePaddle", RoomType: "game", Roomtoken: id, sender :
				{id: user.id ,username: user.username, pos: position, y: y}})
		} 
	}

	//-------------------------------------------------------------------------------------

	return (
		<div className="flex border border-white  rounded-lg m-auto w-4/6 h-4/6 justify-center">
			{
				!searching && !match &&
				<div className={styles.game_menu}>
					<img className={styles.game_img} src={logo} alt="" />
					<button className="flex mx-auto my-3 btn-primary" onClick={join}> Partie Rapide </button>
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