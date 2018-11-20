import React from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext.jsx";

export const Casino = property => (
	<Context.Consumer>
		{({ store, actions }) => {
			const cas = store.casinos.find(casino => {
				return casino.id == property.match.params.casino_id;
			});

			return (
				<div>
					<h1 onClick={() => actions.addToSchedule(cas)}>
						{cas ? cas.title.rendered : "Casino not founds"}
					</h1>
					<ul>
						{store.schedule.map(tournament => (
							<li key={tournament.id}>{tournament.id}</li>
						))}
					</ul>
				</div>
			);
		}}
	</Context.Consumer>
);
