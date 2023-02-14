import Player from "./Player"
import Room from "./Room";

export default class GameRoom extends Room
{
	
	constructor(id: number, token: string)
	{
		super(id, token);
	}

	protected onJoin(player: Player) {
		this.users.push(player);
	}
	protected onleave(player: Player) {

	}

}