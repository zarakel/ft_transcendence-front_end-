import { Link } from "react-router-dom";
import {useState} from "react"
import logonav from "../pod blanc.svg"
import profil from "../profil.svg"


const Chat = () => {

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
				</div>
      </div>

      {/* arborescence du site */}

      <div className="flex flex-row justify-center">
        <div className="mx-7 text-white text-sm">
          <Link to="/Home"> Home </Link>
        </div>
      </div>

      { /* vilaine chiasse */}

      <div className="max-w-2xl mx-auto">

	<form>
    <label htmlFor="chat" className="sr-only">Your message</label>
    <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700">
        <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
        </button>
        <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd"></path></svg>
        </button>
        <textarea id="chat" className="rows-1 block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
            <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
            <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
        </button>
    </div>
</form>

	<p className="mt-5">This textarea chatroom component is part of a larger, open-source library of Tailwind CSS components. Learn
		more
		by going to the official <a className="text-blue-600 hover:underline"
			href="https://flowbite.com/docs/getting-started/introduction/" target="_blank">Flowbite Documentation</a>.
	</p>
    <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
</div>


      { /* fin vilaine chiasse */}

    </div>
	);
};

  export default Chat;