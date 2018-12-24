import React from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext.jsx";

export const Casino = property => (
	<Context.Consumer>
		{({ store, actions }) => {
			if (
				store.currentCasino === null ||
				store.currentCasino.ID != property.match.params.casino_id
			) {
				actions.fetchSingleCasino(property.match.params.casino_id);
				return <div>Loading casino... </div>;
			}
			return (
				<div>
					<h1
						onClick={() =>
							actions.addToSchedule(store.currentCasino)
						}>
						{store.currentCasino
							? store.currentCasino.post_title
							: "Casino not found"}
					</h1>
					<ul>
						{store.tournaments
							.filter(
								t => t.casino == property.match.params.casino_id
							)
							.map(tournament => (
								<li key={tournament.id}>{tournament.id}</li>
							))}
					</ul>
				</div>
			);
		}}
	</Context.Consumer>
);
