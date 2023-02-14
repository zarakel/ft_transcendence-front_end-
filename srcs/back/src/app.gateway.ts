import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';
import GameRoom from "./room/GameRoom";
import Player from "./room/Player"

@WebSocketGateway({
	cors: { origin: '*',}
})
export class AppGateway
{
	private users : Map<string, Player>
	private gameRooms : Map<string, GameRoom>

	@WebSocketServer()
	public server: Server;
	public afterInit(server: Server) {
		this.users = new Map();
		this.gameRooms = new Map();
		this.gameRooms.set("0", new GameRoom(0, "toto"));
	}

	//connection
	public handleConnection(client: Socket){
		console.log("client connect: %s", client.id);
	}

	//diconnect
	public handleDisconnect(client: Socket){
		console.log("client disconnect : %s", client.id);
		this.users.forEach((value: Player, key: string) => {
			if (value.socket.id == client.id)
				this.users.delete(key);
		})
	}

	//onUser connection
	@SubscribeMessage('connect_msg')
	public onConnection(client: Socket, msg: any){
		if (this.users.has(msg.username))
			console.log("user already define");
		else
			this.users.set(msg.username, new Player(client, msg.username))
	}
	//envoi d'un msg + mots clé d'action
	@SubscribeMessage('message')
	public onMessage(client: Socket, data: any){
		let player = this.users.get(data.sender.username)
		let room = this.gameRooms.get(data.room_id);
		if (player && room)
			room.onMessageSpe(data.type, player, data);
		console.log("client :%s, msg :%s", client.id, data);
	}
}