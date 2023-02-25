import { useState, useRef, useEffect } from 'react';

export type fctResize = () => void
export type fctUpdate = () => void
export type fctDrawPlayerAndBall = (context: CanvasRenderingContext2D) => void

const useCanvas = (size: any, update: fctUpdate, drawPlayerAndBall: fctDrawPlayerAndBall, resize: fctResize) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const context = canvasRef.current?.getContext('2d')
		let anim: number;

		(function render() {
			if (context)
			{
				update();
				context.fillStyle = 'black';
    			context.fillRect(0, 0, size.w, size.h);
    			// Draw middle line
    			context.strokeStyle = 'white';
    			context.beginPath();
    			context.moveTo(size.w / 2, 0);
    			context.lineTo(size.w / 2, size.h);
    			context.stroke();
				drawPlayerAndBall(context);
			}
			anim = window.requestAnimationFrame(render)
		})();

		return () =>  window.cancelAnimationFrame(anim)
	})

	//useEffect(() => resize(), []);

	return {canvasRef};
}

export default useCanvas;
