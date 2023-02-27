import { RouterModule } from "@nestjs/core";
import { lookup } from "dns";
import Player from "./Player";
import Room from "./Room";

export default class LobbyRoom extends Room {

	constructor(){
		super(0, "lobby");
	}

	public onCreate() {
		setInterval(() => {
			if (this.users.length < 2)
				return ;
			this.createGame()
			
		}, 50)
	}
	public onDestroy() {}
	public onJoin(player: Player, data: any) {
		if (!this.users.find(((p) => {
			if (p.username === player.username) return p;
		}))){
			player.rooms.push(this.token);
			this.users.push(player)
			console.log(`user ${player.username} as join lobby`);
		}
		
	}
	public onleave(player: Player) {
		this.users = this.users.filter((p: Player) => p !== player);
	}

	private async createGame(){
		let token = Math.random().toString(16).substring(2,10)
		this.gateway.createGameRoom(token,
			this.users[0], this.users[1]).then(room => {
				[this.users[0], this.users[1]].forEach((p: Player) =>{
					let position = "spec";
					if (p == room.leftPlayer)
						position = "left";
					if (p == room.rightPlayer)
						position = "right";
					p.emit("lobby.match", {
						sender: {id: p.socket.id, username: p.username, pos: position},
						token: token
					})
					this.onleave(p);
				});
			});
	}
}