const getState = ({ getStore, setStore }) => {
	return {
		store: {
			HOST: "http://admin.thepokersociety.com/wp-json/ps/v1",

			// the list of cassinos is build when the application starts and it is used throught the entire application
			casinos: [],

			// this variable should be used to render the list of tournaments in /calendar
			tournaments: [],

			// this variable is used to render a single tournament on the /tournament/:tournament_id view
			currentTournament: null,
			currentCasino: null,

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
			],

			user: null
		},
		actions: {
			setCasinos: casinos => {
				setStore({ casinos });
			},
			fetchTournaments(calendarId) {
				const store = getStore();
				fetch(`${store.HOST}/tournament/calendar/${calendarId}`)
					.then(resp => resp.json())
					.then(data => {
						if (Array.isArray(data))
							setStore({ tournaments: data });
						else throw new Error("Tournaments not found");
					})
					.catch(error => console.error(error));
			},
			fetchSingleTournaments(tournamentId) {
				const store = getStore();
				fetch(`${store.HOST}/tournament/${tournamentId}`)
					.then(resp => resp.json())
					.then(data => setStore({ currentTournament: data }))
					.catch(error => console.error(error));
			},
			fetchSingleCasino(casinoID) {
				const store = getStore();
				fetch(`${store.HOST}/casino/${casinoID}`)
					.then(resp => resp.json())
					.then(data => setStore({ currentCasino: data }))
					.catch(error => console.error(error));
			},
			addToSchedule: tour => {
				const store = getStore();
				setStore({
					schedules: store.schedules.concat([
						{
							id: Math.floor(Math.random() * 100),
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
					])
				});
			},

			deleteToSchedule: tournamentId => {
				const store = getStore();
				setStore({
					schedules: store.schedules.filter(t => t.id != tournamentId)
				});
			},

			addBullet: (scheduleId, tournamentId) => {
				const store = getStore();

				setStore({
					schedules: store.schedules.map(s => {
						if (scheduleId == s.id) {
							return Object.assign(s, {
								attempts: s.attempts.map(a => a.bullets + 1)
							});
						} else {
							return s;
						}
					})
				});
			},

			substractBullet: (scheduleId, tournamentId) => {
				const store = getStore();

				setStore({
					schedules: store.schedules.map((s, t) => {
						if (scheduleId == s.id && tournamentId == t.id) {
							return Object.assign(s, {
								attempts: s.attempts.map(
									a => a.tournamentId + 1
								)
							});
						} else {
							return t;
						}
					})
				});
			},

			deleteAttempt: (scheduleId, tournamentId) => {
				const store = getStore();

				setStore({
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
