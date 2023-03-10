import { Link } from "react-router-dom";
import {useState} from "react"
import logonav from "../pod blanc.svg"
import profil from "../profil.svg"
import disconnect from "../disconnect.svg"
import { io } from "socket.io-client";
import { useEffect } from 'react';


interface Message {
	user: string;
	message: string;
  }

const DiscussionWindows = () => {

	const [messages, setMessages] = useState<Message[]>([]);
	const [newMessage, setNewMessage] = useState('');
	const [openChat, setOpenChat] = useState(false);
	const [openRoom, setOpenRoom] = useState(false);
	const [connected, setConnected] = useState(false);

	
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setMessages([...messages, { user: 'you', message: newMessage }]);
		setNewMessage('');
	};

	const handleClick = () => {
		setOpenChat(true);
	}

	const socket = io("http://localhost:3000")

	function join(){
		socket.on("connect", () => {
			console.log("connected");
			//setSocket(socket);
		})
		socket.emit("connect_msg", {sender :
			{id: socket.id ,username: localStorage.getItem('pseudo')}});
		socket.emit("message", {sender :
								{id: socket.id ,username: localStorage.getItem('pseudo')
								}, Roomtoken: "0", RoomType: "lobby", type: "join"})
		setConnected(true);
	}
		
	useEffect(() => {
		join();
	} 
	, []);

	return (
		
		<div>
			{!openChat && !openRoom && connected &&
			<div className="flex flex-col mt-10 p-4 mx-auto h-2/3 w-4/6 bg-sky-700 rounded-lg overflow-auto mb-10">
				<button className="text-white m-auto p-5 rounded bg-gray-500" onClick={handleClick}> click ta race</button>
			</div>
			}
			{openChat &&
			<div className="flex flex-col mt-10 p-4 mx-auto h-2/3 w-4/6 bg-sky-700 rounded-lg overflow-auto mb-10">
				<div className="flex flex-col">
					<div className=" flex px-4 py-2 bg-gray-50 rounded text-center mx-auto">{localStorage.getItem('username')}</div>
						<div className="px-4 py-2 mr-60 flex-row-reverse flex space-y-4">
							<div className="space-y-3">
								{messages.map((message, index) => (
								<div key={index} className="p-2 rounded bg-gray-300">
									<span className="font-semibold">{message.user}: </span>
									<span> {message.message} </span>
								</div>
								))}
							</div>
						</div>
					<div className="mx-auto mt-auto">
						<form onSubmit={handleSubmit} className="rounded bg-white">
							<input
							type="text"
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
							className="p-2 z-0 rounded outline-none"
							/>
							<button type="submit" className="p-2 z-1 bg-gray-300 rounded ">
							Envoyer
							</button>
						</form>
					</div>
				</div>
			</div>}
		</div>
	);
};

export default DiscussionWindows;