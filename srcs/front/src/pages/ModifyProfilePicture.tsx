import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logonav from "../pod blanc.svg"
import disconnect from "../disconnect.svg"



const ModifyPicture = () => {

  const logOut = async () => {
	localStorage.removeItem("access_token");
	document.location.href = "http://localhost:8080";
}

const [imageUrl, setImageUrl] = useState('');
const [file, setFile] = useState<File>();

const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files.length > 0) {
	const file = event.target.files[0];
	setFile(file);
	const imageUrl = URL.createObjectURL(file);
	setImageUrl(imageUrl);
  }
};

const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setImageUrl(event.target.value);
};

const handleImageSave = () => {
  if (imageUrl) {
	try {
		localStorage.setItem('profile_pic', imageUrl);
	  } catch (error) {
		console.error('Error saving data to localStorage:', error);
	  }
  }
};


  return (
	<div className="absolute flex flex-col overflow-auto w-full h-full bg-black">
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

		<div className="container m-auto mt-4">
    		<div className="flex justify-center items-center">
				<div className="relative w-20 h-20 rounded-full overflow-hidden">
				{imageUrl ? (
					<img src={imageUrl} alt="Profile Pic" className="absolute w-full h-full object-cover" />
				) : (
					<div className="absolute w-full h-full bg-gray-200 flex justify-center items-center text-gray-400">
					No Image
					</div>
				)}
				</div>
			</div>
			<div className="flex justify-center items-center mt-4 ">
				<div className="flex m-auto flex-col justify-center space-y-8 m-auto">
					< div className="flex flex-row">
						<input type="text" value={imageUrl} onChange={handleImageUrlChange} className="border rounded-lg p-2 w-full max-w-sm" placeholder="Enter Image URL" />
						<button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleImageSave}>
							Save
						</button>
					</div>
					<div className="m-auto ">
						<input type="file" accept="image/*" onChange={handleImageChange} className="m-auto justify-center" id="file-input" />
						<label htmlFor="file-input" className=" cursor-pointer">
							Upload Image
						</label>
					</div>
				</div>
			</div>
		</div>
	</div>
  );
};

export default ModifyPicture;
