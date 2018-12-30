import React from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import { Context } from "../store/appContext.jsx";

export const MySchedules = () => (
	<Context.Consumer>
		{({ store, actions }) => (
			<div>
				<h3>To what schedule you want to add this tournament to?</h3>
				<hr />
				{store.schedules.map((s, i) => (
					<ul key={i} style={{ listStyleType: "none" }}>
						{" "}
						<li>
							{s.name} | Total = {""}
							{s.total}$
							<Link to={"/schedule/" + s.id}>
								<i
									className="fas fa-plus-circle"
									style={{ marginLeft: "15px" }}
								/>
							</Link>
						</li>
					</ul>
				))}
			</div>
		)}
	</Context.Consumer>
);
