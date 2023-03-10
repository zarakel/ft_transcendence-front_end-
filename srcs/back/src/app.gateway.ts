import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';
import GameRoom from "./room/GameRoom";
import Room from "./room/Room";
import LobbyRoom from "./room/LobbyRoom";
import Player from "./room/Player"

@WebSocketGateway({
	cors: { origin: '*',}
})
export class AppGateway
{
	private users : Map<string, Player>;
	private gameRooms : Map<string, GameRoom>;
	private lobby: LobbyRoom;

	@WebSocketServer()
	public server: Server;
	public afterInit(server: Server) {
		this.users = new Map();
		this.lobby = new LobbyRoom;
		this.lobby.setGateway(this);
		this.gameRooms = new Map();
	}

	//connection
	public handleConnection(client: Socket){}

	//diconnect
	public handleDisconnect(client: Socket){
		this.users.forEach((p: Player, key: string) => {
			if (p.socket.id == client.id){
				p.rooms.forEach((token: string)=>{
					let room;
					if (token == "lobby")
						room = this.lobby;
					else if (this.gameRooms.has(token))
						room = this.gameRooms.get(token);
					else throw new Error("Invalid room");
					room.onleave(p);
				});
				this.users.delete(key);
			}
		})
	}

	//onUser connection
	@SubscribeMessage('connect_msg')
	public onConnection(client: Socket, data: any){
		if (!this.users.has(data.sender.username))
			this.users.set(data.sender.username, new Player(client, data.sender.username))
	}

	//envoi d'un msg + mots clé d'action
	@SubscribeMessage('message')
	public onMessage(client: Socket, data: any){
		let player = this.users.get(data.sender.username)
		let room = this.getRoom(data.Roomtoken, data.RoomType);
		if (player && room)
			room.onMessage(data.type, player, data);
		//console.log("client :%s, msg :%s, username: %s", client.id, data, data.sender.username);
	}

	public async createGameRoom(token: string, p1: Player, p2: Player): Promise<GameRoom>{
		let game = new GameRoom(0, token);
		game.leftPlayer = p1;
		game.rightPlayer = p2;
		this.gameRooms.set(token, game);
		console.log(`room create id: ${game.getToken()}`)
		return game;
	}

	private getRoom(token: string, type: string): Room{
		if (type == "lobby")
			return this.lobby;
		else if (type == "game")
			return this.gameRooms.get(token);
		else 
			return null;
	}
}