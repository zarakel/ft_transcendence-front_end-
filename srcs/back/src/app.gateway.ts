import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';
import Player from "./room/Player"

@WebSocketGateway({
	cors: { origin: '*',}
})
export class AppGateway
{
	private users : Map<string, Player>

	@WebSocketServer()
	public server: Server;
	public afterInit(server: Server) {
		this.users = new Map();
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
		console.log("msg.username: %s", msg);
		if (this.users.has(msg.username))
			console.log("user already define");
		else
			this.users.set(msg.username, new Player(client, msg.username))
	}
	//envoi d'un msg + mots clé d'action
	@SubscribeMessage('message')
	public onMessage(client: Socket, msg: any){
		console.log("client :%s, msg :%s", client.id, msg);
	}
}