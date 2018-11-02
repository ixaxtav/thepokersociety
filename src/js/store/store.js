import Flux from "@4geeksacademy/react-flux-dash";
class TheStore extends Flux.DashStore {
	constructor() {
		super();

		this.state = {
			menu: [],
			tournaments: {}
		};
		// Or Declare an event with some imutable transformation logic
		this.addEvent("tournaments");
	}
	getTournaments(slug) {
		if (typeof this.state.tournaments[slug] == "undefined") return null;
		else return this.state.tournaments[slug];
	}
	setTournaments(slug, data) {
		this.state.tournaments[slug] = data;
	}
}
export default new TheStore();
