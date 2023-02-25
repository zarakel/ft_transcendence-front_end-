import { useState, useRef, useEffect } from 'react';

const useCanvas = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [size, setSize] = useState({w:0, h:0});
	const [player1, setPlayer1] = useState({})
	const [player2, setPlayer2] = useState({})
	const [ball, setBall] = useState({});

	const resize = () => {
		const canvas = canvasRef.current;
		if (canvas)
			setSize({w: canvas.width, h: canvas.height});
			setPlayer1({w: 5, h: size.h * 0.3, y: size.h / 2 - (size.h * 0.3) / 2});
			setPlayer2({w: 5, h: size.h * 0.3, y: size.h / 2 - (size.h * 0.3) / 2});
			setBall({
				x: size.w / 2,
				y: size.h / 2,
				r: 5});
		console.log("resize");
	}

	const draw = () => {
		let context = canvasRef.current!.getContext('2d');
		if (context){
			drawBack(context);
			drawPlayer(context, player1);
			drawPlayer(context, player2);
			drawBall(context, ball);
		}
	}
	useEffect(() => {
		let anim = window.requestAnimationFrame(draw);
	});

	useEffect(() => resize, []);

	const drawBack = (context: CanvasRenderingContext2D) => {
		// Draw field
		context.fillStyle = 'black';
		context.fillRect(0, 0, size.w, size.h);
		// Draw middle line
		context.strokeStyle = 'white';
		context.beginPath();
		context.moveTo(size.w / 2, 0);
		context.lineTo(size.w / 2, size.h)
		context.stroke();
	}

	const drawPlayer = (context: CanvasRenderingContext2D, player: any) =>{
		context.fillStyle = 'white';
		if (player.pos == "left")
			context.fillRect(0, player.y, player.w, player.h);
		if (player.pos == "right")
			context.fillRect(size.w - player.w, player.y,
				player.w, player.h);
	}

	const drawBall = (context: CanvasRenderingContext2D, ball: any) => {
		context.beginPath();
		context.fillStyle = 'white';
		context.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2, false);
		context.fill();
	}

	const updatePlayer = (y:number, pos: string) => {
		if (pos == "left")
			setPlayer1({w:5, h: size.h * 0.3, y: y});
		if (pos == "right")
			setPlayer2({w:5, h: size.h * 0.3, y: y});
	}

	const updateBall = (x: number, y: number) => {
		setBall({
			x: x,
			y: y,
			r: 5});
	}

	return {canvasRef, updatePlayer, updateBall};
}

export default useCanvas;
