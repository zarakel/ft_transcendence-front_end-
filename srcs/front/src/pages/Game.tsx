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
	const [start, setStart] = useState(false);
	const [position, setPosition] = useState('spec');
	const [count, setCount] = useState(3);
	const [size, setSize] = useState<any>({w: PONG_W, h: PONG_H});
	const [player1, setPlayer1] = useState<any>({y: PONG_H / 2 - (PONG_H * 0.3) / 2, score: 0});
	const [player2, setPlayer2] = useState<any>({y: PONG_H / 2 - (PONG_H * 0.3) / 2, score: 0});
	const [ball, setBall] = useState<any>({x: PONG_W / 2, y: PONG_H / 2, r: 5});

	const {id} = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (id){
			setSearching(false);
			if (socket.ready)
				socket.emit("message", {sender :
					{id: user.id ,username: user.username
				}, Roomtoken: id, RoomType: "game", type: "join"});
		}
		return () => {};
	}, [id]);

	useEffect(() => {
		if (searching){
			socket.on("lobby.match", (data: any) => {
				navigate(`/home/${data.token}`);
			});
			socket.on("game.join", (data: any) => {
				setPosition(data.sender.pos);
				setSearching(false);
				setMatch(true);
			});
		}
	}, [searching]);

	useEffect(() => {
		socket.on("game.count", (data: any) =>{
			setCount(data.count);
		});

		socket.on("game.start", (data: any) => {
			setStart(true);
		});

		socket.on("game.stop", (data: any) => {
			setSearching(false);
			setMatch(false);
			reset();
			navigate('/home');
		});
	
		socket.on("game.move", (data: any) => {
			if (data.sender.pos === "spec") return ;
			if (data.sender.pos === "left"){player1.y = data.sender.y;}
			if (data.sender.pos === "right"){player2.y = data.sender.y;}
		});

		socket.on("game.update", (data: any) => {
			setBall({x: data.x, 
				y: data.y, 
				r: 5});
		});
		socket.on("game.goal", (data: any) => {
			player1.score = data.lscore;
			player2.score = data.rscore;
			/*setPlayer1({y: PONG_H / 2 - (PONG_H * 0.3) / 2});
			setPlayer2({y: PONG_H / 2 - (PONG_H * 0.3) / 2});*/
		});

		return () => {
			if (match){
				if (socket.ready){
					socket.emit("message", {sender :
						{id: user.id ,username: user.username, pos: position
					}, Roomtoken: id, RoomType: "game", type: "leave"});
					setSearching(false);
					setMatch(false);
					setStart(false);
					navigate('/home');
				}
			}
		}
	}, [match]);

	const reset = () => {
		setPlayer1({y: PONG_H / 2 - (PONG_H * 0.3) / 2, score: 0});
		setPlayer2({y: PONG_H / 2 - (PONG_H * 0.3) / 2, score: 0});
		setBall({x: PONG_W / 2, y: PONG_H / 2, r: 5});

	}
	const join = () =>{
		socket.emit("message", {sender :
							{id: user.id ,username: user.username
							}, Roomtoken: "0", RoomType: "lobby", type: "join"})
		setSearching(true);
	}

	//----------------------------canva------------------------------------------

	const draw = (context: CanvasRenderingContext2D) => {
		context.fillStyle = 'white';
		//player1 left
		context.fillRect(0, player1.y, PLAYER_W, PLAYER_H);
		//player2 right
		context.fillRect(size.w - PLAYER_W, player2.y,
			PLAYER_W, PLAYER_H);
		//ball
		context.beginPath();
		context.fillStyle = 'white';
		context.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2, false);
		context.fill();
		//score
		context.fillStyle = 'red';
		context.font = "bold 48px serif";
		context.textAlign = "start";
		context.fillText(player2.score.toString(), size.w / 2 + 10, 40);
		context.textAlign = "end";
		context.fillText(player1.score.toString(), size.w / 2 - 10, 40);

		if (!start && count >= 0) {
			let text = count.toString();
			context.fillStyle = 'while';
			context.font = "48px serif";
			context.textAlign = "center";
			if (count == 0)
				text = "go";
			context.fillText(text, size.w / 2, size.h / 2);
		}
	};

	const resize = () => {
		let canvas = canvasRef.canvasRef.current;
		if (canvas)
			setSize({w: canvas.clientWidth, h: canvas.clientHeight});
	};
	
	const canvasRef = useCanvas(size, draw, resize);

	const handleMove = (e: any) => {
		if (position === "spec")
			return ;
		let canvas = e.target;
		let canvaRect = canvas.getBoundingClientRect()
		let y = 0;
		if (canvaRect && socket.ready && start){
			y = (e.clientY - canvaRect.y) - PLAYER_H / 2;
			if (y <= 0)
				y = 0;
			else if (y >= PONG_H - PLAYER_H)
				y = PONG_H - PLAYER_H;
			if (position === "left") player1.y = y;
			if (position === "right") player2.y = y;
			socket.emit("message", {type: "movePaddle", RoomType: "game", Roomtoken: id, sender:
				{id: user.id ,username: user.username, pos: position, y: y}})
		} 
	}

	//-------------------------------------------------------------------------------------

	return (
		<div className={styles.game_screen}>
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
				<div className={styles.game}>
					<canvas className={styles.game_canvas} ref={canvasRef.canvasRef} onMouseMove={handleMove} width={PONG_W} height={PONG_H}/>
				</div>
			}
		</div>
	);
  };

  export default Game;