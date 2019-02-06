import React from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext.jsx";
import { Link } from "react-router-dom";
import moment from "moment";

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

			let todayDate = moment().format("MMMM Do YYYY");
			let tournamentDate = moment(tour["tournament-date"]).format(
				"MMMM Do YYYY"
			);
			let differenceDate = tournamentDate - todayDate;
			let duration = moment.duration(
				differenceDate * 1000,
				"milliseconds"
			);
			let interval = 1000;

			duration = moment.duration(duration - interval, "milliseconds");

			console.log(
				moment(tour["tournament-date"])
					.startOf("day")
					.fromNow()
			);
			return (
				<div>
					<h4 className="mt-4" style={{ textAlign: "center" }}>
						{tour ? tour.post_title : "Tournament not found"}
					</h4>
					<div className="row justify-content-center text-center pt-2">
						<div
							className="col-9"
							style={{ verticalAlign: "middle" }}>
							<div>
								<h6>
									{" "}
									Date :{" "}
									{tour
										? tour["tournament-date"]
										: "Date Not Found"}{" "}
									@{" "}
									{tour
										? tour["tournament-time"]
										: "Time Not Found"}
								</h6>
							</div>
						</div>
					</div>
					<div className="row justify-content-center text-center pt-2">
						<div
							className="col-9"
							style={{ verticalAlign: "middle" }}>
							<div>
								<h6 className="text-danger">
									{moment(tour["tournament-date"])
										.startOf("day")
										.fromNow()}
								</h6>
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
							<a
								href="javascript:history.back()"
								style={{ color: "black", fontSize: "32px" }}>
								<i className="fas fa-arrow-circle-left" />
							</a>
						</div>

						{tour["structure-sheet"] != null &&
						tour["results-link"] != " " ? (
							<div className="col ">
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
						) : tour["structure-sheet"] != null ? (
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
						) : tour["results-link"] != " " ? (
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
						) : (
							<div className="col" />
						)}

						<div className="col">
							<Link
								to="/myschedule"
								style={{ color: "black", fontSize: "32px" }}>
								<i className="fas fa-plus-circle" />
							</Link>
						</div>
					</div>

					<div className="row text-center">
						<div className="col">Back to Calendar</div>

						{tour["structure-sheet"] != null &&
						tour["results-link"] != " " ? (
							<div className="col ">
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
						) : tour["results-link"] == " " &&
						tour["structure-sheet"] == null ? (
							<div className="col" />
						) : tour["structure-sheet"] != null ? (
							<div className="col">Tournament Structure</div>
						) : tour["results-link"] != " " ? (
							<div className="col">Tournament Results</div>
						) : (
							<div className="col" />
						)}

						<div className="col">Add to Schedule</div>
					</div>
				</div>
			);
		}}
	</Context.Consumer>
);
