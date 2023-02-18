import { Socket } from "socket.io";
import Room from "./Room";

export default class Player
{
	public id: number;
	public socket: Socket;
	public username: string;
	public pos: string;
	public rooms: Array<string>;
	public score: number; 

	constructor(socket: Socket, username: string){
		this.id = 0;
		this.socket = socket;
		this.username = username;
		this.rooms = new Array();
	}

	public emit(event: string, data:any){
		this.socket.emit(event, data);
	}
}