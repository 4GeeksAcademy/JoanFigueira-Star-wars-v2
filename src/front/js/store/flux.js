const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			host : 'https://3000-hchocobar-chocobarnetba-4wsir07tmvx.ws-us116.gitpod.io',
			message: null,
			demo: [{title: "FIRST", background: "white", initial: "white"},
				{title: "SECOND", background: "white", initial: "white"}],
			user: 'Joan',
			cohorte: 'Spain-77',
			number: 25,
			isLoged: false,
			publications: [],
			currentPublications: {},
			alert : {
				text: 'A simple alert-check it out!',
				background: 'danger',
				visible: true,
			}
			},


		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {getActions().changeColor(0, "green");},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			setIsLoged: (newState) => { setStore ( {isLoged:newState} )

			}
		}
	};
};

export default getState;
