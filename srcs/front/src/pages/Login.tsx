import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from 'react-router-dom'
import logo from "../pod blanc.svg"

const Login = () => { 

	const [searchParams] = useSearchParams();
	let navigate = useNavigate();
	const [token, setToken] = useState(false);
	let code = searchParams.get("code");

	const useAuth = async (e : any) => {
		e.preventDefault();
		const hostname = document.location.hostname;

		let request = await fetch("http://" + hostname + ":3000/login/code", 
		{
			method: "POST",
            headers: 
			{
                "Content-Type": "application/json",
        		'cors': 'true'
            },
			body: JSON.stringify({redirect_uri: "http://" + hostname + ":8080"})
		});

		let response = await request.json();
		document.location.href = response.url;
	}

	const getToken = async () => 
	{
		let request = await fetch("http://" + document.location.hostname + ":3000/login/token/" + code, 
		{
			method: "POST",
            headers: 
			{
                "Content-Type": "application/json",
        		'cors': 'true'
            }
		});
		let res = await request.json();
		Object.entries(res).forEach(([key, value]) => {
			localStorage.setItem(key, value as string);
		  });
		setToken(true);
	}

	useEffect(() => {
		if (code && !localStorage.getItem("access_token"))
			getToken();
	}, []);

	useEffect(() => {
		const hostname = document.location.hostname;
		setTimeout(() => {
			if (localStorage.getItem("new") && localStorage.getItem("access_token")){
				localStorage.removeItem("new");
				document.location.href = "http://" + hostname + ":8080/home";
				localStorage.setItem("connected", "yes")
			}
			else if (localStorage.getItem("access_token")){
				document.location.href = "http://" + hostname + ":8080/home";
				localStorage.setItem("connected", "yes")
			}
		}, 500);
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