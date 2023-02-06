import { Socket } from "socket.io";

export default class Player
{
	public id: number;
	public socket: Socket
	public username: string

	constructor(socket: Socket, username: string){
		this.id = 0;
		this.socket = socket;
		this.username = username;
	}

	public emit(event: string, data:any){
		this.socket.emit(event, data);
	}
}