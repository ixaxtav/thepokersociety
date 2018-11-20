const getState = scope => {
	return {
		store: {
			casinos: [],
			schedule: [],
			user: null
		},
		actions: {
			setCasinos: casinos => {
				let store = scope.state.store;
				store.casinos = casinos;
				scope.setState({ store });
			},
			addToSchedule: tour => {
				let store = scope.state.store;
				store.schedule.push(tour);
				scope.setState({ store });
			}
		}
	};
};

export default getState;
