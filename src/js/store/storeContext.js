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

			schedule: [],
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
			addToSchedule: tour => {
				const store = getStore();
				setStore({ schedule: store.schedule.concat([tour]) });
			}
		}
	};
};

export default getState;
