import { AppGateway } from "src/app.gateway";
import Player from "./Player";

export default abstract class Room
{
	protected id: number;
	protected token: string;
	protected users: Array<Player>
	protected gateway: AppGateway;

	constructor(id: number, token: string)
	{
		this.id = id;
		this.token = token;
		this.users = new Array<Player>();
		this.onCreate();
	}

	public getToken(): string{
		return this.token;
	}
	protected onMessage(type: string, data: any){}

	public onMessageSpe(type: string, player: Player, data: any){
		if (type == "join"){
			player.rooms.push(this.token);
			this.onJoin(player, data);
		}
		else if (type == "leave"){
			if (player.rooms)
				player.rooms = player.rooms.filter((room: string) => room != this.token);
			this.onleave(player);
		}
	}

	public setGateway(gateway: AppGateway){
		this.gateway = gateway;
	}

	public abstract onCreate();
	public abstract onDestroy();
	public abstract onJoin(player: Player, data: any);
	public abstract onleave(player: Player);
}