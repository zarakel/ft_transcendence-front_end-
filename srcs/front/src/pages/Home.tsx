import logo from "../balle blanche.svg"
import logonav from "../pod blanc.svg"
import iconmenu from "../menu icon.svg"
import disconnect from "../disconnect.svg"
import profil from "../profil.svg"
import { Link, useNavigate } from "react-router-dom";
import Game from "./Game"
import React, { useState, useEffect } from "react";


const Home = () => {

	let checkPseudoIsNull;

	const navigate = useNavigate();

	const keyclick = (e: any) => {
		console.log(e);
		e.target.value = "ok";
	}

	const logOut = async () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("checkPseudo");
		document.location.href = "http://localhost:8080";
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		let request = await fetch("http://" + document.location.hostname + ":3000/user/username_update",
			{
				method: "POST",
				headers:
				{
					"Content-Type":  "application/json",
					'cors': 'true',
					'Authorization': `Bearer ${localStorage.getItem("jwt_token")}`
				},
				body: JSON.stringify({username: pseudo, login: localStorage.getItem("login")})
			}
		);
		let res = await request.json();
		if (res.boolean)
		{
			localStorage.removeItem("new");
			localStorage.setItem("username", pseudo);
			setPseudoIsCheck(true);
		}
		else
			console.log("error username update");
	}



	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		localStorage.removeItem("new");
		setPseudoIsCheck(true);
	}

	const [pseudo, setPseudo] = useState('');
	const [checkPseudo, setPseudoIsCheck] = useState(localStorage.getItem("new") === null ? true : false);
		
	return (						/* Nav Bar */
	
		<div>
			{!checkPseudo &&
			<div className="absolute flex flex-col overflow-auto w-full h-full bg-black">
				<div className="flex flex-col mx-auto my-auto space-y-10">
					<h1 className="text-2xl text-white"> Veuillez renseigner votre pseudo pour la session ! </h1>
					<div className="flex flex-col space-y-5">
						<div className="flex mx-auto">
							<form onSubmit={handleSubmit} className="rounded bg-white">
								<input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)}
								className="p-2 z-o rounded outline-none"/>
								<button type="submit" className="p-2 z-1 bg-gray-300 rounded">
									Envoyer
								</button>
							</form>
						</div>
						<button onClick={handleClick} className="p-2 rounded bg-white mx-auto"> ou pas </button>
					</div>
				</div>
			</div>	
			}

			{checkPseudo &&
			<div className=" absolute flex flex-col overflow-auto w-full h-full bg-black">
				<div className="flex flex-row w-screen my-10 h-20 justify-around transition ease-in-out hover:bg-sky-700">
					<div className="flex my-auto  justify-center w-1/3">
						<div className="transition ease-in-out hover:scale-110 hover:cursor-pointer">
							<h1 className="text-2xl text-white my-auto ">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="w-7 my-1 mx-1 float-left">
									<path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"/>
								</svg>
								<Link to="/Home/Chat"> Chat</Link>
							</h1>
						</div>
					</div>
					<div className="flex w-1/3">
						<img src={logonav} className="mx-auto  scale-75 fill-black " alt="" />
					</div>
					<div className="justify-center w-1/3 flex container-sm">
						<div className="flex transition ease-in-out hover:scale-110 hover:cursor-pointer">
							<h1 className=" my-auto text-2xl text-white">
								<img src={profil} className=" w-7 my-1 mx-1 float-right" />
								<Link to="/Home/Profil"> Profil</Link> 
							</h1>
						</div>
						<div className="flex-row flex transition ease-in-out hover:scale-110 hover:cursor-pointer ">
							<div className="flex my-auto ">
								<span> &nbsp; &nbsp;</span>
								<button onClick={logOut}><img src={disconnect} className=" w-6 "/></button>
							</div>
						</div>
					</div>
				</div>
										{/* espace de jeu */}			
					<Game></Game>
			</div>
		}
		</div>
	);
  };

  export default Home;