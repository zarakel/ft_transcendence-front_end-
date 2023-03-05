import { Link } from "react-router-dom";
import {useState} from "react"
import logonav from "../pod blanc.svg"
import disconnect from "../disconnect.svg"


const MatchHistory = () => {

	
	const logOut = async () => {
		localStorage.removeItem("access_token");
		document.location.href = "http://localhost:8080";
	}

	return (
	<div className="flex flex-col w-screen h-screen bg-black">
    	<div className="flex flex-row w-screen my-10 h-20 justify-around transition ease-in-out hover:bg-sky-700">
        	<div className="flex my-auto justify-center w-1/3">
        		<div className="transition ease-in-out hover:scale-110 hover:cursor-pointer">
            		<h1 className="text-2xl text-white my-auto ">
                		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="w-7 my-1 mx-1 float-left">
                		<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                		</svg>
                		<Link to="/Home">Home</Link>
              		</h1>
            	</div>
          	</div>
        	<div className="flex w-1/3">
          		<img src={logonav} className="mx-auto scale-75 fill-black " alt=""/>
        	</div>
        	<div className="justify-center w-1/3 flex container-sm">
				<div className="flex transition ease-in-out hover:scale-110 hover:cursor-pointer">
					<h1 className="text-2xl text-white my-auto ">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="w-7 my-1 mx-1 float-right">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"/>
						</svg>
						<Link to="/Home/Chat"> Chat</Link>
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

		{/* arborescence du site */}

		<div className="flex flex-row justify-center">
			<div className="flex flex-row mx-7 text-white text-sm">
				<Link to="/Home"> Home </Link>
				<h1> &nbsp; { ' > ' } &nbsp; </h1>
				<Link to="/Home/Profil"> Profil </Link>
			</div>
		</div>


		<div className="w-screen flex flex-row my-auto space-y-20 ">
			<div className="w-screen flex flex-col-3 text-center justify-around text-white ">
				<div className="flex flex-col test-xl space-y-10">
					<h1>
						// Insérer ici variables qui représenteront victoire | défaite //
					</h1> 
					<h1>
						// Niveaux //
					</h1> 
					<h1>
						// Rangs //
					</h1>
        		</div>
        	</div>
      	</div>
    </div>
	);
  };

  export default MatchHistory;