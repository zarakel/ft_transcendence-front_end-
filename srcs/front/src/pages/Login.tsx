import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from 'react-router-dom'
import logo from "../pod blanc.svg"

const Login = () => { 

	const [searchParams, setSearchParams] = useSearchParams();
	let navigate = useNavigate();
	const [token, setToken] = useState(false);

	const useAuth = async (e : any) => {
		e.preventDefault();
		const hostname = document.location.hostname;

		let request = await fetch(`http://${hostname}:3000/login/code`, 
		{
			method: "POST",
            headers: 
			{
                "Content-Type": "application/json",
        		'cors': 'true'
            },
			body: JSON.stringify({redirect_uri: `http://${hostname}:8080`})
		});

		let response = await request.json();
		document.location.href = response.url;
	}

	const getToken = () => {
		let request = fetch(`http://${document.location.hostname}:3000/login/token/${searchParams.get("code")}`, 
		{
			method: "POST",
            headers: 
			{
                "Content-Type": "application/json",
        		'cors': 'true'
            }
		});
		return request;
	}

	useEffect(() => {
		if (searchParams.get("code") && !localStorage.getItem("access_token"))
		{
			let req = getToken();
			setToken(true);
			req.then(response => response.json().then((res) => {
				Object.entries(res).forEach(([key, value]) => {
					localStorage.setItem(key, value as string);
				  });
			}));
		}
		if (localStorage.getItem("new") && localStorage.getItem("access_token"))
		{
			localStorage.removeItem("new");
			navigate("/home/profil");
		}
		else if (localStorage.getItem("access_token"))
			navigate("/home");
	}, [token]);
	return  ( 
		<div className= "overflow-auto w-screen h-screen flex flex-col bg-black items-center text-center ">
			<header className= "space-y-32 mt-80">
				<img src={logo} className= "scale-125 transition ease-in-out delay-150 fill-black hover:scale-150 duration-300" />
				<button className ="btn-primary" onClick={useAuth}> Log-in </button>
			</header>
		</div>
	);

  };

  export default Login;