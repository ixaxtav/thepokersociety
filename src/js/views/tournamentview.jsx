import React from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext.jsx";
import { Link } from "react-router-dom";

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

			return (
				<div>
					<h4 className="mt-4" style={{ textAlign: "center" }}>
						{tour ? tour.post_title : "Tournament not found"}
					</h4>

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

					<div className="row text-center pt-2">
						<div className="col">
							<a
								href="javascript:history.back()"
								style={{ color: "black", fontSize: "32px" }}>
								<i className="fas fa-arrow-circle-left" />
							</a>
						</div>

						{tour["structure-sheet"] != null ? (
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
						) : (
							<div className="col text-danger pt-2">
								No structure
							</div>
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

						{tour["structure-sheet"] != null ? (
							<div className="col">Structure</div>
						) : (
							<div className="col" />
						)}

						<div className="col">Add to Schedule</div>
					</div>

					<div className="row text-center font-italic">
						<div className="col-11 p-3">{tour.post_content}</div>
					</div>
				</div>
			);
		}}
	</Context.Consumer>
);
