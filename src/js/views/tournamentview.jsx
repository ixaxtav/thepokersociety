import React from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext.jsx";
import { Link } from "react-router-dom";
import moment from "moment";
import "../../styles/tournamentview.css";
import TheStore from "../store/store";

export const TournamentView = property => (
	<Context.Consumer>
		{({ store, actions }) => {
			//if there is no tournaments, i go and fetch for them
			if (
				store.currentTournament === null ||
				store.currentTournament.ID !=
					property.match.params.tournament_id
			) {
				actions.fetchSingleTournaments(
					property.match.params.tournament_id
				);

				return <div>Loading tournaments... </div>;
			}

			const tour = store.currentTournament;

			let tournamentDate =
				tour["tournament-date"] + " " + tour["tournament-time"];

			tournamentDate = moment(tournamentDate).format(
				"MMMM Do YYYY, h:mm a"
			);

			let currentDate = moment().format("MMMM Do YYYY, h:mm a");

			let diff = moment(tournamentDate, "MMMM Do YYYY, h:mm a").fromNow();
			const reducer = (accumulator, str, i) => {
				return accumulator + `<h${i}>${str}</h>`;
			};
			const titles = [""]
				.concat(tour.post_title.split("-").filter(str => str !== "-"))
				.reduce(reducer);

			return (
				<div>
					<div className="row">
						<div
							className="col-11 mx-auto p-3 text-center tournament-heading"
							dangerouslySetInnerHTML={{ __html: titles }}
						/>
					</div>
					<div className="row justify-content-center text-center">
						<div
							className="col-9"
							style={{ verticalAlign: "middle" }}>
							<div>
								<h6 style={{ fontSize: "18px" }}>
									{" "}
									Date :{" "}
									{tournamentDate
										? tournamentDate
										: "Date Not Found"}{" "}
								</h6>
							</div>
						</div>
					</div>
					<div className="row justify-content-center text-center pt-2">
						<div
							className="col-9"
							style={{ verticalAlign: "middle" }}>
							<div>
								{diff.includes("in") ? (
									<h6 className="text-danger">
										Registration ends - {diff}
									</h6>
								) : (
									<h6 className="text-danger">
										Registration ended - {diff}
									</h6>
								)}
							</div>
						</div>
					</div>

					<div className="row text-center font-italic justify-content-center p-2">
						<div className="col-10 pb-3">{tour.post_content}</div>
					</div>
					<div
						className="row"
						style={{
							textAlign: "center",
							backgroundColor: "#C0C0C0"
						}}>
						<div className="col">Buy In</div>
						<div className="col">Start Stack</div>
						<div className="col">Blinds</div>
					</div>
					<div
						className="row"
						style={{
							textAlign: "center"
						}}>
						<div className="col">
							{" "}
							{tour ? tour["buy-in"] : "Buy in not found"}
						</div>
						<div className="col">
							{" "}
							{tour
								? tour["starting-stack"]
								: "Starting Stack not found"}
						</div>
						<div className="col">
							{" "}
							{tour ? tour.blinds : "Blinds not found"}
						</div>
					</div>

					<div className="row text-center pt-2 justify-content-center">
						<div className="col">
							<Link
								to={"/calendar/" + store.calendar}
								style={{ color: "black", fontSize: "32px" }}>
								<i className="fas fa-arrow-circle-left" />
							</Link>
						</div>

						{tour["results-link"] == null ? null : tour[
							"structure-sheet"
						] == null ? null : tour["results-link"].charAt(0) ==
						"h" ? (
							<div className="col">
								<a
									target="_blank"
									rel="noopener noreferrer"
									href={tour["results-link"]}
									style={{
										color: "black",
										fontSize: "32px"
									}}>
									<i className="fas fa-trophy" />
								</a>
							</div>
						) : tour["structure-sheet"].charAt(0) == "h" &&
						diff.includes("in") ? (
							<div className="col">
								<a
									target="_blank"
									rel="noopener noreferrer"
									href={tour["structure-sheet"]}
									style={{
										color: "black",
										fontSize: "32px"
									}}>
									<i className="fas fa-clipboard-list" />
								</a>
							</div>
						) : null}

						{diff.includes("ago") ? (
							<div className="col">
								<button
									onClick={e => {
										let respond = window.confirm(
											"Are you sure you want to add this past tournament?"
										);
										if (respond) {
											window.location = "/myschedule";
										}
									}}
									href="/myschedule"
									style={{
										color: "black",
										fontSize: "32px",
										border: "none",
										background: "none",
										cursor: "pointer"
									}}>
									<i className="fas fa-plus-circle" />
								</button>
							</div>
						) : (
							<div className="col">
								<Link
									to="/myschedule"
									style={{
										color: "black",
										fontSize: "32px"
									}}>
									<i className="fas fa-plus-circle" />
								</Link>
							</div>
						)}
					</div>

					<div
						className="row text-center pt-2"
						style={{ bottom: "0" }}>
						<div className="col">Back to Calendar</div>

						{tour["results-link"] == null ? null : tour[
							"structure-sheet"
						] == null ? null : tour["results-link"].charAt(0) ==
						"h" ? (
							<div className="col">Tournament Results</div>
						) : tour["structure-sheet"].charAt(0) == "h" &&
						diff.includes("in") ? (
							<div className="col">Tournament Structure</div>
						) : null}

						<div className="col">Add to Schedule</div>
					</div>
				</div>
			);
		}}
	</Context.Consumer>
);
