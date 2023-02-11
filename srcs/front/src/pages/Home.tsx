import logo from "../balle blanche.svg"
import logonav from "../pod blanc.svg"
import iconmenu from "../menu icon.svg"
import profil from "../profil.svg"
import { Link } from "react-router-dom";
import React, { useState } from "react"


const Home = () => {

	return (

										/* Nav Bar */

		<div className="flex flex-col overflow-auto w-screen h-screen bg-black">
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
				</div>
			</div>
									{/* espace de jeu */}
			<div className=" content-center box-border border border-white flex flex-col m-auto w-4/6 h-4/6 rounded-lg justify-center">
				<img src={logo} className=" my-20 mx-auto w-1/3 scale-75 " alt="" />
				<button className=" flex mx-auto btn-primary"> Partie Rapide </button>
			</div>
		</div>
	);
  };

  export default Home;