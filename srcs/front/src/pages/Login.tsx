import { useEffect } from "react";
import { useSearchParams, Navigate, redirect } from 'react-router-dom'
import logo from "../pod blanc.svg"
import Home from "./Home";

const Login = () => { 

	const [searchParams, setSearchParams] = useSearchParams();

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
			req.then(response => response.json().then((res) => {
				localStorage.setItem("access_token", res.access_token);
			}));
		}
		if (localStorage.getItem("access_token"))
			document.location.href = `http://${document.location.hostname}:${document.location.port}/home`;
		
			return () => {};
	}, [])




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