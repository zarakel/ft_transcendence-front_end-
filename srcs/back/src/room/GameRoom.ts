import Player from "./Player"
import Room from "./Room";

export default class GameRoom extends Room
{
	public leftPlayer: Player;
	public rightPlayer: Player;
	private rightP: boolean = false;
	private leftP: boolean = false;
	private PONG_W: number = 600;
	private PONG_H: number = 400;
	private PLAYER_W: number = 5;
	private PLAYER_H: number = this.PONG_H * 0.3;
	private ly: number = this.PONG_H / 2 - (this.PONG_H * 0.3) / 2;
	private ry: number = this.ly;
	
	constructor(id: number, token: string)
	{
		super(id, token);
	}

	public onJoin(player: Player, data: any) {
		if (player.username === this.leftPlayer.username || player.username === this.rightPlayer.username)
			player.pos = data.sender.pos;
		else
			player.pos = "spec";
		player.score = 0;
		if (this.users.find((p: Player) => {if (p.username === player.username) return p;}) === undefined){
			player.rooms.push(this.token);
			this.users.push(player);
			this.users.forEach(p => {
				p.emit("game.join", {sender: data.sender, token: this.token});
			});
			console.log(`player: ${player.username} join: ${this.id} status: ${player.pos}`)
		}
	}

	public onleave(player: Player) {
		if (this.leftPlayer && player.id === this.leftPlayer.id)
			this.leftP = false;
		else if (this.rightPlayer && player.id === this.rightPlayer.id)
			this.rightP = false;
		this.users = this.users.filter((p: Player) => p !== player)
		console.log(`player ${player.username} leaved ${this.id}`)
		if (!this.leftP || !this.rightP)
		{
			let winner = "right";
			if (this.leftP)
				winner = "left";
			this.users.forEach(p => {
				p.emit("game.stop", {winner: winner, expt: "deconnection"})
			});
		}
	}

	public onCreate() {
		this.processMessage("movePaddle", (player: Player, data: any) => {
			if (data.pos === "left"){data.sender.y = this.ly;}
			if (data.pos === "right"){data.sender.y = this.ry;}
			this.users.forEach(p => {
				if (p.username !== data.sender.username){
					p.emit("game.move", data); 
				}
			});
		})
	}

	public onDestroy() {}
}