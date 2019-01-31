/* global process */
import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import BottomBar from "../component/BottomBar.jsx";
import SearchBar from "../component/searchbar.jsx";
import Tournament from "../component/Tournament.jsx";
import TheStore from "../store/store";
import chrono from "chrono-node";

export default class Calendar extends Flux.View {
	constructor() {
		super();
		this.state = {
			tournaments: [], //here is where the local list of tourments will be
			zoom: false, //this was an old functionality (no longer used) that allows the user to click on a zoom icon to zoom into the list of tournaments
			searchType: null, //the search criteria (date, time, tournament name, buy in, etc)
			searchString: "", //the query value on the search input
			error: null, //if there is any errors
			stick: false, //the sticky bar on the top
			stickySyles: {}, //styles of the stick bar
			stickySyles2: {} //styles of the stick bar
		};

		// this will contain the <TR> that contains todays tournament.
		// you will si this element in yellow on the website
		this.todayTournament = null;
		this.todayPosition = 0;
		this.rounder = null;
		this._isMounted = false;
	}

	componentDidMount() {
		const HOST = "http://admin.thepokersociety.com/wp-json" + "/ps/v1";

		//the first thing to do is get the tournmanets of a particular calendar from the store.
		const tournaments = TheStore.getTournaments(
			this.props.match.params.cal_id //the calendar id is comming from the URL
		);

		if (!tournaments)
			//if there is no tournaments

			//look for new tournaments on the API
			this.goFetch(
				"GET",
				`${HOST}/tournament/calendar/${this.props.match.params.cal_id}`
			);
		//else, fill the tournaments with the data that is on the store.
		else this.fillTournaments(tournaments);

		//start listening to when the user scrolls the website because wee need the sticky bar.
		window.addEventListener("scroll", this.handleScroll.bind(this));
		this.tableBody.addEventListener(
			"scroll",
			this.handleScrollTable.bind(this)
		);
		this._isMounted = true;
	}
	componentWillUnmount() {
		//top the events listener to avoid memory overflow.
		window.removeEventListener("scroll", this.handleScroll.bind(this));
		if (this.tableBody)
			this.tableBody.removeEventListener(
				"scroll",
				this.handleScrollTable.bind(this)
			);

		this._isMounted = false;
	}

	//this function syncs the horizontal scroll of the table (if any) with the scroll of the website
	//i had to implement this function because sometimes the table was wider than the website.
	handleScrollTable(e) {
		let scrollTop = window.scrollY;
		if (scrollTop > 100) this.thead.scrollLeft = this.tableBody.scrollLeft;
	}

	//this function syncs the top sticky bar with the website scrollbar.
	handleScroll(e) {
		let scrollTop = window.scrollY;
		if (scrollTop > 100) {
			if (typeof this.state.stickySyles.position === "undefined") {
				this.setState({
					sticky: true,
					stickySyles: {
						position: "fixed",
						background: "white",
						top: "38px",
						left: 0,
						width: "100%",
						overflowY: "hidden"
					},
					stickySyles2: {
						//width: this.tableBody.offsetWidth,
						width: "100%"
					}
				});
			}
		} else if (!this.state.loading)
			this.setState({ stickySyles: {}, stickySyles2: {}, sticky: false });
	}

	// I use this function every time I need to sync the tournaments from PokerSociertyAPI with this calendar.
	goFetch(method, url) {
		let opts = {
			method,
			headers: { "Content-Type": "application/json" }
		};

		fetch(url, opts)
			.then(resp => {
				if (resp.code == 404) throw new Error("Calendar not found");
				return resp.json();
			})
			.then(data => {
				if (Array.isArray(data)) {
					// If a list of tournaments is received I put them on the application store
					TheStore.setTournaments(
						this.props.match.params.cal_id,
						data
					);
					// and also refresh the local list of tournaments and rerender the calendar view
					if (this._isMounted) this.fillTournaments(data);
				} else throw new Error("Invalid  not found");
			})
			.catch(error => {
				this.setState({ error: "Calendar not found" });
			});
	}

	//this function is being used everytime we want to update the list of tournaments on this view
	fillTournaments(data) {
		this.todayTournament = null;
		this.setState({
			loading: false,
			tournaments: data.map(t => {
				t[0] = new Date(t[0]);
				return t;
			})
		});
	}

	//the bottom menu with some buttons like: zoom, scroll to top, go to todays tournaments.
	bottomBarClick(slug) {
		switch (slug) {
			case "zoom":
				this.todayTournament = null;
				this.setState({ zoom: this.state.zoom ? false : true });
				break;
			case "scroll-top":
				window.scrollTo(0, 0);
				break;
			case "today":
				window.scrollTo(0, this.todayPosition);
				break;
		}
	}

	dateHasPassed(strDate) {
		var theDate = this.stringToDate(strDate);
		var today = new Date();
		today.setDate(today.getDate() - 1);
		return today < theDate;
	}

	stringToDate(strDate) {
		var monthNames = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		];
		var parts = strDate.split("-");
		//please put attention to the month (parts[0]), Javascript counts months from 0:
		// January - 0, February - 1, etc
		return new Date(
			"20" + parts[2],
			monthNames.indexOf(parts[1]),
			parts[0]
		);
	}

	render() {
		let filteredTournaments = this.state.tournaments;
		if (this.state.searchString.length > 1)
			filteredTournaments = this.state.tournaments.filter(t => {
				if (
					this.state.searchType &&
					this.state.searchType !== "filter"
				) {
					if (this.state.searchType == "date") {
						const searchDate = chrono.parseDate(
							this.state.searchString
						);
						if (!searchDate) return false;
						else {
							return t[0].getTime() <= searchDate.getTime();
						}
					} else if (this.state.searchType == "where") {
						if (
							t[3]
								.toLowerCase()
								.indexOf(this.state.searchString) != -1
						)
							return true;
					} else if (this.state.searchType == "tournament") {
						if (
							t[4]
								.toLowerCase()
								.indexOf(this.state.searchString) != -1
						)
							return true;
					} else if (this.state.searchType == "buyin") {
						if (
							t[5]
								.toLowerCase()
								.indexOf(this.state.searchString) != -1
						)
							return true;
					} else if (this.state.searchType == "time") {
						if (
							t[3]
								.toLowerCase()
								.indexOf(this.state.searchString) != -1
						)
							return true;
					} else if (this.state.searchType == "starting") {
						if (
							t[6]
								.toLowerCase()
								.indexOf(this.state.searchString) != -1
						)
							return true;
					} else if (this.state.searchType == "blinds") {
						if (
							t[7]
								.toLowerCase()
								.indexOf(this.state.searchString) != -1
						)
							return true;
					}
				} else {
					if (
						t[0]
							.toString()
							.toLowerCase()
							.indexOf(this.state.searchString) != -1
					)
						return true;
					else if (
						t[1].toLowerCase().indexOf(this.state.searchString) !=
						-1
					)
						return true;
					else if (
						t[2].toLowerCase().indexOf(this.state.searchString) !=
						-1
					)
						return true;
					else if (
						t[3].toLowerCase().indexOf(this.state.searchString) !=
						-1
					)
						return true;
					else if (
						t[4].toLowerCase().indexOf(this.state.searchString) !=
						-1
					)
						return true;
					else if (
						t[5].toLowerCase().indexOf(this.state.searchString) !=
						-1
					)
						return true;
					else if (
						t[6].toLowerCase().indexOf(this.state.searchString) !=
						-1
					)
						return true;
				}

				return false;
			});
		const tournaments = filteredTournaments.map((tour, i) => {
			return (
				<Tournament
					ref={c => {
						if (!this.todayTournament && c) {
							let today = new Date().setHours(0, 0, 0, 0);
							let current = tour[0].getTime();
							if (current >= today) {
								this.todayTournament = c;
								this.todayPosition = c.tableRow.offsetTop;
								window.scrollTo(0, c.tableRow.offsetTop);
								c.tableRow.classList.add("today");
								//this.setState({ todayPositionY: c.tableRow.offsetTop });
							}
						}
					}}
					key={i}
					data={{
						date: tour[0],
						day: tour[1],
						time: tour[2],
						venueName: tour[3],
						venueId: tour[9],
						tournament: tour[4],
						tournamentId: tour[10],
						buyin: tour[5],
						starting: tour[6],
						blinds: tour[7]
					}}
				/>
			);
		});
		return (
			<div className="tournaments" style={{ paddingBotton: "50px" }}>
				{this.state.error ? (
					<div className="alert alert-danger text-center">
						{this.state.error}
					</div>
				) : (
					<div>
						<SearchBar
							className={this.state.sticky ? "sticky" : ""}
							onChange={(token, type) =>
								this.setState({
									searchString: token,
									searchType: type
								})
							}
						/>
						{!this.state.tournaments ||
						this.state.tournaments.length == 0 ? (
							<div className="alert alert-info text-center">
								Loading tournaments...
							</div>
						) : (
							""
						)}
						<div
							className="calendar"
							style={{ overflow: "auto", marginTop: "-55px" }}
							ref={c => (this.calendar = c)}>
							<table
								className={
									"table-responsive table table-striped " +
									(this.state.zoom ? "zoomed" : "")
								}
								ref={c => (this.tableBody = c)}
								style={{ marginTop: "39px", fontSize: "6px" }}>
								<thead
									style={this.state.stickySyles}
									ref={c => (this.thead = c)}>
									<tr style={this.state.stickySyles2}>
										<th
											id="Date"
											className="date"
											data-type="String">
											Date
										</th>
										<th
											id="Day"
											className="day"
											data-type="String">
											Day
										</th>
										<th
											id="Time"
											className="time"
											data-type="String">
											Time
										</th>
										<th
											id="Where"
											className="where"
											data-type="String">
											Where
										</th>
										<th
											id="Tournament"
											className="tournament"
											data-type="String">
											Tournament
										</th>
										<th
											id="Buy_in"
											className="buyin"
											data-type="String">
											Buyin
										</th>
										<th
											id="Starting_Stack"
											className="starting"
											data-type="String">
											Stack
										</th>
										<th
											id="Blinds"
											className="blinds"
											data-type="String">
											Blinds
										</th>
									</tr>
								</thead>
								<tbody>{tournaments}</tbody>
							</table>
						</div>
						<BottomBar
							menuItems={[
								//                 { label: 'Zoom', slug: 'zoom', icon: 'fas fa-search' },
								{
									label: "Scroll Top",
									slug: "scroll-top",
									icon: "fas fa-arrow-up"
								}
							]}
							onClick={item => this.bottomBarClick(item)}
						/>
					</div>
				)}
			</div>
		);
	}
}
