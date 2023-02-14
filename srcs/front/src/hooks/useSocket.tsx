import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";

const useSocket = (url: string): any => {
	const [socket, setSocket] = useState<Socket>();
	useEffect(() => {
		let socket = io(url);
		socket.on("connect", () => {
			console.log("connected");
			socket.emit("connect_msg", {username: socket.id});
			setSocket(socket);
		}) 
	}, [url])

	const emit = (type: string, data: any) => {
		if (socket)
			socket.emit(type, data);
	}

	return {
		current: socket,
		emit
	}
}


export default useSocket;