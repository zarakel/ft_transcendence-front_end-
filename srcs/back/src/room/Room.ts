import { copyFileSync } from "fs";
import Player from "./Player";

export default abstract class Room
{
	public id: number;
	public token: string;
	protected users: Array<Player>

	constructor(id: number, token: string)
	{
		this.id = id;
		this.token = token;
		this.users = new Array<Player>();
	}

	protected onCreate(){}
	protected onDestroy(){}

	protected onMessage(type: string, data: any){}

	public onMessageSpe(type: string, player: Player, data: any){
		if (type == "join")
			this.onJoin(player);
	}

	protected abstract onJoin(player: Player);
	protected abstract onleave(player: Player);
}