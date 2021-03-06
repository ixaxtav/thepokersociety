import { Session } from "bc-react-session";
import { Notify } from "bc-react-notifier";

const HOST = "https://admin.thepokersociety.com/wp-json/ps/v1";
const getState = ({ getStore, setStore }) => {
	return {
		store: {
			// the list of cassinos is build when the application starts and it is used throught the entire application
			casinos: [],

			// this variable should be used to render the list of tournaments in /calendar
			tournaments: [],

			users: [],
			userID: null,

			menu: {
				children: []
			},

			// this variable is used to render a single tournament on the /tournament/:tournament_id view
			calendar: null,
			currentTournament: null,

			currentCasino: null,

			// toggles j
			creatingNewUser: false,
			buttonShow: false,
			navbarCollapse: false,
			hideHeading: false,
			loading: false,

			user: {
				username: "",
				email: "",
				token: null,
				firstName: "",
				lastName: ""
			},

			schedules: []
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
				const store = getStore();
				fetch(
					`https://admin.thepokersociety.com/wp-json/jwt-auth/v1/token`,
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
							const err = new Error(
								"Invalid username and password"
							);
							callback(err);
						}
					})
					.then(data => {
						Notify.success("Hey! You have been logged in.");
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
						this.setStoreAndSession({
							currentTournament: (store.currentTournament = null)
						});

						callback();
					})
					.catch(error => {
						console.error("Error!!");
					});
			},

			setCalendarID(calendarID) {
				const store = getStore();

				this.setStoreAndSession({
					calendar: (store.calendar = calendarID)
				});
			},

			setPlaceholderTournament() {
				const store = getStore();

				this.setStoreAndSession({
					currentTournament: (store.currentTournament = { ID: 0 })
				});
			},

			setPlaceholderTournament2(tour) {
				const store = getStore();

				this.setStoreAndSession({
					currentTournament: (store.currentTournament = tour)
				});
			},

			resetCalendarID() {
				const store = getStore();

				this.setStoreAndSession({
					calendar: (store.calendar = null)
				});
			},

			logout() {
				const store = getStore();

				this.setStoreAndSession({
					currentTournament: (store.currentTournament = null)
				});

				Session.destroy();
				Notify.error("Hey! You have been logged out");
			},

			retrieveUserID(token) {
				const store = getStore();
				fetch(
					`https://admin.thepokersociety.com/wp-json/test/v1/test/`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + token
						}
					}
				)
					.then(resp => resp.json())
					.then(data => this.setStoreAndSession({ userID: data.ID }))
					.catch(error => console.error("Error!!"));
			},

			updateAccountInfo(
				id,
				token,
				first_name,
				last_name,
				email,
				password,
				callback
			) {
				const store = getStore();

				fetch(
					`https://admin.thepokersociety.com/wp-json/wp/v2/users/${id}`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + token
						},
						body: JSON.stringify({
							first_name: first_name,
							last_name: last_name
						})
					}
				)
					.then(resp => {
						if (resp.status == 200) return resp.json();
						else {
							const err = new Error(
								"Account was not updated successfully"
							);
							callback(err);
						}
					})

					.then(data => {
						Notify.success("Account Updated!");
						Session.start({
							payload: Object.assign(store, {
								user: {
									firstName: data.first_name,
									lastName: data.last_name
								}
							}),
							expiration: 86400000
						});

						callback();
					})

					.catch(error => {
						console.error("Error!!");
					});
			},

			saveAllUserSchedules() {
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
				Notify.success("Schedule has been successfully saved!");
			},

			retrieveUser(userID) {
				const store = getStore();
				fetch(`${HOST}/schedules/${userID}`)
					.then(resp => resp.json())
					.then(data => this.setStoreAndSession({ userID: data }))
					.catch(error => console.error("Error!!"));
			},

			addToAllSchedules(tour, checkedSchedules) {
				const store = getStore();

				this.setStoreAndSession({
					schedules: store.schedules.map((s, t) => {
						if (checkedSchedules.includes(s.id)) {
							if (
								typeof s.attempts.find(
									a => a.tournamentId == tour.ID
								) != "undefined"
							) {
								return (
									alert(
										"You are adding a repeated tournament to this schedule"
									),
									Object.assign(s, {
										total:
											s.total +
											parseFloat(
												parsePrice(tour["buy-in"])
											),
										attempts: s.attempts.concat([
											{
												tournamentName: tour.post_title,
												tournamentId: tour.ID,
												price: tour["buy-in"],
												bullets: 1
											}
										])
									})
								);
							} else {
								return Object.assign(s, {
									total:
										s.total +
										parseFloat(parsePrice(tour["buy-in"])),
									attempts: s.attempts.concat([
										{
											tournamentName: tour.post_title,
											tournamentId: tour.ID,
											price: tour["buy-in"],
											bullets: 1
										}
									])
								});
							}
						} else {
							return s;
						}
					})
				});

				{
					console.log(store.schedules);
				}
				Notify.success(
					"Tournament has been successfully added to your schedules!"
				);
			},

			createSchedule(temporalScheduleName) {
				const store = getStore();

				this.setStoreAndSession({
					schedules: store.schedules.concat([
						{
							id: Math.floor(Math.random() * 100),
							name: temporalScheduleName,
							total: 0,
							attempts: []
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
					schedules: store.schedules.filter(s => s.id != scheduleId)
				});
			},

			updateBullet(scheduleId, tournamentId, bulletCount) {
				const store = getStore();

				this.setStoreAndSession({
					schedules: store.schedules.map((s, t) => {
						if (scheduleId == s.id) {
							let total = 0;
							s.attempts.forEach(a => {
								const bullets =
									a.tournamentId == tournamentId
										? bulletCount
										: a.bullets;
								total += parseFloat(
									parsePrice(a.price) * bullets
								);
							});
							return Object.assign(s, {
								total: total,
								attempts: s.attempts.map(a => {
									if (tournamentId == a.tournamentId) {
										a.bullets = bulletCount;
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

			deleteAttempt(scheduleId, tournamentId) {
				const store = getStore();

				this.setStoreAndSession({
					schedules: store.schedules.map(s => {
						if (scheduleId == s.id) {
							let total = 0;

							s.attempts.forEach(a => {
								const bullets =
									a.tournamentId == tournamentId
										? 0
										: a.bullets;

								console.log(
									"this price--" +
										parseFloat(parsePrice(a.price))
								);
								console.log("this bullet--" + bullets);
								total += parseFloat(
									parsePrice(a.price) * bullets
								);

								console.log("this total--" + total);
								console.log(s.total);
							});

							return Object.assign(s, {
								total: total,
								attempts: s.attempts.filter(
									a => a.tournamentId != tournamentId
								)
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

			toggleHomeHeading() {
				const store = getStore();

				this.setStoreAndSession({
					hideHeading: !store.hideHeading
				});
			},

			navbarCollapseItems() {
				const store = getStore();

				this.setStoreAndSession({
					navbarCollapse: !store.navbarCollapse
				});
			},

			openMenuItem(itemId) {
				const store = getStore();

				setStore({
					menu: Object.assign(store.menu, {
						children: store.menu.children.map(item =>
							openItem(itemId, item)
						)
					})
				});
			}
		}
	};
};

const openItem = (id, item) => {
	if (item.id == id) item.opened = !item.opened;
	else if (typeof item.children != "undefined")
		item.children = item.children.map(subItem => openItem(id, subItem));
	return item;
};

const parsePrice = incomingPrice => {
	return incomingPrice
		.replace("$", "")
		.replace("++", "")
		.replace("+", "")
		.replace(",", "")
		.replace(" ", "");
};

export default getState;
