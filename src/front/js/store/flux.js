const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			host: 'https://playground.4geeks.com/contact',
			swapi: 'https://www.swapi.tech/api',
			swapi_dev: 'https://swapi.dev/api/',
			characters: [],
			charactersDetails: [],
			planets: [],
			planetsDetails: [],
			starships: [],
			starshipsDetails: [],
			favorites: [],
			isLoged: false,
			user: '',

			demo: [{ title: "FIRST", background: "white", initial: "white" },
			{ title: "SECOND", background: "white", initial: "white" }],
			currentContact: {},
		},

		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {getActions().changeColor(0, "green");},

			login: async (dataToSend) => {
				const uri = `https://glorious-umbrella-v6gpw99597w72rj-3001.app.github.dev/api/login`;
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": 'application/json'
					},
					body: JSON.stringify(dataToSend)
				}
				
				const response = await fetch (uri,options);
				if (!response.ok){
					// tratamos el error
					// Back devuelve 401
					console.log('Error', response.status, response.statusText);
				}
				const data = await response.json()
				console.log(data);
				localStorage.setItem('token', data.access_token)
				localStorage.setItem('user', JSON.stringify(data.results))
				setStore({isLoged: true, user: data.results.email})
			},

			logout: () => {
				setStore({isLoged: false, user: ''});
				localStorage.removeItem('token')
				localStorage.removeItem('user')
			},

			isLogged: () => {
				const token = localStorage.getItem('token')
				if (token) {
					//recuperamos el usuario
					const userData = JSON.parse(localStorage.getItem('user'));
					console.log(userData);
					setStore({isLoged: true, user: userData.email})
				}
			},

			accessProtected: async () => {
				const token = localStorage.getItem('token')
				const uri = `https://glorious-umbrella-v6gpw99597w72rj-3001.app.github.dev/api/protected`;
				const options = {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`
					}
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					//error
					console.log('error', response.status, response.statusText);
					return
				}
				const data = await response.json();
				console.log(data);
			},

			getPosts: async () => {
				const token = localStorage.getItem('token')
				const uri = `https://glorious-umbrella-v6gpw99597w72rj-3001.app.github.dev/api/posts`;
				const options = {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`
					}
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					//error
					console.log('error', response.status, response.statusText);
					return
				}
				const data = await response.json();
				console.log(data);
			},

			getPost: async (id) => {
				const token = localStorage.getItem('token')
				const uri = `${process.env.BACKEND_URL}/api/posts/${id}`;
				const options = {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`
					}
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					// error 403
					if (response.status === 403 ) {
						const data = await response.json()
						setStore({ alert: {
							text: data.message,
							background: 'danger',
							visible: true
						},})
						return
					}
					if (response.status === 404 ) {
						const data = await response.json()
						setStore({ alert: {
							text: data.message,
							background: 'danger',
							visible: true
						},})
						return
					}
					console.log('error', response.status, response.statusText);
					return
				}
				const data = await response.json();
				console.log(data);
				const text = data.results.title
				setStore({ alert: {
					text: text,
					background: 'info',
					visible: true
				},})
	},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
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

			getContact: async () => {
				//1 defino la uri
				const uri = `${getStore().host}/agendas/joanfigueira365`
				console.log(uri);

				//2 defino las opciones
				const options = {
					method: 'GET'
				}
				//3  ejecuto el fetch que demora y lo tengo que esperar
				const response = await fetch(uri, options)
				//4 verifico si el fetch dio error
				if (!response.ok) {
					//4.1 trato el error y salgo de la funcion
					console.log('Error: ', response.status, response.statusText)
					return // IMPORTANTE
				}
				//5 obtengo los datos json del response y esperoxq demora
				const data = await response.json()
				console.log('Data es = ', data)
				// Ejecuto la logica necesaria de la app
				setStore({ contact: data.contacts })

			},

			addContact: async (dataToSend) => {
				const uri = `${getStore().host}/agendas/joanfigueira365/contacts`;
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToSend)
				}
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return // IMPORTANTE
				}
				// const data = await response.json();
				getActions().getContact()
			},

			setCurrentContact: (newContact) => { setStore({ currentContact: newContact }) },

			editContact: async (id, dataToSend) => {
				const uri = `${getStore().host}/agendas/joanfigueira365/contacts/${id}`
				const options = {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToSend)
				}
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return // IMPORTANTE
				}
				getActions().getContact();
			},

			deleteContact: async (id) => {
				const uri = `${getStore().host}/agendas/joanfigueira365/contacts/${id}`
				const options = {
					method: 'DELETE'
				}
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log(response.status);
					return
				}
				getActions().getContact();
			},


			getCharacters: async () => {
				const response = await fetch(`${getStore().swapi}/people`)
				if (!response.ok) {
					return
				}
				const data = await response.json();
				console.log(data);
				setStore({ characters: data.results })
			},

			getCharactersDetails: async () => {
				const response = await fetch(`${getStore().swapi_dev}/people`)
				if (!response.ok) {
					return
				}
				const data = await response.json();
				console.log(data);
				setStore({ charactersDetails: data.results })
			},

			getStarships: async () => {
				const response = await fetch(`${getStore().swapi}/starships`)
				if (!response.ok) {
					return
				}
				const data = await response.json();
				console.log(data);
				setStore({ starships: data.results })
			},

			getStarshipsDetails: async () => {
				const response = await fetch(`${getStore().swapi_dev}/starships`)
				if (!response.ok) {
					return
				}
				const data = await response.json();
				console.log(data);
				setStore({ starshipsDetails: data.results })
			},

			getPlanets: async () => {
				const response = await fetch(`${getStore().swapi}/planets`)
				if (!response.ok) {
					return
				}
				const data = await response.json();
				console.log(data);
				setStore({ planets: data.results })
			},

			getPlanetsDetails: async () => {
				const response = await fetch(`${getStore().swapi_dev}/planets`)
				if (!response.ok) {
					return
				}
				const data = await response.json();
				console.log(data);
				setStore({ planetsDetails: data.results })
			},

			addFavorites: (newFavorites) => {
				if (!getStore().favorites.some(favorites => favorites.name === newFavorites.name)) {
					setStore({ favorites: [...getStore().favorites, newFavorites] });
				}
			},

			removeFavorites: (item) => {
				const newFavorite = getStore().favorites.filter((element) => element !== item)
				setStore({ favorites: newFavorite })
			},

		}
	}
};

export default getState;
