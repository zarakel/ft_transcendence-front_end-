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
			
		})
	}
	public onDestroy() {}
	public onJoin(player: Player, data: any) {
		this.users.push(player)
	}
	public onleave(player: Player) {
		this.users = this.users.filter((p: Player) => p.username !== player.username);
	}

	private createGame(){
		this.gateway.createGameRoom(Math.random().toString(16).substring(2,10),
			this.users[0], this.users[1])
		this.onleave(this.users[0]);
		this.onleave(this.users[1]);
	}
}