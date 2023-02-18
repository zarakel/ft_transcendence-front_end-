import Player from "./Player"
import Room from "./Room";

export default class GameRoom extends Room
{

	public leftPlayer: Player;
	public rightPlayer: Player;
	private rightP: boolean = false;
	private leftP: boolean = false;
	
	constructor(id: number, token: string)
	{
		super(id, token);
	}

	public onJoin(player: Player) {
		let pos = "spec";
		if (!this.leftPlayer && !this.leftP){
			this.leftPlayer = player;
			this.leftP = true;
			pos = "left";
		}
		else if (!this.rightPlayer && !this.rightP){
			this.rightPlayer = player;
			this.rightP = true;
			pos = "right";
		}
		player.pos = pos;
		player.score = 0;
		if (this.users.find((p: Player) => {if(p.username === player.username) return p;}) === undefined){
			this.users.push(player);
			console.log(`player ${player.username} joined ${this.id} as ${player.pos}`)
		}
	}

	public onleave(player: Player) {
		if (this.leftPlayer && player.id === this.leftPlayer.id)
			this.leftP = false;
		else if (this.rightPlayer && player.id === this.rightPlayer.id)
			this.rightP = false;
		this.users.filter((p: Player) => p !== player)
	}

	public onCreate(): void {}

	public onDestroy() {}
}