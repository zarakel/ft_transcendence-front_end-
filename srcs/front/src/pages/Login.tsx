import useOAuth2 from "../components/use-oauth2";
import logo from "../pod blanc.svg"

const Login = () => {
	const { data, loading, error, getAuth } = useOAuth2({
	  authorizeUrl: "https://api.intra.42.fr/oauth/authorize",
	  clientId: "u-s4t2ud-f57f1f13919f5d82d8dd1b16b5fcfa4c990fc5dd6b1d48e623676d20d37367d3",
	  redirectUri: "http://localhost:3000/Home",
	  scope: "public profile",
	  responseType: "code",
	  exchangeCodeForTokenServerURL: "https://your-backend/token",
	  exchangeCodeForTokenMethod: "POST",
	  onSuccess: (payload: any) => console.log("Success", payload),
	  onError: (error_ : any) => console.log("Error", error_)
	});
  
	const isLoggedIn = Boolean(data?.access_token); // or whatever...
  
	if (error) {
	  return <div>Error</div>;
	}
  
	if (loading) {
	  return <div>Loading...</div>;
	}
  
	if (isLoggedIn) {
	  return <pre>{JSON.stringify(data)}</pre>;
	}
  
	// couleur bg grise = bg-neutral-500

	return (
		<div className= "overflow-auto w-screen h-screen flex flex-col bg-black items-center text-center ">
			<header className= "space-y-32 mt-80">
				<img src={logo} className= "scale-125 transition ease-in-out delay-150 fill-black hover:scale-150 duration-300" />
				<button className ="btn-primary" onClick={() => getAuth()}> Connection </button>
			</header>
	  </div>
	);
  };

  export default Login;