import { Session } from "bc-react-session";

const HOST = "http://admin.thepokersociety.com/wp-json/ps/v1";
const getState = ({ getStore, setStore }) => {
	return {
		store: {
			// the list of cassinos is build when the application starts and it is used throught the entire application
			casinos: [],

			// this variable should be used to render the list of tournaments in /calendar
			tournaments: [],

			users: [],

			// this variable is used to render a single tournament on the /tournament/:tournament_id view
			currentTournament: null,
			currentCasino: null,
			// toggles j
			creatingNewUser: false,
			navbarCollapse: false,

			user: {
				username: "",
				email: "",
				token: null,
				firstName: "",
				LastName: ""
			},

			schedules: [
				{
					id: 1,
					name: "Vegas 2012",
					total: 9000,
					attempts: [
						{
							tournamentName: "Pompano Beach",
							tournamentId: 123,
							price: 3000,
							bullets: 2
						}
					]
				}
			]
		},
		actions: {
			setStoreAndSession(payload) {
				setStore(payload);

				//save on the session as well
				const store = getStore();
				Session.setPayload(Object.assign(store, payload));
			},
			setCasinos: casinos => {
				this.setStoreAndSession({ casinos });
			},
			fetchTournaments(calendarId) {
				const store = getStore();
				fetch(`${HOST}/tournament/calendar/${calendarId}`)
					.then(resp => resp.json())
					.then(data => {
						if (Array.isArray(data))
							this.setStoreAndSession({ tournaments: data });
						else throw new Error("Tournaments not found");
					})
					.catch(error => console.error(error));
			},
			fetchSingleTournaments(tournamentId) {
				const store = getStore();
				fetch(`${HOST}/tournament/${tournamentId}`)
					.then(resp => resp.json())
					.then(data =>
						this.setStoreAndSession({ currentTournament: data })
					)
					.catch(error => console.error(error));
			},
			fetchSingleCasino(casinoID) {
				const store = getStore();
				fetch(`${HOST}/casino/${casinoID}`)
					.then(resp => resp.json())
					.then(data =>
						this.setStoreAndSession({ currentCasino: data })
					)
					.catch(error => console.error(error));
			},

			signUp(username, email, password) {
				fetch(`${HOST}/signup`, {
					method: "POST",
					body: JSON.stringify({
						username: username,
						email: email,
						password: password
					})
				})
					.then(resp => {
						if (resp.status == 200) resp.json();
						else
							throw new Error(
								"Error: The response code is not 200"
							);
					})
					.then(data => {
						this.setStoreAndSession({ userID: data.user_id });
					})
					.catch(error => console.error("Error!!"));
			},

			login(username, password, callback) {
				fetch(
					`http://admin.thepokersociety.com/wp-json/jwt-auth/v1/token`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							username: username,
							password: password
						})
					}
				)
					.then(resp => {
						if (resp.status == 200) return resp.json();
						else {
							callback(
								new Error("Invalid username and password")
							);
						}
					})
					.then(data => {
						const store = getStore();
						Session.start({
							payload: Object.assign(store, {
								user: {
									token: data.token,
									email: data.user_email,
									username: data.user_nicename
								}
							}),
							expiration: 86400000
						});
						this.setStoreAndSession({});
						callback();
					})
					.catch(error => {
						console.error("Error!!");
						callback(error);
					});
			},

			logout() {
				//const store = getStore();
				Session.destroy();
			},

			saveUserSchedule() {
				const store = getStore();

				fetch(`${HOST}/schedules/${store.user.username}`, {
					method: "POST",
					body: JSON.stringify(store.schedules)
				})
					.then(resp => {
						if (resp.status == 200) resp.json();
						else
							throw new Error(
								"Error: The response code is not 200"
							);
					})
					.then(data => {
						//this.setStoreAndSession({ userID: data.user_id });
					})
					.catch(error => console.error("Error!!"));
			},

			retrieveUser(userID) {
				const store = getStore();
				fetch(`${HOST}/schedules/${userID}`)
					.then(resp => resp.json())
					.then(data => this.setStoreAndSession({ userID: data }))
					.catch(error => console.error("Error!!"));
			},

			addToSchedule(tour) {
				const store = getStore();
				this.setStoreAndSession({
					schedules: store.schedules.concat([
						{
							id: Math.floor(Math.random() * 100),
							name: "",
							total: "",
							attempts: [
								{
									tournamentName: "",
									tournamentId: Math.floor(
										Math.random() * 100
									),
									price: "",
									bullets: ""
								}
							]
						}
					])
				});
			},

			deleteToSchedule(tournamentId) {
				const store = getStore();
				this.setStoreAndSession({
					schedules: store.schedules.filter(t => t.id != tournamentId)
				});
			},

			deleteOneSchedule(scheduleId) {
				const store = getStore();
				this.setStoreAndSession({
					schedules: store.schedules.filter(s => s.id == 1)
				});
			},

			updateBullet(scheduleId, tournamentId, bulletCount) {
				const store = getStore();

				this.setStoreAndSession({
					schedules: store.schedules.map((s, t) => {
						if (scheduleId == s.id) {
							return Object.assign(s, {
								attempts: s.attempts.map(a => {
									if (tournamentId == a.tournamentId) {
										a.bullets = Math.abs(bulletCount);
									}
									return a;
								})
							});
						} else {
							return s;
						}
					})
				});
			},

			toggleNewScheduleButton() {
				const store = getStore();

				this.setStoreAndSession({
					creatingNewUser: !store.creatingNewUser
				});
			},

			navbarCollapseItems() {
				const store = getStore();

				this.setStoreAndSession({
					navbarCollapse: !store.navbarCollapse
				});
			},

			deleteAttempt(scheduleId, tournamentId) {
				const store = getStore();

				this.setStoreAndSession({
					schedules: store.schedules.map(s => {
						if (scheduleId == s.id) {
							return Object.assign(s, {
								attempts: s.attempts.filter(
									a => a.tournamentId != tournamentId
								)
							});
						} else {
							return s;
						}
					})
				});
			}
		}
	};
};

export default getState;