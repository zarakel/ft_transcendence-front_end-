import { useEffect, useState } from "react";

const useUser = () => {
	const [id, setId] = useState(localStorage.getItem("id"));
	const [username, setUsername] = useState(localStorage.getItem("username"));
	const [mmr, setMmr] = useState(localStorage.getItem("mmr"));

	useEffect(() => {
		let id = localStorage.getItem("id");
		let username = localStorage.getItem("username");
		let mmr = localStorage.getItem("mmr");

		if (id) setId(id);
		if (username) setUsername(username);
		if (mmr) setMmr(mmr);

		return () => {};
	}, []);

	return {id, username, mmr, setId, setUsername, 
		setMmr}
}

export default useUser;