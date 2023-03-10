import Player from "./Player"
import Room from "./Room";

export const PONG_W: number = 600;
export const PONG_H: number = 400;
export const PLAYER_W: number = 10;
export const PLAYER_H: number = PONG_H * 0.3;
export const STANDARD_BALL_SPEED = 2;
export const ACCEL_BALL = 1.1;
export const MAX_SPEED = 12;
export const MAX_POINT = 5;

export default class GameRoom extends Room
{
	public leftPlayer: Player;
	public rightPlayer: Player;
	private rightP: boolean = false;
	private leftP: boolean = false;
	private lp: any = {y: PONG_H / 2 - (PONG_H * 0.3) / 2, x: 0}
	private rp: any = {y: PONG_H / 2 - (PONG_H * 0.3) / 2, x: PONG_W - PLAYER_W}
	private ball: any = {y: PONG_H / 2, x: PONG_W / 2, 
		dx: Math.round(Math.random()) * 2 - 1, dy: Math.round(Math.random()) * 2 - 1,
		r: 5, s: STANDARD_BALL_SPEED};
	public started: boolean = false;
	
	constructor(id: number, token: string)
	{
		super(id, token);
	}

	public onJoin(player: Player, data: any) {
		if (player.id === this.leftPlayer.id){
			player.pos = "left";
			this.leftP = true;
		}
		else if (player.id === this.rightPlayer.id){
			player.pos = "right";
			this.rightP = true;
		}
		else
			player.pos = "spec";
		player.score = 0;
		if (this.users.find((p: Player) => {if (p.id === player.id) return p;}) === undefined){
			player.rooms.push(this.token);
			this.users.push(player);
			this.users.forEach(p => {
				data.sender.pos = p.pos;
				p.emit("game.join", {sender: data.sender, token: this.token});
			});
			console.log(`player: ${player.username} join: ${this.id} status: ${player.pos}`)
			if (this.leftP && this.rightP){
				this.countDown();
			}
		}
	}

	public onleave(player: Player) {
		if (this.leftPlayer && player.id === this.leftPlayer.id)
			this.leftP = false;
		else if (this.rightPlayer && player.id === this.rightPlayer.id)
			this.rightP = false;
		this.users = this.users.filter((p: Player) => p !== player)
		console.log(`player ${player.username} leaved ${this.id}`)
		if ((!this.leftP || !this.rightP) && this.started)
		{
			let winner = this.rightPlayer.toJson();
			let loser = this.leftPlayer.toJson();
			if (this.leftP) {
				winner = this.leftPlayer.toJson();
				loser = this.rightPlayer.toJson();
			}
			this.users.forEach(p => {
				p.emit("game.stop", {id: this.token, sender: p.toJson() ,winner: winner, loser: loser, 
					expt: "deconnection"})
			});
			console.log(`game finish, winner: ${winner.username}, loser:${loser.username}, expt: deconnection`);
		}
	}

	public onCreate() {
		this.processMessage("movePaddle", (player: Player, data: any) => {
			if (data.sender.pos === "left"){ this.lp.y = data.sender.y;}
			if (data.sender.pos === "right"){this.rp.y = data.sender.y;}
			this.users.forEach(p => {
				if (p.id !== player.id) {
					p.emit("game.move", data);
				}
			});
		})
	}

	public onDestroy() {}

	private countDown() {
		let count = 3;
		let inter = setInterval(() => {
			count--;
			this.users.forEach(p => p.emit("game.count", {id: this.token, count: count}))
			if (count < 0) {
				clearInterval(inter);
				this.start();
			}
		}, 1000);
	}

	private start() {
		this.leftPlayer.score = 0;
		this.rightPlayer.score = 0;
		this.started = true;
		this.users.forEach(p => p.emit("game.start", {id: this.token}));
		this.update();
	}

	private stop() {
		let winner = this.leftPlayer;
		let loser = this.rightPlayer;
		if (this.rightPlayer.score > this.leftPlayer.score) {
			winner = this.rightPlayer;
			loser = this.leftPlayer;
		}
		this.users.forEach(p => {
			p.emit("game.stop", {id: this.token, winner: winner.toJson(), loser: loser.toJson(), 
				expt: "none"})
		});
		this.started = false;
		console.log(`game finish, winner: ${winner.username}, loser:${loser.username}, expt: none`);
	}

	private reset() {
		this.ball = {y: PONG_H / 2, x: PONG_W / 2, 
		dx: Math.round(Math.random()) * 2 - 1, dy: Math.round(Math.random()) * 2 - 1,
		r: 5, s: STANDARD_BALL_SPEED};
		/*this.rp = {y: PONG_H / 2 - (PONG_H * 0.3) / 2, x: PONG_W - PLAYER_W};
		this.lp = {y: PONG_H / 2 - (PONG_H * 0.3) / 2, x: PONG_W - PLAYER_W};*/
	}

	private collide(player: any, ball: any) {
		if (ball.x >= player.x && ball.x <= player.x + PLAYER_W &&
			ball.y >= player.y && ball.y <= player.y + PLAYER_H)
			{
				this.ball.s *= ACCEL_BALL;
				this.ball.dx = -this.ball.dx;
				return true;
			}
		return false;
	}

	private async update() {
		let col = false;
		if (this.ball.y > PONG_H || this.ball.y < 0) {
			this.ball.s *= ACCEL_BALL;
			this.ball.dy = -this.ball.dy;
		}
		if (this.ball.x <= PLAYER_W) {
			if (!this.collide(this.lp, this.ball)) {
				col = true; 
				this.leftPlayer.score++;
			}
		}
		else if (this.ball.x > PONG_W - PLAYER_W) {
			if (!this.collide(this.rp, this.ball)) {
				col = true; 
				this.rightPlayer.score++;
			}
		}
		if (col) {
			this.users.forEach(p => p.emit("game.goal", {id: this.token,
				lscore: this.leftPlayer.score, rscore: this.rightPlayer.score}));
			this.reset();
		}
		if (this.leftPlayer.score >= MAX_POINT || this.rightPlayer.score >= MAX_POINT)
			this.stop();
		if (this.ball.s >= MAX_SPEED)
			this.ball.s = MAX_SPEED;
	
		this.ball.x += this.ball.dx * this.ball.s;
		this.ball.y += this.ball.dy * this.ball.s;

		this.users.forEach(p => p.emit("game.update", {id: this.token, 
			x: this.ball.x, y: this.ball.y}));
		
		if (this.started)
			setTimeout(()=> {this.update()}, 20);
		
	} 
}