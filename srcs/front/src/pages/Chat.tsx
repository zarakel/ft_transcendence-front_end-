import { Link } from "react-router-dom";
import logonav from "../pod blanc.svg"
import profil from "../profil.svg"
import disconnect from "../disconnect.svg"
import Windows from "./DiscussionWindow";



const Chat = () => {

const logOut = async () => {
	localStorage.removeItem("access_token");
	document.location.href = "http://localhost:8080";
}


	return (
    <div className="overflow-auto flex flex-col w-screen h-screen bg-black">
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

      {/* arborescence du site */}

      <div className="flex flex-row justify-center">
        <div className="mx-7 text-white text-sm">
          <Link to="/Home"> Home </Link>
        </div>
      </div>

      { /* vilaine chiasse */}

		<Windows></Windows>

      { /* fin vilaine chiasse */}

    </div>
	);
};

  export default Chat;