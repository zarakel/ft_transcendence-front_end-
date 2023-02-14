import useSocket from "../hooks/useSocket";

const Game = () => {
	const socket = useSocket("http://localhost:3000");
	function join(){
		console.log("join")
		socket.emit("message", {sender :
								{id: socket.current.id ,username: socket.current.id
								}, room_id: "0", type: "join"})
	}
	return (<div><h1>test</h1>
			<canvas id="canvas"></canvas>
			<button onClick={join}>envoyer</button>
			</div>);
  };

  export default Game;